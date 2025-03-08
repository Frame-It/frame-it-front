import api from '@/lib';
import { IMyStudio } from '@/types/my';

export const getUserProfile = async () => {
  const { data } = await api.get<IMyStudio, unknown>(`/users/studio`);
  return data;
};
