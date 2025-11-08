import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    const [
      designsCreated,
      exportsGenerated,
      recentDesigns,
      popularTemplates,
    ] = await Promise.all([
      // Designs created in period
      prisma.design.count({
        where: {
          userId: session.user.id,
          createdAt: { gte: startDate },
        },
      }),

      // Exports generated in period
      prisma.output.count({
        where: {
          design: { userId: session.user.id },
          createdAt: { gte: startDate },
        },
      }),

      // Recent designs
      prisma.design.findMany({
        where: { userId: session.user.id },
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: {
          template: {
            select: {
              name: true,
              category: true,
              thumbnail: true,
            },
          },
        },
      }),

      // Most used templates
      prisma.design.groupBy({
        by: ['templateId'],
        where: {
          userId: session.user.id,
          createdAt: { gte: startDate },
        },
        _count: { templateId: true },
        orderBy: { _count: { templateId: 'desc' } },
        take: 5,
      }),
    ]);

    // Get template details for popular templates
    const templateIds = popularTemplates.map((t) => t.templateId);
    const templates = await prisma.template.findMany({
      where: { id: { in: templateIds } },
      select: {
        id: true,
        name: true,
        category: true,
        thumbnail: true,
      },
    });

    const popularTemplatesWithDetails = popularTemplates.map((pt) => ({
      template: templates.find((t) => t.id === pt.templateId),
      count: pt._count.templateId,
    }));

    return NextResponse.json({
      stats: {
        designsCreated,
        exportsGenerated,
      },
      recentDesigns,
      popularTemplates: popularTemplatesWithDetails,
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
