import React from 'react';

export const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-[400px]">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="flex-1 w-full relative">
        {children}
      </div>
    </div>
  );
};