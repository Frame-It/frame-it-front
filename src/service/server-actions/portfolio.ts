'use server';

import { IPortfolioDetail } from '@/types/portfolio';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export const getPortfolioDetail = async (id?: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');

  if (id) {
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token.value}` } : {}),
    };
    const res = await fetch(`${API_URL}/portfolios/portfolio/${id}`, {
      method: 'GET',
      cache: 'no-store',
      headers,
      next: { tags: ['getPortfolioDetail'] },
    });

    const data: IPortfolioDetail = await res.json();

    return data;
  }
};
