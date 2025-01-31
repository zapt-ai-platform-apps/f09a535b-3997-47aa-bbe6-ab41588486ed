import React, { useState } from 'react';
import ContactButton from './ContactButton';
import { supabase } from '../supabaseClient';
import StatusIndicator from './StatusIndicator';
import DateTimeDisplay from './DateTimeDisplay';

const ActivityItem = ({ activity, clients, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const client = clients.find(c => c.id === activity.client_id);
  
  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/activities', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          id: activity.id,
          status: newStatus
        }),
      });

      if (!response.ok) throw new Error('Update failed');
      
      const updatedActivity = await response.json();
      onUpdate(updatedActivity);
    } catch (error) {
      console.error('Error updating activity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const whatsappLink = client?.phone ? `https://wa.me/${client.phone.replace(/\D/g, '')}?text=${encodeURIComponent(activity.whatsapp_message || '')}` : null;

  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm ${activity.status === 'completed' ? 'bg-green-50 border-l-4 border-green-500' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium">{activity.title}</h3>
            <StatusIndicator status={activity.status} />
          </div>
          <DateTimeDisplay date={activity.scheduled_time} />
          {client && (
            <div className="mt-2 text-sm">
              <p className="font-medium">Cliente: {client.name}</p>
              <p className="text-gray-500">{client.phone}</p>
            </div>
          )}
          {activity.notes && (
            <p className="mt-2 text-sm text-gray-600">{activity.notes}</p>
          )}
        </div>
        
        <div className="flex flex-col gap-2 items-end">
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
            >
              💬 WhatsApp
            </a>
          )}
          
          <button
            onClick={() => handleStatusChange(activity.status === 'completed' ? 'pending' : 'completed')}
            disabled={isUpdating}
            className={`px-3 py-1 text-sm rounded-lg transition-colors cursor-pointer ${
              activity.status === 'completed' 
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isUpdating ? '...' : activity.status === 'completed' ? 'Riapri' : 'Completa'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;