import BottomNavbar from '@/components/common/bottom-navbar';
import { Header, HeaderLeft, HeaderRight } from '@/components/common/header';
import Icon from '@/components/common/icon';
import FeedList from '@/components/feed/feed-list';
import Image from 'next/image';

export default function FeedPage() {
  return (
    <div className="pb-[66px] pt-[56px]">
      <Header>
        <HeaderLeft>
          <div className="relative h-[23px] w-[65px]">
            <Image
              src="/logo.png"
              alt="로고"
              priority
              fill
              className="object-contain"
            />
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Icon id="notification-icon" className="h-6 w-6" />
        </HeaderRight>
      </Header>
      <div className="px-[16px] py-[1px]">
        <FeedList />
      </div>
      <BottomNavbar />
    </div>
  );
}
