import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { Goal } from '../../types';

interface UpdateProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: Goal;
  onSubmit: (progress: number) => void;
}

const UpdateProgressModal = ({ isOpen, onClose, goal, onSubmit }: UpdateProgressModalProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      progress: goal.progress
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Update Progress</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit((data) => onSubmit(Number(data.progress)))}>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{goal.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{goal.description}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Progress (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                {...register('progress', {
                  required: 'Progress is required',
                  min: { value: 0, message: 'Progress cannot be negative' },
                  max: { value: 100, message: 'Progress cannot exceed 100%' }
                })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {errors.progress && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.progress.message as string}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Update Progress
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProgressModal;