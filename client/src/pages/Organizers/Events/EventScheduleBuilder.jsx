import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Calendar, Clock, MapPin, User, 
  Move, Trash2, Edit, X, Check, Save, CornerDownRight 
} from 'lucide-react';
import axios from 'axios';

const EventScheduleBuilder = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [days, setDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  
  const [draggedSession, setDraggedSession] = useState(null);
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    speakerId: '',
    trackId: '',
    duration: 60, // minutes
  });
  const [selectedDay, setSelectedDay] = useState(null);
  const [speakers, setSpeakers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  // Time formatting helper function
  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Session duration helper function
  const getSessionDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 0;
    const start = new Date(startTime);
    const end = new Date(endTime);
    return Math.round((end - start) / (1000 * 60)); // Duration in minutes
  };

  // Date formatting helper function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  useEffect(() => {
    const fetchEventAndScheduleData = async () => {
      try {
        setIsLoading(true);
        
        // In production, these would be real API calls
        // const eventResponse = await axios.get(`/api/events/${eventId}`);
        // const sessionsResponse = await axios.get(`/api/events/${eventId}/sessions`);
        // const speakersResponse = await axios.get(`/api/speakers`);
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        
        // Mock event data
        const mockEvent = {
          id: eventId,
          title: 'Tech Conference 2025',
          startDate: '2025-06-15T09:00:00',
          endDate: '2025-06-17T18:00:00',
          location: 'San Francisco Convention Center'
        };
        
        // Generate days array from start and end dates
        const startDate = new Date(mockEvent.startDate);
        const endDate = new Date(mockEvent.endDate);
        const daysList = [];
        
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          daysList.push({
            id: d.toISOString().split('T')[0],
            date: new Date(d),
            fullDate: d.toISOString()
          });
        }
        
        // Generate time slots from 9am to 6pm with 30 minute intervals
        const slotsList = [];
        const startTime = new Date(startDate);
        startTime.setHours(9, 0, 0); // 9:00 AM
        
        const endTime = new Date(startDate);
        endTime.setHours(18, 0, 0); // 6:00 PM
        
        for (let t = new Date(startTime); t <= endTime; t.setMinutes(t.getMinutes() + 30)) {
          slotsList.push({
            id: `${t.getHours()}-${t.getMinutes()}`,
            time: new Date(t).toISOString(),
            displayTime: formatTime(t)
          });
        }
        
        // Mock tracks
        const mockTracks = [
          { id: 't1', name: 'Main Stage', color: 'bg-indigo-100 border-indigo-500' },
          { id: 't2', name: 'Technical Track', color: 'bg-green-100 border-green-500' },
          { id: 't3', name: 'Business Track', color: 'bg-yellow-100 border-yellow-500' },
          { id: 't4', name: 'Workshop Room', color: 'bg-purple-100 border-purple-500' }
        ];
        
        // Mock speakers
        const mockSpeakers = [
          { id: 's1', name: 'Sarah Johnson', title: 'AI Research Director', company: 'TechCorp Inc.' },
          { id: 's2', name: 'Michael Chen', title: 'Senior Web Developer', company: 'WebSolutions' },
          { id: 's3', name: 'David Rodriguez', title: 'Data Science Lead', company: 'DataInsights' },
          { id: 's4', name: 'Laura Kim', title: 'UX Design Manager', company: 'DesignHub' },
          { id: 's5', name: 'James Wilson', title: 'CTO', company: 'Startup Ventures' }
        ];
        
        // Mock sessions
        const mockSessions = [
          {
            id: 'session1',
            title: 'Opening Keynote: The Future of Tech',
            description: 'Exploring the most exciting developments in technology for the coming decade.',
            startTime: '2025-06-15T09:30:00',
            endTime: '2025-06-15T11:00:00',
            trackId: 't1',
            speakerId: 's1',
            day: '2025-06-15'
          },
          {
            id: 'session2',
            title: 'Web Development Trends in 2025',
            description: 'What every web developer needs to know about the latest frameworks and tools.',
            startTime: '2025-06-15T13:00:00',
            endTime: '2025-06-15T14:30:00',
            trackId: 't2',
            speakerId: 's2',
            day: '2025-06-15'
          },
          {
            id: 'session3',
            title: 'AI Implementation Workshop',
            description: 'Hands-on workshop for implementing machine learning models in your products.',
            startTime: '2025-06-16T10:00:00',
            endTime: '2025-06-16T12:00:00',
            trackId: 't4',
            speakerId: 's3',
            day: '2025-06-16'
          },
          {
            id: 'session4',
            title: 'UX Design Principles',
            description: 'Creating user-centric designs that engage and convert.',
            startTime: '2025-06-16T13:30:00',
            endTime: '2025-06-16T15:00:00',
            trackId: 't3',
            speakerId: 's4',
            day: '2025-06-16'
          },
          {
            id: 'session5',
            title: 'Scaling Your Tech Startup',
            description: 'Strategies for growing your technology business in a competitive market.',
            startTime: '2025-06-17T10:30:00',
            endTime: '2025-06-17T12:00:00',
            trackId: 't3',
            speakerId: 's5',
            day: '2025-06-17'
          }
        ];
        
        setEvent(mockEvent);
        setSessions(mockSessions);
        setSpeakers(mockSpeakers);
        setDays(daysList);
        setTimeSlots(slotsList);
        setTracks(mockTracks);
        setSelectedDay(daysList[0]?.id || null);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching event data:', error);
        setIsLoading(false);
      }
    };

    fetchEventAndScheduleData();
  }, [eventId]);

  // Get the sessions for the currently selected day
  const getSessionsForDay = () => {
    if (!selectedDay) return [];
    return sessions.filter(session => {
      const sessionDate = new Date(session.startTime).toISOString().split('T')[0];
      return sessionDate === selectedDay;
    });
  };

  // Find the speaker name based on speakerId
  const getSpeakerName = (speakerId) => {
    const speaker = speakers.find(s => s.id === speakerId);
    return speaker ? speaker.name : 'Unknown Speaker';
  };

  // Find the track based on trackId
  const getTrack = (trackId) => {
    return tracks.find(t => t.id === trackId) || { name: 'Unassigned', color: 'bg-gray-100 border-gray-500' };
  };

  // Calculate the grid row position based on start time
  const getRowPosition = (startTime) => {
    if (!startTime || !timeSlots.length) return 1;
    
    const time = new Date(startTime);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    
    // Find the matching time slot index
    const slotIndex = timeSlots.findIndex(slot => {
      const slotTime = new Date(slot.time);
      return slotTime.getHours() === hours && slotTime.getMinutes() === minutes;
    });
    
    return slotIndex + 1; // +1 because CSS grid is 1-based
  };

  // Calculate the session height based on duration
  const getSessionHeight = (startTime, endTime) => {
    if (!startTime || !endTime) return 1;
    
    const duration = getSessionDuration(startTime, endTime);
    return Math.max(1, duration / 30); // Each slot is 30 minutes, minimum height is 1
  };

  // Handle drag start event
  const handleDragStart = (session) => {
    setDraggedSession(session);
  };

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop event (simplified for this example)
  const handleDrop = (e, trackId, timeSlotId) => {
    e.preventDefault();
    
    if (!draggedSession) return;
    
    // In a complete implementation, you would update the session's start/end time and track
    // based on where it was dropped
    
    // For now, we'll just update the track and keep the same duration
    const updatedSessions = sessions.map(session => {
      if (session.id === draggedSession.id) {
        // Find the real time for the slot
        const timeSlot = timeSlots.find(slot => slot.id === timeSlotId);
        if (!timeSlot) return session;
        
        const newStartTime = new Date(timeSlot.time);
        const sessionDuration = getSessionDuration(session.startTime, session.endTime);
        
        const newEndTime = new Date(newStartTime);
        newEndTime.setMinutes(newEndTime.getMinutes() + sessionDuration);
        
        // Ensure the date part matches the selected day
        const selectedDayDate = new Date(selectedDay);
        newStartTime.setFullYear(selectedDayDate.getFullYear());
        newStartTime.setMonth(selectedDayDate.getMonth());
        newStartTime.setDate(selectedDayDate.getDate());
        
        newEndTime.setFullYear(selectedDayDate.getFullYear());
        newEndTime.setMonth(selectedDayDate.getMonth());
        newEndTime.setDate(selectedDayDate.getDate());
        
        return {
          ...session,
          trackId: trackId,
          startTime: newStartTime.toISOString(),
          endTime: newEndTime.toISOString(),
          day: selectedDay
        };
      }
      return session;
    });
    
    setSessions(updatedSessions);
    setDraggedSession(null);
    setIsEditing(true);
  };

  // Handle save schedule
  const handleSaveSchedule = async () => {
    try {
      // In production, this would be a real API call
      // await axios.put(`/api/events/${eventId}/schedule`, { sessions });
      
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      setIsEditing(false);
      
      // Handle any pending navigation
      if (pendingNavigation) {
        navigate(pendingNavigation);
        setPendingNavigation(null);
      }
    } catch (error) {
      console.error('Error saving schedule:', error);
      // Show error notification
    }
  };

  // Handle adding a new session
  const handleAddSession = () => {
    // Validate the form
    if (!newSession.title || !newSession.speakerId || !newSession.trackId) {
      // Show validation error
      return;
    }
    
    // Create a start time for the new session
    const dayDate = new Date(selectedDay);
    const startTime = new Date(dayDate);
    startTime.setHours(9, 0, 0); // Default to 9:00 AM
    
    // Create an end time based on the duration
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + parseInt(newSession.duration, 10));
    
    // Create a new session object
    const newSessionObj = {
      id: `session${Date.now()}`, // Generate a temporary ID
      title: newSession.title,
      description: newSession.description,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      trackId: newSession.trackId,
      speakerId: newSession.speakerId,
      day: selectedDay
    };
    
    // Add to sessions array
    setSessions([...sessions, newSessionObj]);
    
    // Reset form and close modal
    setNewSession({
      title: '',
      description: '',
      speakerId: '',
      trackId: '',
      duration: 60,
    });
    setShowAddSessionModal(false);
    setIsEditing(true);
  };

  // Handle navigation with unsaved changes check
  const handleNavigation = (path) => {
    if (isEditing) {
      setShowUnsavedChangesModal(true);
      setPendingNavigation(path);
    } else {
      navigate(path);
    }
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
              onClick={() => handleNavigation(`/organizer/events/${eventId}`)}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                Schedule Builder
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {event?.title} • {formatDate(event?.startDate)} to {formatDate(event?.endDate)}
              </p>
            </div>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
            {isEditing && (
              <button
                type="button"
                onClick={handleSaveSchedule}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save className="-ml-1 mr-2 h-5 w-5 text-white" />
                Save Schedule
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowAddSessionModal(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
              Add Session
            </button>
          </div>
        </div>

        {/* Day Selector */}
        <div className="bg-white shadow rounded-lg mb-8 overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Select Day
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {days.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`px-4 py-4 rounded-lg border-2 text-left focus:outline-none ${
                    selectedDay === day.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{formatDate(day.fullDate)}</div>
                  <div className="text-sm text-gray-500">
                    {getSessionsForDay().length} sessions scheduled
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="bg-white shadow rounded-lg overflow-auto">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {formatDate(selectedDay)} Schedule
            </h3>
            
            {getSessionsForDay().length > 0 ? (
              <div className="overflow-x-auto">
                <div className="min-w-max grid" style={{ gridTemplateColumns: `100px repeat(${tracks.length}, minmax(200px, 1fr))` }}>
                  {/* Header Row with Tracks */}
                  <div className="flex items-center justify-center p-3 bg-gray-100 border-b border-r border-gray-300 font-medium">
                    Time
                  </div>
                  {tracks.map((track) => (
                    <div key={track.id} className="p-3 bg-gray-100 border-b border-r border-gray-300 font-medium text-center">
                      {track.name}
                    </div>
                  ))}
                  
                  {/* Time Slots Rows */}
                  {timeSlots.map((slot) => (
                    <React.Fragment key={slot.id}>
                      <div className="p-2 border-b border-r border-gray-300 text-sm text-gray-500 flex items-center justify-center">
                        {slot.displayTime}
                      </div>
                      {tracks.map((track) => (
                        <div 
                          key={`${slot.id}-${track.id}`}
                          className="border-b border-r border-gray-300 p-1 relative min-h-[60px]"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, track.id, slot.id)}
                        ></div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
                
                {/* Session Blocks (Positioned Absolutely) */}
                <div className="relative">
                  {getSessionsForDay().map((session) => {
                    const track = getTrack(session.trackId);
                    const rowStart = getRowPosition(session.startTime);
                    const rowSpan = getSessionHeight(session.startTime, session.endTime);
                    
                    // Calculate column position (1 is time column, track columns start at 2)
                    const trackIndex = tracks.findIndex(t => t.id === session.trackId);
                    const colStart = trackIndex + 2; // +2 because column 1 is the time column
                    
                    return (
                      <div
                        key={session.id}
                        draggable
                        onDragStart={() => handleDragStart(session)}
                        className={`absolute rounded border-l-4 ${track.color} bg-white shadow hover:shadow-md p-2 cursor-move`}
                        style={{
                          gridRow: `${rowStart} / span ${rowSpan}`,
                          gridColumn: colStart,
                          top: `${(rowStart - 1) * 60 + 60}px`, // 60px for header + 60px per row
                          left: `${100 + (trackIndex) * 200}px`, // 100px for time column + 200px per track
                          height: `${rowSpan * 60 - 2}px`, // 60px per slot - 2px for borders
                          width: '198px' // 200px track width - 2px for borders
                        }}
                      >
                        <div className="flex flex-col h-full">
                          <div className="font-medium text-sm truncate">{session.title}</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(session.startTime)} - {formatTime(session.endTime)}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center mt-1">
                            <User className="h-3 w-3 mr-1" />
                            {getSpeakerName(session.speakerId)}
                          </div>
                          {session.description && rowSpan > 2 && (
                            <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {session.description}
                            </div>
                          )}
                          <div className="mt-auto flex justify-end space-x-1">
                            <button className="p-1 text-gray-400 hover:text-indigo-600">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No sessions scheduled for this day</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding sessions to the schedule.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddSessionModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Add Session
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add Session Modal */}
      {showAddSessionModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setShowAddSessionModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Add New Session
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Fill out the details below to add a new session to the schedule.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-4">
                <form>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Session Title
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter session title"
                          value={newSession.title}
                          onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows="3"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter session description"
                          value={newSession.description}
                          onChange={(e) => setNewSession({...newSession, description: e.target.value})}
                        ></textarea>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="speaker" className="block text-sm font-medium text-gray-700">
                        Speaker
                      </label>
                      <div className="mt-1">
                        <select
                          id="speaker"
                          name="speaker"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={newSession.speakerId}
                          onChange={(e) => setNewSession({...newSession, speakerId: e.target.value})}
                          required
                        >
                          <option value="">Select a speaker</option>
                          {speakers.map((speaker) => (
                            <option key={speaker.id} value={speaker.id}>
                              {speaker.name} - {speaker.title}, {speaker.company}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="track" className="block text-sm font-medium text-gray-700">
                        Track
                      </label>
                      <div className="mt-1">
                        <select
                          id="track"
                          name="track"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={newSession.trackId}
                          onChange={(e) => setNewSession({...newSession, trackId: e.target.value})}
                          required
                        >
                          <option value="">Select a track</option>
                          {tracks.map((track) => (
                            <option key={track.id} value={track.id}>
                              {track.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                        Duration (minutes)
                      </label>
                      <div className="mt-1">
                        <select
                          id="duration"
                          name="duration"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={newSession.duration}
                          onChange={(e) => setNewSession({...newSession, duration: e.target.value})}
                        >
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="90">1.5 hours</option>
                          <option value="120">2 hours</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={handleAddSession}
                >
                  Add Session
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowAddSessionModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Unsaved Changes Modal */}
      {showUnsavedChangesModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                  <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Unsaved Changes
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You have unsaved changes. What would you like to do?
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={handleSaveSchedule}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    setShowUnsavedChangesModal(false);
                    if (pendingNavigation) {
                      navigate(pendingNavigation);
                      setPendingNavigation(null);
                    }
                  }}
                >
                  Discard Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventScheduleBuilder;