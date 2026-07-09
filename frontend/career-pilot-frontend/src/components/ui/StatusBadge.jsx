import React from 'react';

const STATUS_MAP = {
  SAVED: 'bg-slate-100 text-slate-800',
  APPLIED: 'bg-blue-100 text-blue-800',
  OA_RECEIVED: 'bg-amber-100 text-amber-800',
  OA_COMPLETED: 'bg-orange-100 text-orange-800',
  INTERVIEW: 'bg-purple-100 text-purple-800',
  OFFER: 'bg-emerald-100 text-emerald-800',
  REJECTED: 'bg-red-100 text-red-800',
  WITHDRAWN: 'bg-gray-100 text-gray-600'
};

export const StatusBadge = ({ status }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_MAP[status] || STATUS_MAP.SAVED}`}>
    {status.replace('_', ' ')}
  </span>
);