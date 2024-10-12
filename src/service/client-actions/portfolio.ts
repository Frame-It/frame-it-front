import { getCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postPortfolio = async (data: any) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('hashtags', JSON.stringify(data.hashtags));
  formData.append('togethers', JSON.stringify(data.togethers));
  formData.append('photos', data.photo);

  const token = getCookie('accessToken');

  const res = await fetch(`${API_URL}/portfolio`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res);
};
