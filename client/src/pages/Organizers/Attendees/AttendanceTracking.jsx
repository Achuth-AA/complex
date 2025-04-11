import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Search, Filter, ChevronDown, Calendar, Clock, 
  MapPin, Users, User, RefreshCw, Check, X, Download, 
  ChevronRight, CheckSquare, Square, AlertCircle
} from 'lucide-react';
import axios from 'axios';

const AttendanceTracking = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [event, setEvent] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Simulate API data fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, these would be API calls
        // const eventResponse = await axios.get(`/api/events/${eventId}`);
        // const sessionsResponse = await axios.get(`/api/events/${eventId}/sessions`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock event data
        const mockEvent = {
          id: eventId,
          title: 'Tech Conference 2025',
          startDate: '2025-06-15',
          endDate: '2025-06-17',
          location: 'San Francisco, CA',
          totalAttendees: 850,
          checkedInAttendees: 523
        };
        
        // Mock sessions data
        const mockSessions = [
          {
            id: 'session1',
            title: 'The Future of AI',
            description: 'Exploring emerging trends and the future direction of artificial intelligence.',
            date: '2025-06-15',
            startTime: '10:00',
            endTime: '11:30',
            location: 'Main Hall',
            capacity: 500,
            registered: 423,
            attended: 387,
            type: 'keynote'
          },
          {
            id: 'session2',
            title: 'Machine Learning Workshop',
            description: 'A hands-on workshop for implementing machine learning models.',
            date: '2025-06-15',
            startTime: '13:00',
            endTime: '15:00',
            location: 'Workshop Room A',
            capacity: 50,
            registered: 50,
            attended: 42,
            type: 'workshop'
          },
          {
            id: 'session3',
            title: 'AI Ethics Panel',
            description: 'Discussion on ethical considerations in AI development and deployment.',
            date: '2025-06-15',
            startTime: '16:00',
            endTime: '17:30',
            location: 'Conference Room B',
            capacity: 200,
            registered: 183,
            attended: 154,
            type: 'panel'
          },
          {
            id: 'session4',
            title: 'Neural Networks Deep Dive',
            description: 'Technical deep dive into neural network architectures and optimization.',
            date: '2025-06-16',
            startTime: '09:30',
            endTime: '11:00',
            location: 'Tech Theater',
            capacity: 150,
            registered: 142,
            attended: 118,
            type: 'talk'
          },
          {
            id: 'session5',
            title: 'Enterprise AI Implementation',
            description: 'Case studies and strategies for implementing AI in enterprise environments.',
            date: '2025-06-16',
            startTime: '13:30',
            endTime: '15:00',
            location: 'Business Center',
            capacity: 120,
            registered: 110,
            attended: 87,
            type: 'talk'
          },
          {
            id: 'session6',
            title: 'Q&A with AI Researchers',
            description: 'Open Q&A session with leading AI researchers.',
            date: '2025-06-16',
            startTime: '16:30',
            endTime: '17:30',
            location: 'Main Hall',
            capacity: 300,
            registered: 273,
            attended: 241,
            type: 'qa'
          },
          {
            id: 'session7',
            title: 'Computer Vision Applications',
            description: 'Practical applications of computer vision in various industries.',
            date: '2025-06-17',
            startTime: '10:00',
            endTime: '11:30',
            location: 'Innovation Lab',
            capacity: 100,
            registered: 94,
            attended: 0, // Future session, no attendance yet
            type: 'talk'
          }
        ];
        
        // Extract dates
        const dates = [...new Set(mockSessions.map(session => session.date))];
        
        setEvent(mockEvent);
        setSessions(mockSessions);
        setAvailableDates(dates);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [eventId]);
  
  // Load attendees when a session is selected
  useEffect(() => {
    const fetchSessionAttendees = async () => {
      if (!currentSession) return;
      
      try {
        setIsLoading(true);
        
        // In a real app, this would be an API call
        // const response = await axios.get(`/api/events/${eventId}/sessions/${currentSession.id}/attendees`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Generate mock attendees
        const mockAttendees = Array.from({ length: currentSession.registered }, (_, index) => ({
          id: `att${index + 1}`,
          name: generateRandomName(),
          email: `attendee${index + 1}@example.com`,
          company: generateRandomCompany(),
          title: generateRandomJobTitle(),
          type: getRandomAttendeeType(),
          ticketType: getRandomTicketType(),
          checkedIn: Math.random() > 0.2, // 80% chance of being checked in
          attended: Math.random() > (currentSession.date === '2025-06-17' ? 1 : 0.3), // Future sessions have no attendance
          profileImage: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`
        }));
        
        setAttendees(mockAttendees);
        setSelectedAttendees([]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching session attendees:', error);
        setIsLoading(false);
      }
    };
    
    fetchSessionAttendees();
  }, [currentSession, eventId]);
  
  // Helper functions for generating mock data
  function generateRandomName() {
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Jennifer', 'William', 'Elizabeth', 'James', 'Patricia', 'Thomas', 'Linda', 'Daniel', 'Barbara'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin'];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  }
  
  function generateRandomCompany() {
    const companies = ['TechCorp', 'InnoSoft', 'DataWave', 'CloudFlare', 'NexusNet', 'ByteWorks', 'QuantumSys', 'CoreTech', 'VisionAI', 'PulseTech', 'CyberSec', 'AlgoSoft'];
    return companies[Math.floor(Math.random() * companies.length)];
  }
  
  function generateRandomJobTitle() {
    const titles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer', 'DevOps Engineer', 'CTO', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'AI Researcher', 'Cloud Architect'];
    return titles[Math.floor(Math.random() * titles.length)];
  }
  
  function getRandomAttendeeType() {
    const types = ['general', 'general', 'general', 'general', 'speaker', 'vip', 'sponsor', 'staff']; // Weighted distribution
    return types[Math.floor(Math.random() * types.length)];
  }
  
  function getRandomTicketType() {
    const types = ['full', 'full', 'full', 'day', 'day', 'workshop', 'virtual']; // Weighted distribution
    return types[Math.floor(Math.random() * types.length)];
  }
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format time for display
  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Calculate attendance percentage
  const calculateAttendancePercentage = (session) => {
    if (session.registered === 0) return 0;
    return Math.round((session.attended / session.registered) * 100);
  };
  
  // Get attendance percentage color class
  const getAttendanceColorClass = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  // Get session type badge color
  const getSessionTypeBadgeColor = (type) => {
    switch (type) {
      case 'keynote':
        return 'bg-yellow-100 text-yellow-800';
      case 'workshop':
        return 'bg-green-100 text-green-800';
      case 'panel':
        return 'bg-blue-100 text-blue-800';
      case 'talk':
        return 'bg-purple-100 text-purple-800';
      case 'qa':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get attendee type badge color
  const getAttendeeTypeBadgeColor = (type) => {
    switch (type) {
      case 'speaker':
        return 'bg-purple-100 text-purple-800';
      case 'vip':
        return 'bg-yellow-100 text-yellow-800';
      case 'sponsor':
        return 'bg-green-100 text-green-800';
      case 'staff':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Select all attendees
  const handleSelectAll = () => {
    if (selectedAttendees.length === attendees.length) {
      setSelectedAttendees([]);
    } else {
      setSelectedAttendees(attendees.map(a => a.id));
    }
  };
  
  // Toggle attendee selection
  const toggleAttendeeSelection = (attendeeId) => {
    setSelectedAttendees(prev => {
      if (prev.includes(attendeeId)) {
        return prev.filter(id => id !== attendeeId);
      } else {
        return [...prev, attendeeId];
      }
    });
  };
  
  // Filter sessions based on search and filters
  const getFilteredSessions = () => {
    return sessions.filter(session => {
      // Apply search filter
      const matchesSearch = 
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply date filter
      const matchesDate = filterDate === 'all' || session.date === filterDate;
      
      // Apply status filter (past/upcoming)
      if (filterStatus === 'past') {
        const sessionDate = new Date(`${session.date}T${session.endTime}`);
        const now = new Date();
        if (sessionDate >= now) return false;
      } else if (filterStatus === 'upcoming') {
        const sessionDate = new Date(`${session.date}T${session.startTime}`);
        const now = new Date();
        if (sessionDate <= now) return false;
      }
      
      return matchesSearch && matchesDate;
    });
  };
  
  // Filter attendees based on search
  const getFilteredAttendees = () => {
    if (!searchTerm) return attendees;
    
    return attendees.filter(attendee => 
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  // Handle selecting a session for attendance tracking
  const handleSelectSession = (session) => {
    setCurrentSession(session);
  };
  
  // Handle toggling attendance for an attendee
  const handleToggleAttendance = async (attendeeId) => {
    if (!currentSession) return;
    
    // Find the attendee
    const attendeeIndex = attendees.findIndex(a => a.id === attendeeId);
    if (attendeeIndex === -1) return;
    
    // Create a copy of attendees array
    const updatedAttendees = [...attendees];
    
    // Toggle attendance
    updatedAttendees[attendeeIndex] = {
      ...updatedAttendees[attendeeIndex],
      attended: !updatedAttendees[attendeeIndex].attended
    };
    
    // Update state
    setAttendees(updatedAttendees);
    
    // In a real app, you would make an API call here
    // await axios.put(`/api/events/${eventId}/sessions/${currentSession.id}/attendance/${attendeeId}`, {
    //   attended: updatedAttendees[attendeeIndex].attended
    // });
    
    // Update session attendance count
    const updatedSessions = [...sessions];
    const sessionIndex = updatedSessions.findIndex(s => s.id === currentSession.id);
    if (sessionIndex !== -1) {
      updatedSessions[sessionIndex] = {
        ...updatedSessions[sessionIndex],
        attended: updatedSessions[sessionIndex].attended + (updatedAttendees[attendeeIndex].attended ? 1 : -1)
      };
      setSessions(updatedSessions);
      setCurrentSession(updatedSessions[sessionIndex]);
    }
  };
  
  // Handle applying bulk action to selected attendees
  const handleApplyBulkAction = async () => {
    if (!currentSession || !bulkAction || selectedAttendees.length === 0) return;
    
    setIsSaving(true);
    
    try {
      // Create a copy of attendees array
      const updatedAttendees = [...attendees];
      
      // Update attendance for selected attendees
      for (const attendeeId of selectedAttendees) {
        const attendeeIndex = updatedAttendees.findIndex(a => a.id === attendeeId);
        if (attendeeIndex !== -1) {
          const newAttendanceStatus = bulkAction === 'mark-attended';
          
          // Only update if the status is changing
          if (updatedAttendees[attendeeIndex].attended !== newAttendanceStatus) {
            updatedAttendees[attendeeIndex] = {
              ...updatedAttendees[attendeeIndex],
              attended: newAttendanceStatus
            };
          }
        }
      }
      
      // Calculate new attendance count
      const newAttendanceCount = updatedAttendees.filter(a => a.attended).length;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // In a real app, you would make an API call here
      // await axios.put(`/api/events/${eventId}/sessions/${currentSession.id}/bulk-attendance`, {
      //   attendeeIds: selectedAttendees,
      //   attended: bulkAction === 'mark-attended'
      // });
      
      // Update state
      setAttendees(updatedAttendees);
      
      // Update session attendance count
      const updatedSessions = [...sessions];
      const sessionIndex = updatedSessions.findIndex(s => s.id === currentSession.id);
      if (sessionIndex !== -1) {
        updatedSessions[sessionIndex] = {
          ...updatedSessions[sessionIndex],
          attended: newAttendanceCount
        };
        setSessions(updatedSessions);
        setCurrentSession(updatedSessions[sessionIndex]);
      }
      
      setSuccessMessage(`${selectedAttendees.length} attendees have been ${bulkAction === 'mark-attended' ? 'marked as attended' : 'marked as not attended'}`);
      setTimeout(() => setSuccessMessage(''), 3000);
      setIsSaving(false);
      setSelectedAttendees([]);
      setBulkAction('');
      
    } catch (error) {
      console.error('Error applying bulk action:', error);
      setIsSaving(false);
    }
  };
  
  // Handle exporting attendance data
  const handleExportAttendance = () => {
    if (!currentSession) return;
    
    // In a real app, this would trigger an API call to export data
    alert(`Attendance data for session "${currentSession.title}" would be exported here.`);
    
    // Potential API call:
    // window.location.href = `/api/events/${eventId}/sessions/${currentSession.id}/attendance/export`;
  };
  
  const isPastSession = (session) => {
    const sessionEndTime = new Date(`${session.date}T${session.endTime}`);
    return sessionEndTime < new Date();
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}`)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
              Attendance Tracking
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage session attendance for {event?.title}
            </p>
          </div>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Search Input */}
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                placeholder={currentSession ? "Search attendees..." : "Search sessions..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Button */}
            <div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Filter className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                Filters
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && !currentSession && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700">
                  Filter by Date
                </label>
                <select
                  id="date-filter"
                  name="date-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                >
                  <option value="all">All Dates</option>
                  {availableDates.map(date => (
                    <option key={date} value={date}>
                      {formatDate(date)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
                  Filter by Status
                </label>
                <select
                  id="status-filter"
                  name="status-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Sessions</option>
                  <option value="past">Past Sessions</option>
                  <option value="upcoming">Upcoming Sessions</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Success Message */}
      {successMessage && (
        <div className="rounded-md bg-green-50 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
      
      {/* Two-Panel Layout */}
      {!isLoading && (
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Left Panel - Sessions List */}
          <div className={`w-full ${currentSession ? 'lg:w-1/3' : 'lg:w-full'}`}>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Sessions
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Select a session to track attendance
                </p>
              </div>
              
              {getFilteredSessions().length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {getFilteredSessions().map(session => (
                    <li 
                      key={session.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${currentSession?.id === session.id ? 'bg-indigo-50' : ''}`}
                      onClick={() => handleSelectSession(session)}
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-indigo-600 truncate">
                              {session.title}
                            </p>
                            <div className="mt-1 flex items-center">
                              <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${getSessionTypeBadgeColor(session.type)}`}>
                                {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                              </span>
                              {isPastSession(session) ? (
                                <span className="ml-2 px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-800">
                                  Completed
                                </span>
                              ) : (
                                <span className="ml-2 px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800">
                                  Upcoming
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="ml-5 flex-shrink-0">
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {formatDate(session.date)}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {formatTime(session.startTime)} - {formatTime(session.endTime)}
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {session.location}
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              <span className="truncate">
                                {session.registered} registered | {session.attended} attended
                              </span>
                            </div>
                            <div className={`flex items-center ${getAttendanceColorClass(calculateAttendancePercentage(session))}`}>
                              <span className="font-semibold">{calculateAttendancePercentage(session)}%</span>
                            </div>
                          </div>
                          <div className="mt-2 relative pt-1">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                              <div 
                                style={{ width: `${calculateAttendancePercentage(session)}%` }} 
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                  calculateAttendancePercentage(session) >= 80 ? 'bg-green-500' :
                                  calculateAttendancePercentage(session) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No sessions found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Panel - Attendance Tracking */}
          {currentSession && (
            <div className="w-full lg:w-2/3">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {currentSession.title}
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        {formatDate(currentSession.date)} | {formatTime(currentSession.startTime)} - {formatTime(currentSession.endTime)} | {currentSession.location}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleExportAttendance}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Download className="mr-1.5 h-4 w-4" />
                      Export
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <span className="font-medium">{currentSession.registered}</span> registered
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Check className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <span className="font-medium">{currentSession.attended}</span> attended
                      </div>
                      <div className={`flex items-center text-sm ${getAttendanceColorClass(calculateAttendancePercentage(currentSession))}`}>
                        <span className="font-medium">{calculateAttendancePercentage(currentSession)}%</span> attendance
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentSession(null)}
                      className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                    >
                      <ArrowLeft className="mr-1.5 h-4 w-4" />
                      Back to all sessions
                    </button>
                  </div>
                </div>
                
                {/* Bulk Actions */}
                {attendees.length > 0 && (
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 sm:px-6">
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={handleSelectAll}
                          className="inline-flex items-center text-gray-700"
                        >
                          {selectedAttendees.length === attendees.length ? (
                            <CheckSquare className="h-5 w-5 text-indigo-600" />
                          ) : (
                            <Square className="h-5 w-5 text-gray-400" />
                          )}
                          <span className="ml-2 text-sm">
                            {selectedAttendees.length === 0 
                              ? 'Select All' 
                              : selectedAttendees.length === attendees.length 
                                ? 'Deselect All' 
                                : `${selectedAttendees.length} selected`}
                          </span>
                        </button>
                      </div>
                      
                      {selectedAttendees.length > 0 && (
                        <div className="flex items-center mt-2 sm:mt-0">
                          <span className="text-sm text-gray-700 mr-2">Bulk action:</span>
                          <select
                            value={bulkAction}
                            onChange={(e) => setBulkAction(e.target.value)}
                            className="inline-block w-auto pl-3 pr-10 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          >
                            <option value="">Select action</option>
                            <option value="mark-attended">Mark as Attended</option>
                            <option value="mark-not-attended">Mark as Not Attended</option>
                          </select>
                          
                          <button
                            type="button"
                            onClick={handleApplyBulkAction}
                            disabled={!bulkAction || isSaving}
                            className={`ml-2 inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white ${
                              !bulkAction || isSaving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                          >
                            {isSaving ? (
                              <>
                                <div className="animate-spin mr-1.5 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                Applying...
                              </>
                            ) : (
                              'Apply'
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Attendee List */}
                {getFilteredAttendees().length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {getFilteredAttendees().map(attendee => (
                      <li key={attendee.id} className="hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedAttendees.includes(attendee.id)}
                                onChange={() => toggleAttendeeSelection(attendee.id)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-3"
                              />
                              <img 
                                className="h-10 w-10 rounded-full object-cover" 
                                src={attendee.profileImage} 
                                alt={attendee.name} 
                              />
                              <div className="ml-4">
                                <div className="flex items-center">
                                  <h3 className="text-sm font-medium text-gray-900">{attendee.name}</h3>
                                  <span className={`ml-2 px-2 py-0.5 flex-shrink-0 inline-block text-xs leading-5 font-medium rounded-full ${getAttendeeTypeBadgeColor(attendee.type)}`}>
                                    {attendee.type.charAt(0).toUpperCase() + attendee.type.slice(1)}
                                  </span>
                                  {!attendee.checkedIn && (
                                    <span className="ml-2 px-2 py-0.5 flex-shrink-0 inline-flex items-center text-xs leading-5 font-medium rounded-full bg-yellow-100 text-yellow-800">
                                      <AlertCircle className="mr-1 h-3 w-3" />
                                      Not Checked In
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500">{attendee.email}</p>
                                <p className="text-xs text-gray-500">{attendee.title} at {attendee.company}</p>
                              </div>
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={() => handleToggleAttendance(attendee.id)}
                                className={`inline-flex items-center px-3 py-1.5 border shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                  attendee.attended
                                    ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                                    : 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700'
                                }`}
                              >
                                {attendee.attended ? (
                                  <>
                                    <Check className="mr-1.5 h-4 w-4 text-green-500" />
                                    Attended
                                  </>
                                ) : (
                                  'Mark Attended'
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-10">
                    <User className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No attendees found</h3>
                    <p className="mt-1 text-gray-500">
                      {searchTerm ? "Try adjusting your search" : "No one has registered for this session yet"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceTracking;