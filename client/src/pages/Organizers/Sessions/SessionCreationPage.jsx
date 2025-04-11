import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Save, Clock, Calendar, MapPin, User,
  Users, Info, MessageSquare, Layers, AlertTriangle
} from 'lucide-react';
import axios from 'axios';

const SessionCreationPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  
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
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        
        // In production, these would be real API calls
        // const eventResponse = await axios.get(`/api/events/${eventId}`);
        // const speakersResponse = await axios.get(`/api/events/${eventId}/speakers`);
        // const venuesResponse = await axios.get(`/api/events/${eventId}/venues`);
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
        
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
        
        setEvent(mockEvent);
        setSpeakers(mockSpeakers);
        setVenues(mockVenues);
        
        // Pre-fill date field with event start date
        setSessionData(prevData => ({
          ...prevData,
          date: mockEvent.startDate
        }));
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, [eventId]);
  
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
      const currentSpeakers = [...prevData.speakerIds];
      
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
    
    if (sessionData.sessionType === 'panel' && sessionData.speakerIds.length === 0) {
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
      // await axios.post(`/api/events/${eventId}/sessions`, sessionData);
      
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Redirect after short delay
      setTimeout(() => {
        navigate(`/organizer/events/${eventId}/sessions`);
      }, 1500);
    } catch (error) {
      console.error('Error saving session:', error);
      setIsSaving(false);
      // Handle error state
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
              onClick={() => navigate(`/organizer/events/${eventId}/sessions`)}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                Create New Session
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Add a new session to {event?.title}
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Session created successfully! Redirecting...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
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
                                  checked={sessionData.speakerIds.includes(speaker.id)}
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
                        {sessionData.tags.length > 0 && (
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
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="mr-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => navigate(`/organizer/events/${eventId}/sessions`)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving || saveSuccess}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  (isSaving || saveSuccess) ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : saveSuccess ? (
                  <>
                    <svg className="-ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="-ml-1 mr-2 h-4 w-4" />
                    Create Session
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionCreationPage;