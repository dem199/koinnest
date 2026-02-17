'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '@/components/shared/ThemeToggle';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 auth-page" 
         style={{ 
           backgroundColor: 'var(--auth-bg, #f9fafb)',
         }}>
      <style jsx>{`
        :global(.dark) {
          --auth-bg: #1a3a47;
          --form-bg: #2d4a56;
          --form-border: #3d5a66;
          --input-bg: #3d5a66;
          --input-border: #4d6a76;
          --demo-bg: #2d4a56;
        }
        
        /* Force ALL text pure white in dark mode - ENTIRE PAGE */
        :global(.dark) .auth-page h1,
        :global(.dark) .auth-page h2,
        :global(.dark) .auth-page h3,
        :global(.dark) .auth-page p,
        :global(.dark) .auth-page span,
        :global(.dark) .auth-page label,
        :global(.dark) .auth-page div {
          color: white !important;
        }
        
        /* Keep links emerald */
        :global(.dark) .auth-page a {
          color: #34d399 !important;
        }
        
        /* Keep button text white */
        :global(.dark) .auth-page button {
          color: white !important;
        }
      `}</style>
      
      {/* Theme Toggle - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 mb-6 shadow-lg">
            <span className="text-4xl font-bold text-white">K</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Koinnest
          </h1>
          
          <p className="text-lg mb-8 text-gray-600">
            Your trusted digital wallet for seamless money management
          </p>

          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-gray-600">Secure Transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-gray-600">Easy Savings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-gray-600">Bill Payments</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-md w-full mx-auto lg:mx-0"
             style={{
               backgroundColor: 'var(--form-bg, white)',
               borderColor: 'var(--form-border, #e5e7eb)',
             }}>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            Welcome Back
          </h2>
          <p className="mb-6 text-gray-600">
            Sign in to your Koinnest account
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 border border-red-200 dark:border-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@koinnest.com"
                required
                style={{
                  backgroundColor: 'var(--input-bg, #f9fafb)',
                  borderColor: 'var(--input-border, #d1d5db)',
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-900">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    backgroundColor: 'var(--input-bg, #f9fafb)',
                    borderColor: 'var(--input-border, #d1d5db)',
                  }}
                  className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-emerald-500"
                />
                <span className="text-sm text-gray-600">
                  Remember me
                </span>
              </label>
              <Link 
                href="/forgot-password" 
                className="text-sm font-medium text-emerald-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200"
               style={{ borderColor: 'var(--form-border, #e5e7eb)' }}>
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link 
                href="/signup" 
                className="font-medium text-emerald-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200"
               style={{
                 backgroundColor: 'var(--demo-bg, #eff6ff)',
                 borderColor: 'var(--form-border, #bfdbfe)',
               }}>
            <p className="text-xs font-semibold mb-1 text-gray-900">
              Demo Credentials:
            </p>
            <p className="text-xs text-gray-700">
              Email: demo@koinnest.com
            </p>
            <p className="text-xs text-gray-700">
              Password: Demo123!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}