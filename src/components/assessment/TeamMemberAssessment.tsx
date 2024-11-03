import React, { useState } from 'react';
import { Framework } from '../../types/assessment';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TeamMemberAssessmentProps {
  framework: Framework;
  member: {
    id: string;
    name: string;
    role: string;
  };
  ratings: Record<string, number>;
  comments: Record<string, string>;
  overallRating: number;
  onRatingChange: (categoryId: string, rating: number) => void;
  onCommentChange: (categoryId: string, comment: string) => void;
  onOverallRatingChange: (rating: number) => void;
  isCalibrating: boolean;
}

const TeamMemberAssessment = ({
  framework,
  member,
  ratings,
  comments,
  overallRating,
  onRatingChange,
  onCommentChange,
  onOverallRatingChange,
  isCalibrating
}: TeamMemberAssessmentProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const calculateAverageRating = () => {
    const values = Object.values(ratings);
    if (values.length === 0) return 0;
    return values.reduce((sum, rating) => sum + rating, 0) / values.length;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm ${
      isCalibrating ? 'ring-2 ring-green-500' : ''
    }`}>
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {member.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {member.role}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Overall Rating
              </p>
              <select
                value={overallRating || ''}
                onChange={(e) => onOverallRatingChange(Number(e.target.value))}
                className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 bg-transparent border-none"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="">-</option>
                {framework.ratingScale.map((rating) => (
                  <option key={rating.value} value={rating.value}>
                    {rating.label} ({rating.value})
                  </option>
                ))}
              </select>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="space-y-6">
            {framework.categories.map((category) => (
              <div key={category.id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {category.name}
                  </label>
                  <select
                    value={ratings[category.id] || ''}
                    onChange={(e) => onRatingChange(category.id, Number(e.target.value))}
                    className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select rating</option>
                    {framework.ratingScale.map((rating) => (
                      <option key={rating.value} value={rating.value}>
                        {rating.label} ({rating.value})
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  value={comments[category.id] || ''}
                  onChange={(e) => onCommentChange(category.id, e.target.value)}
                  placeholder={`Comments for ${category.name}...`}
                  rows={3}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMemberAssessment;