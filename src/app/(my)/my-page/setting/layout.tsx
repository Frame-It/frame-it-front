import BackButton from '@/components/common/back-button';
import BottomNavbar from '@/components/common/bottom-navbar';
import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import Icon from '@/components/common/icon';

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
            <Icon id="back-icon" className="size-[32px] text-gray-40" />
          </BackButton>
        </HeaderLeft>
        <HeaderCenter>계정 정보</HeaderCenter>
        <HeaderRight>
          <div className="h-6 w-6 text-gray-40" />
        </HeaderRight>
      </Header>
      {children}
      <BottomNavbar />
    </div>
  );
}
