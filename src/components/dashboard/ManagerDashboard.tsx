import React from 'react';
import { Users, Target, Calendar, TrendingUp } from 'lucide-react';
import MetricCard from './MetricCard';
import TaskList from './TaskList';

interface ManagerDashboardProps {
  onNewEvaluation: () => void;
}

const ManagerDashboard = ({ onNewEvaluation }: ManagerDashboardProps) => {
  const metrics = [
    {
      id: 'team',
      icon: Users,
      label: 'Team Members',
      value: '12',
      change: '+2',
      changeType: 'increase' as const
    },
    {
      id: 'goals',
      icon: Target,
      label: 'Active Goals',
      value: '34',
      change: '+5',
      changeType: 'increase' as const
    },
    {
      id: 'reviews',
      icon: Calendar,
      label: 'Pending Reviews',
      value: '8',
      change: '-3',
      changeType: 'decrease' as const
    },
    {
      id: 'performance',
      icon: TrendingUp,
      label: 'Avg Performance',
      value: '4.2/5',
      change: '+0.3',
      changeType: 'increase' as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Team Dashboard
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={onNewEvaluation}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            New Evaluation
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            Schedule Meeting
          </button>
        </div>
      </div>

      {/* Team Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>

      {/* Tasks Section */}
      <div className="space-y-6">
        <TaskList />
      </div>

      {/* Team Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Team Performance
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Sarah Johnson', role: 'Software Engineer', score: 4.5 },
              { name: 'Michael Chen', role: 'Product Designer', score: 4.2 },
              { name: 'Emily Davis', role: 'Project Manager', score: 4.8 }
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
                <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  {member.score}/5
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Goal Progress
          </h2>
          <div className="space-y-6">
            {[
              { category: 'Technical Goals', completed: 75 },
              { category: 'Project Deliverables', completed: 60 },
              { category: 'Team Collaboration', completed: 90 }
            ].map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>{goal.category}</span>
                  <span>{goal.completed}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.completed}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;