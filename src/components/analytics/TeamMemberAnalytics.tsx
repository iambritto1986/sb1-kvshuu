import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Star, TrendingUp, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import PerformanceChart from './PerformanceChart';
import GoalProgress from './GoalProgress';
import MetricCard from './MetricCard';

const TeamMemberAnalytics = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const { canAccessUserData } = useAuth();
  const [timeRange, setTimeRange] = useState('quarter');
  const [memberData, setMemberData] = useState({
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    performanceData: [
      { name: 'Jan', value: 4.2 },
      { name: 'Feb', value: 4.4 },
      { name: 'Mar', value: 4.3 },
      { name: 'Apr', value: 4.5 },
      { name: 'May', value: 4.6 },
      { name: 'Jun', value: 4.8 }
    ],
    goals: {
      total: 12,
      completed: 8,
      inProgress: 3,
      notStarted: 1
    }
  });

  useEffect(() => {
    if (!memberId || !canAccessUserData(memberId)) {
      navigate('/unauthorized');
      return;
    }
    // Fetch member data
  }, [memberId, canAccessUserData, navigate]);

  const metrics = [
    {
      icon: Star,
      label: 'Performance Score',
      value: '4.5',
      change: '+0.3',
      changeType: 'increase' as const,
      iconBgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      icon: Target,
      label: 'Goals Completed',
      value: '8/12',
      change: '67%',
      changeType: 'increase' as const,
      iconBgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: TrendingUp,
      label: 'Growth Trajectory',
      value: 'Above Avg',
      change: '+15%',
      changeType: 'increase' as const,
      iconBgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    }
  ];

  if (!canAccessUserData(memberId || '')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ShieldAlert className="w-16 h-16 text-red-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="text-gray-600 mt-2">You don't have permission to view this user's analytics.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/analytics')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{memberData.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{memberData.role}</p>
          </div>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart data={memberData.performanceData} />
        <GoalProgress {...memberData.goals} />
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Breakdown</h2>
        <div className="space-y-4">
          {[
            { label: 'Technical Skills', value: 4.8 },
            { label: 'Communication', value: 4.2 },
            { label: 'Initiative', value: 4.5 },
            { label: 'Teamwork', value: 4.7 },
            { label: 'Leadership', value: 4.0 }
          ].map((metric) => (
            <div key={metric.label}>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>{metric.label}</span>
                <span>{metric.value}/5.0</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(metric.value / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberAnalytics;