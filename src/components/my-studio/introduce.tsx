'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface IMyStudioIntroduceProps {
  tagList: string[];
  introduce: string;
}

const MyStudioIntroduce: React.FunctionComponent<IMyStudioIntroduceProps> = ({
  tagList,
  introduce,
}) => {
  const router = useRouter();

  return (
    <section className="mt-[4px]">
      <p className="text-[14px] leading-[150%] text-[#201A17]">{introduce}</p>
      <ul className="mt-[4px] flex flex-wrap items-center gap-x-[6px] gap-y-[4px]">
        {tagList.map((el) => (
          <Badge
            key={el}
            variant="feed"
            className="h-[24px] px-[8px] text-[12px] font-normal"
          >
            {el}
          </Badge>
        ))}
      </ul>
      <div className="mt-[16px] flex items-center gap-x-[8px]">
        <Button
          onClick={() => router.push('/')}
          className="h-[37px] w-full rounded-[8px] border border-[#7E7774] bg-white text-[14px] text-[#201A17]"
        >
          프로필 편집
        </Button>
        <Button
          onClick={() => router.push('/portfolio-register')}
          className="h-[37px] w-full rounded-[8px] bg-black text-[14px]"
        >
          포트폴리오 등록하기
        </Button>
      </div>
    </section>
  );
};

export default MyStudioIntroduce;
