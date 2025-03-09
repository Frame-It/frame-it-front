import api from '@/lib';
import { IPortfolioResponse } from '@/types/portfolio';

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

  const { data } = await api.get<IPortfolioResponse, unknown>(
    `/portfolios${path}?page=${pageParam}&size=10`,
  );

  return data;
};
