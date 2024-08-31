import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';

import localFont from 'next/font/local';
import SvgSymbols from '@/components/common/svg-symbols';
import { Toaster } from '@/components/ui/toaster';

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
      <body className={cn(pretendard.className)}>
        <div className="mx-auto max-w-[360px] overflow-x-hidden">
          {children}
        </div>
        <Toaster />
        <SvgSymbols />
      </body>
    </html>
  );
}
