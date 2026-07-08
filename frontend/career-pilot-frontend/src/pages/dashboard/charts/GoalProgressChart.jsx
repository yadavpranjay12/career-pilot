import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EmptyState } from '../../../components/ui/States';

export const GoalProgressChart = ({ goals }) => {
  const data = useMemo(() => {
    if (!goals || goals.length === 0) return [];
    return goals.map(goal => ({
      name: goal.title.length > 15 ? goal.title.substring(0, 15) + '...' : goal.title,
      Completed: goal.completedCount,
      Remaining: Math.max(0, goal.targetCount - goal.completedCount)
    }));
  }, [goals]);

  if (data.length === 0) {
    return <EmptyState message="No active goals to track." />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
        <Tooltip 
          cursor={{ fill: '#f1f5f9' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Legend wrapperStyle={{ paddingTop: '10px' }} />
        <Bar dataKey="Completed" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
        <Bar dataKey="Remaining" stackId="a" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};