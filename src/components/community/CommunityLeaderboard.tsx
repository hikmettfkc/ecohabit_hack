import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Award, Trophy, TrendingUp, Calendar } from 'lucide-react';
import { MOCK_LEADERBOARD_USERS } from '../../data/mockData';

const CommunityLeaderboard: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'allTime'>('week');
  
  const getTimeRangeText = () => {
    switch (timeRange) {
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case 'allTime': return 'All Time';
    }
  };
  
  // Sort users by points
  const sortedUsers = [...MOCK_LEADERBOARD_USERS].sort((a, b) => b.points - a.points);
  
  return (
    <div className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Trophy size={20} className="text-amber-500" /> Leaderboard
          </h2>
          
          <div className="flex rounded-lg overflow-hidden">
            <button 
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 text-sm ${
                timeRange === 'week' 
                  ? 'bg-green-600 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 text-gray-700'
              }`}
            >
              Week
            </button>
            <button 
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 text-sm ${
                timeRange === 'month' 
                  ? 'bg-green-600 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 text-gray-700'
              }`}
            >
              Month
            </button>
            <button 
              onClick={() => setTimeRange('allTime')}
              className={`px-3 py-1 text-sm ${
                timeRange === 'allTime' 
                  ? 'bg-green-600 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 text-gray-700'
              }`}
            >
              All Time
            </button>
          </div>
        </div>
        
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Top eco-conscious users for {getTimeRangeText().toLowerCase()}
        </p>
      </div>
      
      {/* Top 3 Winners Podium */}
      {sortedUsers.length >= 3 && (
        <div className="p-6 flex justify-center items-end gap-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center text-white text-xl font-bold mb-2">
              {sortedUsers[1].name.charAt(0)}
            </div>
            <div className={`w-16 h-24 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-t-lg flex items-center justify-center`}>
              <span className="text-xl font-bold">2</span>
            </div>
            <p className="text-sm font-medium mt-2">{sortedUsers[1].name}</p>
            <p className="text-xs flex items-center gap-1">
              <Award size={12} className="text-gray-400" /> {sortedUsers[1].points} pts
            </p>
          </div>
          
          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center text-white text-2xl font-bold mb-2 border-4 border-amber-300">
              {sortedUsers[0].name.charAt(0)}
            </div>
            <div className={`w-20 h-32 ${isDarkMode ? 'bg-amber-900/30' : 'bg-amber-200'} rounded-t-lg flex items-center justify-center`}>
              <span className="text-2xl font-bold">1</span>
            </div>
            <p className="text-sm font-medium mt-2">{sortedUsers[0].name}</p>
            <p className="text-xs flex items-center gap-1">
              <Award size={12} className="text-amber-500" /> {sortedUsers[0].points} pts
            </p>
          </div>
          
          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-700 to-amber-800 flex items-center justify-center text-white text-xl font-bold mb-2">
              {sortedUsers[2].name.charAt(0)}
            </div>
            <div className={`w-16 h-16 ${isDarkMode ? 'bg-gray-700' : 'bg-amber-800/20'} rounded-t-lg flex items-center justify-center`}>
              <span className="text-xl font-bold">3</span>
            </div>
            <p className="text-sm font-medium mt-2">{sortedUsers[2].name}</p>
            <p className="text-xs flex items-center gap-1">
              <Award size={12} className="text-amber-700" /> {sortedUsers[2].points} pts
            </p>
          </div>
        </div>
      )}
      
      {/* Full Leaderboard */}
      <div className="p-4">
        <h3 className="font-medium mb-3">Full Ranking</h3>
        
        <div className="space-y-2">
          {sortedUsers.map((user, index) => (
            <div 
              key={user.id}
              className={`flex items-center p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              } ${index < 3 ? 'border-l-4 border-amber-500' : ''}`}
            >
              <div className="w-6 text-center font-bold mr-3">
                {index + 1}
              </div>
              
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                {user.name.charAt(0)}
              </div>
              
              <div className="flex-1">
                <p className="font-medium">{user.name}</p>
                <div className="flex items-center gap-4">
                  <span className="text-xs flex items-center gap-1">
                    <TrendingUp size={12} /> Level {user.level}
                  </span>
                  <span className="text-xs flex items-center gap-1">
                    <Calendar size={12} /> {user.streak} day streak
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold">{user.points}</p>
                <p className="text-xs">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityLeaderboard;