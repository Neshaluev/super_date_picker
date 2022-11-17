import { useEffect, useCallback, useRef } from 'react';

export const useOutsideClick = (onClick: () => void) => {
  const ref = useRef<HTMLElement | null>(null);

  const handleClick = useCallback(
    (e) => {
      if (!ref.current) return;
      const inside = ref.current.contains(e.target);
      if (inside) {
        return;
      }

      onClick();
    },
    [onClick, ref],
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return ref;
};

export default useOutsideClick;
