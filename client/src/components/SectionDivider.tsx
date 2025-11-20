import '@/components/animations/HorizontalMarquee.css';

export default function SectionDivider() {
  const text = "◆ PHOTOGRAPHY ◆ WEB DEVELOPMENT ◆ SOCIAL MEDIA ◆ BRANDING ◆ VIDEO EDITING ◆ APP DEVELOPMENT ◆ GRAPHIC DESIGN ◆ COPYWRITING ";
  
  return (
    <div className="relative w-full py-8 md:py-12 bg-black/50 border-y border-white/5 overflow-hidden">
      <div className="horizontal-marquee">
        <div className="horizontal-marquee-content">
          <span className="text-primary/40 font-title font-bold text-xl md:text-2xl tracking-wider">{text}</span>
          <span className="text-primary/40 font-title font-bold text-xl md:text-2xl tracking-wider">{text}</span>
          <span className="text-primary/40 font-title font-bold text-xl md:text-2xl tracking-wider">{text}</span>
          <span className="text-primary/40 font-title font-bold text-xl md:text-2xl tracking-wider">{text}</span>
        </div>
      </div>
    </div>
  );
}
