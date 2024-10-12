'use client';
import { useRouter } from 'next/navigation';

function NotificationButton({
  className,
  children,
}: React.PropsWithChildren<{
  className?: string;
}>) {
  const router = useRouter();
  return (
    <button
      className={className}
      onClick={() => router.push('/notification')}
      type="button"
    >
      {children}
    </button>
  );
}

export default NotificationButton;
