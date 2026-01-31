'use client';

import React from 'react';
import { Send, Download, CreditCard, PiggyBank } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const QuickActions = ({ onSendMoney }) => {
  const actions = [
    {
      icon: Send,
      label: 'Send',
      color: 'emerald',
      onClick: onSendMoney,
    },
    {
      icon: Download,
      label: 'Request',
      color: 'blue',
      onClick: () => {
        toast('📥 Request money feature coming soon!', {
          duration: 2000,
          style: {
            background: '#3B82F6',
            color: '#fff',
          },
        });
      },
    },
    {
      icon: CreditCard,
      label: 'Bills',
      color: 'purple',
      onClick: () => {
        toast('💳 Pay bills feature coming soon!', {
          duration: 2000,
          style: {
            background: '#8B5CF6',
            color: '#fff',
          },
        });
      },
    },
    {
      icon: PiggyBank,
      label: 'Save',
      color: 'pink',
      onClick: () => {
        toast('🐷 Savings feature coming soon!', {
          duration: 2000,
          style: {
            background: '#EC4899',
            color: '#fff',
          },
        });
      },
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50',
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50',
      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50',
      pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-900/50',
    };
    return colors[color] || colors.emerald;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-4 gap-4"
    >
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={index}
            variants={item}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className={`${getColorClasses(action.color)} p-6 rounded-xl transition-all duration-200 flex flex-col items-center gap-3 shadow-sm hover:shadow-md`}
          >
            <Icon size={28} />
            <span className="font-medium">{action.label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
};


export default QuickActions;