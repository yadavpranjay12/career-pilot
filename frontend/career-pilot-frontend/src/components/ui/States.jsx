import React from 'react';
import { FiAlertCircle, FiInbox } from 'react-icons/fi';

export const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full p-12">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
    <p className="text-gray-500 font-medium">Loading dashboard data...</p>
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center h-full p-12 text-center">
    <FiAlertCircle className="w-12 h-12 text-red-500 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
    <p className="text-gray-500 mb-6 max-w-md">{message}</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);

export const EmptyState = ({ message = "No data available" }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
    <FiInbox className="w-10 h-10 text-gray-400 mb-3" />
    <p className="text-gray-500 text-sm">{message}</p>
  </div>
);