import BackButton from '@/components/common/back-button';
import BottomNavbar from '@/components/common/bottom-navbar';
import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import Icon from '@/components/common/icon';
import NotificationButton from '@/components/common/notification-button';

export default function MyStudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pb-[66px] pt-[58px]">
      <Header>
        <HeaderLeft>
          <BackButton>
            <Icon id={'back-icon'} size={32} className="text-gray-20" />
          </BackButton>
        </HeaderLeft>
        <HeaderCenter>마이 스튜디오</HeaderCenter>
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
