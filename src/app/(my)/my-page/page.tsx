import Icon from '@/components/common/icon';
import MyPageMenu from '@/components/my-page/menu';
import { Separator } from '@/components/ui/separator';
import MyPageHeader from '@/components/my-page/header';
import HelpCenter from '@/components/my-page/help-center';
import BottomNavbar from '@/components/common/bottom-navbar';
import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import NotificationButton from '@/components/common/notification-button';
import { getMyPage } from '@/service/server-actions/my-service';

export default async function MyPage() {
  const myInfo = await getMyPage();

  return (
    <>
      <Header className="">
        <HeaderLeft>
          <div className="h-8 w-8" />
        </HeaderLeft>
        <HeaderCenter>마이</HeaderCenter>
        <HeaderRight>
          <NotificationButton>
            <Icon id="notification-icon" className="h-6 w-6" />
          </NotificationButton>
        </HeaderRight>
      </Header>
      <main className="px-[12px] pb-[66px] pt-[58px]">
        {/* --- */}
        <MyPageHeader
          nickName={myInfo?.nickname}
          imageUrl={myInfo?.profileImageUrl || undefined}
        />
        <MyPageMenu />
        <Separator className="my-6" />
        <HelpCenter />
        {/* --- */}
        <BottomNavbar />
      </main>
    </>
  );
}
