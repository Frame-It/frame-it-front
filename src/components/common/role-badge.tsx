import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface IRoleBadgeProps {
  role: 'model' | 'author';
  className?: string;
}

const RoleBadge: React.FunctionComponent<IRoleBadgeProps> = ({
  role,
  className,
}) => {
  return (
    <Badge
      className={cn(
        'flex h-[16px] w-[28px] items-center justify-center whitespace-nowrap rounded-[4px] text-[10px]',
        role === 'model'
          ? 'border border-gray-10 bg-white text-gray-20'
          : 'bg-gray-20 text-white',
        className,
      )}
    >
      {role === 'model' ? '모델' : '작가'}
    </Badge>
  );
};

export default RoleBadge;
