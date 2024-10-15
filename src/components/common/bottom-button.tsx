import { cn } from '@/lib/utils';
import React, { ButtonHTMLAttributes } from 'react';

export interface IBottomButtonProps {
  variant: 'primary' | 'secondary' | 'stroke';
  size: 'large' | 'middle' | 'small';
  label: string;
  disabled?: boolean;
}

export type BottomButtonProps = IBottomButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

const BottomButton: React.FC<
  IBottomButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ variant, size, label, disabled = false, ...props }) => {
  const sizeStyles = {
    large: 'max-w-[328px] min-h-[46px] h-[46px]',
    middle: 'max-w-[220px] min-h-[40px] h-[40px]',
    small: 'max-w-[104px] min-h-[32px] h-[32px]',
  };

  const variantStyles = {
    primary: {
      default: 'bg-[#E45E25] text-[#FFF]',
      pressed: 'active:bg-[#D15722] text-[#FFF]',
      disabled: 'bg-[#CDC8C6] text-[#B4ADA9] cursor-not-allowed',
    },
    secondary: {
      default: 'bg-[#4D4744] text-[#FFF]',
      disabled: 'bg-[#CDC8C6] text-[#B4ADA9] cursor-not-allowed',
    },
    stroke: {
      default: 'bg-white border-[#7E7774] text-[#7E7774]',
      disabled: 'bg-[#CDC8C6] border-none text-[#B4ADA9] cursor-not-allowed',
    },
  };

  const style = disabled
    ? variantStyles[variant].disabled
    : `${variantStyles[variant].default} ${variant === 'primary' ? variantStyles.primary.pressed : ''}`;

  const classes = cn(
    'flex flex-col w-full justify-center items-center rounded-lg text-center border-[1.314px] border-solid border-transparent',
    sizeStyles[size],
    style,
  );

  return (
    <button
      disabled={disabled}
      {...props}
      className={cn(classes, props.className)}
    >
      {label}
    </button>
  );
};

export default BottomButton;
