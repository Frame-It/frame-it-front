import { SocialButton } from '@/components/common/social-button';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="mb-[16px] mt-[56px] flex h-full flex-1 flex-col items-stretch justify-center space-y-[217px] px-[45px]">
      <section className="flex max-w-[270px] flex-col items-center justify-center space-y-6">
        <img src="/png/login-logo.png" alt="로그인 로고" />
        <p className="font-body-16 break-keep text-center text-white">
          개성 넘치는 작가와 모델이 있는 곳, 프레이밋에서 함께 작업할 사람을
          찾으세요!
        </p>
      </section>
      <section className="w-full">
        <SocialButton variant="kakao">카카오 로그인</SocialButton>
        <SocialButton variant="google" className="mt-[12px]">
          구글 로그인
        </SocialButton>
        <Link href="/">
          <p className="font-body-14 mt-4 text-center text-white underline">
            둘러보기
          </p>
        </Link>
      </section>
    </main>
  );
}
