import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

// Header 컴포넌트
const Header = forwardRef<
  HTMLElement,
  { className?: string; children: React.ReactNode }
>(({ className = '', children, ...props }, ref) => {
  return (
    <nav
      ref={ref}
      className={cn(
        'fixed top-0 z-30 mx-auto grid h-[56px] w-full max-w-[640px] grid-cols-3 border-b border-b-[#ECE9E7] bg-white p-[16px]',
        className,
        { props },
      )}
    >
      {children}
    </nav>
  );
});

Header.displayName = 'Header';

// HeaderLeft 컴포넌트
const HeaderLeft = forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('order-1 flex-1 items-center', className)}
    {...props}
  >
    {children}
  </div>
));
HeaderLeft.displayName = 'HeaderLeft';

// HeaderCenter 컴포넌트
const HeaderCenter = forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('order-2 flex flex-1 items-center justify-center', className)}
    {...props}
  >
    {children}
  </div>
));

HeaderCenter.displayName = 'HeaderCenter';

// HeaderRight 컴포넌트
const HeaderRight = forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('order-3 flex flex-1 items-center justify-end', className)}
    {...props}
  >
    {children}
  </div>
));

HeaderRight.displayName = 'HeaderRight';

export { Header, HeaderLeft, HeaderCenter, HeaderRight };
