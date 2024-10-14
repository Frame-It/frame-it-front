'use client';

import Complete from '@/components/project/write/complete';
import StepOne from '@/components/project/write/step-one';
import StepTwo from '@/components/project/write/step-two';
import { Progress } from '@/components/ui/progress';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import { useSearchParams } from 'next/navigation';

export default function ProjectWritePage() {
  const currentStep = useProjectRegisterStore((state) => state.currentStep);
  const maxStep = useProjectRegisterStore((state) => state.maxStep);
  const projectName = useProjectRegisterStore(
    (state) => state.projectInfo.projectName,
  );

  const searchParams = useSearchParams();
  const isComplete = searchParams.get('complete') === 'true';

  if (isComplete) {
    return <Complete title={projectName} />;
  }

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
