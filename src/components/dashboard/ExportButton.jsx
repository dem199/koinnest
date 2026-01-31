'use client';

import React, { useState } from 'react';
import { Download, FileSpreadsheet, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const ExportButton = ({ transactions }) => {
  const [exporting, setExporting] = useState(false);

  const formatDateForExcel = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const exportToCSV = () => {
    if (transactions.length === 0) {
      toast.error('No transactions to export');
      return;
    }

    setExporting(true);

    try {
      // Prepare CSV headers
      const headers = [
        'Date',
        'Type',
        'Category',
        'Description',
        'Recipient',
        'Amount',
        'Status',
      ];

      // Prepare CSV rows
      const rows = transactions.map((txn) => [
        formatDateForExcel(txn.date),
        txn.type.charAt(0).toUpperCase() + txn.type.slice(1),
        txn.category.charAt(0).toUpperCase() + txn.category.slice(1),
        `"${txn.description}"`, // Wrap in quotes to handle commas
        `"${txn.recipient}"`,
        txn.amount.toFixed(2),
        txn.status.charAt(0).toUpperCase() + txn.status.slice(1),
      ]);

      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.join(',')),
      ].join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `koinnest-transactions-${new Date().toISOString().split('T')[0]}.csv`
      );
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Transactions exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export transactions');
    } finally {
      setTimeout(() => setExporting(false), 1000);
    }
  };

  const exportToJSON = () => {
    if (transactions.length === 0) {
      toast.error('No transactions to export');
      return;
    }

    setExporting(true);

    try {
      // Prepare JSON data
      const jsonData = JSON.stringify(transactions, null, 2);

      // Create blob and download
      const blob = new Blob([jsonData], { type: 'application/json' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `koinnest-transactions-${new Date().toISOString().split('T')[0]}.json`
      );
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Transactions exported as JSON!');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export transactions');
    } finally {
      setTimeout(() => setExporting(false), 1000);
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={exportToCSV}
        disabled={exporting || transactions.length === 0}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {exporting ? (
          <>
            <Check size={18} className="animate-pulse" />
            <span className="hidden sm:inline">Exporting...</span>
          </>
        ) : (
          <>
            <Download size={18} />
            <span className="hidden sm:inline">Export</span>
          </>
        )}
      </button>

      {/* Export Options Dropdown */}
      {!exporting && transactions.length > 0 && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
          <div className="p-2">
            <button
              onClick={exportToCSV}
              className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FileSpreadsheet size={18} className="text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="font-medium text-sm">Export as CSV</p>
                <p className="text-xs text-gray-500">Excel compatible</p>
              </div>
            </button>

            <button
              onClick={exportToJSON}
              className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors mt-1"
            >
              <FileSpreadsheet size={18} className="text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-medium text-sm">Export as JSON</p>
                <p className="text-xs text-gray-500">Developer friendly</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportButton;
