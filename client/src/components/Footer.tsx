import { Link } from 'wouter';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-border py-12 px-4 md:px-8" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="font-title text-2xl font-bold text-white uppercase">
              Aeterno <span className="text-primary">Media</span>
            </p>
            <p className="font-body text-muted-foreground text-sm">
              © {new Date().getFullYear()} Aeterno Media. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/privacy" 
              className="font-body text-muted-foreground text-sm hover:text-white transition-colors" 
              data-testid="link-privacy"
            >
              Privacy Policy
            </Link>
            
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-card rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-card rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Twitter"
                data-testid="link-twitter"
              >
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-card rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="LinkedIn"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
