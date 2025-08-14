import React from 'react';
import { Mail, Instagram, Linkedin } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About NeoGenStudy
        </h1>
        <p className="text-xl text-purple-600 font-semibold">A New Era of Gen Z Study</p>
        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          At NeoGenStudy, we're redefining how students prepare for exams in the 21st century.
          With AI-powered tools, curated resources, and a focus on smart, stress-free learning,
          we make studying simpler, faster, and more effective — so students can focus on what
          truly matters: achieving their goals.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          To empower every student with the right plan, right resources, and the right guidance
          — all in one place — making high-quality exam preparation accessible to everyone, anywhere.
        </p>
      </div>

      {/* What We Offer Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600">•</span>
            </div>
            <p className="ml-3 text-gray-600">
              <span className="font-semibold">Smart AI Study Plans</span> – Personalized timetables
              for JEE, NEET, CUET, CLAT, CA, NDA, IPMAT, and more.
            </p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600">•</span>
            </div>
            <p className="ml-3 text-gray-600">
              <span className="font-semibold">Curated Resources</span> – Notes, PYQs, mind maps,
              and topic-wise breakdowns, handpicked for clarity.
            </p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600">•</span>
            </div>
            <p className="ml-3 text-gray-600">
              <span className="font-semibold">Performance Tracking</span> – Checklists, streaks,
              and analytics to keep you on track.
            </p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600">•</span>
            </div>
            <p className="ml-3 text-gray-600">
              <span className="font-semibold">Instant Doubt Solving</span> – 24/7 text-based
              AI answers in seconds.
            </p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600">•</span>
            </div>
            <p className="ml-3 text-gray-600">
              <span className="font-semibold">Study Groups</span> – Learn, share, and grow with
              peers preparing for the same exam.
            </p>
          </div>
        </div>
      </div>

      {/* Why We're Different Section */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-8 mb-12 text-white">
        <h2 className="text-2xl font-bold mb-4">Why We're Different</h2>
        <p className="mb-4">Most platforms give you endless content and leave you lost.</p>
        <p className="text-lg font-semibold">
          We give you only what you need, when you need it — saving time and keeping your
          preparation laser-focused.
        </p>
      </div>

      {/* Vision Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
        <p className="text-gray-600 leading-relaxed">
          By 2030, NeoGenStudy will help 10 million+ students reach their dream colleges
          and careers — no matter where they come from.
        </p>
      </div>

      {/* Connect Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h2>
        <div className="space-y-4">
          <a
            href="mailto:neogenstudy@gmail.com"
            className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Mail className="h-5 w-5 mr-2" />
            neogenstudy@gmail.com
          </a>
          <a
            href="https://www.instagram.com/neogenstudy/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Instagram className="h-5 w-5 mr-2" />
            @neogenstudy
          </a>
          <a
            href="https://www.linkedin.com/company/neogenstudy/about/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Linkedin className="h-5 w-5 mr-2" />
            NeoGenStudy
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
