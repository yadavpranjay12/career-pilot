import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { EmptyState } from '../../../components/ui/States';

const COLORS = {
  SAVED: '#94a3b8',
  APPLIED: '#3b82f6',
  OA_RECEIVED: '#eab308',
  OA_COMPLETED: '#f97316',
  INTERVIEW: '#a855f7',
  OFFER: '#22c55e',
  REJECTED: '#ef4444',
  WITHDRAWN: '#64748b'
};

export const ApplicationStatusChart = ({ statusMap }) => {
  const data = useMemo(() => {
    if (!statusMap) return [];
    return Object.entries(statusMap).map(([key, value]) => ({
      name: key.replace('_', ' '),
      value: value
    })).filter(item => item.value > 0);
  }, [statusMap]);

  if (data.length === 0) {
    return <EmptyState message="No application data to visualize." />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name.replace(' ', '_')] || '#cbd5e1'} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px' }} />
      </PieChart>
    </ResponsiveContainer>
  );
};