import React from 'react';
import useApiData from './hooks/useApiData';
import ClientForm from './components/ClientForm';
import ActivityForm from './components/ActivityForm';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Layout/Header';
import ActivityList from './components/Activities/ActivityList';

export default function App() {
  const { clients, activities, loading, error, fetchClients, fetchActivities, setActivities } = useApiData();

  const handleActivityUpdate = (updatedActivity) => {
    setActivities(prev => prev.map(a => a.id === updatedActivity.id ? updatedActivity : a));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        <ClientForm onClientAdded={fetchClients} />
        <ActivityForm clients={clients} onActivityAdded={fetchActivities} />
        
        <ActivityList
          activities={activities}
          clients={clients}
          onUpdate={handleActivityUpdate}
        />
      </main>
    </div>
  );
}