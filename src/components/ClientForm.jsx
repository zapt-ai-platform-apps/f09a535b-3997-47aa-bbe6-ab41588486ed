import React from 'react';

const ClientForm = ({ newClient, setNewClient, onAddClient }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Nuovo Cliente</h2>
      <form onSubmit={onAddClient} className="space-y-3">
        <input
          type="text"
          placeholder="Nome cliente"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md box-border"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newClient.email}
          onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
          className="w-full px-3 py-2 border rounded-md box-border"
        />
        <input
          type="tel"
          placeholder="WhatsApp"
          value={newClient.whatsapp}
          onChange={(e) => setNewClient({ ...newClient, whatsapp: e.target.value })}
          className="w-full px-3 py-2 border rounded-md box-border"
        />
        <input
          type="text"
          placeholder="Telegram (@username)"
          value={newClient.telegram}
          onChange={(e) => setNewClient({ ...newClient, telegram: e.target.value })}
          className="w-full px-3 py-2 border rounded-md box-border"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Aggiungi Cliente
        </button>
      </form>
    </section>
  );
};

export default ClientForm;