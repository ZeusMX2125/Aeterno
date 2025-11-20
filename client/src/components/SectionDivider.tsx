import CurvedLoop from './animations/CurvedLoop';

export default function SectionDivider() {
  return (
    <div className="relative w-full py-8 md:py-12 bg-black/50 border-y border-white/5 overflow-visible">
      <div className="flex items-center justify-center overflow-visible">
        <CurvedLoop 
          marqueeText="◆ PHOTOGRAPHY ◆ WEB DEVELOPMENT ◆ SOCIAL MEDIA ◆ BRANDING ◆ VIDEO EDITING ◆ APP DEVELOPMENT ◆ GRAPHIC DESIGN ◆ COPYWRITING "
          speed={1}
          curveAmount={350}
          direction="right"
          className="text-primary/40 font-title font-bold text-xl md:text-2xl tracking-wider"
        />
      </div>
    </div>
  );
}
