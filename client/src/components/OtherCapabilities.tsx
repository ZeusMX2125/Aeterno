import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Video, Image, Globe, Share2, Palette, FileText } from 'lucide-react';
import ShinyText from '@/components/animations/ShinyText';
import TextType from '@/components/animations/TextType';
import CardSwap from './reactbits/CardSwap';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Camera,
    title: 'Photography',
    description: 'Professional photo shoots that capture your brand essence',
  },
  {
    icon: Video,
    title: 'Video Editing',
    description: 'Cinematic editing that tells compelling stories',
  },
  {
    icon: Image,
    title: 'Image Editing',
    description: 'Pixel-perfect retouching and enhancement',
  },
  {
    icon: Globe,
    title: 'Website Development (using Replit)',
    description: 'Custom websites built to convert visitors into customers',
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Strategic content that builds engaged communities',
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Visual identities that make lasting impressions',
  },
  {
    icon: FileText,
    title: 'Copywriting',
    description: 'Words that persuade, inform, and convert',
  },
];


export default function OtherCapabilities() {
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
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    });

    return () => {
      ctx.kill(true);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="section-spacing relative overflow-hidden" 
      data-testid="section-capabilities"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000000 100%)',
      }}
    >
      {/* Dark Glass Effect Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      <div className="absolute inset-0 z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8">
        <div ref={headlineRef} className="text-center mb-8 md:mb-12 lg:mb-16">
          <p className="text-primary font-body text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-3">
            SERVICES
          </p>
          <h2
            className="font-title font-bold text-white uppercase leading-tight mb-3 md:mb-4"
            data-testid="text-capabilities-headline"
            style={{
              fontSize: 'clamp(2rem, 8vw, 4rem)',
            }}
          >
            What We <TextType
              text={['Do Best', 'Excel At', 'Master', 'Deliver']}
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
              text="From photography to web development, we offer comprehensive creative solutions that elevate your brand."
              speed={10}
              className="inline-block"
            />
          </p>
        </div>

        <CardSwap items={services} />
      </div>
    </section>
  );
}
