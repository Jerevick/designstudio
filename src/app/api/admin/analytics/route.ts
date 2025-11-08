import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    const [
      totalUsers,
      newUsers,
      totalDesigns,
      totalExports,
      activeUsers,
      premiumUsers,
      popularTemplates,
    ] = await Promise.all([
      // Total users
      prisma.user.count(),

      // New users in period
      prisma.user.count({
        where: { createdAt: { gte: startDate } },
      }),

      // Total designs
      prisma.design.count(),

      // Total exports
      prisma.output.count(),

      // Active users (created design in period)
      prisma.user.count({
        where: {
          designs: {
            some: {
              createdAt: { gte: startDate },
            },
          },
        },
      }),

      // Premium users
      prisma.user.count({
        where: {
          subscriptionTier: {
            in: ['PRO', 'BUSINESS', 'ENTERPRISE'],
          },
        },
      }),

      // Popular templates
      prisma.template.findMany({
        take: 10,
        orderBy: {
          designs: {
            _count: 'desc',
          },
        },
        include: {
          _count: {
            select: {
              designs: true,
            },
          },
        },
      }),
    ]);

    // Revenue calculation (approximate based on subscriptions)
    const subscriptions = await prisma.subscription.groupBy({
      by: ['tier'],
      where: {
        status: 'ACTIVE',
      },
      _count: true,
    });

    const monthlyRevenue = subscriptions.reduce((sum, sub) => {
      const price = sub.tier === 'PRO' ? 9.99 : sub.tier === 'BUSINESS' ? 29.99 : 0;
      return sum + price * sub._count;
    }, 0);

    return NextResponse.json({
      overview: {
        totalUsers,
        newUsers,
        totalDesigns,
        totalExports,
        activeUsers,
        premiumUsers,
        monthlyRevenue,
      },
      popularTemplates: popularTemplates.map((t) => ({
        id: t.id,
        name: t.name,
        category: t.category,
        thumbnail: t.thumbnail,
        usageCount: t._count.designs,
      })),
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
