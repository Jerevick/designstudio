'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDesigns, useDeleteDesign } from '@/hooks/queries/useDesigns';
import { useUserStats } from '@/hooks/queries/useUser';
import { SUBSCRIPTION_LIMITS } from '@/utils/constants';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: designs, isLoading: designsLoading } = useDesigns();
  const { data: stats } = useUserStats('month');
  const deleteDesign = useDeleteDesign();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  const tier = session.user.subscriptionTier;
  const limits = SUBSCRIPTION_LIMITS[tier];
  const designsThisMonth = stats?.designsInPeriod || 0;
  const usagePercentage = limits.maxDesignsPerMonth === -1 
    ? 0 
    : (designsThisMonth / limits.maxDesignsPerMonth) * 100;

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this design?')) {
      await deleteDesign.mutateAsync(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Designs</h1>
          <p className="text-gray-600">
            Welcome back, {session.user.name || session.user.email}!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Subscription Plan</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                {tier}
                {tier !== 'FREE' && (
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardFooter>
              {tier === 'FREE' ? (
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/pricing">Upgrade to Pro</Link>
                </Button>
              ) : (
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href="/settings">Manage Subscription</Link>
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Designs This Month</CardDescription>
              <CardTitle className="text-2xl">
                {designsThisMonth}
                {limits.maxDesignsPerMonth !== -1 && (
                  <span className="text-base text-gray-500 ml-2">
                    / {limits.maxDesignsPerMonth}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {limits.maxDesignsPerMonth !== -1 && (
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        usagePercentage >= 90
                          ? 'bg-red-500'
                          : usagePercentage >= 70
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    />
                  </div>
                  {usagePercentage >= 90 && tier === 'FREE' && (
                    <p className="text-xs text-red-600">
                      Almost at your limit! Upgrade for unlimited designs.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Designs</CardDescription>
              <CardTitle className="text-2xl">{stats?.totalDesigns || 0}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full" size="sm">
                <Link href="/templates">Create New Design</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Upgrade Banner for Free Users */}
        {tier === 'FREE' && usagePercentage >= 50 && (
          <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                You're using {Math.round(usagePercentage)}% of your monthly design limit. 
                Upgrade to Pro for unlimited designs and premium features.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href="/pricing">View Plans</Link>
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Designs Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Designs</h2>
            <Button asChild>
              <Link href="/templates">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Design
              </Link>
            </Button>
          </div>

          {designsLoading ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : designs && designs.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {designs.map((design) => (
                <Card key={design.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative group">
                      {design.previewUrl ? (
                        <img
                          src={design.previewUrl}
                          alt={design.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-4xl">
                          {design.name[0]}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button asChild variant="secondary" size="sm">
                          <Link href={`/editor/${design.id}`}>Edit</Link>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{design.name}</h3>
                    <p className="text-xs text-gray-500">
                      {design.template.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(design.updatedAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={`/editor/${design.id}`}>Edit</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(design.id)}
                      disabled={deleteDesign.isPending}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <CardContent>
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">No designs yet</h3>
                <p className="text-gray-600 mb-4">
                  Start creating amazing designs with our templates
                </p>
                <Button asChild>
                  <Link href="/templates">Browse Templates</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
