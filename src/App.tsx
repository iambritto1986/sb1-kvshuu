import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TeamList from './components/team/TeamList';
import GoalList from './components/goals/GoalList';
import EvaluationList from './components/evaluations/EvaluationList';
import EvaluationForm from './components/evaluations/EvaluationForm';
import FeedbackList from './components/feedback/FeedbackList';
import CalibrationList from './components/calibration/CalibrationList';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import PersonalAnalytics from './components/analytics/PersonalAnalytics';
import Settings from './components/settings/Settings';
import LoginPage from './components/auth/LoginPage';
import UnauthorizedPage from './components/auth/UnauthorizedPage';
import OrganizationSignup from './components/auth/OrganizationSignup';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { RoleProvider } from './contexts/RoleContext';
import { EvaluationProvider } from './contexts/EvaluationContext';
import { TaskProvider } from './contexts/TaskContext';
import TeamMemberAnalytics from './components/analytics/TeamMemberAnalytics';
import ReportPage from './components/reports/ReportPage';
import AssessmentFramework from './components/assessment/AssessmentFramework';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <RoleProvider>
            <EvaluationProvider>
              <TaskProvider>
                <Router>
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<OrganizationSignup />} />
                    <Route path="/unauthorized" element={<UnauthorizedPage />} />
                    <Route path="/" element={<Layout />}>
                      <Route index element={
                        <ProtectedRoute requiredRoles={['EMPLOYEE', 'MANAGER', 'ADMIN']}>
                          <Dashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="team" element={
                        <ProtectedRoute requiredRoles={['MANAGER', 'ADMIN']}>
                          <TeamList />
                        </ProtectedRoute>
                      } />
                      <Route path="goals" element={
                        <ProtectedRoute requiredRoles={['EMPLOYEE', 'MANAGER', 'ADMIN']}>
                          <GoalList />
                        </ProtectedRoute>
                      } />
                      <Route path="evaluations" element={
                        <ProtectedRoute requiredRoles={['MANAGER', 'ADMIN']}>
                          <EvaluationList />
                        </ProtectedRoute>
                      } />
                      <Route path="evaluations/new" element={
                        <ProtectedRoute requiredRoles={['MANAGER', 'ADMIN']}>
                          <EvaluationForm />
                        </ProtectedRoute>
                      } />
                      <Route path="feedback" element={
                        <ProtectedRoute requiredRoles={['EMPLOYEE', 'MANAGER', 'ADMIN']}>
                          <FeedbackList />
                        </ProtectedRoute>
                      } />
                      <Route path="calibration" element={
                        <ProtectedRoute requiredRoles={['MANAGER', 'ADMIN']}>
                          <CalibrationList />
                        </ProtectedRoute>
                      } />
                      <Route path="assessment" element={
                        <ProtectedRoute requiredRoles={['MANAGER', 'ADMIN']}>
                          <AssessmentFramework />
                        </ProtectedRoute>
                      } />
                      <Route path="analytics" element={
                        <ProtectedRoute requiredRoles={['MANAGER', 'ADMIN']}>
                          <AnalyticsDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="analytics/personal" element={
                        <ProtectedRoute requiredRoles={['EMPLOYEE']}>
                          <PersonalAnalytics />
                        </ProtectedRoute>
                      } />
                      <Route path="analytics/team/:memberId" element={
                        <ProtectedRoute requiredRoles={['MANAGER', 'ADMIN']}>
                          <TeamMemberAnalytics />
                        </ProtectedRoute>
                      } />
                      <Route path="reports" element={
                        <ProtectedRoute requiredRoles={['MANAGER', 'ADMIN']}>
                          <ReportPage />
                        </ProtectedRoute>
                      } />
                      <Route path="settings" element={
                        <ProtectedRoute requiredRoles={['EMPLOYEE', 'MANAGER', 'ADMIN']}>
                          <Settings />
                        </ProtectedRoute>
                      } />
                    </Route>
                  </Routes>
                </Router>
              </TaskProvider>
            </EvaluationProvider>
          </RoleProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;