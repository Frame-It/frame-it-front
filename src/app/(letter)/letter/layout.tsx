import { Header, HeaderCenter } from '@/components/common/header';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header className="border-none text-lg shadow-none">
        <HeaderCenter className="font-semibold text-gray-10">쪽지</HeaderCenter>
      </Header>
      <main className="mb-[16px] mt-[56px]">{children}</main>
    </>
  );
}
