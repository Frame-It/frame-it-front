import { getCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteUser = async (reason?: string) => {
  const token = getCookie('accessToken');

  if (token) {
    const formData = new FormData();
    formData.append('quitReason', reason || '');

    const response = await fetch(`${API_URL}/users`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify({
        quitReason: reason,
      }),
    });

    if (response.ok) {
      return true;
    }

    return false;
  }
};
