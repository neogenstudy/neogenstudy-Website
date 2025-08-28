import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import StudyPlan from './pages/StudyPlan';
import Topics from './pages/Topics';
import DoubtChat from './pages/DoubtChat';
import StudyGroups from './pages/StudyGroups';
import Analytics from './pages/Analytics';
import MockTest from './pages/MockTest';
import Referral from './pages/Referral';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route path="/app" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="study-plan" element={<StudyPlan />} />
                <Route path="topics" element={<Topics />} />
                <Route path="doubts" element={<DoubtChat />} />
                <Route path="groups" element={<StudyGroups />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="mock-test" element={<MockTest />} />
                <Route path="referral" element={<Referral />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;