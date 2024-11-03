import React from 'react';
import { FileDown } from 'lucide-react';
import ReportGenerator from './ReportGenerator';

const ReportPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Generate and download performance reports
          </p>
        </div>
      </div>

      <ReportGenerator />

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Reports</h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>
            Reports can be generated in both PDF and Excel formats. PDF reports include visualizations
            and are ideal for presentations, while Excel reports provide raw data for further analysis.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Report Types</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Individual Performance Reports</li>
                <li>Team Performance Reports</li>
                <li>Organization Overview Reports</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Data Included</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Performance Goals and Progress</li>
                <li>Evaluation Results</li>
                <li>Feedback and Reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;