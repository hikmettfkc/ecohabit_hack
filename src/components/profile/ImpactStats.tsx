import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Droplet, Zap, Recycle, Leaf } from 'lucide-react';

const ImpactStats: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  const impactStats = [
    { 
      id: 'water', 
      name: 'Water Saved', 
      value: '358', 
      unit: 'liters', 
      icon: <Droplet size={24} />, 
      color: 'text-blue-500',
      bgColor: isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100',
    },
    { 
      id: 'energy', 
      name: 'Energy Saved', 
      value: '42', 
      unit: 'kWh', 
      icon: <Zap size={24} />, 
      color: 'text-yellow-500',
      bgColor: isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100',
    },
    { 
      id: 'waste', 
      name: 'Waste Reduced', 
      value: '6.2', 
      unit: 'kg', 
      icon: <Recycle size={24} />, 
      color: 'text-green-500',
      bgColor: isDarkMode ? 'bg-green-900/30' : 'bg-green-100',
    },
    { 
      id: 'co2', 
      name: 'CO2 Avoided', 
      value: '28', 
      unit: 'kg', 
      icon: <Leaf size={24} />, 
      color: 'text-emerald-500',
      bgColor: isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-100',
    },
  ];
  
  return (
    <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <h2 className="text-xl font-bold mb-4">Your Environmental Impact</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {impactStats.map((stat) => (
          <div 
            key={stat.id}
            className={`p-4 rounded-lg ${stat.bgColor}`}
          >
            <div className={`${stat.color} mb-2`}>{stat.icon}</div>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm">{stat.unit} {stat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactStats;