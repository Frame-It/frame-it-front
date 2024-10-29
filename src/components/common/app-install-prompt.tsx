'use client';

import { useEffect, useCallback } from 'react';
import { usePwaContext } from '@/providers/pwa-provider';
import MobileInstallPrompt from './mobile-install-prompt';

export default function AppInstallPrompt() {
  const {
    deferredPrompt,
    isDeviceIOS,
    setDeferredPrompt,
    isPromptDismissed,
    dismissPrompt,
  } = usePwaContext();

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

  return (
    <>
      {deferredPrompt || !isPromptDismissed ? (
        <MobileInstallPrompt
          handleInstallClick={handleInstallClick}
          handleCancelClick={dismissPrompt}
          platform={isDeviceIOS ? 'ios' : 'android'}
        />
      ) : null}
    </>
  );
}
