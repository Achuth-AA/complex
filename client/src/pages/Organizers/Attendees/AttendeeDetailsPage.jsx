import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Save, User, Mail, Phone, Briefcase, 
  Building, Upload, Calendar, Link, AlertCircle, Check, 
  Tag, QrCode, RefreshCw, X, Edit2, Trash2, FileText,
  Clock, Calendar as CalendarIcon, MapPin, CheckCircle
} from 'lucide-react';
import axios from 'axios';

const AttendeeDetailsPage = () => {
  const { eventId, attendeeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're in edit mode
  const isEditMode = location.pathname.includes('/edit');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  
  const [attendeeData, setAttendeeData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    type: 'general',
    ticketType: 'full',
    notes: '',
    dietaryRequirements: '',
    emergencyContact: {
      name: '',
      phone: ''
    },
    checkedIn: false,
    sessions: []
  });
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResendEmailModal, setShowResendEmailModal] = useState(false);
  
  // Attendee types
  const attendeeTypes = [
    { id: 'general', name: 'General Attendee' },
    { id: 'speaker', name: 'Speaker' },
    { id: 'vip', name: 'VIP' },
    { id: 'sponsor', name: 'Sponsor' },
    { id: 'staff', name: 'Staff' }
  ];
  
  // Ticket types
  const ticketTypes = [
    { id: 'full', name: 'Full Pass' },
    { id: 'day', name: 'Day Pass' },
    { id: 'workshop', name: 'Workshop Only' },
    { id: 'virtual', name: 'Virtual Pass' }
  ];
  
  // Mock file upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  
  useEffect(() => {
    const fetchAttendeeData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, this would be a real API call
        // const response = await axios.get(`/api/events/${eventId}/attendees/${attendeeId}`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock attendee data
        const mockAttendee = {
          id: attendeeId,
          name: 'Jennifer Lawrence',
          email: 'jennifer.lawrence@example.com',
          phone: '+1 (555) 234-5678',
          company: 'InnoTech Solutions',
          title: 'Software Engineer',
          type: 'general',
          ticketType: 'full',
          registrationDate: '2025-02-10',
          checkInTime: '2025-06-15T09:30:00',
          checkedIn: true,
          profileImage: 'https://randomuser.me/api/portraits/women/12.jpg',
          notes: 'Interested in AI and machine learning workshops.',
          dietaryRequirements: 'Vegetarian',
          emergencyContact: {
            name: 'Michael Lawrence',
            phone: '+1 (555) 987-6543'
          },
          sessions: [
            {
              id: 'session1',
              title: 'The Future of AI',
              date: '2025-06-15',
              startTime: '10:00',
              endTime: '11:30',
              location: 'Main Hall'
            },
            {
              id: 'session4',
              title: 'Neural Networks Deep Dive',
              date: '2025-06-16',
              startTime: '09:30',
              endTime: '11:00',
              location: 'Tech Theater'
            },
            {
              id: 'session7',
              title: 'Computer Vision Applications',
              date: '2025-06-17',
              startTime: '10:00',
              endTime: '11:30',
              location: 'Innovation Lab'
            }
          ]
        };
        
        setAttendeeData(mockAttendee);
        setPhotoPreview(mockAttendee.profileImage);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching attendee data:', error);
        setIsLoading(false);
      }
    };
    
    fetchAttendeeData();
  }, [eventId, attendeeId]);
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested values (like emergencyContact.name)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setAttendeeData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setAttendeeData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle photo upload
  const handlePhotoChange = (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  
  // Handle check-in toggle
  const handleCheckInToggle = () => {
    setAttendeeData(prev => ({
      ...prev,
      checkedIn: !prev.checkedIn,
      checkInTime: !prev.checkedIn ? new Date().toISOString() : null
    }));
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!attendeeData.name.trim()) newErrors.name = 'Name is required';
    if (!attendeeData.email.trim()) newErrors.email = 'Email is required';
    
    // Simple email validation
    if (attendeeData.email && !/\S+@\S+\.\S+/.test(attendeeData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!attendeeData.type) newErrors.type = 'Attendee type is required';
    if (!attendeeData.ticketType) newErrors.ticketType = 'Ticket type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSaveAttendee = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSaving(true);
    
    try {
      // In a real app, this would be a real API call
      // const formData = new FormData();
      // Object.keys(attendeeData).forEach(key => {
      //   if (key !== 'emergencyContact' && key !== 'sessions') {
      //     formData.append(key, attendeeData[key]);
      //   }
      // });
      // formData.append('emergencyContact', JSON.stringify(attendeeData.emergencyContact));
      // if (selectedFile) formData.append('profileImage', selectedFile);
      
      // await axios.put(`/api/events/${eventId}/attendees/${attendeeId}`, formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccessMessage('Attendee information successfully updated');
      setIsSaving(false);
      
      // Clear success message after a delay
      setTimeout(() => {
        setSuccessMessage('');
        if (isEditMode) {
          navigate(`/organizer/events/${eventId}/attendees/${attendeeId}`);
        }
      }, 3000);
    } catch (error) {
      console.error('Error saving attendee data:', error);
      setIsSaving(false);
    }
  };
  
  // Handle delete attendee
  const handleDeleteAttendee = async () => {
    try {
      // In a real app, this would be a real API call
      // await axios.delete(`/api/events/${eventId}/attendees/${attendeeId}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Redirect to attendees list
      navigate(`/organizer/events/${eventId}/attendees`);
    } catch (error) {
      console.error('Error deleting attendee:', error);
    }
  };
  
  // Handle resend confirmation email
  const handleResendEmail = async () => {
    try {
      // In a real app, this would be a real API call
      // await axios.post(`/api/events/${eventId}/attendees/${attendeeId}/resend-email`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setShowResendEmailModal(false);
      setSuccessMessage('Confirmation email has been resent');
      
      // Clear success message after a delay
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error resending email:', error);
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format time for display
  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
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
  
  // Get ticket type badge color
  const getTicketTypeBadgeColor = (type) => {
    switch (type) {
      case 'full':
        return 'bg-indigo-100 text-indigo-800';
      case 'day':
        return 'bg-blue-100 text-blue-800';
      case 'workshop':
        return 'bg-green-100 text-green-800';
      case 'virtual':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}/attendees`)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
              {isEditMode ? 'Edit Attendee' : 'Attendee Details'}
            </h2>
            {!isEditMode && (
              <p className="mt-1 text-sm text-gray-500">
                {attendeeData.name}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          {isEditMode ? (
            <button
              type="button"
              onClick={handleSaveAttendee}
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
                  <Save className="-ml-1 mr-2 h-5 w-5" />
                  Save Changes
                </>
              )}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate(`/organizer/events/${eventId}/attendees/${attendeeId}/edit`)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Edit2 className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => setShowResendEmailModal(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RefreshCw className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                Resend Email
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="-ml-1 mr-2 h-5 w-5" />
                Delete
              </button>
            </>
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
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSaveAttendee}>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left columns - Main info */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Attendee Information</h3>
                  
                  {/* Check-In Status */}
                  {!isEditMode && (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {attendeeData.checkedIn ? (
                            <>
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                              <span className="text-sm font-medium text-gray-900">Checked In</span>
                              <span className="ml-2 text-sm text-gray-500">
                                {attendeeData.checkInTime ? `on ${formatDate(attendeeData.checkInTime)} at ${formatTime(attendeeData.checkInTime)}` : ''}
                              </span>
                            </>
                          ) : (
                            <>
                              <X className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm font-medium text-gray-900">Not Checked In</span>
                            </>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={handleCheckInToggle}
                          className={`inline-flex items-center px-3 py-1.5 border rounded-md shadow-sm text-sm font-medium ${
                            attendeeData.checkedIn 
                              ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50' 
                              : 'border-transparent text-white bg-green-600 hover:bg-green-700'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          {attendeeData.checkedIn ? (
                            <>
                              <X className="mr-1.5 h-4 w-4" />
                              Undo Check-In
                            </>
                          ) : (
                            <>
                              <Check className="mr-1.5 h-4 w-4" />
                              Mark as Checked In
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Status badges for view mode */}
                  {!isEditMode && (
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2.5 py-1 flex-shrink-0 inline-flex items-center text-xs font-medium rounded-full ${getAttendeeTypeBadgeColor(attendeeData.type)}`}>
                        <User className="mr-1 h-3.5 w-3.5" />
                        {attendeeTypes.find(t => t.id === attendeeData.type)?.name}
                      </span>
                      <span className={`px-2.5 py-1 flex-shrink-0 inline-flex items-center text-xs font-medium rounded-full ${getTicketTypeBadgeColor(attendeeData.ticketType)}`}>
                        <Tag className="mr-1 h-3.5 w-3.5" />
                        {ticketTypes.find(t => t.id === attendeeData.ticketType)?.name}
                      </span>
                      <span className="px-2.5 py-1 flex-shrink-0 inline-flex items-center text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        <Calendar className="mr-1 h-3.5 w-3.5" />
                        Registered on {formatDate(attendeeData.registrationDate)}
                      </span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* Full Name */}
                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name*
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={attendeeData.name}
                            onChange={handleInputChange}
                            className={`block w-full pl-10 sm:text-sm rounded-md ${
                              errors.name 
                                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                            }`}
                            placeholder="John Smith"
                          />
                        ) : (
                          <div className="block w-full pl-10 py-2 sm:text-sm border border-gray-300 rounded-md bg-gray-50">
                            {attendeeData.company}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Notes */}
                    <div className="sm:col-span-6">
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                        Notes
                      </label>
                      <div className="mt-1">
                        {isEditMode ? (
                          <textarea
                            id="notes"
                            name="notes"
                            rows="3"
                            value={attendeeData.notes}
                            onChange={handleInputChange}
                            className="block w-full sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Additional information about this attendee..."
                          ></textarea>
                        ) : (
                          <div className="block w-full p-2 sm:text-sm border border-gray-300 rounded-md bg-gray-50 min-h-[4.5rem]">
                            {attendeeData.notes || "No notes provided."}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Dietary Requirements */}
                    <div className="sm:col-span-6">
                      <label htmlFor="dietaryRequirements" className="block text-sm font-medium text-gray-700">
                        Dietary Requirements
                      </label>
                      <div className="mt-1">
                        {isEditMode ? (
                          <input
                            type="text"
                            name="dietaryRequirements"
                            id="dietaryRequirements"
                            value={attendeeData.dietaryRequirements}
                            onChange={handleInputChange}
                            className="block w-full sm:text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Vegetarian, gluten-free, etc."
                          />
                        ) : (
                          <div className="block w-full py-2 px-3 sm:text-sm border border-gray-300 rounded-md bg-gray-50">
                            {attendeeData.dietaryRequirements || "None specified"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Emergency Contact Section */}
                  <div className="pt-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Emergency Contact</h3>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      {/* Emergency Contact Name */}
                      <div className="sm:col-span-3">
                        <label htmlFor="emergencyContact.name" className="block text-sm font-medium text-gray-700">
                          Contact Name
                        </label>
                        <div className="mt-1">
                          {isEditMode ? (
                            <input
                              type="text"
                              name="emergencyContact.name"
                              id="emergencyContact.name"
                              value={attendeeData.emergencyContact?.name || ''}
                              onChange={handleInputChange}
                              className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="Contact name"
                            />
                          ) : (
                            <div className="block w-full py-2 px-3 sm:text-sm border border-gray-300 rounded-md bg-gray-50">
                              {attendeeData.emergencyContact?.name || "Not provided"}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Emergency Contact Phone */}
                      <div className="sm:col-span-3">
                        <label htmlFor="emergencyContact.phone" className="block text-sm font-medium text-gray-700">
                          Contact Phone
                        </label>
                        <div className="mt-1">
                          {isEditMode ? (
                            <input
                              type="tel"
                              name="emergencyContact.phone"
                              id="emergencyContact.phone"
                              value={attendeeData.emergencyContact?.phone || ''}
                              onChange={handleInputChange}
                              className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="Contact phone number"
                            />
                          ) : (
                            <div className="block w-full py-2 px-3 sm:text-sm border border-gray-300 rounded-md bg-gray-50">
                              {attendeeData.emergencyContact?.phone || "Not provided"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column - Photo and Sessions */}
              <div className="space-y-6">
                {/* Profile Photo */}
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Photo</h3>
                  <div className="mt-4 flex flex-col items-center">
                    <div className="h-40 w-40 rounded-full overflow-hidden bg-gray-100 mb-4">
                      {photoPreview ? (
                        <img 
                          src={photoPreview} 
                          alt={attendeeData.name || "Profile"} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <User className="h-20 w-20 text-gray-300" />
                        </div>
                      )}
                    </div>
                    {isEditMode && (
                      <>
                        <label htmlFor="photo-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <span className="flex items-center">
                            <Upload className="h-4 w-4 mr-2" />
                            {photoPreview ? 'Change Photo' : 'Upload Photo'}
                          </span>
                          <input
                            id="photo-upload"
                            name="photo"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handlePhotoChange}
                          />
                        </label>
                        <p className="mt-2 text-xs text-gray-500">
                          JPG, PNG or GIF, max 2MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
                
                {/* QR Code (only for view mode) */}
                {!isEditMode && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-3">Ticket QR Code</h3>
                    <div className="flex flex-col items-center">
                      <div className="bg-white p-3 rounded-md shadow-sm mb-2">
                        <QrCode className="h-32 w-32 text-gray-800" />
                      </div>
                      <p className="text-xs text-gray-500 text-center">
                        Can be scanned for check-in or event access
                      </p>
                      <button
                        type="button"
                        className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Download className="mr-1.5 h-4 w-4" />
                        Download QR Code
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Registered Sessions (only for view mode) */}
                {!isEditMode && attendeeData.sessions && (
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Registered Sessions</h3>
                      <button 
                        type="button"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => navigate(`/organizer/events/${eventId}/attendees/${attendeeId}/sessions`)}
                      >
                        Manage Sessions
                      </button>
                    </div>
                    
                    {attendeeData.sessions.length > 0 ? (
                      <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                          {attendeeData.sessions.map(session => (
                            <li key={session.id} className="p-4 hover:bg-gray-50">
                              <div className="flex flex-col">
                                <div className="text-sm font-medium text-indigo-600">
                                  {session.title}
                                </div>
                                <div className="mt-1 flex items-center text-xs text-gray-500">
                                  <CalendarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  {formatDate(session.date)}
                                </div>
                                <div className="mt-1 flex items-center text-xs text-gray-500">
                                  <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  {session.startTime} - {session.endTime}
                                </div>
                                <div className="mt-1 flex items-center text-xs text-gray-500">
                                  <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  {session.location}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="mt-4 rounded-md bg-gray-50 p-4 text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No sessions registered</h3>
                        <p className="mt-1 text-xs text-gray-500">
                          This attendee is not registered for any sessions yet.
                        </p>
                        <button
                          type="button"
                          onClick={() => navigate(`/organizer/events/${eventId}/attendees/${attendeeId}/sessions`)}
                          className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Add to sessions
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Form Actions - Only for edit mode */}
          {isEditMode && (
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                onClick={() => navigate(`/organizer/events/${eventId}/attendees/${attendeeId}`)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  isSaving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          )}
        </form>
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
                    Delete Attendee
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete {attendeeData.name}? This will permanently remove their registration, ticket, and all associated data. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteAttendee}
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
      
      {/* Resend Email Confirmation Modal */}
      {showResendEmailModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Mail className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Resend Confirmation Email
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      This will send a new confirmation email to {attendeeData.email} with their ticket details and event information.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleResendEmail}
                >
                  Send Email
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowResendEmailModal(false)}
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

export default AttendeeDetailsPage;