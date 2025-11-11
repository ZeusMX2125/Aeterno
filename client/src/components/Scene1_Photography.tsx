import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import beforeImage from '@assets/generated_images/Photography_before_image_8d65aa95.png';
import afterImage from '@assets/generated_images/Photography_after_image_205bf017.png';

gsap.registerPlugin(ScrollTrigger);

interface Scene1Props {
  openModal: (service: string) => void;
}

export default function Scene1_Photography({ openModal }: Scene1Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const afterImageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

      tl.to(dividerRef.current, {
        x: '100vw',
        duration: 1,
        ease: 'none',
      })
        .to(
          afterImageRef.current,
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1,
            ease: 'none',
          },
          0
        )
        .fromTo(
          [headlineRef.current, subheadlineRef.current, buttonRef.current],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.1,
          },
          0.5
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-photography"
      ref={containerRef}
      className="min-h-screen w-full relative overflow-hidden bg-black"
      data-testid="section-photography"
    >
      <div
        className="absolute inset-0 bg-cover bg-center grayscale"
        style={{ backgroundImage: `url(${beforeImage})` }}
      />

      <div
        ref={dividerRef}
        className="absolute top-0 left-0 w-1 h-full bg-primary z-10 shadow-[0_0_30px_rgba(242,122,35,0.6)]"
        style={{ transform: 'translateX(-100%)' }}
      />

      <div
        ref={afterImageRef}
        className="absolute inset-0 bg-cover bg-center z-[5]"
        style={{
          backgroundImage: `url(${afterImage})`,
          clipPath: 'inset(0 100% 0 0)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-20" />

      <div className="absolute bottom-8 left-4 md:left-12 right-4 md:right-auto md:max-w-2xl z-30 glass-dark rounded-2xl p-6 md:p-8">
        <h2
          ref={headlineRef}
          className="font-title text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 uppercase leading-tight"
          data-testid="text-photography-headline"
        >
          It all starts with the <span className="text-primary">perfect image</span>
        </h2>
        
        <p
          ref={subheadlineRef}
          className="font-body text-base md:text-lg text-muted-foreground mb-6"
          data-testid="text-photography-subheadline"
        >
          We capture and refine the visuals that define your brand.
        </p>
        
        <button
          ref={buttonRef}
          onClick={() => openModal('Photography')}
          className="bg-primary text-white font-body font-semibold text-sm md:text-base px-6 py-3 rounded-xl glow-orange hover:glow-orange-strong transition-all hover:scale-105 active:scale-95"
          data-testid="button-quote-visuals"
        >
          Get a Quote for Visuals
        </button>
      </div>
    </section>
  );
}
