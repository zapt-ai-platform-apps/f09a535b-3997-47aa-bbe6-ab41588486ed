import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import ContactButton from './components/ContactButton';
import ClientForm from './components/ClientForm';
import ActivityForm from './components/ActivityForm';

export default function App() {
  const [clients, setClients] = useState([]);
  const [activities, setActivities] = useState([]);
  const [newClient, setNewClient] = useState({ name: '', email: '', whatsapp: '', telegram: '' });
  const [newActivity, setNewActivity] = useState({ title: '', date: '', client: '', type: 'meeting' });

  const handleAddClient = (e) => {
    e.preventDefault();
    setClients([...clients, { ...newClient, id: Date.now() }]);
    setNewClient({ name: '', email: '', whatsapp: '', telegram: '' });
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    setActivities([...activities, { ...newActivity, id: Date.now() }]);
    setNewActivity({ title: '', date: '', client: '', type: 'meeting' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Agenda Virtuale</h1>
          <a href="https://www.zapt.ai" target="_blank" rel="noopener" className="text-sm text-gray-500 hover:text-gray-700">
            Made on ZAPT
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        <ClientForm 
          newClient={newClient}
          setNewClient={setNewClient}
          onAddClient={handleAddClient}
        />

        <ActivityForm 
          newActivity={newActivity}
          setNewActivity={setNewActivity}
          onAddActivity={handleAddActivity}
          clients={clients}
        />

        <section className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Attività Programmate</h2>
          <div className="space-y-3">
            {activities.map(activity => {
              const client = clients.find(c => c.id === activity.client);
              return (
                <div key={activity.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{activity.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.date).toLocaleString()} • {activity.type}
                      </p>
                      {client && <p className="text-sm mt-1">Cliente: {client.name}</p>}
                    </div>
                    <div className="flex gap-2">
                      {client?.email && <ContactButton method="email" value={client.email} />}
                      {client?.whatsapp && <ContactButton method="whatsapp" value={client.whatsapp} />}
                      {client?.telegram && <ContactButton method="telegram" value={client.telegram} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}