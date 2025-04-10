// import React from 'react';
// import { useAuth } from "../Contexts/AuthContext"
// import { useNavigate } from 'react-router-dom';

// const AttendeesHome = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-indigo-600 text-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <div className="text-xl font-bold">ConferenceHub</div>
//               <div className="ml-10 flex space-x-4">
//                 <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Dashboard</a>
//                 <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Events</a>
//                 <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">My Schedule</a>
//                 <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Networking</a>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <div className="mr-4">Welcome, {user?.fullName}</div>
//               <button
//                 onClick={handleLogout}
//                 className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-md text-sm font-medium"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-gray-900">Attendee Dashboard</h1>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white overflow-hidden shadow rounded-lg">
//               <div className="px-4 py-5 sm:p-6">
//                 <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
//                 <div className="mt-4">
//                   <p className="text-3xl font-bold">3</p>
//                   <p className="mt-1 text-sm text-gray-500">You have 3 upcoming events you're registered for.</p>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-4 sm:px-6">
//                 <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View events</a>
//               </div>
//             </div>

//             <div className="bg-white overflow-hidden shadow rounded-lg">
//               <div className="px-4 py-5 sm:p-6">
//                 <h3 className="text-lg font-medium text-gray-900">Sessions Today</h3>
//                 <div className="mt-4">
//                   <p className="text-3xl font-bold">2</p>
//                   <p className="mt-1 text-sm text-gray-500">You have 2 sessions scheduled for today.</p>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-4 sm:px-6">
//                 <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View schedule</a>
//               </div>
//             </div>

//             <div className="bg-white overflow-hidden shadow rounded-lg">
//               <div className="px-4 py-5 sm:p-6">
//                 <h3 className="text-lg font-medium text-gray-900">Network Connections</h3>
//                 <div className="mt-4">
//                   <p className="text-3xl font-bold">15</p>
//                   <p className="mt-1 text-sm text-gray-500">You've connected with 15 other attendees.</p>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-4 sm:px-6">
//                 <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View connections</a>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 bg-white shadow rounded-lg">
//             <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
//               <h3 className="text-lg font-medium text-gray-900">Upcoming Sessions</h3>
//             </div>
//             <ul className="divide-y divide-gray-200">
//               {[1, 2, 3].map((item) => (
//                 <li key={item} className="px-4 py-4 sm:px-6">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm font-medium text-indigo-600 truncate">Session {item}</p>
//                     <div className="ml-2 flex-shrink-0 flex">
//                       <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                         {new Date().toLocaleTimeString()}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="mt-2 sm:flex sm:justify-between">
//                     <div className="sm:flex">
//                       <p className="text-sm text-gray-500">
//                         Room A{item} - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                       </p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AttendeesHome;

import React, { useState } from 'react';
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, Users, MessageSquare, Bell, Settings, 
  ChevronDown, Search, LogOut, Menu, X, Star,
  Download, FileText, Heart, User, MapPin, Filter,
  Coffee, BookOpen, PlusCircle
} from 'lucide-react';

