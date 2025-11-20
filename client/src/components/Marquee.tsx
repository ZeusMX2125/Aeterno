import CurvedLoop from './animations/CurvedLoop';
import ScrollVelocity from './animations/ScrollVelocity';

export default function Marquee() {
  return (
    <div className="relative w-full py-16 md:py-20 bg-card border-y border-border overflow-hidden">
      {/* Curved Loop Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <CurvedLoop 
          marqueeText="◆ PHOTOGRAPHY ◆ WEB DEVELOPMENT ◆ SOCIAL MEDIA ◆ BRANDING ◆ VIDEO EDITING ◆ APP DEVELOPMENT ◆ GRAPHIC DESIGN ◆ COPYWRITING "
          speed={1}
          curveAmount={350}
          direction="right"
          className="text-primary/40 font-title font-bold text-xl md:text-2xl tracking-wider"
        />
      </div>
      
      {/* Velocity Scrolling Text */}
      <div className="relative z-10">
        <ScrollVelocity 
          texts={['PHOTOGRAPHY ◆', 'WEB DEVELOPMENT ◆', 'SOCIAL MEDIA ◆', 'BRANDING ◆', 'VIDEO EDITING ◆', 'APP DEVELOPMENT ◆', 'GRAPHIC DESIGN ◆', 'COPYWRITING ◆']}
          velocity={2}
          className="font-title text-3xl md:text-4xl text-muted-foreground font-bold tracking-wide"
          damping={50}
          stiffness={400}
          numCopies={20}
        />
      </div>
    </div>
  );
}
