import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Framework, FRAMEWORKS } from '../../types/assessment';
import { useEvaluations } from '../../contexts/EvaluationContext';

interface EvaluationFormProps {
  employeeId?: string;
  evaluationId?: string;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ employeeId, evaluationId }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addEvaluation, updateEvaluation, getEvaluation } = useEvaluations();
  const [selectedFramework, setSelectedFramework] = useState<Framework>(FRAMEWORKS[0]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [overallComments, setOverallComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (evaluationId) {
      const evaluation = getEvaluation(evaluationId);
      if (evaluation) {
        const framework = FRAMEWORKS.find(f => f.id === evaluation.frameworkId) || FRAMEWORKS[0];
        setSelectedFramework(framework);
        setRatings(evaluation.ratings);
        setComments(evaluation.comments);
        setOverallComments(evaluation.overallComments || '');
      }
    }
  }, [evaluationId, getEvaluation]);

  const handleRatingChange = (categoryId: string, value: number) => {
    setRatings(prev => ({ ...prev, [categoryId]: value }));
  };

  const handleCommentChange = (categoryId: string, value: string) => {
    setComments(prev => ({ ...prev, [categoryId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const evaluationData = {
        employeeId: employeeId || '',
        supervisorId: user?.id || '',
        frameworkId: selectedFramework.id,
        ratings,
        comments,
        overallComments,
        status: 'COMPLETED' as const,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      if (evaluationId) {
        await updateEvaluation(evaluationId, evaluationData);
      } else {
        await addEvaluation(evaluationData);
      }

      navigate('/evaluations');
    } catch (error) {
      console.error('Error saving evaluation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/evaluations')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {evaluationId ? 'Edit Evaluation' : 'New Evaluation'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Framework: {selectedFramework.name}
          </h2>

          <div className="space-y-6">
            {selectedFramework.categories.map(category => (
              <div key={category.id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <select
                    value={ratings[category.id] || ''}
                    onChange={(e) => handleRatingChange(category.id, Number(e.target.value))}
                    className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Rating</option>
                    {selectedFramework.ratingScale.map(scale => (
                      <option key={scale.value} value={scale.value}>
                        {scale.label} ({scale.value})
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  value={comments[category.id] || ''}
                  onChange={(e) => handleCommentChange(category.id, e.target.value)}
                  placeholder={`Comments for ${category.name}...`}
                  rows={3}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            ))}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Overall Comments
              </label>
              <textarea
                value={overallComments}
                onChange={(e) => setOverallComments(e.target.value)}
                rows={4}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Add any overall comments or feedback..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/evaluations')}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Evaluation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EvaluationForm;