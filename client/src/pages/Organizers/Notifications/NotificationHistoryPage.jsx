import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Search, Filter, ChevronDown, Plus,
  Calendar, Clock, CheckCircle, AlertCircle, Bell,
  User, Users, Mail, Smartphone, Eye, RefreshCw, XCircle
} from 'lucide-react';
import axios from 'axios';

const NotificationHistoryPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, these would be API calls
        // const eventResponse = await axios.get(`/api/events/${eventId}`);
        // const notificationsResponse = await axios.get(`/api/events/${eventId}/notifications`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Mock event data
        const mockEvent = {
          id: eventId,
          title: 'Tech Conference 2025'
        };
        
        // Mock notifications data
        const mockNotifications = [
          {
            id: 'notif1',
            title: 'Schedule Change: Keynote Session',
            message: 'The keynote session has been moved from 10:00 AM to 11:00 AM due to speaker travel delays.',
            sentAt: '2024-12-10T14:30:00Z',
            status: 'sent',
            type: 'all',
            audience: 'All Attendees',
            recipients: {
              total: 523,
              delivered: 512,
              opened: 347,
              failed: 11
            },
            sentBy: 'John Smith'
          },
          {
            id: 'notif2',
            title: 'Reminder: Workshop Registration',
            message: 'This is a reminder that workshop registration closes tomorrow at 5:00 PM. Please complete your registration if you haven\'t already.',
            sentAt: '2024-12-08T10:15:00Z',
            status: 'sent',
            type: 'email',
            audience: 'Registered Attendees',
            recipients: {
              total: 350,
              delivered: 342,
              opened: 289,
              failed: 8
            },
            sentBy: 'Sarah Johnson'
          },
          {
            id: 'notif3',
            title: 'New Session Added: Blockchain Fundamentals',
            message: 'We\'ve added a new session on Blockchain Fundamentals on Day 2 at 2:00 PM in Room 203.',
            sentAt: '2024-12-05T16:45:00Z',
            status: 'sent',
            type: 'push',
            audience: 'Mobile App Users',
            recipients: {
              total: 215,
              delivered: 201,
              opened: 153,
              failed: 14
            },
            sentBy: 'David Chen'
          },
          {
            id: 'notif4',
            title: 'Important: Venue Change',
            message: 'Due to unforeseen circumstances, we\'ve had to change the venue for tomorrow\'s sessions. All sessions will now take place at the Grand Hotel, 2 blocks from the original venue.',
            sentAt: '2024-12-11T09:00:00Z',
            status: 'scheduled',
            scheduledFor: '2024-12-12T08:00:00Z',
            type: 'all',
            audience: 'All Attendees',
            recipients: {
              total: 523,
              delivered: 0,
              opened: 0,
              failed: 0
            },
            sentBy: 'Emily Davis'
          },
          {
            id: 'notif5',
            title: 'Welcome to Tech Conference 2025',
            message: 'Welcome to Tech Conference 2025! We\'re excited to have you join us. Here\'s some important information about the event...',
            sentAt: '2024-12-01T09:30:00Z',
            status: 'sent',
            type: 'email',
            audience: 'All Attendees',
            recipients: {
              total: 500,
              delivered: 489,
              opened: 412,
              failed: 11
            },
            sentBy: 'John Smith'
          }
        ];
        
        setEvent(mockEvent);
        setNotifications(mockNotifications);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [eventId]);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format time for display
  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };
  
  // Calculate delivery rate
  const calculateDeliveryRate = (notification) => {
    if (notification.recipients.total === 0) return 0;
    return Math.round((notification.recipients.delivered / notification.recipients.total) * 100);
  };
  
  // Calculate open rate
  const calculateOpenRate = (notification) => {
    if (notification.recipients.delivered === 0) return 0;
    return Math.round((notification.recipients.opened / notification.recipients.delivered) * 100);
  };
  
  // Get notification type label
  const getNotificationTypeLabel = (type) => {
    switch (type) {
      case 'all':
        return 'Email & Push';
      case 'email':
        return 'Email Only';
      case 'push':
        return 'Push Only';
      default:
        return 'Unknown';
    }
  };
  
  // Get notification type icon
  const getNotificationTypeIcon = (type) => {
    switch (type) {
      case 'all':
        return (
          <div className="flex space-x-1">
            <Mail className="h-4 w-4 text-gray-500" />
            <Smartphone className="h-4 w-4 text-gray-500" />
          </div>
        );
      case 'email':
        return <Mail className="h-4 w-4 text-gray-500" />;
      case 'push':
        return <Smartphone className="h-4 w-4 text-gray-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesStatus = filterStatus === 'all' || notification.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Handle view notification details
  const handleViewDetails = (notification) => {
    setSelectedNotification(notification);
    setShowDetailsModal(true);
  };
  
  // Refresh notification list
  const handleRefreshList = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // await axios.get(`/api/events/${eventId}/notifications`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // For demo, just re-use the same data
      setIsLoading(false);
    } catch (error) {
      console.error('Error refreshing notifications:', error);
      setIsLoading(false);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}/notifications`)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
              Notification History
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              View sent and scheduled notifications for {event?.title}
            </p>
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={handleRefreshList}
            className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RefreshCw className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}/notifications/create`)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            New Notification
          </button>
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
                placeholder="Search notifications..."
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
                <label htmlFor="filter-type" className="block text-sm font-medium text-gray-700">
                  Notification Type
                </label>
                <select
                  id="filter-type"
                  name="filter-type"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="email">Email Only</option>
                  <option value="push">Push Only</option>
                  <option value="all">Email & Push</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="filter-status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="filter-status"
                  name="filter-status"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="sent">Sent</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Notifications List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {filteredNotifications.length} Notifications
          </h3>
        </div>
        
        {filteredNotifications.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredNotifications.map(notification => (
              <li key={notification.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-medium text-indigo-600 truncate">{notification.title}</h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeColor(notification.status)}`}>
                        {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                      </span>
                      <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-800">
                        {getNotificationTypeIcon(notification.type)}
                        <span className="ml-1">{getNotificationTypeLabel(notification.type)}</span>
                      </span>
                      <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-800">
                        <Users className="mr-1 h-3.5 w-3.5" />
                        {notification.audience}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleViewDetails(notification)}
                    className="ml-2 inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Eye className="mr-1.5 h-4 w-4 text-gray-500" />
                    Details
                  </button>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-500 truncate line-clamp-2">
                    {notification.message}
                  </p>
                </div>
                
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {formatDate(notification.sentAt)}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {formatTime(notification.sentAt)}
                    </div>
                  </div>
                  
                  {notification.status === 'sent' && (
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <div className="flex mr-4">
                        <CheckCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-500" />
                        <span>{calculateDeliveryRate(notification)}% delivery</span>
                      </div>
                      <div className="flex">
                        <Eye className="flex-shrink-0 mr-1.5 h-5 w-5 text-indigo-500" />
                        <span>{calculateOpenRate(notification)}% open rate</span>
                      </div>
                    </div>
                  )}
                  
                  {notification.status === 'scheduled' && (
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-500" />
                      <span>Scheduled for {formatDate(notification.scheduledFor)} at {formatTime(notification.scheduledFor)}</span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-12 text-center">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all' ? 
                "No notifications match your current filters. Try adjusting your search criteria." : 
                "Get started by creating your first notification."}
            </p>
            {!searchTerm && filterType === 'all' && filterStatus === 'all' && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => navigate(`/organizer/events/${eventId}/notifications/create`)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  Create New Notification
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Notification Details Modal */}
      {showDetailsModal && selectedNotification && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowDetailsModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setShowDetailsModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Notification Details
                  </h3>
                  
                  <div className="mt-4">
                    <h4 className="text-xl font-medium text-indigo-600">{selectedNotification.title}</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeColor(selectedNotification.status)}`}>
                        {selectedNotification.status.charAt(0).toUpperCase() + selectedNotification.status.slice(1)}
                      </span>
                      <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-800">
                        {getNotificationTypeIcon(selectedNotification.type)}
                        <span className="ml-1">{getNotificationTypeLabel(selectedNotification.type)}</span>
                      </span>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {selectedNotification.message}
                      </p>
                    </div>
                    
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Audience</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedNotification.audience}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Sent By</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedNotification.sentBy}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {formatDate(selectedNotification.sentAt)} at {formatTime(selectedNotification.sentAt)}
                          </dd>
                        </div>
                        {selectedNotification.status === 'scheduled' && (
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Scheduled For</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {formatDate(selectedNotification.scheduledFor)} at {formatTime(selectedNotification.scheduledFor)}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>
                    
                    {selectedNotification.status === 'sent' && (
                      <div className="mt-6 border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-4">Delivery Statistics</h4>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-4">
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Total Recipients</dt>
                              <dd className="mt-1 text-xl font-semibold text-gray-900">{selectedNotification.recipients.total}</dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Delivered</dt>
                              <dd className="mt-1 text-xl font-semibold text-green-600">
                                {selectedNotification.recipients.delivered} 
                                <span className="text-sm font-normal text-gray-500 ml-1">
                                  ({calculateDeliveryRate(selectedNotification)}%)
                                </span>
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Opened</dt>
                              <dd className="mt-1 text-xl font-semibold text-indigo-600">
                                {selectedNotification.recipients.opened}
                                <span className="text-sm font-normal text-gray-500 ml-1">
                                  ({calculateOpenRate(selectedNotification)}%)
                                </span>
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Failed</dt>
                              <dd className="mt-1 text-xl font-semibold text-red-600">{selectedNotification.recipients.failed}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationHistoryPage;