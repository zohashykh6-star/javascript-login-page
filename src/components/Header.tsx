'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="text-xl font-bold text-black">
              📧 Email Server
            </Link>
            {user && (
              <nav className="hidden gap-8 md:flex">
                <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-black">
                  Dashboard
                </Link>
                <Link href="/profile" className="text-sm font-medium text-gray-700 hover:text-black">
                  Profile
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
            ) : user ? (
              <>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:bg-red-400"
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
