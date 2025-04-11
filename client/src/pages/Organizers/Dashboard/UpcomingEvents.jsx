import React from 'react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UpcomingEvents = ({ events }) => {
  const navigate = useNavigate();

  // Helper function to format dates nicely
  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // If same day event
    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    
    // If same month event
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`;
    }
    
    // Different months
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
        <button 
          onClick={() => navigate('/organizer/events-management')}
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
      
      <div className="divide-y divide-gray-200">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate(`/organizer/events/${event.id}`)}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{event.title}</h4>
                  <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-4">
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {formatDateRange(event.startDate, event.endDate)}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {event.location}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {event.registeredAttendees} / {event.totalCapacity} registered
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <div 
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold 
                    ${event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 
                      event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'}`}
                  >
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </div>
                </div>
              </div>
              
              {/* Progress bar for registration */}
              <div className="mt-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-indigo-600">
                        Registration Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-indigo-600">
                        {Math.round((event.registeredAttendees / event.totalCapacity) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                    <div 
                      style={{ width: `${(event.registeredAttendees / event.totalCapacity) * 100}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No upcoming events. Create your first event!</p>
            <button 
              onClick={() => navigate('/organizer/events-management')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;