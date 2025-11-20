import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FlyingPostersProps {
  posters: { image: string; title: string }[];
}

export default function FlyingPosters({ posters }: FlyingPostersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const postersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || postersRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;

      postersRef.current.forEach((poster, index) => {
        if (!poster) return;

        // Initial stacked position
        gsap.set(poster, {
          x: 0,
          y: index * 20,
          z: -index * 50,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          opacity: 1,
          scale: 1 - index * 0.05,
        });

        // Scroll-triggered flying animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: isMobile ? 0.5 : 1,
          },
        });

        // Fly outward in different directions
        const angle = (index * (360 / posters.length)) * Math.PI / 180;
        const distance = isMobile ? 200 : 400;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;

        tl.to(poster, {
          x: targetX,
          y: targetY,
          z: 100,
          rotateX: (Math.random() - 0.5) * 30,
          rotateY: (Math.random() - 0.5) * 30,
          rotateZ: (Math.random() - 0.5) * 15,
          scale: 1.2,
          opacity: 0.8,
          duration: 1,
          ease: 'power2.out',
        });
      });
    });

    return () => {
      ctx.kill(true);
    };
  }, [posters]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center perspective-[1500px]"
    >
      <div className="relative preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
        {posters.map((poster, index) => (
          <div
            key={index}
            ref={(el) => (postersRef.current[index] = el)}
            className="absolute w-64 md:w-80 h-auto preserve-3d"
            style={{
              transformStyle: 'preserve-3d',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="glass rounded-2xl overflow-hidden shadow-2xl border border-white/10 glow-orange-hover">
              <img
                src={poster.image}
                alt={poster.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 md:p-6">
                <h3 className="font-title text-lg md:text-xl font-bold text-white">
                  {poster.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
