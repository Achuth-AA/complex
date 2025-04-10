import React, { useState } from 'react';
import { 
  Calendar, Clock, Users, MessageSquare, Bell, Settings, 
  ChevronDown, Search, LogOut, Menu, X, BarChart2,
  Briefcase, Award, CheckSquare, TrendingUp, Image,
  Save, ChevronRight, Plus, Trash2, Upload, Link, 
  DollarSign, MapPin, Edit2, Globe, Check, PlusCircle
} from 'lucide-react';

const EventCreationPage = () => {
  const [activeSection, setActiveSection] = useState('details');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [eventData, setEventData] = useState({
    name: '',
    tagline: '',
    description: '',
    eventType: 'conference',
    category: '',
    startDate: '',
    endDate: '',
    timezone: 'UTC-5',
    venueName: '',
    venueAddress: '',
    venueCity: '',
    venueState: '',
    venueCountry: '',
    venueZip: '',
    capacity: '',
    isVirtual: false,
    isHybrid: false,
    isFeatured: false,
    registrationTypes: [
      { id: 1, name: 'Standard', price: '299', capacity: '500', description: 'Access to all standard sessions' },
      { id: 2, name: 'Premium', price: '499', capacity: '200', description: 'Access to all sessions including workshops' },
      { id: 3, name: 'VIP', price: '999', capacity: '50', description: 'All access pass with exclusive networking events' }
    ],
    earlyBirdEndDate: '',
    earlyBirdDiscount: '20',
    brandingColors: {
      primary: '#4f46e5',
      secondary: '#818cf8',
      accent: '#c7d2fe'
    },
    website: '',
    socialLinks: {
      twitter: '',
      facebook: '',
      linkedin: '',
      instagram: ''
    }
  });

  // Helper functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedInputChange = (category, field, value) => {
    setEventData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleTicketTypeChange = (id, field, value) => {
    setEventData(prev => ({
      ...prev,
      registrationTypes: prev.registrationTypes.map(type => 
        type.id === id ? { ...type, [field]: value } : type
      )
    }));
  };

  const addTicketType = () => {
    const newId = Math.max(...eventData.registrationTypes.map(type => type.id)) + 1;
    setEventData(prev => ({
      ...prev,
      registrationTypes: [
        ...prev.registrationTypes,
        { id: newId, name: '', price: '', capacity: '', description: '' }
      ]
    }));
  };

  const removeTicketType = (id) => {
    setEventData(prev => ({
      ...prev,
      registrationTypes: prev.registrationTypes.filter(type => type.id !== id)
    }));
  };

  const toggleCheckbox = (field) => {
    setEventData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save logic would go here
    alert('Event saved successfully!');
  };

  // Render sections
  const renderEventDetailsSection = () => (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Event Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={eventData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter event name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">
              Tagline
            </label>
            <input
              type="text"
              id="tagline"
              name="tagline"
              value={eventData.tagline}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="A short, catchy phrase describing your event"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={eventData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Describe your event"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Markdown formatting is supported.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">
                Event Type*
              </label>
              <select
                id="eventType"
                name="eventType"
                value={eventData.eventType}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="conference">Conference</option>
                <option value="seminar">Seminar</option>
                <option value="workshop">Workshop</option>
                <option value="webinar">Webinar</option>
                <option value="expo">Expo</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={eventData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="arts">Arts & Entertainment</option>
                <option value="science">Science</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-wrap space-x-4">
            <div className="flex items-center">
              <input
                id="isVirtual"
                name="isVirtual"
                type="checkbox"
                checked={eventData.isVirtual}
                onChange={() => toggleCheckbox('isVirtual')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isVirtual" className="ml-2 block text-sm text-gray-700">
                Virtual Event
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="isHybrid"
                name="isHybrid"
                type="checkbox"
                checked={eventData.isHybrid}
                onChange={() => toggleCheckbox('isHybrid')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isHybrid" className="ml-2 block text-sm text-gray-700">
                Hybrid Event
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="isFeatured"
                name="isFeatured"
                type="checkbox"
                checked={eventData.isFeatured}
                onChange={() => toggleCheckbox('isFeatured')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                Featured Event
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Date & Time</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date & Time*
              </label>
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                value={eventData.startDate}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date & Time*
              </label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={eventData.endDate}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
              Timezone*
            </label>
            <select
              id="timezone"
              name="timezone"
              value={eventData.timezone}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="UTC-12">UTC-12:00</option>
              <option value="UTC-11">UTC-11:00</option>
              <option value="UTC-10">UTC-10:00</option>
              <option value="UTC-9">UTC-9:00</option>
              <option value="UTC-8">UTC-8:00 (Pacific)</option>
              <option value="UTC-7">UTC-7:00 (Mountain)</option>
              <option value="UTC-6">UTC-6:00 (Central)</option>
              <option value="UTC-5">UTC-5:00 (Eastern)</option>
              <option value="UTC-4">UTC-4:00 (Atlantic)</option>
              <option value="UTC-3">UTC-3:00</option>
              <option value="UTC-2">UTC-2:00</option>
              <option value="UTC-1">UTC-1:00</option>
              <option value="UTC+0">UTC+0:00</option>
              <option value="UTC+1">UTC+1:00</option>
              <option value="UTC+2">UTC+2:00</option>
              <option value="UTC+3">UTC+3:00</option>
              <option value="UTC+4">UTC+4:00</option>
              <option value="UTC+5">UTC+5:00</option>
              <option value="UTC+5:30">UTC+5:30 (India)</option>
              <option value="UTC+6">UTC+6:00</option>
              <option value="UTC+7">UTC+7:00</option>
              <option value="UTC+8">UTC+8:00</option>
              <option value="UTC+9">UTC+9:00</option>
              <option value="UTC+10">UTC+10:00</option>
              <option value="UTC+11">UTC+11:00</option>
              <option value="UTC+12">UTC+12:00</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Venue & Capacity</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="venueName" className="block text-sm font-medium text-gray-700">
              Venue Name
            </label>
            <input
              type="text"
              id="venueName"
              name="venueName"
              value={eventData.venueName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter venue name"
            />
            <p className="mt-1 text-xs text-gray-500">Required for in-person and hybrid events</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="venueAddress" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="venueAddress"
                name="venueAddress"
                value={eventData.venueAddress}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Street address"
              />
            </div>
            
            <div>
              <label htmlFor="venueCity" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="venueCity"
                name="venueCity"
                value={eventData.venueCity}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="City"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="venueState" className="block text-sm font-medium text-gray-700">
                State/Province
              </label>
              <input
                type="text"
                id="venueState"
                name="venueState"
                value={eventData.venueState}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="State/Province"
              />
            </div>
            
            <div>
              <label htmlFor="venueCountry" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                id="venueCountry"
                name="venueCountry"
                value={eventData.venueCountry}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Country"
              />
            </div>
            
            <div>
              <label htmlFor="venueZip" className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                id="venueZip"
                name="venueZip"
                value={eventData.venueZip}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Postal code"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
              Total Capacity
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={eventData.capacity}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Maximum number of attendees"
              min="1"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderRegistrationSection = () => (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Registration Types & Pricing</h3>
        </div>
        <div className="p-6 space-y-8">
          {eventData.registrationTypes.map((type, index) => (
            <div key={type.id} className="border border-gray-200 rounded-lg p-4 relative">
              {eventData.registrationTypes.length > 1 && (
                <button 
                  type="button" 
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                  onClick={() => removeTicketType(type.id)}
                >
                  <Trash2 size={16} />
                </button>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label htmlFor={`ticketName-${type.id}`} className="block text-sm font-medium text-gray-700">
                    Name*
                  </label>
                  <input
                    type="text"
                    id={`ticketName-${type.id}`}
                    value={type.name}
                    onChange={(e) => handleTicketTypeChange(type.id, 'name', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g. Standard, VIP, Early Bird"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor={`ticketPrice-${type.id}`} className="block text-sm font-medium text-gray-700">
                    Price (USD)*
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      id={`ticketPrice-${type.id}`}
                      value={type.price}
                      onChange={(e) => handleTicketTypeChange(type.id, 'price', e.target.value)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                      placeholder="0.00"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">USD</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label htmlFor={`ticketCapacity-${type.id}`} className="block text-sm font-medium text-gray-700">
                    Capacity
                  </label>
                  <input
                    type="number"
                    id={`ticketCapacity-${type.id}`}
                    value={type.capacity}
                    onChange={(e) => handleTicketTypeChange(type.id, 'capacity', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Leave blank for unlimited"
                    min="1"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor={`ticketDescription-${type.id}`} className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id={`ticketDescription-${type.id}`}
                  value={type.description}
                  onChange={(e) => handleTicketTypeChange(type.id, 'description', e.target.value)}
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Describe what's included with this ticket type"
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addTicketType}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
            Add Another Ticket Type
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Discounts & Promotions</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="earlyBirdEndDate" className="block text-sm font-medium text-gray-700">
                Early Bird Discount Until
              </label>
              <input
                type="date"
                id="earlyBirdEndDate"
                name="earlyBirdEndDate"
                value={eventData.earlyBirdEndDate}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="earlyBirdDiscount" className="block text-sm font-medium text-gray-700">
                Early Bird Discount (%)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="earlyBirdDiscount"
                  name="earlyBirdDiscount"
                  value={eventData.earlyBirdDiscount}
                  onChange={handleInputChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                  placeholder="0"
                  min="0"
                  max="100"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircle className="mr-2 h-4 w-4" aria-hidden="true" />
              Add Promo Code
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Registration Settings</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="registrationOpenDate" className="block text-sm font-medium text-gray-700">
                Registration Opens
              </label>
              <input
                type="datetime-local"
                id="registrationOpenDate"
                name="registrationOpenDate"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="registrationCloseDate" className="block text-sm font-medium text-gray-700">
                Registration Closes
              </label>
              <input
                type="datetime-local"
                id="registrationCloseDate"
                name="registrationCloseDate"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap space-x-4">
            <div className="flex items-center">
              <input
                id="allowGroupRegistration"
                name="allowGroupRegistration"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="allowGroupRegistration" className="ml-2 block text-sm text-gray-700">
                Allow group registrations
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="requireApproval"
                name="requireApproval"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="requireApproval" className="ml-2 block text-sm text-gray-700">
                Require registration approval
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBrandingSection = () => (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Event Branding</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Logo
            </label>
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
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Banner Image
            </label>
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
                <p className="text-xs text-gray-500">
                  Recommended size: 1920x1080px (16:9 ratio)
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Colors
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="primaryColor" className="block text-xs font-medium text-gray-500">
                  Primary
                </label>
                <div className="mt-1 flex items-center">
                  <div 
                    className="w-8 h-8 rounded-md border border-gray-300 mr-2"
                    style={{ backgroundColor: eventData.brandingColors.primary }}
                  ></div>
                  <input
                    type="text"
                    id="primaryColor"
                    value={eventData.brandingColors.primary}
                    onChange={(e) => handleNestedInputChange('brandingColors', 'primary', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="#000000"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="secondaryColor" className="block text-xs font-medium text-gray-500">
                  Secondary
                </label>
                <div className="mt-1 flex items-center">
                  <div 
                    className="w-8 h-8 rounded-md border border-gray-300 mr-2"
                    style={{ backgroundColor: eventData.brandingColors.secondary }}
                  ></div>
                  <input
                    type="text"
                    id="secondaryColor"
                    value={eventData.brandingColors.secondary}
                    onChange={(e) => handleNestedInputChange('brandingColors', 'secondary', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="#000000"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="accentColor" className="block text-xs font-medium text-gray-500">
                  Accent
                </label>
                <div className="mt-1 flex items-center">
                  <div 
                    className="w-8 h-8 rounded-md border border-gray-300 mr-2"
                    style={{ backgroundColor: eventData.brandingColors.accent }}
                  ></div>
                  <input
                    type="text"
                    id="accentColor"
                    value={eventData.brandingColors.accent}
                    onChange={(e) => handleNestedInputChange('brandingColors', 'accent', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Online Presence</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Event Website
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                https://
              </span>
              <input
                type="text"
                id="website"
                name="website"
                value={eventData.website}
                onChange={handleInputChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                placeholder="www.youreventwebsite.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="socialTwitter" className="block text-sm font-medium text-gray-700">
                Twitter
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  twitter.com/
                </span>
                <input
                  type="text"
                  id="socialTwitter"
                  value={eventData.socialLinks.twitter}
                  onChange={(e) => handleNestedInputChange('socialLinks', 'twitter', e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="youreventhandle"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="socialFacebook" className="block text-sm font-medium text-gray-700">
                Facebook
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  facebook.com/
                </span>
                <input
                  type="text"
                  id="socialFacebook"
                  value={eventData.socialLinks.facebook}
                  onChange={(e) => handleNestedInputChange('socialLinks', 'facebook', e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="youreventpage"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="socialLinkedIn" className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  linkedin.com/
                </span>
                <input
                  type="text"
                  id="socialLinkedIn"
                  value={eventData.socialLinks.linkedin}
                  onChange={(e) => handleNestedInputChange('socialLinks', 'linkedin', e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="in/yourevent"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="socialInstagram" className="block text-sm font-medium text-gray-700">
                Instagram
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  instagram.com/
                </span>
                <input
                  type="text"
                  id="socialInstagram"
                  value={eventData.socialLinks.instagram}
                  onChange={(e) => handleNestedInputChange('socialLinks', 'instagram', e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="yourevent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-800 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-indigo-700">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-indigo-500 flex items-center justify-center mr-2">
              <Calendar size={18} />
            </div>
            <span className="text-xl font-bold">ConferenceHub</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-indigo-300 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        <div className="px-4 py-6">
          <div className="mb-8">
            <div className="px-4 py-3 bg-indigo-900 rounded-lg mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  O
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Organizer Name</p>
                  <p className="text-xs text-indigo-300">Organizer</p>
                </div>
              </div>
            </div>
          </div>
          
          <nav className="space-y-1">
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group">
              <BarChart2 className="mr-3 h-5 w-5" />
              <span className="truncate">Dashboard</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 bg-indigo-700 rounded-md group">
              <Briefcase className="mr-3 h-5 w-5" />
              <span className="truncate">Events</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <Calendar className="mr-3 h-5 w-5" />
              <span className="truncate">Sessions</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <Award className="mr-3 h-5 w-5" />
              <span className="truncate">Speakers</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <Users className="mr-3 h-5 w-5" />
              <span className="truncate">Attendees</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <MessageSquare className="mr-3 h-5 w-5" />
              <span className="truncate">Messages</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <Settings className="mr-3 h-5 w-5" />
              <span className="truncate">Settings</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-6">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)} 
              className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex-1 flex justify-center sm:justify-start">
              <ol className="hidden sm:flex items-center space-x-4">
                <li className="flex items-center">
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    Events
                  </a>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <a href="#" className="ml-4 text-indigo-600 font-medium">
                    Create New Event
                  </a>
                </li>
              </ol>
            </div>
            
            <div className="flex items-center">
              {/* Notifications */}
              <div className="relative ml-4">
                <button 
                  onClick={() => setNotificationOpen(!isNotificationOpen)}
                  className="relative p-1 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none"
                >
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative ml-4">
                <button 
                  onClick={() => setProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    O
                  </div>
                  <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                    Organizer
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Page header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Set up your event details, registration options, and branding.
                </p>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Event
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Section navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`${
                  activeSection === 'details'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveSection('details')}
              >
                Event Details
              </button>
              <button
                className={`${
                  activeSection === 'registration'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveSection('registration')}
              >
                Registration & Pricing
              </button>
              <button
                className={`${
                  activeSection === 'branding'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveSection('branding')}
              >
                Branding & Media
              </button>
              <button
                className={`${
                  activeSection === 'agenda'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveSection('agenda')}
              >
                Agenda & Sessions
              </button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <form>
            {activeSection === 'details' && renderEventDetailsSection()}
            {activeSection === 'registration' && renderRegistrationSection()}
            {activeSection === 'branding' && renderBrandingSection()}
            {activeSection === 'agenda' && (
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <p className="text-gray-500">Agenda & Sessions content will be available once basic event details are saved.</p>
              </div>
            )}
            
            {/* Navigation buttons */}
            <div className="mt-8 pt-5 border-t border-gray-200 flex justify-between">
              {activeSection !== 'details' && (
                <button
                  type="button"
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    if (activeSection === 'registration') setActiveSection('details');
                    else if (activeSection === 'branding') setActiveSection('registration');
                    else if (activeSection === 'agenda') setActiveSection('branding');
                  }}
                >
                  Previous
                </button>
              )}
              
              {activeSection !== 'agenda' ? (
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-auto"
                  onClick={() => {
                    if (activeSection === 'details') setActiveSection('registration');
                    else if (activeSection === 'registration') setActiveSection('branding');
                    else if (activeSection === 'branding') setActiveSection('agenda');
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-auto"
                  onClick={handleSave}
                >
                  Save and Finish
                </button>
              )}
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EventCreationPage;