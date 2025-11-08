import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { exportSchema } from '@/utils/validators';
import { SUBSCRIPTION_LIMITS } from '@/utils/constants';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = exportSchema.parse(body);

    // Get user and design
    const [user, design] = await Promise.all([
      prisma.user.findUnique({
        where: { id: session.user.id },
      }),
      prisma.design.findFirst({
        where: {
          id: validatedData.designId,
          userId: session.user.id,
        },
        include: { template: true },
      }),
    ]);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }

    // Check subscription limits
    const limits = SUBSCRIPTION_LIMITS[user.subscriptionTier];

    // Check if format is allowed
    if (!limits.formats.includes(validatedData.format)) {
      return NextResponse.json(
        {
          error: `${validatedData.format} format is not available on your plan. Upgrade to access all formats.`,
        },
        { status: 403 }
      );
    }

    // Check DPI limit
    const requestedDpi = validatedData.dpi || 300;
    if (requestedDpi > limits.max_dpi) {
      return NextResponse.json(
        {
          error: `Maximum DPI for your plan is ${limits.max_dpi}. Upgrade for higher quality exports.`,
        },
        { status: 403 }
      );
    }

    // Create export job (for now, we'll create the output record immediately)
    // In production, this would queue a background job
    const output = await prisma.output.create({
      data: {
        designId: design.id,
        format: validatedData.format,
        width: validatedData.width || design.template.width,
        height: validatedData.height || design.template.height,
        dpi: requestedDpi,
        fileUrl: '', // Will be updated by worker
        fileSize: 0, // Will be updated by worker
      },
    });

    // Update design status
    await prisma.design.update({
      where: { id: design.id },
      data: { status: 'RENDERING' },
    });

    // Return job ID for polling
    return NextResponse.json({
      jobId: output.id,
      status: 'queued',
      message: 'Export job created successfully',
    });
  } catch (error) {
    console.error('Error creating export job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
