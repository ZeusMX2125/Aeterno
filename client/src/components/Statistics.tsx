import { useLayoutEffect, useRef, memo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Code, TrendingUp, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: Camera,
    number: '500+',
    label: 'Visual Stories',
    gradient: 'from-orange-500 to-pink-500',
  },
  {
    icon: Code,
    number: '120+',
    label: 'Sites Built',
    gradient: 'from-primary to-orange-600',
  },
  {
    icon: TrendingUp,
    number: '2.5M+',
    label: 'Impressions',
    gradient: 'from-yellow-500 to-primary',
  },
  {
    icon: Users,
    number: '98%',
    label: 'Client Retention',
    gradient: 'from-primary to-red-500',
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
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-950/20 to-black" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 bg-orange-600/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 right-1/2 bg-red-500/8 rounded-full blur-3xl animate-float-slow" />
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-3" style={{
        backgroundImage: `linear-gradient(rgba(242, 122, 35, 0.05) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(242, 122, 35, 0.05) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      
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
                  <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 transition-all duration-300 hover:border-primary/30">
                    {/* Icon */}
                    <div className="mb-4 md:mb-6 relative">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${stat.gradient} p-2.5 md:p-3 shadow-lg`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <div className={`absolute inset-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`} />
                    </div>

                    {/* Number */}
                    <div 
                      className="font-title font-bold text-white mb-2 md:mb-3"
                      style={{
                        textShadow: '0 0 40px rgba(242, 122, 35, 0.3)',
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                      }}
                      data-testid={`text-stat-number-${index}`}
                    >
                      {stat.number}
                    </div>

                    {/* Label */}
                    <p className="font-body text-xs md:text-sm lg:text-base text-white/60 uppercase tracking-wide">
                      {stat.label}
                    </p>

                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
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
