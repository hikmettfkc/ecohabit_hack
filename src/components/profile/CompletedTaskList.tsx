import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Calendar, ThumbsUp, MessageSquare } from 'lucide-react';
import { CompletedTask } from '../../types/Task';

interface CompletedTaskListProps {
  tasks: CompletedTask[];
}

const CompletedTaskList: React.FC<CompletedTaskListProps> = ({ tasks }) => {
  const { isDarkMode } = useTheme();
  
  if (tasks.length === 0) {
    return (
      <div className="text-center py-4">
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          You haven't completed any tasks yet. Start with your daily tasks to see them here!
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
        >
          <div className="flex gap-3">
            {task.photo && (
              <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <img src={task.photo} alt="Task completion" className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="flex-1">
              <h4 className="font-medium">{task.taskTitle}</h4>
              
              {task.note && (
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {task.note}
                </p>
              )}
              
              <div className="flex items-center gap-4 mt-2">
                <span className={`text-xs flex items-center gap-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <Calendar size={14} /> {new Date(task.completedAt).toLocaleDateString()}
                </span>
                
                <div className="flex items-center gap-3">
                  <button className={`text-xs flex items-center gap-1 ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}>
                    <ThumbsUp size={14} /> {task.likes || 0}
                  </button>
                  
                  <button className={`text-xs flex items-center gap-1 ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}>
                    <MessageSquare size={14} /> {task.comments || 0}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedTaskList;