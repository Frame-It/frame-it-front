'use client';

import RegisterStepFour from '@/components/auth/register-step-four';
import RegisterStepOne from '@/components/auth/register-step-one';
import RegisterStepThree from '@/components/auth/register-step-three';
import RegisterStepTwo from '@/components/auth/register-step-two';
import { useUserRegisterStore } from '@/store/user-regist-store';

export default function RegisterPage() {
  const step = useUserRegisterStore((state) => state.currentStep);

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
