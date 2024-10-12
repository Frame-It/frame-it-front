import { IPortfolioResponse } from '@/types/portfolio';
import { getCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMyPortfolios = async ({
  pageParam = 0,
}: {
  pageParam: number;
}) => {
  const token = getCookie('accessToken');

  try {
    const res = await fetch(
      `${API_URL}/portfolios/me?page=${pageParam}&size=10`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error('something error');
    }

    const data: IPortfolioResponse = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
