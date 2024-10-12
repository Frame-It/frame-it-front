import { PortfolioResponse } from '@/types/portfolio';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFeeds = async ({
  role = 'all',
  page = 0,
  size = 10,
}: {
  role?: 'all' | 'model' | 'author';
  page?: number;
  size?: number;
}) => {
  if (role === 'all') {
    const res = await fetch(`${API_URL}/portfolios?page=${page}&size=${size}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    return data;
  }

  if (role === 'model') {
    const res = await fetch(`${API_URL}/portfolios?page=1&size=3`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    return data;
  }

  if (role === 'author') {
    const res = await fetch(`${API_URL}/portfolios?page=1&size=3`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: PortfolioResponse = await res.json();
    return data;
  }
};

export const getMyPortfolio = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');

  if (token) {
    const res = await fetch(`${API_URL}/me?page=1&size=3`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    });

    const data = await res.json();
    return data;
  }
};
