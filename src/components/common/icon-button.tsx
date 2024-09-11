import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';

const IconButton = ({
  icon,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: ReactNode }) => {
  return (
    <button
      {...props}
      className={cn(
        'flex h-[41px] w-[41px] flex-shrink-0 flex-col items-center justify-center rounded-[8px] border border-gray-40 bg-white',
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;
