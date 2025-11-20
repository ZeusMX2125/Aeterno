import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { gsap } from 'gsap';
import { Code, Smartphone, Zap, Shield, Rocket, Palette, ArrowLeft } from 'lucide-react';
// @ts-ignore - WebGL component without TypeScript definitions
import GridScan from '@/components/backgrounds/GridScan';
import ShinyText from '@/components/animations/ShinyText';
import QuoteIntake from '@/components/QuoteIntake';
import Footer from '@/components/Footer';
import laptopMockup from '@assets/generated_images/Laptop_mockup_device_5ea35f15.png';
import wireframeImage from '@assets/generated_images/Wireframe_design_sketch_da0c3a05.png';
import finalDesignImage from '@assets/generated_images/Final_website_design_03e22cfd.png';

const services = [
  {
    icon: Code,
    title: 'Custom Development',
    description: 'Tailored websites and web applications built from scratch to match your exact specifications.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Flawless experiences across all devices - desktop, tablet, and mobile.',
  },
  {
    icon: Zap,
    title: 'Performance Optimized',
    description: 'Lightning-fast load times and optimized performance for better SEO and user experience.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security and reliability built into every project.',
  },
  {
    icon: Rocket,
    title: 'Scalable Solutions',
    description: 'Architecture designed to grow with your business, from startup to enterprise.',
  },
  {
    icon: Palette,
    title: 'Modern Design',
    description: 'Cutting-edge design trends and UX best practices for maximum impact.',
  },
];

const caseStudies = [
  {
    title: 'E-Commerce Platform',
    description: 'Built a full-featured online store with custom checkout, inventory management, and analytics.',
    results: '250% increase in online sales',
  },
  {
    title: 'SaaS Dashboard',
    description: 'Developed a complex data visualization platform for B2B clients with real-time updates.',
    results: '10,000+ active users',
  },
  {
    title: 'Corporate Website',
    description: 'Redesigned enterprise website with focus on lead generation and brand positioning.',
    results: '180% more qualified leads',
  },
];

export default function WebDevelopment() {
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
        contentRef.current?.querySelectorAll('.service-card, .case-study-card') || [],
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

  return (
    <div className="w-full overflow-x-hidden bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        {/* WebGL Background */}
        <div className="absolute inset-0 z-0">
          <GridScan 
            gridScale={0.05} 
            scanColor='#FF4500' 
            linesColor='#1a1a1a' 
            enableWebcam={false}
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950/50 to-black" />

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
            Website Development
          </p>

          <h1
            className="font-title font-bold text-white leading-[0.95] tracking-tight max-w-5xl uppercase"
            data-testid="text-headline"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 6rem)',
            }}
          >
            Your brand's <span className="text-primary">digital home</span>
          </h1>

          <p
            className="text-muted-foreground max-w-3xl font-body"
            data-testid="text-subline"
            style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)',
            }}
          >
            <ShinyText 
              text="Custom websites and web applications that drive results and grow your business"
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

      {/* Services Section */}
      <section ref={contentRef} className="relative py-16 md:py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
            {services.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="service-card glass rounded-2xl p-6 md:p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 glow-orange-hover group"
                  data-testid={`card-service-${index}`}
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

          {/* Case Studies Section */}
          <div className="mb-16 md:mb-24">
            <h2 className="font-title text-white text-3xl md:text-4xl mb-8 md:mb-12 uppercase text-center">
              Case Studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {caseStudies.map((study, index) => (
                <div
                  key={index}
                  className="case-study-card glass rounded-2xl p-6 md:p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 glow-orange-hover"
                  data-testid={`card-case-study-${index}`}
                >
                  <h3 className="font-title text-white text-xl md:text-2xl mb-3 uppercase">
                    {study.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm md:text-base mb-4">
                    {study.description}
                  </p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="font-body text-primary font-semibold text-base md:text-lg">
                      {study.results}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="glass rounded-2xl p-8 md:p-12 border border-white/10 text-center">
            <h2 className="font-title text-white text-3xl md:text-4xl mb-4 uppercase">
              Ready to Build?
            </h2>
            <p className="font-body text-muted-foreground text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a custom solution that exceeds your expectations.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white font-body font-semibold px-10 py-4 rounded-xl glow-orange hover:glow-orange-strong transition-all duration-300 hover:scale-105 active:scale-95"
              data-testid="button-start-project"
              style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)',
              }}
            >
              Start Your Project
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <QuoteIntake
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        selectedService="Website Development (using Replit)"
      />
    </div>
  );
}
