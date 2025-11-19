import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Video, Image, Globe, Share2, Palette, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Camera,
    title: 'Photography',
    description: 'Professional photo shoots that capture your brand essence',
    gradient: 'from-orange-500 to-pink-500',
  },
  {
    icon: Video,
    title: 'Video Editing',
    description: 'Cinematic editing that tells compelling stories',
    gradient: 'from-primary to-red-500',
  },
  {
    icon: Image,
    title: 'Image Editing',
    description: 'Pixel-perfect retouching and enhancement',
    gradient: 'from-pink-500 to-primary',
  },
  {
    icon: Globe,
    title: 'Website Development (using Replit)',
    description: 'Custom websites built to convert visitors into customers',
    gradient: 'from-primary to-orange-600',
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Strategic content that builds engaged communities',
    gradient: 'from-yellow-500 to-primary',
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Visual identities that make lasting impressions',
    gradient: 'from-orange-600 to-pink-500',
  },
  {
    icon: FileText,
    title: 'Copywriting',
    description: 'Words that persuade, inform, and convert',
    gradient: 'from-red-500 to-primary',
  },
];

export default function OtherCapabilities() {
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
          { opacity: 0, y: 80, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.08,
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
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

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
    <section ref={containerRef} className="py-16 md:py-24 bg-black relative overflow-hidden" data-testid="section-capabilities">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/25 to-black" />
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/5 bg-orange-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/5 bg-primary/10 rounded-full blur-3xl animate-float-delayed" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div ref={headlineRef} className="text-center mb-12 md:mb-16">
          <p className="text-primary font-body text-sm uppercase tracking-wider mb-3">
            SERVICES
          </p>
          <h2
            className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-tight"
            data-testid="text-capabilities-headline"
          >
            What We <span className="text-primary">Do Best</span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="floating-card perspective-container group"
                onMouseMove={handleCardTilt}
                onMouseLeave={handleCardReset}
              >
                <div
                  className="preserve-3d relative"
                  data-testid={`card-service-${index}`}
                >
                  <div className="glass rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:border-primary/30 h-full">
                    <div className="flex flex-col gap-4">
                      <div className="relative">
                        <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`} />
                      </div>
                      
                      <div>
                        <h3 className="font-title text-lg md:text-xl font-bold text-white mb-2 uppercase">
                          {service.title}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
