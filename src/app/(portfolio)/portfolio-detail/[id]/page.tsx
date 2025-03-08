import PortfolioContents from '@/components/portfolio-detail/contents';
import PortfolioDetailFooter from '@/components/portfolio-detail/footer';
import PortfolioDetailGallery from '@/components/portfolio-detail/portfolio-gallery';
import PortfolioProfile from '@/components/portfolio-detail/profile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getPortfolioDetail } from '@/service/server-actions/portfolio';

export default async function PortfolioDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const data = await getPortfolioDetail(id);
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
        views={data?.viewCount}
      />
    </ScrollArea>
  );
}
