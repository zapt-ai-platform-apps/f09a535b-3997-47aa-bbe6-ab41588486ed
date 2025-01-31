export const saveClient = async (newClient, accessToken) => {
  const response = await fetch('/api/clients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(newClient),
  });

  if (!response.ok) throw new Error('Failed to save client');
  return await response.json();
};