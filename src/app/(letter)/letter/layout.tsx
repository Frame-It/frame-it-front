import BottomNavbar from '@/components/common/bottom-navbar';
import { Header, HeaderCenter } from '@/components/common/header';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header className="border-gray-80 text-lg shadow-none">
        <HeaderCenter className="font-semibold text-gray-10">쪽지</HeaderCenter>
      </Header>
      <div className="w-full flex-1 pb-[66px] pt-[58px] xl:p-0">{children}</div>
      <BottomNavbar />
    </>
  );
}
