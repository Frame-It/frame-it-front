import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';

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

export interface ISocialButtonProps
  extends VariantProps<typeof socialButtonVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SocialButton: React.FunctionComponent<ISocialButtonProps> = ({
  href,
  className,
  variant,
  children,
}) => {
  return (
    <Link
      href={href}
      className={cn(socialButtonVariants({ variant, className }))}
    >
      {variant === 'kakao' && (
        <img src="/icon/kakao-icon.svg" alt="카카오 로고" />
      )}
      {variant === 'google' && (
        <img src="/icon/google-icon.svg" alt="구글 로고" />
      )}
      {children}
    </Link>
  );
};

export default SocialButton;
