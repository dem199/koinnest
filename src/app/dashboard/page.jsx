'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import BalanceCard from '@/components/dashboard/BalanceCard';
import SafeToSpend from '@/components/dashboard/SafeToSpend';
import QuickActions from '@/components/dashboard/QuickActions';
import SubscriptionTracker from '@/components/dashboard/SubscriptionTracker';
import SpendingInsights from '@/components/dashboard/SpendingInsights';
import ChartSection from '@/components/dashboard/ChartSection';
import TransactionsList from '@/components/dashboard/TransactionsList';
import SendMoneyModal from '@/components/dashboard/SendMoneyModal';
import AddExpenseModal from '@/components/dashboard/AddExpenseModal';
import { Plus, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const [isSendMoneyOpen, setIsSendMoneyOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTransactionSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <DashboardHeader />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Here&apos;s what&apos;s happening with your money today.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddExpenseOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              <span>Add Transaction</span>
            </motion.button>
          </motion.div>

          {/* NEW FEATURES BANNER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-white rounded-xl p-5 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <Sparkles size={28} />
              </motion.div>
              <div>
                <p className="font-bold text-xl">🎉 New Features Added!</p>
                <p className="text-sm opacity-90">Check out Safe-to-Spend & Subscription Tracker below</p>
              </div>
            </div>
          </motion.div>

          {/* Top Section: Balance + Safe to Spend */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <BalanceCard />
            <div key={`safe-${refreshKey}`}>
              <SafeToSpend />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              Quick Actions
            </motion.h2>
            <QuickActions onSendMoney={() => setIsSendMoneyOpen(true)} />
          </div>

          {/* Spending Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            key={`insights-${refreshKey}`}
            className="mb-8"
          >
            <SpendingInsights />
          </motion.div>

          {/* Subscription Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            key={`subscriptions-${refreshKey}`}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded"
              >
                NEW
              </motion.span>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                💳 Subscription Tracker
              </h2>
            </div>
            <SubscriptionTracker />
          </motion.div>

          {/* Charts Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            key={`charts-${refreshKey}`}
            className="mb-8"
          >
            <ChartSection />
          </motion.div>

          {/* Transactions List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            key={`transactions-${refreshKey}`}
          >
            <TransactionsList />
          </motion.div>
        </main>

        {/* Modals */}
        <SendMoneyModal
          isOpen={isSendMoneyOpen}
          onClose={() => setIsSendMoneyOpen(false)}
          onSuccess={handleTransactionSuccess}
        />

        <AddExpenseModal
          isOpen={isAddExpenseOpen}
          onClose={() => setIsAddExpenseOpen(false)}
          onSuccess={handleTransactionSuccess}
        />
      </div>
    </ProtectedRoute>
  );
}