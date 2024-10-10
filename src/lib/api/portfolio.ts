const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFeeds = async () => {
  return await fetch(`${API_URL}/portfolio`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
  }).then((res) => res.json());
};
