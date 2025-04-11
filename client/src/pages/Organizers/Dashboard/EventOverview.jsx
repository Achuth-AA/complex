import React from 'react';
import { Calendar, Users, UserCheck, Layers } from 'lucide-react';

const EventOverview = ({ totalEvents, totalAttendees, totalSpeakers, totalSessions }) => {
  // Stats cards data
  const stats = [
    {
      title: 'Total Events',
      value: totalEvents,
      icon: <Calendar className="h-6 w-6 text-indigo-600" />,
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700'
    },
    {
      title: 'Total Attendees',
      value: totalAttendees,
      icon: <Users className="h-6 w-6 text-purple-600" />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      title: 'Total Speakers',
      value: totalSpeakers,
      icon: <UserCheck className="h-6 w-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Total Sessions',
      value: totalSessions,
      icon: <Layers className="h-6 w-6 text-green-600" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Event Overview</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-lg p-6 flex items-center`}>
              <div className="rounded-md p-3 bg-white mr-4">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventOverview;