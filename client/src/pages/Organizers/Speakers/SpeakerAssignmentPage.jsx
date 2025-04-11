import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Search, Calendar, Clock, MapPin, 
  Plus, Check, X, Filter, ChevronDown, AlertCircle
} from 'lucide-react';
import axios from 'axios';

const SpeakerAssignmentPage = () => {
  const { eventId, speakerId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [speaker, setSpeaker] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  
  // Session types
  const sessionTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'keynote', name: 'Keynote' },
    { id: 'panel', name: 'Panel Discussion' },
    { id: 'workshop', name: 'Workshop' },
    { id: 'talk', name: 'Talk' },
    { id: 'qa', name: 'Q&A Session' }
  ];
  
  // Fetch speaker and sessions data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, you would fetch from your API
        // const speakerResponse = await axios.get(`/api/events/${eventId}/speakers/${speakerId}`);
        // const sessionsResponse = await axios.get(`/api/events/${eventId}/sessions`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock speaker data
        const mockSpeaker = {
          id: speakerId,
          name: 'Sarah Johnson',
          title: 'AI Research Director',
          company: 'TechCorp Inc.',
          type: 'keynote',
          profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
          assignedSessions: ['session1', 'session4']
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
            type: 'keynote',
            capacity: 500,
            speakers: ['s1']
          },
          {
            id: 'session2',
            title: 'Machine Learning Workshop',
            description: 'A hands-on workshop for implementing machine learning models.',
            date: '2025-06-15',
            startTime: '13:00',
            endTime: '15:00',
            location: 'Workshop Room A',
            type: 'workshop',
            capacity: 50,
            speakers: ['s3']
          },
          {
            id: 'session3',
            title: 'AI Ethics Panel',
            description: 'Discussion on ethical considerations in AI development and deployment.',
            date: '2025-06-15',
            startTime: '16:00',
            endTime: '17:30',
            location: 'Conference Room B',
            type: 'panel',
            capacity: 200,
            speakers: ['s5', 's4']
          },
          {
            id: 'session4',
            title: 'Neural Networks Deep Dive',
            description: 'Technical deep dive into neural network architectures and optimization.',
            date: '2025-06-16',
            startTime: '09:30',
            endTime: '11:00',
            location: 'Tech Theater',
            type: 'talk',
            capacity: 150,
            speakers: ['s1']
          },
          {
            id: 'session5',
            title: 'Enterprise AI Implementation',
            description: 'Case studies and strategies for implementing AI in enterprise environments.',
            date: '2025-06-16',
            startTime: '13:30',
            endTime: '15:00',
            location: 'Business Center',
            type: 'talk',
            capacity: 120,
            speakers: ['s2']
          },
          {
            id: 'session6',
            title: 'Q&A with AI Researchers',
            description: 'Open Q&A session with leading AI researchers.',
            date: '2025-06-16',
            startTime: '16:30',
            endTime: '17:30',
            location: 'Main Hall',
            type: 'qa',
            capacity: 300,
            speakers: ['s4', 's7']
          },
          {
            id: 'session7',
            title: 'Computer Vision Applications',
            description: 'Practical applications of computer vision in various industries.',
            date: '2025-06-17',
            startTime: '10:00',
            endTime: '11:30',
            location: 'Innovation Lab',
            type: 'talk',
            capacity: 100,
            speakers: []
          }
        ];
        
        // Extract all unique dates
        const dates = [...new Set(mockSessions.map(session => session.date))];
        
        setSpeaker(mockSpeaker);
        setSessions(mockSessions);
        setAvailableDates(dates);
        
        // Set initially selected sessions based on speaker's assigned sessions
        setSelectedSessions(mockSpeaker.assignedSessions || []);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [eventId, speakerId]);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Check for time conflicts
  const hasTimeConflict = (sessionId) => {
    // If not currently selected, no conflict to check
    if (!selectedSessions.includes(sessionId)) return false;
    
    const currentSession = sessions.find(session => session.id === sessionId);
    if (!currentSession) return false;
    
    // Check against other selected sessions on the same day
    return sessions.some(session => {
      // Skip comparing with itself or sessions on different days
      if (
        session.id === sessionId || 
        session.date !== currentSession.date || 
        !selectedSessions.includes(session.id)
      ) {
        return false;
      }
      
      // Check if sessions overlap
      const sessionStart = new Date(`${session.date}T${session.startTime}`);
      const sessionEnd = new Date(`${session.date}T${session.endTime}`);
      const currentStart = new Date(`${currentSession.date}T${currentSession.startTime}`);
      const currentEnd = new Date(`${currentSession.date}T${currentSession.endTime}`);
      
      // Overlap occurs when:
      // (Session1Start <= Session2End) AND (Session1End >= Session2Start)
      return (currentStart <= sessionEnd) && (currentEnd >= sessionStart);
    });
  };
  
  // Toggle session selection
  const toggleSessionSelection = (sessionId) => {
    setSelectedSessions(prev => {
      if (prev.includes(sessionId)) {
        return prev.filter(id => id !== sessionId);
      } else {
        return [...prev, sessionId];
      }
    });
  };
  
  // Format time for display
  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Get sessions for a specific date
  const getSessionsByDate = (date) => {
    return sessions.filter(session => session.date === date);
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
      
      // Apply type filter
      const matchesType = filterType === 'all' || session.type === filterType;
      
      return matchesSearch && matchesDate && matchesType;
    });
  };
  
  // Get background color for session type
  const getSessionTypeColor = (type) => {
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
  
  // Save speaker session assignments
  const handleSaveAssignments = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, you would call your API
      // await axios.put(`/api/events/${eventId}/speakers/${speakerId}/sessions`, {
      //   sessions: selectedSessions
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveSuccess(true);
      setIsSaving(false);
      
      // Clear success message after a delay
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving session assignments:', error);
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}/speakers/${speakerId}`)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
              Assign Sessions
            </h2>
            {speaker && (
              <p className="mt-1 text-sm text-gray-500">
                Select sessions for {speaker.name}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={handleSaveAssignments}
            disabled={isSaving}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSaving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isSaving ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </>
            ) : (
              <>
                <Check className="-ml-1 mr-2 h-5 w-5" />
                Save Assignments
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Success message */}
      {saveSuccess && (
        <div className="rounded-md bg-green-50 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Session assignments successfully saved
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Speaker summary card */}
      {speaker && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center">
              <img 
                className="h-12 w-12 rounded-full mr-4 object-cover"
                src={speaker.profileImage}
                alt={speaker.name}
              />
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {speaker.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {speaker.title} at {speaker.company}
                </p>
              </div>
              <div className="ml-auto">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSessionTypeColor(speaker.type)}`}>
                  {speaker.type.charAt(0).toUpperCase() + speaker.type.slice(1)} Speaker
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <span className="font-medium">{selectedSessions.length}</span> {selectedSessions.length === 1 ? 'session' : 'sessions'} assigned
              </div>
              {selectedSessions.some(sessionId => hasTimeConflict(sessionId)) && (
                <div className="flex items-center text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Time conflicts detected
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
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
                placeholder="Search sessions..."
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
          {showFilters && (
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
                <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700">
                  Filter by Session Type
                </label>
                <select
                  id="type-filter"
                  name="type-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  {sessionTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Session Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{getFilteredSessions().length}</span> sessions
        </p>
      </div>
      
      {/* Sessions List */}
      {filterDate === 'all' ? (
        // Group by date when showing all dates
        <div className="space-y-8">
          {availableDates.map(date => {
            const dateSessions = getFilteredSessions().filter(session => session.date === date);
            if (dateSessions.length === 0) return null;
            
            return (
              <div key={date} className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    {formatDate(date)}
                  </h3>
                </div>
                <ul className="divide-y divide-gray-200">
                  {dateSessions.map(session => (
                    <li key={session.id} className={`${selectedSessions.includes(session.id) ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              id={`session-${session.id}`}
                              name={`session-${session.id}`}
                              type="checkbox"
                              checked={selectedSessions.includes(session.id)}
                              onChange={() => toggleSessionSelection(session.id)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`session-${session.id}`} className="ml-3 block cursor-pointer">
                              <span className="text-lg font-medium text-indigo-600 truncate">
                                {session.title}
                              </span>
                              <span className={`ml-2 px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${getSessionTypeColor(session.type)}`}>
                                {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                              </span>
                              
                              {/* Show conflict warning */}
                              {hasTimeConflict(session.id) && (
                                <span className="ml-2 px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-red-100 text-red-800">
                                  Time Conflict
                                </span>
                              )}
                            </label>
                          </div>
                        </div>
                        
                        <div className="mt-2 ml-7 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {formatTime(session.startTime)} - {formatTime(session.endTime)}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {session.location}
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            {/* Show current speakers */}
                            {session.speakers.length > 0 && (
                              <div className="flex items-center">
                                <div className="text-gray-500">
                                  {session.speakers.length} {session.speakers.length === 1 ? 'speaker' : 'speakers'} assigned
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Description */}
                        <div className="mt-2 ml-7">
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {session.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        // Show sessions for a specific date
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {formatDate(filterDate)}
            </h3>
          </div>
          {getFilteredSessions().length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {getFilteredSessions().map(session => (
                <li key={session.id} className={`${selectedSessions.includes(session.id) ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id={`session-${session.id}`}
                          name={`session-${session.id}`}
                          type="checkbox"
                          checked={selectedSessions.includes(session.id)}
                          onChange={() => toggleSessionSelection(session.id)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`session-${session.id}`} className="ml-3 block cursor-pointer">
                          <span className="text-lg font-medium text-indigo-600 truncate">
                            {session.title}
                          </span>
                          <span className={`ml-2 px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${getSessionTypeColor(session.type)}`}>
                            {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                          </span>
                          
                          {/* Show conflict warning */}
                          {hasTimeConflict(session.id) && (
                            <span className="ml-2 px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-red-100 text-red-800">
                              Time Conflict
                            </span>
                          )}
                        </label>
                      </div>
                    </div>
                    
                    <div className="mt-2 ml-7 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {formatTime(session.startTime)} - {formatTime(session.endTime)}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {session.location}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        {/* Show current speakers */}
                        {session.speakers.length > 0 && (
                          <div className="flex items-center">
                            <div className="text-gray-500">
                              {session.speakers.length} {session.speakers.length === 1 ? 'speaker' : 'speakers'} assigned
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div className="mt-2 ml-7">
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {session.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No sessions found for the selected filters.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Bottom action bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-4 py-3 sm:px-6 z-10">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium">{selectedSessions.length}</span> {selectedSessions.length === 1 ? 'session' : 'sessions'} selected
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => navigate(`/organizer/events/${eventId}/speakers/${speakerId}`)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAssignments}
              disabled={isSaving}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSaving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Saving...
                </>
              ) : (
                'Save Assignments'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerAssignmentPage;