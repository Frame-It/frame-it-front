import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import './globals.css';

import SvgSymbols from '@/components/common/svg-symbols';
import { Toaster } from '@/components/ui/toaster';
import localFont from 'next/font/local';
import ReactQueryProvider from '@/providers/react-query-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Script from 'next/script';

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
        <div className="relative xl:flex xl:w-dvw xl:items-center xl:justify-between">
          <div className="ml-[100px] hidden h-dvh xl:flex xl:flex-col">
            <img
              src="/color-logo.png"
              alt="desktop-logo"
              className="mt-[20px] h-[62px] w-[171px]"
            />

            <div className="mt-[10px] flex min-h-[800px] flex-col justify-around">
              <div className="text-[40px] font-semibold leading-[180%]">
                <h2>개성 넘치는 작가와 모델이 있는 곳,</h2>
                <h2>프레이밋에서 함께 작업할 사람을 찾으세요!</h2>
              </div>
              <div className="text-[32px] text-gray-20">
                <h3>웹에서도 프레이밋을 이용해 보세요!</h3>
                <p className="text-[28px]">
                  모바일의 모든 기능을 오른쪽 화면에서 수행할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          <div
            id="main-container"
            className="relative mx-auto h-dvh w-full max-w-[360px] overflow-hidden overflow-x-hidden rounded-lg border-4 xl:flex xl:h-[800px] xl:flex-col xl:justify-between"
          >
            <ReactQueryProvider>
              {children}
              <Script src="/sw.js" />
              <ReactQueryDevtools />
            </ReactQueryProvider>
          </div>
        </div>
        <Toaster />
        <SvgSymbols />
      </body>
    </html>
  );
}
