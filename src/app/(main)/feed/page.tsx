import FeedFilter from '@/components/feed/feed-filter';
import FeedList from '@/components/feed/feed-list';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Props {
  searchParams: { role: string; sort: string };
}
export default async function FeedPage({ searchParams }: Props) {
  const filterRole = searchParams.role || 'all';

  return (
    <>
      <FeedFilter />
      <ScrollArea className="h-[calc(100dvh-58px-64px-48px)] overflow-y-auto px-[16px] xl:h-full xl:max-h-[600px]">
        <FeedList role={filterRole} />
      </ScrollArea>
    </>
  );
}
