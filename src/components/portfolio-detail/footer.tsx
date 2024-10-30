import Icon from '@/components/common/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

interface IPortfolioDetailFooterProps {
  collaborators?: string;
  createdAt?: string;
  views?: string;
}

const PortfolioDetailFooter = ({
  collaborators,
  createdAt,
  views,
}: IPortfolioDetailFooterProps) => {
  const date = parseISO(createdAt || '2024-10-13T05:52:39');
  const formattedDate = format(date, 'yyyy. MM. dd EEEE', { locale: ko });

  return (
    <section className="mt-[16px] space-y-[8px] text-[12px] font-[400] leading-[18px] text-[#4D4744]">
      {collaborators ? (
        <div className="flex items-center gap-x-[8px]">
          <Avatar className="h-6 w-6 rounded-[4px]">
            <AvatarImage src={'/test-image.webp'} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{`${collaborators}과 작업했습니다.`}</span>
        </div>
      ) : null}
      <div className="flex items-center gap-x-[8px]">
        <Icon id="calendar-icon" size={24} className="text-[#7E7774]" />
        <time>{formattedDate}</time>
      </div>
      {/* <div className="flex items-center gap-x-[8px]">
        <Icon id="view-icon" size={24} />
        <span>{`조회수 ${views}`}</span>
      </div> */}
    </section>
  );
};

export default PortfolioDetailFooter;
