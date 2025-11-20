import { useEffect, useState, RefObject } from 'react';

/**
 * Hook to pause WebGL rendering when component is not in viewport
 * Prevents WebGL context loss by reducing active contexts
 * 
 * @param ref - Ref to the container element to observe
 * @param rootMargin - Margin around viewport to start/stop rendering (default: 200px)
 * @returns boolean - true if component should be paused
 */
export function useIntersectionPause(
  ref: RefObject<HTMLElement>,
  rootMargin: string = '200px'
): boolean {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Pause when NOT intersecting (out of viewport)
        setIsPaused(!entry.isIntersecting);
      },
      {
        rootMargin, // Load/unload slightly before entering viewport
        threshold: 0, // Trigger as soon as any pixel is visible
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return isPaused;
}
