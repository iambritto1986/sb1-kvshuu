import React, { useState } from 'react';
import { format } from 'date-fns';
import { Goal } from '../../types';
import { Target, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import NewGoalModal from '../modals/NewGoalModal';
import UpdateProgressModal from '../modals/UpdateProgressModal';
import ViewGoalDetailsModal from '../modals/ViewGoalDetailsModal';
import useToast from '../../hooks/useToast';

const GoalList = () => {
  const { addToast, ToastContainer } = useToast();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      employeeId: '1',
      title: 'Complete Advanced React Training',
      description: 'Master advanced React concepts and patterns',
      specific: 'Complete the Advanced React certification course',
      measurable: 'Pass all module assessments with 85% or higher',
      achievable: 'Dedicate 2 hours daily for learning',
      relevant: 'Improve technical skills for current role',
      timeBound: new Date('2024-07-01'),
      status: 'IN_PROGRESS',
      progress: 65,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-03-20')
    },
    {
      id: '2',
      employeeId: '1',
      title: 'Improve Code Review Process',
      description: 'Implement better code review practices',
      specific: 'Create and document code review guidelines',
      measurable: 'Reduce review cycle time by 30%',
      achievable: 'Work with team leads to establish process',
      relevant: 'Enhance team collaboration and code quality',
      timeBound: new Date('2024-08-15'),
      status: 'NOT_STARTED',
      progress: 0,
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-01')
    }
  ]);

  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);
  const [isUpdateProgressModalOpen, setIsUpdateProgressModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600 bg-green-50 dark:bg-green-900/50 dark:text-green-400';
      case 'IN_PROGRESS':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/50 dark:text-blue-400';
      case 'NOT_STARTED':
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/50 dark:text-gray-400';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/50 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: Goal['status']) => {
    switch (status) {
      case 'COMPLETED':
        return CheckCircle2;
      case 'IN_PROGRESS':
        return Clock;
      case 'NOT_STARTED':
        return AlertCircle;
      default:
        return AlertCircle;
    }
  };

  const handleCreateGoal = (data: Partial<Goal>) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      employeeId: '1', // In a real app, this would come from the authenticated user
      title: data.title || '',
      description: data.description || '',
      specific: data.specific || '',
      measurable: data.measurable || '',
      achievable: data.achievable || '',
      relevant: data.relevant || '',
      timeBound: new Date(data.timeBound || Date.now()),
      status: 'NOT_STARTED',
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setGoals(prev => [...prev, newGoal]);
    setIsNewGoalModalOpen(false);
    addToast('Goal created successfully!', 'success');
  };

  const handleUpdateProgress = (goalId: string, newProgress: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const status = newProgress === 100 ? 'COMPLETED' : 
                      newProgress > 0 ? 'IN_PROGRESS' : 
                      'NOT_STARTED';
        return {
          ...goal,
          progress: newProgress,
          status,
          updatedAt: new Date()
        };
      }
      return goal;
    }));
    setIsUpdateProgressModalOpen(false);
    addToast('Progress updated successfully!', 'success');
  };

  const handleViewDetails = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsViewDetailsModalOpen(true);
  };

  const handleUpdateDetails = (updatedGoal: Goal) => {
    setGoals(prev => prev.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
    setIsViewDetailsModalOpen(false);
    addToast('Goal details updated successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Goals</h1>
        <button 
          onClick={() => setIsNewGoalModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <Target className="w-5 h-5 mr-2" />
          Create New Goal
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => {
          const StatusIcon = getStatusIcon(goal.status);
          return (
            <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{goal.description}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(goal.status)}`}>
                  <StatusIcon className="w-4 h-4 mr-1" />
                  {goal.status.replace('_', ' ')}
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{goal.progress}% Complete</span>
                  <span>Due {format(goal.timeBound, 'MMM d, yyyy')}</span>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button 
                  onClick={() => {
                    setSelectedGoal(goal);
                    setIsUpdateProgressModalOpen(true);
                  }}
                  className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-400 dark:hover:bg-indigo-900/75"
                >
                  Update Progress
                </button>
                <button 
                  onClick={() => handleViewDetails(goal)}
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <NewGoalModal
        isOpen={isNewGoalModalOpen}
        onClose={() => setIsNewGoalModalOpen(false)}
        onSubmit={handleCreateGoal}
      />

      {selectedGoal && (
        <>
          <UpdateProgressModal
            isOpen={isUpdateProgressModalOpen}
            onClose={() => setIsUpdateProgressModalOpen(false)}
            goal={selectedGoal}
            onSubmit={(progress) => handleUpdateProgress(selectedGoal.id, progress)}
          />

          <ViewGoalDetailsModal
            isOpen={isViewDetailsModalOpen}
            onClose={() => setIsViewDetailsModalOpen(false)}
            goal={selectedGoal}
            onUpdate={handleUpdateDetails}
          />
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default GoalList;