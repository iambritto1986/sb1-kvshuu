import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Evaluation } from '../../types';
import { ClipboardList, FileCheck, Clock, AlertCircle } from 'lucide-react';

const EvaluationList = () => {
  const navigate = useNavigate();
  const evaluations: Evaluation[] = [
    {
      id: '1',
      employeeId: '1',
      supervisorId: 'sup1',
      period: 'Q1 2024',
      metrics: [
        { category: 'Driving Results', score: 4.5, feedback: 'Exceptional performance in achieving objectives' },
        { category: 'Delivering Expertise', score: 4.0, feedback: 'Strong technical skills and domain knowledge' },
        { category: 'Inspiring Others', score: 3.5, feedback: 'Growing leadership capabilities' }
      ],
      overallScore: 4.0,
      strengths: ['Technical expertise', 'Project delivery'],
      improvements: ['Strategic planning', 'Stakeholder communication'],
      status: 'PENDING_REVIEW',
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-15')
    }
  ];

  const getStatusColor = (status: Evaluation['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600 bg-green-50 dark:bg-green-900/50 dark:text-green-400';
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
      case 'PENDING_REVIEW':
        return Clock;
      case 'DRAFT':
        return AlertCircle;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Evaluations</h1>
        <button
          onClick={() => navigate('/evaluations/new')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <ClipboardList className="w-5 h-5 mr-2" />
          New Evaluation
        </button>
      </div>

      <div className="space-y-4">
        {evaluations.map((evaluation) => {
          const StatusIcon = getStatusIcon(evaluation.status);
          return (
            <div key={evaluation.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Performance Review - {evaluation.period}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last updated: {evaluation.updatedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(evaluation.status)}`}>
                  <StatusIcon className="w-4 h-4 mr-1" />
                  {evaluation.status.replace('_', ' ')}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {evaluation.metrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">{metric.category}</h4>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{metric.score}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">/5</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{metric.feedback}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Strengths</h4>
                  <ul className="space-y-2">
                    {evaluation.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Areas for Improvement</h4>
                  <ul className="space-y-2">
                    {evaluation.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button className="px-4 py-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/75">
                  Edit Evaluation
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EvaluationList;