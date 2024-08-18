import BottomNavbar from '@/components/common/bottom-navbar';
import { Header, HeaderLeft, HeaderRight } from '@/components/common/header';
import Icon from '@/components/common/icon';
import Image from 'next/image';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pb-[65.93px] pt-[56px]">
      <Header>
        <HeaderLeft>
          <Image src="/logo.png" alt="로고" width={65} height={23} />
        </HeaderLeft>
        <HeaderRight>
          <Icon id="notification-icon" className="h-6 w-6" />
        </HeaderRight>
      </Header>
      {children}
      <BottomNavbar />
    </div>
  );
}
