import Icon from '@/components/common/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { faker } from '@faker-js/faker';

interface IPortfolioDetailFooterProps {}

const PortfolioDetailFooter: React.FunctionComponent<
  IPortfolioDetailFooterProps
> = () => {
  return (
    <section className="mt-[16px] space-y-[8px] text-[12px] font-[400] leading-[18px] text-[#4D4744]">
      <div className="flex items-center gap-x-[8px]">
        <Avatar className="h-6 w-6 rounded-[4px]">
          <AvatarImage src={faker.image.avatarLegacy()} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>곱슬머리님과 작업했습니다.</span>
      </div>
      <div className="flex items-center gap-x-[8px]">
        <Icon id="calendar-icon" size={24} className="text-[#7E7774]" />
        <time>2024. 08. 04 일요일</time>
      </div>
      <div className="flex items-center gap-x-[8px]">
        <Icon id="view-icon" size={24} />
        <span>조회수 103</span>
      </div>
    </section>
  );
};

export default PortfolioDetailFooter;
