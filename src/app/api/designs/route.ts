import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createDesignSchema, updateDesignSchema } from '@/utils/validators';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const designs = await prisma.design.findMany({
      where: { userId: session.user.id },
      include: {
        template: {
          select: {
            id: true,
            name: true,
            thumbnail: true,
            category: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ designs });
  } catch (error) {
    console.error('Error fetching designs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { templateId, name, data } = createDesignSchema.parse(body);

    // Check subscription limits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        subscriptionTier: true,
        designsThisMonth: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Free tier: 3 designs per month
    if (user.subscriptionTier === 'FREE' && user.designsThisMonth >= 3) {
      return NextResponse.json(
        {
          error:
            'Monthly design limit reached. Upgrade to Pro for unlimited designs.',
        },
        { status: 403 }
      );
    }

    // Check if template is premium
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      select: { isPremium: true },
    });

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    if (template.isPremium && user.subscriptionTier === 'FREE') {
      return NextResponse.json(
        { error: 'This is a premium template. Upgrade to Pro to access.' },
        { status: 403 }
      );
    }

    const design = await prisma.design.create({
      data: {
        userId: session.user.id,
        templateId,
        name,
        data,
        status: 'DRAFT',
      },
      include: {
        template: true,
      },
    });

    // Increment monthly counter for free users
    if (user.subscriptionTier === 'FREE') {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { designsThisMonth: { increment: 1 } },
      });
    }

    return NextResponse.json({ design }, { status: 201 });
  } catch (error) {
    console.error('Error creating design:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
