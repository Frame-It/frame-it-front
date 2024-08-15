import BottomNavbar from '@/components/common/bottom-navbar';
import Header from '@/components/common/header';
import Icon from '@/components/common/icon';
import FeedList from '@/components/feed/feed-list';
import Image from 'next/image';

export default function FeedPage() {
  return (
    <div className="pb-[65.93px] pt-[56px]">
      <Header
        left={<Image src="/logo.png" alt="로고" width={65} height={23} />}
        right={<Icon id="notification-icon" className="h-6 w-6" />}
      />
      <div className="px-[16px] py-[1px]">
        <FeedList />
      </div>
      <BottomNavbar />
    </div>
  );
}
