import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Star, Target, TrendingUp, Award } from 'lucide-react';
import MetricCard from './MetricCard';
import PerformanceChart from './PerformanceChart';
import GoalProgress from './GoalProgress';

const PersonalAnalytics = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('quarter');

  const performanceData = [
    { name: 'Jan', value: 4.2 },
    { name: 'Feb', value: 4.4 },
    { name: 'Mar', value: 4.3 },
    { name: 'Apr', value: 4.5 },
    { name: 'May', value: 4.6 },
    { name: 'Jun', value: 4.8 }
  ];

  const goalData = {
    total: 8,
    completed: 5,
    inProgress: 2,
    notStarted: 1
  };

  const metrics = [
    {
      icon: Star,
      label: 'Current Rating',
      value: '4.5',
      change: '+0.3',
      changeType: 'increase' as const,
      iconBgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      icon: Target,
      label: 'Goals Progress',
      value: '5/8',
      change: '62.5%',
      changeType: 'increase' as const,
      iconBgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Award,
      label: 'Achievements',
      value: '12',
      change: '+3',
      changeType: 'increase' as const,
      iconBgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      label: 'Growth Track',
      value: 'On Target',
      change: '+15%',
      changeType: 'increase' as const,
      iconBgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    }
  ];

  const skillMetrics = [
    { category: 'Technical Skills', score: 4.5, previousScore: 4.2 },
    { category: 'Communication', score: 4.2, previousScore: 4.0 },
    { category: 'Problem Solving', score: 4.7, previousScore: 4.5 },
    { category: 'Teamwork', score: 4.6, previousScore: 4.4 },
    { category: 'Initiative', score: 4.3, previousScore: 4.1 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Analytics</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your performance and growth
          </p>
        </div>
        <select
          className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="6months">Last 6 Months</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart data={performanceData} />
        <GoalProgress {...goalData} />
      </div>

      {/* Skill Development */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Skill Development
        </h2>
        <div className="space-y-6">
          {skillMetrics.map((metric) => (
            <div key={metric.category}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {metric.category}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Previous: {metric.previousScore}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Current: {metric.score}
                  </span>
                </div>
              </div>
              <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="absolute left-0 h-2 bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${(metric.score / 5) * 100}%` }}
                />
                <div
                  className="absolute h-4 w-0.5 bg-gray-400 dark:bg-gray-500 transform -translate-y-1"
                  style={{ left: `${(metric.previousScore / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Feedback
        </h2>
        <div className="space-y-4">
          {[
            {
              date: '2024-03-15',
              author: 'Team Lead',
              content: 'Excellent work on the recent project. Your technical skills have shown significant improvement.'
            },
            {
              date: '2024-03-01',
              author: 'Project Manager',
              content: 'Great collaboration with the team. Your communication skills are becoming a real strength.'
            }
          ].map((feedback, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {feedback.author}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {feedback.date}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{feedback.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalAnalytics;