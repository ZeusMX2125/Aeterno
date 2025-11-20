import { useRef, useCallback, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  padding?: number;
  magnetStrength?: number;
  className?: string;
}

export default function MagneticButton({
  children,
  padding = 100,
  magnetStrength = 0.3,
  className = '',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!buttonRef.current || prefersReducedMotion.current) return;

      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < padding) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
          const pullX = deltaX * magnetStrength;
          const pullY = deltaY * magnetStrength;

          gsap.to(button, {
            x: pullX,
            y: pullY,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      }
    },
    [padding, magnetStrength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      data-testid="magnetic-button-wrapper"
    >
      {children}
    </div>
  );
}
