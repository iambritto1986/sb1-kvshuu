import React, { createContext, useContext, useState, useCallback } from 'react';
import { Task, TaskStatus } from '../types/task';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksByAssignee: (assigneeId: string) => Task[];
  getChildTasks: (parentId: string) => Task[];
  updateParentTaskProgress: (parentId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): string => {
    const id = Date.now().toString();
    const newTask: Task = {
      ...taskData,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTasks(prev => [...prev, newTask]);
    return id;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, ...updates, updatedAt: new Date() };
        return updatedTask;
      }
      return task;
    }));
  }, []);

  const updateParentTaskProgress = useCallback((parentId: string) => {
    const childTasks = tasks.filter(task => task.parentTaskId === parentId);
    const completedTasks = childTasks.filter(task => task.status === 'COMPLETED').length;
    const totalTasks = childTasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    updateTask(parentId, {
      completedSubTasks: completedTasks,
      progress,
      status: completedTasks === totalTasks ? 'COMPLETED' as TaskStatus : 'IN_PROGRESS' as TaskStatus
    });
  }, [tasks, updateTask]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const getTasksByAssignee = useCallback((assigneeId: string) => {
    return tasks.filter(task => task.assignedTo === assigneeId);
  }, [tasks]);

  const getChildTasks = useCallback((parentId: string) => {
    return tasks.filter(task => task.parentTaskId === parentId);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      getTasksByAssignee,
      getChildTasks,
      updateParentTaskProgress
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};