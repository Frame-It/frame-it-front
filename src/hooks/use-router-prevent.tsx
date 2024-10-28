import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

export const usePreventNavigation = (
  isDirty: boolean,
  message: string,
  onAfterPage?: () => void,
) => {
  const router = useRouter();
  const isClickedFirst = useRef(false);

  const beforeUnloadHandler = useCallback(
    (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = true;
      }
    },
    [isDirty],
  );

  const handlePopState = useCallback(() => {
    if (isDirty && !confirm(message)) {
      history.pushState(null, '', '');
      return;
    }

    if (onAfterPage) {
      onAfterPage();
    }
    history.back();
  }, [isDirty, message]);

  useEffect(() => {
    const originalPush = router.push;
    const newPush = (
      href: string,
      options?: Parameters<typeof router.push>[1],
    ): void => {
      if (isDirty && href === '/' && !confirm(message)) {
        return;
      }

      originalPush(href, options);
    };

    router.push = newPush;
    window.onbeforeunload = beforeUnloadHandler;

    return () => {
      router.push = originalPush;
      window.onbeforeunload = null;
    };
  }, [isDirty, router, beforeUnloadHandler, message]);

  useEffect(() => {
    if (!isClickedFirst.current) {
      history.pushState(null, '', '');
      isClickedFirst.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);
};
