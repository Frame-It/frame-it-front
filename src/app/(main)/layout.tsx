import BottomNavbar from '@/components/common/bottom-navbar';
import { Header, HeaderLeft, HeaderRight } from '@/components/common/header';
import Icon from '@/components/common/icon';
import Image from 'next/image';
import Link from 'next/link';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pb-[66px] pt-[58px]">
      <Header>
        <HeaderLeft>
          <Link href="/">
            <div className="relative h-[23px] w-[65px]">
              <Image
                src="/logo.png"
                alt="로고"
                priority
                fill
                className="object-contain"
              />
            </div>
          </Link>
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
