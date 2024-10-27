import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import './globals.css';

import SvgSymbols from '@/components/common/svg-symbols';
import { Toaster } from '@/components/ui/toaster';
import localFont from 'next/font/local';
import ReactQueryProvider from '@/providers/react-query-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Script from 'next/script';
import Link from 'next/link';

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'Frame-it',
  description: 'Generated by create Framit',
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(pretendard.className, 'relative overflow-hidden')}>
        <div className="xl:flex xl:w-dvw xl:items-center xl:justify-center xl:gap-x-[125px]">
          <div className="relative hidden h-dvh xl:flex xl:flex-col xl:items-center xl:justify-center">
            <img
              src="/color-logo.png"
              alt="desktop-logo"
              className="absolute left-0 top-[70px] w-[171px]"
            />
            <div className="flex min-h-[800px] flex-col justify-around">
              <div className="text-[40px] font-semibold leading-[180%]">
                <h2>개성 넘치는 작가와 모델이 있는 곳,</h2>
                <h2>프레이밋에서 함께 작업할 사람을 찾으세요!</h2>
              </div>
              <div className="text-[34px] font-semibold text-gray-20">
                <span className="flex items-center gap-x-[37px]">
                  웹에서도 프레이밋을 이용해 보세요!
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="225"
                    height="16"
                    viewBox="0 0 225 16"
                    fill="none"
                  >
                    <path
                      d="M224.707 8.70711C225.098 8.31658 225.098 7.68342 224.707 7.29289L218.343 0.928932C217.953 0.538408 217.319 0.538408 216.929 0.928932C216.538 1.31946 216.538 1.95262 216.929 2.34315L222.586 8L216.929 13.6569C216.538 14.0474 216.538 14.6805 216.929 15.0711C217.319 15.4616 217.953 15.4616 218.343 15.0711L224.707 8.70711ZM0 9H224V7H0V9Z"
                      fill="#201A17"
                    />
                  </svg>
                </span>
                <p className="text-[28px] font-normal">
                  모바일의 모든 기능을
                  <strong className="text-primary">오른쪽 화면</strong>에서
                  수행할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="h-dvh overflow-hidden bg-no-repeat xl:h-[830px] xl:bg-[url('/png/mockup_main.png')] xl:p-[15px]">
            <div
              id="main-container"
              className="relative mx-auto h-full w-full max-w-[360px] overflow-hidden bg-white xl:flex xl:h-[800px] xl:flex-col xl:justify-between xl:rounded-[28px]"
            >
              <div className="relative hidden items-center justify-between bg-white px-4 text-gray-20 xl:flex">
                <div>
                  {new Date().getHours()}:{new Date().getMinutes()}
                </div>
                <img
                  src="/png/camera.png"
                  alt="camera"
                  className="absolute left-1/2 w-5 -translate-x-1/2"
                />
                <img src="/png/phone-icon.png" alt="camera" className="w-14" />
              </div>
              <ReactQueryProvider>
                {children}
                <Script src="/sw.js" />
                <ReactQueryDevtools />
              </ReactQueryProvider>
            </div>
          </div>
        </div>
        <Toaster />
        <SvgSymbols />
        <div className="fixed bottom-[45px] right-[100px] flex items-center gap-x-6">
          <Link
            href="https://frameit.notion.site/fb50555b39f24ac0b735e4d6e882767d"
            target="_blank"
            className="text-[20px] leading-[135%] text-gray-20"
          >
            이용 약관
          </Link>
          <Link
            href="https://frameit.notion.site/9db4e942750a419c8079a79806a03113"
            target="_blank"
            className="text-[20px] leading-[135%] text-gray-20"
          >
            개인정보 처리 방침
          </Link>
        </div>
      </body>
    </html>
  );
}
