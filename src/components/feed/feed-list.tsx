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
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const isEmptyFeed =
    !feedData || feedData.pages.every((page) => page?.content?.length === 0);

  return (
    <section className="mx-auto h-full w-full">
      {status === 'pending' && <p>Loading feeds...</p>}
      {status === 'error' && <p>Error loading feeds.</p>}
      {isEmptyFeed ? (
        <EmptyFeeds />
      ) : (
        feedData?.pages?.map((page: IPortfolioResponse, i: number) => (
          <PhotoList
            key={i}
            imageList={(page?.content as IFeed[]) || []}
            isNavigate
            isFeed
          />
        ))
      )}
      <div ref={ref} style={{ height: '20px', background: 'transparent' }}>
        {isFetchingNextPage ? <p>Loading more feed...</p> : null}
      </div>
    </section>
  );
};

export default FeedList;
