import { useLayoutEffect, useRef, memo, useCallback } from 'react';
import { Link } from 'wouter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import laptopMockup from '@assets/generated_images/Laptop_mockup_device_5ea35f15.png';
import wireframeImage from '@assets/generated_images/Wireframe_design_sketch_da0c3a05.png';
import finalDesignImage from '@assets/generated_images/Final_website_design_03e22cfd.png';
import ShinyText from './animations/ShinyText';
import TextType from './animations/TextType';
import NoiseTexture from '@/components/effects/NoiseTexture';

gsap.registerPlugin(ScrollTrigger);

interface Scene2Props {
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

export default function Scene2_WebDev({ openModal }: Scene2Props) {
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
          '-=0.3'
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
      className="min-h-[100svh] w-full relative z-10 overflow-hidden flex items-center justify-center section-spacing"
      data-testid="section-webdev"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)',
      }}
    >
      {/* Dark Glass Effect Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/40 via-transparent to-black/40" />
      <div className="absolute inset-0 z-10 opacity-30">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-8 md:mb-12 lg:mb-16">
          <p className="text-primary font-body text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-3">
            Website Development
          </p>
          <h2 
            className="font-title font-bold text-white uppercase leading-tight mb-3 md:mb-4"
            style={{
              fontSize: 'clamp(2rem, 8vw, 4.5rem)',
            }}
          >
            We build your brand's <TextType
              text={['digital home', 'online presence', 'web experience', 'digital foundation']}
              as="span"
              className="text-primary inline-block"
              typingSpeed={100}
              deletingSpeed={50}
              pauseDuration={2000}
              loop={true}
            />
          </h2>
          <p className="font-body text-muted-foreground max-w-3xl mx-auto" style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
          }}>
            <ShinyText 
              text="A stunning website is your #1 salesperson. We build experiences that convert."
              speed={10}
              className="inline-block"
            />
          </p>
        </div>

        {/* Floating Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Card 1: Wireframe to Final */}
          <TiltCard className="floating-card perspective-container group">
            <div className="preserve-3d relative glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/30 glow-orange-hover">
              <NoiseTexture opacity={0.02} />
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={wireframeImage}
                  alt="Wireframe Design"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-title text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                    Strategic Planning
                  </h3>
                  <p className="font-body text-xs md:text-sm text-muted-foreground">
                    From wireframes to pixel-perfect designs
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Card 2: Laptop Mockup */}
          <TiltCard className="floating-card perspective-container group">
            <div className="preserve-3d relative glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/30 glow-orange-hover">
              <NoiseTexture opacity={0.02} />
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center p-6 md:p-8">
                <img
                  src={laptopMockup}
                  alt="Laptop Mockup"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(255, 69, 0, 0.2))' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-title text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                    Performance First Development
                  </h3>
                  <p className="font-body text-xs md:text-sm text-muted-foreground">
                    Lightning-fast load times, optimized for conversion
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Card 3: Final Design */}
          <TiltCard className="floating-card perspective-container group">
            <div className="preserve-3d relative glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/30 glow-orange-hover">
              <NoiseTexture opacity={0.02} />
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={finalDesignImage}
                  alt="Final Website Design"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-title text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                    Conversion Focused Design
                  </h3>
                  <p className="font-body text-xs md:text-sm text-muted-foreground">
                    Every element designed to turn visitors into customers
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-12">
          <Link href="/web-development">
            <button
              className="bg-white/5 backdrop-blur-md text-white font-body font-semibold px-8 py-4 rounded-xl border border-white/10 hover:border-primary/50 transition-all hover:scale-105 active:scale-95 min-h-[44px] hover-elevate"
              data-testid="button-learn-more-webdev"
              style={{ 
                fontSize: 'clamp(0.9rem, 2vw, 1.125rem)',
              }}
            >
              View Details
            </button>
          </Link>
          <button
            onClick={() => openModal('Website Development (using Replit)')}
            className="bg-primary text-white font-body font-semibold px-8 py-4 rounded-xl glow-orange hover:glow-orange-strong transition-all hover:scale-105 active:scale-95 min-h-[44px]"
            data-testid="button-quote-webdev"
            style={{ 
              fontSize: 'clamp(0.9rem, 2vw, 1.125rem)',
            }}
          >
            Get Quote
          </button>
        </div>
      </div>
    </section>
  );
}
