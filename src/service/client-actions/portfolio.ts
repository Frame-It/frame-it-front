import { IPortfolioDetail } from '@/types/portfolio';
import { getCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postPortfolio = async (data: any) => {
  const formData = new FormData();

  // 필수
  formData.append('title', data.title);
  data.photos.forEach((photo: any, i: number) => {
    formData.append('photos', photo, 'photo' + i);
  });

  // 선택
  if (data.description) {
    formData.append('description', data.description);
  }

  if (data.hashtags) {
    data.hashtags.forEach((hashtag: string) => {
      formData.append('hashtags', hashtag);
    });
  }

  if (data.togethers) {
    data.hashtags.forEach((together: string) => {
      formData.append('togethers', together);
    });
  }

  const token = getCookie('accessToken');

  const res = await fetch(`${API_URL}/portfolios/portfolio`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    return true;
  }

  return false;
};

export const getFeeds = async ({
  pageParam = 0,
  role,
}: {
  pageParam: number;
  role: string;
}) => {
  if (role === 'all') {
    const res = await fetch(`${API_URL}/portfolios?page=${pageParam}&size=10`, {
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
    const res = await fetch(
      `${API_URL}/portfolios/model?page=${pageParam}&size=10`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await res.json();
    return data;
  }

  if (role === 'author') {
    const res = await fetch(
      `${API_URL}/portfolios/photography?page=${pageParam}&size=10`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await res.json();
    return data;
  }
};

export const getPortfolioDetailClient = async (id?: string) => {
  const token = getCookie('accessToken');

  if (token && id) {
    const res = await fetch(`${API_URL}/portfolios/portfolio/${id}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data: IPortfolioDetail = await res.json();

    console.log(data);

    return data;
  }
};
