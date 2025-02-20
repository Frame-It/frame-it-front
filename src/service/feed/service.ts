const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFeeds = async ({
  pageParam = 0,
  role = 'all',
}: {
  pageParam: number;
  role: string;
}) => {
  const rolePathMap: Record<string, string> = {
    all: '',
    model: '/model',
    author: '/photography',
  };

  const path = rolePathMap[role] ?? '';
  const url = `${API_URL}/portfolios${path}?page=${pageParam}&size=10`;

  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};
