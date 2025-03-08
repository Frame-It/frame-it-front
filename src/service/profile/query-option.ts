import { queryOptions } from '@tanstack/react-query';
import { getUserProfile } from './service';

export const profileQueryKey = {
  all: ['profile'],
};

export const profileQueryOption = () => {
  return queryOptions({
    queryKey: profileQueryKey.all,
    queryFn: getUserProfile,
  });
};
