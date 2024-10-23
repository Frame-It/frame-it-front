'use client';

import BackButton from '@/components/common/back-button';
import { Header, HeaderCenter, HeaderLeft } from '@/components/common/header';
import Icon from '@/components/common/icon';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

export default function ReviewRegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isComplete = searchParams.get('complete') === 'true';
  const isHost = searchParams.get('isHost');
  const status = searchParams.get('status');

  const handleClickBack = () => {
    router.push(
      `/project-management/${params.id}?status=${status}&isHost=${isHost}`,
    );
  };
  return (
    <div className="h-screen-dvh flex flex-col pt-[58px]">
      <Header>
        <HeaderLeft>
          <BackButton onClick={handleClickBack}>
            <Icon id="back-icon" className="size-[32px] text-gray-40" />
          </BackButton>
        </HeaderLeft>
        <HeaderCenter>{isComplete ? '리뷰완료' : '리뷰작성'}</HeaderCenter>
      </Header>
      {children}
    </div>
  );
}
