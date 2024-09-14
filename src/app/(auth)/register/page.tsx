'use client';

import RegisterStepOne from '@/components/auth/register-step-one';
import RegisterStepThree from '@/components/auth/register-step-three';
import RegisterStepTwo from '@/components/auth/register-step-two';
import { useUserRegisterStore } from '@/store/user-regist-store';

export default function RegisterPage() {
  const step = useUserRegisterStore((state) => state.currentStep);

  return (
    <main className="relative mb-[16px] mt-[56px] h-full">
      {/* title */}
      <section className="font-title-18 ml-2 mt-[42px] max-w-[200px] break-keep">
        <div>안녕하세요!</div>
        <div>프레이밋 서비스 이용을 위해</div>
        <div>동의해 주세요.</div>
      </section>

      {/* steps */}
      {step === 1 && <RegisterStepOne />}
      {step === 2 && <RegisterStepTwo />}
      {step === 3 && <RegisterStepThree />}
    </main>
  );
}
