'use client';

import { useCallback, useState } from 'react';

const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const onOpenChange = useCallback(
    (nowOpen: boolean) => setIsOpen(nowOpen),
    [],
  );

  return { isOpen, onOpen, onClose, onToggle, setIsOpen, onOpenChange };
};

export default useDisclosure;
