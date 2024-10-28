'use client';

import { toast } from '../ui/use-toast';

function ShareButton({
  className,
  children,
}: React.PropsWithChildren<{
  className?: string;
}>) {
  return (
    <button
      className={className}
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: '공유 링크가 복사되었어요!',
          duration: 1300,
        });
      }}
      type="button"
    >
      {children}
    </button>
  );
}

export default ShareButton;
