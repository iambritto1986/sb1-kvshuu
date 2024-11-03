import React, { useState } from 'react';
import { FileDown, FileText, FileSpreadsheet } from 'lucide-react';
import { generateReport } from '../../services/reports';
import useToast from '../../hooks/useToast';
import { User } from '../../types';
import { Framework, Assessment } from '../../types/assessment';
import { CalibrationReportData } from '../../types/reports';

const ReportGenerator = () => {
  const { addToast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [reportType, setReportType] = useState<'individual' | 'team' | 'organization' | 'calibration'>('team');
  const [format, setFormat] = useState<'pdf' | 'excel'>('pdf');
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [includeData, setIncludeData] = useState({
    goals: true,
    evaluations: true,
    feedback: true,
    analytics: true,
    calibration: true
  });

  // Mock team members - in a real app, this would come from your API or context
  const teamMembers: User[] = [
    { id: '1', name: 'John Doe', role: 'Developer', department: 'Engineering', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', role: 'Designer', department: 'Design', email: 'jane@example.com' },
    { id: '3', name: 'Mike Johnson', role: 'Developer', department: 'Engineering', email: 'mike@example.com' }
  ];

  // Mock calibration data - in a real app, this would come from your API
  const mockCalibrationData: CalibrationReportData = {
    framework: {
      id: '1',
      name: 'Leadership & Innovation Framework',
      description: 'Evaluates leadership capabilities and innovative contributions',
      categories: [
        { id: '1-1', name: 'Driving Results', description: 'Ability to achieve objectives' },
        { id: '1-2', name: 'Delivering Expertise', description: 'Technical proficiency' }
      ],
      ratingScale: 'DISTINCTIVE'
    },
    assessments: [
      {
        id: '1',
        employeeId: '1',
        frameworkId: '1',
        ratings: [
          { categoryId: '1-1', rating: 'DISTINCTIVE', comment: 'Exceptional performance' },
          { categoryId: '1-2', rating: 'VERY_STRONG', comment: 'Strong technical skills' }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'manager-1'
      }
    ],
    teamMembers,
    summary: {
      topPerformers: ['John Doe'],
      meetingExpectations: ['Jane Smith'],
      needsDevelopment: ['Mike Johnson']
    }
  };

  const handleGenerateReport = async () => {
    try {
      setIsGenerating(true);

      if ((reportType === 'individual' || reportType === 'calibration') && !selectedMemberId) {
        addToast('Please select a team member', 'error');
        return;
      }

      const selectedMember = teamMembers.find(m => m.id === selectedMemberId);

      // Filter calibration data for individual member if selected
      const calibrationData = includeData.calibration ? {
        ...mockCalibrationData,
        assessments: selectedMemberId ? 
          mockCalibrationData.assessments.filter(a => a.employeeId === selectedMemberId) :
          mockCalibrationData.assessments,
        teamMembers: selectedMemberId ?
          mockCalibrationData.teamMembers.filter(m => m.id === selectedMemberId) :
          mockCalibrationData.teamMembers,
        summary: selectedMemberId ? {
          topPerformers: mockCalibrationData.summary.topPerformers.filter(name => selectedMember?.name === name),
          meetingExpectations: mockCalibrationData.summary.meetingExpectations.filter(name => selectedMember?.name === name),
          needsDevelopment: mockCalibrationData.summary.needsDevelopment.filter(name => selectedMember?.name === name)
        } : mockCalibrationData.summary
      } : undefined;

      // Mock data with proper typing and charts data
      const mockData = {
        users: includeData.evaluations ? 
          (selectedMemberId ? [selectedMember] : teamMembers) : 
          undefined,
        goals: includeData.goals ? [
          {
            id: '1',
            employeeId: selectedMember?.id || '1',
            title: 'Complete Project X',
            description: 'Deliver all project milestones',
            specific: 'Implement core features',
            measurable: 'Pass all test cases',
            achievable: 'Within team capacity',
            relevant: 'Aligns with Q2 goals',
            timeBound: new Date('2024-06-30'),
            status: 'IN_PROGRESS' as const,
            progress: 75,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-03-15')
          }
        ] : undefined,
        evaluations: includeData.evaluations ? [
          {
            id: '1',
            employeeId: selectedMember?.id || '1',
            supervisorId: 'sup1',
            period: 'Q1 2024',
            metrics: [
              { category: 'Technical Skills', score: 4.5, feedback: 'Strong performance' },
              { category: 'Communication', score: 4.2, feedback: 'Good team collaboration' },
              { category: 'Initiative', score: 4.0, feedback: 'Shows good initiative' }
            ],
            overallScore: 4.5,
            strengths: ['Technical expertise', 'Problem-solving'],
            improvements: ['Communication', 'Documentation'],
            status: 'COMPLETED' as const,
            createdAt: new Date('2024-03-01'),
            updatedAt: new Date('2024-03-15')
          }
        ] : undefined,
        analytics: includeData.analytics ? {
          performanceScores: [
            { period: 'Jan 2024', score: 4.2 },
            { period: 'Feb 2024', score: 4.3 },
            { period: 'Mar 2024', score: 4.5 },
            { period: 'Apr 2024', score: 4.6 }
          ],
          goalCompletion: { completed: 8, total: 10 },
          feedbackSummary: { positive: 12, needsImprovement: 3 },
          skillsRadarData: [
            { name: 'Technical Skills', value: 4.5 },
            { name: 'Communication', value: 4.2 },
            { name: 'Leadership', value: 3.8 },
            { name: 'Initiative', value: 4.0 },
            { name: 'Teamwork', value: 4.6 }
          ]
        } : undefined
      };

      const reportOptions = {
        type: reportType,
        format,
        dateRange: {
          start: new Date(dateRange.start),
          end: new Date(dateRange.end)
        },
        employeeId: selectedMemberId,
        employeeName: selectedMember?.name,
        teamName: reportType === 'team' ? 'Engineering Team' : undefined,
        includeCharts: includeData.analytics,
        calibrationData
      };

      const blob = await generateReport(mockData, reportOptions);
      if (!blob) {
        throw new Error('Failed to generate report: No data received');
      }

      // Create and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const reportName = selectedMember ? 
        `${reportType}_report_${selectedMember.name.toLowerCase().replace(/\s+/g, '_')}` :
        `${reportType}_report`;
      link.download = `${reportName}_${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : 'pdf'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      addToast('Report generated successfully!', 'success');
    } catch (error) {
      console.error('Error generating report:', error);
      addToast(error instanceof Error ? error.message : 'Failed to generate report. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const showMemberSelection = reportType === 'individual' || reportType === 'calibration';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => {
                setReportType(e.target.value as typeof reportType);
                if (!['individual', 'calibration'].includes(e.target.value)) {
                  setSelectedMemberId('');
                }
              }}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="individual">Individual Performance</option>
              <option value="team">Team Performance</option>
              <option value="organization">Organization Overview</option>
              <option value="calibration">Calibration Results</option>
            </select>
          </div>

          {showMemberSelection && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Team Member
              </label>
              <select
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select team member</option>
                {teamMembers.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name} - {member.role}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Format
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center ${
                  format === 'pdf'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <FileText className="w-5 h-5 mr-2" />
                PDF
              </button>
              <button
                type="button"
                onClick={() => setFormat('excel')}
                className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center ${
                  format === 'excel'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <FileSpreadsheet className="w-5 h-5 mr-2" />
                Excel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Include Data
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeData.goals}
                onChange={(e) => setIncludeData({ ...includeData, goals: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Goals and Progress</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeData.evaluations}
                onChange={(e) => setIncludeData({ ...includeData, evaluations: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Performance Evaluations</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeData.feedback}
                onChange={(e) => setIncludeData({ ...includeData, feedback: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Feedback and Reviews</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeData.analytics}
                onChange={(e) => setIncludeData({ ...includeData, analytics: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Analytics and Charts</span>
            </label>
            {reportType !== 'individual' && (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeData.calibration}
                  onChange={(e) => setIncludeData({ ...includeData, calibration: e.target.checked })}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Calibration Results</span>
              </label>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating || (showMemberSelection && !selectedMemberId)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center"
          >
            <FileDown className="w-5 h-5 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;