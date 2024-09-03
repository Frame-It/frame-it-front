import BottomNavbar from '@/components/common/bottom-navbar';
import { Header, HeaderCenter } from '@/components/common/header';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-[66px] pt-[58px]">
      <Header className="border-gray-80 text-lg shadow-none">
        <HeaderCenter className="font-semibold text-gray-10">쪽지</HeaderCenter>
      </Header>
      {children}
      <BottomNavbar />
    </div>
  );
}
