'use client';

import PhotoList from '../common/photo-list';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeeds } from '@/service/client-actions/portfolio';
import { useEffect } from 'react';
import { IFeed, IPortfolioResponse } from '@/types/portfolio';

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
  } = useInfiniteQuery({
    queryKey: ['feeds', role],
    queryFn: ({ pageParam = 0, queryKey }) =>
      getFeeds({ pageParam, role: queryKey[1] }),
    enabled: !!role,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log(lastPage);

      const { number, totalPages } = lastPage;
      return number + 1 < totalPages ? number + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <section ref={ref} className="mx-auto w-full">
      {feedData?.pages.map((page: IPortfolioResponse, i: number) => (
        <PhotoList
          key={page.content[0].id + i}
          imageList={page.content as IFeed[]}
          isNavigate
          isFeed
        />
      ))}
    </section>
  );
};

export default FeedList;

// {feeds && feeds.content.length === 0 ? (
//   <EmptyFeeds />
// ) : (
//   <FeedList feedList={feeds.content} />
// )}
