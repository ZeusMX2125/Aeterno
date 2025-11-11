export default function Marquee() {
  const services = [
    'PHOTOGRAPHY',
    'WEB DEVELOPMENT',
    'SOCIAL MEDIA',
    'BRANDING',
    'VIDEO EDITING',
    'APP DEVELOPMENT',
    'GRAPHIC DESIGN',
    'COPYWRITING',
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedServices = [...services, ...services];

  return (
    <div className="relative w-full py-8 bg-card border-y border-border overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {duplicatedServices.map((service, index) => (
          <div
            key={index}
            className="flex items-center mx-8"
          >
            <span className="font-title text-2xl md:text-3xl text-muted-foreground font-bold tracking-wide">
              {service}
            </span>
            <span className="mx-8 text-primary text-2xl">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
