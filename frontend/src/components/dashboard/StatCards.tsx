
import React from 'react';

const stats = [
  {
    title: 'New Matches',
    value: 2,
    change: '+2 this week',
    trend: 'up',
    color: 'text-teal',
    bgColor: 'bg-teal/10'
  },
  {
    title: 'Meetups Planned',
    value: 1,
    change: '1 upcoming',
    trend: 'same',
    color: 'text-orange',
    bgColor: 'bg-orange/10'
  },
  {
    title: 'Profile Views',
    value: 15,
    change: '+6% from last week',
    trend: 'up',
    color: 'text-navy',
    bgColor: 'bg-navy/10'
  },
  {
    title: 'Satisfaction Rate',
    value: '95%',
    change: 'Based on feedback',
    trend: 'up',
    color: 'text-teal',
    bgColor: 'bg-teal/10'
  }
];

const StatCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-6">
          <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center ${stat.color} mb-4`}>
            {stat.trend === 'up' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            )}
            {stat.trend === 'down' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            )}
            {stat.trend === 'same' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            )}
          </div>
          <h3 className="text-gray-600 text-sm">{stat.title}</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-navy">{stat.value}</span>
            <span className="text-sm text-gray-500">{stat.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
