import React from 'react';
import { useForm } from 'react-hook-form';
import { X, Calendar } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const scheduleSchema = z.object({
  employeeEmail: z.string().email('Invalid email address'),
  date: z.string().min(1, 'Please select a date and time'),
  calendarType: z.enum(['google', 'outlook']),
  notes: z.string().optional()
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

interface ScheduleFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ScheduleFormData) => void;
}

const ScheduleFeedbackModal = ({ isOpen, onClose, onSubmit }: ScheduleFeedbackModalProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      calendarType: 'google'
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Schedule Feedback Session
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Team Member Email
            </label>
            <input
              type="email"
              {...register('employeeEmail')}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="employee@company.com"
            />
            {errors.employeeEmail && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.employeeEmail.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date and Time
            </label>
            <input
              type="datetime-local"
              {...register('date')}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.date.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Calendar
            </label>
            <select
              {...register('calendarType')}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="google">Google Calendar</option>
              <option value="outlook">Outlook Calendar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes (Optional)
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Add any notes or agenda items..."
            />
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
              Schedule Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleFeedbackModal;