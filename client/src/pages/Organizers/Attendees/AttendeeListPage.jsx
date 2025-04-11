import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Search, Filter, ChevronDown, User, 
  Mail, Phone, Check, X, Download, UserPlus, Users,
  Briefcase, Calendar, Tag, FileText
} from 'lucide-react';
import axios from 'axios';

const AttendeeListPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [attendees, setAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterTicket, setFilterTicket] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [event, setEvent] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  });
  
  // Available attendee types for filtering
  const attendeeTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'general', name: 'General Attendee' },
    { id: 'speaker', name: 'Speaker' },
    { id: 'vip', name: 'VIP' },
    { id: 'sponsor', name: 'Sponsor' },
    { id: 'staff', name: 'Staff' }
  ];
  
  // Available ticket types for filtering
  const ticketTypes = [
    { id: 'all', name: 'All Tickets' },
    { id: 'full', name: 'Full Pass' },
    { id: 'day', name: 'Day Pass' },
    { id: 'workshop', name: 'Workshop Only' },
    { id: 'virtual', name: 'Virtual Pass' }
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, you would fetch from your API
        // const eventResponse = await axios.get(`/api/events/${eventId}`);
        // const attendeesResponse = await axios.get(`/api/events/${eventId}/attendees`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock event data
        const mockEvent = {
          id: eventId,
          title: 'Tech Conference 2025',
          startDate: '2025-06-15',
          endDate: '2025-06-17',
          location: 'San Francisco, CA',
          attendeeCount: 850
        };
        
        // Mock attendees data
        const mockAttendees = [
          {
            id: 'a1',
            name: 'Jennifer Lawrence',
            email: 'jennifer.lawrence@example.com',
            phone: '+1 (555) 234-5678',
            company: 'InnoTech Solutions',
            title: 'Software Engineer',
            type: 'general',
            ticketType: 'full',
            registrationDate: '2025-02-10',
            checkedIn: true,
            profileImage: 'https://randomuser.me/api/portraits/women/12.jpg'
          },
          {
            id: 'a2',
            name: 'Michael Bradshaw',
            email: 'michael.bradshaw@example.com',
            phone: '+1 (555) 876-5432',
            company: 'DataWorks',
            title: 'Data Scientist',
            type: 'speaker',
            ticketType: 'full',
            registrationDate: '2025-01-25',
            checkedIn: true,
            profileImage: 'https://randomuser.me/api/portraits/men/67.jpg'
          },
          {
            id: 'a3',
            name: 'Sophia Chen',
            email: 'sophia.chen@example.com',
            phone: '+1 (555) 345-6789',
            company: 'CloudTech',
            title: 'Cloud Architect',
            type: 'general',
            ticketType: 'day',
            registrationDate: '2025-03-05',
            checkedIn: false,
            profileImage: 'https://randomuser.me/api/portraits/women/32.jpg'
          },
          {
            id: 'a4',
            name: 'Robert Wilson',
            email: 'robert.wilson@example.com',
            phone: '+1 (555) 456-7890',
            company: 'TechGiant Inc.',
            title: 'Product Manager',
            type: 'vip',
            ticketType: 'full',
            registrationDate: '2025-02-02',
            checkedIn: true,
            profileImage: 'https://randomuser.me/api/portraits/men/45.jpg'
          },
          {
            id: 'a5',
            name: 'Elena Rodriguez',
            email: 'elena.rodriguez@example.com',
            phone: '+1 (555) 567-8901',
            company: 'AppDev Solutions',
            title: 'UX Designer',
            type: 'general',
            ticketType: 'workshop',
            registrationDate: '2025-03-12',
            checkedIn: false,
            profileImage: 'https://randomuser.me/api/portraits/women/64.jpg'
          },
          {
            id: 'a6',
            name: 'David Thompson',
            email: 'david.thompson@example.com',
            phone: '+1 (555) 678-9012',
            company: 'DataViz Corp',
            title: 'Data Engineer',
            type: 'general',
            ticketType: 'virtual',
            registrationDate: '2025-02-28',
            checkedIn: false,
            profileImage: 'https://randomuser.me/api/portraits/men/53.jpg'
          },
          {
            id: 'a7',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@example.com',
            phone: '+1 (555) 789-0123',
            company: 'TechCorp Inc.',
            title: 'CTO',
            type: 'speaker',
            ticketType: 'full',
            registrationDate: '2025-01-15',
            checkedIn: true,
            profileImage: 'https://randomuser.me/api/portraits/women/24.jpg'
          },
          {
            id: 'a8',
            name: 'James Martinez',
            email: 'james.martinez@example.com',
            phone: '+1 (555) 890-1234',
            company: 'InnovateTech',
            title: 'Software Developer',
            type: 'general',
            ticketType: 'day',
            registrationDate: '2025-03-18',
            checkedIn: false,
            profileImage: 'https://randomuser.me/api/portraits/men/22.jpg'
          },
          {
            id: 'a9',
            name: 'Michelle Lee',
            email: 'michelle.lee@example.com',
            phone: '+1 (555) 901-2345',
            company: 'SparkTechnologies',
            title: 'Marketing Director',
            type: 'sponsor',
            ticketType: 'full',
            registrationDate: '2025-02-05',
            checkedIn: true,
            profileImage: 'https://randomuser.me/api/portraits/women/40.jpg'
          },
          {
            id: 'a10',
            name: 'Thomas Anderson',
            email: 'thomas.anderson@example.com',
            phone: '+1 (555) 012-3456',
            company: 'ConferenceOrg',
            title: 'Event Coordinator',
            type: 'staff',
            ticketType: 'full',
            registrationDate: '2025-01-10',
            checkedIn: true,
            profileImage: 'https://randomuser.me/api/portraits/men/75.jpg'
          },
          {
            id: 'a11',
            name: 'Anna Williams',
            email: 'anna.williams@example.com',
            phone: '+1 (555) 123-4567',
            company: 'TechInnovate',
            title: 'Frontend Developer',
            type: 'general',
            ticketType: 'full',
            registrationDate: '2025-02-20',
            checkedIn: true,
            profileImage: 'https://randomuser.me/api/portraits/women/52.jpg'
          },
          {
            id: 'a12',
            name: 'Carlos Mendez',
            email: 'carlos.mendez@example.com',
            phone: '+1 (555) 234-5678',
            company: 'CloudSolutions',
            title: 'DevOps Engineer',
            type: 'general',
            ticketType: 'workshop',
            registrationDate: '2025-03-01',
            checkedIn: false,
            profileImage: 'https://randomuser.me/api/portraits/men/62.jpg'
          }
        ];
        
        setEvent(mockEvent);
        setAttendees(mockAttendees);
        setPagination({
          ...pagination,
          totalItems: mockAttendees.length
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [eventId]);
  
  // Filter attendees based on search term and filters
  const filteredAttendees = attendees.filter(attendee => {
    const matchesSearch = 
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || attendee.type === filterType;
    const matchesTicket = filterTicket === 'all' || attendee.ticketType === filterTicket;
    
    return matchesSearch && matchesType && matchesTicket;
  });
  
  // Get current page of attendees
  const getCurrentAttendees = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    return filteredAttendees.slice(startIndex, startIndex + pagination.itemsPerPage);
  };
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setPagination({
      ...pagination,
      currentPage: pageNumber
    });
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
  
  // Handle export attendee list
  const handleExportAttendees = (format) => {
    // In a real app, this would trigger an API call to export attendees
    console.log(`Exporting attendees as ${format}`);
    setShowExportModal(false);
    
    // Simulate download
    setTimeout(() => {
      alert(`Attendee list exported as ${format.toUpperCase()}`);
    }, 1000);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-6">
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
              Attendees
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage attendees for {event?.title}
            </p>
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          <button
            type="button"
            onClick={() => setShowExportModal(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Export
          </button>
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}/attendees/create`)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add Attendee
          </button>
        </div>
      </div>
      
      {/* Event Stats */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Total Attendees</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{event?.attendeeCount || attendees.length}</dd>
            </div>
            <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Checked In</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {attendees.filter(a => a.checkedIn).length}
              </dd>
            </div>
            <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Speakers</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {attendees.filter(a => a.type === 'speaker').length}
              </dd>
            </div>
            <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">VIPs</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {attendees.filter(a => a.type === 'vip').length}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Search Input */}
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                placeholder="Search attendees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Button */}
            <div>
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
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700">Attendee Type</label>
                <select
                  id="type-filter"
                  name="type-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  {attendeeTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="ticket-filter" className="block text-sm font-medium text-gray-700">Ticket Type</label>
                <select
                  id="ticket-filter"
                  name="ticket-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={filterTicket}
                  onChange={(e) => setFilterTicket(e.target.value)}
                >
                  {ticketTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Attendee Count Summary */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredAttendees.length}</span> attendees
          {filterType !== 'all' && (
            <span> of type <span className="font-medium">{
              attendeeTypes.find(type => type.id === filterType)?.name
            }</span></span>
          )}
          {filterTicket !== 'all' && (
            <span> with <span className="font-medium">{
              ticketTypes.find(type => type.id === filterTicket)?.name
            }</span></span>
          )}
        </p>
        
        {searchTerm && (
          <p className="text-sm text-gray-500">
            Search results for "{searchTerm}"
          </p>
        )}
      </div>
      
      {/* Attendees List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {filteredAttendees.length > 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {getCurrentAttendees().map((attendee) => (
                  <li key={attendee.id} className="hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img 
                            className="h-12 w-12 rounded-full object-cover" 
                            src={attendee.profileImage} 
                            alt={attendee.name} 
                          />
                          <div className="ml-4">
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium text-indigo-600 truncate">{attendee.name}</h3>
                              <span className={`ml-2 px-2 py-0.5 flex-shrink-0 inline-block text-xs leading-5 font-medium rounded-full ${getAttendeeTypeBadgeColor(attendee.type)}`}>
                                {attendee.type.charAt(0).toUpperCase() + attendee.type.slice(1)}
                              </span>
                              <span className={`ml-2 px-2 py-0.5 flex-shrink-0 inline-block text-xs leading-5 font-medium rounded-full ${getTicketTypeBadgeColor(attendee.ticketType)}`}>
                                {ticketTypes.find(t => t.id === attendee.ticketType)?.name}
                              </span>
                              {attendee.checkedIn ? (
                                <span className="ml-2 px-2 py-0.5 flex-shrink-0 inline-flex items-center text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800">
                                  <Check className="mr-1 h-3 w-3" /> Checked In
                                </span>
                              ) : (
                                <span className="ml-2 px-2 py-0.5 flex-shrink-0 inline-flex items-center text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-800">
                                  Not Checked In
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{attendee.title} at {attendee.company}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/organizer/events/${eventId}/attendees/${attendee.id}`)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => navigate(`/organizer/events/${eventId}/attendees/${attendee.id}/edit`)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="flex items-center text-sm text-gray-500 mr-6">
                            <Mail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {attendee.email}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <Phone className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {attendee.phone}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          Registered on {formatDate(attendee.registrationDate)}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* Pagination */}
              {filteredAttendees.length > pagination.itemsPerPage && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.itemsPerPage + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(pagination.currentPage * pagination.itemsPerPage, filteredAttendees.length)}
                        </span>{' '}
                        of <span className="font-medium">{filteredAttendees.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => handlePageChange(pagination.currentPage - 1)}
                          disabled={pagination.currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                            pagination.currentPage === 1 
                              ? 'text-gray-300 cursor-not-allowed' 
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronDown className="h-5 w-5 rotate-90" />
                        </button>
                        
                        {/* Page numbers */}
                        {Array.from({ length: Math.ceil(filteredAttendees.length / pagination.itemsPerPage) }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                              pagination.currentPage === page
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => handlePageChange(pagination.currentPage + 1)}
                          disabled={pagination.currentPage === Math.ceil(filteredAttendees.length / pagination.itemsPerPage)}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            pagination.currentPage === Math.ceil(filteredAttendees.length / pagination.itemsPerPage) 
                              ? 'text-gray-300 cursor-not-allowed' 
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Next</span>
                          <ChevronDown className="h-5 w-5 -rotate-90" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg py-12 px-4 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No attendees found</h3>
              <p className="mt-1 text-gray-500">
                {searchTerm || filterType !== 'all' || filterTicket !== 'all' 
                  ? "Try adjusting your search or filters" 
                  : "Get started by adding your first attendee"}
              </p>
              {!searchTerm && filterType === 'all' && filterTicket === 'all' && (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => navigate(`/organizer/events/${eventId}/attendees/create`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <UserPlus className="-ml-1 mr-2 h-5 w-5" />
                    Add Attendee
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
      
      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowExportModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Export Attendee List
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Choose a format to export the attendee list. This will include all attendees matching your current filters.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleExportAttendees('csv')}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="text-lg mr-2">.CSV</span>
                    Spreadsheet
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExportAttendees('pdf')}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="text-lg mr-2">.PDF</span>
                    Document
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExportAttendees('excel')}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="text-lg mr-2">.XLSX</span>
                    Excel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExportAttendees('json')}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="text-lg mr-2">.JSON</span>
                    Data
                  </button>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setShowExportModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendeeListPage;