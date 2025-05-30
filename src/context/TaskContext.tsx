import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, CompletedTask } from '../types/Task';
import { MOCK_TASKS, MOCK_COMPLETED_TASKS } from '../data/mockData';

interface TaskContextProps {
  tasks: Task[];
  completedTasks: CompletedTask[];
  completeTask: (taskId: number, photo: string | null, note: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>(MOCK_COMPLETED_TASKS);

  const completeTask = (taskId: number, photo: string | null, note: string) => {
    // Find the task that was completed
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Create a new completed task
    const completedTask: CompletedTask = {
      id: Date.now(),
      taskId,
      taskTitle: task.title,
      completedAt: new Date().toISOString(),
      photo,
      note,
      likes: 0,
      comments: 0
    };
    
    // Add to completed tasks
    setCompletedTasks(prev => [completedTask, ...prev]);
    
    // Remove from current tasks
    // In a real app, we might just mark it as completed instead
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };
  
  return (
    <TaskContext.Provider value={{ tasks, completedTasks, completeTask }}>
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