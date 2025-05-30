import React, { useState } from 'react';
import { CheckCircle, Clock, BarChart, Camera, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTasks } from '../../context/TaskContext';
import { Task } from '../../types/Task';
import TaskCompletionForm from './TaskCompletionForm';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { isDarkMode } = useTheme();
  const { completeTask } = useTasks();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCompletionForm, setShowCompletionForm] = useState(false);
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'water': return 'bg-blue-100 text-blue-800';
      case 'energy': return 'bg-yellow-100 text-yellow-800';
      case 'waste': return 'bg-green-100 text-green-800';
      case 'food': return 'bg-orange-100 text-orange-800';
      case 'transport': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleComplete = (photo: string | null, note: string) => {
    completeTask(task.id, photo, note);
    setShowCompletionForm(false);
  };
  
  return (
    <div className={`rounded-xl overflow-hidden shadow-sm ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Task Image */}
      <div className="h-40 relative">
        <img 
          src={task.image} 
          alt={task.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white text-green-800 flex items-center gap-1">
            <BarChart size={12} /> +{task.points} pts
          </span>
        </div>
      </div>
      
      {/* Task Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs flex items-center gap-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <Clock size={14} /> {task.time} mins
          </span>
          <span className={`text-xs flex items-center gap-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <BarChart size={14} /> {task.impact}
          </span>
        </div>
        
        <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {isExpanded ? task.description : `${task.description.substring(0, 100)}...`}
        </p>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`text-sm flex items-center mb-4 ${
            isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {isExpanded ? (
            <>Show less <ChevronUp size={16} className="ml-1" /></>
          ) : (
            <>Show more <ChevronDown size={16} className="ml-1" /></>
          )}
        </button>
        
        {showCompletionForm ? (
          <TaskCompletionForm 
            onSubmit={handleComplete}
            onCancel={() => setShowCompletionForm(false)}
          />
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setShowCompletionForm(true)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle size={18} /> Complete
            </button>
            <button 
              className={`py-2 px-3 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Camera size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;