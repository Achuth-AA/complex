import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Save, Plus, Trash2, DollarSign, 
  CalendarRange, Calendar, Users, Tag, Settings,
  Clock, Info, HelpCircle, Check, AlertTriangle
} from 'lucide-react';
import axios from 'axios';

const TicketConfigPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [errors, setErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  
  // Default ticket template for new tickets
  const defaultTicket = {
    name: '',
    description: '',
    price: 0,
    currency: 'USD',
    capacity: null,
    isUnlimited: true,
    isFree: false,
    startDate: '',
    endDate: '',
    isEarlyBird: false,
    isHidden: false,
    maxPerOrder: 10,
    minPerOrder: 1
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, these would be API calls
        // const eventResponse = await axios.get(`/api/events/${eventId}`);
        // const ticketsResponse = await axios.get(`/api/events/${eventId}/tickets`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock event data
        const mockEvent = {
          id: eventId,
          title: 'Tech Conference 2025',
          startDate: '2025-06-15',
          endDate: '2025-06-17',
          location: 'San Francisco, CA',
          currency: 'USD'
        };
        
        // Mock tickets data
        const mockTickets = [
          {
            id: 'ticket1',
            name: 'Full Conference Pass',
            description: 'Access to all conference sessions, workshops, and networking events for all three days.',
            price: 499,
            currency: 'USD',
            capacity: 600,
            isUnlimited: false,
            isFree: false,
            startDate: '2024-10-01',
            endDate: '2025-06-10',
            isEarlyBird: false,
            isHidden: false,
            ticketsSold: 420,
            maxPerOrder: 5,
            minPerOrder: 1
          },
          {
            id: 'ticket2',
            name: 'Early Bird Pass',
            description: 'Limited early bird tickets with access to all conference sessions at a discounted rate.',
            price: 349,
            currency: 'USD',
            capacity: 200,
            isUnlimited: false,
            isFree: false,
            startDate: '2024-10-01',
            endDate: '2025-01-15',
            isEarlyBird: true,
            isHidden: false,
            ticketsSold: 200,
            maxPerOrder: 2,
            minPerOrder: 1
          },
          {
            id: 'ticket3',
            name: 'Single Day Pass',
            description: 'Access to all sessions and events for a single day of your choice.',
            price: 199,
            currency: 'USD',
            capacity: 300,
            isUnlimited: false,
            isFree: false,
            startDate: '2024-10-01',
            endDate: '2025-06-10',
            isEarlyBird: false,
            isHidden: false,
            ticketsSold: 147,
            maxPerOrder: 10,
            minPerOrder: 1
          },
          {
            id: 'ticket4',
            name: 'Workshop Only',
            description: 'Access to workshop sessions only. Does not include main conference sessions.',
            price: 149,
            currency: 'USD',
            capacity: 150,
            isUnlimited: false,
            isFree: false,
            startDate: '2024-10-01',
            endDate: '2025-06-10',
            isEarlyBird: false,
            isHidden: false,
            ticketsSold: 98,
            maxPerOrder: 3,
            minPerOrder: 1
          },
          {
            id: 'ticket5',
            name: 'Virtual Pass',
            description: 'Remote access to livestreamed sessions and digital conference materials.',
            price: 99,
            currency: 'USD',
            capacity: null,
            isUnlimited: true,
            isFree: false,
            startDate: '2024-10-01',
            endDate: '2025-06-14',
            isEarlyBird: false,
            isHidden: false,
            ticketsSold: 215,
            maxPerOrder: 10,
            minPerOrder: 1
          },
          {
            id: 'ticket6',
            name: 'Student Pass',
            description: 'Discounted rate for currently enrolled students. Valid student ID required at check-in.',
            price: 199,
            currency: 'USD',
            capacity: 100,
            isUnlimited: false,
            isFree: false,
            startDate: '2024-10-01',
            endDate: '2025-06-10',
            isEarlyBird: false,
            isHidden: false,
            ticketsSold: 87,
            maxPerOrder: 1,
            minPerOrder: 1
          },
          {
            id: 'ticket7',
            name: 'VIP Pass',
            description: 'Premium access including exclusive networking sessions, priority seating, and special events.',
            price: 999,
            currency: 'USD',
            capacity: 50,
            isUnlimited: false,
            isFree: false,
            startDate: '2024-10-01',
            endDate: '2025-05-01',
            isEarlyBird: false,
            isHidden: false,
            ticketsSold: 42,
            maxPerOrder: 2,
            minPerOrder: 1
          },
          {
            id: 'ticket8',
            name: 'Speaker Guest Pass',
            description: 'Complementary pass for speaker guests.',
            price: 0,
            currency: 'USD',
            capacity: 30,
            isUnlimited: false,
            isFree: true,
            startDate: '2024-10-01',
            endDate: '2025-06-14',
            isEarlyBird: false,
            isHidden: true,
            ticketsSold: 12,
            maxPerOrder: 1,
            minPerOrder: 1
          }
        ];
        
        setEvent(mockEvent);
        setTickets(mockTickets);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [eventId]);
  
  // Add a new ticket
  const handleAddTicket = () => {
    const newTicket = {
      ...defaultTicket,
      id: `new-ticket-${Date.now()}`,
      startDate: event?.startDate || '',
      endDate: event?.endDate || '',
      currency: event?.currency || 'USD',
      ticketsSold: 0
    };
    
    setTickets([...tickets, newTicket]);
  };
  
  // Format currency
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Handle input change for a ticket
  const handleTicketChange = (ticketId, field, value) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        // Special handling for checkbox fields
        if (field === 'isUnlimited' && value === true) {
          return { ...ticket, [field]: value, capacity: null };
        }
        
        // Special handling for price field (free tickets)
        if (field === 'isFree') {
          return { ...ticket, [field]: value, price: value ? 0 : ticket.price > 0 ? ticket.price : 99 };
        }
        
        // For all other fields
        return { ...ticket, [field]: value };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    
    // Clear errors for this field if it exists
    if (errors[`${ticketId}-${field}`]) {
      const newErrors = {...errors};
      delete newErrors[`${ticketId}-${field}`];
      setErrors(newErrors);
    }
  };
  
  // Prepare for deletion
  const handlePrepareDelete = (ticket) => {
    setTicketToDelete(ticket);
    setShowDeleteModal(true);
  };
  
  // Delete ticket
  const handleDeleteTicket = () => {
    if (!ticketToDelete) return;
    
    // If tickets have been sold, don't allow deletion in a real app
    if (ticketToDelete.ticketsSold > 0) {
      alert("Cannot delete a ticket that has already been sold. Consider hiding it instead.");
      setShowDeleteModal(false);
      setTicketToDelete(null);
      return;
    }
    
    const updatedTickets = tickets.filter(ticket => ticket.id !== ticketToDelete.id);
    setTickets(updatedTickets);
    setShowDeleteModal(false);
    setTicketToDelete(null);
  };
  
  // Calculate tickets remaining
  const calculateTicketsRemaining = (ticket) => {
    if (ticket.isUnlimited) return 'Unlimited';
    return ticket.capacity - ticket.ticketsSold;
  };
  
  // Calculate percentage sold
  const calculatePercentageSold = (ticket) => {
    if (ticket.isUnlimited || ticket.capacity === 0) return 0;
    return Math.round((ticket.ticketsSold / ticket.capacity) * 100);
  };
  
  // Get progress bar color
  const getProgressBarColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    tickets.forEach(ticket => {
      if (!ticket.name.trim()) {
        newErrors[`${ticket.id}-name`] = 'Ticket name is required';
      }
      
      if (!ticket.isUnlimited && (!ticket.capacity || ticket.capacity <= 0)) {
        newErrors[`${ticket.id}-capacity`] = 'Please enter a valid capacity';
      }
      
      if (!ticket.isFree && (!ticket.price || ticket.price < 0)) {
        newErrors[`${ticket.id}-price`] = 'Please enter a valid price';
      }
      
      if (!ticket.startDate) {
        newErrors[`${ticket.id}-startDate`] = 'Start date is required';
      }
      
      if (!ticket.endDate) {
        newErrors[`${ticket.id}-endDate`] = 'End date is required';
      }
      
      if (ticket.startDate && ticket.endDate && new Date(ticket.startDate) > new Date(ticket.endDate)) {
        newErrors[`${ticket.id}-dateRange`] = 'End date must be after start date';
      }
      
      if (ticket.minPerOrder > ticket.maxPerOrder) {
        newErrors[`${ticket.id}-orderLimits`] = 'Minimum per order cannot be greater than maximum';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Save all tickets
  const handleSaveTickets = async () => {
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorId = Object.keys(errors)[0];
      if (firstErrorId) {
        const element = document.getElementById(firstErrorId.split('-')[0]);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSaving(true);
    
    try {
      // In a real app, this would be an API call
      // await axios.put(`/api/events/${eventId}/tickets`, { tickets });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage('Ticket configurations saved successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving ticket configurations:', error);
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
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
              Ticket Configuration
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Configure ticket types for {event?.title}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}/payments/settings`)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Settings className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Payment Settings
          </button>
          <button
            type="button"
            onClick={handleSaveTickets}
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
      
      {/* Tickets List */}
      <div className="space-y-6 mb-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Ticket Types</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Configure the ticket options available for purchase</p>
            </div>
            <button
              type="button"
              onClick={handleAddTicket}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="-ml-0.5 mr-2 h-4 w-4" />
              Add Ticket Type
            </button>
          </div>
        </div>
        
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div key={ticket.id} id={ticket.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={ticket.name}
                            onChange={(e) => handleTicketChange(ticket.id, 'name', e.target.value)}
                            className={`block text-xl font-medium text-gray-900 border-0 p-0 focus:ring-0 ${
                              errors[`${ticket.id}-name`] ? 'border-b-2 border-red-500' : ''
                            }`}
                            placeholder="Ticket Name"
                          />
                          {ticket.isHidden && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Hidden
                            </span>
                          )}
                          {ticket.isEarlyBird && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Early Bird
                            </span>
                          )}
                          {ticket.isFree && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Free
                            </span>
                          )}
                        </div>
                        {errors[`${ticket.id}-name`] && (
                          <p className="mt-1 text-sm text-red-600">{errors[`${ticket.id}-name`]}</p>
                        )}
                      </div>
                      <div className="mt-4 sm:mt-0">
                        <button
                          type="button"
                          onClick={() => handlePrepareDelete(ticket)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          disabled={ticket.ticketsSold > 0}
                          title={ticket.ticketsSold > 0 ? "Cannot delete a ticket that has already been sold" : "Delete ticket"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-1">
                      <textarea
                        value={ticket.description}
                        onChange={(e) => handleTicketChange(ticket.id, 'description', e.target.value)}
                        rows="2"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Description (optional)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {/* Price Settings */}
                  <div className="sm:col-span-2">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-900 flex items-center">
                        <DollarSign className="mr-1 h-4 w-4 text-gray-500" />
                        Price
                      </label>
                      <div className="flex items-center">
                        <div className="relative flex items-center w-full">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">{ticket.currency}</span>
                          </div>
                          <input
                            type="number"
                            value={ticket.price}
                            onChange={(e) => handleTicketChange(ticket.id, 'price', parseFloat(e.target.value) || 0)}
                            disabled={ticket.isFree}
                            min="0"
                            step="0.01"
                            className={`pl-16 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${
                              ticket.isFree ? 'bg-gray-100 cursor-not-allowed' : ''
                            } ${errors[`${ticket.id}-price`] ? 'border-red-300' : ''}`}
                          />
                        </div>
                      </div>
                    </div>
                    {errors[`${ticket.id}-price`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`${ticket.id}-price`]}</p>
                    )}
                    <div className="mt-2">
                      <div className="flex items-center">
                        <input
                          id={`free-ticket-${ticket.id}`}
                          name={`free-ticket-${ticket.id}`}
                          type="checkbox"
                          checked={ticket.isFree}
                          onChange={(e) => handleTicketChange(ticket.id, 'isFree', e.target.checked)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`free-ticket-${ticket.id}`} className="ml-2 block text-sm text-gray-900">
                          This is a free ticket
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Capacity Settings */}
                  <div className="sm:col-span-2">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-900 flex items-center">
                        <Users className="mr-1 h-4 w-4 text-gray-500" />
                        Capacity
                      </label>
                      <div className="flex items-center">
                        <div className="relative flex items-center w-full">
                          <input
                            type="number"
                            value={ticket.capacity || ''}
                            onChange={(e) => handleTicketChange(ticket.id, 'capacity', parseInt(e.target.value) || '')}
                            disabled={ticket.isUnlimited}
                            min="1"
                            className={`block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${
                              ticket.isUnlimited ? 'bg-gray-100 cursor-not-allowed' : ''
                            } ${errors[`${ticket.id}-capacity`] ? 'border-red-300' : ''}`}
                          />
                        </div>
                      </div>
                    </div>
                    {errors[`${ticket.id}-capacity`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`${ticket.id}-capacity`]}</p>
                    )}
                    <div className="mt-2">
                      <div className="flex items-center">
                        <input
                          id={`unlimited-capacity-${ticket.id}`}
                          name={`unlimited-capacity-${ticket.id}`}
                          type="checkbox"
                          checked={ticket.isUnlimited}
                          onChange={(e) => handleTicketChange(ticket.id, 'isUnlimited', e.target.checked)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`unlimited-capacity-${ticket.id}`} className="ml-2 block text-sm text-gray-900">
                          Unlimited capacity
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sales Status */}
                  <div className="sm:col-span-2">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-900 flex items-center">
                        <Tag className="mr-1 h-4 w-4 text-gray-500" />
                        Sales Status
                      </label>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between mb-1">
                          <div className="text-sm text-gray-700">
                            <span className="font-medium">{ticket.ticketsSold}</span> sold
                          </div>
                          <div className="text-sm text-gray-700">
                            <span className="font-medium">{calculateTicketsRemaining(ticket)}</span> remaining
                          </div>
                        </div>
                        {!ticket.isUnlimited && (
                          <div className="relative pt-1">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                              <div 
                                style={{ width: `${calculatePercentageSold(ticket)}%` }} 
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                  getProgressBarColor(calculatePercentageSold(ticket))
                                }`}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center">
                        <input
                          id={`hidden-ticket-${ticket.id}`}
                          name={`hidden-ticket-${ticket.id}`}
                          type="checkbox"
                          checked={ticket.isHidden}
                          onChange={(e) => handleTicketChange(ticket.id, 'isHidden', e.target.checked)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`hidden-ticket-${ticket.id}`} className="ml-2 block text-sm text-gray-900">
                          Hide this ticket from customers
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {/* Sale Dates */}
                  <div className="sm:col-span-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-900 flex items-center">
                        <CalendarRange className="mr-1 h-4 w-4 text-gray-500" />
                        Sales Period
                      </label>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="relative flex items-center">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Calendar className="h-4 w-4 text-gray-400" />
                          </div>
                          <input 
                            type="date" 
                            value={ticket.startDate}
                            onChange={(e) => handleTicketChange(ticket.id, 'startDate', e.target.value)}
                            className={`pl-10 block shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${
                              errors[`${ticket.id}-startDate`] || errors[`${ticket.id}-dateRange`] ? 'border-red-300' : ''
                            }`}
                          />
                        </div>

                        <span className="text-gray-500">to</span>

                        <div className="relative flex items-center">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Calendar className="h-4 w-4 text-gray-400" />
                          </div>
                          <input 
                            type="date"
                            value={ticket.endDate}
                            onChange={(e) => handleTicketChange(ticket.id, 'endDate', e.target.value)}
                            className={`pl-10 block shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${
                              errors[`${ticket.id}-endDate`] || errors[`${ticket.id}-dateRange`] ? 'border-red-300' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                    {(errors[`${ticket.id}-startDate`] || errors[`${ticket.id}-endDate`] || errors[`${ticket.id}-dateRange`]) && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[`${ticket.id}-startDate`] || errors[`${ticket.id}-endDate`] || errors[`${ticket.id}-dateRange`]}
                      </p>
                    )}
                    <div className="mt-2">
                      <div className="flex items-center">
                        <input
                          id={`early-bird-${ticket.id}`}
                          name={`early-bird-${ticket.id}`}
                          type="checkbox"
                          checked={ticket.isEarlyBird}
                          onChange={(e) => handleTicketChange(ticket.id, 'isEarlyBird', e.target.checked)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`early-bird-${ticket.id}`} className="ml-2 block text-sm text-gray-900">
                          This is an early bird ticket
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Limits */}
                  <div className="sm:col-span-2">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-900 flex items-center">
                        <Tag className="mr-1 h-4 w-4 text-gray-500" />
                        Purchase Limits
                      </label>
                      <div className="flex items-center space-x-2">
                        <div>
                          <label htmlFor={`min-per-order-${ticket.id}`} className="block text-xs text-gray-500">
                            Min per order
                          </label>
                          <input
                            type="number"
                            id={`min-per-order-${ticket.id}`}
                            value={ticket.minPerOrder}
                            onChange={(e) => handleTicketChange(ticket.id, 'minPerOrder', parseInt(e.target.value) || 1)}
                            min="1"
                            className={`block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${
                              errors[`${ticket.id}-orderLimits`] ? 'border-red-300' : ''
                            }`}
                          />
                        </div>
                        <div>
                          <label htmlFor={`max-per-order-${ticket.id}`} className="block text-xs text-gray-500">
                            Max per order
                          </label>
                          <input
                            type="number"
                            id={`max-per-order-${ticket.id}`}
                            value={ticket.maxPerOrder}
                            onChange={(e) => handleTicketChange(ticket.id, 'maxPerOrder', parseInt(e.target.value) || 1)}
                            min="1"
                            className={`block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${
                              errors[`${ticket.id}-orderLimits`] ? 'border-red-300' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                    {errors[`${ticket.id}-orderLimits`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`${ticket.id}-orderLimits`]}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-12 text-center">
              <Tag className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No ticket types</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first ticket type.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleAddTicket}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  Add Ticket Type
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Best Practices */}
      <div className="bg-indigo-50 rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <HelpCircle className="h-5 w-5 text-indigo-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-indigo-800">Ticket Configuration Tips</h3>
              <div className="mt-2 text-sm text-indigo-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Early bird tickets can encourage early registration and improve cash flow</li>
                  <li>Consider offering tiered pricing for different attendee types (student, professional, etc.)</li>
                  <li>Hide tickets instead of deleting them if they have already been purchased</li>
                  <li>Set capacity limits based on your venue size and resources</li>
                  <li>Make sure your ticket descriptions clearly explain what's included</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-4 py-3 sm:px-6 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            Changes are not saved until you click "Save Changes"
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => navigate(`/organizer/events/${eventId}/payments`)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveTickets}
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
                'Save Changes'
              )}
            </button>
          </div>
        </div>
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
                  <Trash2 className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Delete Ticket Type
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete the "{ticketToDelete?.name}" ticket type? This action cannot be undone.
                    </p>
                    {ticketToDelete?.ticketsSold > 0 && (
                      <div className="mt-2 p-2 bg-yellow-50 rounded-md">
                        <p className="text-sm text-yellow-800 flex items-start">
                          <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                          This ticket type has already been purchased by attendees. Consider hiding it instead of deleting it.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm ${
                    ticketToDelete?.ticketsSold > 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handleDeleteTicket}
                  disabled={ticketToDelete?.ticketsSold > 0}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setTicketToDelete(null);
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

export default TicketConfigPage;