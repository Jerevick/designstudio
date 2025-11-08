'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="font-bold text-xl">Design Studio</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/templates"
                className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                  isActive('/templates')
                    ? 'text-indigo-600'
                    : 'text-gray-600'
                }`}
              >
                Templates
              </Link>
              <Link
                href="/pricing"
                className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                  isActive('/pricing') ? 'text-indigo-600' : 'text-gray-600'
                }`}
              >
                Pricing
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                    isActive('/dashboard')
                      ? 'text-indigo-600'
                      : 'text-gray-600'
                  }`}
                >
                  My Designs
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : session ? (
              <>
                {session.user.subscriptionTier !== 'FREE' && (
                  <Badge variant="secondary" className="hidden sm:inline-flex">
                    {session.user.subscriptionTier}
                  </Badge>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                        {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase()}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{session.user.name}</p>
                        <p className="text-xs text-gray-500">{session.user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">My Designs</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    {session.user.subscriptionTier === 'FREE' && (
                      <DropdownMenuItem asChild>
                        <Link href="/pricing" className="text-indigo-600">
                          Upgrade to Pro
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
