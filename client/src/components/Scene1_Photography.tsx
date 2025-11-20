import { useLayoutEffect, useRef } from 'react';
import { Link } from 'wouter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Film, Aperture, Clapperboard, ImageIcon, Video } from 'lucide-react';
import ShinyText from './animations/ShinyText';
import TextType from './animations/TextType';
import ShapeBlur from './reactbits/ShapeBlur';
import CircularGallery from './reactbits/CircularGallery';

gsap.registerPlugin(ScrollTrigger);

interface Scene1Props {
  openModal: (service: string) => void;
}

const photographyItems = [
  { icon: Camera, label: 'Product Photography' },
  { icon: Film, label: 'Brand Videos' },
  { icon: Aperture, label: 'Lifestyle Shots' },
  { icon: Clapperboard, label: 'Social Content' },
  { icon: ImageIcon, label: 'Event Coverage' },
  { icon: Video, label: 'Portrait Sessions' },
];

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
          pin: window.innerWidth > 1024, // Disable pinning on mobile/tablet
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
    });

    return () => {
      ctx.kill(true);
    };
  }, []);

  return (
    <section
      id="scene-photography"
      ref={containerRef}
      className="min-h-[100svh] w-full relative z-10 overflow-hidden flex items-center justify-center"
      data-testid="section-photography"
      style={{
        background: '#000000',
      }}
    >
      {/* ShapeBlur Background */}
      <div className="absolute inset-0 z-0">
        <ShapeBlur variation={0} />
      </div>

      {/* Dark Glass Effect Overlay */}
      <div className="absolute inset-0 z-5 bg-gradient-to-br from-black/40 via-transparent to-black/40" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 section-spacing">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-8 md:mb-12">
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
            It all starts with the <TextType
              text={['perfect capture', 'right moment', 'creative vision', 'perfect shot']}
              as="span"
              className="text-primary inline-block"
              typingSpeed={100}
              deletingSpeed={50}
              pauseDuration={2000}
              loop={true}
            />
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12">
            <Link href="/photography">
              <button
                className="bg-white/5 backdrop-blur-md text-white font-body font-semibold px-8 py-3.5 rounded-xl border border-white/10 hover:border-primary/50 transition-all hover:scale-105 active:scale-95 min-h-[44px] hover-elevate"
                data-testid="button-learn-more-photography"
                style={{
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                }}
              >
                Learn More
              </button>
            </Link>
            <button
              onClick={() => openModal('Photography')}
              className="bg-primary text-white font-body font-semibold px-8 py-3.5 rounded-xl glow-orange hover:glow-orange-strong transition-all hover:scale-105 active:scale-95 min-h-[44px]"
              data-testid="button-quote-photography"
              style={{
                fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              }}
            >
              Get Quote
            </button>
          </div>
        </div>

        {/* Circular Gallery */}
        <CircularGallery items={photographyItems} radius={280} />
      </div>
    </section>
  );
}
