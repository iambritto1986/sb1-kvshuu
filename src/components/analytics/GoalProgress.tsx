import React from 'react';

interface GoalProgressProps {
  completed: number;
  inProgress: number;
  notStarted: number;
  total: number;
}

const GoalProgress = ({ completed, inProgress, notStarted, total }: GoalProgressProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Goal Completion Status</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Completed</span>
            <span>{Math.round((completed / total) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completed / total) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>In Progress</span>
            <span>{Math.round((inProgress / total) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(inProgress / total) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Not Started</span>
            <span>{Math.round((notStarted / total) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gray-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(notStarted / total) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalProgress;