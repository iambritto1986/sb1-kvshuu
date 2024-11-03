import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ManagerDashboard from './dashboard/ManagerDashboard';
import EmployeeDashboard from './dashboard/EmployeeDashboard';
import NewEvaluationModal from './modals/NewEvaluationModal';
import useToast from '../hooks/useToast';
import { useTasks } from '../contexts/TaskContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { addTask } = useTasks();
  const [isNewEvaluationModalOpen, setIsNewEvaluationModalOpen] = useState(false);

  const handleNewEvaluation = (data: any) => {
    // Create parent task
    const parentTaskId = Date.now().toString();
    const parentTask = {
      type: 'GOAL_UPDATE',
      title: 'Team Goals Update & Review',
      description: data.message,
      assignedTo: user?.id || '',
      assignedToName: user?.name || '',
      assignedBy: user?.id || '',
      dueDate: new Date(data.dueDate),
      status: 'PENDING',
      frameworkId: data.selectedFramework,
      isParentTask: true,
      totalSubTasks: data.selectedMembers.length,
      completedSubTasks: 0
    };

    addTask(parentTask);

    // Create child tasks for each team member
    data.selectedMembers.forEach((member: { id: string, name: string }) => {
      const childTask = {
        type: 'GOAL_UPDATE',
        title: 'Update Goals & Self-Assessment',
        description: data.message,
        assignedTo: member.id,
        assignedToName: member.name,
        assignedBy: user?.id || '',
        dueDate: new Date(data.dueDate),
        status: 'PENDING',
        frameworkId: data.selectedFramework,
        parentTaskId
      };

      addTask(childTask);
    });

    addToast('Evaluation tasks created successfully!', 'success');
    setIsNewEvaluationModalOpen(false);
  };

  if (!user) return null;

  if (['MANAGER', 'ADMIN'].includes(user.role)) {
    return (
      <>
        <ManagerDashboard onNewEvaluation={() => setIsNewEvaluationModalOpen(true)} />
        <NewEvaluationModal
          isOpen={isNewEvaluationModalOpen}
          onClose={() => setIsNewEvaluationModalOpen(false)}
          onSubmit={handleNewEvaluation}
        />
      </>
    );
  }

  return <EmployeeDashboard />;
};

export default Dashboard;