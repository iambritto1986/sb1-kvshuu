import React, { useState } from 'react';
import { Framework, AssessmentCategory, FRAMEWORKS } from '../../types/assessment';
import { Plus, X, Edit2, Save, AlertCircle } from 'lucide-react';
import useToast from '../../hooks/useToast';

interface FrameworkCustomizationProps {
  onUpdate: (frameworks: Framework[]) => void;
}

const FrameworkCustomization = ({ onUpdate }: FrameworkCustomizationProps) => {
  const { addToast } = useToast();
  const [frameworks, setFrameworks] = useState<Framework[]>(FRAMEWORKS);
  const [editingFramework, setEditingFramework] = useState<Framework | null>(null);
  const [editingCategory, setEditingCategory] = useState<AssessmentCategory | null>(null);

  const handleFrameworkUpdate = (updatedFramework: Framework) => {
    const updatedFrameworks = frameworks.map(f => 
      f.id === updatedFramework.id ? updatedFramework : f
    );
    setFrameworks(updatedFrameworks);
    onUpdate(updatedFrameworks);
    setEditingFramework(null);
    addToast('Framework updated successfully!', 'success');
  };

  const handleCategoryUpdate = (frameworkId: string, category: AssessmentCategory) => {
    const framework = frameworks.find(f => f.id === frameworkId);
    if (!framework) return;

    const updatedCategories = editingCategory
      ? framework.categories.map(c => c.id === category.id ? category : c)
      : [...framework.categories, { ...category, id: `${frameworkId}-${Date.now()}` }];

    const updatedFramework = {
      ...framework,
      categories: updatedCategories
    };

    handleFrameworkUpdate(updatedFramework);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (frameworkId: string, categoryId: string) => {
    const framework = frameworks.find(f => f.id === frameworkId);
    if (!framework) return;

    const updatedFramework = {
      ...framework,
      categories: framework.categories.filter(c => c.id !== categoryId)
    };

    handleFrameworkUpdate(updatedFramework);
    addToast('Category deleted successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/50 p-4 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
              Framework Customization
            </h3>
            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
              Changes to assessment frameworks will affect all future evaluations. Existing assessments will maintain their original framework structure.
            </p>
          </div>
        </div>
      </div>

      {frameworks.map(framework => (
        <div key={framework.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          {editingFramework?.id === framework.id ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editingFramework.name}
                onChange={e => setEditingFramework({ ...editingFramework, name: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Framework name"
              />
              <textarea
                value={editingFramework.description}
                onChange={e => setEditingFramework({ ...editingFramework, description: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Framework description"
                rows={3}
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditingFramework(null)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleFrameworkUpdate(editingFramework)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {framework.name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {framework.description}
                  </p>
                </div>
                <button
                  onClick={() => setEditingFramework(framework)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {framework.categories.map(category => (
                  <div
                    key={category.id}
                    className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(framework.id, category.id)}
                        className="p-1 text-red-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setEditingCategory({ id: '', name: '', description: '' })}
                  className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Category
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingCategory.id ? 'Edit Category' : 'Add Category'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={editingCategory.description}
                  onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter category description"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleCategoryUpdate(editingFramework?.id || frameworks[0].id, editingCategory)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {editingCategory.id ? 'Update' : 'Add'} Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrameworkCustomization;