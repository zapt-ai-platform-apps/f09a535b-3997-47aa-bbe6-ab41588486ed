import React from 'react';

const StatusIndicator = ({ status }) => (
  <span className={`text-xs px-2 py-1 rounded-full ${status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
    {status === 'completed' ? 'Completato' : 'In corso'}
  </span>
);

export default StatusIndicator;