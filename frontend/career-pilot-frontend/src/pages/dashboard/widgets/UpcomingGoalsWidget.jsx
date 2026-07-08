import React from 'react';
import { EmptyState } from '../../../components/ui/States';
import { FiCheckCircle } from 'react-icons/fi';

export const UpcomingGoalsWidget = ({ goals }) => {
  if (!goals || goals.length === 0) {
    return <EmptyState message="No upcoming active goals." />;
  }

  return (
    <div className="space-y-4 p-2">
      {goals.map((goal) => {
        const progressPercentage = Math.min(100, Math.round((goal.completedCount / goal.targetCount) * 100));
        
        return (
          <div key={goal.id} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-sm font-semibold text-gray-900">{goal.title}</h4>
                <span className="text-xs text-gray-500">
                  Target: {goal.targetDate ? new Date(goal.targetDate).toLocaleDateString() : 'No date set'}
                </span>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-md">
                {goal.type}
              </span>
            </div>
            
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span className="font-medium">{goal.completedCount} / {goal.targetCount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};