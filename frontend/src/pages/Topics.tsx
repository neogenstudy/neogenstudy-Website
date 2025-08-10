import React, { useState } from 'react';
import { BookOpen, PlayCircle, FileText, ExternalLink, Search, Filter, CheckCircle2, Circle } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Topics: React.FC = () => {
  const { currentExam, stats, updateStats } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set(['physics-1', 'chemistry-2']));
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set(['Physics']));

  const subjects = {
    NEET: [
      {
        id: 'physics',
        name: 'Physics',
        topics: [
          {
            id: 'physics-1',
            title: 'Mechanics',
            description: 'Motion, forces, energy, and momentum',
            difficulty: 'Medium',
            resources: [
              { type: 'video', title: 'Mechanics Fundamentals', url: '#', duration: '45 min' },
              { type: 'pdf', title: 'Mechanics Notes', url: '#', pages: 24 },
              { type: 'practice', title: 'Practice Problems', url: '#', questions: 50 }
            ]
          },
          {
            id: 'physics-2',
            title: 'Thermodynamics',
            description: 'Heat, temperature, and energy transfer',
            difficulty: 'Hard',
            resources: [
              { type: 'video', title: 'Thermodynamics Concepts', url: '#', duration: '60 min' },
              { type: 'pdf', title: 'Thermal Physics Notes', url: '#', pages: 32 },
              { type: 'practice', title: 'Numerical Problems', url: '#', questions: 40 }
            ]
          },
          {
            id: 'physics-3',
            title: 'Waves and Optics',
            description: 'Wave motion, sound, and light phenomena',
            difficulty: 'Medium',
            resources: [
              { type: 'video', title: 'Wave Properties', url: '#', duration: '50 min' },
              { type: 'pdf', title: 'Optics Summary', url: '#', pages: 28 },
              { type: 'link', title: 'Interactive Simulations', url: '#', description: 'PhET Lab' }
            ]
          }
        ]
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        topics: [
          {
            id: 'chemistry-1',
            title: 'Organic Chemistry',
            description: 'Carbon compounds and reactions',
            difficulty: 'Hard',
            resources: [
              { type: 'video', title: 'Organic Reactions', url: '#', duration: '75 min' },
              { type: 'pdf', title: 'Reaction Mechanisms', url: '#', pages: 45 },
              { type: 'practice', title: 'Structure Problems', url: '#', questions: 60 }
            ]
          },
          {
            id: 'chemistry-2',
            title: 'Inorganic Chemistry',
            description: 'Metals, non-metals, and coordination',
            difficulty: 'Medium',
            resources: [
              { type: 'video', title: 'Periodic Properties', url: '#', duration: '40 min' },
              { type: 'pdf', title: 'Inorganic Notes', url: '#', pages: 38 },
              { type: 'practice', title: 'Qualitative Analysis', url: '#', questions: 35 }
            ]
          }
        ]
      },
      {
        id: 'biology',
        name: 'Biology',
        topics: [
          {
            id: 'biology-1',
            title: 'Cell Biology',
            description: 'Cell structure and function',
            difficulty: 'Easy',
            resources: [
              { type: 'video', title: 'Cell Structure', url: '#', duration: '35 min' },
              { type: 'pdf', title: 'Cell Biology Notes', url: '#', pages: 22 },
              { type: 'practice', title: 'Diagram Questions', url: '#', questions: 25 }
            ]
          },
          {
            id: 'biology-2',
            title: 'Genetics',
            description: 'Heredity and genetic variations',
            difficulty: 'Hard',
            resources: [
              { type: 'video', title: 'Mendelian Genetics', url: '#', duration: '55 min' },
              { type: 'pdf', title: 'Genetics Problems', url: '#', pages: 30 },
              { type: 'practice', title: 'Pedigree Analysis', url: '#', questions: 20 }
            ]
          }
        ]
      }
    ]
  };

  const currentSubjects = subjects[currentExam as keyof typeof subjects] || [];

  const toggleSubjectExpansion = (subjectId: string) => {
    const newExpanded = new Set(expandedSubjects);
    if (newExpanded.has(subjectId)) {
      newExpanded.delete(subjectId);
    } else {
      newExpanded.add(subjectId);
    }
    setExpandedSubjects(newExpanded);
  };

  const toggleTopicCompletion = (topicId: string) => {
    const newCompleted = new Set(completedTopics);
    if (newCompleted.has(topicId)) {
      newCompleted.delete(topicId);
    } else {
      newCompleted.add(topicId);
      updateStats({ 
        points: stats.points + 15,
        topicsCompleted: stats.topicsCompleted + 1
      });
    }
    setCompletedTopics(newCompleted);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-4 h-4 text-red-500" />;
      case 'pdf': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'practice': return <BookOpen className="w-4 h-4 text-green-500" />;
      default: return <ExternalLink className="w-4 h-4 text-purple-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredSubjects = currentSubjects.map(subject => ({
    ...subject,
    topics: subject.topics.filter(topic => {
      const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           topic.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === 'All' || subject.name === selectedSubject;
      return matchesSearch && matchesSubject;
    })
  })).filter(subject => subject.topics.length > 0);

  const allSubjects = ['All', ...currentSubjects.map(s => s.name)];
  const completedCount = completedTopics.size;
  const totalTopics = currentSubjects.reduce((acc, subject) => acc + subject.topics.length, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Topics & Resources</h1>
            <p className="text-gray-600">Comprehensive study materials for {currentExam}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-green-700 font-medium">Progress</span>
                <span className="text-green-800 font-bold">{completedCount}/{totalTopics}</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(completedCount / totalTopics) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {allSubjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-6">
        {filteredSubjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 cursor-pointer"
              onClick={() => toggleSubjectExpansion(subject.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{subject.name}</h2>
                  <p className="text-blue-100">
                    {subject.topics.filter(t => completedTopics.has(t.id)).length} of {subject.topics.length} topics completed
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl mb-2">
                    {subject.id === 'physics' ? '⚡' : subject.id === 'chemistry' ? '🧪' : '🔬'}
                  </div>
                  <button className="text-blue-100 hover:text-white">
                    {expandedSubjects.has(subject.id) ? 'Collapse' : 'Expand'}
                  </button>
                </div>
              </div>
            </div>

            {expandedSubjects.has(subject.id) && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {subject.topics.map((topic) => (
                    <div 
                      key={topic.id} 
                      className={`border-2 rounded-xl p-6 transition-all duration-200 ${
                        completedTopics.has(topic.id) 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-white hover:border-blue-200 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <button
                              onClick={() => toggleTopicCompletion(topic.id)}
                              className="flex-shrink-0"
                            >
                              {completedTopics.has(topic.id) ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                              ) : (
                                <Circle className="w-6 h-6 text-gray-400 hover:text-blue-500" />
                              )}
                            </button>
                            <h3 className={`text-xl font-semibold ${
                              completedTopics.has(topic.id) ? 'text-green-700' : 'text-gray-900'
                            }`}>
                              {topic.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 mb-3">{topic.description}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(topic.difficulty)}`}>
                            {topic.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Resources</h4>
                        {topic.resources.map((resource, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center space-x-3">
                              {getResourceIcon(resource.type)}
                              <div>
                                <p className="font-medium text-gray-900">{resource.title}</p>
                                <p className="text-sm text-gray-600">
                                  {resource.duration && `${resource.duration} • `}
                                  {resource.pages && `${resource.pages} pages • `}
                                  {resource.questions && `${resource.questions} questions • `}
                                  {resource.description}
                                </p>
                              </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700">
                              <ExternalLink className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Motivation Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">🎯 Keep Going!</h2>
        <p className="text-purple-100 mb-4">
          You've completed {Math.round((completedCount / totalTopics) * 100)}% of the {currentExam} syllabus. 
          Every topic you master brings you closer to your goal!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-2xl font-bold">{completedCount}</p>
            <p className="text-sm text-purple-100">Topics Mastered</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-2xl font-bold">{totalTopics - completedCount}</p>
            <p className="text-sm text-purple-100">Topics Remaining</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-2xl font-bold">{Math.round((completedCount / totalTopics) * 100)}%</p>
            <p className="text-sm text-purple-100">Completion Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topics;