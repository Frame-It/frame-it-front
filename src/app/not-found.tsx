import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-dvh w-full max-w-[360px] flex-col items-center justify-center px-16 text-center">
      <h2 className="font-title-18">앗! 페이지를 찾을 수 없어요</h2>
      <div className="font-body-14 mt-[6px] text-center text-gray-60">
        <p>존재하지 않는 페이지이거나</p>
        <p>페이지가 변경/삭제되어 찾을 수 없습니다.</p>
      </div>
      <Link href="/">
        <Button variant="outline" className="mt-7 w-[235px]">
          홈으로
        </Button>
      </Link>
    </main>
  );
}
