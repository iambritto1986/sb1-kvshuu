import React from 'react';
import { X, Target, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  progress: number;
  dueDate: string;
}

interface ViewMemberGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: string | null;
  memberName: string;
}

const ViewMemberGoalsModal = ({ isOpen, onClose, memberId, memberName }: ViewMemberGoalsModalProps) => {
  // Mock goals data - in a real app, this would be fetched based on memberId
  const goals: Goal[] = [
    {
      id: '1',
      title: 'Complete Advanced React Training',
      description: 'Master advanced React concepts including hooks, context, and performance optimization',
      status: 'IN_PROGRESS',
      progress: 65,
      dueDate: '2024-06-30'
    },
    {
      id: '2',
      title: 'Improve Code Review Process',
      description: 'Implement and document new code review guidelines for the team',
      status: 'NOT_STARTED',
      progress: 0,
      dueDate: '2024-07-15'
    },
    {
      id: '3',
      title: 'API Documentation',
      description: 'Complete comprehensive documentation for the new API endpoints',
      status: 'COMPLETED',
      progress: 100,
      dueDate: '2024-03-15'
    }
  ];

  if (!isOpen) return null;

  const getStatusIcon = (status: Goal['status']) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'IN_PROGRESS':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'NOT_STARTED':
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-400';
      case 'IN_PROGRESS':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400';
      case 'NOT_STARTED':
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/50 dark:text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {memberName}'s Goals
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {goal.title}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                      {goal.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {goal.description}
                  </p>
                </div>
                {getStatusIcon(goal.status)}
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Due: {new Date(goal.dueDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewMemberGoalsModal;