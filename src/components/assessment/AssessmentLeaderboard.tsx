import React from 'react';
import { Framework } from '../../types/assessment';
import { Trophy, TrendingUp, AlertTriangle } from 'lucide-react';

interface AssessmentLeaderboardProps {
  framework: Framework;
  teamMembers: Array<{ id: string; name: string; role: string; }>;
  ratings: Record<string, number>;
}

const AssessmentLeaderboard = ({ framework, teamMembers, ratings }: AssessmentLeaderboardProps) => {
  const getPerformanceCategory = (rating: number) => {
    if (rating >= 4.5) return { icon: Trophy, color: 'text-yellow-500', label: 'Top Performer' };
    if (rating >= 3.5) return { icon: TrendingUp, color: 'text-green-500', label: 'Meeting Expectations' };
    return { icon: AlertTriangle, color: 'text-red-500', label: 'Needs Development' };
  };

  const sortedMembers = [...teamMembers]
    .filter(member => ratings[member.id])
    .sort((a, b) => (ratings[b.id] || 0) - (ratings[a.id] || 0));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Performance Leaderboard
      </h2>

      <div className="space-y-6">
        {sortedMembers.map((member) => {
          const rating = ratings[member.id] || 0;
          const { icon: Icon, color, label } = getPerformanceCategory(rating);
          
          return (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {rating.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Overall Rating
                  </div>
                </div>
                <div className={`flex items-center ${color}`}>
                  <Icon className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              </div>
            </div>
          );
        })}

        {sortedMembers.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No ratings available yet
          </p>
        )}
      </div>
    </div>
  );
};

export default AssessmentLeaderboard;