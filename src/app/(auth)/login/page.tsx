'use client';

import SocialButton from '@/components/common/social-button';
import useNativeLogin from '@/hooks/use-native-login';
import useWebLogin from '@/hooks/use-web-login';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const KAKAO_HREF = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&state=kakao`;
const GOOGLE_HREF = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}&response_type=code&scope=profile email&state=google`;

export default function LoginPage({
  searchParams: { code, state },
}: {
  searchParams: { code: string; state: string };
}) {
  const { loading: nativeLoading } = useNativeLogin({ code, state });
  const { loading: webLoading } = useWebLogin({ code, state });
  const loading = nativeLoading || webLoading;

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
        <SocialButton href={KAKAO_HREF} variant="kakao" disabled={loading}>
          {'카카오 로그인'}
        </SocialButton>
        <SocialButton
          href={GOOGLE_HREF}
          variant="google"
          className="mt-[12px]"
          disabled={loading}
        >
          {'구글 로그인'}
        </SocialButton>
        <Link
          href="/"
          className={cn(loading ? 'pointer-events-none' : '')}
          aria-disabled={loading}
          tabIndex={loading ? -1 : undefined}
        >
          <p className="font-body-14 mt-4 text-center text-white underline">
            둘러보기
          </p>
        </Link>
      </section>
    </main>
  );
}
