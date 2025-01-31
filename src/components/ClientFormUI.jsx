import React from 'react';

const ClientFormUI = ({ newClient, isSubmitting, error, handleSubmit, handleChange }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Nuovo Cliente</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Nome cliente *"
          value={newClient.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md box-border"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Telefono *"
          value={newClient.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md box-border"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newClient.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md box-border"
        />
        <input
          type="text"
          name="address"
          placeholder="Indirizzo"
          value={newClient.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md box-border"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-blue-300"
        >
          {isSubmitting ? 'Salvataggio...' : 'Aggiungi Cliente'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </section>
  );
};

export default ClientFormUI;