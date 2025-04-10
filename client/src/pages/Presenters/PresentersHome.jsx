import React, { useState } from 'react';
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, Users, MessageSquare, Bell, Settings, 
  ChevronDown, Search, LogOut, Menu, X, PresentationIcon,
  Upload, FileText, BarChart2, ThumbsUp, Download, Edit
} from 'lucide-react';

const PresentersHome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Sample data for presentations and statistics
  const upcomingSessions = [
    { 
      id: 1, 
      title: 'Introduction to AI in Healthcare', 
      date: '2025-04-15', 
      time: '10:00 AM - 11:30 AM',
      location: 'Main Hall A',
      attendees: 120,
      status: 'confirmed'
    },
    { 
      id: 2, 
      title: 'Machine Learning Workshop', 
      date: '2025-04-16', 
      time: '2:00 PM - 4:00 PM',
      location: 'Tech Lab 2',
      attendees: 45,
      status: 'confirmed' 
    }
  ];

  const attendeeQuestions = [
    { id: 1, session: 'Introduction to AI in Healthcare', question: 'Can you explain more about the ethical implications?', askedBy: 'John Smith', time: '2 hours ago' },
    { id: 2, session: 'Introduction to AI in Healthcare', question: 'Are there resources available to learn more about this topic?', askedBy: 'Sarah Johnson', time: '3 hours ago' },
    { id: 3, session: 'Machine Learning Workshop', question: 'What programming experience is needed for the workshop?', askedBy: 'Alex Wong', time: '1 day ago' },
    { id: 4, session: 'Introduction to AI in Healthcare', question: 'Will slides be available after the presentation?', askedBy: 'Michael Brown', time: '1 day ago' },
  ];

  const presentationMaterials = [
    { id: 1, title: 'AI in Healthcare Slides.pdf', size: '4.2 MB', uploadDate: '2025-03-25', downloads: 45, session: 'Introduction to AI in Healthcare' },
    { id: 2, title: 'ML Workshop Handbook.pdf', size: '6.8 MB', uploadDate: '2025-03-28', downloads: 22, session: 'Machine Learning Workshop' },
    { id: 3, title: 'Code Samples.zip', size: '12.1 MB', uploadDate: '2025-03-28', downloads: 18, session: 'Machine Learning Workshop' },
  ];

  // Sample notification data
  const notifications = [
    { id: 1, title: 'New Question', message: 'You have a new question for your AI in Healthcare session', time: '30 minutes ago', read: false },
    { id: 2, title: 'Schedule Update', message: 'Your Machine Learning Workshop has been moved to Tech Lab 2', time: '2 hours ago', read: false },
    { id: 3, title: 'Feedback Received', message: 'You have new feedback on your previous session', time: '1 day ago', read: true }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
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
                  {user?.fullName?.charAt(0).toUpperCase() || 'P'}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{user?.fullName || 'Presenter'}</p>
                  <p className="text-xs text-indigo-300">Presenter</p>
                </div>
              </div>
            </div>
          </div>
          
          <nav className="space-y-1">
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 bg-indigo-700 rounded-md group">
              <BarChart2 className="mr-3 h-5 w-5" />
              <span className="truncate">Dashboard</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <PresentationIcon className="mr-3 h-5 w-5" />
              <span className="truncate">My Sessions</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <Upload className="mr-3 h-5 w-5" />
              <span className="truncate">Materials</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <MessageSquare className="mr-3 h-5 w-5" />
              <span className="truncate">Q&A</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <ThumbsUp className="mr-3 h-5 w-5" />
              <span className="truncate">Feedback</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <Calendar className="mr-3 h-5 w-5" />
              <span className="truncate">Schedule</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <Settings className="mr-3 h-5 w-5" />
              <span className="truncate">Settings</span>
            </a>
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full px-4 py-4 border-t border-indigo-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Logout</span>
          </button>
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
                className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-400 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                placeholder="Search sessions, materials, questions..."
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
                
                {/* Notification Dropdown */}
                {isNotificationOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border-b border-gray-100 ${notification.read ? '' : 'bg-indigo-50'}`}>
                          <div className="flex justify-between">
                            <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
                            <p className="text-xs text-gray-500">{notification.time}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 border-t border-gray-200">
                      <button className="block w-full px-4 py-2 text-xs font-medium text-center text-indigo-600 hover:text-indigo-800">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative ml-4">
                <button 
                  onClick={() => setProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    {user?.fullName?.charAt(0).toUpperCase() || 'P'}
                  </div>
                  <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                    {user?.fullName?.split(' ')[0] || 'Presenter'}
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Page Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900">Presenter Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your upcoming sessions, presentation materials, and attendee interactions.
                </p>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Schedule
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Materials
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <PresentationIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Sessions</dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">2</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-indigo-600 font-semibold">
                      <span>Next: Apr 15, 2025</span>
                    </div>
                    <div className="text-sm text-gray-500">In 17 days</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Attendee Questions</dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">7</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-red-600 font-semibold">
                      <span>5 unanswered</span>
                    </div>
                    <div className="text-sm text-gray-500">Needs attention</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <ThumbsUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Session Feedback</dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">4.8/5.0</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-green-600 font-semibold">
                      <span>+0.3 points</span>
                    </div>
                    <div className="text-sm text-gray-500">vs previous</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content Sections */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Upcoming Sessions */}
            <div className="lg:col-span-2 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Sessions</h3>
                  <div className="flex">
                    <a href="#" className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3">
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-indigo-600">{session.title}</h4>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {session.status}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {new Date(session.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {session.time}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {session.attendees} registered attendees
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <PresentationIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {session.location}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        View Details
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {upcomingSessions.length === 0 && (
                <div className="py-8 px-6 text-center">
                  <p className="text-gray-500">You have no upcoming sessions scheduled.</p>
                </div>
              )}
            </div>
            
            {/* Questions & Feedback */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Questions</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View all
                  </a>
                </div>
              </div>
              <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {attendeeQuestions.slice(0, 3).map((question) => (
                  <li key={question.id} className="px-4 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <MessageSquare size={16} />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">{question.question}</p>
                        <div className="mt-1 flex items-center">
                          <p className="text-xs text-gray-500 mr-2">
                            From: {question.askedBy} · {question.time}
                          </p>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                            {question.session}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-3">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Answer
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Mark as answered
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all questions</a>
              </div>
            </div>
          </div>
          
          {/* Presentation Materials */}
          <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">My Presentation Materials</h3>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New
                </button>
              </div>
            </div>
            <div className="overflow-hidden overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Session
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploaded
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Downloads
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {presentationMaterials.map((material) => (
                    <tr key={material.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                            <FileText size={16} />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{material.title}</div>
                            <div className="text-sm text-gray-500">{material.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{material.session}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(material.uploadDate).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{material.downloads}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-3">
                          <button className="text-indigo-600 hover:text-indigo-900 flex items-center">
                            <Download size={16} className="mr-1" />
                            Download
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 flex items-center">
                            <Edit size={16} className="mr-1" />
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {presentationMaterials.length === 0 && (
              <div className="py-8 px-6 text-center">
                <p className="text-gray-500">You haven't uploaded any presentation materials yet.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PresentersHome;