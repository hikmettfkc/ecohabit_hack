import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Award, Info } from 'lucide-react';

const UserBadges: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  const badges = [
    { 
      id: 1, 
      name: 'Early Adopter', 
      icon: '🌱', 
      description: 'Joined during our launch period',
      unlocked: true 
    },
    { 
      id: 2, 
      name: 'Water Saver', 
      icon: '💧', 
      description: 'Completed 10 water-saving tasks',
      unlocked: true 
    },
    { 
      id: 3, 
      name: 'Energy Guardian', 
      icon: '⚡', 
      description: 'Completed 10 energy-saving tasks',
      unlocked: false 
    },
    { 
      id: 4, 
      name: 'Zero Waste Hero', 
      icon: '♻️', 
      description: 'Completed 10 waste reduction tasks',
      unlocked: false 
    },
    { 
      id: 5, 
      name: 'Task Streak', 
      icon: '🔥', 
      description: 'Completed at least one task for 7 days straight',
      unlocked: true 
    },
    { 
      id: 6, 
      name: 'Community Leader', 
      icon: '👥', 
      description: 'Started 5 task chains that were completed by others',
      unlocked: false 
    },
  ];
  
  return (
    <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Award size={20} className="text-amber-500" /> Badges
        </h2>
        <span className="text-sm text-gray-500">
          {badges.filter(b => b.unlocked).length}/{badges.length} Unlocked
        </span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {badges.map((badge) => (
          <div 
            key={badge.id}
            className={`relative p-4 rounded-lg text-center ${
              badge.unlocked
                ? isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                : isDarkMode ? 'bg-gray-900 opacity-50' : 'bg-gray-200 opacity-50'
            }`}
          >
            <div className="text-3xl mb-2">{badge.icon}</div>
            <h3 className="text-sm font-medium mb-1">{badge.name}</h3>
            <div className="group relative">
              <Info size={16} className="mx-auto text-gray-400 cursor-help" />
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 transform -translate-x-1/2 w-48 bg-black text-white text-xs rounded p-2 mb-2 z-10">
                {badge.description}
                <div className="absolute w-2 h-2 bg-black transform rotate-45 left-1/2 -bottom-1 -translate-x-1/2"></div>
              </div>
            </div>
            {!badge.unlocked && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                <div className={`text-xl ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>🔒</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBadges;