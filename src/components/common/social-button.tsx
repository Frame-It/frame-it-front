import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

const socialButtonVariants = cva(
  `w-full h-[45px] px-[14px] flex items-center justify-center text-gray-10 text-[14px] leading-[150%] font-bold gap-x-[8px] rounded-[6px]`,
  {
    variants: {
      variant: {
        kakao: 'bg-kakao',
        google: 'bg-white',
      },
    },
    defaultVariants: {
      variant: 'kakao',
    },
  },
);

export interface SocialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof socialButtonVariants> {
  asChild?: boolean;
}

const SocialButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ className, variant, ...props }, ref) => {
    console.log(variant);

    return (
      <button
        className={cn(socialButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {variant === 'kakao' && (
          <img src="/icon/kakao-icon.svg" alt="카카오 로고" />
        )}
        {variant === 'google' && (
          <img src="/icon/google-icon.svg" alt="구글 로고" />
        )}
        {props.children}
      </button>
    );
  },
);
SocialButton.displayName = 'SocialButton';

export { SocialButton, socialButtonVariants };
