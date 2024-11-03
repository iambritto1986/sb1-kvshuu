import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Users } from 'lucide-react';
import { FRAMEWORKS } from '../../types/assessment';

interface NewEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const NewEvaluationModal = ({ isOpen, onClose, onSubmit }: NewEvaluationModalProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedFramework, setSelectedFramework] = useState(FRAMEWORKS[0].id);

  // Mock team members - in a real app, this would come from your API or context
  const teamMembers = [
    { id: '1', name: 'Sarah Johnson', role: 'Software Engineer' },
    { id: '2', name: 'Michael Chen', role: 'Product Designer' },
    { id: '3', name: 'Emily Davis', role: 'Project Manager' }
  ];

  const handleFormSubmit = (formData: any) => {
    if (selectedMembers.length === 0) {
      alert('Please select at least one team member');
      return;
    }

    const selectedTeamMemberDetails = teamMembers.filter(member => 
      selectedMembers.includes(member.id)
    ).map(member => ({
      id: member.id,
      name: member.name
    }));

    onSubmit({
      ...formData,
      selectedMembers: selectedTeamMemberDetails,
      selectedFramework
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Schedule Goal Review & Evaluation
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Team Members
            </label>
            <div className="space-y-2">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="selectAll"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedMembers(teamMembers.map(m => m.id));
                    } else {
                      setSelectedMembers([]);
                    }
                  }}
                  checked={selectedMembers.length === teamMembers.length}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="selectAll" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Select All
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={member.id}
                      value={member.id}
                      checked={selectedMembers.includes(member.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMembers([...selectedMembers, member.id]);
                        } else {
                          setSelectedMembers(selectedMembers.filter(id => id !== member.id));
                        }
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={member.id} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {member.name} - {member.role}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Assessment Framework
            </label>
            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {FRAMEWORKS.map(framework => (
                <option key={framework.id} value={framework.id}>
                  {framework.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message to Team Members
            </label>
            <textarea
              {...register('message', { required: 'Please enter a message' })}
              rows={4}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter instructions or message for team members..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.message.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Due Date
            </label>
            <input
              type="date"
              {...register('dueDate', { required: 'Please select a due date' })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.dueDate.message as string}
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
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
            >
              <Users className="w-5 h-5 mr-2" />
              Create Tasks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEvaluationModal;