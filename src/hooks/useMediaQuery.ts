import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {};
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onStoreChange);
      return () => mediaQueryList.removeEventListener('change', onStoreChange);
    },
    () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false),
    () => false
  );
}

export function useIsTouchDevice(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {};
      const mql = window.matchMedia('(hover: none) and (pointer: coarse)');
      mql.addEventListener('change', onStoreChange);
      window.addEventListener('resize', onStoreChange);
      return () => {
        mql.removeEventListener('change', onStoreChange);
        window.removeEventListener('resize', onStoreChange);
      };
    },
    () => {
      if (typeof window === 'undefined') return false;
      return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    },
    () => false
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
