import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { gsap } from 'gsap';
import { Camera, Video, Image as ImageIcon, Film, Aperture, Clapperboard, ArrowLeft } from 'lucide-react';
import ShinyText from '@/components/animations/ShinyText';
import QuoteIntake from '@/components/QuoteIntake';
import Footer from '@/components/Footer';

const portfolioItems = [
  {
    icon: Camera,
    title: 'Product Photography',
    description: 'High-quality product shots that showcase your offerings in the best light, driving conversions and building trust.',
  },
  {
    icon: Film,
    title: 'Brand Videos',
    description: 'Compelling video content that tells your brand story and connects with your audience emotionally.',
  },
  {
    icon: Aperture,
    title: 'Lifestyle Photography',
    description: 'Authentic lifestyle imagery that resonates with your target audience and builds brand identity.',
  },
  {
    icon: Clapperboard,
    title: 'Social Content',
    description: 'Scroll-stopping content optimized for social platforms, designed to maximize engagement and reach.',
  },
  {
    icon: ImageIcon,
    title: 'Event Coverage',
    description: 'Professional event documentation capturing key moments and atmosphere for your brand activations.',
  },
  {
    icon: Video,
    title: 'Commercial Production',
    description: 'Full-scale commercial video production from concept to final delivery, ready for any platform.',
  },
];

const benefits = [
  '4K Video & High-Resolution Photography',
  'Same-Day Turnaround Available',
  'Professional Editing & Color Grading',
  'Rights-Managed Licensing',
  'Studio & On-Location Shoots',
  'Unlimited Revisions',
];

export default function Photography() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const duration = isMobile ? 0.6 : 1;
      const yOffset = isMobile ? 30 : 50;

      gsap.fromTo(
        heroRef.current?.querySelectorAll('.hero-content > *') || [],
        { opacity: 0, y: yOffset },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        contentRef.current?.querySelectorAll('.portfolio-card') || [],
        { opacity: 0, y: isMobile ? 40 : 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    });

    return () => ctx.kill(true);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-black">
      {/* Hero Section */}
      <section 
        className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000000 100%)',
        }}
      >
        {/* Dark Glass Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />
        </div>

        {/* Hero Content */}
        <div ref={heroRef} className="relative z-10 max-w-6xl w-full flex flex-col items-center text-center gap-6 md:gap-8 hero-content">
          {/* Back Button */}
          <Link href="/">
            <button
              className="self-start flex items-center gap-2 text-white/80 hover:text-primary transition-colors duration-300 font-body text-sm md:text-base group"
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
          </Link>

          <p className="text-primary font-body text-xs md:text-sm uppercase tracking-wider">
            Photography & Video Production
          </p>

          <h1
            className="font-title font-bold text-white leading-[0.95] tracking-tight max-w-5xl uppercase"
            data-testid="text-headline"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 6rem)',
            }}
          >
            We capture your <span className="text-primary">brand's story</span>
          </h1>

          <p
            className="text-muted-foreground max-w-3xl font-body"
            data-testid="text-subline"
            style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)',
            }}
          >
            <ShinyText 
              text="Professional photography and videography that elevates your brand and drives results"
              speed={10}
              className="inline-block"
            />
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white font-body font-semibold px-10 py-4 rounded-xl glow-orange hover:glow-orange-strong transition-all duration-300 hover:scale-105 active:scale-95 mt-4"
            data-testid="button-get-quote"
            style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)',
            }}
          >
            Get a Quote
          </button>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* Portfolio Section */}
      <section ref={contentRef} className="relative py-16 md:py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
            {portfolioItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="portfolio-card glass rounded-2xl p-6 md:p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 glow-orange-hover group"
                  data-testid={`card-portfolio-${index}`}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-title text-white text-xl md:text-2xl mb-3 uppercase">
                    {item.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Benefits Section */}
          <div className="glass rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="font-title text-white text-3xl md:text-4xl mb-8 uppercase text-center">
              What You Get
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 portfolio-card"
                  data-testid={`benefit-${index}`}
                >
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <p className="font-body text-white text-base md:text-lg">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-white font-body font-semibold px-10 py-4 rounded-xl glow-orange hover:glow-orange-strong transition-all duration-300 hover:scale-105 active:scale-95"
                data-testid="button-get-started"
                style={{
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)',
                }}
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <QuoteIntake
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        selectedService="Photography & Video Production"
      />
    </div>
  );
}
