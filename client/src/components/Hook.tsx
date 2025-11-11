import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logoImage from '@assets/generated_images/Aeterno_agency_logo_4c6eece0.png';

interface HookProps {
  openModal: (service: string) => void;
}

export default function Hook({ openModal }: HookProps) {
  const logoRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [logoRef.current, headlineRef.current, buttonRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen bg-brand-dark-blue flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="max-w-5xl w-full flex flex-col items-center text-center space-y-12">
        <img
          ref={logoRef}
          src={logoImage}
          alt="Aeterno Media"
          className="w-64 md:w-96 h-auto"
          data-testid="img-logo"
        />
        
        <h1
          ref={headlineRef}
          className="font-title text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl"
          data-testid="text-headline"
        >
          We build the digital experiences your customers will remember.
        </h1>
        
        <button
          ref={buttonRef}
          onClick={() => openModal('Website Development')}
          className="bg-brand-orange text-white font-body font-medium text-lg px-8 py-4 rounded-lg shadow-2xl hover-elevate active-elevate-2 transition-all duration-300"
          data-testid="button-start-project"
        >
          Start Your Project
        </button>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark-blue/50 pointer-events-none" />
    </section>
  );
}
