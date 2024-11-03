import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { User, Goal, Evaluation, Task } from '../types';
import { format } from 'date-fns';

interface ReportOptions {
  type: 'individual' | 'team' | 'organization';
  format: 'pdf' | 'excel';
  dateRange?: { start: Date; end: Date };
  employeeId?: string;
  includeCharts?: boolean;
}

interface ReportData {
  users?: User[];
  goals?: Goal[];
  evaluations?: Evaluation[];
  tasks?: Task[];
  performanceData?: {
    labels: string[];
    values: number[];
  };
}

export const generateReport = async (data: ReportData, options: ReportOptions): Promise<Blob> => {
  if (options.format === 'pdf') {
    return generatePDFReport(data, options);
  } else {
    return generateExcelReport(data, options);
  }
};

const generatePDFReport = async (data: ReportData, options: ReportOptions): Promise<Blob> => {
  const doc = new jsPDF();
  let yPosition = 20;

  // Header
  doc.setFontSize(20);
  doc.text(getReportTitle(options), 20, yPosition);
  yPosition += 15;

  // Date Range
  if (options.dateRange) {
    doc.setFontSize(12);
    doc.text(
      `Period: ${format(options.dateRange.start, 'MMM d, yyyy')} - ${format(options.dateRange.end, 'MMM d, yyyy')}`,
      20,
      yPosition
    );
    yPosition += 15;
  }

  // Performance Summary
  if (data.performanceData && options.includeCharts) {
    doc.setFontSize(16);
    doc.text('Performance Summary', 20, yPosition);
    yPosition += 10;

    // Add performance metrics
    doc.setFontSize(12);
    data.performanceData.labels.forEach((label, index) => {
      doc.text(`${label}: ${data.performanceData!.values[index].toFixed(1)}`, 25, yPosition);
      yPosition += 7;
    });
    yPosition += 10;
  }

  // Goals Section
  if (data.goals && data.goals.length > 0) {
    doc.setFontSize(16);
    doc.text('Goals', 20, yPosition);
    yPosition += 10;

    data.goals.forEach(goal => {
      doc.setFontSize(12);
      doc.text(`${goal.title} (${goal.status})`, 25, yPosition);
      yPosition += 7;
      doc.setFontSize(10);
      doc.text(`Progress: ${goal.progress}%`, 30, yPosition);
      yPosition += 7;
      doc.text(`Due: ${format(goal.timeBound, 'MMM d, yyyy')}`, 30, yPosition);
      yPosition += 10;
    });
  }

  // Evaluations Section
  if (data.evaluations && data.evaluations.length > 0) {
    doc.setFontSize(16);
    doc.text('Performance Evaluations', 20, yPosition);
    yPosition += 10;

    data.evaluations.forEach(evaluation => {
      doc.setFontSize(12);
      doc.text(`Period: ${evaluation.period}`, 25, yPosition);
      yPosition += 7;
      doc.text(`Overall Score: ${evaluation.overallScore}`, 25, yPosition);
      yPosition += 7;

      if (evaluation.metrics.length > 0) {
        doc.setFontSize(10);
        evaluation.metrics.forEach(metric => {
          doc.text(`${metric.category}: ${metric.score} - ${metric.feedback}`, 30, yPosition);
          yPosition += 7;
        });
      }
      yPosition += 10;
    });
  }

  return doc.output('blob');
};

const generateExcelReport = async (data: ReportData, options: ReportOptions): Promise<Blob> => {
  const wb = XLSX.utils.book_new();

  // Performance Summary
  if (data.performanceData) {
    const performanceData = data.performanceData.labels.map((label, index) => ({
      Metric: label,
      Value: data.performanceData!.values[index]
    }));
    const performanceWS = XLSX.utils.json_to_sheet(performanceData);
    XLSX.utils.book_append_sheet(wb, performanceWS, 'Performance Summary');
  }

  // Goals
  if (data.goals) {
    const goalsData = data.goals.map(goal => ({
      Title: goal.title,
      Description: goal.description,
      Status: goal.status,
      Progress: `${goal.progress}%`,
      'Due Date': format(goal.timeBound, 'MMM d, yyyy'),
      'Created At': format(goal.createdAt, 'MMM d, yyyy'),
      'Updated At': format(goal.updatedAt, 'MMM d, yyyy')
    }));
    const goalsWS = XLSX.utils.json_to_sheet(goalsData);
    XLSX.utils.book_append_sheet(wb, goalsWS, 'Goals');
  }

  // Evaluations
  if (data.evaluations) {
    const evaluationsData: any[] = [];
    data.evaluations.forEach(evaluation => {
      evaluation.metrics.forEach(metric => {
        evaluationsData.push({
          Period: evaluation.period,
          Category: metric.category,
          Score: metric.score,
          Feedback: metric.feedback,
          'Overall Score': evaluation.overallScore
        });
      });
    });
    const evaluationsWS = XLSX.utils.json_to_sheet(evaluationsData);
    XLSX.utils.book_append_sheet(wb, evaluationsWS, 'Evaluations');
  }

  // Tasks
  if (data.tasks) {
    const tasksData = data.tasks.map(task => ({
      Title: task.title,
      Description: task.description,
      Status: task.status,
      'Due Date': format(task.dueDate, 'MMM d, yyyy'),
      Type: task.type
    }));
    const tasksWS = XLSX.utils.json_to_sheet(tasksData);
    XLSX.utils.book_append_sheet(wb, tasksWS, 'Tasks');
  }

  const buffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
};

const getReportTitle = (options: ReportOptions): string => {
  switch (options.type) {
    case 'individual':
      return 'Individual Performance Report';
    case 'team':
      return 'Team Performance Report';
    case 'organization':
      return 'Organization Performance Report';
    default:
      return 'Performance Report';
  }
};