import { useRef, useEffect } from 'react';

export function useDebounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunc = (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunc as T;
}
