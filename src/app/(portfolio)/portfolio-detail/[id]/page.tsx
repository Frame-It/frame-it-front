import PortfolioContents from '@/components/portfolio-detail/contents';
import PortfolioDetailFooter from '@/components/portfolio-detail/footer';
import PortfolioDetailGallery from '@/components/portfolio-detail/portfolio-gallery';
import PortfolioProfile from '@/components/portfolio-detail/profile';
import { getPortfolioDetail } from '@/service/server-actions/portfolio';
import { headers } from 'next/headers';

export default async function PortfolioDetailPage() {
  const headersList = headers();
  const headerPathname = headersList.get('x-pathname') || '';

  const id = headerPathname.split('/').at(-1);
  const portfolioDetail = await getPortfolioDetail(id);

  return (
    <div className="h-[calc(100dvh-58px)] overflow-y-auto py-2">
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
        collaborators={portfolioDetail?.collaborators}
        createdAt={portfolioDetail?.userName}
      />
    </div>
  );
}
