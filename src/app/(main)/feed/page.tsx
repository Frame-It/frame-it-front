import FeedList from '@/components/feed/feed-list';
import { getFeeds } from '@/service/server-actions/portfolio';

export default async function FeedPage() {
  const feeds = await getFeeds();

  return (
    <>
      <div className="h-[calc(100dvh-58px-63px-48px)] overflow-y-auto px-[16px] pb-2">
        <FeedList />
      </div>
    </>
  );
}
