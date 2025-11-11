import { useState, useRef, MouseEvent } from 'react';
import { Camera, Code, TrendingUp, Users } from 'lucide-react';

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

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = stat.icon;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const zDepths = [60, 40, 20, 50];
  const depth = zDepths[index % zDepths.length];

  return (
    <div className="perspective-container">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group preserve-3d transition-all duration-300 hover:scale-105"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(${depth}px)`,
          transformStyle: 'preserve-3d',
        }}
        data-testid={`card-stat-${index}`}
      >
        {/* Glass card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl group-hover:border-white/20 transition-all">
          {/* Icon */}
          <div className="mb-6 relative">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} p-3 shadow-lg`}>
              <Icon className="w-full h-full text-white" />
            </div>
            {/* Glow effect */}
            <div className={`absolute inset-0 w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`} />
          </div>

          {/* Number */}
          <div 
            className="font-title text-6xl md:text-7xl font-bold text-white mb-3"
            style={{
              transform: 'translateZ(20px)',
              textShadow: '0 0 40px rgba(242, 122, 35, 0.3)',
            }}
            data-testid={`text-stat-number-${index}`}
          >
            {stat.number}
          </div>

          {/* Label */}
          <p 
            className="font-body text-base text-white/60 uppercase tracking-wide"
            style={{ transform: 'translateZ(10px)' }}
          >
            {stat.label}
          </p>

          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
        </div>
      </div>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm uppercase tracking-wider mb-4 opacity-80">
            By The Numbers
          </p>
          <h2 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-tight">
            Proven <span className="text-primary">Results</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
