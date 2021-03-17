import { useLayoutEffect, useState } from 'react';

export default function useWindowSize() {
  const initialValue = typeof window !== 'undefined' ? [window.innerWidth, window.innerHeight] : [0, 0];
  const [size, setSize] = useState(initialValue);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
