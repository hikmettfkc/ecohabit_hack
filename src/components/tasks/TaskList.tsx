import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import TaskCard from './TaskCard';
import { Task } from '../../types/Task';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const { isDarkMode } = useTheme();
  
  if (tasks.length === 0) {
    return (
      <div className={`rounded-xl p-8 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <h3 className="text-xl font-semibold mb-2">No tasks available</h3>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          There are no tasks matching your current filter. Try changing your filter or check back later.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;