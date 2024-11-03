import { Assessment, Framework } from './assessment';

export interface CalibrationReportData {
  framework: Framework;
  assessments: Assessment[];
  teamMembers: {
    id: string;
    name: string;
    role: string;
    department: string;
  }[];
  summary: {
    topPerformers: string[];
    meetingExpectations: string[];
    needsDevelopment: string[];
  };
}

export interface ReportOptions {
  type: 'individual' | 'team' | 'organization' | 'calibration';
  format: 'pdf' | 'excel';
  dateRange?: { start: Date; end: Date };
  employeeId?: string;
  includeCharts?: boolean;
  calibrationData?: CalibrationReportData;
}