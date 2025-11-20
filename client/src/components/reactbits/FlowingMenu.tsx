import { useRef, useState } from 'react';
import { Link } from 'wouter';
import { gsap } from 'gsap';

interface FlowingMenuProps {
  items: { label: string; href: string }[];
}

export default function FlowingMenu({ items }: FlowingMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      
      if (i === index) {
        gsap.to(item, {
          scale: 1.1,
          x: 10,
          color: '#FF4500',
          duration: 0.4,
          ease: 'back.out(1.7)',
        });
      } else {
        gsap.to(item, {
          scale: 0.95,
          opacity: 0.5,
          duration: 0.3,
        });
      }
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    
    itemRefs.current.forEach((item) => {
      if (!item) return;
      
      gsap.to(item, {
        scale: 1,
        x: 0,
        opacity: 1,
        color: '#FFFFFF',
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  };

  return (
    <nav className="flex items-center gap-6 md:gap-8">
      {items.map((item, index) => (
        <Link key={index} href={item.href}>
          <a
            ref={(el) => (itemRefs.current[index] = el)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="font-body font-medium text-white transition-colors relative"
            data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {item.label}
            {hoveredIndex === index && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary animate-pulse" />
            )}
          </a>
        </Link>
      ))}
    </nav>
  );
}
