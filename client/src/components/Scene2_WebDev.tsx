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
      className="min-h-screen w-full relative bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center overflow-hidden"
      data-testid="section-webdev"
    >
      <div className="w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
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
            className="absolute top-1/2 left-1/2 z-20 text-brand-orange"
          >
            <MousePointer2 className="w-8 h-8" />
          </div>
        </div>

        <div ref={textContainerRef} className="space-y-6">
          <h2
            className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark-text"
            data-testid="text-webdev-headline"
          >
            We build your brand's digital home.
          </h2>
          
          <p
            className="font-body text-lg md:text-xl text-gray-700"
            data-testid="text-webdev-subheadline"
          >
            A stunning website is your #1 salesperson. We build experiences that convert.
          </p>
          
          <button
            onClick={() => openModal('Web Development')}
            className="bg-brand-orange text-white font-body font-medium text-base px-6 py-3 rounded-lg hover-elevate active-elevate-2 transition-all"
            data-testid="button-quote-website"
          >
            Get a Quote for a Website
          </button>
        </div>
      </div>
    </section>
  );
}
