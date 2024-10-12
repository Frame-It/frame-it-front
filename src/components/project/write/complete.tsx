import BottomButton from '@/components/common/bottom-button';
import Link from 'next/link';

const Complete = ({ title }: { title: string }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[9px]">
      <div className="flex flex-col items-center gap-1">
        <h1 className="font-title-16 text-gray-20">
          모집 공고가 등록되었습니다.
        </h1>
        <p className="font-body-14 text-gray-60">{title}</p>
      </div>
      <Link href={'/'} className="w-[217px]">
        <BottomButton
          variant={'secondary'}
          size={'middle'}
          label={'홈으로 가기'}
          className="font-button-14"
        />
      </Link>

      <div className="h-[58px]" />
    </div>
  );
};

export default Complete;
