'use client';

import StepOne from '@/components/my-studio/write/step-one';
import StepTwo from '@/components/my-studio/write/step-two';
import { Progress } from '@/components/ui/progress';
import { usePortfolioRegisterStore } from '@/store/portfolio-regist-store';

export default function MyStudioWritePage() {
  // Search Params로 데이터 불러오기

  const currentStep = usePortfolioRegisterStore((state) => state.currentStep);

  return (
    <main className="">
      <Progress value={50} />
      <div className="mt-[32px] px-[16px]">
        {currentStep === 1 && <StepOne />}
        {currentStep === 2 && <StepTwo />}
      </div>
    </main>
  );
}
