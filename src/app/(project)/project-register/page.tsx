'use client';

import { Progress } from '@/components/ui/progress';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import { Suspense, lazy } from 'react';

const StepOne = lazy(() => import('@/components/project/write/step-one'));
const StepTwo = lazy(() => import('@/components/project/write/step-two'));

export default function ProjectWritePage() {
  const currentStep = useProjectRegisterStore((state) => state.currentStep);
  const maxStep = useProjectRegisterStore((state) => state.maxStep);

  return (
    <>
      <Progress
        value={(currentStep / maxStep) * 100}
        className="fixed z-20 mx-auto max-w-[360px]"
      />
      <div className="h-full px-4 pt-6">
        <Suspense fallback={<div>Loading...</div>}>
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo />}
        </Suspense>
      </div>
    </>
  );
}
