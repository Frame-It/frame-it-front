'use client';

import BackButton from '@/components/common/back-button';
import { Header, HeaderCenter, HeaderLeft } from '@/components/common/header';
import Icon from '@/components/common/icon';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const ProjectLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const isComplete = searchParams.get('complete') === 'true';

  return (
    <div className={cn('flex h-screen flex-col')}>
      <Header className="border-none text-lg shadow-none">
        {!isComplete && (
          <HeaderLeft>
            <BackButton className="flex items-center justify-center">
              <Icon id="back-icon" className="size-[32px] text-gray-40" />
            </BackButton>
          </HeaderLeft>
        )}
        <HeaderCenter>프로젝트 등록</HeaderCenter>
      </Header>
      <main className="mt-[56px] h-[calc(100%-58px)]">{children}</main>
    </div>
  );
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectLayoutContent>{children}</ProjectLayoutContent>
    </Suspense>
  );
}
