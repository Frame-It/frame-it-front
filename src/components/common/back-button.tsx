'use client';
import { useRouter } from 'next/navigation';

function BackButton({
  className,
  children,
  path,
}: React.PropsWithChildren<{
  className?: string;
  path?: string;
}>) {
  const router = useRouter();
  const handleClickBack = () => {
    if (path) router.push(path);
    else router.back();
  };
  return (
    <button className={className} onClick={handleClickBack} type="button">
      {children}
    </button>
  );
}

export default BackButton;
