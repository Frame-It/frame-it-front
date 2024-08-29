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
          <Icon id="back-icon" size={32} className="text-gray-40" />
        </HeaderLeft>
        <HeaderCenter>포트폴리오 등록</HeaderCenter>
        <HeaderRight>
          <div className="size-[32px]"></div>
        </HeaderRight>
      </Header>
      <main className="mb-[16px] mt-[56px]">{children}</main>
    </>
  );
}
