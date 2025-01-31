import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export default function useApiData() {
  const [clients, setClients] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClients = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/clients', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch clients');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      Sentry.captureException(error);
      setError('Errore nel caricamento clienti');
    }
  };

  const fetchActivities = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/activities', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch activities');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      Sentry.captureException(error);
      setError('Errore nel caricamento attività');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchClients();
      await fetchActivities();
    };

    initializeData();
  }, []);

  return { clients, activities, loading, error, fetchClients, fetchActivities, setActivities };
}