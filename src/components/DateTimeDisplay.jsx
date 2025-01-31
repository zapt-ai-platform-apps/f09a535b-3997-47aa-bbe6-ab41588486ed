import React from 'react';

const DateTimeDisplay = ({ date }) => (
  <p className="text-sm text-gray-500">
    {new Date(date).toLocaleDateString('it-IT', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}
  </p>
);

export default DateTimeDisplay;