'use client';

import PhotoList from '../common/photo-list';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeeds } from '@/service/client-actions/portfolio';
import { useEffect } from 'react';
import { IFeed, IPortfolioResponse } from '@/types/portfolio';
import EmptyFeeds from './empty-feeds';

interface IFeedListProps {
  role: string;
}

const FeedList: React.FunctionComponent<IFeedListProps> = ({ role }) => {
  const { ref, inView } = useInView();

  const {
    data: feedData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['feeds', role],
    queryFn: ({ pageParam = 0, queryKey }) =>
      getFeeds({ pageParam, role: queryKey[1] }),
    enabled: !!role,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { number, totalPages } = lastPage;
      return number + 1 < totalPages ? number + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  console.log(feedData);

  return (
    <section ref={ref} className="mx-auto h-full w-full">
      {feedData ? (
        <>
          {feedData?.pages?.map((page: IPortfolioResponse, i: number) => (
            <PhotoList
              key={page?.content[0]?.id + i}
              imageList={(page?.content as IFeed[]) || []}
              isNavigate
              isFeed
            />
          ))}
        </>
      ) : (
        <>
          <EmptyFeeds />
        </>
      )}
    </section>
  );
};

export default FeedList;
