import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMyReviews = async (id: number) => {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');

  if (token) {
    try {
      const res = await fetch(`${API_URL}/users/${id}/projects/reviews`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.value}`,
        },
      });

      if (!res.ok) {
        throw new Error('something error : ' + res.status);
      }

      const data: {
        reviewerNickname: string;
        tags: string[];
        content: string;
      }[] = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  return [];
};

export const getGuestStudio = async (id?: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');

  if (token) {
    const res = await fetch(`${API_URL}/users/${id}/studio`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (!res.ok) {
      throw new Error('게스트 스튜디오 데이터 오류 : ' + res.status);
    }

    const data = await res.json();
    return data;
  }

  return {};
};
