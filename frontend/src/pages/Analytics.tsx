import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, Target, Award, Calendar, BookOpen } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Analytics: React.FC = () => {
  const { stats, currentExam } = useUser();

  const weeklyStudyData = [
    { name: 'Mon', hours: 4.5, target: 5 },
    { name: 'Tue', hours: 3.2, target: 5 },
    { name: 'Wed', hours: 5.8, target: 5 },
    { name: 'Thu', hours: 4.1, target: 5 },
    { name: 'Fri', hours: 6.2, target: 5 },
    { name: 'Sat', hours: 7.5, target: 5 },
    { name: 'Sun', hours: 5.9, target: 5 }
  ];

  const mockTestScores = [
    { test: 'Test 1', score: 65, average: 58 },
    { test: 'Test 2', score: 72, average: 62 },
    { test: 'Test 3', score: 78, average: 65 },
    { test: 'Test 4', score: 81, average: 68 },
    { test: 'Test 5', score: 85, average: 70 }
  ];

  const subjectProgress = [
    { subject: 'Physics', completed: 85, total: 100 },
    { subject: 'Chemistry', completed: 72, total: 100 },
    { subject: 'Biology', completed: 90, total: 100 }
  ];

  const performanceData = [
    { name: 'Strong', value: 45, color: '#10B981' },
    { name: 'Average', value: 35, color: '#F59E0B' },
    { name: 'Weak', value: 20, color: '#EF4444' }
  ];

  const monthlyProgress = [
    { month: 'Jan', topics: 15 },
    { month: 'Feb', topics: 28 },
    { month: 'Mar', topics: 42 },
    { month: 'Apr', topics: 58 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Analytics</h1>
            <p className="text-gray-600">Track your progress and identify areas for improvement</p>
          </div>
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">87%</h3>
          <p className="text-gray-600 text-sm">Overall Performance</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+2.5h</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">37.2h</h3>
          <p className="text-gray-600 text-sm">Weekly Study Time</p>
          <p className="text-xs text-gray-500 mt-1">Target: 35h/week</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-red-600 text-sm font-medium">-5 pts</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">85</h3>
          <p className="text-gray-600 text-sm">Latest Mock Score</p>
          <p className="text-xs text-gray-500 mt-1">Target: 90+</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">↑3</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">#{stats.rank}</h3>
          <p className="text-gray-600 text-sm">Current Rank</p>
          <p className="text-xs text-gray-500 mt-1">Among all students</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Study Hours */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Weekly Study Hours</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyStudyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-2">Blue: Actual hours, Gray: Target hours</p>
        </div>

        {/* Mock Test Progress */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Mock Test Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockTestScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="test" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }} />
              <Line type="monotone" dataKey="average" stroke="#6B7280" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-2">Green: Your scores, Gray: Class average</p>
        </div>

        {/* Subject Progress */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Subject-wise Progress</h3>
          <div className="space-y-6">
            {subjectProgress.map((subject) => (
              <div key={subject.subject}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900 font-medium">{subject.subject}</span>
                  <span className="text-gray-600 text-sm">{subject.completed}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" 
                    style={{ width: `${subject.completed}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">82%</p>
              <p className="text-xs text-gray-600">Average Progress</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">Biology</p>
              <p className="text-xs text-gray-600">Strongest Subject</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">Chemistry</p>
              <p className="text-xs text-gray-600">Needs Attention</p>
            </div>
          </div>
        </div>

        {/* Performance Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {performanceData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Topics Progress */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Monthly Topic Completion</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyProgress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="topics" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">📊 AI-Powered Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-20 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Strengths</h3>
            <ul className="space-y-2 text-indigo-100">
              <li>• Consistent daily study pattern</li>
              <li>• Strong performance in Biology</li>
              <li>• Excellent mock test improvement</li>
              <li>• Active participation in study groups</li>
            </ul>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
            <ul className="space-y-2 text-indigo-100">
              <li>• Focus more on Chemistry concepts</li>
              <li>• Increase Physics problem-solving</li>
              <li>• Take more mock tests weekly</li>
              <li>• Review weak areas from analytics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Goal Progress */}
      <div className="bg-white rounded-xl p-8 shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Goal Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="40" cy="40" r="36" 
                  stroke="#3b82f6" strokeWidth="8" fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.77)}`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600">77%</span>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Days Progress</h4>
            <p className="text-sm text-gray-600">77 of 100 days completed</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="40" cy="40" r="36" 
                  stroke="#10b981" strokeWidth="8" fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.85)}`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-green-600">85%</span>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Target Score</h4>
            <p className="text-sm text-gray-600">On track for 650+ marks</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="40" cy="40" r="36" 
                  stroke="#f59e0b" strokeWidth="8" fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.92)}`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-yellow-600">92%</span>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Consistency</h4>
            <p className="text-sm text-gray-600">Daily study streak maintained</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;