import React from 'react';
import { Leaf, Github, Twitter, Instagram } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={`py-6 border-t ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Leaf className="w-6 h-6 text-green-600" />
            <span className="text-lg font-semibold">EcoHabit</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
            <a href="#" className="text-sm hover:underline">About Us</a>
            <a href="#" className="text-sm hover:underline">Privacy Policy</a>
            <a href="#" className="text-sm hover:underline">Terms of Service</a>
            <a href="#" className="text-sm hover:underline">Contact</a>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <Twitter size={20} />
            </a>
            <a href="#" className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <Instagram size={20} />
            </a>
            <a href="#" className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <Github size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} EcoHabit. All rights reserved.</p>
          <p className="mt-1">Making sustainable habits easy, one task at a time.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;