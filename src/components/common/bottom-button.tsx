import { cn } from '@/lib/utils';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'stroke';
  size: 'large' | 'middle' | 'small';
  label: string;
  disabled?: boolean;
}

const BottomButton: React.FC<
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ variant, size, label, disabled = false, ...props }) => {
  const sizeStyles = {
    large: 'w-[328px] h-[46px]',
    middle: 'w-[220px] h-[40px]',
    small: 'w-[104px] h-[32px]',
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
      default: 'bg-white border-[1.314px] border-[#7E7774] text-[#7E7774]',
      disabled: 'bg-[#CDC8C6] border-none text-[#B4ADA9] cursor-not-allowed',
    },
  };

  const style = disabled
    ? variantStyles[variant].disabled
    : `${variantStyles[variant].default} ${variant === 'primary' ? variantStyles.primary.pressed : ''}`;

  const classes = cn(
    'flex flex-col justify-center items-center flex-shrink-0 rounded-lg text-center',
    sizeStyles[size],
    style,
  );

  return (
    <button className={classes} disabled={disabled} {...props}>
      {label}
    </button>
  );
};

export default BottomButton;
