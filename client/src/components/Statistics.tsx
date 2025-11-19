import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Code, TrendingUp, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: Camera,
    number: '500+',
    label: 'Visual Stories',
    gradient: 'from-orange-500 to-pink-500',
  },
  {
    icon: Code,
    number: '120+',
    label: 'Sites Built',
    gradient: 'from-primary to-orange-600',
  },
  {
    icon: TrendingUp,
    number: '2.5M+',
    label: 'Impressions',
    gradient: 'from-yellow-500 to-primary',
  },
  {
    icon: Users,
    number: '98%',
    label: 'Client Retention',
    gradient: 'from-primary to-red-500',
  },
];

export default function Statistics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      const cards = cardsRef.current?.querySelectorAll('.floating-card');
      if (cards) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 100, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.4'
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleCardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleCardReset = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-950/20 to-black" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 right-1/2 w-80 h-80 bg-red-500/8 rounded-full blur-3xl animate-float-slow" />
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-3" style={{
        backgroundImage: `linear-gradient(rgba(242, 122, 35, 0.05) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(242, 122, 35, 0.05) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-16">
          <p className="text-primary font-body text-sm uppercase tracking-wider mb-4 opacity-80">
            By The Numbers
          </p>
          <h2 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-tight">
            Proven <span className="text-primary">Results</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="floating-card perspective-container group"
                onMouseMove={handleCardTilt}
                onMouseLeave={handleCardReset}
              >
                <div
                  className="preserve-3d relative"
                  data-testid={`card-stat-${index}`}
                >
                  <div className="glass rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-primary/30">
                    {/* Icon */}
                    <div className="mb-6 relative">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} p-3 shadow-lg`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <div className={`absolute inset-0 w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`} />
                    </div>

                    {/* Number */}
                    <div 
                      className="font-title text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3"
                      style={{
                        textShadow: '0 0 40px rgba(242, 122, 35, 0.3)',
                      }}
                      data-testid={`text-stat-number-${index}`}
                    >
                      {stat.number}
                    </div>

                    {/* Label */}
                    <p className="font-body text-sm md:text-base text-white/60 uppercase tracking-wide">
                      {stat.label}
                    </p>

                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
