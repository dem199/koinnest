'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Check } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '@/components/shared/ThemeToggle';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const router = useRouter();

  const passwordRequirements = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*]/.test(formData.password),
  };

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!isPasswordValid) {
      setError('Password does not meet requirements');
      return;
    }

    if (!agreedToTerms) {
      setError('You must agree to the Terms of Service');
      return;
    }

    setLoading(true);

    try {
      await signup(formData.fullName, formData.email, formData.password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-[#1a3a47]">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 mb-6 shadow-lg">
            <span className="text-4xl font-bold text-white">K</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Join Koinnest
          </h1>
          
          <p className="text-lg mb-8 text-gray-600 dark:text-white">
            Start your journey to better financial management
          </p>

          <div className="space-y-4">
            {[
              { icon: '✓', title: 'Instant Account Setup', desc: 'Get started in less than 2 minutes' },
              { icon: '✓', title: 'Secure & Private', desc: 'Bank-level security for your transactions' },
              { icon: '✓', title: 'No Hidden Fees', desc: 'Transparent pricing, no surprises' },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm text-emerald-600 dark:text-emerald-300">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-white">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="bg-white dark:bg-[#2d4a56] rounded-2xl shadow-xl border border-gray-200 dark:border-[#3d5a66] p-8 max-w-md w-full mx-auto lg:mx-0">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="mb-6 text-gray-600 dark:text-white">
            Join Koinnest and start saving today
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-200 border border-red-200 dark:border-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#3d5a66] border border-gray-300 dark:border-[#4d6a76] rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="demo@koinnest.com"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#3d5a66] border border-gray-300 dark:border-[#4d6a76] rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Create a strong password"
                  required
                  className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-[#3d5a66] border border-gray-300 dark:border-[#4d6a76] rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 dark:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  placeholder="Re-enter your password"
                  required
                  className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-[#3d5a66] border border-gray-300 dark:border-[#4d6a76] rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 dark:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {formData.password && (
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-[#3d5a66]">
                <p className="text-xs font-semibold mb-2 text-gray-900 dark:text-white">
                  Password requirements:
                </p>
                <div className="space-y-1">
                  {[
                    { key: 'length', label: 'At least 8 characters' },
                    { key: 'uppercase', label: 'One uppercase & one lowercase letter' },
                    { key: 'number', label: 'One number & one special character' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        passwordRequirements[key] ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}>
                        {passwordRequirements[key] && <Check size={12} color="white" />}
                      </div>
                      <span className="text-xs text-gray-600 dark:text-white">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded accent-emerald-500"
              />
              <span className="text-sm text-gray-600 dark:text-white">
                I agree to the{' '}
                <Link href="/terms" className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !isPasswordValid || !agreedToTerms}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-[#3d5a66]">
            <p className="text-center text-sm text-gray-600 dark:text-white">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}