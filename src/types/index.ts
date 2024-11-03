export type Role = 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  reportsTo?: string;
}

export interface Goal {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: Date;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Evaluation {
  id: string;
  employeeId: string;
  supervisorId: string;
  period: string;
  metrics: {
    category: string;
    score: number;
    feedback: string;
  }[];
  overallScore: number;
  strengths: string[];
  improvements: string[];
  status: 'DRAFT' | 'PENDING_REVIEW' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;
}

export interface Feedback {
  id: string;
  employeeId: string;
  supervisorId: string;
  type: 'SCHEDULED' | 'AD_HOC';
  content: string;
  createdAt: Date;
}

export interface CalibrationSession {
  id: string;
  date: Date;
  department: string;
  participants: string[];
  notes: string;
  decisions: string[];
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface Organization {
  id: string;
  name: string;
  department: string;
  location: string;
  timezone: string;
  logo?: string;
  subscriptionTier: SubscriptionTier;
  employeeCount: number;
  maxEmployees: number;
}

export type SubscriptionTier = 'FREE' | 'BASIC' | 'STANDARD' | 'PREMIUM';

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  maxEmployees: number;
  monthlyPrice: number | null;
  annualPrice: number | null;
  features: string[];
  recommended?: boolean;
}