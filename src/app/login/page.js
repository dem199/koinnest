'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ThemeToggle from '@/components/shared/ThemeToggle';

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading..." />;
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12">
        {/* Left side - Branding */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-6">
            <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-3xl font-bold text-white">K</span>
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Koinnest
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Your trusted digital wallet for seamless money management
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Secure Transactions</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Easy Savings</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Bill Payments</span>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex-1 w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
