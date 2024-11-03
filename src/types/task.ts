export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskType = 'GOAL_UPDATE' | 'EVALUATION' | 'FEEDBACK';

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  assignedTo: string;
  assignedToName: string;
  assignedBy: string;
  dueDate: Date;
  status: TaskStatus;
  frameworkId?: string;
  isParentTask?: boolean;
  parentTaskId?: string;
  totalSubTasks?: number;
  completedSubTasks?: number;
  progress?: number;
  createdAt: Date;
  updatedAt: Date;
}