import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'verification'>('email');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      // Simulate sending verification email
      setTimeout(() => {
        setStep('verification');
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleVerificationComplete = async () => {
    setLoading(true);
    try {
      await login(email);
      navigate('/app/dashboard');
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                <img src="/images/logo.png" alt="NeoGenStudy Logo" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-2xl font-bold text-gray-900">NeoGenStudy</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Get started today</h2>
            <p className="text-gray-600 mt-2">Create your account and start your success journey</p>
          </div>

          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="text-xs text-gray-500">
                By creating an account, you agree to our{' '}
                <Link to="#" className="text-blue-600 hover:text-blue-700">Terms of Service</Link>{' '}
                and{' '}
                <Link to="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Verify your email</h3>
                <p className="text-gray-600 mb-4">
                  We've sent a verification link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Click the link in your email to verify your account and get started. For demo purposes, click continue below.
                </p>
              </div>
              <button
                onClick={handleVerificationComplete}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Continue (Demo)</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <button
                onClick={() => setStep('email')}
                className="w-full text-gray-600 hover:text-gray-800 text-sm"
              >
                Use a different email
              </button>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;