import { useLayoutEffect, useRef, memo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import phoneMockup from '@assets/generated_images/Phone_Instagram_mockup_657ad6c9.png';
import { Heart, MessageCircle, Share2, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Scene3Props {
  openModal: (service: string) => void;
}

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

export default function Scene3_SMM({ openModal }: Scene3Props) {
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
            stagger: 0.15,
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
    <section
      ref={containerRef}
      className="min-h-[100svh] w-full relative overflow-hidden bg-black flex items-center justify-center py-12 md:py-16 lg:py-24"
      data-testid="section-smm"
    >
      {/* Subtle animated gradient - Safety Orange accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950/50 to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/3 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/3 bg-primary/5 rounded-full blur-3xl animate-float-slow" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-8 md:mb-12 lg:mb-16">
          <p className="text-primary font-body text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-3">
            Social Media Marketing
          </p>
          <h2 className="font-title font-bold text-white uppercase leading-tight mb-3 md:mb-4" style={{
            fontSize: 'clamp(2rem, 8vw, 4.5rem)',
          }}>
            Then, we <span className="text-primary">tell the world</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-3xl mx-auto" style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
          }}>
            We turn your assets into a community. Strategic SMM that grows your audience.
          </p>
        </div>

        {/* Floating Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Card 1: Phone Mockup */}
          <TiltCard className="floating-card perspective-container group">
            <div className="preserve-3d relative glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/30">
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center p-4 md:p-6">
                <img
                  src={phoneMockup}
                  alt="Phone Instagram Mockup"
                  className="w-auto h-full object-contain drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(255, 69, 0, 0.2))' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-title text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                    Mobile-First Content
                  </h3>
                  <p className="font-body text-xs md:text-sm text-muted-foreground">
                    Optimized for where your audience is
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Card 2: Engagement Growth */}
          <TiltCard className="floating-card perspective-container group">
            <div className="preserve-3d relative glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/30">
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex flex-col items-center justify-center p-6 md:p-8">
                <TrendingUp className="w-16 h-16 md:w-20 md:h-20 text-primary mb-3 md:mb-4" strokeWidth={1.5} />
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-3 md:gap-4">
                    <Heart className="w-6 h-6 md:w-8 md:h-8 text-pink-500" fill="currentColor" />
                    <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
                    <Share2 className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                  </div>
                  <h3 className="font-title text-lg md:text-xl font-bold text-white">
                    Drive Engagement
                  </h3>
                  <p className="font-body text-xs md:text-sm text-muted-foreground">
                    Turn followers into customers
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Card 3: Strategic Content */}
          <TiltCard className="floating-card perspective-container group">
            <div className="preserve-3d relative glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/30">
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex flex-col items-center justify-center p-6 md:p-8 text-center">
                <div className="grid grid-cols-3 gap-1.5 md:gap-2 mb-3 md:mb-4">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-lg border border-primary/30"
                    />
                  ))}
                </div>
                <h3 className="font-title text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                  Strategic Planning
                </h3>
                <p className="font-body text-xs md:text-sm text-muted-foreground">
                  Consistent, on-brand content calendar
                </p>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-12">
          <button
            onClick={() => openModal('Social Media Marketing')}
            className="bg-primary text-white font-body font-semibold px-8 py-4 rounded-xl glow-orange hover:glow-orange-strong transition-all hover:scale-105 active:scale-95 min-h-[44px]"
            data-testid="button-quote-socials"
            style={{ 
              fontSize: 'clamp(0.9rem, 2vw, 1.125rem)',
            }}
          >
            View Our Marketing Results
          </button>
        </div>
      </div>
    </section>
  );
}
