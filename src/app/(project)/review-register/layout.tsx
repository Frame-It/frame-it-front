import BackButton from '@/components/common/back-button';
import { Header, HeaderCenter, HeaderLeft } from '@/components/common/header';
import Icon from '@/components/common/icon';

export default function ReviewRegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col pt-[58px]">
      <Header>
        <HeaderLeft>
          <BackButton>
            <Icon id="back-icon" className="size-[32px] text-gray-40" />
          </BackButton>
        </HeaderLeft>
        <HeaderCenter>리뷰 작성</HeaderCenter>
      </Header>
      {children}
    </div>
  );
}
