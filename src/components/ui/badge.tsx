import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        feed: 'px-[12px] py-[6px] text-[12px] leading-[12px]',
        portfolioDetail:
          'px-[8px] py-[6px] text-[12px] font-[400] text-[#4D4744] border-[#CDC8C6] bg-white bg-opacity-70 leading-[12px] select-none',
      },
      type: {
        author: 'bg-white border-[#4D4744] text-',
        model: 'bg-[rgba(32, 26, 23, 0.70)] border-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, type, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, type }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
