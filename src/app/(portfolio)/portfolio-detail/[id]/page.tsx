'use client';

import PortfolioContents from '@/components/portfolio-detail/contents';
import PortfolioDetailFooter from '@/components/portfolio-detail/footer';
import PortfolioDetailGallery from '@/components/portfolio-detail/portfolio-gallery';
import PortfolioProfile from '@/components/portfolio-detail/profile';
import { useMyInfoContext } from '@/providers/my-info-provider';

export default function PortfolioDetailPage() {
  const { portfolioDetail } = useMyInfoContext();

  return (
    <div className="h-[calc(100dvh-54px)] overflow-y-auto">
      <PortfolioProfile
        identity={portfolioDetail?.identity}
        userId={portfolioDetail?.userId}
        userName={portfolioDetail?.userName}
        profileImageUrl={portfolioDetail?.profileImageUrl || ''}
      />
      <PortfolioContents
        title={portfolioDetail?.title}
        description={portfolioDetail?.description}
        tags={portfolioDetail?.hashtags}
      />
      <PortfolioDetailGallery imageList={portfolioDetail?.photosUrl} />
      <PortfolioDetailFooter
        collaborators={portfolioDetail?.collaborators || '알수없음 님'}
        createdAt={portfolioDetail?.createdAt}
        views="아직 구현되지 않은 기능"
      />
    </div>
  );
}
