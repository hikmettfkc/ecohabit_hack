import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Heart, MessageSquare, Share, MoreHorizontal, Award } from 'lucide-react';
import { CommunityPost as CommunityPostType } from '../../types/Community';

interface CommunityPostProps {
  post: CommunityPostType;
}

const CommunityPost: React.FC<CommunityPostProps> = ({ post }) => {
  const { isDarkMode } = useTheme();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  
  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <div className={`rounded-xl overflow-hidden shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white text-lg font-bold">
            {post.user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{post.user.name}</span>
              {post.user.verified && (
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <Award size={12} className="text-white" />
                </div>
              )}
            </div>
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {new Date(post.date).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <button className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
          <MoreHorizontal size={18} />
        </button>
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {post.content}
        </p>
        
        <div className={`text-xs inline-block px-3 py-1 rounded-full mb-3 ${
          isDarkMode ? 'bg-gray-700' : 'bg-green-100 text-green-800'
        }`}>
          Completed: {post.task.title}
        </div>
      </div>
      
      {/* Post Image */}
      {post.image && (
        <div className="aspect-video">
          <img 
            src={post.image} 
            alt="Post" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Post Stats */}
      <div className="px-4 py-2 flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <span className={`text-xs flex items-center gap-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Heart size={14} className={liked ? 'text-red-500 fill-red-500' : ''} /> {likesCount}
          </span>
          
          <span className={`text-xs flex items-center gap-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <MessageSquare size={14} /> {post.comments.length}
          </span>
        </div>
        
        <div>
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {post.chainCount > 0 ? `${post.chainCount} people joined this chain` : ''}
          </span>
        </div>
      </div>
      
      {/* Post Actions */}
      <div className="p-2 flex justify-around">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-1 py-1 px-3 rounded-lg ${
            liked 
              ? 'text-red-500' 
              : isDarkMode 
                ? 'text-gray-400 hover:bg-gray-700' 
                : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Heart size={18} className={liked ? 'fill-red-500' : ''} /> Like
        </button>
        
        <button 
          className={`flex items-center gap-1 py-1 px-3 rounded-lg ${
            isDarkMode 
              ? 'text-gray-400 hover:bg-gray-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <MessageSquare size={18} /> Comment
        </button>
        
        <button 
          className={`flex items-center gap-1 py-1 px-3 rounded-lg ${
            isDarkMode 
              ? 'text-gray-400 hover:bg-gray-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Share size={18} /> Join Chain
        </button>
      </div>
      
      {/* Comments Preview (first 2) */}
      {post.comments.length > 0 && (
        <div className={`px-4 py-3 ${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
          {post.comments.slice(0, 2).map((comment, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {comment.user.charAt(0)}
                </div>
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <p className="text-xs font-medium">{comment.user}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {comment.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {post.comments.length > 2 && (
            <button className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
              View all {post.comments.length} comments
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityPost;