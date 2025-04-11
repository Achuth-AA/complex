import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Save, Clock, Calendar, MapPin, User,
  Users, Info, MessageSquare, Layers, AlertTriangle,
  Trash2, ChevronLeft, ChevronRight, ExternalLink, CheckCircle
} from 'lucide-react';
import axios from 'axios';

const SessionDetailsPage = () => {
  const { eventId, sessionId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [originalSession, setOriginalSession] = useState(null);
  
  const [sessionData, setSessionData] = useState({
    title: '',
    description: '',
    sessionType: 'presentation',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    capacity: 50,
    speakerId: '',
    speakerIds: [],
    isPublished: true,
    allowQuestions: true,
    allowFeedback: true,
    materials: [],
    tags: []
  });
  
  const [event, setEvent] = useState(null);
  const [speakers, setSpeakers] = useState([]);
  const [venues, setVenues] = useState([]);
  const [activeTab, setActiveTab] = useState('details');
  const [materialFile, setMaterialFile] = useState(null);
  const [materialUploading, setMaterialUploading] = useState(false);
  
  // Get available session types
  const sessionTypes = [
    { id: 'presentation', label: 'Presentation' },
    { id: 'workshop', label: 'Workshop' },
    { id: 'panel', label: 'Panel Discussion' },
    { id: 'keynote', label: 'Keynote' },
    { id: 'breakout', label: 'Breakout Session' },
    { id: 'networking', label: 'Networking Event' }
  ];
  
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        setIsLoading(true);
        
        // In production, these would be real API calls
        // const sessionResponse = await axios.get(`/api/events/${eventId}/sessions/${sessionId}`);
        // const eventResponse = await axios.get(`/api/events/${eventId}`);
        // const speakersResponse = await axios.get(`/api/events/${eventId}/speakers`);
        // const venuesResponse = await axios.get(`/api/events/${eventId}/venues`);
        
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
        const mockVenues = [
          { id: 'v1', name: 'Main Hall', capacity: 500 },
          { id: 'v2', name: 'Room A', capacity: 150 },
          { id: 'v3', name: 'Room B', capacity: 150 },
          { id: 'v4', name: 'Workshop Space', capacity: 75 },
          { id: 'v5', name: 'Meeting Room 1', capacity: 30 },
          { id: 'v6', name: 'Meeting Room 2', capacity: 30 }
        ];
        
        // Mock session data based on session ID
        let mockSession;
        
        switch(sessionId) {
          case 'session1':
            mockSession = {
              id: 'session1',
              title: 'Opening Keynote: The Future of Tech',
              description: 'Exploring the most exciting developments in technology for the coming decade.',
              sessionType: 'keynote',
              date: '2025-06-15',
              startTime: '09:30',
              endTime: '11:00',
              location: 'v1',
              capacity: 500,
              speakerId: 's1',
              isPublished: true,
              allowQuestions: true,
              allowFeedback: true,
              registeredAttendees: 423,
              tags: ['AI', 'future', 'technology'],
              materials: [
                { id: 'm1', name: 'Keynote Slides.pdf', type: 'pdf', size: '2.4 MB', uploadedAt: '2025-03-15T10:30:00', downloadUrl: '#' }
              ]
            };
            break;
          case 'session2':
            mockSession = {
              id: 'session2',
              title: 'Web Development Trends in 2025',
              description: 'What every web developer needs to know about the latest frameworks and tools.',
              sessionType: 'presentation',
              date: '2025-06-15',
              startTime: '13:00',
              endTime: '14:30',
              location: 'v2',
              capacity: 150,
              speakerId: 's2',
              isPublished: true,
              allowQuestions: true,
              allowFeedback: true,
              registeredAttendees: 132,
              tags: ['webdev', 'javascript', 'frameworks'],
              materials: []
            };
            break;
          case 'session3':
            mockSession = {
              id: 'session3',
              title: 'AI Implementation Workshop',
              description: 'Hands-on workshop for implementing machine learning models in your products.',
              sessionType: 'workshop',
              date: '2025-06-16',
              startTime: '10:00',
              endTime: '12:00',
              location: 'v4',
              capacity: 75,
              speakerId: 's3',
              isPublished: true,
              allowQuestions: true,
              allowFeedback: true,
              registeredAttendees: 68,
              tags: ['AI', 'machine learning', 'workshop'],
              materials: [
                { id: 'm2', name: 'Workshop Instructions.pdf', type: 'pdf', size: '1.7 MB', uploadedAt: '2025-03-20T15:45:00', downloadUrl: '#' },
                { id: 'm3', name: 'Code Samples.zip', type: 'zip', size: '5.3 MB', uploadedAt: '2025-03-20T15:46:00', downloadUrl: '#' }
              ]
            };
            break;
          case 'session6':
            mockSession = {
              id: 'session6',
              title: 'Panel: The Future of Work in Tech',
              description: 'Industry leaders discuss how technology is reshaping the workplace.',
              sessionType: 'panel',
              date: '2025-06-17',
              startTime: '14:00',
              endTime: '15:30',
              location: 'v1',
              capacity: 500,
              speakerIds: ['s1', 's4', 's5'],
              isPublished: true,
              allowQuestions: true,
              allowFeedback: true,
              registeredAttendees: 356,
              tags: ['future of work', 'panel', 'careers'],
              materials: []
            };
            break;
          default:
            // Default mock session if ID doesn't match
            mockSession = {
              id: sessionId,
              title: 'Sample Session',
              description: 'This is a sample session description.',
              sessionType: 'presentation',
              date: '2025-06-15',
              startTime: '09:00',
              endTime: '10:30',
              location: 'v2',
              capacity: 150,
              speakerId: 's2',
              isPublished: true,
              allowQuestions: true,
              allowFeedback: true,
              registeredAttendees: 0,
              tags: ['sample'],
              materials: []
            };
        }
        
        setEvent(mockEvent);
        setSpeakers(mockSpeakers);
        setVenues(mockVenues);
        setSessionData(mockSession);
        setOriginalSession(mockSession);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching session data:', error);
        setIsLoading(false);
      }
    };
    
    fetchSessionData();
  }, [eventId, sessionId]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSessionData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear validation error when field is updated
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleCheckboxChange = (name) => {
    setSessionData(prevData => ({
      ...prevData,
      [name]: !prevData[name]
    }));
  };
  
  const handleMultiSpeakerChange = (speakerId) => {
    setSessionData(prevData => {
      const currentSpeakers = [...prevData.speakerIds || []];
      
      if (currentSpeakers.includes(speakerId)) {
        return {
          ...prevData,
          speakerIds: currentSpeakers.filter(id => id !== speakerId)
        };
      } else {
        return {
          ...prevData,
          speakerIds: [...currentSpeakers, speakerId]
        };
      }
    });
  };
  
  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (!sessionData.tags.includes(newTag)) {
        setSessionData(prevData => ({
          ...prevData,
          tags: [...prevData.tags, newTag]
        }));
      }
      e.target.value = '';
    }
  };
  
  const removeTag = (tagToRemove) => {
    setSessionData(prevData => ({
      ...prevData,
      tags: prevData.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleMaterialFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMaterialFile(e.target.files[0]);
    }
  };
  
  const handleUploadMaterial = async (e) => {
    e.preventDefault();
    
    if (!materialFile) return;
    
    setMaterialUploading(true);
    
    try {
      // In production, this would be a real file upload API call
      // const formData = new FormData();
      // formData.append('file', materialFile);
      // const response = await axios.post(`/api/events/${eventId}/sessions/${sessionId}/materials`, formData);
      
      // Mock upload
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate upload delay
      
      // Create mock material object
      const newMaterial = {
        id: `m${Date.now()}`,
        name: materialFile.name,
        type: materialFile.name.split('.').pop().toLowerCase(),
        size: `${(materialFile.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: new Date().toISOString(),
        downloadUrl: '#'
      };
      
      // Add to session materials
      setSessionData(prevData => ({
        ...prevData,
        materials: [...prevData.materials, newMaterial]
      }));
      
      // Reset file input
      setMaterialFile(null);
      document.getElementById('material-upload').value = '';
      
      setMaterialUploading(false);
    } catch (error) {
      console.error('Error uploading material:', error);
      setMaterialUploading(false);
    }
  };
  
  const handleDeleteMaterial = async (materialId) => {
    try {
      // In production, this would be a real API call
      // await axios.delete(`/api/events/${eventId}/sessions/${sessionId}/materials/${materialId}`);
      
      // Mock delete operation
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      // Remove from session materials
      setSessionData(prevData => ({
        ...prevData,
        materials: prevData.materials.filter(material => material.id !== materialId)
      }));
    } catch (error) {
      console.error('Error deleting material:', error);
      // Handle error state
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!sessionData.title.trim()) {
      errors.title = 'Session title is required';
    }
    
    if (!sessionData.date) {
      errors.date = 'Date is required';
    }
    
    if (!sessionData.startTime) {
      errors.startTime = 'Start time is required';
    }
    
    if (!sessionData.endTime) {
      errors.endTime = 'End time is required';
    } else if (sessionData.startTime && sessionData.startTime >= sessionData.endTime) {
      errors.endTime = 'End time must be after start time';
    }
    
    if (!sessionData.location) {
      errors.location = 'Location is required';
    }
    
    if (sessionData.sessionType === 'panel' && (!sessionData.speakerIds || sessionData.speakerIds.length === 0)) {
      errors.speakerIds = 'Please select at least one panelist';
    } else if (sessionData.sessionType !== 'panel' && !sessionData.speakerId) {
      errors.speakerId = 'Please select a speaker';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // In production, this would be a real API call
      // await axios.put(`/api/events/${eventId}/sessions/${sessionId}`, sessionData);
      
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Update original session data
      setOriginalSession(sessionData);
      
      // Clear success message after a few seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving session:', error);
      setIsSaving(false);
      // Handle error state
    }
  };
  
  const handleDeleteSession = async () => {
    try {
      // In production, this would be a real API call
      // await axios.delete(`/api/events/${eventId}/sessions/${sessionId}`);
      
      // Mock delete operation
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      setShowDeleteModal(false);
      
      // Redirect to sessions list
      navigate(`/organizer/events/${eventId}/sessions`, { 
        state: { message: `Session "${sessionData.title}" deleted successfully`, type: 'success' } 
      });
    } catch (error) {
      console.error('Error deleting session:', error);
      // Handle error state
    }
  };
  
  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return '';
    
    // If time is already in HH:MM format, just return it
    if (timeString.includes(':')) return timeString;
    
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
  
  // Get file icon based on type
  const getFileIcon = (fileType) => {
    switch(fileType) {
      case 'pdf':
        return (
          <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case 'zip':
      case 'rar':
        return (
          <svg className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v12h8V6H6z" clipRule="evenodd" />
            <path d="M10 8a1 1 0 011 1v2a1 1 0 11-2 0V9a1 1 0 011-1z" />
          </svg>
        );
      case 'ppt':
      case 'pptx':
        return (
          <svg className="h-6 w-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v12h8V6H6z" clipRule="evenodd" />
            <path d="M8 11a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v12h8V6H6z" clipRule="evenodd" />
            <path d="M10 9a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1z" />
            <path d="M10 4a1 1 0 011 1v2a1 1 0 11-2 0V5a1 1 0 011-1z" />
          </svg>
        );
      default:
        return (
          <svg className="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  // Helper to check if session has been modified
  const hasChanges = () => {
    return JSON.stringify(originalSession) !== JSON.stringify(sessionData);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => navigate(`/organizer/events/${eventId}/sessions`)}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                {sessionData.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {formatDate(sessionData.date)} • {formatTime(sessionData.startTime)} - {formatTime(sessionData.endTime)}
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="-ml-1 mr-2 h-5 w-5 text-red-500" />
              Delete
            </button>
            <button
              type="button"
              disabled={!hasChanges() || isSaving}
              onClick={handleSubmit}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                hasChanges() && !isSaving ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="-ml-1 mr-2 h-5 w-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Session updated successfully
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('details')}
                className={`${
                  activeTab === 'details'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Session Details
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`${
                  activeTab === 'materials'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Materials
              </button>
              <button
                onClick={() => setActiveTab('attendees')}
                className={`${
                  activeTab === 'attendees'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Attendees
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`${
                  activeTab === 'analytics'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Analytics
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Details Tab */}
            {activeTab === 'details' && (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {/* Basic Information */}
                  <div className="sm:col-span-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                      <Info className="h-5 w-5 text-gray-400 mr-2" />
                      Basic Information
                    </h3>
                    <div className="mt-1 border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Session Title*
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="title"
                              id="title"
                              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                validationErrors.title ? 'border-red-300' : ''
                              }`}
                              value={sessionData.title}
                              onChange={handleInputChange}
                            />
                            {validationErrors.title && (
                              <p className="mt-2 text-sm text-red-600">{validationErrors.title}</p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="sessionType" className="block text-sm font-medium text-gray-700">
                            Session Type*
                          </label>
                          <div className="mt-1">
                            <select
                              id="sessionType"
                              name="sessionType"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={sessionData.sessionType}
                              onChange={handleInputChange}
                            >
                              {sessionTypes.map(type => (
                                <option key={type.id} value={type.id}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="description"
                              name="description"
                              rows="4"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={sessionData.description}
                              onChange={handleInputChange}
                              placeholder="Provide a detailed description of this session..."
                            ></textarea>
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            This description will be displayed to attendees in the event schedule.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="sm:col-span-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      Date and Time
                    </h3>
                    <div className="mt-1 border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date*
                          </label>
                          <div className="mt-1">
                            <input
                              type="date"
                              name="date"
                              id="date"
                              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                validationErrors.date ? 'border-red-300' : ''
                              }`}
                              min={event.startDate}
                              max={event.endDate}
                              value={sessionData.date}
                              onChange={handleInputChange}
                            />
                            {validationErrors.date && (
                              <p className="mt-2 text-sm text-red-600">{validationErrors.date}</p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                            Start Time*
                          </label>
                          <div className="mt-1">
                            <input
                              type="time"
                              name="startTime"
                              id="startTime"
                              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                validationErrors.startTime ? 'border-red-300' : ''
                              }`}
                              value={sessionData.startTime}
                              onChange={handleInputChange}
                            />
                            {validationErrors.startTime && (
                              <p className="mt-2 text-sm text-red-600">{validationErrors.startTime}</p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                            End Time*
                          </label>
                          <div className="mt-1">
                            <input
                              type="time"
                              name="endTime"
                              id="endTime"
                              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                validationErrors.endTime ? 'border-red-300' : ''
                              }`}
                              value={sessionData.endTime}
                              onChange={handleInputChange}
                            />
                            {validationErrors.endTime && (
                              <p className="mt-2 text-sm text-red-600">{validationErrors.endTime}</p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <div className="relative flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="isPublished"
                                name="isPublished"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                checked={sessionData.isPublished}
                                onChange={() => handleCheckboxChange('isPublished')}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="isPublished" className="font-medium text-gray-700">
                                Publish on schedule
                              </label>
                              <p className="text-gray-500">
                                When enabled, this session will be visible to attendees on the event schedule
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="sm:col-span-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      Location
                    </h3>
                    <div className="mt-1 border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Venue / Room*
                          </label>
                          <div className="mt-1">
                            <select
                              id="location"
                              name="location"
                              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                validationErrors.location ? 'border-red-300' : ''
                              }`}
                              value={sessionData.location}
                              onChange={handleInputChange}
                            >
                              <option value="">Select a venue</option>
                              {venues.map(venue => (
                                <option key={venue.id} value={venue.id}>
                                  {venue.name} (Capacity: {venue.capacity})
                                </option>
                              ))}
                            </select>
                            {validationErrors.location && (
                              <p className="mt-2 text-sm text-red-600">{validationErrors.location}</p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                            Maximum Capacity
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              name="capacity"
                              id="capacity"
                              min="1"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={sessionData.capacity}
                              onChange={handleInputChange}
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            Leave blank to use venue's default capacity
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Speakers */}
                  <div className="sm:col-span-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      {sessionData.sessionType === 'panel' ? 'Panelists' : 'Speaker'}
                    </h3>
                    <div className="mt-1 border-t border-gray-200 pt-4">
                      {sessionData.sessionType === 'panel' ? (
                        <div>
                          <legend className="text-sm font-medium text-gray-700">
                            Select panelists for this session*
                          </legend>
                          <div className="mt-2 space-y-2">
                            {speakers.map(speaker => (
                              <div key={speaker.id} className="relative flex items-start">
                                <div className="flex items-center h-5">
                                  <input
                                    id={`speaker-${speaker.id}`}
                                    name={`speaker-${speaker.id}`}
                                    type="checkbox"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    checked={sessionData.speakerIds?.includes(speaker.id)}
                                    onChange={() => handleMultiSpeakerChange(speaker.id)}
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label htmlFor={`speaker-${speaker.id}`} className="font-medium text-gray-700">
                                    {speaker.name}
                                  </label>
                                  <p className="text-gray-500">{speaker.title}, {speaker.company}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          {validationErrors.speakerIds && (
                            <p className="mt-2 text-sm text-red-600">{validationErrors.speakerIds}</p>
                          )}
                        </div>
                      ) : (
                        <div className="sm:col-span-3">
                          <label htmlFor="speakerId" className="block text-sm font-medium text-gray-700">
                            Select Speaker*
                          </label>
                          <div className="mt-1">
                            <select
                              id="speakerId"
                              name="speakerId"
                              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                validationErrors.speakerId ? 'border-red-300' : ''
                              }`}
                              value={sessionData.speakerId}
                              onChange={handleInputChange}
                            >
                              <option value="">Select a speaker</option>
                              {speakers.map(speaker => (
                                <option key={speaker.id} value={speaker.id}>
                                  {speaker.name} - {speaker.title}, {speaker.company}
                                </option>
                              ))}
                            </select>
                            {validationErrors.speakerId && (
                              <p className="mt-2 text-sm text-red-600">{validationErrors.speakerId}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Settings */}
                  <div className="sm:col-span-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                      <Layers className="h-5 w-5 text-gray-400 mr-2" />
                      Additional Settings
                    </h3>
                    <div className="mt-1 border-t border-gray-200 pt-4">
                      <div className="space-y-6">
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="allowQuestions"
                              name="allowQuestions"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              checked={sessionData.allowQuestions}
                              onChange={() => handleCheckboxChange('allowQuestions')}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="allowQuestions" className="font-medium text-gray-700">
                              Allow Q&A
                            </label>
                            <p className="text-gray-500">
                              Enable attendees to submit questions during this session
                            </p>
                          </div>
                        </div>

                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="allowFeedback"
                              name="allowFeedback"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              checked={sessionData.allowFeedback}
                              onChange={() => handleCheckboxChange('allowFeedback')}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="allowFeedback" className="font-medium text-gray-700">
                              Collect Feedback
                            </label>
                            <p className="text-gray-500">
                              Allow attendees to rate and provide feedback after this session
                            </p>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                            Tags
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="tags"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="Add tags and press Enter"
                              onKeyDown={handleTagInput}
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            Tags help attendees find sessions based on topics they're interested in
                          </p>

                          {/* Display added tags */}
                          {sessionData.tags && sessionData.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {sessionData.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800"
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    className="ml-1.5 h-3.5 w-3.5 text-indigo-400 hover:text-indigo-600"
                                    onClick={() => removeTag(tag)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
            
            {/* Materials Tab */}
            {activeTab === 'materials' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    Session Materials
                  </h3>
                  <p className="text-sm text-gray-500">
                    Upload presentation slides, handouts, and other materials for this session. Attendees will be able to access these materials through the event app.
                  </p>
                </div>
                
                {/* Upload Form */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="text-base font-medium text-gray-900 mb-4">
                    Upload New Material
                  </h4>
                  <form className="space-y-4" onSubmit={handleUploadMaterial}>
                    <div>
                      <label htmlFor="material-upload" className="block text-sm font-medium text-gray-700">
                        Select File
                      </label>
                      <input
                        type="file"
                        id="material-upload"
                        onChange={handleMaterialFileChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Accepted file types: PDF, PPTX, DOCX, ZIP (max file size: 50MB)
                      </p>
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={!materialFile || materialUploading}
                        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                          materialFile && !materialUploading ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-400 cursor-not-allowed'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                      >
                        {materialUploading ? (
                          <>
                            <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-t-2 border-b-2 border-white"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="-ml-1 mr-2 h-5 w-5" />
                            Upload Material
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Materials List */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-4">
                    Materials ({sessionData.materials?.length || 0})
                  </h4>
                  
                  {sessionData.materials && sessionData.materials.length > 0 ? (
                    <div className="bg-white shadow overflow-hidden border border-gray-200 sm:rounded-md">
                      <ul className="divide-y divide-gray-200">
                        {sessionData.materials.map((material) => (
                          <li key={material.id}>
                            <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  {getFileIcon(material.type)}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {material.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {material.size} • Uploaded {new Date(material.uploadedAt).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <a
                                  href={material.downloadUrl}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMaterial(material.id)}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No materials</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Upload slides or documents for session attendees.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Attendees Tab */}
            {activeTab === 'attendees' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    Registered Attendees
                  </h3>
                  <p className="text-sm text-gray-500">
                    {sessionData.registeredAttendees || 0} {(sessionData.registeredAttendees || 0) === 1 ? 'person has' : 'people have'} registered for this session.
                  </p>
                </div>
                
                {/* Capacity Indicator */}
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-900">Registration Progress</div>
                    <div className="text-sm text-gray-500">
                      {sessionData.registeredAttendees || 0}/{sessionData.capacity} Seats
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        ((sessionData.registeredAttendees || 0) / sessionData.capacity) > 0.9 
                          ? 'bg-red-600'
                          : ((sessionData.registeredAttendees || 0) / sessionData.capacity) > 0.7
                            ? 'bg-yellow-600'
                            : 'bg-green-600'
                      }`}
                      style={{ width: `${Math.min(100, ((sessionData.registeredAttendees || 0) / sessionData.capacity) * 100)}%` }}
                    ></div>
                  </div>
                  {((sessionData.registeredAttendees || 0) / sessionData.capacity) > 0.9 && (
                    <div className="mt-2 flex items-start">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3 text-sm text-yellow-700">
                        This session is almost at capacity.
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Mock Attendee List - Replace with actual attendee data in production */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                      <div className="ml-4 mt-2">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Attendee List</h3>
                      </div>
                      <div className="ml-4 mt-2 flex-shrink-0">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <Download className="-ml-1 mr-2 h-5 w-5" />
                          Export List
                        </button>
                      </div>
                    </div>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {/* This is mock data - replace with actual attendees in production */}
                    {Array.from({ length: 5 }).map((_, index) => (
                      <li key={index}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-indigo-600 truncate">
                              {['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Chen', 'Michael Brown'][index]}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Registered
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500 mr-6">
                                <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                {['john.doe@example.com', 'jane.smith@example.com', 'robert.j@example.com', 'emily.chen@example.com', 'mbrown@example.com'][index]}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <p>
                                Registered on {['Mar 12, 2025', 'Mar 15, 2025', 'Mar 18, 2025', 'Mar 20, 2025', 'Mar 22, 2025'][index]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Previous
                      </a>
                      <a
                        href="#"
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Next
                      </a>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                          <span className="font-medium">{sessionData.registeredAttendees || 0}</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <a
                            href="#"
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                          </a>
                          <a
                            href="#"
                            aria-current="page"
                            className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                          >
                            1
                          </a>
                         <a 
                            href="#"
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                          </a>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    Session Analytics
                  </h3>
                  <p className="text-sm text-gray-500">
                    Track attendance, engagement, and feedback for this session.
                  </p>
                </div>
                
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                  {/* Registration Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5">
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Registration Rate
                          </dt>
                          <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            {Math.round(((sessionData.registeredAttendees || 0) / sessionData.capacity) * 100)}%
                          </dd>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-indigo-600 h-2.5 rounded-full"
                            style={{ width: `${Math.min(100, ((sessionData.registeredAttendees || 0) / sessionData.capacity) * 100)}%` }}
                          ></div>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          {sessionData.registeredAttendees || 0} of {sessionData.capacity} seats filled
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                          <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5">
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Average Rating
                          </dt>
                          <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            4.7/5
                          </dd>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-5 w-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 15.585l-5.172 2.718 1-5.851-4.172-4.086 5.759-.84L10 2.326l2.586 5.2 5.759.84-4.172 4.086 1 5.851z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                          <p className="ml-2 text-sm text-gray-500">
                            Based on 37 reviews
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Questions Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                          <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5">
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Questions Submitted
                          </dt>
                          <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            12
                          </dd>
                        </div>
                      </div>
                      <div className="mt-4">
                        <a
                          href="#"
                          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          View all questions
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* No Analytics Data Message */}
                {!sessionData.registeredAttendees && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Analytics Limited</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            Detailed analytics will be available after the session has started and attendees have participated.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
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
                      Are you sure you want to delete this session? All data including materials, registrations, and attendee information will be permanently removed. This action cannot be undone.
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

export default SessionDetailsPage;