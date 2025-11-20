import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CircularGalleryItem {
  image?: string;
  icon: React.ComponentType<any>;
  label: string;
}

interface CircularGalleryProps {
  items: CircularGalleryItem[];
  radius?: number;
}

export default function CircularGallery({ items, radius = 300 }: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const angleStep = 360 / items.length;

    // Position items in a circle
    items.forEach((_, index) => {
      const card = containerRef.current?.querySelector(`[data-index="${index}"]`) as HTMLElement;
      if (!card) return;

      const angle = (angleStep * index) * Math.PI / 180;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const rotateY = -angleStep * index;

      gsap.set(card, {
        x,
        z,
        rotateY,
        transformStyle: 'preserve-3d',
      });
    });

    // Auto-rotate on scroll or mouse drag
    let autoRotate: number;
    
    if (!isMobile) {
      autoRotate = gsap.to(containerRef.current, {
        rotationY: '+=360',
        duration: 20,
        ease: 'none',
        repeat: -1,
        onUpdate() {
          setCurrentRotation(gsap.getProperty(containerRef.current!, 'rotationY') as number);
        }
      }).totalTime();
    }

    return () => {
      if (autoRotate) gsap.killTweensOf(containerRef.current);
    };
  }, [items, radius]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const deltaX = e.clientX - lastX.current;
    lastX.current = e.clientX;

    const newRotation = currentRotation + deltaX * 0.5;
    gsap.to(containerRef.current, {
      rotationY: newRotation,
      duration: 0.3,
      ease: 'power2.out',
    });
    setCurrentRotation(newRotation);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div 
      className="w-full h-[500px] md:h-[600px] flex items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        ref={containerRef}
        className="relative preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              data-index={index}
              className="absolute w-48 h-64 md:w-56 md:h-72"
              style={{
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="w-full h-full glass rounded-2xl overflow-hidden shadow-2xl border border-white/10 glow-orange-hover">
                {item.image ? (
                  <>
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                      <div className="flex items-center gap-2 justify-center">
                        <Icon className="w-5 h-5 text-primary" strokeWidth={2} />
                        <p className="text-white font-body text-sm font-semibold text-center">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/10">
                      <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                    </div>
                    <p className="text-white font-body text-sm font-medium text-center">
                      {item.label}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
