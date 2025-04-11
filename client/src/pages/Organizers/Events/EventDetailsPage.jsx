import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Users, Clock, Edit, ArrowLeft, 
  Info, Trash2, User, Layers, MessageSquare, Link, Share2
} from 'lucide-react';
import axios from 'axios';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        // In production, replace with real API call
        // const response = await axios.get(`/api/events/${eventId}`);
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        
        // Mock event detail data
        const mockEvent = {
          id: eventId,
          title: 'Tech Conference 2025',
          description: 'Annual technology conference featuring the latest in AI, web development, and cloud computing. Join industry leaders and innovators for three days of learning, networking, and inspiration.',
          startDate: '2025-06-15T09:00:00',
          endDate: '2025-06-17T18:00:00',
          location: 'San Francisco Convention Center',
          address: '747 Howard St, San Francisco, CA 94103',
          registeredAttendees: 247,
          totalCapacity: 500,
          status: 'upcoming',
          imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          registrationOpen: true,
          ticketPrice: 299,
          website: 'https://example.com/techconf2025',
          organizer: {
            name: 'TechEvents Inc.',
            email: 'info@techevents.com',
            phone: '+1 (555) 123-4567'
          },
          statistics: {
            totalViews: 1245,
            registrationsLastWeek: 32,
            averageRating: 4.8
          },
          sessions: [
            {
              id: 's1',
              title: 'Opening Keynote: The Future of Tech',
              startTime: '2025-06-15T09:30:00',
              endTime: '2025-06-15T11:00:00',
              location: 'Main Hall',
              speaker: 'Sarah Johnson',
              attendees: 198
            },
            {
              id: 's2',
              title: 'Web Development Trends in 2025',
              startTime: '2025-06-15T13:00:00',
              endTime: '2025-06-15T14:30:00',
              location: 'Room A',
              speaker: 'Michael Chen',
              attendees: 87
            },
            {
              id: 's3',
              title: 'AI Implementation Workshop',
              startTime: '2025-06-16T10:00:00',
              endTime: '2025-06-16T12:00:00',
              location: 'Room B',
              speaker: 'David Rodriguez',
              attendees: 65
            }
          ]
        };
        
        setEvent(mockEvent);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleDeleteEvent = async () => {
    try {
      // In production, replace with real API call
      // await axios.delete(`/api/events/${eventId}`);
      
      // Mock delete
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      setShowDeleteModal(false);
      // Redirect to events list with success message
      navigate('/organizer/events', { 
        state: { message: 'Event successfully deleted', type: 'success' } 
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      // Show error notification
    }
  };

  // Format date range for display
  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    }
    
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`;
    }
    
    return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  };

  // Format time for display
  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Event not found</h3>
          <div className="mt-2">
            <button
              type="button"
              onClick={() => navigate('/organizer/events')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => navigate('/organizer/events')}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
              {event.title}
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
            <button
              type="button"
              onClick={() => navigate(`/organizer/events/${eventId}/edit`)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Edit className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
              Edit Event
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="-ml-1 mr-2 h-5 w-5 text-red-500" />
              Delete
            </button>
          </div>
        </div>

        {/* Event Banner */}
        <div className="bg-white shadow overflow-hidden rounded-lg mb-8">
          <div className="relative h-64 w-full">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 
                event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' : 
                event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">{formatDateRange(event.startDate, event.endDate)}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">{event.registeredAttendees} / {event.totalCapacity} registered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`${
                activeTab === 'sessions'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
              onClick={() => setActiveTab('sessions')}
            >
              Sessions
            </button>
            <button
              className={`${
                activeTab === 'attendees'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
              onClick={() => setActiveTab('attendees')}
            >
              Attendees
            </button>
            <button
              className={`${
                activeTab === 'settings'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    About This Event
                  </h3>
                  <div className="prose max-w-none">
                    <p>{event.description}</p>
                  </div>
                  
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">
                    Event Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 rounded-md bg-indigo-500 p-3">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500">Total Views</p>
                          <p className="text-xl font-semibold text-indigo-700">{event.statistics.totalViews}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 rounded-md bg-green-500 p-3">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500">New Registrations</p>
                          <p className="text-xl font-semibold text-green-700">{event.statistics.registrationsLastWeek}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 rounded-md bg-yellow-500 p-3">
                          <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500">Average Rating</p>
                          <p className="text-xl font-semibold text-yellow-700">{event.statistics.averageRating}/5</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mt-8 mb-4">
                    Registration Progress
                  </h3>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-indigo-600">
                          {Math.round((event.registeredAttendees / event.totalCapacity) * 100)}% Capacity
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-indigo-600">
                          {event.registeredAttendees}/{event.totalCapacity} Attendees
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                      <div 
                        style={{ width: `${(event.registeredAttendees / event.totalCapacity) * 100}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-lg p-5 sticky top-8">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Event Details
                    </h3>
                    <ul className="divide-y divide-gray-200">
                      <li className="py-3 flex items-start">
                        <Calendar className="flex-shrink-0 h-5 w-5 text-gray-400 mt-1" />
                        <div className="ml-3 text-sm">
                          <p className="font-medium text-gray-700">Dates</p>
                          <p className="text-gray-500">{formatDateRange(event.startDate, event.endDate)}</p>
                        </div>
                      </li>
                      
                      <li className="py-3 flex items-start">
                        <Clock className="flex-shrink-0 h-5 w-5 text-gray-400 mt-1" />
                        <div className="ml-3 text-sm">
                          <p className="font-medium text-gray-700">Time</p>
                          <p className="text-gray-500">
                            {formatTime(event.startDate)} - {formatTime(event.endDate)}
                          </p>
                        </div>
                      </li>
                      
                      <li className="py-3 flex items-start">
                        <MapPin className="flex-shrink-0 h-5 w-5 text-gray-400 mt-1" />
                        <div className="ml-3 text-sm">
                          <p className="font-medium text-gray-700">Location</p>
                          <p className="text-gray-500">{event.location}</p>
                          <p className="text-gray-500">{event.address}</p>
                        </div>
                      </li>
                      
                      <li className="py-3 flex items-start">
                        <Users className="flex-shrink-0 h-5 w-5 text-gray-400 mt-1" />
                        <div className="ml-3 text-sm">
                          <p className="font-medium text-gray-700">Organizer</p>
                          <p className="text-gray-500">{event.organizer.name}</p>
                          <p className="text-gray-500">{event.organizer.email}</p>
                          <p className="text-gray-500">{event.organizer.phone}</p>
                        </div>
                      </li>
                      
                      <li className="py-3 flex items-start">
                        <Info className="flex-shrink-0 h-5 w-5 text-gray-400 mt-1" />
                        <div className="ml-3 text-sm">
                          <p className="font-medium text-gray-700">Registration</p>
                          <p className="text-gray-500">
                            {event.registrationOpen ? 'Open' : 'Closed'} | 
                            {event.ticketPrice > 0 ? ` $${event.ticketPrice}` : ' Free'}
                          </p>
                        </div>
                      </li>
                      
                      {event.website && (
                        <li className="py-3 flex items-start">
                          <Link className="flex-shrink-0 h-5 w-5 text-gray-400 mt-1" />
                          <div className="ml-3 text-sm">
                            <p className="font-medium text-gray-700">Website</p>
                            <a 
                              href={event.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800"
                            >
                              {event.website}
                            </a>
                          </div>
                        </li>
                      )}
                    </ul>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Share This Event</h4>
                      <div className="flex space-x-4">
                        <button className="text-gray-400 hover:text-indigo-500">
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-indigo-500">
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-indigo-500">
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21.582 6.186a2.914 2.914 0 00-2.046-2.05c-1.805-.488-9.036-.488-9.036-.488s-7.226 0-9.036.488A2.914 2.914 0 00.423 6.186C0 8.07 0 12 0 12s0 3.93.423 5.814a2.914 2.914 0 002.046 2.05c1.805.488 9.036.488 9.036.488s7.226 0 9.036-.488a2.914 2.914 0 002.046-2.05C24 15.93 24 12 24 12s0-3.93-.423-5.814zM9.455 15.569V8.431L15.966 12l-6.51 3.569z" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-indigo-500">
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.9 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 0z" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-indigo-500">
                          <Share2 className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sessions Tab (Simplified for this example) */}
          {activeTab === 'sessions' && (
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Sessions
                </h3>
                <button
                  type="button"
                  onClick={() => navigate(`/organizer/events/${eventId}/sessions/create`)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Session
                </button>
              </div>
              
              {event.sessions.length > 0 ? (
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Session Title
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Time
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Location
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Speaker
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Attendees
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {event.sessions.map((session) => (
                        <tr key={session.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {session.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatTime(session.startTime)} - {formatTime(session.endTime)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {session.location}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {session.speaker}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {session.attendees}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button 
                              type="button"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Layers className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No sessions added yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating your first session for this event.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => navigate(`/organizer/events/${eventId}/sessions/create`)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Session
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Attendees Tab (Placeholder) */}
          {activeTab === 'attendees' && (
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Attendees
              </h3>
              <p className="text-gray-500">
                This tab would display the list of registered attendees, their information, and attendance status.
              </p>
            </div>
          )}

          {/* Settings Tab (Placeholder) */}
          {activeTab === 'settings' && (
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Event Settings
              </h3>
              <p className="text-gray-500">
                This tab would contain settings for registration, visibility, notifications, and other event configuration options.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Delete Event
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this event? All of the data including sessions, registrations, and attendee information will be permanently removed.
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;