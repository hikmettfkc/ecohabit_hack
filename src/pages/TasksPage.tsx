import React, { useState } from 'react';
import { Filter, Calendar, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import TaskList from '../components/tasks/TaskList';
import CategoryFilter from '../components/tasks/CategoryFilter';

const TasksPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { tasks } = useTasks();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter tasks by category if selected
  const filteredTasks = selectedCategory 
    ? tasks.filter(task => task.category === selectedCategory) 
    : tasks;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Daily Eco Tasks</h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Complete these tasks to build sustainable habits and earn rewards
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={18} />
            <span>Filter</span>
            <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <button 
            className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Calendar size={18} />
            <span>Today</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
      
      {/* Category Filters */}
      {isFilterOpen && (
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
      )}
      
      {/* Tasks List */}
      <TaskList tasks={filteredTasks} />
    </div>
  );
};

export default TasksPage;