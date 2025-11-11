import { useState, useRef, MouseEvent } from 'react';
import { Briefcase, Users, Award, TrendingUp, Clock, List } from 'lucide-react';

const stats = [
  {
    icon: List,
    title: 'Action Plan Testing',
    description: 'Evaluating action plans to ensure effectiveness and goal alignment before implementation.',
    progress: 30,
    status: 'IMPORTANT' as const,
  },
  {
    icon: Briefcase,
    title: 'Implementation',
    description: 'Launching the refined strategy and executing carefully planned actions.',
    progress: 75,
    status: 'IN PROGRESS' as const,
  },
  {
    icon: Users,
    title: 'User Insights',
    description: 'Collecting user feedback and analyzing engagement to refine approach.',
    progress: 60,
    status: 'IN PROGRESS' as const,
  },
  {
    icon: TrendingUp,
    title: 'Performance Metrics',
    description: 'Tracking key indicators to measure success and optimize continuously.',
    progress: 90,
    status: 'COMPLETED' as const,
  },
];

const statusColors = {
  IMPORTANT: 'text-red-400 bg-red-400/10 border-red-400/30',
  'IN PROGRESS': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  COMPLETED: 'text-green-400 bg-green-400/10 border-green-400/30',
};

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
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
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
        className="bg-[#1A1A1A] border border-white/5 rounded-xl p-5 transition-all duration-300 group tilt-3d preserve-3d hover:border-white/10"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        }}
        data-testid={`card-stat-${index}`}
      >
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* Window Title Bar */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
          <div className="w-8 h-8 bg-white/5 rounded-md flex items-center justify-center">
            <Icon className="w-4 h-4 text-white/60" />
          </div>
          <h3 className="font-body text-white text-base font-medium flex-1">
            {stat.title}
          </h3>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="font-body text-sm text-white/50 leading-relaxed">
            {stat.description}
          </p>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="w-3 h-3" />
                <span>{stat.progress}% complete</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${statusColors[stat.status]}`}>
                {stat.status}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full transition-all duration-500"
                style={{ width: `${stat.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-body text-sm uppercase tracking-wider mb-3">
            PROCESS
          </p>
          <h2 className="font-title text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase leading-tight max-w-3xl mx-auto">
            The Approach <span className="text-primary">Plan</span>
          </h2>
          <p className="text-white/50 font-body text-base md:text-lg mt-4 max-w-2xl mx-auto">
            A clear step-by-step strategy designed to achieve goals efficiently.
          </p>
        </div>

        {/* Staggered grid layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {/* First card - full width on mobile, spans 2 columns on large */}
          <div className="lg:col-span-2">
            <StatCard stat={stats[0]} index={0} />
          </div>
          
          {/* Second card */}
          <div className="lg:translate-y-8">
            <StatCard stat={stats[1]} index={1} />
          </div>
          
          {/* Third card */}
          <div className="lg:-translate-y-4">
            <StatCard stat={stats[2]} index={2} />
          </div>
          
          {/* Fourth card - spans 2 columns on large */}
          <div className="lg:col-span-2 lg:translate-y-4">
            <StatCard stat={stats[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
