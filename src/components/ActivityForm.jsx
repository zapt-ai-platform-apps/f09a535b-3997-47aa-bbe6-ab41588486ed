import React from 'react';

const ActivityForm = ({ newActivity, setNewActivity, onAddActivity, clients }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Nuova Attività</h2>
      <form onSubmit={onAddActivity} className="space-y-3">
        <input
          type="text"
          placeholder="Titolo attività"
          value={newActivity.title}
          onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-md box-border"
          required
        />
        <input
          type="datetime-local"
          value={newActivity.date}
          onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
          className="w-full px-3 py-2 border rounded-md box-border"
          required
        />
        <select
          value={newActivity.client}
          onChange={(e) => setNewActivity({ ...newActivity, client: e.target.value })}
          className="w-full px-3 py-2 border rounded-md box-border"
          required
        >
          <option value="">Seleziona cliente</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
        <select
          value={newActivity.type}
          onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
          className="w-full px-3 py-2 border rounded-md box-border"
        >
          <option value="meeting">Meeting</option>
          <option value="call">Chiamata</option>
          <option value="task">Task</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Aggiungi Attività
        </button>
      </form>
    </section>
  );
};

export default ActivityForm;