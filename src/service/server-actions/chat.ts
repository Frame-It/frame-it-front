import { IChatDetail } from '@/types/letter';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserChat = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');

  if (token) {
    try {
      const res = await fetch(`${API_URL}/chats`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.value}`,
        },
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  return [];
};

export const getChatMessageUsingServer = async (id?: number) => {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');

  if (id && token) {
    const res = await fetch(`${API_URL}/chats/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Something Error!');
    }

    const data: IChatDetail = await res.json();

    return data;
  }
};
