'use client';

import StepOne from '@/components/my-studio/write/step-one';
import StepTwo from '@/components/my-studio/write/step-two';
import { usePortfolioRegisterStore } from '@/store/portfolio-regist-store';

export default function MyStudioWritePage() {
  // Search Params로 데이터 불러오기

  const currentStep = usePortfolioRegisterStore((state) => state.currentStep);

  return (
    <main>
      {currentStep === 1 && <StepOne />}
      {currentStep === 1 && <StepTwo />}
    </main>
  );
}
