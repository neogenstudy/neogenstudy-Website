import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, BarChart3, Award, CheckCircle, Star } from 'lucide-react';

const Homepage: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'AI-Driven Study Plans',
      description: 'Personalized study roadmaps powered by AI for JEE & NEET'
    },
    {
      icon: Users,
      title: 'Smart Study Groups',
      description: 'Connect with peers and get AI-assisted group learning'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track your progress with AI-powered performance insights'
    },
    {
      icon: Award,
      title: 'Personalized Learning',
      description: 'Get customized learning paths adapted to your needs'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      exam: 'NEET 2025',
      score: '680/720',
      text: 'The AI-powered study plan helped me improve my score dramatically!'
    },
    {
      name: 'Arjun Patel',
      exam: 'JEE Main 2025',
      score: '99.2 percentile',
      text: 'The personalized learning paths and analytics transformed my preparation.'
    },
    {
      name: 'Kavya Reddy',
      exam: 'JEE Advanced 2025',
      score: '98.6 percentile',
      text: 'Smart study groups and AI assistance made complex topics easy to grasp.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Students Enrolled' },
    { value: '95%', label: 'Success Rate' },
    { value: '1M+', label: 'Doubts Solved' },
    { value: '4.8★', label: 'Student Rating' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <img src="/images/logo.png" alt="NeoGenStudy Logo" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-xl font-bold text-gray-900">NeoGenStudy</span>
            </div>
            <div className="flex items-center space-x-4">
              {/* <Link
                to="/resources"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Resources
              </Link> */}
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your AI Study <span className="text-blue-600">Companion</span>
              <br />
              for JEE ,NEET..etc
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Master competitive exams with personalized AI-driven study plans, 
              curated resources, and smart analytics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/resources"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 shadow-lg border-2 border-blue-600"
              >
                <span>View Resources</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need to succeed in competitive exams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how students transformed their exam preparation with NeoGenStudy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.exam}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{testimonial.score}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Exam Preparation?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students and start your journey towards cracking competitive exams today.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 inline-flex items-center space-x-2 shadow-lg"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <img src="/images/logo.png" alt="NeoGenStudy Logo" className="w-8 h-8 object-contain" />
                </div>
                <span className="text-xl font-bold text-white">NeoGenStudy</span>
              </div>
              <p className="text-gray-400">
                Empowering students to excel in competitive exams with smart, personalized learning solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Study Plans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Doubt Solver</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mock Tests</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Exams</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">NEET</a></li>
                <li><a href="#" className="hover:text-white transition-colors">JEE Main</a></li>
                <li><a href="#" className="hover:text-white transition-colors">JEE Advanced</a></li>
                <li><a href="#" className="hover:text-white transition-colors">KVPY</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                {/* <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li> */}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 NeoGenStudy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;