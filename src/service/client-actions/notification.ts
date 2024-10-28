import { sendTokenHandler } from '@/lib/firebase';
import { getCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteNotification = async (id: number) => {
  const token = getCookie('accessToken');

  if (token) {
    const res = await fetch(`${API_URL}/notifications/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export const tokenRenewal = async (userId: number) => {
  const token = getCookie('accessToken');
  const diviceToken = await sendTokenHandler();

  if (token && diviceToken) {
    const res = await fetch(`${API_URL}/users/${userId}/deviseToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ deviseToken: diviceToken }),
    });

    if (!res.ok) {
      throw new Error('토큰 업데이트 에러!');
    }
  }
};

export const tokenDelete = async (userId: number) => {
  const token = getCookie('accessToken');

  if (token) {
    const res = await fetch(`${API_URL}/users/${userId}/deviseToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ deviceToken: null }),
    });

    if (!res.ok) {
      throw new Error('토큰 삭제 에러!');
    }
  }
};
