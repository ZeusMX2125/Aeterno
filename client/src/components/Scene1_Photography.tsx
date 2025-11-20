import { useLayoutEffect, useRef, useState, useCallback, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Camera, Video, Image as ImageIcon, Film, Aperture, Clapperboard } from 'lucide-react';
// @ts-ignore - WebGL component without TypeScript definitions
import GradientBlinds from './backgrounds/GradientBlinds';
import ShinyText from './animations/ShinyText';

gsap.registerPlugin(ScrollTrigger);

interface Scene1Props {
  openModal: (service: string) => void;
}

const mediaCards = [
  { 
    type: 'photo', 
    icon: Camera, 
    depth: 60,
    label: 'Product Photography'
  },
  { 
    type: 'video', 
    icon: Film, 
    depth: 40,
    label: 'Brand Videos'
  },
  { 
    type: 'photo', 
    icon: Aperture, 
    depth: 80,
    label: 'Lifestyle Shots'
  },
  { 
    type: 'video', 
    icon: Clapperboard, 
    depth: 30,
    label: 'Social Content'
  },
  { 
    type: 'photo', 
    icon: ImageIcon, 
    depth: 50,
    label: 'Event Coverage'
  },
  { 
    type: 'photo', 
    icon: Camera, 
    depth: 70,
    label: 'Portrait Sessions'
  },
];

const MediaCard = memo(({ card, index }: { card: typeof mediaCards[0]; index: number }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const Icon = card.icon;

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Only apply tilt on mouse, not touch
    if (e.pointerType !== 'mouse' || !cardRef.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      
      const cardEl = cardRef.current;
      const rect = cardEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      setRotation({ x: rotateX, y: rotateY });
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setRotation({ x: 0, y: 0 });
  }, []);

  return (
    <div 
      ref={cardRef}
      className="media-card perspective-container"
      data-index={index}
    >
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative preserve-3d transition-all duration-300 hover:scale-105 group cursor-pointer"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(${card.depth}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glassmorphic Card */}
        <div className="aspect-[4/5] glass rounded-2xl overflow-hidden shadow-2xl relative glow-orange-hover">
          {/* Icon */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center mb-3 md:mb-4 border border-white/10">
              <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1.5} />
            </div>
            <p className="text-white font-body text-xs md:text-sm font-medium px-4 text-center">
              {card.label}
            </p>
          </div>

          {/* Play button for videos */}
          {card.type === 'video' && (
            <div className="absolute top-3 right-3 md:top-4 md:right-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-primary/30 transition-all">
                <Play className="w-4 h-4 md:w-5 md:h-5 text-white fill-white ml-0.5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

MediaCard.displayName = 'MediaCard';

export default function Scene1_Photography({ openModal }: Scene1Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: isMobile ? '+=100%' : '+=150%',
          pin: !isMobile, // Disable pinning on mobile
          scrub: 1,
        },
      });

      // Animate headline
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: isMobile ? 20 : 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
        }
      );

      // Stagger cards animation
      const cards = containerRef.current?.querySelectorAll('.media-card');
      if (cards && cards.length > 0) {
        tl.fromTo(
          cards,
          { 
            opacity: 0, 
            y: isMobile ? 40 : 100,
            scale: isMobile ? 0.95 : 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: isMobile ? 0.4 : 0.5,
            stagger: 0.08,
            ease: 'power2.out',
          },
          0.15
        );
      }
    });

    return () => {
      ctx.kill(true);
    };
  }, []);

  return (
    <section
      id="scene-photography"
      ref={containerRef}
      className="min-h-[100svh] w-full relative overflow-hidden bg-black flex items-center justify-center"
      data-testid="section-photography"
    >
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0">
        <GradientBlinds 
          blindCount={10} 
          gradientColors={['#000000', '#050505', '#220a00']} 
          noise={0.5}
          mouseDampening={0.05}
          spotlightOpacity={2}
          spotlightRadius={0.7}
        />
      </div>
      
      {/* Subtle animated gradient - Safety Orange accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950/50 to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 section-spacing">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-8 md:mb-12 lg:mb-16">
          <p className="text-primary font-body text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-3 opacity-80">
            Visual Storytelling
          </p>
          <h2
            data-testid="text-photography-headline"
            className="font-title font-bold text-white mb-4 md:mb-6 uppercase leading-tight"
            style={{
              fontSize: 'clamp(2rem, 8vw, 4rem)',
            }}
          >
            It all starts with the <span className="text-primary">perfect capture</span>
          </h2>
          <p
            className="font-body text-white/60 mb-6 md:mb-8 max-w-2xl mx-auto"
            data-testid="text-photography-subheadline"
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.125rem)',
            }}
          >
            <ShinyText 
              text="From stunning photography to cinematic video, we create the visual content that defines your brand."
              speed={10}
              className="inline-block"
            />
          </p>
          <button
            onClick={() => openModal('Photography')}
            className="bg-primary text-white font-body font-semibold px-8 py-3.5 rounded-xl glow-orange hover:glow-orange-strong transition-all hover:scale-105 active:scale-95 min-h-[44px]"
            data-testid="button-quote-visuals"
            style={{
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            }}
          >
            View Our Work
          </button>
        </div>

        {/* Floating Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {mediaCards.map((card, index) => (
            <MediaCard key={index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
