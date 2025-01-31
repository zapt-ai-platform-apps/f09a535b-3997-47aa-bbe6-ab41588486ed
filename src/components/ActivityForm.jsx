import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import ActivityFormUI from './ActivityFormUI';

const ActivityForm = ({ clients, onActivityAdded }) => {
  const [newActivity, setNewActivity] = useState({ 
    title: '', 
    scheduledTime: '', 
    client_id: '', 
    notes: '',
    whatsapp_message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          ...newActivity,
          client_id: parseInt(newActivity.client_id),
          scheduled_time: newActivity.scheduledTime
        }),
      });

      if (!response.ok) throw new Error('Failed to save activity');
      
      await response.json();
      setNewActivity({ 
        title: '', 
        scheduledTime: '', 
        client_id: '', 
        notes: '',
        whatsapp_message: '' 
      });
      onActivityAdded();
    } catch (error) {
      Sentry.captureException(error);
      setError('Errore nel salvataggio dell\'attività');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewActivity(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ActivityFormUI
      newActivity={newActivity}
      isSubmitting={isSubmitting}
      error={error}
      clients={clients}
      onSubmit={handleSubmit}
      onInputChange={handleInputChange}
    />
  );
};

export default ActivityForm;