import BackButton from '@/components/common/back-button';
import { Header, HeaderLeft, HeaderRight } from '@/components/common/header';
import Icon from '@/components/common/icon';
import ShareButton from '@/components/common/share-button';
import PortfolioDetailMenu from '@/components/portfolio-detail/menu';
import { MyInfoProvider } from '@/providers/my-info-provider';
import { getMyPage } from '@/service/server-actions/my-service';
import { getPortfolioDetail } from '@/service/server-actions/portfolio';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export default async function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const headerPathname = headersList.get('x-pathname') || '';
  const id = headerPathname.split('/').at(-1);

  const myPage = await getMyPage();
  const portfolioDetail = await getPortfolioDetail(id);
  const isMyPortfolio = myPage?.id === portfolioDetail?.userId;

  return (
    <>
      <Header className="border-none shadow-none">
        <HeaderLeft>
          <BackButton>
            <Icon id="back-icon" size={32} className="text-gray-40" />
          </BackButton>
        </HeaderLeft>
        <HeaderRight>
          {isMyPortfolio ? (
            <PortfolioDetailMenu id={id} />
          ) : (
            <ShareButton>
              <Icon id="share-icon" size={32} className="text-gray-40" />
            </ShareButton>
          )}
        </HeaderRight>
      </Header>
      <main className="mb-[16px] mt-[56px] px-[16px]">{children}</main>
    </>
  );
}
