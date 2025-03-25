import { IPortfolioResponse } from '@/types/portfolio';
import { getCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMyPortfolios = async ({
  pageParam = 0,
  id,
}: {
  pageParam: number;
  id?: number;
}) => {
  const token = getCookie('accessToken');

  // if (token) {
  try {
    const res = await fetch(
      `${API_URL}/portfolios/user/${id}?page=${pageParam}&size=10`,
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
  // }
};

export const getMyProjects = async () => {
  const token = getCookie('accessToken');

  if (token) {
    try {
      const res = await fetch(`${API_URL}/users/projects`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('something error');
      }

      const data: any = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getGuestProjects = async (id?: number) => {
  if (id) {
    const res = await fetch(`${API_URL}/users/${id}/projects`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(
        '게스트 프로젝트 데이터를 가져오는데 오류가 발생하였습니다! : ' +
          res.status,
      );
    }

    const data = await res.json();
    return data;
  }

  return {};
};
