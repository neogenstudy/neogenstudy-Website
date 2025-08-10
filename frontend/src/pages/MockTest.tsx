import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, RotateCcw, Target, BookOpen, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  explanation: string;
}

interface TestResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  correctAnswers: number;
  subjectWise: { [key: string]: { correct: number; total: number } };
}

const MockTest: React.FC = () => {
  const { currentExam, stats, updateStats } = useUser();
  const [testState, setTestState] = useState<'selection' | 'active' | 'completed'>('selection');
  const [selectedTest, setSelectedTest] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const mockTests = {
    NEET: [
      { id: 'neet-physics-1', name: 'Physics - Mechanics & Thermodynamics', duration: 60, questions: 45 },
      { id: 'neet-chemistry-1', name: 'Chemistry - Organic Reactions', duration: 60, questions: 45 },
      { id: 'neet-biology-1', name: 'Biology - Cell Biology & Genetics', duration: 60, questions: 45 },
      { id: 'neet-full-1', name: 'NEET Full Mock Test 1', duration: 180, questions: 180 }
    ],
    'JEE Main': [
      { id: 'jee-physics-1', name: 'Physics - Mechanics', duration: 60, questions: 30 },
      { id: 'jee-chemistry-1', name: 'Chemistry - Physical Chemistry', duration: 60, questions: 30 },
      { id: 'jee-math-1', name: 'Mathematics - Calculus', duration: 60, questions: 30 },
      { id: 'jee-full-1', name: 'JEE Main Full Mock Test', duration: 180, questions: 90 }
    ]
  };

  const currentTests = mockTests[currentExam as keyof typeof mockTests] || mockTests.NEET;

  // Generate mock questions
  const generateQuestions = (testId: string, count: number) => {
    const subjects = testId.includes('physics') ? ['Physics'] : 
                    testId.includes('chemistry') ? ['Chemistry'] :
                    testId.includes('biology') ? ['Biology'] :
                    testId.includes('math') ? ['Mathematics'] :
                    ['Physics', 'Chemistry', 'Biology'];

    const sampleQuestions: Omit<Question, 'id'>[] = [
      {
        question: "What is the SI unit of electric current?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        correctAnswer: 1,
        subject: "Physics",
        difficulty: "Easy",
        explanation: "The SI unit of electric current is Ampere (A), named after André-Marie Ampère."
      },
      {
        question: "Which of the following is a noble gas?",
        options: ["Oxygen", "Nitrogen", "Helium", "Hydrogen"],
        correctAnswer: 2,
        subject: "Chemistry",
        difficulty: "Easy",
        explanation: "Helium is a noble gas with a complete outer electron shell, making it chemically inert."
      },
      {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
        correctAnswer: 1,
        subject: "Biology",
        difficulty: "Easy",
        explanation: "Mitochondria are called the powerhouse of the cell because they produce ATP through cellular respiration."
      },
      {
        question: "What is the derivative of x²?",
        options: ["x", "2x", "x²", "2"],
        correctAnswer: 1,
        subject: "Mathematics",
        difficulty: "Easy",
        explanation: "Using the power rule, d/dx(x²) = 2x¹ = 2x."
      },
      {
        question: "A ball is thrown vertically upward with initial velocity 20 m/s. What is its maximum height? (g = 10 m/s²)",
        options: ["10 m", "20 m", "30 m", "40 m"],
        correctAnswer: 1,
        subject: "Physics",
        difficulty: "Medium",
        explanation: "Using v² = u² - 2gh, at maximum height v = 0, so h = u²/2g = 400/20 = 20 m."
      }
    ];

    const questions: Question[] = [];
    for (let i = 0; i < count; i++) {
      const baseQuestion = sampleQuestions[i % sampleQuestions.length];
      const subject = subjects[Math.floor(i / (count / subjects.length))] || subjects[0];
      questions.push({
        ...baseQuestion,
        id: `q-${i + 1}`,
        subject,
        question: `${i + 1}. ${baseQuestion.question}`,
      });
    }
    return questions;
  };

  // Timer effect
  useEffect(() => {
    if (testState === 'active' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (testState === 'active' && timeLeft === 0) {
      handleSubmitTest();
    }
  }, [testState, timeLeft]);

  const startTest = (testId: string) => {
    const test = currentTests.find(t => t.id === testId);
    if (!test) return;

    const generatedQuestions = generateQuestions(testId, test.questions);
    setQuestions(generatedQuestions);
    setSelectedTest(testId);
    setTimeLeft(test.duration * 60);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTestState('active');
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmitTest = () => {
    const correctAnswers = questions.filter(q => answers[q.id] === q.correctAnswer).length;
    const totalQuestions = questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Calculate subject-wise performance
    const subjectWise: { [key: string]: { correct: number; total: number } } = {};
    questions.forEach(q => {
      if (!subjectWise[q.subject]) {
        subjectWise[q.subject] = { correct: 0, total: 0 };
      }
      subjectWise[q.subject].total++;
      if (answers[q.id] === q.correctAnswer) {
        subjectWise[q.subject].correct++;
      }
    });

    const test = currentTests.find(t => t.id === selectedTest);
    const timeSpent = test ? (test.duration * 60) - timeLeft : 0;

    const result: TestResult = {
      score,
      totalQuestions,
      timeSpent,
      correctAnswers,
      subjectWise
    };

    setTestResult(result);
    setTestState('completed');

    // Update user stats
    updateStats({
      points: stats.points + Math.max(score - 50, 0), // Bonus points for good performance
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const resetTest = () => {
    setTestState('selection');
    setSelectedTest('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft(0);
    setTestResult(null);
    setShowExplanation(false);
  };

  if (testState === 'selection') {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mock Tests</h1>
            <p className="text-gray-600">Practice with exam-like conditions and get instant feedback</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-gray-600">Tests Taken</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">78%</p>
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">85%</p>
              <p className="text-sm text-gray-600">Best Score</p>
            </div>
          </div>
        </div>

        {/* Available Tests */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Tests for {currentExam}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentTests.map((test) => (
              <div key={test.id} className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:border-blue-200 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{test.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{test.duration} min</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{test.questions} questions</span>
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => startTest(test.id)}
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">📋 Test Instructions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Before You Start</h3>
              <ul className="space-y-1 text-indigo-100 text-sm">
                <li>• Ensure stable internet connection</li>
                <li>• Find a quiet environment</li>
                <li>• Keep necessary materials ready</li>
                <li>• Close unnecessary browser tabs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">During the Test</h3>
              <ul className="space-y-1 text-indigo-100 text-sm">
                <li>• Answer all questions within time limit</li>
                <li>• Use navigation panel to jump between questions</li>
                <li>• Review your answers before submitting</li>
                <li>• No negative marking in practice tests</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (testState === 'active') {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-md p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {currentTests.find(t => t.id === selectedTest)?.name}
              </h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={handleSubmitTest}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Submit Test
              </button>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex">
          {/* Question Navigation Sidebar */}
          <div className="w-64 bg-white shadow-md p-4 min-h-screen">
            <h3 className="font-semibold text-gray-900 mb-4">Questions</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-blue-500 text-white'
                      : answers[questions[index].id] !== undefined
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Current</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                <span>Not Answered</span>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1 p-8">
            <div className="bg-white rounded-xl p-8 shadow-md max-w-4xl mx-auto">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                    {currentQuestion.subject}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    currentQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      answers[currentQuestion.id] === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={index}
                      checked={answers[currentQuestion.id] === index}
                      onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      answers[currentQuestion.id] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQuestion.id] === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (testState === 'completed' && testResult) {
    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="bg-white rounded-2xl p-8 shadow-md text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <Award className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Completed!</h1>
          <p className="text-gray-600 mb-6">Here's how you performed</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className={`text-4xl font-bold mb-2 ${getScoreColor(testResult.score)}`}>
                {testResult.score}%
              </p>
              <p className="text-gray-600">Overall Score</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600 mb-2">{testResult.correctAnswers}</p>
              <p className="text-gray-600">Correct Answers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-red-600 mb-2">
                {testResult.totalQuestions - testResult.correctAnswers}
              </p>
              <p className="text-gray-600">Incorrect</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">{formatTime(testResult.timeSpent)}</p>
              <p className="text-gray-600">Time Spent</p>
            </div>
          </div>
        </div>

        {/* Subject-wise Performance */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Subject-wise Performance</h2>
          <div className="space-y-4">
            {Object.entries(testResult.subjectWise).map(([subject, performance]) => {
              const percentage = Math.round((performance.correct / performance.total) * 100);
              return (
                <div key={subject} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-900">{subject}</span>
                    <span className="text-sm text-gray-600">
                      {performance.correct}/{performance.total} correct
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          percentage >= 80 ? 'bg-green-500' :
                          percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className={`font-semibold ${getScoreColor(percentage)}`}>
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Review */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Detailed Review</h2>
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {showExplanation ? 'Hide' : 'Show'} Explanations
            </button>
          </div>
          
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <p>
                          <span className="text-gray-600">Your answer: </span>
                          <span className={userAnswer !== undefined ? (isCorrect ? 'text-green-600' : 'text-red-600') : 'text-gray-500'}>
                            {userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'}
                          </span>
                        </p>
                        <p>
                          <span className="text-gray-600">Correct answer: </span>
                          <span className="text-green-600">{question.options[question.correctAnswer]}</span>
                        </p>
                      </div>
                      {showExplanation && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={resetTest}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Take Another Test</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default MockTest;