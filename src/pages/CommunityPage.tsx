import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Search, Filter, TrendingUp, Users, Award } from 'lucide-react';
import CommunityPost from '../components/community/CommunityPost';
import CommunityLeaderboard from '../components/community/CommunityLeaderboard';
import { MOCK_COMMUNITY_POSTS } from '../data/mockData';

const CommunityPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'feed' | 'trending' | 'leaderboard'>('feed');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter posts based on search query
  const filteredPosts = searchQuery 
    ? MOCK_COMMUNITY_POSTS.filter(post => 
        post.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : MOCK_COMMUNITY_POSTS;
    
  // Different sorting based on active tab
  const displayPosts = activeTab === 'trending' 
    ? [...filteredPosts].sort((a, b) => b.likes - a.likes)
    : filteredPosts;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">Community</h1>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full md:w-64 pl-10 pr-4 py-2 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
            } border`}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab('feed')}
          className={`px-4 py-2 font-medium border-b-2 ${
            activeTab === 'feed' 
              ? 'border-green-500 text-green-600' 
              : 'border-transparent'
          }`}
        >
          <Users className="inline mr-2" size={18} /> All Posts
        </button>
        <button
          onClick={() => setActiveTab('trending')}
          className={`px-4 py-2 font-medium border-b-2 ${
            activeTab === 'trending' 
              ? 'border-green-500 text-green-600' 
              : 'border-transparent'
          }`}
        >
          <TrendingUp className="inline mr-2" size={18} /> Trending
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2 font-medium border-b-2 ${
            activeTab === 'leaderboard' 
              ? 'border-green-500 text-green-600' 
              : 'border-transparent'
          }`}
        >
          <Award className="inline mr-2" size={18} /> Leaderboard
        </button>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'leaderboard' ? (
        <CommunityLeaderboard />
      ) : (
        <div className="space-y-4">
          {displayPosts.map((post) => (
            <CommunityPost key={post.id} post={post} />
          ))}
          {displayPosts.length === 0 && (
            <div className={`text-center p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`}>
              <p>No posts found. Adjust your search or be the first to share!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;