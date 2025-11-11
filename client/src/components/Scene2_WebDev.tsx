import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import wireframeImage from '@assets/generated_images/Wireframe_design_sketch_da0c3a05.png';
import finalDesignImage from '@assets/generated_images/Final_website_design_03e22cfd.png';
import { MousePointer2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Scene2Props {
  openModal: (service: string) => void;
}

export default function Scene2_WebDev({ openModal }: Scene2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);

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

      tl.fromTo(
        laptopRef.current,
        { rotateY: 25, rotateX: 5, scale: 0.9 },
        {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        }
      )
        .to(designRef.current, {
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut',
        })
        .to(
          cursorRef.current,
          {
            x: 200,
            y: -100,
            duration: 0.8,
            ease: 'power1.inOut',
          },
          0.5
        )
        .fromTo(
          textContainerRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
          },
          0.8
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full relative bg-black flex items-center justify-center overflow-hidden"
      data-testid="section-webdev"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* 3D Laptop Mockup */}
        <div className="perspective-container-far">
          <div
            ref={laptopRef}
            className="preserve-3d relative"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Laptop Screen */}
            <div
              className="relative w-full aspect-[16/10] bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-t-2xl border-8 border-[#2A2A2A] preserve-3d"
              style={{
                transform: 'translateZ(10px)',
                boxShadow: '0 0 60px rgba(242, 122, 35, 0.15)',
              }}
            >
              {/* Screen Inner Bezel */}
              <div className="absolute inset-2 bg-black rounded-lg overflow-hidden">
                {/* Wireframe Background */}
                <img
                  src={wireframeImage}
                  alt="Wireframe"
                  className="w-full h-full object-cover"
                />
                
                {/* Final Design Overlay */}
                <div
                  ref={designRef}
                  className="absolute inset-0 opacity-0"
                  style={{ 
                    backgroundImage: `url(${finalDesignImage})`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                
                {/* Screen Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
              </div>
              
              {/* Animated Cursor */}
              <div
                ref={cursorRef}
                className="absolute top-1/2 left-1/2 z-20 text-primary"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(242,122,35,0.6))',
                  transform: 'translateZ(20px)',
                }}
              >
                <MousePointer2 className="w-8 h-8" />
              </div>
              
              {/* Screen Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg pointer-events-none" />
            </div>

            {/* Laptop Keyboard/Base */}
            <div
              className="w-full h-6 bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A] rounded-b-2xl relative preserve-3d"
              style={{
                transform: 'rotateX(-90deg) translateY(3px) translateZ(-3px)',
                transformOrigin: 'top center',
              }}
            >
              {/* Keyboard Detail */}
              <div className="absolute inset-x-8 top-1 bottom-1 bg-black/40 rounded-sm" />
              
              {/* Trackpad */}
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-16 h-2 bg-black/60 rounded-sm" />
            </div>

            {/* Shadow */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-2 bg-black/40 blur-xl rounded-full"
              style={{ transform: 'translateZ(-20px)' }}
            />
          </div>
        </div>

        {/* Text Content */}
        <div ref={textContainerRef} className="space-y-4 md:space-y-6 glass rounded-2xl p-6 md:p-8">
          <h2
            className="font-title text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-tight"
            data-testid="text-webdev-headline"
          >
            We build your brand's <span className="text-primary">digital home</span>
          </h2>
          
          <p
            className="font-body text-base md:text-lg text-muted-foreground"
            data-testid="text-webdev-subheadline"
          >
            A stunning website is your #1 salesperson. We build experiences that convert.
          </p>
          
          <button
            onClick={() => openModal('Website Development')}
            className="bg-primary text-white font-body font-semibold text-sm md:text-base px-6 py-3 rounded-xl glow-orange hover:glow-orange-strong transition-all hover:scale-105 active:scale-95"
            data-testid="button-quote-website"
          >
            Get a Quote for a Website
          </button>
        </div>
      </div>
    </section>
  );
}
