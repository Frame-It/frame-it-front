'use client';

import BackButton from '@/components/common/back-button';
import BottomNavbar from '@/components/common/bottom-navbar';
import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import Icon from '@/components/common/icon';
import { useParams } from 'next/navigation';

export default function ProjectManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const { id } = params;
  const isList = id === undefined;

  return (
    <div className="flex h-screen flex-col pb-[66px] pt-[58px]">
      <Header>
        <HeaderLeft>
          <BackButton>
            <Icon id="back-icon" className="size-[32px] text-gray-40" />
          </BackButton>
        </HeaderLeft>
        <HeaderCenter>프로젝트 관리</HeaderCenter>
        <HeaderRight>
          {isList && <button className="font-gnb text-gray-20">등록</button>}
        </HeaderRight>
      </Header>
      {children}
      <BottomNavbar />
    </div>
  );
}
