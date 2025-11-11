import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-brand-dark-blue py-12 px-6" data-testid="footer">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-brand-light-gray text-sm">
          © {new Date().getFullYear()} Aeterno Media. All rights reserved.
        </p>
        
        <Link href="/privacy">
          <a className="font-body text-brand-light-gray text-sm hover:text-white transition-colors underline" data-testid="link-privacy">
            Privacy Policy
          </a>
        </Link>
      </div>
    </footer>
  );
}