const AttendeesHome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('today');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Sample data for events and schedule
  const upcomingEvents = [
    { 
      id: 1, 
      title: 'Tech Conference 2025', 
      startDate: '2025-04-15',
      endDate: '2025-04-17',
      location: 'San Francisco Convention Center',
      registered: true,
      sessions: 24,
      status: 'upcoming'
    },
    { 
      id: 2, 
      title: 'Digital Marketing Summit', 
      startDate: '2025-05-02',
      endDate: '2025-05-03',
      location: 'Online Virtual Event',
      registered: true,
      sessions: 12,
      status: 'upcoming' 
    },
    { 
      id: 3, 
      title: 'Product Design Workshop', 
      startDate: '2025-06-10',
      endDate: '2025-06-10',
      location: 'Design Hub, New York',
      registered: false,
      sessions: 6,
      status: 'open' 
    }
  ];

  const mySchedule = [
    { 
      id: 1, 
      title: 'Introduction to AI in Healthcare', 
      date: '2025-04-15', 
      time: '10:00 AM - 11:30 AM',
      location: 'Main Hall A',
      speaker: 'Dr. Sarah Johnson',
      category: 'Technical',
      saved: true
    },
    { 
      id: 2, 
      title: 'Networking Lunch', 
      date: '2025-04-15', 
      time: '12:00 PM - 1:30 PM',
      location: 'Dining Hall',
      category: 'Networking',
      saved: true
    },
    { 
      id: 3, 
      title: 'Machine Learning Workshop', 
      date: '2025-04-15', 
      time: '2:00 PM - 4:00 PM',
      location: 'Tech Lab 2',
      speaker: 'Michael Chen',
      category: 'Workshop',
      saved: true 
    },
    { 
      id: 4, 
      title: 'Future of Remote Work Panel', 
      date: '2025-04-16', 
      time: '9:30 AM - 11:00 AM',
      location: 'Conference Room B',
      speaker: 'Panel Discussion',
      category: 'Panel',
      saved: true 
    }
  ];

  const recommendedSessions = [
    { 
      id: 5, 
      title: 'Data Privacy in the Digital Age', 
      date: '2025-04-16', 
      time: '1:00 PM - 2:30 PM',
      location: 'Conference Room C',
      speaker: 'Elena Rodriguez',
      category: 'Legal',
      match: '93% match' 
    },
    { 
      id: 6, 
      title: 'UX Design Principles', 
      date: '2025-04-17', 
      time: '10:00 AM - 11:30 AM',
      location: 'Design Studio',
      speaker: 'Alex Wong',
      category: 'Design',
      match: '87% match' 
    }
  ];

  const connections = [
    { id: 1, name: 'Jennifer Adams', title: 'Product Manager at TechCorp', connected: '2 days ago', avatar: 'JA' },
    { id: 2, name: 'Robert Lee', title: 'UX Designer at DesignHub', connected: '1 week ago', avatar: 'RL' },
    { id: 3, name: 'Sophia Garcia', title: 'Software Engineer at InnovateTech', connected: '1 month ago', avatar: 'SG' }
  ];

  // Sample notification data
  const notifications = [
    { id: 1, title: 'Session Change', message: 'The Machine Learning Workshop has been moved to Tech Lab 2', time: '1 hour ago', read: false },
    { id: 2, title: 'New Connection', message: 'Jennifer Adams has accepted your connection request', time: '2 days ago', read: false },
    { id: 3, title: 'Session Reminder', message: 'Introduction to AI in Healthcare starts in 30 minutes', time: '3 days ago', read: true }
  ];

  // Helper function to filter schedule for the selected date
  const getFilteredSchedule = () => {
    const today = '2025-04-15'; // Hardcoded for demo purposes
    const tomorrow = '2025-04-16';
    
    if (activeTab === 'today') {
      return mySchedule.filter(session => session.date === today);
    } else if (activeTab === 'tomorrow') {
      return mySchedule.filter(session => session.date === tomorrow);
    } else {
      return mySchedule;
    }
  };

  const filteredSchedule = getFilteredSchedule();

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
                  {user?.fullName?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{user?.fullName || 'Attendee'}</p>
                  <p className="text-xs text-indigo-300">Attendee</p>
                </div>
              </div>
            </div>
          </div>
          
          <nav className="space-y-1">
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 bg-indigo-700 rounded-md group">
              <BookOpen className="mr-3 h-5 w-5" />
              <span className="truncate">Dashboard</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <Calendar className="mr-3 h-5 w-5" />
              <span className="truncate">Events</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <Star className="mr-3 h-5 w-5" />
              <span className="truncate">My Schedule</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <FileText className="mr-3 h-5 w-5" />
              <span className="truncate">Materials</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <Users className="mr-3 h-5 w-5" />
              <span className="truncate">Networking</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-md group transition duration-150">
              <MapPin className="mr-3 h-5 w-5" />
              <span className="truncate">Venue Map</span>
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
                placeholder="Search sessions, speakers, topics..."
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
                    {user?.fullName?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                    {user?.fullName?.split(' ')[0] || 'Attendee'}
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
                <h1 className="text-2xl font-bold text-gray-900">Attendee Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Welcome back! Manage your schedule and get the most out of your conference experience.
                </p>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Full Schedule
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Download className="mr-2 h-4 w-4" />
                  Export Schedule
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
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Events Registered</dt>
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
                    <div className="text-sm text-gray-500">Tech Conference 2025</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Saved Sessions</dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">4</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-purple-600 font-semibold">
                      <span>Next: Today at 10:00 AM</span>
                    </div>
                    <div className="text-sm text-gray-500">2 hours from now</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Network Connections</dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">15</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-green-600 font-semibold">
                      <span>+3 this week</span>
                    </div>
                    <div className="text-sm text-gray-500">Growing your network</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* My Schedule Section */}
          <div className="mb-8 bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">My Schedule</h3>
                <div className="mt-3 flex sm:mt-0">
                  <div className="inline-flex rounded-md shadow-sm">
                    <button
                      type="button"
                      onClick={() => setActiveTab('today')}
                      className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                        activeTab === 'today'
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('tomorrow')}
                      className={`px-4 py-2 text-sm font-medium border-t border-b ${
                        activeTab === 'tomorrow'
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Tomorrow
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('all')}
                      className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                        activeTab === 'all'
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      All
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((session) => (
                  <div key={session.id} className="p-6 hover:bg-gray-50">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div className="sm:flex-1">
                        <div className="flex items-center">
                          <h4 className="text-lg font-medium text-indigo-600">{session.title}</h4>
                          <span 
                            className={`ml-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              session.category === 'Technical' ? 'bg-blue-100 text-blue-800' :
                              session.category === 'Workshop' ? 'bg-purple-100 text-purple-800' :
                              session.category === 'Networking' ? 'bg-green-100 text-green-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {session.category}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {session.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {session.location}
                          </div>
                          {session.speaker && (
                            <div className="flex items-center text-sm text-gray-500">
                              <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              {session.speaker}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center">
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2">
                          Details
                        </button>
                        <button className="inline-flex items-center p-1 border border-transparent text-gray-500 hover:text-red-500 focus:outline-none">
                          <Heart size={18} className="text-red-500 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 px-6 text-center">
                  <p className="text-gray-500">No sessions scheduled for this period.</p>
                  <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Sessions
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Split Content Row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recommended For You */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Recommended For You</h3>
                  <div className="flex">
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <Filter className="mr-1 h-4 w-4" />
                      Filter
                    </button>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recommendedSessions.map((session) => (
                  <div key={session.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-indigo-600">{session.title}</h4>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <Clock className="flex-shrink-0 mr-1 h-3.5 w-3.5 text-gray-400" />
                          {session.date} · {session.time}
                        </div>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <User className="flex-shrink-0 mr-1 h-3.5 w-3.5 text-gray-400" />
                          {session.speaker}
                        </div>
                        <div className="mt-2 flex items-center">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {session.match}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button className="inline-flex items-center p-1 border border-gray-300 rounded-md hover:bg-gray-50">
                          <PlusCircle size={16} className="text-indigo-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 px-4 py-4 sm:px-6 text-center">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View more recommendations</a>
              </div>
            </div>
            
            {/* My Connections */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Connections</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View all
                  </a>
                </div>
              </div>
              <div>
                <ul className="divide-y divide-gray-200">
                  {connections.map((connection) => (
                    <li key={connection.id} className="px-4 py-4 hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                            {connection.avatar}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{connection.name}</p>
                          <p className="text-sm text-gray-500 truncate">{connection.title}</p>
                        </div>
                        <div>
                          <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Message
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-gray-200 px-4 py-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Connected with {connections.length} attendees</span>
                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Find More
                </button>
              </div>
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Events</h3>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Explore all events
                </a>
              </div>
            </div>
            <div className="overflow-hidden overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                      <Calendar className="h-12 w-12 opacity-75" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-medium text-gray-900">{event.title}</h4>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {
                          new Date(event.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        }
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {event.location}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span 
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            event.registered ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {event.registered ? 'Registered' : 'Registration Open'}
                        </span>
                        <span className="text-xs text-gray-500">{event.sessions} sessions</span>
                      </div>
                      <div className="mt-4">
                        <button 
                          className={`w-full inline-flex justify-center items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm ${
                            event.registered
                              ? 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 border-transparent'
                              : 'text-white bg-indigo-600 hover:bg-indigo-700 border-transparent'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          {event.registered ? 'View Details' : 'Register Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendeesHome;