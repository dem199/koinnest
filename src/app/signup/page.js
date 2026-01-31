'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/auth/SignupForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ThemeToggle from '@/components/shared/ThemeToggle';

export default function SignupPage() {
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
            Join Koinnest
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Start your journey to better financial management
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-600 dark:text-emerald-400 text-xl">✓</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Instant Account Setup
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get started in less than 2 minutes
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-600 dark:text-emerald-400 text-xl">✓</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Secure & Private
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Bank-level security for your transactions
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-600 dark:text-emerald-400 text-xl">✓</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  No Hidden Fees
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Transparent pricing, no surprises
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="flex-1 w-full">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}