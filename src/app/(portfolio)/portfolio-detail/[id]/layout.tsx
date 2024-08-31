import BackButton from '@/components/common/back-button';
import { Header, HeaderLeft, HeaderRight } from '@/components/common/header';
import Icon from '@/components/common/icon';
import ShareButton from '@/components/common/share-button';
import React from 'react';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header className="border-none shadow-none">
        <HeaderLeft>
          <BackButton>
            <Icon id="back-icon" size={32} className="text-gray-40" />
          </BackButton>
        </HeaderLeft>
        <HeaderRight>
          <ShareButton>
            <Icon id="share-icon" size={32} className="text-gray-40" />
          </ShareButton>
        </HeaderRight>
      </Header>
      <main className="mb-[16px] mt-[56px] px-[16px]">{children}</main>
    </>
  );
}
