import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ActivityCalendar: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  // Generate mock activity data for the last 30 days
  const generateMockData = () => {
    const today = new Date();
    const days = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Random activity level: 0-4
      const level = Math.floor(Math.random() * 5);
      
      days.push({
        date: date.toISOString().split('T')[0],
        count: level,
        level,
      });
    }
    
    return days;
  };
  
  const activityData = generateMockData();
  
  const getLevelColor = (level: number) => {
    if (level === 0) return isDarkMode ? 'bg-gray-800' : 'bg-gray-200';
    if (level === 1) return 'bg-green-200';
    if (level === 2) return 'bg-green-300';
    if (level === 3) return 'bg-green-500';
    return 'bg-green-700';
  };
  
  // Group the days by week
  const weeks = [];
  let currentWeek: typeof activityData = [];
  
  activityData.forEach((day, index) => {
    currentWeek.push(day);
    
    if (currentWeek.length === 7 || index === activityData.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });
  
  return (
    <div>
      <div className="grid grid-cols-7 gap-2">
        {weeks.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((day) => (
              <div 
                key={day.date} 
                className={`w-full pt-[100%] rounded-sm relative ${getLevelColor(day.level)}`}
              >
                <div className="group">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 transform -translate-x-1/2 w-auto bg-black text-white text-xs rounded p-1 mb-1 z-10 whitespace-nowrap">
                    {day.date}: {day.count} tasks
                    <div className="absolute w-2 h-2 bg-black transform rotate-45 left-1/2 -bottom-1 -translate-x-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      
      <div className="flex items-center justify-end mt-4 gap-2 text-sm">
        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Less</span>
        <div className={`w-3 h-3 rounded-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
        <div className="w-3 h-3 rounded-sm bg-green-200"></div>
        <div className="w-3 h-3 rounded-sm bg-green-300"></div>
        <div className="w-3 h-3 rounded-sm bg-green-500"></div>
        <div className="w-3 h-3 rounded-sm bg-green-700"></div>
        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>More</span>
      </div>
    </div>
  );
};

export default ActivityCalendar;