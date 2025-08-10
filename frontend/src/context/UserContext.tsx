import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface UserStats {
  points: number;
  streak: number;
  topicsCompleted: number;
  hoursStudied: number;
  rank: number;
}

interface UserContextType {
  stats: UserStats;
  updateStats: (updates: Partial<UserStats>) => void;
  currentExam: string;
  setCurrentExam: (exam: string) => void;
  studyPlan: any[];
  updateStudyPlan: (plan: any[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    points: 450,
    streak: 7,
    topicsCompleted: 23,
    hoursStudied: 156,
    rank: 15
  });
  const [currentExam, setCurrentExam] = useState('NEET');
  const [studyPlan, setStudyPlan] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      // Load user data
      const storedStats = localStorage.getItem(`neogen_stats_${user.id}`);
      if (storedStats) {
        setStats(JSON.parse(storedStats));
      }
    }
  }, [user]);

  const updateStats = (updates: Partial<UserStats>) => {
    const newStats = { ...stats, ...updates };
    setStats(newStats);
    if (user) {
      localStorage.setItem(`neogen_stats_${user.id}`, JSON.stringify(newStats));
    }
  };

  const updateStudyPlan = (plan: any[]) => {
    setStudyPlan(plan);
    if (user) {
      localStorage.setItem(`neogen_plan_${user.id}`, JSON.stringify(plan));
    }
  };

  const value = {
    stats,
    updateStats,
    currentExam,
    setCurrentExam,
    studyPlan,
    updateStudyPlan
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};