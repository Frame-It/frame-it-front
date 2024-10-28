'use client';

import BackButton from '@/components/common/back-button';
import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import Icon from '@/components/common/icon';
import Link from 'next/link';
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
    <>
      <Header>
        <HeaderLeft>
          <BackButton path={isList ? '/my-page' : `/project-management/list`}>
            <Icon id="back-icon" className="size-[32px] text-gray-40" />
          </BackButton>
        </HeaderLeft>
        <HeaderCenter>프로젝트 관리</HeaderCenter>
        <HeaderRight>
          {isList && (
            <Link className="font-gnb text-gray-20" href={'/project-register'}>
              등록
            </Link>
          )}
        </HeaderRight>
      </Header>
      <div className="flex h-screen-dvh flex-col pt-[58px] xl:h-full xl:py-0">
        {children}
      </div>
    </>
  );
}
