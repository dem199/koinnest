'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import ThemeToggle from '@/components/shared/ThemeToggle';

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md">
              <span className="text-xl font-bold text-white">K</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Koinnest
            </span>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* User Info */}
            <div className="hidden sm:flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                <User size={16} color="white" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {user?.name || 'John Doe'}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {user?.email || 'demo@koinnest.com'}
                </p>
              </div>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors border border-red-200 dark:border-red-800"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}