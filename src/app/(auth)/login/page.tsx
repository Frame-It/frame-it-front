'use client';

import SocialButton from '@/components/common/social-button';
import { toast } from '@/components/ui/use-toast';
import { sendCodeToBackend } from '@/service/auth-service';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const KAKAO_HREF = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&state=kakao`;
const GOOGLE_HREF = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}&response_type=code&scope=profile email&state=google`;

export default function LoginPage({
  searchParams: { code, state },
}: {
  searchParams: { code: string; state: string };
}) {
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      if (code && state) {
        try {
          const data = await sendCodeToBackend(code, state);

          if (data === undefined) {
            toast({
              title: '서버에서 오류가 발생하였습니다.',
              variant: 'destructive',
            });
          }

          if (!data?.signUpCompleted) {
            setCookie('accessToken', data.accessToken);
            router.push('/register');
          } else {
            setCookie('identity', data.identity);
            setCookie('accessToken', data.accessToken);
            router.push('/');
          }
        } catch (error) {
          console.error('Error during authentication:', error);
          // 오류 시 에러 페이지로 이동하거나 에러 처리 가능
        }
      }
    };

    authenticate();
  }, [code, router, state]);

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
        <SocialButton href={KAKAO_HREF} variant="kakao">
          카카오 로그인
        </SocialButton>
        <SocialButton href={GOOGLE_HREF} variant="google" className="mt-[12px]">
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
