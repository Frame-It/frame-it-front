'use client';

import PortfolioContents from '@/components/portfolio-detail/contents';
import PortfolioDetailFooter from '@/components/portfolio-detail/footer';
import PortfolioDetailGallery from '@/components/portfolio-detail/portfolio-gallery';
import PortfolioProfile from '@/components/portfolio-detail/profile';
import { getPortfolioDetailClient } from '@/service/client-actions/portfolio';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export default function PortfolioDetailPage() {
  const id = usePathname().split('/').at(-1);

  const { data } = useQuery({
    queryKey: ['portfolioDetail', id],
    queryFn: ({ queryKey }) => getPortfolioDetailClient(queryKey[1]),
    enabled: !!id,
    staleTime: 0,
  });

  return (
    <div className="h-[calc(100dvh-54px)] overflow-y-auto pb-[14px] pt-4">
      <PortfolioProfile
        identity={data?.identity}
        userId={data?.userId}
        userName={data?.userName}
        profileImageUrl={data?.profileImageUrl || ''}
      />
      <PortfolioContents
        title={data?.title}
        description={data?.description}
        tags={data?.hashtags}
      />
      <PortfolioDetailGallery imageList={data?.photosUrl} />
      <PortfolioDetailFooter
        collaborators={data?.collaborators || '알수없음 님'}
        createdAt={data?.createdAt}
        views="아직 구현되지 않은 기능"
      />
    </div>
  );
}
