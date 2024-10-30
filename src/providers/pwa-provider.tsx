'use client';

import { BeforeInstallPromptEvent } from '@/types/window';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface PwaContextProps {
  deferredPrompt: BeforeInstallPromptEvent | null;
  setDeferredPrompt: React.Dispatch<
    React.SetStateAction<BeforeInstallPromptEvent | null>
  >;
  isDeviceIOS: boolean;
  isPromptDismissed: boolean;
  dismissPrompt: () => void;
}

const PwaContext = createContext<PwaContextProps | undefined>(undefined);

export const usePwaContext = () => {
  const context = useContext(PwaContext);
  if (!context) {
    throw new Error('usePwaContext must be used within a PwaProvider');
  }
  return context;
};

export const PwaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isDeviceIOS, setIsDeviceIOS] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    setIsDeviceIOS(
      /iPad|iPhone|iPod|Macintosh/.test(userAgent) && 'ontouchend' in document,
    );
  }, []);

  const [isPromptDismissed, setIsPromptDismissed] = useState<boolean>(() => {
    return (
      typeof window !== 'undefined' &&
      localStorage.getItem('pwaPromptDismissed') === 'true'
    );
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const dismissPrompt = () => {
    localStorage.setItem('pwaPromptDismissed', 'true');
    setIsPromptDismissed(true);
  };

  return (
    <PwaContext.Provider
      value={{
        deferredPrompt,
        setDeferredPrompt,
        isDeviceIOS,
        isPromptDismissed,
        dismissPrompt,
      }}
    >
      {children}
    </PwaContext.Provider>
  );
};
