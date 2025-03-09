import api from '@/lib';
import { IPortfolioDetail } from '@/types/portfolio';

export const getPortfolioDetail = async (id?: string) => {
  const { data } = await api.get<IPortfolioDetail, unknown>(
    `/portfolios/portfolio/${id}`,
  );
  return data;
};
