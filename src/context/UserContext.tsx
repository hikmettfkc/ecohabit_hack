import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/User';

interface UserContextProps {
  user: User | null;
  updateUser: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 1,
    name: 'Emily Green',
    email: 'emily@example.com',
    points: 785,
    level: 3,
    streak: 12,
    bio: 'Eco-enthusiast passionate about sustainable living and reducing my carbon footprint one step at a time.',
    joinedAt: '2023-11-15',
    avatar: null
  });

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => {
      if (!prev) return userData as User;
      return { ...prev, ...userData };
    });
  };
  
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};