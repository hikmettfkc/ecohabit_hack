import React from 'react';
import { Droplet, Zap, Recycle, Coffee, Car, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface CategoryFilterProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const { isDarkMode } = useTheme();
  
  const categories = [
    { id: 'water', name: 'Water', icon: <Droplet size={18} />, color: 'text-blue-600' },
    { id: 'energy', name: 'Energy', icon: <Zap size={18} />, color: 'text-yellow-600' },
    { id: 'waste', name: 'Waste', icon: <Recycle size={18} />, color: 'text-green-600' },
    { id: 'food', name: 'Food', icon: <Coffee size={18} />, color: 'text-orange-600' },
    { id: 'transport', name: 'Transport', icon: <Car size={18} />, color: 'text-purple-600' },
  ];
  
  return (
    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-4`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Filter by category</h3>
        {selectedCategory && (
          <button 
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <X size={14} /> Clear filter
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-green-600 text-white'
                : isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm'
            }`}
          >
            <span className={selectedCategory === category.id ? 'text-white' : category.color}>
              {category.icon}
            </span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;