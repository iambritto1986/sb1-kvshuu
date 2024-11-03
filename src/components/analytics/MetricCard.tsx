import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease';
  iconBgColor: string;
  iconColor: string;
}

const MetricCard = ({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  changeType,
  iconBgColor,
  iconColor 
}: MetricCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div className={`p-2 ${iconBgColor} rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <span className={`text-sm font-medium ${
          changeType === 'increase' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

export default MetricCard;