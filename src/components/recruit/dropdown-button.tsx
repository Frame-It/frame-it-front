import { cn } from '@/lib/utils';
import Icon from '../common/icon';

interface IDropdownButtonProps {
  label: string;
}

const DropdownButton = ({ label }: IDropdownButtonProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-[2px] self-stretch rounded-full border-[1px] border-[#4D4744] p-[6px] px-[12px]',
      )}
    >
      <span
        className={cn(
          'whitespace-nowrap text-[14px] font-normal leading-[14px] text-[#4D4744]',
        )}
      >
        {label}
      </span>
      <Icon id={'arrow-down-icon'} width={18} height={18} />
    </div>
  );
};

export default DropdownButton;
