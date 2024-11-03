import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Target, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MetricCard from './MetricCard';
import PerformanceChart from './PerformanceChart';
import GoalProgress from './GoalProgress';
import TeamPerformance from './TeamPerformance';
import ReviewTimeline from './ReviewTimeline';
import { User } from '../../types';

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('quarter');
  const [performanceData, setPerformanceData] = useState([
    { name: 'Jan', value: 4.2 },
    { name: 'Feb', value: 4.4 },
    { name: 'Mar', value: 4.3 },
    { name: 'Apr', value: 4.5 },
    { name: 'May', value: 4.6 },
    { name: 'Jun', value: 4.8 }
  ]);

  const [teamMembers] = useState<User[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      role: 'EMPLOYEE',
      department: 'Engineering'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@company.com',
      role: 'EMPLOYEE',
      department: 'Engineering'
    }
  ]);

  useEffect(() => {
    // Simulate data fetching based on timeRange
    const fetchData = () => {
      let data;
      switch (timeRange) {
        case 'month':
          data = [
            { name: 'Week 1', value: 4.3 },
            { name: 'Week 2', value: 4.5 },
            { name: 'Week 3', value: 4.4 },
            { name: 'Week 4', value: 4.6 }
          ];
          break;
        case 'quarter':
          data = [
            { name: 'Jan', value: 4.2 },
            { name: 'Feb', value: 4.4 },
            { name: 'Mar', value: 4.3 }
          ];
          break;
        case '6months':
          data = [
            { name: 'Jan', value: 4.2 },
            { name: 'Feb', value: 4.4 },
            { name: 'Mar', value: 4.3 },
            { name: 'Apr', value: 4.5 },
            { name: 'May', value: 4.6 },
            { name: 'Jun', value: 4.8 }
          ];
          break;
        case 'year':
          data = [
            { name: 'Q1', value: 4.3 },
            { name: 'Q2', value: 4.5 },
            { name: 'Q3', value: 4.6 },
            { name: 'Q4', value: 4.7 }
          ];
          break;
      }
      setPerformanceData(data);
    };

    fetchData();
  }, [timeRange]);

  const teamPerformanceData = [
    { name: 'Technical Skills', value: 4.5 },
    { name: 'Communication', value: 4.2 },
    { name: 'Leadership', value: 3.8 },
    { name: 'Initiative', value: 4.0 },
    { name: 'Teamwork', value: 4.6 },
    { name: 'Problem Solving', value: 4.3 }
  ];

  const reviewTimelineData = [
    { month: 'Jan', completed: 8, pending: 2 },
    { month: 'Feb', completed: 10, pending: 1 },
    { month: 'Mar', completed: 7, pending: 3 },
    { month: 'Apr', completed: 12, pending: 0 },
    { month: 'May', completed: 9, pending: 2 },
    { month: 'Jun', completed: 11, pending: 1 }
  ];

  const goalCompletionData = {
    total: 45,
    completed: 32,
    inProgress: 10,
    notStarted: 3
  };

  const metrics = [
    {
      icon: BarChart3,
      label: 'Average Performance',
      value: '4.3',
      change: '+5%',
      changeType: 'increase' as const,
      iconBgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      icon: TrendingUp,
      label: 'Top Performers',
      value: '5',
      change: '+2',
      changeType: 'increase' as const,
      iconBgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Target,
      label: 'Goals Completed',
      value: '32',
      change: '71%',
      changeType: 'increase' as const,
      iconBgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Calendar,
      label: 'Reviews Completed',
      value: '28',
      change: '100%',
      changeType: 'increase' as const,
      iconBgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
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

      {/* Team Members */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => navigate(`/analytics/team/${member.id}`)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{member.department}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart data={performanceData} />
        <TeamPerformance data={teamPerformanceData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReviewTimeline data={reviewTimelineData} />
        <GoalProgress {...goalCompletionData} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;