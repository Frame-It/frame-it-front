'use server';

export const getAuthorization = async () => {
  const { cookies } = await import('next/headers');
  const accessToken = cookies().get('accessToken')?.value;
  if (accessToken) return `Bearer ${accessToken}`;
  return null;
};

export const getAuthHeader = async () => {
  const accessToken = await getAuthorization();

  let headers: HeadersInit = {};
  if (accessToken) {
    headers = {
      Authorization: accessToken,
    };
  }

  return headers;
};
