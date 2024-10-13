'use client';
import { useRouter } from 'next/navigation';

function BackButton({
  className,
  children,
  path,
  onClick,
}: React.PropsWithChildren<{
  className?: string;
  path?: string;
  onClick?: () => void;
}>) {
  const router = useRouter();
  const handleClickBack = () => {
    if (path) router.push(path);
    else router.back();
  };
  return (
    <button
      className={className}
      onClick={onClick ? onClick : handleClickBack}
      type="button"
    >
      {children}
    </button>
  );
}

export default BackButton;
