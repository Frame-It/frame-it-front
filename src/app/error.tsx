'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  const router = useRouter();

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-y-2 break-keep bg-slate-100 px-4">
      <h2 className="font-heading-24 mb-[40px] text-center">
        데이터를 받아오는 도중 오류가 발생했어요!
      </h2>
      <div className="flex w-full items-center gap-x-2">
        <Button
          className="w-full"
          variant="secondary"
          onClick={() => router.replace('/')}
        >
          홈으로
        </Button>
        <Button className="w-full" onClick={() => reset()}>
          이전 페이지로
        </Button>
      </div>
    </div>
  );
}
