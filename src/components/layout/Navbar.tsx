import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, ListTodo, Users, User, Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useUser();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-2 p-2 rounded-lg transition-colors ${
      isActive 
        ? 'bg-green-600 text-white' 
        : isDarkMode 
          ? 'text-gray-300 hover:bg-gray-800' 
          : 'text-gray-700 hover:bg-green-100'
    }`;

  return (
    <nav className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-xl font-bold">EcoHabit</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={navLinkClasses}>
              <Leaf size={18} /> Home
            </NavLink>
            <NavLink to="/tasks" className={navLinkClasses}>
              <ListTodo size={18} /> Tasks
            </NavLink>
            <NavLink to="/community" className={navLinkClasses}>
              <Users size={18} /> Community
            </NavLink>
            <NavLink to="/profile" className={navLinkClasses}>
              <User size={18} /> Profile
            </NavLink>
          </div>

          {/* User Section & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <span className="text-sm font-medium">{user?.points || 0} pts</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md ${isDarkMode ? 'text-white' : 'text-gray-700'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden py-3 mt-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
            <NavLink to="/" className={navLinkClasses} onClick={toggleMenu}>
              <Leaf size={18} /> Home
            </NavLink>
            <NavLink to="/tasks" className={navLinkClasses} onClick={toggleMenu}>
              <ListTodo size={18} /> Tasks
            </NavLink>
            <NavLink to="/community" className={navLinkClasses} onClick={toggleMenu}>
              <Users size={18} /> Community
            </NavLink>
            <NavLink to="/profile" className={navLinkClasses} onClick={toggleMenu}>
              <User size={18} /> Profile
            </NavLink>
            
            <div className="flex items-center gap-2 p-2 mt-2 border-t border-gray-300">
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <span className="text-sm font-medium">{user?.points || 0} pts</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;