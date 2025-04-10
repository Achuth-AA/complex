// import React from 'react';
// import { useAuth } from "../Contexts/AuthContext"
// import { useNavigate } from 'react-router-dom';

// const OrganizersHome = () => {
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
//                 <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Sessions</a>
//                 <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Speakers</a>
//                 <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Attendees</a>
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
//           <h1 className="text-3xl font-bold text-gray-900">Organizer Dashboard</h1>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white overflow-hidden shadow rounded-lg">
//               <div className="px-4 py-5 sm:p-6">
//                 <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
//                 <div className="mt-4">
//                   <p className="text-3xl font-bold">5</p>
//                   <p className="mt-1 text-sm text-gray-500">You have 5 upcoming events in the next 30 days.</p>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-4 sm:px-6">
//                 <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all events</a>
//               </div>
//             </div>

//             <div className="bg-white overflow-hidden shadow rounded-lg">
//               <div className="px-4 py-5 sm:p-6">
//                 <h3 className="text-lg font-medium text-gray-900">Total Attendees</h3>
//                 <div className="mt-4">
//                   <p className="text-3xl font-bold">423</p>
//                   <p className="mt-1 text-sm text-gray-500">An increase of 7% from last month.</p>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-4 sm:px-6">
//                 <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View attendee details</a>
//               </div>
//             </div>

//             <div className="bg-white overflow-hidden shadow rounded-lg">
//               <div className="px-4 py-5 sm:p-6">
//                 <h3 className="text-lg font-medium text-gray-900">Pending Tasks</h3>
//                 <div className="mt-4">
//                   <p className="text-3xl font-bold">8</p>
//                   <p className="mt-1 text-sm text-gray-500">You have 8 pending tasks to complete.</p>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-4 sm:px-6">
//                 <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all tasks</a>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 bg-white shadow rounded-lg">
//             <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
//               <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
//             </div>
//             <ul className="divide-y divide-gray-200">
//               {[1, 2, 3, 4, 5].map((item) => (
//                 <li key={item} className="px-4 py-4 sm:px-6">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm font-medium text-indigo-600 truncate">Activity {item}</p>
//                     <div className="ml-2 flex-shrink-0 flex">
//                       <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                         {new Date().toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="mt-2 sm:flex sm:justify-between">
//                     <div className="sm:flex">
//                       <p className="text-sm text-gray-500">
//                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet.
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

// export default OrganizersHome;

import React, { useState } from 'react';
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, Users, MessageSquare, Bell, Settings, 
  ChevronDown, Search, LogOut, Menu, X, BarChart2,
  Briefcase, Award, CheckSquare, TrendingUp
} from 'lucide-react';

const OrganizersHome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Sample data for charts and statistics
  const upcomingEvents = [
    { id: 1, title: 'Tech Conference 2025', date: '2025-04-15', attendees: 350, status: 'active' },
    { id: 2, title: 'Digital Marketing Summit', date: '2025-05-02', attendees: 280, status: 'active' },
    { id: 3, title: 'AI & Machine Learning Expo', date: '2025-05-20', attendees: 420, status: 'active' }
  ];

  const recentActivities = [
    { id: 1, type: 'registration', description: 'New speaker registered: John Smith', time: '10 minutes ago' },
    { id: 2, type: 'payment', description: 'Payment received from Google Inc.', time: '1 hour ago' },
    { id: 3, type: 'update', description: 'Schedule updated for Tech Conference', time: '3 hours ago' },
    { id: 4, type: 'message', description: 'New message from Sarah Johnson', time: '5 hours ago' }
  ];

  const tasks = [
    { id: 1, title: 'Review speaker applications', dueDate: '2025-04-05', status: 'pending', priority: 'high' },
    { id: 2, title: 'Finalize venue arrangements', dueDate: '2025-04-10', status: 'pending', priority: 'high' },
    { id: 3, title: 'Approve marketing materials', dueDate: '2025-04-12', status: 'pending', priority: 'medium' }
  ];

  // Sample notification data
  const notifications = [
    { id: 1, title: 'New Registration', message: 'Sarah Johnson registered for Tech Conference', time: '10 minutes ago', read: false },
    { id: 2, title: 'Speaker Update', message: 'John Smith updated his presentation details', time: '1 hour ago', read: false },
    { id: 3, title: 'Deadline Reminder', message: 'Venue booking deadline approaching', time: '3 hours ago', read: true }
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
                  {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{user?.fullName || 'User'}</p>
                  <p className="text-xs text-indigo-300">Organizer</p>
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
                placeholder="Search events, speakers, attendees..."
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
                    {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                    {user?.fullName?.split(' ')[0] || 'User'}
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
                <h1 className="text-2xl font-bold text-gray-900">Organizer Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Welcome back! Here's what's happening with your events today.
                </p>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Calendar className="mr-2 h-4 w-4" />
                  Create New Event
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Events</dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">5</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-green-600 font-semibold">
                      <span>+12.5%</span>
                    </div>
                    <div className="text-sm text-gray-500">vs last quarter</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Attendees</dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">1,234</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-green-600 font-semibold">
                      <span>+7.2%</span>
                    </div>
                    <div className="text-sm text-gray-500">vs last month</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">$42,580</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-green-600 font-semibold">
                      <span>+18.3%</span>
                    </div>
                    <div className="text-sm text-gray-500">vs last month</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <CheckSquare className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Pending Tasks</dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">8</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-red-600 font-semibold">
                      <span>3 urgent</span>
                    </div>
                    <div className="text-sm text-gray-500">need attention</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content Sections */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Upcoming Events */}
            <div className="lg:col-span-2 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Events</h3>
                  <div className="flex">
                    <a href="#" className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3">
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendees
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upcomingEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-indigo-600">{event.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{event.attendees.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* To-Do List */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Tasks</h3>
                  <button className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200">
                    <span className="sr-only">Add task</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
              <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
                {tasks.map((task) => (
                  <li key={task.id} className="px-4 py-4">
                    <div className="flex items-center justify-between space-x-3">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <input 
                            id={`task-${task.id}`}
                            name={`task-${task.id}`}
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <label htmlFor={`task-${task.id}`} className="text-sm font-medium text-gray-900">
                            {task.title}
                          </label>
                          <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all tasks</a>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
            </div>
            <div className="flow-root">
              <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 rounded-md p-2 mr-3 ${
                        activity.type === 'registration' ? 'bg-green-100' :
                        activity.type === 'payment' ? 'bg-blue-100' :
                        activity.type === 'update' ? 'bg-purple-100' : 'bg-yellow-100'
                      }`}>
                        {activity.type === 'registration' && <Users className={`h-5 w-5 text-green-600`} />}
                        {activity.type === 'payment' && <Calendar className={`h-5 w-5 text-blue-600`} />}
                        {activity.type === 'update' && <Clock className={`h-5 w-5 text-purple-600`} />}
                        {activity.type === 'message' && <MessageSquare className={`h-5 w-5 text-yellow-600`} />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all activity</a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganizersHome;