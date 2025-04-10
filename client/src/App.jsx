import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import OrganizersHome from './pages/Organizers/OrganizersHome';
import AttendeesHome from './pages/Attendees/AttendeesHome';
import PresentersHome from './pages/Presenters/PresentersHome';

import { AuthProvider, useAuth } from "./pages/Contexts/AuthContext"
import NotificationsCenterPage from './pages/Organizers/NotificationsCenterPage';
import EventCreationPage from './pages/Organizers/EventCreationPage';
import SpeakersManagementPage from './pages/Organizers/SpeakersManagementPage';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to the appropriate home page based on role
    if (user.role === 'organizer') {
      return <Navigate to="/organizer/home" replace />;
    } else if (user.role === 'attendee') {
      return <Navigate to="/attendee/home" replace />;
    } else if (user.role === 'presenter') {
      return <Navigate to="/presenter/home" replace />;
    }
  }
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Organizer Routes */}
        <Route 
          path="/organizer/*" 
          element={
            <ProtectedRoute allowedRoles={['organizer']}>
              <Routes>
                <Route path="home" element={<OrganizersHome />} />
                <Route path="notifications" element={<NotificationsCenterPage />} />
                <Route path='events-management' element={<EventCreationPage />} />
                <Route path="speakers-management" element={<SpeakersManagementPage />} />
              </Routes>
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Attendee Routes */}
        <Route 
          path="/attendee/*" 
          element={
            <ProtectedRoute allowedRoles={['attendee']}>
              <Routes>
                <Route path="home" element={<AttendeesHome />} />
                {/* Add more attendee routes here */}
              </Routes>
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Presenter Routes */}
        <Route 
          path="/presenter/*" 
          element={
            <ProtectedRoute allowedRoles={['presenter']}>
              <Routes>
                <Route path="home" element={<PresentersHome />} />
                {/* Add more presenter routes here */}
              </Routes>
            </ProtectedRoute>
          } 
        />
        
        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;