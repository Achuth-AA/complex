import React, { useState } from 'react';
import { 
  Calendar, Clock, Users, MessageSquare, Bell, Settings, 
  ChevronDown, Search, LogOut, Menu, X, BarChart2,
  Briefcase, Award, CheckSquare, TrendingUp, Edit,
  Plus, Trash2, Upload, Mail, Eye, Star, Filter,
  Link, FileText, Download, ExternalLink, CheckCircle,
  User, Phone, MapPin, Tag, Copy, Send, XCircle
} from 'lucide-react';

const SpeakersManagementPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for speakers
  const speakers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'AI Research Director',
      company: 'TechFuture Labs',
      bio: 'Dr. Sarah Johnson is a leading researcher in artificial intelligence with over 15 years of experience. She leads the AI Ethics division at TechFuture Labs and has published more than 50 papers on responsible AI development.',
      topics: ['Artificial Intelligence', 'Machine Learning', 'Ethics in Technology'],
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      website: 'www.sarahjohnson.com',
      location: 'San Francisco, CA',
      twitter: '@drsarahai',
      linkedin: 'linkedin.com/in/sarahjohnson',
      rating: 4.9,
      featured: true,
      status: 'confirmed',
      photo: '/api/placeholder/150/150',
      sessions: [
        { id: 1, title: 'Introduction to AI in Healthcare', date: '2025-04-15', time: '10:00 AM', track: 'Technology' },
        { id: 2, title: 'Ethics in AI Panel Discussion', date: '2025-04-16', time: '2:00 PM', track: 'Ethics & Society' }
      ],
      materials: [
        { id: 1, name: 'AI in Healthcare Slides.pdf', size: '4.2 MB', uploadDate: '2025-03-15', status: 'approved' },
        { id: 2, name: 'Ethics Panel Discussion Points.docx', size: '1.8 MB', uploadDate: '2025-03-20', status: 'approved' }
      ]
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Senior Machine Learning Engineer',
      company: 'DataVision Inc.',
      bio: 'Michael Chen specializes in building and deploying large-scale machine learning systems. At DataVision, he leads a team that develops computer vision solutions for industries ranging from retail to healthcare.',
      topics: ['Computer Vision', 'Deep Learning', 'MLOps'],
      email: 'michael.chen@example.com',
      phone: '+1 (555) 987-6543',
      website: 'www.michaelchenmachinelearning.com',
      location: 'Seattle, WA',
      twitter: '@mlmichael',
      linkedin: 'linkedin.com/in/michaelchen',
      rating: 4.7,
      featured: false,
      status: 'confirmed',
      photo: '/api/placeholder/150/150',
      sessions: [
        { id: 3, title: 'Machine Learning Workshop', date: '2025-04-15', time: '2:00 PM', track: 'Technical' }
      ],
      materials: [
        { id: 3, name: 'ML Workshop Code Samples.zip', size: '12.6 MB', uploadDate: '2025-03-18', status: 'approved' },
        { id: 4, name: 'Workshop Exercises.pdf', size: '3.1 MB', uploadDate: '2025-03-18', status: 'pending' }
      ]
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      title: 'Data Privacy Officer',
      company: 'SecureData Corporation',
      bio: 'Elena Rodriguez is an expert in data privacy regulations and implementation. She has helped numerous Fortune 500 companies comply with GDPR, CCPA, and other privacy frameworks.',
      topics: ['Data Privacy', 'Compliance', 'Information Security'],
      email: 'elena.rodriguez@example.com',
      phone: '+1 (555) 456-7890',
      website: 'www.elenarodriguez.com',
      location: 'Chicago, IL',
      twitter: '@privacyelena',
      linkedin: 'linkedin.com/in/elenarodriguez',
      rating: 4.8,
      featured: true,
      status: 'pending',
      photo: '/api/placeholder/150/150',
      sessions: [
        { id: 4, title: 'Data Privacy in the Digital Age', date: '2025-04-16', time: '1:00 PM', track: 'Legal' }
      ],
      materials: []
    },
    {
      id: 4,
      name: 'Alex Wong',
      title: 'UX Design Director',
      company: 'Interface Innovations',
      bio: 'Alex Wong has spent the last decade crafting user experiences for digital products. His work focuses on creating accessible, inclusive designs that serve diverse user populations.',
      topics: ['UX Design', 'Accessibility', 'Design Systems'],
      email: 'alex.wong@example.com',
      phone: '+1 (555) 234-5678',
      website: 'www.alexwongdesign.com',
      location: 'New York, NY',
      twitter: '@uxalex',
      linkedin: 'linkedin.com/in/alexwong',
      rating: 4.6,
      featured: false,
      status: 'invited',
      photo: '/api/placeholder/150/150',
      sessions: [],
      materials: []
    },
    {
      id: 5,
      name: 'Dr. James Anderson',
      title: 'Chief Data Scientist',
      company: 'Analytics Pro',
      bio: 'Dr. James Anderson specializes in predictive analytics and statistical modeling. He has developed innovative approaches to analyzing big data that have transformed business operations across industries.',
      topics: ['Data Science', 'Statistics', 'Predictive Modeling'],
      email: 'james.anderson@example.com',
      phone: '+1 (555) 345-6789',
      website: 'www.jamesandersonphd.com',
      location: 'Boston, MA',
      twitter: '@datascijames',
      linkedin: 'linkedin.com/in/jamesanderson',
      rating: 4.8,
      featured: false,
      status: 'confirmed',
      photo: '/api/placeholder/150/150',
      sessions: [
        { id: 5, title: 'Predictive Modeling Workshop', date: '2025-04-17', time: '9:00 AM', track: 'Data Science' }
      ],
      materials: [
        { id: 5, name: 'Predictive Modeling Slides.pptx', size: '8.7 MB', uploadDate: '2025-03-25', status: 'approved' }
      ]
    }
  ];

  // Sample sessions data
  const availableSessions = [
    { id: 1, title: 'Introduction to AI in Healthcare', date: '2025-04-15', time: '10:00 AM', track: 'Technology', assigned: true },
    { id: 2, title: 'Ethics in AI Panel Discussion', date: '2025-04-16', time: '2:00 PM', track: 'Ethics & Society', assigned: true },
    { id: 3, title: 'Machine Learning Workshop', date: '2025-04-15', time: '2:00 PM', track: 'Technical', assigned: true },
    { id: 4, title: 'Data Privacy in the Digital Age', date: '2025-04-16', time: '1:00 PM', track: 'Legal', assigned: true },
    { id: 5, title: 'Predictive Modeling Workshop', date: '2025-04-17', time: '9:00 AM', track: 'Data Science', assigned: true },
    { id: 6, title: 'Future of Remote Work Panel', date: '2025-04-16', time: '9:30 AM', track: 'Business', assigned: false },
    { id: 7, title: 'Cybersecurity Best Practices', date: '2025-04-17', time: '11:00 AM', track: 'Security', assigned: false },
    { id: 8, title: 'Blockchain for Business', date: '2025-04-15', time: '3:30 PM', track: 'Technology', assigned: false }
  ];

  // Filter speakers based on active tab
  const filteredSpeakers = speakers.filter(speaker => {
    if (activeTab === 'all') return true;
    if (activeTab === 'confirmed') return speaker.status === 'confirmed';
    if (activeTab === 'pending') return speaker.status === 'pending' || speaker.status === 'invited';
    if (activeTab === 'featured') return speaker.featured;
    return true;
  });

  const handleSelectSpeaker = (speakerId) => {
    const speaker = speakers.find(s => s.id === speakerId);
    setSelectedSpeaker(speaker);
  };

  const handleCloseProfile = () => {
    setSelectedSpeaker(null);
  };

  const InviteSpeakerModal = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Invite Speaker</h3>
          <button onClick={() => setShowInviteModal(false)} className="text-gray-400 hover:text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <form>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="speaker@example.com"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                  Organization/Company
                </label>
                <input
                  type="text"
                  id="organization"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title/Position
                </label>
                <input
                  type="text"
                  id="title"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Invitation Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue={`Dear [Speaker],

We would be honored to have you as a speaker at [Event Name]. Your expertise in [Topic] would be invaluable to our attendees.

The event will take place on [Event Dates] at [Venue]. We would love to have you present on [Suggested Topic].

Please let us know if you're interested, and we can discuss the details further.

Best regards,
[Your Name]`}
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="suggestSessions"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="suggestSessions" className="ml-2 block text-sm text-gray-700">
                  Suggest available sessions in the invitation
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Mail className="inline-block mr-2 h-4 w-4" />
                Send Invitation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const AssignSessionModal = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Assign Session to {selectedSpeaker?.name}
          </h3>
          <button onClick={() => setShowAssignModal(false)} className="text-gray-400 hover:text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="sessionSearch" className="block text-sm font-medium text-gray-700 mb-1">
              Search Sessions
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="sessionSearch"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search by title, track, or date"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Available Sessions</h4>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-md overflow-hidden mb-6">
            <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
              {availableSessions.filter(session => !session.assigned).map(session => (
                <li key={session.id} className="px-4 py-3 hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{session.title}</p>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <Calendar className="mr-1 h-3.5 w-3.5" />
                        {session.date} • {session.time}
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-indigo-100 text-indigo-800">
                          {session.track}
                        </span>
                      </div>
                    </div>
                    <button className="ml-4 py-1 px-3 text-xs font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 rounded-md">
                      Assign
                    </button>
                  </div>
                </li>
              ))}
              {availableSessions.filter(session => !session.assigned).length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-gray-500">
                  No unassigned sessions available.
                </li>
              )}
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Currently Assigned Sessions</h4>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
            <ul className="divide-y divide-gray-200 max-h-40 overflow-y-auto">
              {selectedSpeaker?.sessions.map(session => (
                <li key={session.id} className="px-4 py-3 hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{session.title}</p>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <Calendar className="mr-1 h-3.5 w-3.5" />
                        {session.date} • {session.time}
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-indigo-100 text-indigo-800">
                          {session.track}
                        </span>
                      </div>
                    </div>
                    <button className="ml-4 py-1 px-3 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md">
                      Remove
                    </button>
                  </div>
                </li>
              ))}
              {selectedSpeaker?.sessions.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-gray-500">
                  No sessions assigned to this speaker yet.
                </li>
              )}
            </ul>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowAssignModal(false)}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Close
            </button>
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
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <Briefcase className="mr-3 h-5 w-5" />
              <span className="truncate">Events</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <Calendar className="mr-3 h-5 w-5" />
              <span className="truncate">Sessions</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 bg-indigo-700 rounded-md group">
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
            
            <div className="relative flex-1 max-w-md ml-4 md:ml-0">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 text-sm placeholder-gray-400 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                placeholder="Search speakers, sessions..."
              />
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
                <h1 className="text-2xl font-bold text-gray-900">Speaker Management</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage speakers, their profiles, sessions, and materials.
                </p>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Invite Speaker
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {selectedSpeaker ? (
            <div className="bg-white shadow rounded-lg">
              {/* Speaker Profile Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Speaker Profile</h2>
                <button 
                  onClick={handleCloseProfile}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Speaker Profile Content */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row">
                  {/* Left Column - Photo and Basic Info */}
                  <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
                    <div className="flex flex-col items-center">
                      <img 
                        src={selectedSpeaker.photo}
                        alt={selectedSpeaker.name}
                        className="w-40 h-40 rounded-full object-cover border-4 border-indigo-100"
                      />
                      
                      <div className="mt-4 text-center">
                        <h3 className="text-xl font-bold text-gray-900">{selectedSpeaker.name}</h3>
                        <p className="text-gray-600">{selectedSpeaker.title}</p>
                        <p className="text-gray-600">{selectedSpeaker.company}</p>
                      </div>
                      
                      <div className="mt-4 flex items-center">
                        <Star className="text-yellow-400 h-5 w-5" />
                        <span className="ml-1 text-gray-700 font-medium">{selectedSpeaker.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">rating</span>
                      </div>
                      
                      <div className="mt-4 flex justify-center space-x-2">
                        <button className="p-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200">
                          <Mail size={18} />
                        </button>
                        <button className="p-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200">
                          <Phone size={18} />
                        </button>
                        <button className="p-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200">
                          <ExternalLink size={18} />
                        </button>
                      </div>
                      
                      <div className="mt-6 w-full">
                        <div className="flex items-center text-sm text-gray-600 py-2">
                          <Mail className="mr-3 h-4 w-4 text-gray-400" />
                          <span>{selectedSpeaker.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 py-2">
                          <Phone className="mr-3 h-4 w-4 text-gray-400" />
                          <span>{selectedSpeaker.phone}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 py-2">
                          <MapPin className="mr-3 h-4 w-4 text-gray-400" />
                          <span>{selectedSpeaker.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 py-2">
                          <Link className="mr-3 h-4 w-4 text-gray-400" />
                          <a href={`https://${selectedSpeaker.website}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500">
                            {selectedSpeaker.website}
                          </a>
                        </div>
                      </div>
                      
                      <div className="mt-6 w-full">
                        <p className="text-sm font-medium text-gray-700 mb-2">Status</p>
                        <div className="flex items-center">
                          {selectedSpeaker.status === 'confirmed' && (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Confirmed
                            </span>
                          )}
                          {selectedSpeaker.status === 'pending' && (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                          {selectedSpeaker.status === 'invited' && (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Invited
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Tabs */}
                  <div className="md:w-2/3">
                    <div className="border-b border-gray-200">
                      <nav className="-mb-px flex space-x-8">
                        <button className="whitespace-nowrap py-4 px-1 border-b-2 border-indigo-500 font-medium text-sm text-indigo-600">
                          Info & Bio
                        </button>
                        <button className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                          Sessions
                        </button>
                        <button className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                          Materials
                        </button>
                        <button className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                          Communication
                        </button>
                      </nav>
                    </div>
                    
                    <div className="mt-6">
                      <div className="mb-6">
                        <h4 className="text-base font-medium text-gray-900 mb-2">Biography</h4>
                        <p className="text-gray-700 text-sm">{selectedSpeaker.bio}</p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-base font-medium text-gray-900 mb-2">Topics</h4>
                        <div className="flex flex-wrap">
                          {selectedSpeaker.topics.map((topic, index) => (
                            <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full mr-2 mb-2">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-base font-medium text-gray-900">Sessions</h4>
                          <button 
                            onClick={() => setShowAssignModal(true)}
                            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                          >
                            <Plus size={16} className="mr-1" />
                            Assign Session
                          </button>
                        </div>
                        {selectedSpeaker.sessions.length > 0 ? (
                          <div className="bg-gray-50 rounded-lg border border-gray-200">
                            <ul className="divide-y divide-gray-200">
                              {selectedSpeaker.sessions.map(session => (
                                <li key={session.id} className="px-4 py-3 flex justify-between items-center">
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{session.title}</p>
                                    <div className="mt-1 flex items-center text-xs text-gray-500">
                                      <Calendar className="mr-1 h-3.5 w-3.5" />
                                      {session.date}, {session.time}
                                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-indigo-100 text-indigo-800">
                                        {session.track}
                                      </span>
                                    </div>
                                  </div>
                                  <button className="text-gray-400 hover:text-gray-500">
                                    <Trash2 size={16} />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-center text-sm text-gray-500">
                            No sessions assigned yet.
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-base font-medium text-gray-900">Materials</h4>
                          <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                            <Upload size={16} className="mr-1" />
                            Upload Materials
                          </button>
                        </div>
                        
                        {selectedSpeaker.materials.length > 0 ? (
                          <div className="bg-gray-50 rounded-lg border border-gray-200">
                            <ul className="divide-y divide-gray-200">
                              {selectedSpeaker.materials.map(material => (
                                <li key={material.id} className="px-4 py-3 flex justify-between items-center">
                                  <div className="flex items-center">
                                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{material.name}</p>
                                      <p className="text-xs text-gray-500">{material.size} • Uploaded {material.uploadDate}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                      material.status === 'approved' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {material.status === 'approved' ? 'Approved' : 'Pending'}
                                    </span>
                                    <button className="text-indigo-600 hover:text-indigo-800">
                                      <Download size={16} />
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-500">
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-center text-sm text-gray-500">
                            No materials uploaded yet.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Speaker Profile Footer */}
              <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex justify-end">
                <div className="flex space-x-3">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Profile Link
                  </button>
                  
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </button>
                  
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Filter and sort options */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 mb-6">
                <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6">
                  <div className="flex space-x-4">
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'all' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('all')}
                    >
                      All Speakers ({speakers.length})
                    </button>
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'confirmed' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('confirmed')}
                    >
                      Confirmed ({speakers.filter(s => s.status === 'confirmed').length})
                    </button>
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'pending' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('pending')}
                    >
                      Pending ({speakers.filter(s => s.status === 'pending' || s.status === 'invited').length})
                    </button>
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'featured' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('featured')}
                    >
                      Featured ({speakers.filter(s => s.featured).length})
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="invited">Invited</option>
                  </select>
                  
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </button>
                </div>
              </div>
              
              {/* Speakers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSpeakers.map((speaker) => (
                  <div 
                    key={speaker.id} 
                    className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={speaker.photo} 
                            alt={speaker.name}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center">
                              {speaker.name}
                              {speaker.featured && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                  Featured
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-600">{speaker.title}</p>
                            <p className="text-sm text-gray-600">{speaker.company}</p>
                          </div>
                        </div>
                        <div>
                          {speaker.status === 'confirmed' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Confirmed
                            </span>
                          )}
                          {speaker.status === 'pending' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Clock className="mr-1 h-3 w-3" />
                              Pending
                            </span>
                          )}
                          {speaker.status === 'invited' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <Mail className="mr-1 h-3 w-3" />
                              Invited
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">
                              {speaker.sessions.length} {speaker.sessions.length === 1 ? 'Session' : 'Sessions'}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">
                              {speaker.materials.length} {speaker.materials.length === 1 ? 'Material' : 'Materials'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap">
                        {speaker.topics.slice(0, 3).map((topic, index) => (
                          <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full mr-2 mb-2">
                            {topic}
                          </span>
                        ))}
                        {speaker.topics.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-2 mb-2">
                            +{speaker.topics.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                        <div className="flex space-x-2">
                          <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md">
                            <Mail size={16} />
                          </button>
                          <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md">
                            <Edit size={16} />
                          </button>
                          <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md">
                            <Link size={16} />
                          </button>
                        </div>
                        
                        <button 
                          className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
                          onClick={() => handleSelectSpeaker(speaker.id)}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add Speaker Card */}
                <div 
                  className="bg-white rounded-lg shadow border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors p-6 flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => setShowInviteModal(true)}
                >
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mb-3">
                    <Plus size={24} />
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mb-1">Add New Speaker</h3>
                  <p className="text-sm text-gray-500 text-center">Invite speakers to your event</p>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
      
      {/* Modals */}
      {showInviteModal && <InviteSpeakerModal />}
      {showAssignModal && selectedSpeaker && <AssignSessionModal />}
    </div>
  );
};

export default SpeakersManagementPage;