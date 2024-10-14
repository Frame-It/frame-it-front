import { Button } from '@/components/ui/button';
import Link from 'next/link';

const EmptyFeeds = () => {
  return (
    <section className="flex h-full flex-col items-center justify-center px-[17px] text-center">
      <p className="font-title-16 text-gray-20">
        아직 등록된 포트폴리오가 없습니다.
      </p>
      <p className="font-body-14 mt-1 text-gray-60">
        포트폴리오를 지금 등록하면 당신의 사진이 첫 번째로 보여질 수 있어요!
      </p>
      <Link href="/portfolio-register">
        <Button variant="secondary" className="mt-[9px] px-6">
          포트폴리오 등록하기
        </Button>
      </Link>
    </section>
  );
};

export default EmptyFeeds;
