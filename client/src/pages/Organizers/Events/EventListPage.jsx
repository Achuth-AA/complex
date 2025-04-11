import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Calendar, Filter, ChevronDown, MapPin, Users, Clock } from 'lucide-react';
import axios from 'axios';

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        // In production, replace with real API call
        // const response = await axios.get('/api/events');
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        
        const mockEvents = [
          {
            id: '1',
            title: 'Tech Conference 2025',
            description: 'Annual technology conference featuring the latest in AI, web development, and cloud computing.',
            startDate: '2025-06-15T09:00:00',
            endDate: '2025-06-17T18:00:00',
            location: 'San Francisco Convention Center',
            registeredAttendees: 247,
            totalCapacity: 500,
            status: 'upcoming',
            imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
          },
          {
            id: '2',
            title: 'Digital Marketing Summit',
            description: 'Learn from industry experts about the latest digital marketing strategies and tools.',
            startDate: '2025-05-10T10:00:00',
            endDate: '2025-05-12T17:00:00',
            location: 'Chicago Marriott Downtown',
            registeredAttendees: 189,
            totalCapacity: 350,
            status: 'upcoming',
            imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
          },
          {
            id: '3',
            title: 'AI & Machine Learning Expo',
            description: 'Showcasing the latest advancements in artificial intelligence and machine learning technologies.',
            startDate: '2025-07-22T08:30:00',
            endDate: '2025-07-24T16:30:00',
            location: 'Seattle Convention Center',
            registeredAttendees: 112,
            totalCapacity: 400,
            status: 'upcoming',
            imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
          },
          {
            id: '4',
            title: 'Product Management Workshop',
            description: 'An intensive workshop for product managers to refine their skills and learn new methodologies.',
            startDate: '2025-04-05T09:00:00',
            endDate: '2025-04-05T17:00:00',
            location: 'New York Hilton Midtown',
            registeredAttendees: 78,
            totalCapacity: 150,
            status: 'completed',
            imageUrl: 'https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
          },
          {
            id: '5',
            title: 'Sustainable Business Conference',
            description: 'Exploring sustainable business practices and environmental responsibility in modern corporations.',
            startDate: '2025-08-18T09:30:00',
            endDate: '2025-08-20T16:00:00',
            location: 'Miami Beach Convention Center',
            registeredAttendees: 56,
            totalCapacity: 300,
            status: 'draft',
            imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
          }
        ];
        
        setEvents(mockEvents);
        setFilteredEvents(mockEvents);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Filter events based on search term and status
    const filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
    
    setFilteredEvents(filtered);
  }, [searchTerm, filterStatus, events]);

  // Format date range for display
  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`;
    }
    
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  // Status badge style
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Events Management
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => navigate('/organizer/events-management')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              Create Event
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Search Input */}
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Button */}
              <div className="md:col-span-1">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Filter className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                  Filters
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Status Filter */}
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      id="status"
                      name="status"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>

                  {/* Additional filters could be added here */}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Events List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {filteredEvents.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredEvents.map((event) => (
                    <li key={event.id}>
                      <div 
                        className="block hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/organizer/events/${event.id}`)}
                      >
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {event.imageUrl && (
                                <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden mr-4 hidden sm:block">
                                  <img 
                                    src={event.imageUrl} 
                                    alt={event.title} 
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <p className="text-lg font-medium text-indigo-600 truncate">{event.title}</p>
                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{event.description}</p>
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(event.status)}`}>
                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500 mr-6">
                                <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                {formatDateRange(event.startDate, event.endDate)}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 mr-6">
                                <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                {event.location}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                {event.registeredAttendees} / {event.totalCapacity} registered
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No events found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || filterStatus !== 'all' 
                    ? "Try adjusting your search or filters" 
                    : "Get started by creating a new event"}
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/organizer/events-management')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Create Event
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventListPage;