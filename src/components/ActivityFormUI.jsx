import React from 'react';

const ActivityFormUI = ({ 
  newActivity,
  isSubmitting,
  error,
  clients,
  onSubmit,
  onInputChange
}) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Nuova Attività</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Titolo attività *"
          value={newActivity.title}
          onChange={(e) => onInputChange('title', e.target.value)}
          className="w-full px-3 py-2 border rounded-md box-border"
          required
        />
        
        <input
          type="datetime-local"
          value={newActivity.scheduledTime}
          onChange={(e) => onInputChange('scheduledTime', e.target.value)}
          className="w-full px-3 py-2 border rounded-md box-border"
          required
        />
        
        <select
          value={newActivity.client_id}
          onChange={(e) => onInputChange('client_id', e.target.value)}
          className="w-full px-3 py-2 border rounded-md box-border"
          required
        >
          <option value="">Seleziona cliente *</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
        
        <textarea
          placeholder="Note aggiuntive"
          value={newActivity.notes}
          onChange={(e) => onInputChange('notes', e.target.value)}
          className="w-full px-3 py-2 border rounded-md box-border"
          rows="2"
        />
        
        <input
          type="text"
          placeholder="Messaggio WhatsApp (opzionale)"
          value={newActivity.whatsapp_message}
          onChange={(e) => onInputChange('whatsapp_message', e.target.value)}
          className="w-full px-3 py-2 border rounded-md box-border"
        />
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-blue-300"
        >
          {isSubmitting ? 'Salvataggio...' : 'Aggiungi Attività'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </section>
  );
};

export default ActivityFormUI;