import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Search, Filter, ChevronDown, User, 
  Mail, Phone, Briefcase, Building, Edit, Trash2, ArrowRight 
} from 'lucide-react';
import axios from 'axios';

const SpeakerListPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [speakers, setSpeakers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [speakerToDelete, setSpeakerToDelete] = useState(null);
  const [event, setEvent] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  });
  
  // Available speaker types for filtering
  const speakerTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'keynote', name: 'Keynote' },
    { id: 'panel', name: 'Panel' },
    { id: 'regular', name: 'Regular' },
    { id: 'workshop', name: 'Workshop' }
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, you would fetch from your API
        // const eventResponse = await axios.get(`/api/events/${eventId}`);
        // const speakersResponse = await axios.get(`/api/events/${eventId}/speakers`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Mock event data
        const mockEvent = {
          id: eventId,
          title: 'Tech Conference 2025'
        };
        
        // Mock speakers data
        const mockSpeakers = [
          {
            id: 's1',
            name: 'Sarah Johnson',
            title: 'AI Research Director',
            company: 'TechCorp Inc.',
            email: 'sarah.johnson@techcorp.com',
            phone: '+1 (555) 123-4567',
            type: 'keynote',
            sessions: 2,
            profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
          },
          {
            id: 's2',
            name: 'Michael Chen',
            title: 'Senior Web Developer',
            company: 'WebSolutions',
            email: 'michael.chen@websolutions.com',
            phone: '+1 (555) 987-6543',
            type: 'regular',
            sessions: 1,
            profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          {
            id: 's3',
            name: 'David Rodriguez',
            title: 'Data Science Lead',
            company: 'DataInsights',
            email: 'david.rodriguez@datainsights.com',
            phone: '+1 (555) 246-8101',
            type: 'workshop',
            sessions: 3,
            profileImage: 'https://randomuser.me/api/portraits/men/68.jpg'
          },
          {
            id: 's4',
            name: 'Laura Kim',
            title: 'UX Design Manager',
            company: 'DesignHub',
            email: 'laura.kim@designhub.com',
            phone: '+1 (555) 369-8520',
            type: 'panel',
            sessions: 1,
            profileImage: 'https://randomuser.me/api/portraits/women/28.jpg'
          },
          {
            id: 's5',
            name: 'James Wilson',
            title: 'CTO',
            company: 'Startup Ventures',
            email: 'james.wilson@startupventures.com',
            phone: '+1 (555) 753-9510',
            type: 'keynote',
            sessions: 2,
            profileImage: 'https://randomuser.me/api/portraits/men/52.jpg'
          },
          {
            id: 's6',
            name: 'Emily Brown',
            title: 'Cloud Architect',
            company: 'CloudTech Solutions',
            email: 'emily.brown@cloudtech.com',
            phone: '+1 (555) 852-7410',
            type: 'regular',
            sessions: 1,
            profileImage: 'https://randomuser.me/api/portraits/women/65.jpg'
          },
          {
            id: 's7',
            name: 'Robert Taylor',
            title: 'Security Specialist',
            company: 'SecureNet',
            email: 'robert.taylor@securenet.com',
            phone: '+1 (555) 159-3570',
            type: 'workshop',
            sessions: 2,
            profileImage: 'https://randomuser.me/api/portraits/men/22.jpg'
          }
        ];
        
        setEvent(mockEvent);
        setSpeakers(mockSpeakers);
        setPagination({
          ...pagination,
          totalItems: mockSpeakers.length
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [eventId]);
  
  // Filter speakers based on search term and type
  const filteredSpeakers = speakers.filter(speaker => {
    const matchesSearch = 
      speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      speaker.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      speaker.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || speaker.type === filterType;
    
    return matchesSearch && matchesType;
  });
  
  // Get current page of speakers
  const getCurrentSpeakers = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    return filteredSpeakers.slice(startIndex, startIndex + pagination.itemsPerPage);
  };
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setPagination({
      ...pagination,
      currentPage: pageNumber
    });
  };
  
  // Handle deleting a speaker
  const handleDeleteSpeaker = () => {
    if (!speakerToDelete) return;
    
    // In a real app, you would call your API
    // await axios.delete(`/api/events/${eventId}/speakers/${speakerToDelete.id}`);
    
    // Update local state
    setSpeakers(speakers.filter(s => s.id !== speakerToDelete.id));
    setShowDeleteModal(false);
    setSpeakerToDelete(null);
  };
  
  // Get speaker type badge color
  const getSpeakerTypeBadgeColor = (type) => {
    switch (type) {
      case 'keynote':
        return 'bg-yellow-100 text-yellow-800';
      case 'panel':
        return 'bg-blue-100 text-blue-800';
      case 'workshop':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
              Speakers
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage speakers for {event?.title}
            </p>
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}/speakers/create`)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add Speaker
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
                placeholder="Search speakers..."
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
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Speaker Type</label>
                <select
                  id="type"
                  name="type"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  {speakerTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Speaker Count Summary */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredSpeakers.length}</span> speakers
          {filterType !== 'all' && (
            <span> of type <span className="font-medium">{
              speakerTypes.find(type => type.id === filterType)?.name
            }</span></span>
          )}
        </p>
        
        {searchTerm && (
          <p className="text-sm text-gray-500">
            Search results for "{searchTerm}"
          </p>
        )}
      </div>
      
      {/* Speakers List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {filteredSpeakers.length > 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {getCurrentSpeakers().map((speaker) => (
                  <li key={speaker.id} className="hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img 
                            className="h-12 w-12 rounded-full object-cover" 
                            src={speaker.profileImage} 
                            alt={speaker.name} 
                          />
                          <div className="ml-4">
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium text-indigo-600 truncate">{speaker.name}</h3>
                              <span className={`ml-2 px-2 py-0.5 flex-shrink-0 inline-block text-xs leading-5 font-medium rounded-full ${getSpeakerTypeBadgeColor(speaker.type)}`}>
                                {speaker.type.charAt(0).toUpperCase() + speaker.type.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">{speaker.title} at {speaker.company}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/organizer/events/${eventId}/speakers/${speaker.id}`)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSpeakerToDelete(speaker);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="flex items-center text-sm text-gray-500 mr-6">
                            <Mail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {speaker.email}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <Phone className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {speaker.phone}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Briefcase className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {speaker.sessions} {speaker.sessions === 1 ? 'session' : 'sessions'}
                          <button 
                            onClick={() => navigate(`/organizer/events/${eventId}/speakers/${speaker.id}/assign`)}
                            className="ml-2 text-indigo-600 hover:text-indigo-900 flex items-center"
                          >
                            Assign <ArrowRight className="ml-1 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* Pagination */}
              {filteredSpeakers.length > pagination.itemsPerPage && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.itemsPerPage + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(pagination.currentPage * pagination.itemsPerPage, filteredSpeakers.length)}
                        </span>{' '}
                        of <span className="font-medium">{filteredSpeakers.length}</span> results
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
                        {Array.from({ length: Math.ceil(filteredSpeakers.length / pagination.itemsPerPage) }, (_, i) => i + 1).map(page => (
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
                          disabled={pagination.currentPage === Math.ceil(filteredSpeakers.length / pagination.itemsPerPage)}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            pagination.currentPage === Math.ceil(filteredSpeakers.length / pagination.itemsPerPage) 
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
              <User className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No speakers found</h3>
              <p className="mt-1 text-gray-500">
                {searchTerm || filterType !== 'all' 
                  ? "Try adjusting your search or filters" 
                  : "Get started by adding your first speaker"}
              </p>
              {!searchTerm && filterType === 'all' && (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => navigate(`/organizer/events/${eventId}/speakers/create`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Add Speaker
                  </button>
                </div>
              )}
            </div>
          )}
        </>
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
                    Delete Speaker
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete {speakerToDelete?.name}? This will remove them from all sessions they are assigned to. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteSpeaker}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSpeakerToDelete(null);
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

export default SpeakerListPage;