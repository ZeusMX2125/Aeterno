import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logoImage from '@assets/AETERNO (3)_1762894919968.png';
// @ts-ignore - WebGL component without TypeScript definitions
import Iridescence from './backgrounds/Iridescence';

interface HookProps {
  openModal: (service: string) => void;
}

export default function Hook({ openModal }: HookProps) {
  const logoRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const duration = isMobile ? 0.8 : 1.2;
      const yOffset = isMobile ? 25 : 40;
      
      gsap.fromTo(
        [logoRef.current, headlineRef.current, sublineRef.current, buttonRef.current],
        { opacity: 0, y: yOffset },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger: isMobile ? 0.15 : 0.2,
          ease: 'power3.out',
        }
      );
    });

    return () => {
      ctx.kill(true);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0" style={{ opacity: 0.4 }}>
        <Iridescence color={[1, 0.27, 0]} mouseReact={true} amplitude={0.1} speed={0.7} />
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-950/30 to-transparent" />
      
      {/* Moving gradient orbs - reduced for cleaner mobile */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 bg-primary/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 bg-primary/10 rounded-full blur-3xl animate-float-delayed" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center text-center gap-6 md:gap-8">
        <img
          ref={logoRef}
          src={logoImage}
          alt="Aeterno Media"
          className="w-40 md:w-48 lg:w-64 h-auto mb-2 md:mb-4"
          data-testid="img-logo"
          loading="eager"
        />
        
        <h1
          ref={headlineRef}
          className="font-title font-bold text-white leading-[0.95] tracking-tight max-w-5xl uppercase"
          data-testid="text-headline"
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 6rem)',
          }}
        >
          Digital Experiences <span className="text-primary">Worth Remembering</span>
        </h1>
        
        <p
          ref={sublineRef}
          className="text-muted-foreground max-w-2xl font-body"
          data-testid="text-subline"
          style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)',
          }}
        >Creative agency specializing in photography, web development, and social media marketing</p>
        
        <button
          ref={buttonRef}
          onClick={() => openModal('Website Development (using Replit)')}
          className="bg-primary text-white font-body font-semibold px-10 py-4 rounded-xl glow-orange hover:glow-orange-strong transition-all duration-300 hover:scale-105 active:scale-95 mt-2 md:mt-4 min-h-[44px]"
          data-testid="button-start-project"
          style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)',
          }}
        >
          Start Your Project
        </button>
      </div>
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
