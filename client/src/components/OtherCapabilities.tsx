import { useLayoutEffect, useRef, memo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Video, Image, Globe, Share2, Palette, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Camera,
    title: 'Photography',
    description: 'Professional photo shoots that capture your brand essence',
  },
  {
    icon: Video,
    title: 'Video Editing',
    description: 'Cinematic editing that tells compelling stories',
  },
  {
    icon: Image,
    title: 'Image Editing',
    description: 'Pixel-perfect retouching and enhancement',
  },
  {
    icon: Globe,
    title: 'Website Development (using Replit)',
    description: 'Custom websites built to convert visitors into customers',
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Strategic content that builds engaged communities',
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Visual identities that make lasting impressions',
  },
  {
    icon: FileText,
    title: 'Copywriting',
    description: 'Words that persuade, inform, and convert',
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

export default function OtherCapabilities() {
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
      const duration = prefersReducedMotion || isMobile ? 0.4 : 0.6;
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
          { opacity: 0, y: isMobile ? 30 : 80, rotateX: isMobile ? 0 : -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration,
            stagger: 0.08,
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
    <section ref={containerRef} className="py-12 md:py-16 lg:py-24 bg-black relative overflow-hidden" data-testid="section-capabilities">
      {/* Subtle animated gradient - Safety Orange accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/50 to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 left-1/5 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/5 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div ref={headlineRef} className="text-center mb-8 md:mb-12 lg:mb-16">
          <p className="text-primary font-body text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-3">
            SERVICES
          </p>
          <h2
            className="font-title font-bold text-white uppercase leading-tight"
            data-testid="text-capabilities-headline"
            style={{
              fontSize: 'clamp(2rem, 8vw, 4rem)',
            }}
          >
            What We <span className="text-primary">Do Best</span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <TiltCard
                key={index}
                className="floating-card perspective-container group"
              >
                <div
                  className="preserve-3d relative"
                  data-testid={`card-service-${index}`}
                >
                  <div className="glass rounded-2xl p-5 md:p-6 border border-white/10 transition-all duration-300 hover:border-primary/30 glow-orange-hover h-full">
                    <div className="flex flex-col gap-3 md:gap-4">
                      <div className="relative">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-xl flex items-center justify-center shadow-lg border border-primary/30">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                        </div>
                        <div className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/20 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
                      </div>
                      
                      <div>
                        <h3 className="font-title text-base md:text-lg lg:text-xl font-bold text-white mb-1.5 md:mb-2 uppercase">
                          {service.title}
                        </h3>
                        <p className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
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
