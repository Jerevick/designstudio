import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createTemplateSchema } from '@/utils/validators';

// Admin-only endpoint for creating templates
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Add admin check
    // For now, we'll allow any authenticated user to create templates
    // In production, check user role or specific permissions

    const body = await request.json();
    const validatedData = createTemplateSchema.parse(body);

    const template = await prisma.template.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        category: validatedData.category,
        width: validatedData.width,
        height: validatedData.height,
        data: validatedData.data,
        thumbnail: '', // Will be generated
        isPremium: validatedData.isPremium || false,
        price: validatedData.price,
        tags: validatedData.tags || [],
        creatorId: session.user.id,
      },
    });

    return NextResponse.json({ template }, { status: 201 });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
