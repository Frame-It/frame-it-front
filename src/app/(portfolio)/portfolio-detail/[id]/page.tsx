import PortfolioContents from '@/components/portfolio-detail/contents';
import PortfolioDetailFooter from '@/components/portfolio-detail/footer';
import PortfolioDetailGallery from '@/components/portfolio-detail/portfolio-gallery';
import PortfolioProfile from '@/components/portfolio-detail/profile';

export default function PortfolioDetailPage() {
  return (
    <div className="h-[calc(100dvh-58px)] overflow-y-auto py-2">
      <PortfolioProfile />
      <PortfolioContents />
      <PortfolioDetailGallery />
      <PortfolioDetailFooter />
    </div>
  );
}
