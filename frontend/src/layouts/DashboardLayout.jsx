import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  Home,
  BookOpen,
  HelpCircle,
  Users,
  BarChart2,
  PenTool,
  Share2,
  User,
  Moon,
  Sun,
} from 'lucide-react';

const sidebarLinks = [
  { path: '/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/study-plans', icon: BookOpen, label: 'Study Plans' },
  { path: '/doubts', icon: HelpCircle, label: 'Doubts' },
  { path: '/groups', icon: Users, label: 'Groups' },
  { path: '/analytics', icon: BarChart2, label: 'Analytics' },
  { path: '/mock-tests', icon: PenTool, label: 'Mock Tests' },
  { path: '/referrals', icon: Share2, label: 'Referrals' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 pt-16">
        <div className="flex flex-col flex-grow px-4 pb-4 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <nav className="flex-1 space-y-1 mt-5">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/10'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={toggleDarkMode}
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 mr-3" />
            ) : (
              <Moon className="w-5 h-5 mr-3" />
            )}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-64 pt-16">
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
