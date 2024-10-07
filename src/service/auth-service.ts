// src/services/authService.ts

const ADDRESS =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/login' : '';

export const sendCodeToBackend = async (code: string, state: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/login/${state}?code=${code}&redirect_uri=${ADDRESS}`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error sending code to backend:', error);
    throw error;
  }
};
