import { getCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBookMarks = async () => {
  const token = getCookie('accessToken');

  if (token) {
    try {
      const res = await fetch(`${API_URL}/projects/bookmarks`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('something error : ' + res.status);
      }

      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
};
