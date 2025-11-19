import { useEffect, useRef, useState, MouseEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Camera, Video, Image as ImageIcon, Film, Aperture, Clapperboard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Scene1Props {
  openModal: (service: string) => void;
}

const mediaCards = [
  { 
    type: 'photo', 
    gradient: 'from-purple-600 via-pink-500 to-rose-500', 
    icon: Camera, 
    depth: 60,
    label: 'Product Photography'
  },
  { 
    type: 'video', 
    gradient: 'from-orange-600 via-red-500 to-pink-600', 
    icon: Film, 
    depth: 40,
    label: 'Brand Videos'
  },
  { 
    type: 'photo', 
    gradient: 'from-blue-600 via-cyan-500 to-teal-500', 
    icon: Aperture, 
    depth: 80,
    label: 'Lifestyle Shots'
  },
  { 
    type: 'video', 
    gradient: 'from-green-600 via-emerald-500 to-teal-600', 
    icon: Clapperboard, 
    depth: 30,
    label: 'Social Content'
  },
  { 
    type: 'photo', 
    gradient: 'from-yellow-600 via-orange-500 to-red-500', 
    icon: ImageIcon, 
    depth: 50,
    label: 'Event Coverage'
  },
  { 
    type: 'photo', 
    gradient: 'from-pink-600 via-purple-500 to-indigo-600', 
    icon: Camera, 
    depth: 70,
    label: 'Portrait Sessions'
  },
];

function MediaCard({ card, index }: { card: typeof mediaCards[0]; index: number }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = card.icon;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
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
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      className="media-card perspective-container"
      data-index={index}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative preserve-3d transition-all duration-300 hover:scale-105 group cursor-pointer"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(${card.depth}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card */}
        <div className={`aspect-[4/5] bg-gradient-to-br ${card.gradient} rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, white 1px, transparent 1px),
                               radial-gradient(circle at 70% 60%, white 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }} />
          </div>

          {/* Icon */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/20">
              <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
            </div>
            <p className="text-white font-body text-sm font-medium px-4 text-center">
              {card.label}
            </p>
          </div>

          {/* Play button for videos */}
          {card.type === 'video' && (
            <div className="absolute top-4 right-4">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:bg-white/30 transition-colors">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}

export default function Scene1_Photography({ openModal }: Scene1Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
        },
      });

      // Animate headline
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
        }
      );

      // Stagger cards animation
      const cards = containerRef.current?.querySelectorAll('.media-card');
      if (cards) {
        tl.fromTo(
          cards,
          { 
            opacity: 0, 
            y: 100,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
          },
          0.2
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-photography"
      ref={containerRef}
      className="min-h-screen w-full relative overflow-hidden bg-black flex items-center justify-center"
      data-testid="section-photography"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/30 to-black" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 bg-pink-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 bg-primary/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 bg-orange-500/15 rounded-full blur-3xl animate-float-slow" />
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(242, 122, 35, 0.08) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(242, 122, 35, 0.08) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-12 md:mb-16">
          <p className="text-primary font-body text-sm uppercase tracking-wider mb-3 opacity-80">
            Visual Storytelling
          </p>
          <h2
            className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase leading-tight"
            data-testid="text-photography-headline"
          >
            It all starts with the <span className="text-primary">perfect capture</span>
          </h2>
          <p
            className="font-body text-base md:text-lg text-white/60 mb-8 max-w-2xl mx-auto"
            data-testid="text-photography-subheadline"
          >
            From stunning photography to cinematic video, we create the visual content that defines your brand.
          </p>
          <button
            onClick={() => openModal('Photography')}
            className="bg-primary text-white font-body font-semibold text-sm md:text-base px-8 py-3 rounded-xl glow-orange hover:glow-orange-strong transition-all hover:scale-105 active:scale-95"
            data-testid="button-quote-visuals"
          >
            Get a Quote for Visuals
          </button>
        </div>

        {/* Floating Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {mediaCards.map((card, index) => (
            <MediaCard key={index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
