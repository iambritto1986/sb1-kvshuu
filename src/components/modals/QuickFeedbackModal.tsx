import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRoles } from '../../contexts/RoleContext';

const feedbackSchema = z.object({
  employeeId: z.string().min(1, 'Please select a team member'),
  type: z.string().min(1, 'Please select feedback type'),
  content: z.string().min(10, 'Feedback must be at least 10 characters')
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

interface QuickFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FeedbackFormData) => void;
}

const QuickFeedbackModal = ({ isOpen, onClose, onSubmit }: QuickFeedbackModalProps) => {
  const { departments } = useRoles();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema)
  });

  // Mock team members data - in a real app, this would come from an API or context
  const teamMembers = [
    { id: '1', name: 'Sarah Johnson', department: 'Engineering' },
    { id: '2', name: 'Michael Chen', department: 'Engineering' },
    { id: '3', name: 'Emily Davis', department: 'Product' }
  ];

  const handleFormSubmit = (data: FeedbackFormData) => {
    onSubmit(data);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Feedback</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Team Member
            </label>
            <select
              {...register('employeeId')}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select team member</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name} - {member.department}
                </option>
              ))}
            </select>
            {errors.employeeId && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.employeeId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Feedback Type
            </label>
            <select
              {...register('type')}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select type</option>
              <option value="praise">Praise</option>
              <option value="improvement">Area for Improvement</option>
              <option value="suggestion">Suggestion</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.type.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Feedback
            </label>
            <textarea
              {...register('content')}
              rows={4}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your feedback..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.content.message}
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
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickFeedbackModal;