import { useState, useRef, MouseEvent } from 'react';
import { Briefcase, Users, Award, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Briefcase,
    number: '210+',
    label: 'Projects Delivered',
    description: 'A proven record of successful projects delivered with quality',
  },
  {
    icon: Users,
    number: '29K',
    label: 'Audience Reach',
    description: 'Track audience engagement and visitor growth effectively',
  },
  {
    icon: Award,
    number: '98%',
    label: 'Client Satisfaction',
    description: 'Our clients\' feedback reflects the quality we put into every project',
  },
  {
    icon: TrendingUp,
    number: '5+',
    label: 'Years Experience',
    description: 'Building digital experiences since 2019',
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
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-container">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass rounded-2xl p-6 md:p-8 hover:glow-orange transition-all duration-300 group tilt-3d preserve-3d"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
        data-testid={`card-stat-${index}`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between depth-layer-mid">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          </div>
          
          <div>
            <div 
              className="font-title text-5xl md:text-6xl font-bold text-white text-glow-orange mb-2 depth-layer-front"
              data-testid={`text-stat-number-${index}`}
            >
              {stat.number}
            </div>
            <h3 className="font-title text-lg font-bold text-white uppercase mb-2 depth-layer-mid">
              {stat.label}
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed depth-layer-back">
              {stat.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="py-16 md:py-24 bg-card border-y border-border relative overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-body text-sm uppercase tracking-wider mb-3">
            INDICATOR
          </p>
          <h2 className="font-title text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase leading-tight max-w-3xl mx-auto">
            Ensuring Trust & <span className="text-primary">Authenticity</span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg mt-4 max-w-2xl mx-auto">
            We create confidence by being transparent and reliable in everything we do
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
