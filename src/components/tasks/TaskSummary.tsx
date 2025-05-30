import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { useTheme } from '../../context/ThemeContext';
import { CheckCircle, Clock, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskSummary: React.FC = () => {
  const { tasks, completedTasks } = useTasks();
  const { isDarkMode } = useTheme();
  
  const dailyTasksCount = tasks.length;
  const completedTasksCount = completedTasks.length;
  const completionRate = dailyTasksCount > 0 
    ? Math.round((completedTasksCount / dailyTasksCount) * 100) 
    : 0;
  
  return (
    <section className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Today's Progress</h2>
        <Link 
          to="/tasks" 
          className="text-sm text-green-600 hover:text-green-700 font-medium"
        >
          View all tasks
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
              <p className="text-xl font-bold">{completedTasksCount} / {dailyTasksCount} tasks</p>
            </div>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <BarChart3 size={20} />
            </div>
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completion Rate</p>
              <p className="text-xl font-bold">{completionRate}%</p>
            </div>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-amber-50'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Clock size={20} />
            </div>
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Time Left</p>
              <p className="text-xl font-bold">5 hours</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Daily Progress</span>
          <span>{completionRate}%</span>
        </div>
        <div className={`w-full h-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div 
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400" 
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default TaskSummary;