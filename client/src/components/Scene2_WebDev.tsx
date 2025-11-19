import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import laptopMockup from '@assets/generated_images/Laptop_mockup_device_5ea35f15.png';
import wireframeImage from '@assets/generated_images/Wireframe_design_sketch_da0c3a05.png';
import finalDesignImage from '@assets/generated_images/Final_website_design_03e22cfd.png';

gsap.registerPlugin(ScrollTrigger);

interface Scene2Props {
  openModal: (service: string) => void;
}

export default function Scene2_WebDev({ openModal }: Scene2Props) {
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
      data-testid="section-webdev"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-orange-950/30 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tl from-red-950/20 via-transparent to-primary/10" />
      
      {/* Moving gradient orbs */}
      <div className="absolute top-1/3 right-1/4 bg-orange-500/15 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 left-1/4 bg-primary/15 rounded-full blur-3xl animate-float-delayed" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-12 md:mb-16">
          <p className="text-primary font-body text-sm uppercase tracking-wider mb-3">
            Website Development
          </p>
          <h2 className="font-title text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase leading-tight mb-4">
            We build your brand's <span className="text-primary">digital home</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A stunning website is your #1 salesperson. We build experiences that convert.
          </p>
        </div>

        {/* Floating Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1: Wireframe to Final */}
          <div
            className="floating-card perspective-container group"
            onMouseMove={handleCardTilt}
            onMouseLeave={handleCardReset}
          >
            <div className="preserve-3d relative glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/30">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={wireframeImage}
                  alt="Wireframe Design"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-title text-xl font-bold text-white mb-2">
                    Strategic Planning
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    From wireframes to pixel-perfect designs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Laptop Mockup */}
          <div
            className="floating-card perspective-container group"
            onMouseMove={handleCardTilt}
            onMouseLeave={handleCardReset}
          >
            <div className="preserve-3d relative glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/30">
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center p-8">
                <img
                  src={laptopMockup}
                  alt="Laptop Mockup"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(242, 122, 35, 0.2))' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-title text-xl font-bold text-white mb-2">
                    Responsive Design
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Beautiful on every device
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Final Design */}
          <div
            className="floating-card perspective-container group"
            onMouseMove={handleCardTilt}
            onMouseLeave={handleCardReset}
          >
            <div className="preserve-3d relative glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/30">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={finalDesignImage}
                  alt="Final Website Design"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-title text-xl font-bold text-white mb-2">
                    Polished & Professional
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Built on Replit for speed & reliability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => openModal('Website Development (using Replit)')}
            className="bg-primary text-white font-body font-semibold text-base md:text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 hover-elevate active-elevate-2"
            data-testid="button-quote-website"
            style={{ boxShadow: '0 0 30px rgba(242, 122, 35, 0.3)' }}
          >
            Get a Quote for a Website
          </button>
        </div>
      </div>
    </section>
  );
}
