'use client';

import PortfolioContents from '@/components/portfolio-detail/contents';
import PortfolioDetailFooter from '@/components/portfolio-detail/footer';
import PortfolioDetailGallery from '@/components/portfolio-detail/portfolio-gallery';
import PortfolioProfile from '@/components/portfolio-detail/profile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getPortfolioDetailClient } from '@/service/client-actions/portfolio';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export default function PortfolioDetailPage() {
  const id = usePathname().split('/').at(-1);

  const { data } = useQuery({
    queryKey: ['portfolioDetail', id],
    queryFn: ({ queryKey }) => getPortfolioDetailClient(queryKey[1]),
    enabled: !!id,
  });

  return (
    <ScrollArea className="h-[calc(100dvh-54px)] w-full overflow-y-auto px-[16px] pb-[14px] pt-4 xl:h-[calc(800px-54px-24px)]">
      <PortfolioProfile
        identity={data?.identity}
        userId={data?.userId}
        userName={data?.userNickname}
        profileImageUrl={data?.profileImageUrl || ''}
      />
      <PortfolioContents
        title={data?.title}
        description={data?.description}
        tags={data?.hashtags}
      />
      <PortfolioDetailGallery imageList={data?.photosUrl} />
      <PortfolioDetailFooter
        collaborators={data?.collaborators}
        createdAt={data?.createdAt}
        views="아직 구현되지 않은 기능"
      />
    </ScrollArea>
  );
}
