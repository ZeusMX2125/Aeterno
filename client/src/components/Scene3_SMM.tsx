import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import phoneImage from '@assets/generated_images/Phone_Instagram_mockup_657ad6c9.png';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Scene3Props {
  openModal: (service: string) => void;
}

export default function Scene3_SMM({ openModal }: Scene3Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<(HTMLDivElement | null)[]>([]);
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

      heartsRef.current.forEach((heart, index) => {
        if (heart) {
          tl.fromTo(
            heart,
            { opacity: 0, y: 20, scale: 0.5 },
            {
              opacity: 1,
              y: -20,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
            },
            0.2 + index * 0.1
          );
        }
      });

      tl.fromTo(
        textContainerRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
        },
        0.5
      );
    });

    return () => ctx.revert();
  }, []);

  const heartPositions = [
    { top: '15%', right: '20%' },
    { top: '25%', right: '35%' },
    { top: '40%', right: '15%' },
    { top: '55%', right: '28%' },
    { top: '70%', right: '18%' },
    { top: '30%', right: '10%' },
    { top: '50%', right: '40%' },
    { top: '65%', right: '38%' },
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full relative bg-black flex items-center justify-center overflow-hidden"
      data-testid="section-smm"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 via-transparent to-transparent" />
      
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div ref={textContainerRef} className="space-y-4 md:space-y-6 order-2 md:order-1 glass rounded-2xl p-6 md:p-8">
          <h2
            className="font-title text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-tight"
            data-testid="text-smm-headline"
          >
            Then, we <span className="text-primary">tell the world</span>
          </h2>
          
          <p
            className="font-body text-base md:text-lg text-muted-foreground"
            data-testid="text-smm-subheadline"
          >
            We turn your assets into a community. Strategic SMM that grows your audience.
          </p>
          
          <button
            onClick={() => openModal('Social Media Marketing')}
            className="bg-primary text-white font-body font-semibold text-sm md:text-base px-6 py-3 rounded-xl glow-orange hover:glow-orange-strong transition-all hover:scale-105 active:scale-95"
            data-testid="button-quote-socials"
          >
            Get a Quote for Socials
          </button>
        </div>

        <div className="relative flex items-center justify-center order-1 md:order-2">
          <img
            src={phoneImage}
            alt="Phone mockup"
            className="w-56 md:w-72 lg:w-80 h-auto relative z-10"
          />

          {heartPositions.map((position, index) => (
            <div
              key={index}
              ref={(el) => (heartsRef.current[index] = el)}
              className="absolute z-20"
              style={position}
            >
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary fill-primary drop-shadow-[0_0_10px_rgba(242,122,35,0.6)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
