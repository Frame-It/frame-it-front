import BottomNavbar from '@/components/common/bottom-navbar';
import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import Icon from '@/components/common/icon';
import NotificationButton from '@/components/common/notification-button';

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pb-[66px] pt-[58px]">
      <Header>
        <HeaderLeft>
          <div className="h-8 w-8" />
        </HeaderLeft>
        <HeaderCenter>스튜디오</HeaderCenter>
        <HeaderRight>
          <NotificationButton>
            <Icon id="notification-icon" className="h-6 w-6 text-gray-40" />
          </NotificationButton>
        </HeaderRight>
      </Header>

      {children}

      <BottomNavbar />
    </div>
  );
}
