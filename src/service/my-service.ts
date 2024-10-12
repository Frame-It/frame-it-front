import { IMyInfo } from '@/types/my';
import { cookies } from 'next/headers';

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMyPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');

  if (token?.value) {
    const response = await fetch(`${SERVER_URL}/users/studio`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      cache: 'no-store',
    });

    const data = await response.json();
    return data;
  }
};

export const getMyInfo = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');

  if (token?.value) {
    const response = await fetch(`${SERVER_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      cache: 'no-store',
    });

    const data: IMyInfo = await response.json();
    return data;
  }
};
