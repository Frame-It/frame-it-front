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

  if (data.hashtags && data.hashtags.length > 0) {
    data.hashtags.forEach((hashtag: string) => {
      formData.append('hashtags', hashtag);
    });
  }

  if (data.togethers && data.hashtags.length > 0) {
    data.togethers.forEach((together: string) => {
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
  role = 'all',
}: {
  pageParam: number;
  role: string;
}) => {
  const rolePathMap: Record<string, string> = {
    all: '',
    model: '/model',
    author: '/photography',
  };

  const path = rolePathMap[role] ?? '';
  const url = `${API_URL}/portfolios${path}?page=${pageParam}&size=10`;

  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
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
    return data;
  }
};

export const updatePortfolio = async (data: any, id: string) => {
  const formData = new FormData();

  formData.append('title', data.title);

  // 선택
  if (data.description) {
    formData.append('description', data.description);
  } else {
    formData.append('description', '');
  }

  if (data.hashtags || data.togethers.length >= 0) {
    data.hashtags.forEach((hashtag: string) => {
      formData.append('hashtags', hashtag);
    });
  }

  if (data.togethers && data.hashtags.length > 0) {
    data.togethers.forEach((together: string) => {
      formData.append('togethers', together);
    });
  }

  if (data.addPhotos && data.addPhotos.length > 0) {
    data.addPhotos.forEach((photo: any, i: number) => {
      formData.append('addPhotos', photo, 'aphoto' + i);
    });
  }

  if (data.deletePhotos && data.deletePhotos.length > 0) {
    data.deletePhotos.forEach((deletePhotos: string) => {
      formData.append('deletePhotos', deletePhotos);
    });
  }

  const token = getCookie('accessToken');

  const res = await fetch(`${API_URL}/portfolios/${id}`, {
    method: 'PUT',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // console.log(await res.json());

  if (res.ok) {
    return true;
  }

  return false;
};

export const deletePortfolio = async (id: string) => {
  const token = getCookie('accessToken');

  if (token && id) {
    const res = await fetch(`${API_URL}/portfolios/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      return true;
    }
    return false;
  }
};
