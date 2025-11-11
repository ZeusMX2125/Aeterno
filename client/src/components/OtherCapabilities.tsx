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
    title: 'Website Development',
    description: 'Custom websites built to convert visitors into customers',
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Mobile apps that engage and delight users',
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
    title: 'Copywriting for Businesses',
    description: 'Words that persuade, inform, and convert',
  },
];

export default function OtherCapabilities() {
  return (
    <section className="py-20 md:py-32 bg-white" data-testid="section-capabilities">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark-text text-center mb-16"
          data-testid="text-capabilities-headline"
        >
          Our Full Capabilities
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="border border-brand-light-gray rounded-lg p-8 hover-elevate active-elevate-2 transition-all"
                data-testid={`card-service-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brand-orange" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-body font-semibold text-xl text-brand-dark-text mb-2">
                      {service.title}
                    </h3>
                    <p className="font-body text-gray-600">
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
