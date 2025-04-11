import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Save, Trash2, Globe, DollarSign, Users, 
  MapPin, Calendar, Clock, Image, Settings, Link, Smartphone,
  Mail, Bell, Check, X, Upload, AlertTriangle, CreditCard
} from 'lucide-react';
import axios from 'axios';

const EventSettingsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [eventSettings, setEventSettings] = useState({
    general: {
      title: '',
      description: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      timezone: 'America/New_York',
      location: '',
      address: '',
      website: '',
      organizer: {
        name: '',
        email: '',
        phone: ''
      }
    },
    registration: {
      isRegistrationOpen: true,
      registrationStartDate: '',
      registrationEndDate: '',
      maxCapacity: 500,
      ticketPrice: 0,
      isPaid: false,
      allowWaitlist: true,
      requireApproval: false,
      refundPolicy: ''
    },
    visibility: {
      isPublic: true,
      isFeatured: false,
      showAttendeeList: true,
      showSpeakerList: true,
      allowSocialSharing: true,
      eventTags: []
    },
    notifications: {
      sendReminders: true,
      reminderDays: 1,
      notifyOrganizerOnRegistration: true,
      customNotifications: []
    },
    branding: {
      primaryColor: '#4f46e5',
      secondaryColor: '#818cf8',
      bannerImage: '',
      logoImage: '',
      customCSS: ''
    },
    customFields: [],
    integration: {
      enablePaymentGateway: true,
      paymentGateways: ['stripe', 'paypal'],
      enableQRCode: true,
      qrCodeSettings: {
        size: 'medium',
        includeEventDetails: true
      },
      externalCalendarSync: false,
      socialMediaLinks: {
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: ''
      }
    }
  });
  
  const handleInputChange = (section, field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEventSettings({
        ...eventSettings,
        [section]: {
          ...eventSettings[section],
          [parent]: {
            ...eventSettings[section][parent],
            [child]: value
          }
        }
      });
    } else {
      setEventSettings({
        ...eventSettings,
        [section]: {
          ...eventSettings[section],
          [field]: value
        }
      });
    }
    setHasChanges(true);
    setSaveSuccess(false);
  };
  
  const handleCheckboxChange = (section, field) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEventSettings({
        ...eventSettings,
        [section]: {
          ...eventSettings[section],
          [parent]: {
            ...eventSettings[section][parent],
            [child]: !eventSettings[section][parent][child]
          }
        }
      });
    } else {
      setEventSettings({
        ...eventSettings,
        [section]: {
          ...eventSettings[section],
          [field]: !eventSettings[section][field]
        }
      });
    }
    setHasChanges(true);
    setSaveSuccess(false);
  };

  useEffect(() => {
    const fetchEventSettings = async () => {
      try {
        setIsLoading(true);
        // In production, replace with real API call
        // const response = await axios.get(`/api/events/${eventId}/settings`);
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        
        // For demo purposes, we'll just use the default state values
        // setEventSettings(response.data.settings);
        
        // Populate with some sample data
        setEventSettings({
          ...eventSettings,
          general: {
            title: 'Tech Conference 2025',
            description: 'Annual technology conference featuring the latest in AI, web development, and cloud computing. Join industry leaders and innovators for three days of learning, networking, and inspiration.',
            startDate: '2025-06-15',
            startTime: '09:00',
            endDate: '2025-06-17',
            endTime: '18:00',
            timezone: 'America/New_York',
            location: 'San Francisco Convention Center',
            address: '747 Howard St, San Francisco, CA 94103',
            website: 'https://example.com/techconf2025',
            organizer: {
              name: 'TechEvents Inc.',
              email: 'info@techevents.com',
              phone: '+1 (555) 123-4567'
            }
          }
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching event settings:', error);
        setIsLoading(false);
      }
    };

    fetchEventSettings();
  }, [eventId]);

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      
      // In production, replace with real API call
      // await axios.put(`/api/events/${eventId}/settings`, eventSettings);
      
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      setSaveSuccess(true);
      setHasChanges(false);
      setIsSaving(false);
      
      // Clear success message after a few seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving event settings:', error);
      setIsSaving(false);
      // Show error notification
    }
  };

  const handleDeleteEvent = async () => {
    try {
      // In production, replace with real API call
      // await axios.delete(`/api/events/${eventId}`);
      
      // Mock delete operation
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      setShowDeleteModal(false);
      
      // Redirect to events list
      navigate('/organizer/events', { 
        state: { message: 'Event successfully deleted', type: 'success' } 
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      // Show error notification
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
              onClick={() => navigate(`/organizer/events/${eventId}`)}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                Event Settings
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Configure all aspects of {eventSettings.general.title}
              </p>
            </div>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="-ml-1 mr-2 h-5 w-5 text-red-500" />
              Delete Event
            </button>
            <button
              type="button"
              onClick={handleSaveSettings}
              disabled={!hasChanges || isSaving}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                hasChanges ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="-ml-1 mr-2 h-5 w-5" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>

        {/* Save Success Message */}
        {saveSuccess && (
          <div className="mb-6 rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Settings saved successfully
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Content */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('general')}
                className={`${
                  activeTab === 'general'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                General
              </button>
              <button
                onClick={() => setActiveTab('registration')}
                className={`${
                  activeTab === 'registration'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Registration
              </button>
              <button
                onClick={() => setActiveTab('visibility')}
                className={`${
                  activeTab === 'visibility'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Visibility
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`${
                  activeTab === 'notifications'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('branding')}
                className={`${
                  activeTab === 'branding'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Branding
              </button>
              <button
                onClick={() => setActiveTab('customFields')}
                className={`${
                  activeTab === 'customFields'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Custom Fields
              </button>
              <button
                onClick={() => setActiveTab('integration')}
                className={`${
                  activeTab === 'integration'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Integration
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Event Title
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={eventSettings.general.title}
                          onChange={(e) => handleInputChange('general', 'title', e.target.value)}
                        />
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
                          value={eventSettings.general.description}
                          onChange={(e) => handleInputChange('general', 'description', e.target.value)}
                        ></textarea>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description of your event. This will be visible to potential attendees.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Date and Time
                  </h3>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          name="startDate"
                          id="startDate"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={eventSettings.general.startDate}
                          onChange={(e) => handleInputChange('general', 'startDate', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                        Start Time
                      </label>
                      <div className="mt-1">
                        <input
                          type="time"
                          name="startTime"
                          id="startTime"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={eventSettings.general.startTime}
                          onChange={(e) => handleInputChange('general', 'startTime', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          name="endDate"
                          id="endDate"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={eventSettings.general.endDate}
                          onChange={(e) => handleInputChange('general', 'endDate', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                        End Time
                      </label>
                      <div className="mt-1">
                        <input
                          type="time"
                          name="endTime"
                          id="endTime"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={eventSettings.general.endTime}
                          onChange={(e) => handleInputChange('general', 'endTime', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                        Timezone
                      </label>
                      <div className="mt-1">
                        <select
                          id="timezone"
                          name="timezone"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={eventSettings.general.timezone}
                          onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                          <option value="Europe/Paris">Central European Time (CET)</option>
                          <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
                          <option value="Australia/Sydney">Australian Eastern Time (AET)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Location
                  </h3>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Venue Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="location"
                          id="location"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={eventSettings.general.location}
                          onChange={(e) => handleInputChange('general', 'location', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="address"
                          id="address"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={eventSettings.general.address}
                          onChange={(e) => handleInputChange('general', 'address', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Organizer Information
                  </h3>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="organizerName" className="block text-sm font-medium text-gray-700">
                        Organizer Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="organizerName"
                          id="organizerName"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={eventSettings.general.organizer.name}
                          onChange={(e) => handleInputChange('general', 'organizer.name', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="organizerEmail" className="block text-sm font-medium text-gray-700">
                        Contact Email
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="organizerEmail"
                          id="organizerEmail"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={eventSettings.general.organizer.email}
                          onChange={(e) => handleInputChange('general', 'organizer.email', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="organizerPhone" className="block text-sm font-medium text-gray-700">
                        Contact Phone
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          name="organizerPhone"
                          id="organizerPhone"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={eventSettings.general.organizer.phone}
                          onChange={(e) => handleInputChange('general', 'organizer.phone', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Event Website
                      </label>
                      <div className="mt-1">
                        <input
                          type="url"
                          name="website"
                          id="website"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="https://"
                          value={eventSettings.general.website}
                          onChange={(e) => handleInputChange('general', 'website', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Registration Settings */}
            {activeTab === 'registration' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Registration Options
                  </h3>
                  <div className="space-y-6">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="isRegistrationOpen"
                          name="isRegistrationOpen"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={eventSettings.registration.isRegistrationOpen}
                          onChange={() => handleCheckboxChange('registration', 'isRegistrationOpen')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="isRegistrationOpen" className="font-medium text-gray-700">
                          Registration is open
                        </label>
                        <p className="text-gray-500">When enabled, attendees can register for this event</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="registrationStartDate" className="block text-sm font-medium text-gray-700">
                          Registration Start Date
                        </label>
                        <div className="mt-1">
                          <input
                            type="date"
                            name="registrationStartDate"
                            id="registrationStartDate"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={eventSettings.registration.registrationStartDate}
                            onChange={(e) => handleInputChange('registration', 'registrationStartDate', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="registrationEndDate" className="block text-sm font-medium text-gray-700">
                          Registration End Date
                        </label>
                        <div className="mt-1">
                          <input
                            type="date"
                            name="registrationEndDate"
                            id="registrationEndDate"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={eventSettings.registration.registrationEndDate}
                            onChange={(e) => handleInputChange('registration', 'registrationEndDate', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="maxCapacity" className="block text-sm font-medium text-gray-700">
                          Maximum Capacity
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            name="maxCapacity"
                            id="maxCapacity"
                            min="1"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={eventSettings.registration.maxCapacity}
                            onChange={(e) => handleInputChange('registration', 'maxCapacity', Number(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Payment Settings
                  </h3>
                  <div className="space-y-6">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="isPaid"
                          name="isPaid"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={eventSettings.registration.isPaid}
                          onChange={() => handleCheckboxChange('registration', 'isPaid')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="isPaid" className="font-medium text-gray-700">
                          This is a paid event
                        </label>
                        <p className="text-gray-500">When enabled, attendees must pay to register</p>
                      </div>
                    </div>

                    {eventSettings.registration.isPaid && (
                      <div className="sm:col-span-3">
                        <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700">
                          Ticket Price ($)
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            name="ticketPrice"
                            id="ticketPrice"
                            min="0"
                            step="0.01"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={eventSettings.registration.ticketPrice}
                            onChange={(e) => handleInputChange('registration', 'ticketPrice', Number(e.target.value))}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Additional Options
                  </h3>
                  <div className="space-y-6">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="allowWaitlist"
                          name="allowWaitlist"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={eventSettings.registration.allowWaitlist}
                          onChange={() => handleCheckboxChange('registration', 'allowWaitlist')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="allowWaitlist" className="font-medium text-gray-700">
                          Enable waitlist
                        </label>
                        <p className="text-gray-500">Allow attendees to join a waitlist when event is at capacity</p>
                      </div>
                    </div>

                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="requireApproval"
                          name="requireApproval"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={eventSettings.registration.requireApproval}
                          onChange={() => handleCheckboxChange('registration', 'requireApproval')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="requireApproval" className="font-medium text-gray-700">
                          Require approval
                        </label>
                        <p className="text-gray-500">Manually approve each registration before confirmation</p>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="refundPolicy" className="block text-sm font-medium text-gray-700">
                        Refund Policy
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="refundPolicy"
                          name="refundPolicy"
                          rows="4"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={eventSettings.registration.refundPolicy}
                          onChange={(e) => handleInputChange('registration', 'refundPolicy', e.target.value)}
                        ></textarea>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Describe your refund policy for canceled registrations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Visibility Settings */}
            {activeTab === 'visibility' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Visibility Options
                  </h3>
                  <div className="space-y-6">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="isPublic"
                          name="isPublic"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={eventSettings.visibility.isPublic}
                          onChange={() => handleCheckboxChange('visibility', 'isPublic')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="isPublic" className="font-medium text-gray-700">
                          Public event
                        </label>
                        <p className="text-gray-500">
                          When enabled, this event will be visible to everyone in the public event directory
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="isFeatured"
                          name="isFeatured"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={eventSettings.visibility.isFeatured}
                          onChange={() => handleCheckboxChange('visibility', 'isFeatured')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="isFeatured" className="font-medium text-gray-700">
                          Featured event
                        </label>
                        <p className="text-gray-500">
                          When enabled, this event may be highlighted in the featured section
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="showAttendeeList"
                          name="showAttendeeList"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={eventSettings.visibility.showAttendeeList}
                          onChange={() => handleCheckboxChange('visibility', 'showAttendeeList')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="showAttendeeList" className="font-medium text-gray-700">
                          Show attendee list
                        </label>
                        <p className="text-gray-500">
                          When enabled, the list of registered attendees will be visible to all attendees
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="showSpeakerList"
                          name="showSpeakerList"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={eventSettings.visibility.showSpeakerList}
                          onChange={() => handleCheckboxChange('visibility', 'showSpeakerList')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="showSpeakerList" className="font-medium text-gray-700">
                          Show speaker list
                        </label>
                        <p className="text-gray-500">
                          When enabled, the list of speakers will be visible on the event page
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="allowSocialSharing"
                          name="allowSocialSharing"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={eventSettings.visibility.allowSocialSharing}
                          onChange={() => handleCheckboxChange('visibility', 'allowSocialSharing')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="allowSocialSharing" className="font-medium text-gray-700">
                          Enable social sharing
                        </label>
                        <p className="text-gray-500">
                          When enabled, social sharing buttons will be displayed on the event page
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Event Tags
                  </h3>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="eventTags"
                      id="eventTags"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="technology, conference, developer (comma separated)"
                      value={eventSettings.visibility.eventTags.join(', ')}
                      onChange={(e) => {
                        const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                        handleInputChange('visibility', 'eventTags', tagsArray);
                      }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Tags help people discover your event when browsing by category
                  </p>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Notification Settings
                  </h3>
                  <div className="space-y-6">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="sendReminders"
                          name="sendReminders"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={eventSettings.notifications.sendReminders}
                          onChange={() => handleCheckboxChange('notifications', 'sendReminders')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="sendReminders" className="font-medium text-gray-700">
                          Send event reminders
                        </label>
                        <p className="text-gray-500">
                          Automatically send reminder notifications to attendees before the event
                        </p>
                      </div>
                    </div>

                    {eventSettings.notifications.sendReminders && (
                      <div className="sm:col-span-3">
                        <label htmlFor="reminderDays" className="block text-sm font-medium text-gray-700">
                          Days before event
                        </label>
                        <div className="mt-1">
                          <select
                            id="reminderDays"
                            name="reminderDays"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={eventSettings.notifications.reminderDays}
                            onChange={(e) => handleInputChange('notifications', 'reminderDays', Number(e.target.value))}
                          >
                            <option value="1">1 day before</option>
                            <option value="2">2 days before</option>
                            <option value="3">3 days before</option>
                            <option value="5">5 days before</option>
                            <option value="7">1 week before</option>
                            <option value="14">2 weeks before</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notifyOrganizerOnRegistration"
                          name="notifyOrganizerOnRegistration"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={eventSettings.notifications.notifyOrganizerOnRegistration}
                          onChange={() => handleCheckboxChange('notifications', 'notifyOrganizerOnRegistration')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notifyOrganizerOnRegistration" className="font-medium text-gray-700">
                          Notify me on new registrations
                        </label>
                        <p className="text-gray-500">
                          Receive an email notification when someone registers for your event
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Custom Notifications
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-center text-gray-500">
                      Custom notifications allow you to schedule specific messages to attendees.
                      <br />
                      Custom notification feature will be available in the next update.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Branding Settings */}
            {activeTab === 'branding' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Event Branding
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
                        Primary Color
                      </label>
                      <div className="mt-1 flex items-center">
                        <div 
                          className="w-8 h-8 rounded border border-gray-300 mr-2"
                          style={{ backgroundColor: eventSettings.branding.primaryColor }}
                        ></div>
                        <input
                          type="color"
                          id="primaryColor"
                          name="primaryColor"
                          value={eventSettings.branding.primaryColor}
                          onChange={(e) => handleInputChange('branding', 'primaryColor', e.target.value)}
                          className="h-10"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Main color used for buttons, links, and highlights
                      </p>
                    </div>

                    <div>
                      <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700">
                        Secondary Color
                      </label>
                      <div className="mt-1 flex items-center">
                        <div 
                          className="w-8 h-8 rounded border border-gray-300 mr-2"
                          style={{ backgroundColor: eventSettings.branding.secondaryColor }}
                        ></div>
                        <input
                          type="color"
                          id="secondaryColor"
                          name="secondaryColor"
                          value={eventSettings.branding.secondaryColor}
                          onChange={(e) => handleInputChange('branding', 'secondaryColor', e.target.value)}
                          className="h-10"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Accent color used for secondary elements
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Event Images
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Banner Image</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="banner-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input id="banner-upload" name="banner-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Banner image displayed at the top of your event page. Recommended size: 1200x600
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Logo Image</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="logo-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input id="logo-upload" name="logo-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Logo displayed on your event page. Recommended size: 400x400
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Advanced Styling
                  </h3>
                  <div>
                    <label htmlFor="customCSS" className="block text-sm font-medium text-gray-700">
                      Custom CSS
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="customCSS"
                        name="customCSS"
                        rows="4"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md font-mono"
                        placeholder=".event-title { font-size: 24px; }"
                        value={eventSettings.branding.customCSS}
                        onChange={(e) => handleInputChange('branding', 'customCSS', e.target.value)}
                      ></textarea>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Add custom CSS to further customize the appearance of your event page
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Custom Fields Settings */}
            {activeTab === 'customFields' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Registration Form Custom Fields
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Add custom fields to collect additional information from attendees during registration.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-center text-gray-500">
                      Custom fields feature will be available in the next update.
                      <br />
                      This will allow you to create text fields, dropdowns, checkboxes, and more.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Integration Settings */}
            {activeTab === 'integration' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Payment Integrations
                  </h3>
                  <div className="space-y-6">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="enablePaymentGateway"
                          name="enablePaymentGateway"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={eventSettings.integration.enablePaymentGateway}
                          onChange={() => handleCheckboxChange('integration', 'enablePaymentGateway')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="enablePaymentGateway" className="font-medium text-gray-700">
                          Enable payment gateway
                        </label>
                        <p className="text-gray-500">
                          When enabled, attendees can pay for tickets online
                        </p>
                      </div>
                    </div>

                    {eventSettings.integration.enablePaymentGateway && (
                      <div>
                        <fieldset>
                          <legend className="text-sm font-medium text-gray-700">
                            Payment Gateways
                          </legend>
                          <div className="mt-4 space-y-4">
                            <div className="flex items-center">
                              <input
                                id="stripe"
                                name="paymentGateways"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                checked={eventSettings.integration.paymentGateways.includes('stripe')}
                                onChange={() => {
                                  const newGateways = eventSettings.integration.paymentGateways.includes('stripe')
                                    ? eventSettings.integration.paymentGateways.filter(g => g !== 'stripe')
                                    : [...eventSettings.integration.paymentGateways, 'stripe'];
                                  handleInputChange('integration', 'paymentGateways', newGateways);
                                }}
                              />
                              <label htmlFor="stripe" className="ml-3 block text-sm font-medium text-gray-700">
                                Stripe
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="paypal"
                                name="paymentGateways"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                checked={eventSettings.integration.paymentGateways.includes('paypal')}
                                onChange={() => {
                                  const newGateways = eventSettings.integration.paymentGateways.includes('paypal')
                                    ? eventSettings.integration.paymentGateways.filter(g => g !== 'paypal')
                                    : [...eventSettings.integration.paymentGateways, 'paypal'];
                                  handleInputChange('integration', 'paymentGateways', newGateways);
                                }}
                              />
                              <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                                PayPal
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    QR Code Payment
                  </h3>
                  <div className="space-y-6">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="enableQRCode"
                          name="enableQRCode"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={eventSettings.integration.enableQRCode}
                          onChange={() => handleCheckboxChange('integration', 'enableQRCode')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="enableQRCode" className="font-medium text-gray-700">
                          Enable QR code payments
                        </label>
                        <p className="text-gray-500">
                          When enabled, attendees can scan a QR code to pay for registration
                        </p>
                      </div>
                    </div>

                    {eventSettings.integration.enableQRCode && (
                      <div>
                        <label htmlFor="qrCodeSize" className="block text-sm font-medium text-gray-700">
                          QR Code Size
                        </label>
                        <div className="mt-1">
                          <select
                            id="qrCodeSize"
                            name="qrCodeSize"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={eventSettings.integration.qrCodeSettings.size}
                            onChange={(e) => {
                              const newSettings = {
                                ...eventSettings.integration.qrCodeSettings,
                                size: e.target.value
                              };
                              handleInputChange('integration', 'qrCodeSettings', newSettings);
                            }}
                          >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {eventSettings.integration.enableQRCode && (
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="includeEventDetails"
                            name="includeEventDetails"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            checked={eventSettings.integration.qrCodeSettings.includeEventDetails}
                            onChange={() => {
                              const newSettings = {
                                ...eventSettings.integration.qrCodeSettings,
                                includeEventDetails: !eventSettings.integration.qrCodeSettings.includeEventDetails
                              };
                              handleInputChange('integration', 'qrCodeSettings', newSettings);
                            }}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="includeEventDetails" className="font-medium text-gray-700">
                            Include event details in QR code
                          </label>
                          <p className="text-gray-500">
                            When enabled, the QR code will contain event name and date
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Social Media
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                        Facebook Page URL
                      </label>
                      <div className="mt-1">
                        <input
                          type="url"
                          name="facebook"
                          id="facebook"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="https://facebook.com/..."
                          value={eventSettings.integration.socialMediaLinks.facebook}
                          onChange={(e) => {
                            const newLinks = {
                              ...eventSettings.integration.socialMediaLinks,
                              facebook: e.target.value
                            };
                            handleInputChange('integration', 'socialMediaLinks', newLinks);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                        Twitter/X Profile URL
                      </label>
                      <div className="mt-1">
                        <input
                          type="url"
                          name="twitter"
                          id="twitter"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="https://twitter.com/..."
                          value={eventSettings.integration.socialMediaLinks.twitter}
                          onChange={(e) => {
                            const newLinks = {
                              ...eventSettings.integration.socialMediaLinks,
                              twitter: e.target.value
                            };
                            handleInputChange('integration', 'socialMediaLinks', newLinks);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                        LinkedIn URL
                      </label>
                      <div className="mt-1">
                        <input
                          type="url"
                          name="linkedin"
                          id="linkedin"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="https://linkedin.com/..."
                          value={eventSettings.integration.socialMediaLinks.linkedin}
                          onChange={(e) => {
                            const newLinks = {
                              ...eventSettings.integration.socialMediaLinks,
                              linkedin: e.target.value
                            };
                            handleInputChange('integration', 'socialMediaLinks', newLinks);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                        Instagram URL
                      </label>
                      <div className="mt-1">
                        <input
                          type="url"
                          name="instagram"
                          id="instagram"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="https://instagram.com/..."
                          value={eventSettings.integration.socialMediaLinks.instagram}
                          onChange={(e) => {
                            const newLinks = {
                              ...eventSettings.integration.socialMediaLinks,
                              instagram: e.target.value
                            };
                            handleInputChange('integration', 'socialMediaLinks', newLinks);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Calendar Integration
                  </h3>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="externalCalendarSync"
                        name="externalCalendarSync"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        checked={eventSettings.integration.externalCalendarSync}
                        onChange={() => handleCheckboxChange('integration', 'externalCalendarSync')}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="externalCalendarSync" className="font-medium text-gray-700">
                        Enable calendar synchronization
                      </label>
                      <p className="text-gray-500">
                        When enabled, attendees can add this event to their calendar (Google, Apple, Outlook)
                      </p>
                    </div>
                  </div>
                </div>
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
                    Delete Event
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this event? All data including sessions, registrations, and attendee information will be permanently removed.
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

export default EventSettingsPage;