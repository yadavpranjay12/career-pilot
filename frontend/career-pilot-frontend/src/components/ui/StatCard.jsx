import React from 'react';

export const StatCard = ({ title, value, icon }) => {
  return (
    <div className="saas-card flex items-center space-x-6">
      <div className="p-5 rounded-2xl saas-bg-subtle text-orange-600 shadow-sm">
        <div className="w-8 h-8 [&>svg]:w-full [&>svg]:h-full">
          {icon}
        </div>
      </div>
      <div>
        <p className="saas-subheading text-xs uppercase mb-1.5">{title}</p>
        <h3 className="text-4xl saas-heading">{value}</h3>
      </div>
    </div>
  );
};