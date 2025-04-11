import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import axios from 'axios';
import { Calendar, Bell, Settings, Users, BarChart2, Layout } from 'lucide-react';
import EventOverview from './Dashboard/EventOverview';
import UpcomingEvents from './Dashboard/UpcomingEvents';
import ActivityFeed from './Dashboard/ActivityFeed';

const OrganizersHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalEvents: 0,
    upcomingEvents: [],
    recentActivities: [],
    totalAttendees: 0,
    totalSpeakers: 0,
    totalSessions: 0
  });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // In a production app, you would fetch real data from your API
        // This is a mock response for demonstration
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockData = {
          totalEvents: 5,
          upcomingEvents: [
            { 
              id: '1', 
              title: 'Tech Conference 2025', 
              startDate: '2025-06-15T09:00:00', 
              endDate: '2025-06-17T18:00:00',
              location: 'San Francisco Convention Center',
              registeredAttendees: 247,
              totalCapacity: 500,
              status: 'upcoming' 
            },
            { 
              id: '2', 
              title: 'Digital Marketing Summit', 
              startDate: '2025-05-10T10:00:00', 
              endDate: '2025-05-12T17:00:00',
              location: 'Chicago Marriott Downtown',
              registeredAttendees: 189,
              totalCapacity: 350,
              status: 'upcoming' 
            },
            { 
              id: '3', 
              title: 'AI & Machine Learning Expo', 
              startDate: '2025-07-22T08:30:00', 
              endDate: '2025-07-24T16:30:00',
              location: 'Seattle Convention Center',
              registeredAttendees: 112,
              totalCapacity: 400,
              status: 'upcoming' 
            }
          ],
          recentActivities: [
            { 
              id: '1', 
              type: 'registration', 
              description: 'New attendee registration for Tech Conference 2025', 
              timestamp: '2025-04-10T14:32:00' 
            },
            { 
              id: '2', 
              type: 'speaker', 
              description: 'Sarah Johnson confirmed as keynote speaker', 
              timestamp: '2025-04-10T13:15:00' 
            },
            { 
              id: '3', 
              type: 'session', 
              description: 'New session added: "The Future of Web Development"', 
              timestamp: '2025-04-10T11:47:00' 
            },
            { 
              id: '4', 
              type: 'notification', 
              description: 'Reminder sent to all registered attendees', 
              timestamp: '2025-04-09T16:30:00' 
            },
            { 
              id: '5', 
              type: 'payment', 
              description: 'Payment received from Enterprise Solutions Inc.', 
              timestamp: '2025-04-09T10:22:00' 
            }
          ],
          totalAttendees: 548,
          totalSpeakers: 32,
          totalSessions: 45
        };
        
        setDashboardData(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Organizer Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <Bell size={20} />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 text-sm focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                    {user?.fullName?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden md:block text-gray-700">{user?.fullName || 'Organizer'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {/* Event Overview Stats */}
            <EventOverview 
              totalEvents={dashboardData.totalEvents}
              totalAttendees={dashboardData.totalAttendees}
              totalSpeakers={dashboardData.totalSpeakers}
              totalSessions={dashboardData.totalSessions}
            />
            
            {/* Dashboard Main Content - Split into two columns on larger screens */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Upcoming Events - Takes up 2/3 of the space on larger screens */}
              <div className="lg:col-span-2">
                <UpcomingEvents events={dashboardData.upcomingEvents} />
              </div>
              
              {/* Activity Feed - Takes up 1/3 of the space on larger screens */}
              <div className="lg:col-span-1">
                <ActivityFeed activities={dashboardData.recentActivities} />
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button 
                    onClick={() => navigate('/organizer/events-management')}
                    className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <Calendar className="h-6 w-6 text-indigo-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Create Event</span>
                  </button>
                  
                  <button 
                    onClick={() => navigate('/organizer/speakers-management')}
                    className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <Users className="h-6 w-6 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Manage Speakers</span>
                  </button>
                  
                  <button 
                    onClick={() => navigate('/organizer/notifications')}
                    className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Bell className="h-6 w-6 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Send Notifications</span>
                  </button>
                  
                  <button 
                    className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <BarChart2 className="h-6 w-6 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">View Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrganizersHome;