import React from 'react';
import { Target, TrendingUp, MessageSquare, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTasks } from '../../contexts/TaskContext';
import TaskList from './TaskList';
import MetricCard from './MetricCard';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { tasks } = useTasks();

  // Filter tasks assigned to the current user
  const userTasks = tasks.filter(task => task.assignedTo === user?.id);
  const pendingTasks = userTasks.filter(task => task.status === 'PENDING');

  const metrics = [
    {
      id: 'goals',
      icon: Target,
      label: 'My Active Goals',
      value: '4',
      change: '+1',
      changeType: 'increase' as const
    },
    {
      id: 'performance',
      icon: TrendingUp,
      label: 'Performance Score',
      value: '4.2/5',
      change: '+0.3',
      changeType: 'increase' as const
    },
    {
      id: 'feedback',
      icon: MessageSquare,
      label: 'Recent Feedback',
      value: '3',
      change: '+2',
      changeType: 'increase' as const
    },
    {
      id: 'reviews',
      icon: Calendar,
      label: 'Next Review',
      value: '15 days',
      change: 'Upcoming',
      changeType: 'increase' as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Here's your performance overview
          </p>
        </div>
      </div>

      {/* Personal Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>

      {/* Tasks Section */}
      <div className="space-y-6">
        <TaskList />
      </div>

      {/* Recent Performance Updates */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Performance Updates
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-green-800 dark:text-green-300">
                  Goal Achievement
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Completed API Integration project ahead of schedule
                </p>
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">
                2 days ago
              </span>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-800 dark:text-blue-300">
                  Skill Development
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Completed Advanced React Training
                </p>
              </div>
              <span className="text-sm text-blue-600 dark:text-blue-400">
                1 week ago
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Reviews */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upcoming Reviews
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Q2 Performance Review
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Scheduled for June 15, 2024
              </p>
            </div>
            <span className="px-3 py-1 text-sm bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 rounded-full">
              In 15 days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;