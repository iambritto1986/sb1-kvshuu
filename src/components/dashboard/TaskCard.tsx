import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Task } from '../../types/task';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';

interface TaskCardProps {
  task: Task;
  childTasks?: Task[];
}

const TaskCard = ({ task, childTasks = [] }: TaskCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true); // Start expanded for better visibility
  const { user } = useAuth();

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'IN_PROGRESS':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-400';
      case 'IN_PROGRESS':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/50 dark:text-gray-400';
    }
  };

  const showChildTasks = user?.role !== 'EMPLOYEE' && childTasks.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              {getStatusIcon(task.status)}
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {task.title}
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {task.description}
            </p>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </div>
            {task.isParentTask && task.totalSubTasks && (
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Progress: {task.completedSubTasks || 0}/{task.totalSubTasks} team members completed
              </div>
            )}
          </div>
          {showChildTasks && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-4 p-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>

      {showChildTasks && isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="p-4 space-y-3">
            {childTasks.map((childTask) => (
              <div
                key={childTask.id}
                className="flex items-center justify-between pl-6 py-2 border-l-2 border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(childTask.status)}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {childTask.assignedToName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {childTask.description}
                    </p>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(childTask.status)}`}>
                  {childTask.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;