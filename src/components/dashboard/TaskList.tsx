import React from 'react';
import { useTasks } from '../../contexts/TaskContext';
import { useAuth } from '../../contexts/AuthContext';
import TaskCard from './TaskCard';
import { Task } from '../../types/task';

const TaskList = () => {
  const { user } = useAuth();
  const { tasks, getChildTasks } = useTasks();

  if (!user) return null;

  // Filter tasks based on user role
  const userTasks = tasks.filter(task => {
    if (user.role === 'EMPLOYEE') {
      // Employees only see tasks assigned to them
      return task.assignedTo === user.id;
    } else {
      // Managers see parent tasks they created and their team's tasks
      return task.assignedBy === user.id || task.isParentTask;
    }
  });

  // Group tasks by parent/standalone
  const groupedTasks = userTasks.reduce((acc, task) => {
    if (task.isParentTask) {
      const childTasks = user.role !== 'EMPLOYEE' ? getChildTasks(task.id) : [];
      acc.parentTasks.push({
        ...task,
        childTasks: childTasks.sort((a, b) => 
          a.assignedToName.localeCompare(b.assignedToName)
        )
      });
    } else if (!task.parentTaskId) {
      acc.standaloneTasks.push(task);
    }
    return acc;
  }, {
    parentTasks: [] as (Task & { childTasks: Task[] })[],
    standaloneTasks: [] as Task[]
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {user.role === 'EMPLOYEE' ? 'My Tasks' : 'Team Tasks'}
      </h2>
      <div className="space-y-4">
        {/* Parent Tasks with Children */}
        {groupedTasks.parentTasks.map(parentTask => (
          <TaskCard 
            key={`parent-${parentTask.id}`}
            task={parentTask}
            childTasks={parentTask.childTasks}
          />
        ))}

        {/* Standalone Tasks */}
        {groupedTasks.standaloneTasks.map(task => (
          <TaskCard 
            key={`standalone-${task.id}`}
            task={task}
          />
        ))}

        {userTasks.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No tasks available
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskList;