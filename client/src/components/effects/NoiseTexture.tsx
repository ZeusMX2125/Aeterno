import { useEffect, useRef, useState } from 'react';

interface NoiseTextureProps {
  opacity?: number;
  className?: string;
}

export default function NoiseTexture({
  opacity = 0.03,
  className = '',
}: NoiseTextureProps) {
  const [noiseUrl, setNoiseUrl] = useState<string>('');
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 200;

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const buffer = new Uint32Array(imageData.data.buffer);

    for (let i = 0; i < buffer.length; i++) {
      const gray = Math.random() * 255;
      buffer[i] = (255 << 24) | (gray << 16) | (gray << 8) | gray;
    }

    ctx.putImageData(imageData, 0, 0);
    setNoiseUrl(canvas.toDataURL());
  }, []);

  useEffect(() => {
    const noiseElement = document.querySelector('.noise-texture') as HTMLElement;
    if (!noiseElement) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If user prefers reduced motion, skip animation but keep static noise
    if (prefersReducedMotion) {
      return;
    }

    let position = 0;
    const animate = () => {
      position += 0.5;
      if (position >= 200) position = 0;
      
      noiseElement.style.backgroundPosition = `${position}px ${position}px`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [noiseUrl]);

  if (!noiseUrl) return null;

  return (
    <div
      className={`noise-texture pointer-events-none ${className}`}
      data-testid="noise-texture-overlay"
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        backgroundImage: `url(${noiseUrl})`,
        backgroundRepeat: 'repeat',
        zIndex: 1,
        mixBlendMode: 'overlay',
      }}
    />
  );
}
