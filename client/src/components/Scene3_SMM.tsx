import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import phoneMockup from '@assets/generated_images/Phone_Instagram_mockup_657ad6c9.png';
import { Heart, MessageCircle, Share2, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Scene3Props {
  openModal: (service: string) => void;
}

export default function Scene3_SMM({ openModal }: Scene3Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      const cards = cardsRef.current?.querySelectorAll('.floating-card');
      if (cards) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 100, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.4'
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleCardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleCardReset = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full relative overflow-hidden bg-black flex items-center justify-center py-16 md:py-24"
      data-testid="section-smm"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-bl from-black via-pink-950/30 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tr from-red-950/20 via-transparent to-orange-950/20" />
      
      {/* Moving gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-float-slow" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-12 md:mb-16">
          <p className="text-primary font-body text-sm uppercase tracking-wider mb-3">
            Social Media Marketing
          </p>
          <h2 className="font-title text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase leading-tight mb-4">
            Then, we <span className="text-primary">tell the world</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We turn your assets into a community. Strategic SMM that grows your audience.
          </p>
        </div>

        {/* Floating Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1: Phone Mockup */}
          <div
            className="floating-card perspective-container group"
            onMouseMove={handleCardTilt}
            onMouseLeave={handleCardReset}
          >
            <div className="preserve-3d relative glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/30">
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center p-6">
                <img
                  src={phoneMockup}
                  alt="Phone Instagram Mockup"
                  className="w-auto h-full object-contain drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(242, 122, 35, 0.2))' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-title text-xl font-bold text-white mb-2">
                    Mobile-First Content
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Optimized for where your audience is
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Engagement Growth */}
          <div
            className="floating-card perspective-container group"
            onMouseMove={handleCardTilt}
            onMouseLeave={handleCardReset}
          >
            <div className="preserve-3d relative glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/30">
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-pink-950/40 to-purple-950/40 flex flex-col items-center justify-center p-8">
                <TrendingUp className="w-20 h-20 text-primary mb-4" strokeWidth={1.5} />
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-4">
                    <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                    <MessageCircle className="w-8 h-8 text-blue-500" />
                    <Share2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-title text-xl font-bold text-white">
                    Drive Engagement
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Turn followers into customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Strategic Content */}
          <div
            className="floating-card perspective-container group"
            onMouseMove={handleCardTilt}
            onMouseLeave={handleCardReset}
          >
            <div className="preserve-3d relative glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/30">
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-orange-950/40 to-red-950/40 flex flex-col items-center justify-center p-8 text-center">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 bg-primary/20 rounded-lg border border-primary/30"
                    />
                  ))}
                </div>
                <h3 className="font-title text-xl font-bold text-white mb-2">
                  Strategic Planning
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  Consistent, on-brand content calendar
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => openModal('Social Media Marketing')}
            className="bg-primary text-white font-body font-semibold text-base md:text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 hover-elevate active-elevate-2"
            data-testid="button-quote-socials"
            style={{ boxShadow: '0 0 30px rgba(242, 122, 35, 0.3)' }}
          >
            Get a Quote for Socials
          </button>
        </div>
      </div>
    </section>
  );
}
