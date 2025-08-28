import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, BookOpen, MessageCircle, Users, BarChart3, 
  TestTube, Gift, X, Calendar, Target, Flame 
} from 'lucide-react';
import { useUser } from '../context/UserContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { stats } = useUser();

  const menuItems = [
    { path: '/app/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/app/study-plan', icon: Calendar, label: 'Study Plan' },
    { path: '/app/topics', icon: BookOpen, label: 'Topics & Resources' },
    { path: '/app/doubts', icon: MessageCircle, label: 'Doubt Solver' },
    { path: '/app/groups', icon: Users, label: 'Study Groups' },
    { path: '/app/mock-test', icon: TestTube, label: 'Mock Tests' },
    { path: '/app/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/app/referral', icon: Gift, label: 'Referrals' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 w-64 h-screen bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">YS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">NeoGenStudy</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stats Cards */}
          <div className="p-4 space-y-3 border-b border-gray-200">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-3 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Study Streak</p>
                  <p className="text-2xl font-bold">{stats.streak} days</p>
                </div>
                <Flame className="w-8 h-8 opacity-80" />
              </div>
            </div>
            
            <div className="bg-green-50 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Rank</p>
                  <p className="text-xl font-bold text-green-700">#{stats.rank}</p>
                </div>
                <Target className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) => `
                      flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-yellow-50 rounded-lg p-3">
              <p className="text-sm text-yellow-800 font-medium">Need Help?</p>
              <p className="text-xs text-yellow-600 mt-1">Chat with our support team</p>
                <button
                  className="mt-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-300"
                  onClick={() => { href = 'mailto:neogenstudy@gmail.com'; }}
                >
                  Contact Support
                </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;