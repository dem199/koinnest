'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { transactionAPI } from '@/lib/api';
import { Lightbulb, TrendingUp, TrendingDown, AlertCircle, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SpendingInsights() {
  const { user } = useAuth();
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateInsights = async () => {
      if (!user?.id) return;

      try {
        const transactions = await transactionAPI.getTransactions(user.id);
        const now = new Date();
        const thisMonth = transactions.filter(t => {
          const date = new Date(t.date);
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        });

        const lastMonth = transactions.filter(t => {
          const date = new Date(t.date);
          const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1);
          return date.getMonth() === lastMonthDate.getMonth();
        });

        const newInsights = [];

        // Insight 1: Spending Trend
        const thisMonthSpent = thisMonth
          .filter(t => t.type === 'send' || t.type === 'bills')
          .reduce((sum, t) => sum + t.amount, 0);

        const lastMonthSpent = lastMonth
          .filter(t => t.type === 'send' || t.type === 'bills')
          .reduce((sum, t) => sum + t.amount, 0);

        const percentChange = lastMonthSpent > 0 
          ? ((thisMonthSpent - lastMonthSpent) / lastMonthSpent * 100).toFixed(1)
          : 0;

        if (percentChange > 10) {
          newInsights.push({
            id: 1,
            type: 'warning',
            icon: TrendingUp,
            title: 'Spending Alert',
            message: `You're spending ${percentChange}% more than last month. Consider reviewing your expenses.`,
            color: 'error',
          });
        } else if (percentChange < -10) {
          newInsights.push({
            id: 2,
            type: 'success',
            icon: Trophy,
            title: 'Great Job!',
            message: `You've reduced spending by ${Math.abs(percentChange)}% compared to last month!`,
            color: 'success',
          });
        }

        // Insight 2: Top Category
        const categorySpending = {};
        thisMonth
          .filter(t => t.type === 'send' || t.type === 'bills')
          .forEach(t => {
            categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
          });

        const topCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];
        if (topCategory) {
          newInsights.push({
            id: 3,
            type: 'info',
            icon: AlertCircle,
            title: 'Top Spending Category',
            message: `Most money went to ${topCategory[0]}: $${topCategory[1].toFixed(2)}. Is this aligned with your priorities?`,
            color: 'info',
          });
        }

        // Insight 3: Savings Potential
        const smallPurchases = thisMonth
          .filter(t => (t.type === 'send' || t.type === 'bills') && t.amount < 20)
          .reduce((sum, t) => sum + t.amount, 0);

        if (smallPurchases > 100) {
          newInsights.push({
            id: 4,
            type: 'tip',
            icon: Lightbulb,
            title: 'Savings Opportunity',
            message: `You spent $${smallPurchases.toFixed(2)} on small purchases. Reducing these by 50% could save you $${(smallPurchases * 6).toFixed(2)}/year!`,
            color: 'warning',
          });
        }

        // Insight 4: Income vs Expenses
        const income = thisMonth
          .filter(t => t.type === 'receive')
          .reduce((sum, t) => sum + t.amount, 0);

        const savingsRate = income > 0 ? ((income - thisMonthSpent) / income * 100).toFixed(1) : 0;

        if (savingsRate > 20) {
          newInsights.push({
            id: 5,
            type: 'success',
            icon: Trophy,
            title: 'Excellent Savings Rate!',
            message: `You're saving ${savingsRate}% of your income. Keep it up!`,
            color: 'success',
          });
        } else if (savingsRate < 10 && income > 0) {
          newInsights.push({
            id: 6,
            type: 'warning',
            icon: TrendingDown,
            title: 'Low Savings Rate',
            message: `You're only saving ${savingsRate}% of your income. Aim for at least 20%.`,
            color: 'warning',
          });
        }

        setInsights(newInsights.slice(0, 3));
      } catch (error) {
        console.error('Failed to generate insights:', error);
      } finally {
        setLoading(false);
      }
    };

    generateInsights();
  }, [user]);

  const getColorStyles = (color) => {
    const styles = {
      error: {
        bg: 'var(--error-bg)',
        border: 'var(--error-border)',
        text: 'var(--text-primary)',
        icon: 'var(--error)',
      },
      success: {
        bg: 'var(--success-bg)',
        border: 'var(--success-border)',
        text: 'var(--text-primary)',
        icon: 'var(--success)',
      },
      info: {
        bg: 'var(--info-bg)',
        border: 'var(--info-border)',
        text: 'var(--text-primary)',
        icon: 'var(--info)',
      },
      warning: {
        bg: 'var(--warning-bg)',
        border: 'var(--warning-border)',
        text: 'var(--text-primary)',
        icon: 'var(--warning)',
      },
    };
    return styles[color] || styles.info;
  };

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-3">
          <div className="h-6 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', width: '33%' }} />
          <div className="h-20 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
        </div>
      </div>
    );
  }

  if (insights.length === 0) {
    return (
      <div className="card text-center py-8">
        <Lightbulb size={40} className="mx-auto mb-3" style={{ color: 'var(--text-tertiary)' }} />
        <p style={{ color: 'var(--text-secondary)' }}>
          Add more transactions to get personalized insights!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <Lightbulb size={20} style={{ color: 'var(--warning)' }} />
        Your Money Insights
      </h2>

      {insights.map((insight, index) => {
        const Icon = insight.icon;
        const colorStyles = getColorStyles(insight.color);
        
        return (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border rounded-lg p-4"
            style={{
              backgroundColor: colorStyles.bg,
              borderColor: colorStyles.border,
            }}
          >
            <div className="flex items-start gap-3">
              <Icon size={24} className="flex-shrink-0 mt-0.5" style={{ color: colorStyles.icon }} />
              <div className="flex-1">
                <h3 className="font-semibold mb-1" style={{ color: colorStyles.text }}>
                  {insight.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {insight.message}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}