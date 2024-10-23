import { useEffect, useState } from 'react';

const useMount = (onMount?: () => void) => {
  const [isMounted, setIsMount] = useState(false);

  useEffect(() => {
    if (onMount) {
      onMount();
    }
    setIsMount(true);
  }, [onMount]);

  return isMounted;
};

export default useMount;
