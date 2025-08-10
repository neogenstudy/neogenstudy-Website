import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Circle, Filter, Target } from 'lucide-react';
import { useUser } from '../context/UserContext';

const StudyPlan: React.FC = () => {
  const { currentExam, setCurrentExam, stats, updateStats } = useUser();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const exams = ['NEET', 'JEE Main', 'JEE Advanced', 'CUET', 'GATE'];
  
  const subjects = {
    NEET: ['Physics', 'Chemistry', 'Biology'],
    'JEE Main': ['Physics', 'Chemistry', 'Mathematics'],
    'JEE Advanced': ['Physics', 'Chemistry', 'Mathematics'],
    CUET: ['English', 'General Test', 'Domain Subject'],
    GATE: ['Engineering Mathematics', 'Core Subject', 'General Aptitude']
  };

  // Generate 100-day plan
  const generateStudyPlan = () => {
    const plan = [];
    const subjectList = subjects[currentExam as keyof typeof subjects];
    
    for (let day = 1; day <= 100; day++) {
      const dayTasks = [];
      const subjectsForDay = Math.min(2 + Math.floor(day / 25), subjectList.length);
      
      for (let i = 0; i < subjectsForDay; i++) {
        const subject = subjectList[i % subjectList.length];
        const chapter = Math.floor((day - 1) / 5) + 1;
        dayTasks.push({
          id: `${day}-${subject}-${chapter}`,
          subject,
          topic: `Chapter ${chapter} - Part ${((day - 1) % 5) + 1}`,
          type: ['Theory', 'Practice', 'Revision'][i % 3],
          duration: 2 + (i * 0.5),
          difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(day / 34)]
        });
      }
      
      plan.push({
        day,
        week: Math.ceil(day / 7),
        tasks: dayTasks,
        completed: completedTasks.has(day.toString())
      });
    }
    return plan;
  };

  const studyPlan = generateStudyPlan();
  const currentWeekDays = studyPlan.filter(day => day.week === selectedWeek);
  const completedDays = studyPlan.filter(day => day.completed).length;
  const progress = Math.round((completedDays / 100) * 100);

  const toggleTaskCompletion = (taskId: string, dayNumber: number) => {
    const newCompletedTasks = new Set(completedTasks);
    if (newCompletedTasks.has(taskId)) {
      newCompletedTasks.delete(taskId);
    } else {
      newCompletedTasks.add(taskId);
      // Award points for completing tasks
      updateStats({ points: stats.points + 10 });
    }
    setCompletedTasks(newCompletedTasks);
  };

  const getDayStatus = (day: any) => {
    const today = 23; // Current day for demo
    if (day.day < today) return 'past';
    if (day.day === today) return 'current';
    return 'future';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Study Plan</h1>
            <p className="text-gray-600">Your personalized 100-day roadmap to success</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              value={currentExam}
              onChange={(e) => setCurrentExam(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {exams.map(exam => (
                <option key={exam} value={exam}>{exam}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 relative">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="40" cy="40" r="36" 
                  stroke="#3b82f6" strokeWidth="8" fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600">{progress}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Overall Progress</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{completedDays}</p>
            <p className="text-sm text-gray-600">Days Completed</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{100 - completedDays}</p>
            <p className="text-sm text-gray-600">Days Remaining</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-purple-100 rounded-full">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">650+</p>
            <p className="text-sm text-gray-600">Target Score</p>
          </div>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Week Navigation</h2>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">Filter by week</span>
          </div>
        </div>
        
        <div className="grid grid-cols-5 md:grid-cols-10 lg:grid-cols-15 gap-2">
          {Array.from({ length: 15 }, (_, i) => i + 1).map(week => {
            const weekDays = studyPlan.filter(day => day.week === week);
            const weekCompleted = weekDays.filter(day => day.completed).length;
            const weekProgress = Math.round((weekCompleted / 7) * 100);
            
            return (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={`p-3 rounded-lg text-center transition-all ${
                  selectedWeek === week 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <p className="text-sm font-medium">Week {week}</p>
                <p className="text-xs opacity-75">{weekProgress}%</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Week {selectedWeek} - Daily Tasks
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {currentWeekDays.map((day) => {
            const status = getDayStatus(day);
            return (
              <div 
                key={day.day}
                className={`border-2 rounded-xl p-4 transition-all ${
                  status === 'current' 
                    ? 'border-blue-500 bg-blue-50' 
                    : status === 'past' 
                    ? day.completed 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-red-300 bg-red-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Day {day.day}</h3>
                  <div className={`w-3 h-3 rounded-full ${
                    status === 'current' 
                      ? 'bg-blue-500' 
                      : day.completed 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                  }`} />
                </div>
                
                <div className="space-y-3">
                  {day.tasks.map((task) => (
                    <div key={task.id} className="text-sm">
                      <div className="flex items-start space-x-2">
                        <button
                          onClick={() => toggleTaskCompletion(task.id, day.day)}
                          className="mt-0.5 flex-shrink-0"
                        >
                          {completedTasks.has(task.id) ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            completedTasks.has(task.id) 
                              ? 'text-green-700 line-through' 
                              : 'text-gray-900'
                          }`}>
                            {task.subject}
                          </p>
                          <p className="text-gray-600">{task.topic}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {task.type}
                            </span>
                            <span className="flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {task.duration}h
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">💡 Today's Study Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Focus Strategy</h3>
            <p className="text-green-100">Break your study sessions into 25-minute focused blocks with 5-minute breaks (Pomodoro Technique).</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Retention Boost</h3>
            <p className="text-green-100">Review previous day's topics for 10 minutes before starting new material to strengthen memory.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;