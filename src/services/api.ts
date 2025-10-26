const BASE_URL = 'https://your-backend.com/api';

export const postLocation = async (location: any) => {
  try {
    const res = await fetch(`${BASE_URL}/locations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(location),
    });
    return await res.json();
  } catch (error) {
    console.log('API postLocation error:', error);
  }
};

export const sendSOS = async (userId: string, lat: number, lng: number) => {
  try {
    const res = await fetch(`${BASE_URL}/sos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, lat, lng }),
    });
    return await res.json();
  } catch (error) {
    console.log('API sendSOS error:', error);
  }
};
