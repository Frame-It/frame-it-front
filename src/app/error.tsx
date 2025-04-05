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
      <h2 className="font-heading-28 mb-[20px] text-center">
        데이터를 받아오는 도중 오류가 발생했어요 !
      </h2>
      <pre className="w-full max-w-full overflow-auto whitespace-pre-wrap break-words rounded bg-white p-4 text-sm text-red-600">
        {error.message}
      </pre>

      <div className="flex w-full items-center gap-x-2">
        <Button
          className="w-full"
          variant="secondary"
          size="default"
          onClick={() => router.replace('/')}
        >
          홈으로 가기
        </Button>
        <Button className="w-full" size="default" onClick={() => reset()}>
          데이터 다시 요청하기
        </Button>
      </div>
    </div>
  );
}
