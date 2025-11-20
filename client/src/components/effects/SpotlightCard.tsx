import { useRef, useCallback, useEffect, useState, ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  spotlightColor?: string;
  className?: string;
}

export default function SpotlightCard({
  children,
  spotlightColor = 'rgba(255, 69, 0, 0.15)',
  className = '',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number>();
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice.current || !cardRef.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice.current) {
      setIsHovered(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card-wrapper ${className}`}
      data-testid="spotlight-card-wrapper"
      style={{
        position: 'relative',
        ...(isHovered && !isTouchDevice.current
          ? {
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 40%)`,
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
}
