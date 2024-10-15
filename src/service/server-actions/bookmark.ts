import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBookMarks = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');

  if (token) {
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.value}`,
        },
      });

      // if (!res.ok) {
      //   throw new Error('something error : ' + res.status);
      // }

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
};
