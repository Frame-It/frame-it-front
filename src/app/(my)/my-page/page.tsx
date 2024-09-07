import Image from 'next/image';
import Icon from '@/components/common/icon';
import MyPageMenu from '@/components/my-page/menu';
import { Separator } from '@/components/ui/separator';
import MyPageHeader from '@/components/my-page/header';
import HelpCenter from '@/components/my-page/help-center';
import BottomNavbar from '@/components/common/bottom-navbar';
import { Header, HeaderLeft, HeaderRight } from '@/components/common/header';
import Link from 'next/link';

export default function MyPage() {
  return (
    <main className="pb-[66px] pt-[58px]">
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

      {/* --- */}
      <MyPageHeader />
      <MyPageMenu />
      <Separator className="my-6" />
      <HelpCenter />
      {/* --- */}

      <BottomNavbar />
    </main>
  );
}
