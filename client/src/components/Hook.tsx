import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logoImage from '@assets/AETERNO (3)_1762894919968.png';

interface HookProps {
  openModal: (service: string) => void;
}

export default function Hook({ openModal }: HookProps) {
  const logoRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [logoRef.current, headlineRef.current, sublineRef.current, buttonRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Futuristic tech gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/30 via-transparent to-purple-950/30" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center text-center gap-8">
        <img
          ref={logoRef}
          src={logoImage}
          alt="Aeterno Media"
          className="w-48 md:w-64 h-auto mb-4"
          data-testid="img-logo"
        />
        
        <h1
          ref={headlineRef}
          className="font-title text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tight max-w-5xl uppercase"
          data-testid="text-headline"
        >
          Digital Experiences <span className="text-primary">Worth Remembering</span>
        </h1>
        
        <p
          ref={sublineRef}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl font-body"
          data-testid="text-subline"
        >Creative agency specializing in photography, web development, and social media marketing</p>
        
        <button
          ref={buttonRef}
          onClick={() => openModal('Website Development (using Replit)')}
          className="bg-primary text-white font-body font-semibold text-base md:text-lg px-10 py-4 rounded-xl glow-orange hover:glow-orange-strong transition-all duration-300 hover:scale-105 active:scale-95 mt-4"
          data-testid="button-start-project"
        >
          Start Your Project
        </button>
      </div>
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
