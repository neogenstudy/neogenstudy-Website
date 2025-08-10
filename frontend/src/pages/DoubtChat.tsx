import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageCircle, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useUser } from '../context/UserContext';

const DoubtChat: React.FC = () => {
  const { currentExam } = useUser();
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'bot',
      content: `Hi! I'm your AI doubt solver for ${currentExam}. Ask me any question about physics, chemistry, mathematics, or biology. I'm here to help! 🤖`,
      timestamp: new Date(Date.now() - 5000)
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const subjects = {
    NEET: ['All', 'Physics', 'Chemistry', 'Biology'],
    'JEE Main': ['All', 'Physics', 'Chemistry', 'Mathematics'],
    'JEE Advanced': ['All', 'Physics', 'Chemistry', 'Mathematics'],
  };

  const currentSubjects = subjects[currentExam as keyof typeof subjects] || ['All'];

  const quickQuestions = [
    "Explain Newton's laws of motion",
    "What is the difference between ionic and covalent bonds?",
    "How does photosynthesis work?",
    "Solve: Find the derivative of x³ + 2x² - 5",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateAIResponse = (question: string) => {
    const responses = [
      {
        content: `Great question! Let me break this down for you:

**Key Concepts:**
- This relates to fundamental principles in ${currentExam}
- The main idea involves understanding the relationship between variables

**Step-by-step explanation:**
1. First, identify what we're looking for
2. Apply the relevant formula or principle
3. Solve systematically

**Example:**
Let me show you a similar problem and how to approach it...

Would you like me to provide more practice problems on this topic? 📚`,
        subject: 'Physics'
      },
      {
        content: `Excellent question! This is a common area where students need clarification.

**The Answer:**
This concept is based on fundamental principles that govern molecular behavior and energy interactions.

**Why this matters:**
- It's frequently tested in ${currentExam}
- Understanding this helps with related topics
- Forms the foundation for advanced concepts

**Quick tip:** Try to visualize this concept by drawing diagrams or using analogies from everyday life.

Need more help with similar problems? 🧠`,
        subject: 'Chemistry'
      }
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot' as const,
        content: aiResponse.content,
        timestamp: new Date(),
        subject: aiResponse.subject
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Doubt Solver</h1>
            <p className="text-gray-600">Get instant answers to your {currentExam} questions</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {currentSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Questions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <p className="text-sm text-blue-800">{question}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">AI Assistant</h2>
              <p className="text-blue-100 text-sm">Online • Ready to help</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`rounded-2xl p-4 ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className={`text-xs ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      {formatTimestamp(message.timestamp)}
                    </div>
                    {message.type === 'bot' && (
                      <div className="flex items-center space-x-2">
                        <button className="text-green-600 hover:text-green-700">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-gray-100 rounded-2xl p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask your question here..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={isTyping || !inputMessage.trim()}
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Pro tip: Be specific with your questions for better answers. Include relevant context or formulas.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">127</h3>
          <p className="text-gray-600">Questions Solved</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">&lt;2 min</h3>
          <p className="text-gray-600">Avg Response Time</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ThumbsUp className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">98%</h3>
          <p className="text-gray-600">Satisfaction Rate</p>
        </div>
      </div>
    </div>
  );
};

export default DoubtChat;