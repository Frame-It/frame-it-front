import EmptyFeeds from '@/components/feed/empty-feeds';
import FeedList from '@/components/feed/feed-list';
import { getFeeds } from '@/service/server-actions/portfolio';
import { PortfolioResponse } from '@/types/portfolio';

export default async function FeedPage() {
  const feeds: PortfolioResponse = await getFeeds({});

  console.log(feeds);

  return (
    <>
      <div className="h-[calc(100dvh-58px-63px-48px)] overflow-y-auto px-[16px] pb-2">
        {feeds && feeds.content.length === 0 ? (
          <EmptyFeeds />
        ) : (
          <FeedList feedList={feeds.content} />
        )}
      </div>
    </>
  );
}
