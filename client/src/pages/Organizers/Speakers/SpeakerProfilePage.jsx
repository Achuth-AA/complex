import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Save, User, Mail, Phone, Briefcase, 
  Building, Upload, Calendar, Link, Twitter, Linkedin, 
  FileText, X, Check, ChevronRight
} from 'lucide-react';
import axios from 'axios';

const SpeakerProfilePage = () => {
  const { eventId, speakerId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  
  const [speakerData, setSpeakerData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    bio: '',
    type: 'regular',
    social: {
      twitter: '',
      linkedin: ''
    },
    sessions: []
  });
  
  // Determine if we're creating a new speaker or editing an existing one
  const isNewSpeaker = speakerId === 'create';
  
  // Speaker types options
  const speakerTypes = [
    { id: 'keynote', name: 'Keynote Speaker' },
    { id: 'panel', name: 'Panel Speaker' },
    { id: 'regular', name: 'Regular Speaker' },
    { id: 'workshop', name: 'Workshop Leader' }
  ];
  
  // Mock file upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  
  useEffect(() => {
    // If creating a new speaker, no need to fetch data
    if (isNewSpeaker) {
      setIsLoading(false);
      return;
    }
    
    // Fetch speaker data
    const fetchSpeakerData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, this would be a real API call
        // const response = await axios.get(`/api/events/${eventId}/speakers/${speakerId}`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Mock speaker data
        const mockSpeaker = {
          id: speakerId,
          name: 'Sarah Johnson',
          title: 'AI Research Director',
          company: 'TechCorp Inc.',
          email: 'sarah.johnson@techcorp.com',
          phone: '+1 (555) 123-4567',
          website: 'https://sarahjohnson.dev',
          bio: 'Dr. Sarah Johnson leads the AI research team at TechCorp, focusing on neural network applications in enterprise environments. With over 15 years of experience in machine learning and artificial intelligence, she has published numerous papers on advanced AI algorithms and their practical implementations.',
          type: 'keynote',
          social: {
            twitter: '@sarahjAI',
            linkedin: 'sarahjohnson-ai'
          },
          profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
          sessions: [
            { id: 'session1', title: 'The Future of AI', date: '2025-06-15', time: '10:00 - 11:30' },
            { id: 'session2', title: 'Neural Networks Deep Dive', date: '2025-06-16', time: '14:00 - 15:30' }
          ]
        };
        
        setSpeakerData(mockSpeaker);
        setPhotoPreview(mockSpeaker.profileImage);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching speaker data:', error);
        setIsLoading(false);
      }
    };
    
    fetchSpeakerData();
  }, [eventId, speakerId, isNewSpeaker]);
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested values (like social.twitter)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSpeakerData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setSpeakerData(prev => ({
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
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!speakerData.name.trim()) newErrors.name = 'Name is required';
    if (!speakerData.email.trim()) newErrors.email = 'Email is required';
    
    // Simple email validation
    if (speakerData.email && !/\S+@\S+\.\S+/.test(speakerData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSaving(true);
    
    try {
      // In a real app, this would be a real API call
      // const formData = new FormData();
      // Object.keys(speakerData).forEach(key => {
      //   if (key !== 'social') {
      //     formData.append(key, speakerData[key]);
      //   }
      // });
      // formData.append('social', JSON.stringify(speakerData.social));
      // if (selectedFile) formData.append('profileImage', selectedFile);
      
      // if (isNewSpeaker) {
      //   await axios.post(`/api/events/${eventId}/speakers`, formData);
      // } else {
      //   await axios.put(`/api/events/${eventId}/speakers/${speakerId}`, formData);
      // }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccessMessage(`Speaker successfully ${isNewSpeaker ? 'created' : 'updated'}`);
      setIsSaving(false);
      
      // Clear success message after a delay
      setTimeout(() => {
        setSuccessMessage('');
        // If creating a new speaker, redirect to the speakers list
        if (isNewSpeaker) {
          navigate(`/organizer/events/${eventId}/speakers`);
        }
      }, 3000);
    } catch (error) {
      console.error('Error saving speaker profile:', error);
      setIsSaving(false);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}/speakers`)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
              {isNewSpeaker ? 'Add Speaker' : 'Edit Speaker'}
            </h2>
            {!isNewSpeaker && (
              <p className="mt-1 text-sm text-gray-500">
                {speakerData.name}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={handleSaveProfile}
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
                Save Speaker
              </>
            )}
          </button>
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
        <form onSubmit={handleSaveProfile}>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left columns - Main info */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Speaker Information</h3>
                  
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
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={speakerData.name}
                          onChange={handleInputChange}
                          className={`block w-full pl-10 sm:text-sm rounded-md ${
                            errors.name 
                              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                          }`}
                          placeholder="John Smith"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                    
                    {/* Email */}
                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address*
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={speakerData.email}
                          onChange={handleInputChange}
                          className={`block w-full pl-10 sm:text-sm rounded-md ${
                            errors.email 
                              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                          }`}
                          placeholder="example@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                    
                    {/* Phone */}
                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={speakerData.phone}
                          onChange={handleInputChange}
                          className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    {/* Speaker Type */}
                    <div className="sm:col-span-3">
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Speaker Type
                      </label>
                      <div className="mt-1">
                        <select
                          id="type"
                          name="type"
                          value={speakerData.type}
                          onChange={handleInputChange}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          {speakerTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Job Title */}
                    <div className="sm:col-span-3">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Job Title
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          value={speakerData.title}
                          onChange={handleInputChange}
                          className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Senior Developer"
                        />
                      </div>
                    </div>
                    
                    {/* Company */}
                    <div className="sm:col-span-3">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                        Company/Organization
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="company"
                          id="company"
                          value={speakerData.company}
                          onChange={handleInputChange}
                          className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Company Name"
                        />
                      </div>
                    </div>
                    
                    {/* Website */}
                    <div className="sm:col-span-6">
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Link className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="website"
                          id="website"
                          value={speakerData.website}
                          onChange={handleInputChange}
                          className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                    
                    {/* Bio */}
                    <div className="sm:col-span-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Speaker Bio
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          name="bio"
                          rows="5"
                          value={speakerData.bio}
                          onChange={handleInputChange}
                          className="block w-full sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Professional biography and expertise..."
                        ></textarea>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        This bio will be visible to attendees in the event app and website.
                      </p>
                    </div>
                  </div>
                  
                  {/* Social Media Section */}
                  <div className="pt-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Social Media</h3>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      {/* Twitter */}
                      <div className="sm:col-span-3">
                        <label htmlFor="social.twitter" className="block text-sm font-medium text-gray-700">
                          Twitter/X
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Twitter className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="social.twitter"
                            id="social.twitter"
                            value={speakerData.social?.twitter || ''}
                            onChange={handleInputChange}
                            className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="@username"
                          />
                        </div>
                      </div>
                      
                      {/* LinkedIn */}
                      <div className="sm:col-span-3">
                        <label htmlFor="social.linkedin" className="block text-sm font-medium text-gray-700">
                          LinkedIn
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Linkedin className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="social.linkedin"
                            id="social.linkedin"
                            value={speakerData.social?.linkedin || ''}
                            onChange={handleInputChange}
                            className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="username or profile URL"
                          />
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
                          alt={speakerData.name || "Profile"} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <User className="h-20 w-20 text-gray-300" />
                        </div>
                      )}
                    </div>
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
                  </div>
                </div>
                
                {/* Sessions (only for existing speakers) */}
                {!isNewSpeaker && (
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Assigned Sessions</h3>
                      <button 
                        type="button"
                        onClick={() => navigate(`/organizer/events/${eventId}/speakers/${speakerId}/assign`)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                      >
                        Manage <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                    
                    {speakerData.sessions && speakerData.sessions.length > 0 ? (
                      <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                          {speakerData.sessions.map(session => (
                            <li key={session.id} className="p-4 hover:bg-gray-50">
                              <div className="flex flex-col">
                                <div className="text-sm font-medium text-indigo-600">
                                  {session.title}
                                </div>
                                <div className="mt-1 flex items-center text-xs text-gray-500">
                                  <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  {session.date} • {session.time}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="mt-4 rounded-md bg-gray-50 p-4 text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No sessions assigned</h3>
                        <p className="mt-1 text-xs text-gray-500">
                          This speaker is not assigned to any sessions yet.
                        </p>
                        <button
                          type="button"
                          onClick={() => navigate(`/organizer/events/${eventId}/speakers/${speakerId}/assign`)}
                          className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Assign to sessions
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="button"
              onClick={() => navigate(`/organizer/events/${eventId}/speakers`)}
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
                'Save Speaker'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpeakerProfilePage;