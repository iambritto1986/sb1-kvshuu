import React from 'react';
import { Framework } from '../../types/assessment';
import { Check } from 'lucide-react';

interface FrameworkSelectorProps {
  frameworks: Framework[];
  selectedFramework: Framework | null;
  onSelect: (framework: Framework) => void;
}

const FrameworkSelector = ({ frameworks, selectedFramework, onSelect }: FrameworkSelectorProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Select Assessment Framework
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {frameworks.map((framework) => (
          <div
            key={framework.id}
            onClick={() => onSelect(framework)}
            className={`cursor-pointer rounded-lg border-2 p-6 transition-all ${
              selectedFramework?.id === framework.id
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {framework.name}
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Categories:
                  </p>
                  <ul className="space-y-1">
                    {framework.categories.map((category) => (
                      <li
                        key={category.id}
                        className="text-sm text-gray-600 dark:text-gray-400 flex items-center"
                      >
                        <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-2" />
                        {category.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {selectedFramework?.id === framework.id && (
                <div className="bg-indigo-600 rounded-full p-1">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Rating Scale:
              </p>
              <div className="mt-2 space-y-2">
                {framework.ratingScale.map((rating) => (
                  <div
                    key={rating.value}
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    <span className="font-medium">{rating.label}</span>
                    <span className="text-gray-500 dark:text-gray-500 ml-1">
                      ({rating.value}) - {rating.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrameworkSelector;