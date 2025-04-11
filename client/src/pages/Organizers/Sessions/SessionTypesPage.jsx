import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Plus, Edit, Trash2, Clock, Save,
  Menu, Star, Layout, Layers, MessageSquare, Video,
  Users, Monitor, CheckCircle, X, Clipboard, ChevronDown
} from 'lucide-react';
import axios from 'axios';

const SessionTypesPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sessionTypes, setSessionTypes] = useState([]);
  const [event, setEvent] = useState(null);
  const [editingType, setEditingType] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTypeData, setNewTypeData] = useState({
    name: '',
    description: '',
    color: '#4F46E5',
    icon: 'presentation',
    defaultDuration: 60,
    isDefault: false,
    allowQuestions: true,
    requireApproval: false
  });
  
  // Default icons list for session types
  const availableIcons = [
    { id: 'presentation', icon: <Monitor className="h-5 w-5" />, label: 'Presentation' },
    { id: 'workshop', icon: <Clipboard className="h-5 w-5" />, label: 'Workshop' },
    { id: 'panel', icon: <Users className="h-5 w-5" />, label: 'Panel' },
    { id: 'keynote', icon: <Star className="h-5 w-5" />, label: 'Keynote' },
    { id: 'training', icon: <Layout className="h-5 w-5" />, label: 'Training' },
    { id: 'discussion', icon: <MessageSquare className="h-5 w-5" />, label: 'Discussion' },
    { id: 'networking', icon: <Users className="h-5 w-5" />, label: 'Networking' },
    { id: 'virtual', icon: <Video className="h-5 w-5" />, label: 'Virtual' }
  ];
  
  // Preset colors for session types
  const presetColors = [
    '#4F46E5', // Indigo
    '#10B981', // Green
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#06B6D4', // Cyan
    '#EC4899', // Pink
    '#6366F1'  // Indigo lighter
  ];
  
  useEffect(() => {
    const fetchSessionTypes = async () => {
      try {
        setIsLoading(true);
        
        // In production, these would be real API calls
        // const eventResponse = await axios.get(`/api/events/${eventId}`);
        // const typesResponse = await axios.get(`/api/events/${eventId}/session-types`);
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
        
        // Mock event data
        const mockEvent = {
          id: eventId,
          title: 'Tech Conference 2025',
          startDate: '2025-06-15',
          endDate: '2025-06-17'
        };
        
        // Mock session types
        const mockSessionTypes = [
          {
            id: 'presentation',
            name: 'Presentation',
            description: 'Standard presentation format with speaker(s) presenting content to the audience.',
            color: '#4F46E5', // Indigo
            icon: 'presentation',
            defaultDuration: 60,
            isDefault: true,
            allowQuestions: true,
            requireApproval: false,
            sessionCount: 12
          },
          {
            id: 'workshop',
            name: 'Workshop',
            description: 'Interactive, hands-on session where attendees participate in exercises or activities.',
            color: '#10B981', // Green
            icon: 'workshop',
            defaultDuration: 90,
            isDefault: false,
            allowQuestions: true,
            requireApproval: true,
            sessionCount: 4
          },
          {
            id: 'panel',
            name: 'Panel Discussion',
            description: 'Moderated conversation between multiple speakers on a specific topic.',
            color: '#F59E0B', // Amber
            icon: 'panel', 
            defaultDuration: 60,
            isDefault: false,
            allowQuestions: true,
            requireApproval: false,
            sessionCount: 3
          },
          {
            id: 'keynote',
            name: 'Keynote',
            description: 'Featured presentation usually delivered by a notable speaker or industry expert.',
            color: '#8B5CF6', // Purple
            icon: 'keynote',
            defaultDuration: 60,
            isDefault: false,
            allowQuestions: true,
            requireApproval: true,
            sessionCount: 2
          }
        ];
        
        setEvent(mockEvent);
        setSessionTypes(mockSessionTypes);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching session types:', error);
        setIsLoading(false);
        setErrorMessage('Failed to load session types. Please try again.');
      }
    };
    
    fetchSessionTypes();
  }, [eventId]);
  
  const getIconComponent = (iconName) => {
    const found = availableIcons.find(i => i.id === iconName);
    return found ? found.icon : <Layers className="h-5 w-5" />;
  };
  
  const handleEditSessionType = (sessionType) => {
    setEditingType({ ...sessionType });
  };
  
  const handleCancelEdit = () => {
    setEditingType(null);
  };
  
  const handleSaveEdit = async () => {
    if (!editingType) return;
    
    setIsSaving(true);
    
    try {
      // In production, this would be a real API call
      // await axios.put(`/api/events/${eventId}/session-types/${editingType.id}`, editingType);
      
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      // Update session types in state
      setSessionTypes(prev => 
        prev.map(type => type.id === editingType.id ? editingType : type)
      );
      
      setEditingType(null);
      setSuccessMessage('Session type updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating session type:', error);
      setErrorMessage('Failed to update session type. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleAddSessionType = async () => {
    if (!newTypeData.name.trim()) {
      setErrorMessage('Name is required');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // In production, this would be a real API call
      // const response = await axios.post(`/api/events/${eventId}/session-types`, newTypeData);
      
      // Mock add operation
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      // Create new session type with ID
      const newType = {
        ...newTypeData,
        id: `type-${Date.now()}`,
        sessionCount: 0
      };
      
      // Add to session types in state
      setSessionTypes(prev => [...prev, newType]);
      
      // Reset form and close modal
      setNewTypeData({
        name: '',
        description: '',
        color: '#4F46E5',
        icon: 'presentation',
        defaultDuration: 60,
        isDefault: false,
        allowQuestions: true,
        requireApproval: false
      });
      setShowAddModal(false);
      setSuccessMessage('Session type added successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding session type:', error);
      setErrorMessage('Failed to add session type. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDeleteSessionType = async () => {
    if (!typeToDelete) return;
    
    try {
      // In production, this would be a real API call
      // await axios.delete(`/api/events/${eventId}/session-types/${typeToDelete.id}`);
      
      // Mock delete operation
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      // Remove from session types in state
      setSessionTypes(prev => prev.filter(type => type.id !== typeToDelete.id));
      
      setShowDeleteModal(false);
      setTypeToDelete(null);
      setSuccessMessage('Session type deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting session type:', error);
      setErrorMessage('Failed to delete session type. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };
  
  const handleSetDefault = async (typeId) => {
    try {
      // In production, this would be a real API call
      // await axios.post(`/api/events/${eventId}/session-types/${typeId}/set-default`);
      
      // Mock operation
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
      
      // Update session types in state
      setSessionTypes(prev => 
        prev.map(type => ({
          ...type,
          isDefault: type.id === typeId
        }))
      );
      
      setSuccessMessage('Default session type updated');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error setting default session type:', error);
      setErrorMessage('Failed to update default session type. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
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
                Session Types
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Configure session types for {event?.title}
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              Add Session Type
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  {successMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Session Types List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {sessionTypes.map((sessionType) => (
              <li key={sessionType.id} className="px-0">
                {editingType?.id === sessionType.id ? (
                  <div className="px-4 py-6 sm:p-6 bg-gray-50">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Type Name*
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={editingType.name}
                            onChange={(e) => setEditingType({...editingType, name: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="defaultDuration" className="block text-sm font-medium text-gray-700">
                          Default Duration (minutes)
                        </label>
                        <div className="mt-1">
                          <select
                            id="defaultDuration"
                            name="defaultDuration"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={editingType.defaultDuration}
                            onChange={(e) => setEditingType({...editingType, defaultDuration: Number(e.target.value)})}
                          >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                            <option value="180">3 hours</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="sm:col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            name="description"
                            rows="3"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={editingType.description}
                            onChange={(e) => setEditingType({...editingType, description: e.target.value})}
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                          Color
                        </label>
                        <div className="mt-1 flex items-center">
                          <input
                            type="color"
                            id="color"
                            name="color"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1 h-10 w-12 border-gray-300 rounded-md"
                            value={editingType.color}
                            onChange={(e) => setEditingType({...editingType, color: e.target.value})}
                          />
                          <div className="ml-3 flex flex-wrap gap-2">
                            {presetColors.map((color) => (
                              <button
                                key={color}
                                type="button"
                                className={`w-8 h-8 rounded-full ${editingType.color === color ? 'ring-2 ring-offset-2 ring-gray-800' : ''}`}
                                style={{ backgroundColor: color }}
                                onClick={() => setEditingType({...editingType, color})}
                              ></button>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                          Icon
                        </label>
                        <div className="mt-1">
                          <select
                            id="icon"
                            name="icon"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={editingType.icon}
                            onChange={(e) => setEditingType({...editingType, icon: e.target.value})}
                          >
                            {availableIcons.map((icon) => (
                              <option key={icon.id} value={icon.id}>{icon.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="sm:col-span-6">
                        <div className="space-y-4">
                          <div className="relative flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="allowQuestions"
                                name="allowQuestions"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                checked={editingType.allowQuestions}
                                onChange={() => setEditingType({...editingType, allowQuestions: !editingType.allowQuestions})}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="allowQuestions" className="font-medium text-gray-700">
                                Allow questions by default
                              </label>
                              <p className="text-gray-500">
  Enable Q&A functionality by default for this session type
</p>
                            </div>
                          </div>
                          
                          <div className="relative flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="requireApproval"
                                name="requireApproval"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                checked={editingType.requireApproval}
                                onChange={() => setEditingType({...editingType, requireApproval: !editingType.requireApproval})}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="requireApproval" className="font-medium text-gray-700">
                                Require approval
                              </label>
                              <p className="text-gray-500">
                                Require organizer approval for sessions of this type
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleSaveEdit}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-t-2 border-b-2 border-white"></div>
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
                ) : (
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: sessionType.color }}
                        >
                          <div className="text-white">
                            {getIconComponent(sessionType.icon)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mr-2">
                              {sessionType.name}
                            </h3>
                            {sessionType.isDefault && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {sessionType.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-500 mr-2">
                          <span className="font-medium">{sessionType.sessionCount}</span> {sessionType.sessionCount === 1 ? 'session' : 'sessions'}
                        </div>
                        <div className="relative inline-block text-left">
                          <div>
                            <button
                              type="button"
                              className="inline-flex items-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              id="options-menu"
                              aria-expanded="true"
                              aria-haspopup="true"
                              onClick={() => handleEditSessionType(sessionType)}
                            >
                              <span className="sr-only">Open options</span>
                              <Edit className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        {!sessionType.isDefault && (
                          <button
                            type="button"
                            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900 focus:outline-none"
                            onClick={() => handleSetDefault(sessionType.id)}
                          >
                            Set as Default
                          </button>
                        )}

                        {sessionType.sessionCount === 0 && (
                          <button
                            type="button"
                            className="inline-flex items-center text-sm text-red-600 hover:text-red-900"
                            onClick={() => {
                              setTypeToDelete(sessionType);
                              setShowDeleteModal(true);
                            }}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        Default Duration: {sessionType.defaultDuration} min
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <MessageSquare className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        Q&A: {sessionType.allowQuestions ? 'Enabled' : 'Disabled'}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Clipboard className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        Approval: {sessionType.requireApproval ? 'Required' : 'Not Required'}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
            
            {sessionTypes.length === 0 && (
              <li className="px-4 py-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No session types</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first session type.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Add Session Type
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
        
        {/* Information Panel */}
        <div className="mt-6 bg-blue-50 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                Session types help you categorize and manage different kinds of sessions in your event. 
                Types with existing sessions cannot be deleted.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Session Type Modal */}
      {showAddModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Add New Session Type
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Create a new session type for your event. Session types help attendees understand what to expect from each session.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-4">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="new-name" className="block text-sm font-medium text-gray-700">
                      Type Name*
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="new-name"
                        id="new-name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={newTypeData.name}
                        onChange={(e) => setNewTypeData({...newTypeData, name: e.target.value})}
                        placeholder="e.g., Workshop, Panel Discussion"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <label htmlFor="new-description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="new-description"
                        name="new-description"
                        rows="3"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={newTypeData.description}
                        onChange={(e) => setNewTypeData({...newTypeData, description: e.target.value})}
                        placeholder="Describe what this session type entails"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="new-color" className="block text-sm font-medium text-gray-700">
                      Color
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="color"
                        id="new-color"
                        name="new-color"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1 h-10 w-12 border-gray-300 rounded-md"
                        value={newTypeData.color}
                        onChange={(e) => setNewTypeData({...newTypeData, color: e.target.value})}
                      />
                      <div className="ml-3 flex flex-wrap gap-2">
                        {presetColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            className={`w-8 h-8 rounded-full ${newTypeData.color === color ? 'ring-2 ring-offset-2 ring-gray-800' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setNewTypeData({...newTypeData, color})}
                          ></button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="new-icon" className="block text-sm font-medium text-gray-700">
                      Icon
                    </label>
                    <div className="mt-1">
                      <select
                        id="new-icon"
                        name="new-icon"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={newTypeData.icon}
                        onChange={(e) => setNewTypeData({...newTypeData, icon: e.target.value})}
                      >
                        {availableIcons.map((icon) => (
                          <option key={icon.id} value={icon.id}>{icon.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="new-defaultDuration" className="block text-sm font-medium text-gray-700">
                      Default Duration (minutes)
                    </label>
                    <div className="mt-1">
                      <select
                        id="new-defaultDuration"
                        name="new-defaultDuration"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={newTypeData.defaultDuration}
                        onChange={(e) => setNewTypeData({...newTypeData, defaultDuration: Number(e.target.value)})}
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="90">1.5 hours</option>
                        <option value="120">2 hours</option>
                        <option value="180">3 hours</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <fieldset>
                      <div className="space-y-4">
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="new-isDefault"
                              name="new-isDefault"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              checked={newTypeData.isDefault}
                              onChange={() => setNewTypeData({...newTypeData, isDefault: !newTypeData.isDefault})}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="new-isDefault" className="font-medium text-gray-700">
                              Make Default
                            </label>
                            <p className="text-gray-500">
                              Set as the default session type
                            </p>
                          </div>
                        </div>
                        
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="new-allowQuestions"
                              name="new-allowQuestions"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              checked={newTypeData.allowQuestions}
                              onChange={() => setNewTypeData({...newTypeData, allowQuestions: !newTypeData.allowQuestions})}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="new-allowQuestions" className="font-medium text-gray-700">
                              Allow Q&A
                            </label>
                            <p className="text-gray-500">
                              Enable by default
                            </p>
                          </div>
                        </div>
                        
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="new-requireApproval"
                              name="new-requireApproval"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              checked={newTypeData.requireApproval}
                              onChange={() => setNewTypeData({...newTypeData, requireApproval: !newTypeData.requireApproval})}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="new-requireApproval" className="font-medium text-gray-700">
                              Require Approval
                            </label>
                            <p className="text-gray-500">
                              Need organizer approval
                            </p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddSessionType}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Adding...
                    </>
                  ) : (
                    'Add Session Type'
                  )}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Delete Session Type
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete the "{typeToDelete?.name}" session type? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteSessionType}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setTypeToDelete(null);
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

export default SessionTypesPage;