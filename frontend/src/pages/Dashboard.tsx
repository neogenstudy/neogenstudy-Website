import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Users, MessageCircle, BarChart3, 
  Calendar, Trophy, Target, Clock, ArrowRight, 
  Flame, TrendingUp, CheckCircle 
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const Dashboard: React.FC = () => {
  const { stats, currentExam } = useUser();

  const quickActions = [
    { 
      title: 'Today\'s Study Plan', 
      description: 'Complete Day 23 tasks', 
      icon: Calendar, 
      link: '/app/study-plan',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    { 
      title: 'Solve Doubts', 
      description: '3 new questions', 
      icon: MessageCircle, 
      link: '/app/doubts',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    { 
      title: 'Take Mock Test', 
      description: 'Physics Practice Set', 
      icon: BookOpen, 
      link: '/app/mock-test',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    { 
      title: 'Join Study Group', 
      description: 'NEET 2025 Discussion', 
      icon: Users, 
      link: '/app/groups',
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    }
  ];

  const recentActivity = [
    { action: 'Completed', item: 'Organic Chemistry Chapter 3', time: '2 hours ago', icon: CheckCircle, color: 'text-green-500' },
    { action: 'Scored', item: '85% in Physics Mock Test', time: 'Yesterday', icon: Trophy, color: 'text-yellow-500' },
    { action: 'Joined', item: 'Chemistry Study Group', time: '2 days ago', icon: Users, color: 'text-blue-500' },
    { action: 'Solved', item: '5 doubts in Mathematics', time: '3 days ago', icon: MessageCircle, color: 'text-purple-500' }
  ];

  const upcomingTasks = [
    { task: 'Physics - Waves and Oscillations', due: 'Today', priority: 'high' },
    { task: 'Chemistry - Coordination Compounds', due: 'Tomorrow', priority: 'medium' },
    { task: 'Biology - Genetics Practice', due: '2 days', priority: 'medium' },
    { task: 'Mock Test - Full Syllabus', due: '1 week', priority: 'low' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back! 🎯</h1>
            <p className="text-blue-100 text-lg mb-4">
              Ready to conquer {currentExam} today? You're on Day 23 of your journey.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5" />
                <span className="font-semibold">{stats.streak}-day streak</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">Rank #{stats.rank}</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Target className="w-16 h-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Points</p>
              <p className="text-2xl font-bold text-gray-900">{stats.points}</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +45 today
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Topics Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.topicsCompleted}/200</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(stats.topicsCompleted / 200) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Hours Studied</p>
              <p className="text-2xl font-bold text-gray-900">{stats.hoursStudied}</p>
              <p className="text-sm text-blue-600">This month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">87%</p>
              <p className="text-sm text-purple-600">Mock tests</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="bg-white rounded-xl p-6 shadow-md border-2 border-transparent hover:border-blue-200 transition-all duration-200 hover:shadow-lg group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{action.description}</p>
              <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                <span>Get started</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center`}>
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.action}</span> {activity.item}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/app/analytics"
            className="block mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View all activity →
          </Link>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Tasks</h3>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.task}</p>
                  <p className="text-xs text-gray-500">Due in {task.due}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  task.priority === 'high' 
                    ? 'bg-red-100 text-red-700' 
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/app/study-plan"
            className="block mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View full study plan →
          </Link>
        </div>
      </div>

      {/* Progress Motivation */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">You're doing great! 🎉</h3>
            <p className="text-green-100 mb-4">
              You've completed {Math.round((stats.topicsCompleted / 200) * 100)}% of your {currentExam} syllabus. 
              Keep up the momentum!
            </p>
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                <span className="text-sm font-medium">Days left: 77</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                <span className="text-sm font-medium">Target: 650+ marks</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl">📚</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;