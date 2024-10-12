import { Badge } from '@/components/ui/badge';

interface IStudioIntroduceProps {
  tagList: string[];
  introduce: string;
}

const StudioIntroduce = ({ tagList, introduce }: IStudioIntroduceProps) => {
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
    </section>
  );
};

export default StudioIntroduce;
