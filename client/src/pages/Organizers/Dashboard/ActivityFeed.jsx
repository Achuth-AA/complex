import React from 'react';
import { User, Calendar, MessageSquare, Bell, CreditCard } from 'lucide-react';

const ActivityFeed = ({ activities }) => {
  // Function to determine the icon based on activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'registration':
        return <User className="h-5 w-5 text-blue-500" />;
      case 'speaker':
        return <User className="h-5 w-5 text-purple-500" />;
      case 'session':
        return <Calendar className="h-5 w-5 text-green-500" />;
      case 'notification':
        return <Bell className="h-5 w-5 text-yellow-500" />;
      case 'payment':
        return <CreditCard className="h-5 w-5 text-indigo-500" />;
      case 'comment':
        return <MessageSquare className="h-5 w-5 text-pink-500" />;
      default:
        return <User className="h-5 w-5 text-gray-500" />;
    }
  };

  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else if (diffInMinutes < 48 * 60) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm text-gray-900">{activity.description}</div>
                  <div className="mt-1 text-xs text-gray-500">{formatTimestamp(activity.timestamp)}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No recent activity</p>
          </div>
        )}
      </div>
      
      {activities.length > 0 && (
        <div className="px-5 py-3 border-t border-gray-200 bg-gray-50">
          <button className="text-sm text-center w-full text-indigo-600 hover:text-indigo-800">
            View All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;