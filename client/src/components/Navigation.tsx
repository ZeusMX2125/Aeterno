import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import logoImage from '@assets/AETERNO (3)_1762894919968.png';

interface NavigationProps {
  openModal: (service: string) => void;
}

export default function Navigation({ openModal }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = window.innerWidth >= 768 ? 80 : 64; // md:h-20 (80px) or h-16 (64px)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight - 20; // Extra 20px spacing
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
      data-testid="nav-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex-shrink-0 cursor-pointer">
              <img
                src={logoImage}
                alt="Aeterno Media"
                className="h-10 md:h-12 w-auto"
                data-testid="img-nav-logo"
              />
            </div>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/photography">
              <span
                className="text-white/80 hover:text-primary transition-colors duration-200 font-body text-sm lg:text-base cursor-pointer"
                data-testid="link-photography"
              >
                Photography
              </span>
            </Link>
            <Link href="/web-development">
              <span
                className="text-white/80 hover:text-primary transition-colors duration-200 font-body text-sm lg:text-base cursor-pointer"
                data-testid="link-web-dev"
              >
                Web Dev
              </span>
            </Link>
            <Link href="/social-media">
              <span
                className="text-white/80 hover:text-primary transition-colors duration-200 font-body text-sm lg:text-base cursor-pointer"
                data-testid="link-social-media"
              >
                Social Media
              </span>
            </Link>
            <button
              onClick={() => openModal('General Inquiry')}
              className="text-white/80 hover:text-primary transition-colors duration-200 font-body text-sm lg:text-base"
              data-testid="link-contact"
            >
              Contact
            </button>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => openModal('General Inquiry')}
            className="bg-primary text-white font-body font-semibold px-4 md:px-6 py-2 md:py-2.5 rounded-lg glow-orange hover:glow-orange-strong transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base"
            data-testid="button-lets-talk"
          >
            Let's Talk
          </button>
        </div>
      </div>
    </nav>
  );
}
