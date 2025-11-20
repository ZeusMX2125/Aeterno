import { useLayoutEffect, useRef } from 'react';
import { Link } from 'wouter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import laptopMockup from '@assets/generated_images/Laptop_mockup_device_5ea35f15.png';
import wireframeImage from '@assets/generated_images/Wireframe_design_sketch_da0c3a05.png';
import finalDesignImage from '@assets/generated_images/Final_website_design_03e22cfd.png';
import ShinyText from './animations/ShinyText';
import TextType from './animations/TextType';
import FlyingPosters from './reactbits/FlyingPosters';

gsap.registerPlugin(ScrollTrigger);

interface Scene2Props {
  openModal: (service: string) => void;
}

const webDevPosters = [
  { image: wireframeImage, title: 'Wireframe Design' },
  { image: laptopMockup, title: 'Responsive Layout' },
  { image: finalDesignImage, title: 'Final Website' },
];

export default function Scene2_WebDev({ openModal }: Scene2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;

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
        { opacity: 0, y: isMobile ? 30 : 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
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

        {/* Flying Posters */}
        <FlyingPosters posters={webDevPosters} />

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
