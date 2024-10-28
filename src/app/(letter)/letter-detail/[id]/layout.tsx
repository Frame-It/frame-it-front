import BackButton from '@/components/common/back-button';
import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import Icon from '@/components/common/icon';

import React from 'react';

export default async function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // id로 닉네임 받아오기

  return (
    <>
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
      <main className="relative overflow-y-auto pt-[78px] xl:py-0">
        {children}
      </main>
    </>
  );
}
