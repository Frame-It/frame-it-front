'use client';

import BackButton from '@/components/common/back-button';
import { Header, HeaderCenter, HeaderLeft } from '@/components/common/header';
import Icon from '@/components/common/icon';
import { cn } from '@/lib/utils';

export default function ProjectEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn('flex h-screen flex-col')}>
      <Header className="border-none text-lg shadow-none">
        <HeaderLeft>
          <BackButton className="flex items-center justify-center">
            <Icon id="back-icon" className="size-[32px] text-gray-40" />
          </BackButton>
        </HeaderLeft>
        <HeaderCenter>프로젝트 수정</HeaderCenter>
      </Header>
      <main className="mt-[56px] h-[calc(100%-58px)]">{children}</main>
    </div>
  );
}
