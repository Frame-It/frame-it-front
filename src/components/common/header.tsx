import { cn } from '@/lib/utils';

import React, { forwardRef, ReactNode, isValidElement } from 'react';

// Header 컴포넌트
const Header = forwardRef<
  HTMLElement,
  { className?: string; children: React.ReactNode }
>(({ className = '', children, ...props }, ref) => {
  let leftContent: ReactNode = null;
  let centerContent: ReactNode = null;
  let rightContent: ReactNode = null;

  // children을 순회하면서 HeaderLeft, HeaderCenter, HeaderRight을 적절히 배치
  const childrenArray = React.Children.toArray(children);

  childrenArray.forEach((child) => {
    if (isValidElement(child)) {
      switch (child.type) {
        case HeaderLeft:
          leftContent = child;
          break;
        case HeaderCenter:
          centerContent = child;
          break;
        case HeaderRight:
          rightContent = child;
          break;
        default:
          throw new Error(
            'Header 컴포넌트는 HeaderLeft, HeaderCenter, HeaderRight만 포함할 수 있습니다.',
          );
      }
    }
  });

  return (
    <header
      ref={ref}
      {...props}
      className={cn(
        'fixed top-0 z-30 mx-auto flex h-[58px] w-full max-w-[360px] items-center justify-between border-b border-b-[#ECE9E7] bg-white px-[16px] py-[13px]',
        className,
      )}
    >
      <div className="flex items-center justify-start">{leftContent}</div>
      <div className="flex-grow text-center">{centerContent}</div>
      <div className="flex items-center justify-end">{rightContent}</div>
    </header>
  );
});

// HeaderLeft 컴포넌트
const HeaderLeft = forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props}>
    {children}
  </div>
));

// HeaderCenter 컴포넌트
const HeaderCenter = forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-base font-[500] text-gray-20', className)}
    {...props}
  >
    {children}
  </div>
));

// HeaderRight 컴포넌트
const HeaderRight = forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props}>
    {children}
  </div>
));

Header.displayName = 'Header';
HeaderLeft.displayName = 'HeaderLeft';
HeaderCenter.displayName = 'HeaderCenter';
HeaderRight.displayName = 'HeaderRight';

export { Header, HeaderLeft, HeaderCenter, HeaderRight };
