'use client';

import PhotoList from '../common/photo-list';
import { useInView } from 'react-intersection-observer';
import { IFeed, IPortfolioResponse } from '@/types/portfolio';
import EmptyFeeds from './empty-feeds';
import { useFeedListQuery } from '@/service/feed/use-service';

interface IFeedListProps {
  role: string;
}

const FeedList: React.FunctionComponent<IFeedListProps> = ({ role }) => {
  const {
    data: feedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useFeedListQuery(role);

  const { ref } = useInView({
    onChange(inView) {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    },
  });

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
