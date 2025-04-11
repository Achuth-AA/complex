import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Send, User, Users, Clock, CheckCircle,
  AlertTriangle, Bell, MessageSquare, UserPlus, Calendar
} from 'lucide-react';
import axios from 'axios';

const NotificationCreationPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [event, setEvent] = useState(null);
  const [audiences, setAudiences] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    audienceId: '',
    sendNow: true,
    scheduledTime: '',
    notificationType: 'all', // 'all', 'email', 'push'
    includeSpeakers: false,
    includeAttendees: true,
    includeOrganizers: false
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, these would be API calls
        // const eventResponse = await axios.get(`/api/events/${eventId}`);
        // const audiencesResponse = await axios.get(`/api/events/${eventId}/audience-segments`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Mock event data
        const mockEvent = {
          id: eventId,
          title: 'Tech Conference 2025'
        };
        
        // Mock audience segments
        const mockAudiences = [
          { id: 'all', name: 'All Attendees' },
          { id: 'vip', name: 'VIP Attendees' },
          { id: 'day1', name: 'Day 1 Attendees' },
          { id: 'workshop', name: 'Workshop Attendees' },
          { id: 'custom1', name: 'Mobile App Users' }
        ];
        
        setEvent(mockEvent);
        setAudiences(mockAudiences);
        setNotification(prev => ({
          ...prev,
          audienceId: mockAudiences[0].id
        }));
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [eventId]);
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkboxes vs other inputs
    const newValue = type === 'checkbox' ? checked : value;
    
    setNotification(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!notification.title.trim()) {
      newErrors.title = 'Notification title is required';
    }
    
    if (!notification.message.trim()) {
      newErrors.message = 'Message content is required';
    }
    
    if (!notification.audienceId) {
      newErrors.audienceId = 'Please select an audience';
    }
    
    if (!notification.sendNow && !notification.scheduledTime) {
      newErrors.scheduledTime = 'Please select a scheduled time';
    }
    
    // If not any recipient type is selected
    if (!notification.includeAttendees && !notification.includeSpeakers && !notification.includeOrganizers) {
      newErrors.recipients = 'Please select at least one recipient group';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Send notification
  const handleSendNotification = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSending(true);
    
    try {
      // In a real app, this would be an API call
      // await axios.post(`/api/events/${eventId}/notifications`, notification);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccessMessage('Notification sent successfully!');
      
      setTimeout(() => {
        navigate(`/organizer/events/${eventId}/notifications/history`);
      }, 2000);
    } catch (error) {
      console.error('Error sending notification:', error);
      setIsSending(false);
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
            onClick={() => navigate(`/organizer/events/${eventId}/notifications`)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
              Create Notification
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Send notifications to attendees, speakers, and organizers
            </p>
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}/notifications/segments`)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
          >
            <UserPlus className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Manage Audiences
          </button>
        </div>
      </div>
      
      {/* Success Message */}
      {successMessage && (
        <div className="rounded-md bg-green-50 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Form */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <Bell className="mr-2 h-5 w-5 text-gray-500" />
            Notification Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Create a notification for {event?.title}
          </p>
        </div>
        
        <form onSubmit={handleSendNotification}>
          <div className="px-4 py-5 sm:p-6 space-y-6">
            {/* Notification Info */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Notification Title*
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className={`block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${
                      errors.title ? 'border-red-300' : ''
                    }`}
                    placeholder="E.g., Schedule Update, Important Announcement"
                    value={notification.title}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message Content*
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className={`block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${
                      errors.message ? 'border-red-300' : ''
                    }`}
                    placeholder="Your notification message..."
                    value={notification.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Keep your message clear and concise. You can use basic formatting such as *bold* and _italic_.
                </p>
              </div>
            </div>
            
            {/* Recipients */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Recipients</h4>
              
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div>
                    <label htmlFor="audienceId" className="block text-sm font-medium text-gray-700">
                      Select Audience Segment*
                    </label>
                    <div className="mt-1">
                      <select
                        id="audienceId"
                        name="audienceId"
                        className={`block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${
                          errors.audienceId ? 'border-red-300' : ''
                        }`}
                        value={notification.audienceId}
                        onChange={handleInputChange}
                      >
                        {audiences.map(audience => (
                          <option key={audience.id} value={audience.id}>{audience.name}</option>
                        ))}
                      </select>
                    </div>
                    {errors.audienceId && (
                      <p className="mt-1 text-sm text-red-600">{errors.audienceId}</p>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => navigate(`/organizer/events/${eventId}/notifications/segments`)}
                    className="mt-3 sm:mt-0 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <UserPlus className="mr-1.5 h-4 w-4 text-gray-500" />
                    Create New Segment
                  </button>
                </div>
              </div>
              
              <fieldset>
                <legend className="text-sm font-medium text-gray-700">Recipient Types</legend>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      id="includeAttendees"
                      name="includeAttendees"
                      type="checkbox"
                      checked={notification.includeAttendees}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="includeAttendees" className="ml-3 text-sm text-gray-700">
                      Attendees
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="includeSpeakers"
                      name="includeSpeakers"
                      type="checkbox"
                      checked={notification.includeSpeakers}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="includeSpeakers" className="ml-3 text-sm text-gray-700">
                      Speakers
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="includeOrganizers"
                      name="includeOrganizers"
                      type="checkbox"
                      checked={notification.includeOrganizers}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="includeOrganizers" className="ml-3 text-sm text-gray-700">
                      Team Members/Organizers
                    </label>
                  </div>
                </div>
                {errors.recipients && (
                  <p className="mt-1 text-sm text-red-600">{errors.recipients}</p>
                )}
              </fieldset>
            </div>
            
            {/* Delivery Options */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Delivery Options</h4>
              
              <fieldset className="mb-4">
                <legend className="text-sm text-gray-700">Notification Type</legend>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      id="notificationType-all"
                      name="notificationType"
                      type="radio"
                      value="all"
                      checked={notification.notificationType === 'all'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="notificationType-all" className="ml-3 text-sm text-gray-700">
                      All Channels (Email & Push)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="notificationType-email"
                      name="notificationType"
                      type="radio"
                      value="email"
                      checked={notification.notificationType === 'email'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="notificationType-email" className="ml-3 text-sm text-gray-700">
                      Email Only
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="notificationType-push"
                      name="notificationType"
                      type="radio"
                      value="push"
                      checked={notification.notificationType === 'push'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="notificationType-push" className="ml-3 text-sm text-gray-700">
                      Push Notification Only
                    </label>
                  </div>
                </div>
              </fieldset>
              
              <fieldset>
                <legend className="text-sm text-gray-700">Timing</legend>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="sendNow"
                      name="sendNow"
                      type="checkbox"
                      checked={notification.sendNow}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sendNow" className="ml-3 text-sm text-gray-700">
                      Send immediately
                    </label>
                  </div>
                  
                  {!notification.sendNow && (
                    <div>
                      <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700">
                        Schedule for later
                      </label>
                      <div className="mt-1">
                        <input
                          type="datetime-local"
                          name="scheduledTime"
                          id="scheduledTime"
                          className={`block shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${
                            errors.scheduledTime ? 'border-red-300' : ''
                          }`}
                          value={notification.scheduledTime}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.scheduledTime && (
                        <p className="mt-1 text-sm text-red-600">{errors.scheduledTime}</p>
                      )}
                    </div>
                  )}
                </div>
              </fieldset>
            </div>
            
            {/* Preview */}
            <div className="bg-gray-50 rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
              <div className="bg-white rounded-md p-4 border border-gray-200">
                <div className="font-semibold">{notification.title || "Your notification title"}</div>
                <div className="mt-2 text-sm whitespace-pre-wrap">{notification.message || "Your message will appear here..."}</div>
                <div className="mt-3 text-xs text-gray-500">
                  Recipients: {notification.audienceId ? audiences.find(a => a.id === notification.audienceId)?.name : 'No audience selected'} 
                  {notification.includeAttendees ? ' • Attendees' : ''}
                  {notification.includeSpeakers ? ' • Speakers' : ''}
                  {notification.includeOrganizers ? ' • Organizers' : ''}
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between items-center">
            <div className="text-sm text-gray-500 flex items-center">
              {notification.sendNow ? (
                <>
                  <Bell className="h-5 w-5 text-gray-400 mr-1.5" />
                  Will be sent immediately after submission
                </>
              ) : (
                <>
                  <Clock className="h-5 w-5 text-gray-400 mr-1.5" />
                  Will be sent at scheduled time
                </>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={() => navigate(`/organizer/events/${eventId}/notifications`)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  isSending ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isSending ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="-ml-1 mr-2 h-5 w-5" />
                    Send Notification
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

export default NotificationCreationPage;