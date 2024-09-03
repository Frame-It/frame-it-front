import BackButton from '@/components/common/back-button';
import { Header, HeaderLeft, HeaderRight } from '@/components/common/header';
import Icon from '@/components/common/icon';
import ShareButton from '@/components/common/share-button';
import PortfolioDetailMenu from '@/components/portfolio-detail/menu';
import { headers } from 'next/headers';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const headerPathname = headersList.get('x-pathname') || '';
  const userID = '0000';
  const portfolioID = headerPathname.split('/').filter((el) => !!el)[1];

  console.log(userID);
  console.log(portfolioID);
  // 유저 아이디로 작성된 게시글이면 공유버튼말고 ... 버튼이 존재해야 함

  const isMyPortfolio = true;

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
            <PortfolioDetailMenu />
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
