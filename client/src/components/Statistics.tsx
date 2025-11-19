import { useLayoutEffect, useRef, memo, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Code, TrendingUp, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: Camera,
    number: '500+',
    value: 500,
    suffix: '+',
    label: 'Visual Stories',
  },
  {
    icon: Code,
    number: '120+',
    value: 120,
    suffix: '+',
    label: 'Sites Built',
  },
  {
    icon: TrendingUp,
    number: '2.5M+',
    value: 2.5,
    suffix: 'M+',
    label: 'Impressions',
  },
  {
    icon: Users,
    number: '98%',
    value: 98,
    suffix: '%',
    label: 'Client Retention',
  },
];

// Memoized card component with proper tilt handling
const TiltCard = memo(({ children, className }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Only apply tilt on mouse, not touch
    if (e.pointerType !== 'mouse' || !cardRef.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </div>
  );
});

TiltCard.displayName = 'TiltCard';

// Animated Counter Component
const StatCounter = memo(({ value, suffix, index }: { value: number; suffix: string; index: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numberRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useLayoutEffect(() => {
    if (!numberRef.current || hasAnimated.current) return;

    const ctx = gsap.context(() => {
      const counter = { val: 0 };
      
      const animation = gsap.to(counter, {
        val: value,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: numberRef.current,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => {
          setDisplayValue(counter.val);
        },
        onComplete: () => {
          hasAnimated.current = true;
        },
      });

      return animation;
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === numberRef.current) {
          trigger.kill();
        }
      });
    };
  }, [value]);

  const formatNumber = (num: number) => {
    // Check if the original value has decimals
    if (value % 1 !== 0) {
      // Original value has decimals (like 2.5), preserve them
      return num.toFixed(1);
    }
    // Original value is whole number, display as integer
    return Math.floor(num);
  };

  return (
    <div
      ref={numberRef}
      className="font-title font-bold text-white mb-2 md:mb-3 text-glow-orange"
      style={{
        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
      }}
      data-testid={`text-stat-number-${index}`}
    >
      {formatNumber(displayValue)}{suffix}
    </div>
  );
});

StatCounter.displayName = 'StatCounter';

export default function Statistics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Check if we're on a device that can handle smooth animations
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.matchMedia('(max-width: 767px)').matches;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      });

      // Simpler animations on mobile or reduced motion
      const duration = prefersReducedMotion || isMobile ? 0.4 : 0.8;
      const yOffset = isMobile ? 30 : 50;

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: yOffset },
        { opacity: 1, y: 0, duration, ease: 'power3.out' }
      );

      const cards = cardsRef.current?.querySelectorAll('.floating-card');
      if (cards && cards.length > 0) {
        tl.fromTo(
          cards,
          { opacity: 0, y: isMobile ? 40 : 100, rotateX: isMobile ? 0 : -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.4'
        );
      }
    });

    return () => {
      ctx.kill(true);
    };
  }, []);

  return (
    <section ref={containerRef} className="py-12 md:py-16 lg:py-24 bg-black relative overflow-hidden">
      {/* Subtle animated gradient - Safety Orange accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/50 to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-12 md:mb-16">
          <p className="text-primary font-body text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4 opacity-80">
            By The Numbers
          </p>
          <h2 className="font-title font-bold text-white uppercase leading-tight" style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
          }}>
            Proven <span className="text-primary">Results</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <TiltCard
                key={index}
                className="floating-card perspective-container group"
              >
                <div
                  className="preserve-3d relative"
                  data-testid={`card-stat-${index}`}
                >
                  <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 transition-all duration-300 hover:border-primary/30 glow-orange-hover">
                    {/* Icon */}
                    <div className="mb-4 md:mb-6 relative">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/20 p-2.5 md:p-3 shadow-lg border border-primary/30">
                        <Icon className="w-full h-full text-primary" />
                      </div>
                      <div className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/20 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
                    </div>

                    {/* Animated Number */}
                    <StatCounter value={stat.value} suffix={stat.suffix} index={index} />

                    {/* Label */}
                    <p className="font-body text-xs md:text-sm lg:text-base text-white/60 uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
