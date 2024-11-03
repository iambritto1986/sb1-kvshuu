import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  id: string;
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  label,
  value,
  change,
  changeType
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <span className={`text-sm font-medium ${
          changeType === 'increase' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
        {value}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );
};

export default MetricCard;