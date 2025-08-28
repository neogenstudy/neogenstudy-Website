import React from 'react';
import { Shield, Lock, Eye, UserCheck, Bell, Server, Cookie, Baby, RefreshCw } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Shield,
      title: '1. Information We Collect',
      content: `a. Personal Information:
• Full name
• Email address
• Phone number
• Location (for personalized suggestions)
• Class, Exam Preference (e.g. JEE, NEET, CUET)
• Account credentials (when you sign up via email or Gmail)

b. Usage Data:
• Time spent on platform
• Pages visited
• IP address & browser details
• Device type

c. Optional Data:
• Doubts/questions you ask via AI
• Feedback or form responses
• Referral or invite codes`
    },
    {
      icon: Eye,
      title: '2. How We Use Your Data',
      content: `We use your data to:
• Provide personalized study plans and content
• Enable AI-based doubt solving
• Offer targeted resources & notifications
• Improve platform performance
• Send updates, offers, and newsletters
• Monitor and detect abuse or fraud`
    },
    {
      icon: Server,
      title: '3. Third-Party Services',
      content: `We may use trusted third-party tools to enhance your experience, such as:
• Google Sign-In (authentication)
• GPT-based AI (for doubt solving)
• Analytics tools (to understand user behavior)

These third parties have their own privacy policies which we encourage you to review.`
    },
    {
      icon: Lock,
      title: '4. Data Security',
      content: `We use strict security measures to protect your data including:
• End-to-end encryption for sensitive info
• Secure server hosting
• Role-based access for internal team
• Regular audits & backups`
    },
    {
      icon: UserCheck,
      title: '5. Your Rights',
      content: `You can:
• Request access to your data
• Ask us to update or delete your data
• Opt-out of newsletters and marketing
• Deactivate your account at any time

To do so, contact us at: neogenstudy@gmail.com`
    },
    {
      icon: Cookie,
      title: '6. Cookies',
      content: `We use cookies to:
• Keep you logged in
• Personalize content
• Analyze user traffic

You can control cookies in your browser settings.`
    },
    {
      icon: Baby,
      title: '7. Children\'s Privacy',
      content: `NeoGenStudy is intended for students aged 13 and above. If you're under 13, please use the platform under parental supervision.`
    },
    {
      icon: RefreshCw,
      title: '8. Policy Updates',
      content: `We may update this Privacy Policy from time to time. Changes will be posted on this page, and significant updates will be notified via email or app.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Privacy Policy – NeoGenStudy
        </h1>
        <p className="text-lg text-gray-600">
          At NeoGenStudy, your privacy is extremely important to us. This Privacy Policy explains how we collect,
          use, and protect your personal information when you use our website, services, or mobile applications.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Effective Date: August 5, 2025
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <section.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
            </div>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                {section.content}
              </p>
            </div>
          </div>
        ))}

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="mb-6">
            If you have any questions regarding this Privacy Policy, you can reach us at:
          </p>
          <div className="space-y-2">
            <p>Email: neogenstudy@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
