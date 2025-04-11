import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Search, Filter, ChevronDown, Calendar, 
  Clock, Download, Mail, AlertCircle, Check, X,
  Edit2, User, FileText, Plus, RefreshCw, UserPlus,
  CreditCard, DollarSign, Tag, ChevronRight, Settings
} from 'lucide-react';
import axios from 'axios';

const RegistrationManagement = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTicket, setFilterTicket] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  });
  const [selectedRegistrations, setSelectedRegistrations] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSendEmailModal, setShowSendEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  
  // Registration status options
  const statusTypes = [
    { id: 'all', name: 'All Statuses' },
    { id: 'confirmed', name: 'Confirmed' },
    { id: 'pending', name: 'Pending Payment' },
    { id: 'cancelled', name: 'Cancelled' },
    { id: 'waitlisted', name: 'Waitlisted' },
    { id: 'refunded', name: 'Refunded' }
  ];
  
  // Ticket types
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
        
        // In a real app, these would be API calls
        // const eventResponse = await axios.get(`/api/events/${eventId}`);
        // const registrationsResponse = await axios.get(`/api/events/${eventId}/registrations`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock event data
        const mockEvent = {
          id: eventId,
          title: 'Tech Conference 2025',
          startDate: '2025-06-15',
          endDate: '2025-06-17',
          location: 'San Francisco, CA',
          registrationStats: {
            total: 850,
            confirmed: 720,
            pending: 72,
            cancelled: 35,
            waitlisted: 18,
            refunded: 5
          },
          ticketTypes: [
            { 
              id: 'full', 
              name: 'Full Pass', 
              price: 499,
              sold: 520,
              capacity: 600
            },
            { 
              id: 'day', 
              name: 'Day Pass', 
              price: 199,
              sold: 150,
              capacity: 200
            },
            { 
              id: 'workshop', 
              name: 'Workshop Only', 
              price: 149,
              sold: 100,
              capacity: 120
            },
            { 
              id: 'virtual', 
              name: 'Virtual Pass', 
              price: 99,
              sold: 80,
              capacity: null // unlimited
            }
          ],
          revenue: {
            total: 374201,
            confirmed: 359401,
            pending: 14800
          }
        };
        
        // Generate mock registrations
        const mockRegistrations = [];
        const statuses = ['confirmed', 'pending', 'cancelled', 'waitlisted', 'refunded'];
        const statusWeights = [85, 8, 4, 2, 1]; // Distribution weights
        const tickets = ['full', 'day', 'workshop', 'virtual'];
        const ticketWeights = [60, 18, 12, 10]; // Distribution weights
        
        for (let i = 1; i <= 85; i++) {
          const randomStatus = weightedRandom(statuses, statusWeights);
          const randomTicket = weightedRandom(tickets, ticketWeights);
          const ticketData = mockEvent.ticketTypes.find(t => t.id === randomTicket);
          
          const registrationDate = new Date();
          registrationDate.setDate(registrationDate.getDate() - Math.floor(Math.random() * 60));
          
          mockRegistrations.push({
            id: `reg${i}`,
            registrationId: `REG-${2500 + i}`,
            status: randomStatus,
            ticketType: randomTicket,
            ticketName: ticketData.name,
            ticketPrice: ticketData.price,
            registrationDate: registrationDate.toISOString().split('T')[0],
            attendee: {
              id: `att${i}`,
              name: generateRandomName(),
              email: `attendee${i}@example.com`,
              company: generateRandomCompany(),
              profileImage: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`
            },
            paymentMethod: randomStatus === 'pending' ? null : Math.random() > 0.7 ? 'paypal' : 'credit_card',
            transactionId: randomStatus === 'confirmed' || randomStatus === 'refunded' ? `TXID-${Math.floor(Math.random() * 10000000)}` : null,
            notes: Math.random() > 0.8 ? 'Requested vegetarian meals' : ''
          });
        }
        
        setEvent(mockEvent);
        setRegistrations(mockRegistrations);
        setPagination({
          ...pagination,
          totalItems: mockRegistrations.length
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [eventId]);
  
  // Helper functions for random data generation
  function weightedRandom(items, weights) {
    const total = weights.reduce((acc, weight) => acc + weight, 0);
    let random = Math.random() * total;
    
    for (let i = 0; i < items.length; i++) {
      if (random < weights[i]) {
        return items[i];
      }
      random -= weights[i];
    }
    return items[0];
  }
  
  function generateRandomName() {
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Jennifer', 'William', 'Elizabeth', 'James', 'Patricia', 'Thomas', 'Linda', 'Daniel', 'Barbara'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin'];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  }
  
  function generateRandomCompany() {
    const companies = ['TechCorp', 'InnoSoft', 'DataWave', 'CloudFlare', 'NexusNet', 'ByteWorks', 'QuantumSys', 'CoreTech', 'VisionAI', 'PulseTech', 'CyberSec', 'AlgoSoft'];
    return companies[Math.floor(Math.random() * companies.length)];
  }
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Get registrations for current page
  const getCurrentRegistrations = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    return filteredRegistrations.slice(startIndex, startIndex + pagination.itemsPerPage);
  };
  
  // Filter registrations based on search and filters
  const filteredRegistrations = registrations.filter(registration => {
    const matchesSearch = 
      registration.attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.registrationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (registration.transactionId && registration.transactionId.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || registration.status === filterStatus;
    const matchesTicket = filterTicket === 'all' || registration.ticketType === filterTicket;
    
    return matchesSearch && matchesStatus && matchesTicket;
  });
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setPagination({
      ...pagination,
      currentPage: pageNumber
    });
  };
  
  // Select all registrations
  const handleSelectAll = () => {
    if (selectedRegistrations.length === getCurrentRegistrations().length) {
      setSelectedRegistrations([]);
    } else {
      setSelectedRegistrations(getCurrentRegistrations().map(reg => reg.id));
    }
  };
  
  // Toggle registration selection
  const toggleRegistrationSelection = (regId) => {
    setSelectedRegistrations(prev => {
      if (prev.includes(regId)) {
        return prev.filter(id => id !== regId);
      } else {
        return [...prev, regId];
      }
    });
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'waitlisted':
        return 'bg-blue-100 text-blue-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
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
  
  // Handle bulk action
  const handleApplyBulkAction = async () => {
    if (!bulkAction || selectedRegistrations.length === 0) return;
    
    setIsSaving(true);
    
    try {
      // In a real app, this would be an API call
      // await axios.post(`/api/events/${eventId}/registrations/bulk-action`, {
      //   registrationIds: selectedRegistrations,
      //   action: bulkAction
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state based on action
      let updatedRegistrations = [...registrations];
      let actionMessage = '';
      
      switch (bulkAction) {
        case 'confirm':
          updatedRegistrations = updatedRegistrations.map(reg => 
            selectedRegistrations.includes(reg.id) ? { ...reg, status: 'confirmed' } : reg
          );
          actionMessage = 'Registrations confirmed successfully';
          break;
        case 'cancel':
          updatedRegistrations = updatedRegistrations.map(reg => 
            selectedRegistrations.includes(reg.id) ? { ...reg, status: 'cancelled' } : reg
          );
          actionMessage = 'Registrations cancelled successfully';
          break;
        case 'waitlist':
          updatedRegistrations = updatedRegistrations.map(reg => 
            selectedRegistrations.includes(reg.id) ? { ...reg, status: 'waitlisted' } : reg
          );
          actionMessage = 'Registrations moved to waitlist successfully';
          break;
        case 'refund':
          updatedRegistrations = updatedRegistrations.map(reg => 
            selectedRegistrations.includes(reg.id) ? { ...reg, status: 'refunded' } : reg
          );
          actionMessage = 'Registrations marked as refunded successfully';
          break;
        case 'email':
          setShowSendEmailModal(true);
          break;
        default:
          break;
      }
      
      setRegistrations(updatedRegistrations);
      
      if (bulkAction !== 'email') {
        setSuccessMessage(actionMessage);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
      
      setIsSaving(false);
      setBulkAction('');
      if (bulkAction !== 'email') {
        setSelectedRegistrations([]);
      }
    } catch (error) {
      console.error('Error applying bulk action:', error);
      setIsSaving(false);
    }
  };
  
  // Handle sending email
  const handleSendEmail = async () => {
    if (!emailSubject || !emailBody || selectedRegistrations.length === 0) return;
    
    setIsSaving(true);
    
    try {
      // In a real app, this would be an API call
      // await axios.post(`/api/events/${eventId}/registrations/send-email`, {
      //   registrationIds: selectedRegistrations,
      //   subject: emailSubject,
      //   body: emailBody
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setSuccessMessage(`Email sent to ${selectedRegistrations.length} ${selectedRegistrations.length === 1 ? 'attendee' : 'attendees'} successfully`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setIsSaving(false);
      setShowSendEmailModal(false);
      setEmailSubject('');
      setEmailBody('');
      setSelectedRegistrations([]);
    } catch (error) {
      console.error('Error sending email:', error);
      setIsSaving(false);
    }
  };
  
  // Handle export registrations
  const handleExportRegistrations = (format) => {
    // In a real app, this would trigger an appropriate API call for different formats
    alert(`Exporting registrations as ${format.toUpperCase()}`);
  };
  
  // Handle changing registration status
  const handleChangeStatus = async (registrationId, newStatus) => {
    try {
      // In a real app, this would be an API call
      // await axios.put(`/api/events/${eventId}/registrations/${registrationId}`, {
      //   status: newStatus
      // });
      
      // Update local state
      const updatedRegistrations = registrations.map(reg => 
        reg.id === registrationId ? { ...reg, status: newStatus } : reg
      );
      
      setRegistrations(updatedRegistrations);
      
      setSuccessMessage('Registration status updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error changing registration status:', error);
    }
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
              Registration Management
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage registrations for {event?.title}
            </p>
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}/payments/ticket-config`)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Settings className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Ticket Settings
          </button>
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}/attendees/create`)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserPlus className="-ml-1 mr-2 h-5 w-5" />
            Add Registration
          </button>
        </div>
      </div>
      
      {/* Registration Stats */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Registration Overview</h3>
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Total Registrations</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{event?.registrationStats.total}</dd>
            </div>
            <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Confirmed</dt>
              <dd className="mt-1 text-3xl font-semibold text-green-600">{event?.registrationStats.confirmed}</dd>
            </div>
            <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Pending Payment</dt>
              <dd className="mt-1 text-3xl font-semibold text-yellow-600">{event?.registrationStats.pending}</dd>
            </div>
            <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Revenue</dt>
              <dd className="mt-1 text-3xl font-semibold text-indigo-600">{formatCurrency(event?.revenue.total / 100)}</dd>
            </div>
          </dl>
          
          {/* Ticket Sales Progress */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-3">Ticket Sales Progress</h4>
            <div className="space-y-4">
              {event?.ticketTypes.map(ticket => (
                <div key={ticket.id} className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTicketTypeBadgeColor(ticket.id)}`}>
                        {ticket.name}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {formatCurrency(ticket.price)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">{ticket.sold}</span>
                      {ticket.capacity ? ` / ${ticket.capacity}` : ' (unlimited)'}
                      {ticket.capacity ? ` (${Math.round((ticket.sold / ticket.capacity) * 100)}%)` : ''}
                    </div>
                  </div>
                  {ticket.capacity && (
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div 
                          style={{ width: `${Math.min((ticket.sold / ticket.capacity) * 100, 100)}%` }} 
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                            (ticket.sold / ticket.capacity) > 0.9 ? 'bg-red-500' :
                            (ticket.sold / ticket.capacity) > 0.7 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
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
                placeholder="Search by name, email, or registration ID..."
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
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
                  Registration Status
                </label>
                <select
                  id="status-filter"
                  name="status-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  {statusTypes.map((status) => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="ticket-filter" className="block text-sm font-medium text-gray-700">
                  Ticket Type
                </label>
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
              
              <div className="md:col-span-2 flex flex-wrap gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => handleExportRegistrations('csv')}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Download className="mr-1.5 h-4 w-4" />
                  Export CSV
                </button>
                <button
                  type="button"
                  onClick={() => handleExportRegistrations('excel')}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Download className="mr-1.5 h-4 w-4" />
                  Export Excel
                </button>
                <button
                  type="button"
                  onClick={() => handleExportRegistrations('pdf')}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Download className="mr-1.5 h-4 w-4" />
                  Export PDF
                </button>
              </div>
            </div>
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
      
      {/* Registrations List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex flex-wrap items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Registrations
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 mr-4">
                Showing {filteredRegistrations.length} registrations
              </p>
            </div>
            
            {/* Bulk Actions */}
            {filteredRegistrations.length > 0 && (
              <div className="flex flex-wrap items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedRegistrations.length === getCurrentRegistrations().length && getCurrentRegistrations().length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-3"
                  />
                  <span className="text-sm text-gray-700">
                    {selectedRegistrations.length === 0 
                      ? 'Select All' 
                      : `${selectedRegistrations.length} selected`}
                  </span>
                </div>
                
                {selectedRegistrations.length > 0 && (
                  <div className="flex items-center mt-2 sm:mt-0">
                    <span className="text-sm text-gray-700 mr-2">Bulk action:</span>
                    <select
                      value={bulkAction}
                      onChange={(e) => setBulkAction(e.target.value)}
                      className="inline-block w-auto pl-3 pr-10 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="">Select action</option>
                      <option value="confirm">Confirm Registration</option>
                      <option value="cancel">Cancel Registration</option>
                      <option value="waitlist">Move to Waitlist</option>
                      <option value="refund">Mark as Refunded</option>
                      <option value="email">Send Email</option>
                    </select>
                    
                    <button
                      type="button"
                      onClick={handleApplyBulkAction}
                      disabled={!bulkAction || isSaving}
                      className={`ml-2 inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white ${
                        !bulkAction || isSaving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin mr-1.5 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Applying...
                        </>
                      ) : (
                        'Apply'
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {filteredRegistrations.length > 0 ? (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '40px' }}>
                      &nbsp;
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendee/Registration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getCurrentRegistrations().map((registration) => (
                    <tr key={registration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedRegistrations.includes(registration.id)}
                          onChange={() => toggleRegistrationSelection(registration.id)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={registration.attendee.profileImage} 
                              alt={registration.attendee.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {registration.attendee.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {registration.attendee.email}
                            </div>
                            <div className="text-xs text-gray-500">
                              {registration.registrationId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTicketTypeBadgeColor(registration.ticketType)}`}>
                            {registration.ticketName}
                          </span>
                          <span className="text-sm text-gray-500 mt-1">
                            {formatCurrency(registration.ticketPrice)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(registration.status)}`}>
                          {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {registration.paymentMethod ? (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-900 flex items-center">
                              {registration.paymentMethod === 'credit_card' ? (
                                <CreditCard className="h-4 w-4 mr-1.5 text-gray-400" />
                              ) : (
                                <DollarSign className="h-4 w-4 mr-1.5 text-gray-400" />
                              )}
                              {registration.paymentMethod === 'credit_card' ? 'Credit Card' : 'PayPal'}
                            </span>
                            {registration.transactionId && (
                              <span className="text-xs text-gray-500 mt-1">
                                {registration.transactionId}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-yellow-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1.5" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(registration.registrationDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {registration.status === 'pending' && (
                            <button
                              onClick={() => handleChangeStatus(registration.id, 'confirmed')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Confirm
                            </button>
                          )}
                          <button
                            onClick={() => navigate(`/organizer/events/${eventId}/attendees/${registration.attendee.id}`)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View
                          </button>
                          <button
                            onClick={() => navigate(`/organizer/events/${eventId}/attendees/${registration.attendee.id}/edit`)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Pagination */}
              {filteredRegistrations.length > pagination.itemsPerPage && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.itemsPerPage + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(pagination.currentPage * pagination.itemsPerPage, filteredRegistrations.length)}
                        </span>{' '}
                        of <span className="font-medium">{filteredRegistrations.length}</span> results
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
                        {Array.from({ length: Math.ceil(filteredRegistrations.length / pagination.itemsPerPage) }, (_, i) => i + 1).map(page => (
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
                          disabled={pagination.currentPage === Math.ceil(filteredRegistrations.length / pagination.itemsPerPage)}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            pagination.currentPage === Math.ceil(filteredRegistrations.length / pagination.itemsPerPage) 
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
            </>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No registrations found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterStatus !== 'all' || filterTicket !== 'all'
                  ? "Try adjusting your search or filters" 
                  : "Get started by adding your first registration"}
              </p>
              {!searchTerm && filterStatus === 'all' && filterTicket === 'all' && (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => navigate(`/organizer/events/${eventId}/attendees/create`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Add Registration
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Send Email Modal */}
      {showSendEmailModal && (
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
                    Send Email to Attendees
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Compose an email to send to {selectedRegistrations.length} selected {selectedRegistrations.length === 1 ? 'attendee' : 'attendees'}.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="email-subject"
                      id="email-subject"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Email subject"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email-body" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="email-body"
                      name="email-body"
                      rows="6"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Compose your message here..."
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Available variables:</p>
                    <ul className="list-disc pl-5 mt-1">
                      <li>%ATTENDEE_NAME% - Attendee's full name</li>
                      <li>%EVENT_NAME% - Event name</li>
                      <li>%EVENT_DATE% - Event date</li>
                      <li>%TICKET_TYPE% - Ticket type</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm ${
                    !emailSubject || !emailBody || isSaving ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handleSendEmail}
                  disabled={!emailSubject || !emailBody || isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Email'
                  )}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowSendEmailModal(false);
                    setEmailSubject('');
                    setEmailBody('');
                  }}
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

export default RegistrationManagement;