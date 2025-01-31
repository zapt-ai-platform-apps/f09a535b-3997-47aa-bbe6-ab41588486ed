import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import ClientFormUI from './ClientFormUI';
import { saveClient } from '../services/clientService';

const ClientForm = ({ onClientAdded }) => {
  const [newClient, setNewClient] = useState({ 
    name: '', 
    phone: '', 
    address: '', 
    email: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      await saveClient(newClient, session?.access_token);
      setNewClient({ name: '', phone: '', address: '', email: '' });
      onClientAdded();
    } catch (error) {
      Sentry.captureException(error);
      setError('Errore nel salvataggio del cliente');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setNewClient({
      ...newClient,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ClientFormUI
      newClient={newClient}
      isSubmitting={isSubmitting}
      error={error}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};

export default ClientForm;