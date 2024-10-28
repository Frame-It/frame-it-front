import { INotification } from '@/types/notification';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getNotification = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');

  if (token) {
    const res = await fetch(`${API_URL}/notifications`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      next: {
        tags: ['get/notification'],
      },
    });

    if (!res.ok) {
      throw new Error('알림 데이터 받아오기 오류 : ' + res.status);
    }

    const data: INotification[] = await res.json();
    return data;
  }

  return [];
};
