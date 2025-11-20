import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { gsap } from 'gsap';
import { TrendingUp, Target, Users, BarChart3, Calendar, MessageSquare, ArrowLeft } from 'lucide-react';
// @ts-ignore - WebGL component without TypeScript definitions
import LiquidEther from '@/components/backgrounds/LiquidEther';
import ShinyText from '@/components/animations/ShinyText';
import QuoteIntake from '@/components/QuoteIntake';
import Footer from '@/components/Footer';

const services = [
  {
    icon: Target,
    title: 'Strategy Development',
    description: 'Data-driven social media strategies tailored to your brand goals and target audience.',
  },
  {
    icon: Calendar,
    title: 'Content Planning',
    description: 'Comprehensive content calendars with engaging posts optimized for each platform.',
  },
  {
    icon: MessageSquare,
    title: 'Community Management',
    description: 'Active engagement with your audience, building relationships and brand loyalty.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Detailed insights and performance metrics to continuously optimize your campaigns.',
  },
  {
    icon: Users,
    title: 'Influencer Outreach',
    description: 'Strategic partnerships with influencers to amplify your brand message.',
  },
  {
    icon: TrendingUp,
    title: 'Paid Advertising',
    description: 'Targeted ad campaigns that maximize ROI and reach your ideal customers.',
  },
];

const platforms = [
  { name: 'Instagram', strength: 'Visual storytelling & brand building' },
  { name: 'Facebook', strength: 'Community engagement & broad reach' },
  { name: 'TikTok', strength: 'Viral content & younger demographics' },
  { name: 'LinkedIn', strength: 'B2B marketing & professional networking' },
  { name: 'Twitter/X', strength: 'Real-time engagement & thought leadership' },
  { name: 'YouTube', strength: 'Long-form content & video marketing' },
];

const results = [
  { metric: '300%', label: 'Average Engagement Increase' },
  { metric: '50K+', label: 'New Followers Generated' },
  { metric: '15M+', label: 'Total Impressions' },
  { metric: '5X', label: 'ROI on Ad Spend' },
];

export default function SocialMedia() {
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
        contentRef.current?.querySelectorAll('.service-card, .platform-card, .result-card') || [],
        { opacity: 0, y: isMobile ? 40 : 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
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
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        {/* WebGL Background */}
        <div className="absolute inset-0 z-0">
          <LiquidEther colors={['#000000', '#111111', '#220a00']} />
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
            Social Media Marketing
          </p>

          <h1
            className="font-title font-bold text-white leading-[0.95] tracking-tight max-w-5xl uppercase"
            data-testid="text-headline"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 6rem)',
            }}
          >
            We <span className="text-primary">tell the world</span>
          </h1>

          <p
            className="text-muted-foreground max-w-3xl font-body"
            data-testid="text-subline"
            style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)',
            }}
          >
            <ShinyText 
              text="Strategic social media marketing that builds communities and drives measurable growth"
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

      {/* Content Section */}
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

          {/* Platforms Section */}
          <div className="mb-16 md:mb-24">
            <h2 className="font-title text-white text-3xl md:text-4xl mb-8 md:mb-12 uppercase text-center">
              Platforms We Master
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className="platform-card glass rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300"
                  data-testid={`card-platform-${index}`}
                >
                  <h3 className="font-title text-white text-lg md:text-xl mb-2 uppercase">
                    {platform.name}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm">
                    {platform.strength}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="mb-16 md:mb-24">
            <h2 className="font-title text-white text-3xl md:text-4xl mb-8 md:mb-12 uppercase text-center">
              Proven Results
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="result-card glass rounded-xl p-6 md:p-8 border border-white/10 text-center"
                  data-testid={`card-result-${index}`}
                >
                  <p className="font-title text-primary text-3xl md:text-5xl mb-2">
                    {result.metric}
                  </p>
                  <p className="font-body text-muted-foreground text-xs md:text-sm">
                    {result.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="glass rounded-2xl p-8 md:p-12 border border-white/10 text-center">
            <h2 className="font-title text-white text-3xl md:text-4xl mb-4 uppercase">
              Ready to Grow?
            </h2>
            <p className="font-body text-muted-foreground text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Let's create a social media strategy that builds your community and drives real results.
            </p>
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
      </section>

      <Footer />

      <QuoteIntake
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        selectedService="Social Media Marketing"
      />
    </div>
  );
}
