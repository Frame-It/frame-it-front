import { Header, HeaderLeft, HeaderRight } from '@/components/common/header';
import Icon from '@/components/common/icon';
import React from 'react';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header>
        <HeaderLeft>
          <Icon id="back-icon" size={24} />
        </HeaderLeft>
        <HeaderRight>
          <Icon id="share-icon" size={24} />
        </HeaderRight>
      </Header>
      <main>{children}</main>
    </>
  );
}
