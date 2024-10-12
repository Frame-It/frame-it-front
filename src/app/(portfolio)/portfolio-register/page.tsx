'use client';

import StepOne from '@/components/my-studio/write/step-one';
import StepTwo from '@/components/my-studio/write/step-two';
import { Progress } from '@/components/ui/progress';
import { usePortfolioRegisterStore } from '@/store/portfolio-regist-store';

export default function MyStudioWritePage() {
  // Search Params로 데이터 불러오기
  const currentStep = usePortfolioRegisterStore((state) => state.currentStep);
  const maxStep = usePortfolioRegisterStore((state) => state.maxStep);

  return (
    <main>
      <Progress
        value={(currentStep / maxStep) * 100}
        className="fixed z-20 mx-auto max-w-[360px]"
      />
      <div className="h-[calc(100dvh-58px-64px)] overflow-y-auto px-[16px] py-[38px]">
        {currentStep === 1 && <StepOne />}
        {currentStep === 2 && <StepTwo />}
      </div>
    </main>
  );
}
