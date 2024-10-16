import BackButton from '@/components/common/back-button';
import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import Icon from '@/components/common/icon';
import LetterSandForm from '@/components/letter/letter-sand-form';
import { getMyPage } from '@/service/server-actions/my-service';

import React from 'react';

export default async function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // id로 닉네임 받아오기
  const myInfo = await getMyPage();

  return (
    <div className="pb-[66px] pt-[58px]">
      <Header className="border-none shadow-none">
        <HeaderLeft>
          <BackButton>
            <Icon id="back-icon" className="size-[32px] text-gray-40" />
          </BackButton>
        </HeaderLeft>
        <HeaderCenter>닉네임원 닉네임원</HeaderCenter>
        <HeaderRight>
          <div className="size-[32px]"></div>
        </HeaderRight>
      </Header>
      <main className="relative h-[calc(100dvh-73px-58px)] overflow-y-auto px-[16px] pt-[20px]">
        {children}
      </main>
      <LetterSandForm userId={myInfo?.id} />
    </div>
  );
}
