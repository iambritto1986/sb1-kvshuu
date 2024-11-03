import { Framework } from './assessment';

export type EvaluationStatus = 'DRAFT' | 'IN_PROGRESS' | 'PENDING_REVIEW' | 'COMPLETED';

export interface EvaluationRating {
  categoryId: string;
  rating: string;
  comment: string;
}

export interface Evaluation {
  id: string;
  employeeId: string;
  supervisorId: string;
  period: string;
  frameworkId: Framework['id'];
  ratings: EvaluationRating[];
  initialComments: string;
  strengths: string[];
  improvements: string[];
  status: EvaluationStatus;
  overallScore: number;
  createdAt: Date;
  updatedAt: Date;
}