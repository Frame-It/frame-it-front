import { cn } from '@/lib/utils';
import Icon from '../../common/icon';

interface IDropdownButtonProps {
  label: string;
  isSelected?: boolean;
}

const DropdownButton = ({
  label,
  isSelected = false,
}: IDropdownButtonProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-[2px] self-stretch rounded-full border-[1px] p-[6px] px-[12px]',
        isSelected
          ? 'border-transparent bg-[#4D4744] text-white'
          : 'border-[#4D4744] bg-transparent text-[#4D4744]',
      )}
    >
      <span
        className={cn(
          'whitespace-nowrap text-[14px] font-normal leading-[14px]',
          isSelected ? 'text-white' : 'text-[#4D4744]',
        )}
      >
        {label}
      </span>
      <Icon id={'arrow-down-icon'} width={18} height={18} />
    </div>
  );
};

export default DropdownButton;
