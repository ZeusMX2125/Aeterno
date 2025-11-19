import { Camera, Video, Image, Globe, Smartphone, Share2, Palette, FileText } from 'lucide-react';

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
  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden" data-testid="section-capabilities">
      {/* Futuristic tech gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950 to-black" />
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.8s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-body text-sm uppercase tracking-wider mb-3">
            SERVICES
          </p>
          <h2
            className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-tight"
            data-testid="text-capabilities-headline"
          >
            What We <span className="text-primary">Do Best</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group hover:glow-orange cursor-pointer"
                data-testid={`card-service-${index}`}
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="font-title text-lg font-bold text-white mb-2 uppercase">
                      {service.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
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
