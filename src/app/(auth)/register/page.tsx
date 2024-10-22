'use client';

import RegisterStepFour from '@/components/auth/register-step-four';
import RegisterStepOne from '@/components/auth/register-step-one';
import RegisterStepThree from '@/components/auth/register-step-three';
import RegisterStepTwo from '@/components/auth/register-step-two';
import { usePreventNavigation } from '@/hooks/use-router-prevent';
import { useUserRegisterStore } from '@/store/user-regist-store';

export default function RegisterPage() {
  const step = useUserRegisterStore((state) => state.currentStep);

  const isDirty = !!step;
  const message =
    '정말 뒤로가기를 누르시겠습니까? 이미 작성된 정보는 저장되지 않습니다!';

  usePreventNavigation(isDirty, message);

  return (
    <main className="relative h-full pb-[16px] pt-[56px]">
      {/* steps */}
      {step === 1 && <RegisterStepOne />}
      {step === 2 && <RegisterStepTwo />}
      {step === 3 && <RegisterStepThree />}
      {step === 4 && <RegisterStepFour />}
    </main>
  );
}
