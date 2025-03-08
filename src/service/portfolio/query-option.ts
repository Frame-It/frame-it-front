import { queryOptions } from '@tanstack/react-query';

export const profileQueryKey = {
  all: ['portfolio'],
};

export const profileQueryOption = () => {
  return queryOptions({
    queryKey: profileQueryKey.all,
  });
};
