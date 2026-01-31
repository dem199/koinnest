'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Shield, AlertTriangle, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const SafeToSpend = () => {
  const { user } = useAuth();
  const [safeAmount, setSafeAmount] = useState(0);
  const [status, setStatus] = useState('safe');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateSafe = () => {
      if (!user?.balance) {
        setLoading(false);
        return;
      }

      try {
        const balance = user.balance || 0;
        const upcomingBills = 200;
        const savingsGoal = balance * 0.1;
        const buffer = Math.max(50, balance * 0.05);
        
        const safe = Math.max(0, balance - upcomingBills - savingsGoal - buffer);
        setSafeAmount(safe);
        
        const percentage = (safe / balance) * 100;
        if (percentage > 40) setStatus('safe');
        else if (percentage > 20) setStatus('caution');
        else setStatus('danger');
      } catch (error) {
        console.error('Failed to calculate safe to spend:', error);
      } finally {
        setLoading(false);
      }
    };

    calculateSafe();
  }, [user]);

  const getStatusConfig = () => {
    const configs = {
      safe: {
        icon: Shield,
        bgFrom: 'from-green-500',
        bgTo: 'to-emerald-600',
        message: "You're good to go!",
        emoji: '💚',
      },
      caution: {
        icon: AlertTriangle,
        bgFrom: 'from-yellow-500',
        bgTo: 'to-orange-500',
        message: 'Spend carefully',
        emoji: '⚠️',
      },
      danger: {
        icon: AlertTriangle,
        bgFrom: 'from-red-500',
        bgTo: 'to-red-600',
        message: 'Low funds alert!',
        emoji: '🚨',
      },
    };
    return configs[status];
  };

  if (loading) {
    return (
      <div className="h-full min-h-[200px] bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br ${config.bgFrom} ${config.bgTo} text-white p-6 h-full`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <StatusIcon size={20} />
            <h3 className="font-semibold">Safe to Spend</h3>
          </div>
          <span className="text-3xl">{config.emoji}</span>
        </div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-3"
        >
          <div className="text-5xl font-bold mb-1">
            ${safeAmount.toFixed(0)}
          </div>
          <p className="text-sm opacity-90">{config.message}</p>
        </motion.div>

        <div className="text-xs opacity-75">
          After bills, savings & buffer
        </div>
      </div>
    </motion.div>
  );
};

export default SafeToSpend;