import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Search, Filter, Plus, Calendar, Clock, MapPin,
  User, Edit, Trash2, Eye, ChevronDown, ChevronUp, ArrowRight,
  MessageSquare, Download, Upload, Copy, CheckCircle
} from 'lucide-react';
import axios from 'axios';

const SessionListPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [event, setEvent] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    date: 'all',
    sessionType: 'all',
    speaker: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'startTime', direction: 'ascending' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [speakers, setSpeakers] = useState([]);
  const [sessionDates, setSessionDates] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);
  
  useEffect(() => {
    const fetchEventAndSessions = async () => {
      try {
        setIsLoading(true);
        
        // In production, these would be real API calls
        // const eventResponse = await axios.get(`/api/events/${eventId}`);
        // const sessionsResponse = await axios.get(`/api/events/${eventId}/sessions`);
        // const speakersResponse = await axios.get(`/api/events/${eventId}/speakers`);
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        
        // Mock event data
        const mockEvent = {
          id: eventId,
          title: 'Tech Conference 2025',
          startDate: '2025-06-15',
          endDate: '2025-06-17'
        };
        
        // Mock speakers data
        const mockSpeakers = [
          { id: 's1', name: 'Sarah Johnson', title: 'AI Research Director', company: 'TechCorp Inc.' },
          { id: 's2', name: 'Michael Chen', title: 'Senior Web Developer', company: 'WebSolutions' },
          { id: 's3', name: 'David Rodriguez', title: 'Data Science Lead', company: 'DataInsights' },
          { id: 's4', name: 'Laura Kim', title: 'UX Design Manager', company: 'DesignHub' },
          { id: 's5', name: 'James Wilson', title: 'CTO', company: 'Startup Ventures' }
        ];
        
        // Mock venues data
        const mockVenues = {
          'v1': { id: 'v1', name: 'Main Hall', capacity: 500 },
          'v2': { id: 'v2', name: 'Room A', capacity: 150 },
          'v3': { id: 'v3', name: 'Room B', capacity: 150 },
          'v4': { id: 'v4', name: 'Workshop Space', capacity: 75 },
          'v5': { id: 'v5', name: 'Meeting Room 1', capacity: 30 },
          'v6': { id: 'v6', name: 'Meeting Room 2', capacity: 30 }
        };
        
        // Mock sessions data
        const mockSessions = [
          {
            id: 'session1',
            title: 'Opening Keynote: The Future of Tech',
            description: 'Exploring the most exciting developments in technology for the coming decade.',
            sessionType: 'keynote',
            date: '2025-06-15',
            startTime: '09:30',
            endTime: '11:00',
            location: 'v1',
            locationName: 'Main Hall',
            speakerId: 's1',
            speakerName: 'Sarah Johnson',
            isPublished: true,
            capacity: 500,
            registeredAttendees: 423,
            tags: ['AI', 'future', 'technology']
          },
          {
            id: 'session2',
            title: 'Web Development Trends in 2025',
            description: 'What every web developer needs to know about the latest frameworks and tools.',
            sessionType: 'presentation',
            date: '2025-06-15',
            startTime: '13:00',
            endTime: '14:30',
            location: 'v2',
            locationName: 'Room A',
            speakerId: 's2',
            speakerName: 'Michael Chen',
            isPublished: true,
            capacity: 150,
            registeredAttendees: 132,
            tags: ['webdev', 'javascript', 'frameworks']
          },
          {
            id: 'session3',
            title: 'AI Implementation Workshop',
            description: 'Hands-on workshop for implementing machine learning models in your products.',
            sessionType: 'workshop',
            date: '2025-06-16',
            startTime: '10:00',
            endTime: '12:00',
            location: 'v4',
            locationName: 'Workshop Space',
            speakerId: 's3',
            speakerName: 'David Rodriguez',
            isPublished: true,
            capacity: 75,
            registeredAttendees: 68,
            tags: ['AI', 'machine learning', 'workshop']
          },
          {
            id: 'session4',
            title: 'UX Design Principles',
            description: 'Creating user-centric designs that engage and convert.',
            sessionType: 'presentation',
            date: '2025-06-16',
            startTime: '13:30',
            endTime: '15:00',
            location: 'v2',
            locationName: 'Room A',
            speakerId: 's4',
            speakerName: 'Laura Kim',
            isPublished: true,
            capacity: 150,
            registeredAttendees: 102,
            tags: ['UX', 'design', 'UI']
          },
          {
            id: 'session5',
            title: 'Scaling Your Tech Startup',
            description: 'Strategies for growing your technology business in a competitive market.',
            sessionType: 'presentation',
            date: '2025-06-17',
            startTime: '10:30',
            endTime: '12:00',
            location: 'v3',
            locationName: 'Room B',
            speakerId: 's5',
            speakerName: 'James Wilson',
            isPublished: false,
            capacity: 150,
            registeredAttendees: 0,
            tags: ['startup', 'business', 'scaling']
          },
          {
            id: 'session6',
            title: 'Panel: The Future of Work in Tech',
            description: 'Industry leaders discuss how technology is reshaping the workplace.',
            sessionType: 'panel',
            date: '2025-06-17',
            startTime: '14:00',
            endTime: '15:30',
            location: 'v1',
            locationName: 'Main Hall',
            speakerIds: ['s1', 's4', 's5'],
            speakerNames: ['Sarah Johnson', 'Laura Kim', 'James Wilson'],
            isPublished: true,
            capacity: 500,
            registeredAttendees: 356,
            tags: ['future of work', 'panel', 'careers']
          },
          {
            id: 'session7',
            title: 'Closing Remarks & Networking',
            description: 'Recap of the conference and structured networking opportunity.',
            sessionType: 'networking',
            date: '2025-06-17',
            startTime: '16:00',
            endTime: '17:30',
            location: 'v1',
            locationName: 'Main Hall',
            speakerId: 's1',
            speakerName: 'Sarah Johnson',
            isPublished: true,
            capacity: 500,
            registeredAttendees: 289,
            tags: ['networking', 'closing']
          }
        ];
        
        setEvent(mockEvent);
        setSessions(mockSessions);
        setFilteredSessions(mockSessions);
        setSpeakers(mockSpeakers);
        
        // Extract unique dates from sessions
        const uniqueDates = [...new Set(mockSessions.map(session => session.date))].sort();
        setSessionDates(uniqueDates);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sessions:', error);
        setIsLoading(false);
      }
    };
    
    fetchEventAndSessions();
  }, [eventId]);
  
  // Filter sessions based on search term and filters
  useEffect(() => {
    let filtered = [...sessions];
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(session => 
        session.title.toLowerCase().includes(search) ||
        session.description.toLowerCase().includes(search) ||
        (session.speakerName && session.speakerName.toLowerCase().includes(search)) ||
        (session.speakerNames && session.speakerNames.some(name => name.toLowerCase().includes(search))) ||
        (session.tags && session.tags.some(tag => tag.toLowerCase().includes(search)))
      );
    }
    
    // Apply date filter
    if (filters.date !== 'all') {
      filtered = filtered.filter(session => session.date === filters.date);
    }
    
    // Apply session type filter
    if (filters.sessionType !== 'all') {
      filtered = filtered.filter(session => session.sessionType === filters.sessionType);
    }
    
    // Apply speaker filter
    if (filters.speaker !== 'all') {
      filtered = filtered.filter(session => 
        session.speakerId === filters.speaker || 
        (session.speakerIds && session.speakerIds.includes(filters.speaker))
      );
    }
    
    // Apply sorting
    const sortedSessions = [...filtered].sort((a, b) => {
      // First sort by date
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      
      // Then by the selected sort key
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      // For startTime, we need to consider both date and time
      if (sortConfig.key === 'startTime') {
        aValue = `${a.date}T${a.startTime}`;
        bValue = `${b.date}T${b.startTime}`;
      }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredSessions(sortedSessions);
  }, [sessions, searchTerm, filters, sortConfig]);
  
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };
  
  const handleDeleteSession = async () => {
    if (!sessionToDelete) return;
    
    try {
      // In production, this would be a real API call
      // await axios.delete(`/api/events/${eventId}/sessions/${sessionToDelete.id}`);
      
      // Mock delete operation
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      // Remove session from state
      setSessions(prevSessions => prevSessions.filter(s => s.id !== sessionToDelete.id));
      
      // Show success message
      setSuccessMessage(`Session "${sessionToDelete.title}" has been deleted`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setShowDeleteModal(false);
      setSessionToDelete(null);
    } catch (error) {
      console.error('Error deleting session:', error);
      // Handle error state
    }
  };
  
  const handleBulkDelete = async () => {
    if (selectedSessions.length === 0) return;
    
    try {
      // In production, this would be a real API call
      // await Promise.all(selectedSessions.map(id => 
      //   axios.delete(`/api/events/${eventId}/sessions/${id}`)
      // ));
      
      // Mock delete operation
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      // Remove sessions from state
      setSessions(prevSessions => prevSessions.filter(s => !selectedSessions.includes(s.id)));
      
      // Show success message
      setSuccessMessage(`${selectedSessions.length} sessions have been deleted`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Reset selection
      setSelectedSessions([]);
      setShowBulkActions(false);
    } catch (error) {
      console.error('Error bulk deleting sessions:', error);
      // Handle error state
    }
  };
  
  const handleBulkPublish = async (publish = true) => {
    if (selectedSessions.length === 0) return;
    
    try {
      // In production, this would be a real API call
      // await Promise.all(selectedSessions.map(id => 
      //   axios.patch(`/api/events/${eventId}/sessions/${id}`, { isPublished: publish })
      // ));
      
      // Mock update operation
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      // Update sessions in state
      setSessions(prevSessions => prevSessions.map(s => {
        if (selectedSessions.includes(s.id)) {
          return { ...s, isPublished: publish };
        }
        return s;
      }));
      
      // Show success message
      setSuccessMessage(`${selectedSessions.length} sessions have been ${publish ? 'published' : 'unpublished'}`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Reset selection
      setSelectedSessions([]);
      setShowBulkActions(false);
    } catch (error) {
      console.error('Error bulk updating sessions:', error);
      // Handle error state
    }
  };
  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSessions(filteredSessions.map(s => s.id));
    } else {
      setSelectedSessions([]);
    }
  };
  
  const handleSelectSession = (id) => {
    setSelectedSessions(prev => {
      if (prev.includes(id)) {
        return prev.filter(s => s !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  const handleDuplicateSession = async (sessionId) => {
    try {
      // Find the session to duplicate
      const sessionToDuplicate = sessions.find(s => s.id === sessionId);
      if (!sessionToDuplicate) return;
      
      // In production, this would be a real API call
      // const response = await axios.post(`/api/events/${eventId}/sessions/duplicate/${sessionId}`);
      
      // Mock duplication
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      // Create a duplicated session with a new ID
      const duplicatedSession = {
        ...sessionToDuplicate,
        id: `session${Date.now()}`,
        title: `${sessionToDuplicate.title} (Copy)`,
        isPublished: false
      };
      
      // Add to sessions
      setSessions(prev => [...prev, duplicatedSession]);
      
      // Show success message
      setSuccessMessage(`Session "${sessionToDuplicate.title}" has been duplicated`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error duplicating session:', error);
      // Handle error state
    }
  };
  
  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    return new Date(1970, 0, 1, hours, minutes).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  // Get session type label
  const getSessionTypeLabel = (type) => {
    const types = {
      'presentation': 'Presentation',
      'workshop': 'Workshop',
      'panel': 'Panel Discussion',
      'keynote': 'Keynote',
      'breakout': 'Breakout Session',
      'networking': 'Networking Event'
    };
    return types[type] || type;
  };
  
  // Get color for session type
  const getSessionTypeColor = (type) => {
    const colors = {
      'presentation': 'bg-blue-100 text-blue-800',
      'workshop': 'bg-green-100 text-green-800',
      'panel': 'bg-purple-100 text-purple-800',
      'keynote': 'bg-yellow-100 text-yellow-800',
      'breakout': 'bg-pink-100 text-pink-800',
      'networking': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
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
              onClick={() => navigate(`/organizer/events/${eventId}`)}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                Sessions
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage all sessions for {event?.title}
              </p>
            </div>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => navigate(`/organizer/events/${eventId}/sessions/create`)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              Add Session
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  {successMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {/* Search Input */}
              <div className="sm:col-span-3">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search sessions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter Button */}
              <div className="sm:col-span-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Filter className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {/* Date Filter */}
                  <div className="sm:col-span-2">
                    <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <select
                      id="date-filter"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={filters.date}
                      onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                    >
                      <option value="all">All Dates</option>
                      {sessionDates.map(date => (
                        <option key={date} value={date}>
                          {formatDate(date)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Session Type Filter */}
                  <div className="sm:col-span-2">
                    <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700">
                      Session Type
                    </label>
                    <select
                      id="type-filter"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={filters.sessionType}
                      onChange={(e) => setFilters(prev => ({ ...prev, sessionType: e.target.value }))}
                    >
                      <option value="all">All Types</option>
                      <option value="presentation">Presentations</option>
                      <option value="workshop">Workshops</option>
                      <option value="panel">Panel Discussions</option>
                      <option value="keynote">Keynotes</option>
                      <option value="breakout">Breakout Sessions</option>
                      <option value="networking">Networking Events</option>
                    </select>
                  </div>

                  {/* Speaker Filter */}
                  <div className="sm:col-span-2">
                    <label htmlFor="speaker-filter" className="block text-sm font-medium text-gray-700">
                      Speaker
                    </label>
                    <select
                      id="speaker-filter"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={filters.speaker}
                      onChange={(e) => setFilters(prev => ({ ...prev, speaker: e.target.value }))}
                    >
                      <option value="all">All Speakers</option>
                      {speakers.map(speaker => (
                        <option key={speaker.id} value={speaker.id}>
                          {speaker.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bulk Actions Bar (visible when items are selected) */}
        {selectedSessions.length > 0 && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg mb-6 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-indigo-500 mr-2" />
              <span className="text-indigo-700 font-medium">
                {selectedSessions.length} session{selectedSessions.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkPublish(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Eye className="h-4 w-4 mr-1" />
                Publish
              </button>
              <button
                onClick={() => handleBulkPublish(false)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Eye className="h-4 w-4 mr-1" />
                Unpublish
              </button>
              <button
                onClick={handleBulkDelete}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
              <button
                onClick={() => setSelectedSessions([])}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Sessions List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {filteredSessions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={selectedSessions.length === filteredSessions.length && filteredSessions.length > 0}
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('title')}
                    >
                      <div className="flex items-center">
                        <span>Session</span>
                        {getSortIcon('title')}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center">
                        <span>Date</span>
                        {getSortIcon('date')}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('startTime')}
                    >
                      <div className="flex items-center">
                        <span>Time</span>
                        {getSortIcon('startTime')}
                      </div>
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Speaker
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSessions.map((session) => (
                    <tr 
                      key={session.id}
                      className={`${
                        selectedSessions.includes(session.id) ? 'bg-indigo-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            checked={selectedSessions.includes(session.id)}
                            onChange={() => handleSelectSession(session.id)}
                          />
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">{session.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{session.description}</div>
                          <div className="mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSessionTypeColor(session.sessionType)}`}>
                              {getSessionTypeLabel(session.sessionType)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {formatDate(session.date)}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {formatTime(session.startTime)} - {formatTime(session.endTime)}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {session.locationName}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {session.sessionType === 'panel' 
                            ? (
                              <div className="flex flex-col">
                                <span>Panel Discussion</span>
                                <span className="text-xs text-gray-500">
                                  {session.speakerNames?.join(', ')}
                                </span>
                              </div>
                            )
                            : session.speakerName
                          }
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          session.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {session.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/organizer/events/${eventId}/sessions/${session.id}`)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicateSession(session.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSessionToDelete(session);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No sessions found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filters.date !== 'all' || filters.sessionType !== 'all' || filters.speaker !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Get started by creating a new session'}
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => navigate(`/organizer/events/${eventId}/sessions/create`)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  New Session
                </button>
              </div>
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
                    Delete Session
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete the session "{sessionToDelete?.title}"? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteSession}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSessionToDelete(null);
                  }}
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

export default SessionListPage;