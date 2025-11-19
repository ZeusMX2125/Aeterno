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
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0A0A0A] to-black opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 opacity-50" />
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
