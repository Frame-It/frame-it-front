import BackButton from '@/components/common/back-button';
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
    <>
      <Header>
        <HeaderLeft>
          <BackButton>
            <Icon id="back-icon" className="size-[32px] text-gray-40" />
          </BackButton>
        </HeaderLeft>
        <HeaderCenter>알림</HeaderCenter>
        <HeaderRight>
          <div className="h-6 w-6" />
        </HeaderRight>
      </Header>
      <main className="h-full w-full pb-[66px] pt-[58px] xl:flex-1 xl:p-0">
        {children}
      </main>
    </>
  );
}
