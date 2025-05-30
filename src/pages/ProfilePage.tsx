import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { useTasks } from '../context/TaskContext';
import { Award, Droplet, Zap, Recycle, Leaf, Edit3 } from 'lucide-react';
import UserBadges from '../components/profile/UserBadges';
import ActivityCalendar from '../components/profile/ActivityCalendar';
import ImpactStats from '../components/profile/ImpactStats';
import CompletedTaskList from '../components/profile/CompletedTaskList';

const ProfilePage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { user } = useUser();
  const { completedTasks } = useTasks();
  
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="absolute bottom-0 right-0 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
              <Edit3 size={16} />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{user?.name || 'User'}</h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {user?.bio || 'Eco-enthusiast making a difference one small action at a time.'}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <Leaf size={14} /> Level {user?.level || 1}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                <Award size={14} /> {user?.points || 0} Points
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                <Recycle size={14} /> {completedTasks.length} Tasks
              </span>
            </div>
          </div>
          
          <button className={`px-4 py-2 rounded-lg ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          }`}>
            Edit Profile
          </button>
        </div>
      </div>
      
      {/* Impact Stats */}
      <ImpactStats />
      
      {/* Badges Section */}
      <UserBadges />
      
      {/* Activity Calendar */}
      <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <h2 className="text-xl font-bold mb-4">Activity Calendar</h2>
        <ActivityCalendar />
      </div>
      
      {/* Recent Completed Tasks */}
      <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <h2 className="text-xl font-bold mb-4">Recently Completed Tasks</h2>
        <CompletedTaskList tasks={completedTasks.slice(0, 5)} />
      </div>
    </div>
  );
};

export default ProfilePage;