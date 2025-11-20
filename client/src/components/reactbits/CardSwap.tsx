import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardSwapItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface CardSwapProps {
  items: CardSwapItem[];
}

export default function CardSwap({ items }: CardSwapProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stack all cards with depth
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const isActive = index === currentIndex;
      const isBehind = index < currentIndex;
      const offset = isBehind ? -1 : index - currentIndex;

      gsap.to(card, {
        x: isActive ? 0 : offset * 20,
        y: isActive ? 0 : offset * 20,
        z: isActive ? 0 : -offset * 50,
        scale: isActive ? 1 : 1 - Math.abs(offset) * 0.1,
        opacity: isActive ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.2),
        rotateY: isActive ? 0 : offset * 5,
        duration: 0.6,
        ease: 'power3.out',
        zIndex: items.length - Math.abs(offset),
      });
    });
  }, [currentIndex, items.length]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div
        ref={containerRef}
        className="relative h-[400px] md:h-[500px] flex items-center justify-center perspective-[1500px]"
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="absolute w-full max-w-sm md:max-w-md preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl glow-orange-hover">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <h3 className="font-title text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                    {item.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-all"
          data-testid="button-prev-card"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary w-8' : 'bg-white/30'
              }`}
              data-testid={`button-indicator-${index}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-all"
          data-testid="button-next-card"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
