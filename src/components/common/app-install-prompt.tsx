'use client';

import { useEffect, useCallback, useState } from 'react';
import { usePwaContext } from '@/providers/pwa-provider';
import MobileInstallPrompt from './mobile-install-prompt';
import { usePathname } from 'next/navigation';

export default function AppInstallPrompt() {
  const {
    deferredPrompt,
    isDeviceIOS,
    setDeferredPrompt,
    isPromptDismissed,
    dismissPrompt,
  } = usePwaContext();

  const [tempShow, setTempShow] = useState(true);
  const pathname = usePathname();

  const handleInstallClick = useCallback(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          //   console.log('User accepted the A2HS prompt');
        } else {
          //   console.log('User dismissed the A2HS prompt');
        }
      });
    }
  }, [deferredPrompt]);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallClick);
    };
  }, [handleInstallClick, setDeferredPrompt]);

  useEffect(() => {
    setTempShow(true);
  }, [pathname]);

  const notShowForever = !isPromptDismissed;

  return (
    <>
      {notShowForever ? (
        <>
          {tempShow ? (
            <MobileInstallPrompt
              handleInstallClick={handleInstallClick}
              handleCancelClick={() => setTempShow(false)}
              handleCancelForever={() => dismissPrompt()}
              platform={isDeviceIOS ? 'ios' : 'android'}
            />
          ) : null}
        </>
      ) : null}
    </>
  );
}
