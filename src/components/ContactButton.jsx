import React from 'react';

const ContactButton = ({ method, value }) => {
  const getHref = () => {
    if (method === 'email') return `mailto:${value}`;
    if (method === 'whatsapp') return `https://wa.me/${value.replace(/\D/g, '')}`;
    if (method === 'telegram') return `https://t.me/${value.replace('@', '')}`;
    return '#';
  };

  return (
    <a
      href={getHref()}
      target="_blank"
      rel="noopener noreferrer"
      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
    >
      {method === 'email' && '📧'}
      {method === 'whatsapp' && '💬'}
      {method === 'telegram' && '✈️'}
    </a>
  );
};

export default ContactButton;