import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import instagramScreenImage from '@assets/generated_images/Instagram_feed_preview_8cd8e59f.png';
import { Heart, MessageCircle, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Scene3Props {
  openModal: (service: string) => void;
}

export default function Scene3_SMM({ openModal }: Scene3Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        phoneRef.current,
        { rotateY: -25, rotateX: 5, scale: 0.9 },
        {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        }
      );

      heartsRef.current.forEach((heart, index) => {
        if (heart) {
          tl.fromTo(
            heart,
            { opacity: 0, y: 20, scale: 0.5, z: -50 },
            {
              opacity: 1,
              y: -30,
              scale: 1,
              z: index % 2 === 0 ? 50 : 20,
              duration: 0.4,
              ease: 'power2.out',
            },
            0.3 + index * 0.08
          );
        }
      });

      tl.fromTo(
        textContainerRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
        },
        0.6
      );
    });

    return () => ctx.revert();
  }, []);

  const heartPositions = [
    { top: '15%', right: '-5%' },
    { top: '25%', right: '5%' },
    { top: '40%', right: '-8%' },
    { top: '55%', right: '2%' },
    { top: '70%', right: '-3%' },
    { top: '30%', right: '-15%' },
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full relative bg-black flex items-center justify-center overflow-hidden"
      data-testid="section-smm"
    >
      {/* Futuristic tech gradient */}
      <div className="absolute inset-0 bg-gradient-to-bl from-black via-purple-950 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-950/20 via-transparent to-cyan-950/20" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.4s' }} />
      
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div ref={textContainerRef} className="space-y-4 md:space-y-6 order-2 md:order-1 glass rounded-2xl p-6 md:p-8">
          <h2
            className="font-title text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-tight"
            data-testid="text-smm-headline"
          >
            Then, we <span className="text-primary">tell the world</span>
          </h2>
          
          <p
            className="font-body text-base md:text-lg text-muted-foreground"
            data-testid="text-smm-subheadline"
          >
            We turn your assets into a community. Strategic SMM that grows your audience.
          </p>
          
          <button
            onClick={() => openModal('Social Media Marketing')}
            className="bg-primary text-white font-body font-semibold text-sm md:text-base px-6 py-3 rounded-xl glow-orange hover:glow-orange-strong transition-all hover:scale-105 active:scale-95"
            data-testid="button-quote-socials"
          >
            Get a Quote for Socials
          </button>
        </div>

        {/* 3D Phone Mockup */}
        <div className="relative flex items-center justify-center order-1 md:order-2 perspective-container-far">
          <div
            ref={phoneRef}
            className="preserve-3d relative"
            style={{
              width: '280px',
              height: '570px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Phone Frame/Bezel */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-[3rem] border-[12px] border-[#1A1A1A] preserve-3d"
              style={{
                transform: 'translateZ(5px)',
                boxShadow: '0 0 50px rgba(242, 122, 35, 0.15), inset 0 0 20px rgba(0,0,0,0.5)',
              }}
            >
              {/* Screen */}
              <div className="absolute inset-2 bg-black rounded-[2.5rem] overflow-hidden">
                {/* Instagram Content */}
                <div className="w-full h-full bg-gradient-to-b from-purple-900/20 to-pink-900/20">
                  {/* Status Bar */}
                  <div className="h-8 bg-black/40 backdrop-blur-sm flex items-center justify-between px-4 text-white text-xs">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-4 border border-white rounded-sm" />
                      <div className="w-4 h-4 border border-white rounded-sm" />
                      <div className="w-4 h-4 border border-white rounded-sm" />
                    </div>
                  </div>

                  {/* Instagram Post Preview */}
                  <div className="p-3 space-y-3">
                    {/* Post Header */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-pink-500" />
                      <span className="text-white text-sm font-semibold">aeterno.media</span>
                    </div>

                    {/* Post Image Placeholder */}
                    <div className="aspect-square bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-lg flex items-center justify-center">
                      <div className="text-white/50 text-4xl">📸</div>
                    </div>

                    {/* Engagement Icons */}
                    <div className="flex gap-4 text-white">
                      <Heart className="w-6 h-6" />
                      <MessageCircle className="w-6 h-6" />
                      <Send className="w-6 h-6" />
                    </div>

                    {/* Likes */}
                    <div className="text-white text-sm font-semibold">
                      29,431 likes
                    </div>
                  </div>
                </div>
                
                {/* Screen Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
              </div>

              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl" />
              
              {/* Screen Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem] pointer-events-none" />
            </div>

            {/* Floating Hearts in 3D Space */}
            {heartPositions.map((position, index) => (
              <div
                key={index}
                ref={(el) => (heartsRef.current[index] = el)}
                className="absolute preserve-3d"
                style={{
                  ...position,
                  transformStyle: 'preserve-3d',
                }}
              >
                <Heart 
                  className="w-8 h-8 text-primary fill-primary" 
                  style={{
                    filter: 'drop-shadow(0 0 15px rgba(242,122,35,0.8))',
                    transform: `translateZ(${index % 2 === 0 ? '40px' : '20px'})`,
                  }}
                />
              </div>
            ))}

            {/* Shadow */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-4 bg-black/40 blur-xl rounded-full"
              style={{ transform: 'translateZ(-20px)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
