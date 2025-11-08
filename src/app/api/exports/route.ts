import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const outputs = await prisma.output.findMany({
      where: {
        design: {
          userId: session.user.id,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        design: {
          select: {
            id: true,
            name: true,
            template: {
              select: {
                name: true,
                category: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ exports: outputs });
  } catch (error) {
    console.error('Error fetching exports:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
