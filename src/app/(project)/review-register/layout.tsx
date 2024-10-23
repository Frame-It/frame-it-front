'use client';

import BackButton from '@/components/common/back-button';
import { Header, HeaderCenter, HeaderLeft } from '@/components/common/header';
import Icon from '@/components/common/icon';
import { useSearchParams } from 'next/navigation';

export default function ReviewRegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const isComplete = searchParams.get('complete') === 'true';
  return (
    <div className="h-screen-dvh flex flex-col pt-[58px]">
      <Header>
        <HeaderLeft>
          <BackButton>
            <Icon id="back-icon" className="size-[32px] text-gray-40" />
          </BackButton>
        </HeaderLeft>
        <HeaderCenter>{isComplete ? '리뷰완료' : '리뷰작성'}</HeaderCenter>
      </Header>
      {children}
    </div>
  );
}
