import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Evaluation } from '../../types/evaluation';
import { FileCheck, Clock, AlertCircle, Edit2, Eye } from 'lucide-react';
import { FRAMEWORKS } from '../../types/assessment';
import { format } from 'date-fns';

interface EvaluationCardProps {
  evaluation: Evaluation;
  onStatusChange: (status: Evaluation['status']) => void;
}

const EvaluationCard = ({ evaluation, onStatusChange }: EvaluationCardProps) => {
  const navigate = useNavigate();
  const framework = FRAMEWORKS.find(f => f.id === evaluation.frameworkId);

  const getStatusColor = (status: Evaluation['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600 bg-green-50 dark:bg-green-900/50 dark:text-green-400';
      case 'IN_PROGRESS':
      case 'PENDING_REVIEW':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/50 dark:text-yellow-400';
      case 'DRAFT':
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/50 dark:text-gray-400';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/50 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: Evaluation['status']) => {
    switch (status) {
      case 'COMPLETED':
        return FileCheck;
      case 'IN_PROGRESS':
      case 'PENDING_REVIEW':
        return Clock;
      case 'DRAFT':
        return AlertCircle;
      default:
        return AlertCircle;
    }
  };

  const StatusIcon = getStatusIcon(evaluation.status);

  const calculateOverallScore = () => {
    if (!evaluation.ratings.length) return 0;
    const sum = evaluation.ratings.reduce((acc, curr) => {
      const rating = parseInt(curr.rating.split('_')[0]);
      return acc + (isNaN(rating) ? 0 : rating);
    }, 0);
    return (sum / evaluation.ratings.length).toFixed(1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {framework?.name} Evaluation
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Period: {evaluation.period}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {format(evaluation.updatedAt, 'MMM d, yyyy')}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(evaluation.status)}`}>
          <StatusIcon className="w-4 h-4 mr-1" />
          {evaluation.status.replace(/_/g, ' ')}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Overall Score
          </span>
          <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            {calculateOverallScore()}/5
          </span>
        </div>

        <div className="space-y-4">
          {evaluation.strengths.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Key Strengths
              </h4>
              <ul className="space-y-1">
                {evaluation.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {evaluation.improvements.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Areas for Improvement
              </h4>
              <ul className="space-y-1">
                {evaluation.improvements.map((improvement, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => navigate(`/evaluations/edit/${evaluation.id}`)}
          className="px-4 py-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/75 flex items-center"
        >
          <Edit2 className="w-4 h-4 mr-2" />
          Edit
        </button>
        <button
          onClick={() => navigate(`/evaluations/view/${evaluation.id}`)}
          className="px-4 py-2 bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default EvaluationCard;