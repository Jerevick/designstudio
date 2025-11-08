import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { subscription: true },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        subscriptionTier: true,
        subscriptionStatus: true,
        designsThisMonth: true,
        createdAt: true,
        subscription: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get usage stats
    const [totalDesigns, totalExports] = await Promise.all([
      prisma.design.count({
        where: { userId: user.id },
      }),
      prisma.output.count({
        where: {
          design: {
            userId: user.id,
          },
        },
      }),
    ]);

    return NextResponse.json({
      user: {
        ...user,
        stats: {
          totalDesigns,
          totalExports,
          designsThisMonth: user.designsThisMonth,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, image } = await request.json();

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || undefined,
        image: image || undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        subscriptionTier: true,
        subscriptionStatus: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
