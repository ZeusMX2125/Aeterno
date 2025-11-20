import { useEffect, useRef } from 'react';

interface FluidGlassProps {
  intensity?: number;
}

export default function FluidGlass({ intensity = 0.5 }: FluidGlassProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX / window.innerWidth;
      targetRef.current.y = e.clientY / window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrame: number;

    const animate = () => {
      // Smooth mouse tracking
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create distortion gradient following mouse
      const gradient = ctx.createRadialGradient(
        canvas.width * mouseRef.current.x,
        canvas.height * mouseRef.current.y,
        0,
        canvas.width * mouseRef.current.x,
        canvas.height * mouseRef.current.y,
        canvas.width * 0.4
      );

      gradient.addColorStop(0, `rgba(255, 69, 0, ${0.15 * intensity})`);
      gradient.addColorStop(0.5, `rgba(255, 69, 0, ${0.05 * intensity})`);
      gradient.addColorStop(1, 'rgba(255, 69, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ backdropFilter: 'blur(100px)' }}
    />
  );
}
