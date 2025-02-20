import { infiniteQueryOptions } from '@tanstack/react-query';

import { getFeeds } from '../client-actions/portfolio';

export const feedQueryKey = {
  all: ['feed'],
  lists: () => [...feedQueryKey.all, 'list'],
  list: (role: string) => [...feedQueryKey.lists(), role],
};

export const feedListQueryOption = (role: string) => {
  return infiniteQueryOptions({
    queryKey: ['feeds', role],
    queryFn: ({ pageParam = 0, queryKey }) =>
      getFeeds({ pageParam, role: queryKey[1] }),
    initialPageParam: 0,
    enabled: !!role,
    getNextPageParam: (lastPage) => {
      const { number, totalPages } = lastPage;
      return number + 1 < totalPages ? number + 1 : undefined;
    },
  });
};
