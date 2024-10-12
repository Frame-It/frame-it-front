import FeedList from '@/components/feed/feed-list';

export default async function FeedPage() {
  return (
    <>
      <div className="h-[calc(100dvh-58px-63px-48px)] overflow-y-auto px-[16px] pb-2">
        <FeedList role="all" />
      </div>
    </>
  );
}
