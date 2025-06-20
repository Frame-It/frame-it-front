'use client';

import BackButton from '@/components/common/back-button';
import { Header, HeaderCenter, HeaderLeft } from '@/components/common/header';
import Icon from '@/components/common/icon';
import { cn } from '@/lib/utils';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const ProjectLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const isComplete = searchParams.get('complete') === 'true';
  const router = useRouter();
  const { currentStep, prevStep } = useProjectRegisterStore();
  const handleClickBack = () => {
    if (currentStep === 1) {
      router.back();
    } else {
      prevStep();
    }
  };
  return (
    <>
      <Header className="border-none text-lg shadow-none">
        {!isComplete && (
          <HeaderLeft>
            <BackButton
              className="flex items-center justify-center"
              onClick={handleClickBack}
            >
              <Icon id="back-icon" className="size-[32px] text-gray-40" />
            </BackButton>
          </HeaderLeft>
        )}
        <HeaderCenter>프로젝트 등록</HeaderCenter>
      </Header>
      <div className={cn('flex h-screen-dvh flex-col')}>
        <main className="mt-[56px] h-[calc(100%-58px)] xl:mt-0 xl:h-[calc(800px-58px-24px)]">
          {children}
        </main>
      </div>
    </>
  );
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<></>}>
      <ProjectLayoutContent>{children}</ProjectLayoutContent>
    </Suspense>
  );
}
