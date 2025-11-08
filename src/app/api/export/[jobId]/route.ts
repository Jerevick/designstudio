import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const output = await prisma.output.findFirst({
      where: {
        id: params.jobId,
        design: {
          userId: session.user.id,
        },
      },
      include: {
        design: {
          select: {
            status: true,
          },
        },
      },
    });

    if (!output) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Determine job status based on design status and output data
    let status = 'processing';
    if (output.fileUrl) {
      status = 'completed';
    } else if (output.design.status === 'FAILED') {
      status = 'failed';
    } else if (output.design.status === 'RENDERING') {
      status = 'processing';
    }

    return NextResponse.json({
      jobId: output.id,
      status,
      fileUrl: output.fileUrl || undefined,
      format: output.format,
      fileSize: output.fileSize,
      createdAt: output.createdAt,
    });
  } catch (error) {
    console.error('Error fetching export status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
