import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFeeds = async () => {
  const res = await fetch(`${API_URL}/portfolios?page=1&size=3`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return data;
};

export const getMyPortfolio = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');

  const res = await fetch(`${API_URL}/portfolios?page=1&size=3`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return data;
};
