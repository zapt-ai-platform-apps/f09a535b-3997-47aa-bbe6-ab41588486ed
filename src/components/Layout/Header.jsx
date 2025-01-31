import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Agenda Virtuale</h1>
        <a href="https://www.zapt.ai" target="_blank" rel="noopener" className="text-sm text-gray-500 hover:text-gray-700">
          Made on ZAPT
        </a>
      </div>
    </header>
  );
}