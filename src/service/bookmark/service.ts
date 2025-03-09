import api from '@/lib';

export const getUserBookMarks = async () => {
  const { data } = await api.get<any, unknown>(`/projects/bookmarks`);

  return data;
};
