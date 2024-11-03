import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Settings, Users } from 'lucide-react';
import FrameworkSelector from './FrameworkSelector';
import TeamAssessment from './TeamAssessment';
import { Framework, FRAMEWORKS } from '../../types/assessment';

const AssessmentFramework = () => {
  const { user } = useAuth();
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);

  if (!['MANAGER', 'ADMIN'].includes(user?.role || '')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 dark:bg-gray-800 rounded-lg">
        <Shield className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Access Restricted
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Only managers and administrators can access the assessment framework.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Assessment Framework
          </h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <FrameworkSelector
          frameworks={FRAMEWORKS}
          selectedFramework={selectedFramework}
          onSelect={setSelectedFramework}
        />
      </div>

      {selectedFramework && (
        <TeamAssessment framework={selectedFramework} />
      )}
    </div>
  );
};

export default AssessmentFramework;