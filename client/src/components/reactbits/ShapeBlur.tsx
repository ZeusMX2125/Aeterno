import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ShapeBlurProps {
  color?: string;
  intensity?: number;
  speed?: number;
}

export default function ShapeBlur({ 
  color = '#FF4500', 
  intensity = 0.6,
  speed = 2
}: ShapeBlurProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create gradient blobs
    const blobs = [
      { x: 0.3, y: 0.4, radius: 0.3, speed: 1, offset: 0 },
      { x: 0.7, y: 0.6, radius: 0.25, speed: -0.8, offset: Math.PI },
      { x: 0.5, y: 0.3, radius: 0.2, speed: 0.6, offset: Math.PI * 0.5 },
    ];

    const animate = () => {
      timeRef.current += 0.01 * speed;
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Apply blur for morphing effect
      ctx.filter = `blur(${80 * intensity}px)`;

      blobs.forEach(blob => {
        const x = canvas.width * (blob.x + Math.sin(timeRef.current * blob.speed + blob.offset) * 0.1);
        const y = canvas.height * (blob.y + Math.cos(timeRef.current * blob.speed + blob.offset) * 0.1);
        const radius = Math.min(canvas.width, canvas.height) * blob.radius;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(255, 69, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.filter = 'none';

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, intensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.3 }}
    />
  );
}
