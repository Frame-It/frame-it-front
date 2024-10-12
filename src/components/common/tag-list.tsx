import { IProjectConcept, IUserConcept } from '@/constants/project';
import { cn } from '@/lib/utils';

export const TagList = ({
  tags,
  size,
  className,
}: {
  tags: IProjectConcept[] | IUserConcept[];
  size: 'medium' | 'small';
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide',
        size === 'medium' ? 'gap-[6px]' : 'gap-[4px]',
        className,
      )}
    >
      {tags.map((tag: IProjectConcept | IUserConcept) => (
        <Tag key={tag.id} label={tag.label} size={size} />
      ))}
    </div>
  );
};

const Tag = ({ label, size }: { label: string; size: 'medium' | 'small' }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-[8px] rounded-[40px] border border-gray-60 leading-normal text-gray-60',
        size === 'medium'
          ? 'font-tag-14 h-[26px] px-[10px] py-[4px]'
          : 'font-tag-12 h-[20px] px-[7px] py-[4px]',
      )}
    >
      {label}
    </div>
  );
};
