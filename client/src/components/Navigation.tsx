import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import logoImage from '@assets/AETERNO (3)_1762894919968.png';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

interface NavigationProps {
  openModal: (service: string) => void;
}

export default function Navigation({ openModal }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

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
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10'
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

          {/* Desktop Navigation Links */}
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

          {/* Desktop CTA Button */}
          <button
            onClick={() => openModal('General Inquiry')}
            className="hidden md:block bg-primary text-white font-body font-semibold px-4 md:px-6 py-2 md:py-2.5 rounded-lg glow-orange hover:glow-orange-strong transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base"
            data-testid="button-lets-talk"
          >
            Let's Talk
          </button>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden text-white p-2"
                data-testid="button-mobile-menu"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-white/10">
              <SheetHeader>
                <SheetTitle className="text-white font-title text-2xl">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-6 mt-8">
                <SheetClose asChild>
                  <Link 
                    href="/photography" 
                    className="text-white/80 hover:text-primary transition-colors duration-200 font-body text-lg cursor-pointer block" 
                    data-testid="link-photography-mobile"
                  >
                    Photography
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link 
                    href="/web-development" 
                    className="text-white/80 hover:text-primary transition-colors duration-200 font-body text-lg cursor-pointer block" 
                    data-testid="link-web-dev-mobile"
                  >
                    Web Development
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link 
                    href="/social-media" 
                    className="text-white/80 hover:text-primary transition-colors duration-200 font-body text-lg cursor-pointer block" 
                    data-testid="link-social-media-mobile"
                  >
                    Social Media
                  </Link>
                </SheetClose>
                <button
                  onClick={() => {
                    openModal('General Inquiry');
                    setMobileMenuOpen(false);
                  }}
                  className="text-white/80 hover:text-primary transition-colors duration-200 font-body text-lg text-left"
                  data-testid="link-contact-mobile"
                >
                  Contact
                </button>
                <button
                  onClick={() => {
                    openModal('General Inquiry');
                    setMobileMenuOpen(false);
                  }}
                  className="bg-primary text-white font-body font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover-elevate active-elevate-2 w-full"
                  data-testid="button-lets-talk-mobile"
                >
                  Let's Talk
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
