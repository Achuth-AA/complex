import React, { useState } from 'react';
import { 
  Bell, Search, Calendar, ChevronDown, Clock, Users, Mail, 
  X, Send, Edit, Copy, AlertTriangle, Check, Plus, Filter,
  ChevronLeft, ChevronRight, Save, Eye, FileText, Settings,
  PlusCircle, Tags, CheckCircle, XCircle, RefreshCw, Smartphone
} from 'lucide-react';

const NotificationsCenterPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTargetingOptions, setShowTargetingOptions] = useState(false);
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    targetAudience: 'all',
    deliveryMethod: ['app'],
    scheduledTime: 'now',
    customDate: '',
    customTime: '',
    saveAsTemplate: false,
    templateName: ''
  });

  // Sample data
  const scheduledNotifications = [
    { id: 1, title: 'Welcome Message', audience: 'All Attendees', scheduledFor: '2025-04-14 08:00 AM', status: 'scheduled' },
    { id: 2, title: 'Session Change Alert', audience: 'Machine Learning Track', scheduledFor: '2025-04-14 09:15 AM', status: 'scheduled' },
    { id: 3, title: 'Keynote Speaker Update', audience: 'All Attendees', scheduledFor: '2025-04-14 10:30 AM', status: 'scheduled' },
    { id: 4, title: 'Networking Event Reminder', audience: 'VIP Attendees', scheduledFor: '2025-04-14 04:00 PM', status: 'scheduled' }
  ];

  const sentNotifications = [
    { id: 5, title: 'Registration Confirmation', audience: 'New Registrants', sentAt: '2025-04-01 10:30 AM', stats: { sent: 153, opened: 142, clicked: 98 } },
    { id: 6, title: 'Early Bird Discount Ending', audience: 'All Subscribers', sentAt: '2025-03-25 09:00 AM', stats: { sent: 3240, opened: 2890, clicked: 1735 } },
    { id: 7, title: 'Agenda Updated', audience: 'All Attendees', sentAt: '2025-03-20 03:15 PM', stats: { sent: 1287, opened: 1104, clicked: 856 } },
    { id: 8, title: 'Speaker Announcement', audience: 'All Registrants', sentAt: '2025-03-15 11:45 AM', stats: { sent: 1287, opened: 1042, clicked: 764 } }
  ];

  const notificationTemplates = [
    { id: 1, name: 'Welcome Message', description: 'Welcome attendees to the conference', category: 'Announcements' },
    { id: 2, name: 'Schedule Change', description: 'Notify about changes to the event schedule', category: 'Updates' },
    { id: 3, name: 'Speaker Update', description: 'Announce new or changed speakers', category: 'Updates' },
    { id: 4, name: 'Reminder', description: 'Remind attendees about upcoming sessions', category: 'Reminders' },
    { id: 5, name: 'Emergency Alert', description: 'Critical information that needs immediate attention', category: 'Alerts' },
    { id: 6, name: 'Thank You', description: 'Post-event thank you message', category: 'Announcements' }
  ];

  const recentNotificationStats = {
    total: 42,
    opened: 36,
    engagement: 78,
    pending: 4
  };

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNotificationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle delivery method toggles
  const handleDeliveryMethodToggle = (method) => {
    setNotificationForm(prev => {
      const currentMethods = [...prev.deliveryMethod];
      if (currentMethods.includes(method)) {
        return {
          ...prev,
          deliveryMethod: currentMethods.filter(m => m !== method)
        };
      } else {
        return {
          ...prev,
          deliveryMethod: [...currentMethods, method]
        };
      }
    });
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <Bell size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">Total Sent</h2>
              <p className="text-3xl font-bold text-gray-900">{recentNotificationStats.total}</p>
              <p className="text-sm text-gray-500">Last 30 days</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Eye size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">Open Rate</h2>
              <p className="text-3xl font-bold text-gray-900">{Math.round((recentNotificationStats.opened / recentNotificationStats.total) * 100)}%</p>
              <p className="text-sm text-gray-500">Last 30 days</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <CheckCircle size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">Engagement</h2>
              <p className="text-3xl font-bold text-gray-900">{recentNotificationStats.engagement}%</p>
              <p className="text-sm text-gray-500">Click-through rate</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Clock size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">Pending</h2>
              <p className="text-3xl font-bold text-gray-900">{recentNotificationStats.pending}</p>
              <p className="text-sm text-gray-500">Scheduled notifications</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Scheduled</h3>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
              View All <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {scheduledNotifications.slice(0, 3).map(notification => (
              <div key={notification.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">To: {notification.audience}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      <Clock size={12} className="mr-1" />
                      {new Date(notification.scheduledFor).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex justify-end space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Edit size={14} />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Copy size={14} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
              View History <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {sentNotifications.slice(0, 3).map(notification => (
              <div key={notification.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">To: {notification.audience}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.sentAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="mt-2 flex justify-between">
                  <div className="flex space-x-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <Send size={12} className="mr-1" /> {notification.stats.sent}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Eye size={12} className="mr-1" /> {Math.round((notification.stats.opened / notification.stats.sent) * 100)}%
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <CheckCircle size={12} className="mr-1" /> {Math.round((notification.stats.clicked / notification.stats.sent) * 100)}%
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">
                      Details
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-xs">
                      <RefreshCw size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setActiveTab('create')}
              className="p-4 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors group"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 p-2 rounded-md bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Send size={20} />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-indigo-700">Send Notification</h4>
                  <p className="text-xs text-gray-500">Create and send a new notification</p>
                </div>
              </div>
            </button>
            
            <button 
              onClick={() => setActiveTab('templates')}
              className="p-4 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors group"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 p-2 rounded-md bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <FileText size={20} />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-indigo-700">Templates</h4>
                  <p className="text-xs text-gray-500">Manage notification templates</p>
                </div>
              </div>
            </button>
            
            <button 
              onClick={() => setActiveTab('scheduled')}
              className="p-4 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors group"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 p-2 rounded-md bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Calendar size={20} />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-indigo-700">Scheduled</h4>
                  <p className="text-xs text-gray-500">View and manage scheduled notifications</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreateTab = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Create Notification</h3>
      </div>
      <div className="p-6">
        <form className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Notification Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={notificationForm.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter a clear, concise title"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message Content
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                rows={5}
                value={notificationForm.message}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter the message you want to send..."
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Markdown formatting is supported. <a href="#" className="text-indigo-600">Learn more</a>
            </p>
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-900">Target Audience</h4>
              <button
                type="button"
                onClick={() => setShowTargetingOptions(!showTargetingOptions)}
                className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
              >
                Advanced Targeting {showTargetingOptions ? <ChevronDown size={16} className="ml-1" /> : <ChevronRight size={16} className="ml-1" />}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className={`border rounded-md p-4 text-center cursor-pointer transition-colors ${
                  notificationForm.targetAudience === 'all' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'
                }`}
                onClick={() => setNotificationForm(prev => ({ ...prev, targetAudience: 'all' }))}
                >
                  <Users className="h-6 w-6 mx-auto text-gray-500" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">All Attendees</span>
                  <span className="mt-1 block text-xs text-gray-500">1,234 recipients</span>
                </div>
              </div>
              
              <div>
                <div className={`border rounded-md p-4 text-center cursor-pointer transition-colors ${
                  notificationForm.targetAudience === 'presenters' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'
                }`}
                onClick={() => setNotificationForm(prev => ({ ...prev, targetAudience: 'presenters' }))}
                >
                  <Users className="h-6 w-6 mx-auto text-gray-500" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">Presenters</span>
                  <span className="mt-1 block text-xs text-gray-500">48 recipients</span>
                </div>
              </div>
              
              <div>
                <div className={`border rounded-md p-4 text-center cursor-pointer transition-colors ${
                  notificationForm.targetAudience === 'vip' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'
                }`}
                onClick={() => setNotificationForm(prev => ({ ...prev, targetAudience: 'vip' }))}
                >
                  <Users className="h-6 w-6 mx-auto text-gray-500" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">VIP Attendees</span>
                  <span className="mt-1 block text-xs text-gray-500">76 recipients</span>
                </div>
              </div>
              
              <div>
                <div className={`border rounded-md p-4 text-center cursor-pointer transition-colors ${
                  notificationForm.targetAudience === 'custom' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'
                }`}
                onClick={() => setNotificationForm(prev => ({ ...prev, targetAudience: 'custom' }))}
                >
                  <Filter className="h-6 w-6 mx-auto text-gray-500" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">Custom Segment</span>
                  <span className="mt-1 block text-xs text-gray-500">Create a custom audience</span>
                </div>
              </div>
            </div>

            {showTargetingOptions && (
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-4">
                <h5 className="text-sm font-medium text-gray-900 mb-3">Filter by:</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="registrationType" className="block text-xs font-medium text-gray-700 mb-1">Registration Type</label>
                    <select
                      id="registrationType"
                      name="registrationType"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Any Registration Type</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                      <option value="vip">VIP</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="trackInterest" className="block text-xs font-medium text-gray-700 mb-1">Track/Interest</label>
                    <select
                      id="trackInterest"
                      name="trackInterest"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Any Track</option>
                      <option value="technical">Technical</option>
                      <option value="business">Business</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="sessionAttendance" className="block text-xs font-medium text-gray-700 mb-1">Session Attendance</label>
                    <select
                      id="sessionAttendance"
                      name="sessionAttendance"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Any Session</option>
                      <option value="keynote">Attending Keynote</option>
                      <option value="workshop">Attending Workshop</option>
                      <option value="panel">Attending Panel</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button type="button" className="text-indigo-600 font-medium text-sm hover:text-indigo-800">
                    + Add additional filters
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200 py-4">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Delivery Methods</h4>
            <div className="flex space-x-4">
              <div 
                className={`flex items-center p-3 rounded-md cursor-pointer ${
                  notificationForm.deliveryMethod.includes('app') 
                    ? 'bg-indigo-50 border border-indigo-300' 
                    : 'bg-gray-50 border border-gray-300 hover:border-indigo-300'
                }`}
                onClick={() => handleDeliveryMethodToggle('app')}
              >
                <Bell className={`h-5 w-5 ${notificationForm.deliveryMethod.includes('app') ? 'text-indigo-600' : 'text-gray-400'}`} />
                <span className={`ml-2 text-sm font-medium ${notificationForm.deliveryMethod.includes('app') ? 'text-indigo-700' : 'text-gray-700'}`}>In-App</span>
              </div>
              
              <div 
                className={`flex items-center p-3 rounded-md cursor-pointer ${
                  notificationForm.deliveryMethod.includes('email') 
                    ? 'bg-indigo-50 border border-indigo-300' 
                    : 'bg-gray-50 border border-gray-300 hover:border-indigo-300'
                }`}
                onClick={() => handleDeliveryMethodToggle('email')}
              >
                <Mail className={`h-5 w-5 ${notificationForm.deliveryMethod.includes('email') ? 'text-indigo-600' : 'text-gray-400'}`} />
                <span className={`ml-2 text-sm font-medium ${notificationForm.deliveryMethod.includes('email') ? 'text-indigo-700' : 'text-gray-700'}`}>Email</span>
              </div>
              
              <div 
                className={`flex items-center p-3 rounded-md cursor-pointer ${
                  notificationForm.deliveryMethod.includes('push') 
                    ? 'bg-indigo-50 border border-indigo-300' 
                    : 'bg-gray-50 border border-gray-300 hover:border-indigo-300'
                }`}
                onClick={() => handleDeliveryMethodToggle('push')}
              >
                <Smartphone className={`h-5 w-5 ${notificationForm.deliveryMethod.includes('push') ? 'text-indigo-600' : 'text-gray-400'}`} />
                <span className={`ml-2 text-sm font-medium ${notificationForm.deliveryMethod.includes('push') ? 'text-indigo-700' : 'text-gray-700'}`}>Push</span>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 py-4">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Delivery Schedule</h4>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <input
                  id="scheduleSendNow"
                  name="scheduledTime"
                  type="radio"
                  value="now"
                  checked={notificationForm.scheduledTime === 'now'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="scheduleSendNow" className="ml-2 block text-sm text-gray-700">
                  Send immediately
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="scheduleCustom"
                  name="scheduledTime"
                  type="radio"
                  value="scheduled"
                  checked={notificationForm.scheduledTime === 'scheduled'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="scheduleCustom" className="ml-2 block text-sm text-gray-700">
                  Schedule for later
                </label>
              </div>
              
              {notificationForm.scheduledTime === 'scheduled' && (
                <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="customDate" className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      id="customDate"
                      name="customDate"
                      value={notificationForm.customDate}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="customTime" className="block text-xs font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      id="customTime"
                      name="customTime"
                      value={notificationForm.customTime}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="py-4">
            <div className="flex items-center">
              <input
                id="saveAsTemplate"
                name="saveAsTemplate"
                type="checkbox"
                checked={notificationForm.saveAsTemplate}
                onChange={(e) => setNotificationForm(prev => ({ ...prev, saveAsTemplate: e.target.checked }))}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="saveAsTemplate" className="ml-2 block text-sm text-gray-700">
                Save as template for future use
              </label>
            </div>
            
            {notificationForm.saveAsTemplate && (
              <div className="mt-4">
                <label htmlFor="templateName" className="block text-sm font-medium text-gray-700">Template Name</label>
                <input
                  type="text"
                  id="templateName"
                  name="templateName"
                  value={notificationForm.templateName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter a name for this template"
                />
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-between">
            <button
              type="button"
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setActiveTab('overview')}
            >
              Cancel
            </button>
            
            <div className="flex space-x-3">
              <button
                type="button"
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Eye className="h-4 w-4 inline mr-1" />
                Preview
              </button>
              
              <button
                type="submit"
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {notificationForm.scheduledTime === 'now' ? (
                  <>
                    <Send className="h-4 w-4 inline mr-1" />
                    Send Notification
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Schedule Notification
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  const renderScheduledTab = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Scheduled Notifications</h3>
        <button
          onClick={() => setActiveTab('create')}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus size={16} className="mr-1" />
          New Notification
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <div className="relative max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search notifications"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>All audiences</option>
              <option>All Attendees</option>
              <option>Presenters</option>
              <option>VIP Attendees</option>
              <option>Custom Segments</option>
            </select>
            
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>All methods</option>
              <option>In-App</option>
              <option>Email</option>
              <option>Push</option>
            </select>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notification
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Audience
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scheduled For
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Method
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scheduledNotifications.map((notification) => (
                <tr key={notification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{notification.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{notification.audience}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(notification.scheduledFor).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-1">
                      <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-indigo-100 text-indigo-800">
                        <Bell size={12} className="mr-1" /> App
                      </span>
                      <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
                        <Mail size={12} className="mr-1" /> Email
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-yellow-100 text-yellow-800">
                      Scheduled
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Copy size={16} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> notifications
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mx-2">
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplatesTab = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Notification Templates</h3>
        <button
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle size={16} className="mr-1" />
          Create Template
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <div className="relative max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search templates"
            />
          </div>
          
          <div>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>All categories</option>
              <option>Announcements</option>
              <option>Updates</option>
              <option>Reminders</option>
              <option>Alerts</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notificationTemplates.map((template) => (
            <div 
              key={template.id} 
              className={`border rounded-lg shadow-sm p-4 cursor-pointer transition-colors ${
                selectedTemplate === template.id ? 'border-indigo-500 ring-2 ring-indigo-200' : 'hover:border-indigo-300'
              }`}
              onClick={() => setSelectedTemplate(template.id === selectedTemplate ? null : template.id)}
            >
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-900">{template.name}</h4>
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                  {template.category}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-500">{template.description}</p>
              
              <div className="mt-4 flex justify-between">
                <div className="flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">
                    Preview
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 text-xs">
                    Edit
                  </button>
                </div>
                <button
                  className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
          
          <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-indigo-300 cursor-pointer">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mb-2">
              <PlusCircle size={24} />
            </div>
            <h4 className="text-sm font-medium text-gray-900">Create New Template</h4>
            <p className="mt-1 text-xs text-gray-500">Design and save a custom notification template</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Page header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Bell className="mr-3 h-6 w-6 text-indigo-600" />
                Notification Center
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Create, schedule, and manage notifications for your event attendees.
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <a href="#" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Settings className="mr-2 h-4 w-4" />
                Notification Settings
              </a>
              <button
                type="button"
                onClick={() => setActiveTab('create')}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Send className="mr-2 h-4 w-4" />
                New Notification
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`${
                activeTab === 'create'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('create')}
            >
              Create Notification
            </button>
            <button
              className={`${
                activeTab === 'scheduled'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('scheduled')}
            >
              Scheduled
            </button>
            <button
              className={`${
                activeTab === 'templates'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('templates')}
            >
              Templates
            </button>
            <button
              className={`${
                activeTab === 'history'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('history')}
            >
              Sent History
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'create' && renderCreateTab()}
        {activeTab === 'scheduled' && renderScheduledTab()}
        {activeTab === 'templates' && renderTemplatesTab()}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-center py-8">Sent History tab content will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NotificationsCenterPage;