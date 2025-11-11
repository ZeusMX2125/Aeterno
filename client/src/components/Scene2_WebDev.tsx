import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import laptopImage from '@assets/generated_images/Laptop_mockup_device_5ea35f15.png';
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

      tl.to(designRef.current, {
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
          0.3
        )
        .fromTo(
          textContainerRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
          },
          0.6
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
        <div className="relative">
          <img
            src={laptopImage}
            alt="Laptop mockup"
            className="w-full h-auto relative z-10"
          />
          
          <div className="absolute top-[8%] left-[13%] right-[13%] bottom-[32%] overflow-hidden rounded-t-lg">
            <img
              src={wireframeImage}
              alt="Wireframe"
              className="w-full h-full object-cover"
            />
            
            <div
              ref={designRef}
              className="absolute inset-0 opacity-0"
              style={{ backgroundImage: `url(${finalDesignImage})`, backgroundSize: 'cover' }}
            />
          </div>

          <div
            ref={cursorRef}
            className="absolute top-1/2 left-1/2 z-20 text-primary drop-shadow-[0_0_10px_rgba(242,122,35,0.6)]"
          >
            <MousePointer2 className="w-8 h-8" />
          </div>
        </div>

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
            onClick={() => openModal('Web Development')}
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
