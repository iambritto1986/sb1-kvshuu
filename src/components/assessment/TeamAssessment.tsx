import React, { useState } from 'react';
import { Framework } from '../../types/assessment';
import { Users, Download, Scale } from 'lucide-react';
import TeamMemberAssessment from './TeamMemberAssessment';
import AssessmentLeaderboard from './AssessmentLeaderboard';
import { generateReport } from '../../services/reports';
import useToast from '../../hooks/useToast';

interface TeamAssessmentProps {
  framework: Framework;
}

const TeamAssessment = ({ framework }: TeamAssessmentProps) => {
  const { addToast } = useToast();
  const [assessments, setAssessments] = useState<Record<string, Record<string, number>>>({});
  const [comments, setComments] = useState<Record<string, Record<string, string>>>({});
  const [overallRatings, setOverallRatings] = useState<Record<string, number>>({});
  const [isCalibrating, setIsCalibrating] = useState(false);

  // Mock team members - in a real app, this would come from your user context or API
  const teamMembers = [
    { id: '1', name: 'Sarah Johnson', role: 'Software Engineer' },
    { id: '2', name: 'Michael Chen', role: 'Product Designer' },
    { id: '3', name: 'Emily Davis', role: 'Project Manager' }
  ];

  const handleRatingChange = (employeeId: string, categoryId: string, rating: number) => {
    setAssessments(prev => ({
      ...prev,
      [employeeId]: {
        ...(prev[employeeId] || {}),
        [categoryId]: rating
      }
    }));
    updateOverallRating(employeeId);
  };

  const handleOverallRatingChange = (employeeId: string, rating: number) => {
    setOverallRatings(prev => ({
      ...prev,
      [employeeId]: rating
    }));
  };

  const handleCommentChange = (employeeId: string, categoryId: string, comment: string) => {
    setComments(prev => ({
      ...prev,
      [employeeId]: {
        ...(prev[employeeId] || {}),
        [categoryId]: comment
      }
    }));
  };

  const updateOverallRating = (employeeId: string) => {
    const employeeRatings = Object.values(assessments[employeeId] || {});
    if (employeeRatings.length > 0) {
      const average = employeeRatings.reduce((sum, rating) => sum + rating, 0) / employeeRatings.length;
      handleOverallRatingChange(employeeId, average);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const reportData = {
        framework: framework.name,
        assessments: teamMembers.map(member => ({
          name: member.name,
          role: member.role,
          overallRating: overallRatings[member.id] || 0,
          categories: framework.categories.map(category => ({
            name: category.name,
            rating: assessments[member.id]?.[category.id] || 0,
            comment: comments[member.id]?.[category.id] || ''
          }))
        }))
      };

      const blob = await generateReport(reportData, {
        type: 'team',
        format: 'pdf',
        dateRange: {
          start: new Date(),
          end: new Date()
        }
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `team-assessment-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      addToast('Assessment report downloaded successfully!', 'success');
    } catch (error) {
      addToast('Failed to generate report. Please try again.', 'error');
    }
  };

  const toggleCalibration = () => {
    setIsCalibrating(!isCalibrating);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Team Assessment
          </h2>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={toggleCalibration}
            className={`px-4 py-2 rounded-lg flex items-center ${
              isCalibrating
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <Scale className="w-5 h-5 mr-2" />
            {isCalibrating ? 'Finish Calibration' : 'Calibrate'}
          </button>
          <button
            onClick={handleDownloadReport}
            className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          {teamMembers.map((member) => (
            <TeamMemberAssessment
              key={member.id}
              framework={framework}
              member={member}
              ratings={assessments[member.id] || {}}
              comments={comments[member.id] || {}}
              overallRating={overallRatings[member.id] || 0}
              onRatingChange={(categoryId, rating) => handleRatingChange(member.id, categoryId, rating)}
              onCommentChange={(categoryId, comment) => handleCommentChange(member.id, categoryId, comment)}
              onOverallRatingChange={(rating) => handleOverallRatingChange(member.id, rating)}
              isCalibrating={isCalibrating}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <AssessmentLeaderboard
            framework={framework}
            teamMembers={teamMembers}
            ratings={overallRatings}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamAssessment;