import React from 'react';
import { ArrowRight, Award, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import TaskSummary from '../components/tasks/TaskSummary';

const HomePage: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-90"></div>
        <img 
          src="https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
          alt="Nature scene" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-10 py-16 px-6 text-white max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Small Actions, Big Impact</h1>
          <p className="text-lg mb-8">Join our community of eco-conscious individuals making sustainable habits a part of everyday life.</p>
          <Link to="/tasks" className="inline-flex items-center gap-2 bg-white text-green-700 hover:bg-green-50 px-6 py-3 rounded-full font-medium transition-colors">
            Start your eco journey <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Task Summary Section */}
      <TaskSummary />

      {/* Features Section */}
      <section className={`rounded-xl p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <h2 className="text-2xl font-bold mb-6 text-center">How EcoHabit Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className={`p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Complete Eco Tasks</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Tackle simple daily challenges to build sustainable habits and earn points.
            </p>
          </div>
          
          <div className={`p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Join the Community</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Share your accomplishments and start chains of positive action with friends.
            </p>
          </div>
          
          <div className={`p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-amber-50'}`}>
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Your Impact</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              See how your small actions add up to make a real difference for the planet.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-8`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Our Collective Impact</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4">
            <p className="text-3xl font-bold text-green-600">10,432</p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tasks Completed</p>
          </div>
          
          <div className="p-4">
            <p className="text-3xl font-bold text-blue-600">1,238</p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Members</p>
          </div>
          
          <div className="p-4">
            <p className="text-3xl font-bold text-amber-600">5,876</p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>kg CO2 Saved</p>
          </div>
          
          <div className="p-4">
            <p className="text-3xl font-bold text-purple-600">3,245</p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Plastic Items Avoided</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to make a difference?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Join thousands of people making sustainable choices every day. Your journey to a greener lifestyle starts with one small step.</p>
        <Link to="/tasks" className="inline-flex items-center gap-2 bg-white text-green-700 hover:bg-green-50 px-6 py-3 rounded-full font-medium transition-colors">
          Get started now <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
};

export default HomePage;