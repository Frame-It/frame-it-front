import { cn } from '@/lib/utils';
import React from 'react';
interface ConceptTagProps {
  id: number;
  label: string;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

const ConceptTag: React.FC<ConceptTagProps> = ({
  id,
  label,
  isSelected,
  onToggle,
}) => {
  return (
    <div
      onClick={() => onToggle(id)}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md p-[8px] text-base',
        'box-border border-[1px] border-solid',
        'font-Pretendard text-center text-[14px] font-normal leading-[14px]',
        isSelected
          ? 'border-[#4D4744] bg-[#4D4744] text-white'
          : 'border-[#B4ADA9] bg-white text-[#B4ADA9]',
      )}
    >
      {label}
    </div>
  );
};

export default ConceptTag;
