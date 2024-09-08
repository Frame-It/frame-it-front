'use client';

import StepOne from '@/components/recruit/write/step-one';
import StepTwo from '@/components/recruit/write/step-two';
import { Progress } from '@/components/ui/progress';
import { useProjectRegisterStore } from '@/store/project-regist-store';

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
        {currentStep === 1 && <StepOne />}
        {currentStep === 2 && <StepTwo />}
      </div>
    </>
  );
}
