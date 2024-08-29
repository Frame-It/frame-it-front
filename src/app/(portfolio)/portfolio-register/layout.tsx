import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import Icon from '@/components/common/icon';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header className="border-none text-lg shadow-none">
        <HeaderLeft>
          <Icon id="back-icon" size={24} />
        </HeaderLeft>
        <HeaderCenter className="font-semibold text-gray-10">
          포트폴리오 등록
        </HeaderCenter>
        <HeaderRight>
          <Icon id="share-icon" size={26} />
        </HeaderRight>
      </Header>
      <main className="mb-[16px] mt-[56px]">{children}</main>
    </>
  );
}
