import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          <Link href="/">
            <a className="inline-flex items-center gap-2 font-body text-brand-orange hover:text-brand-orange/80 transition-colors mb-8" data-testid="link-back-home">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </Link>

          <h1 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark-text mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none font-body text-gray-700 space-y-6">
            <p className="text-xl text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section>
              <h2 className="font-title text-2xl font-bold text-brand-dark-text mt-12 mb-4">
                Introduction
              </h2>
              <p>
                Aeterno Media ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="font-title text-2xl font-bold text-brand-dark-text mt-12 mb-4">
                Information We Collect
              </h2>
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request a quote or consultation</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us via email or contact forms</li>
                <li>Engage with our services</li>
              </ul>
              <p className="mt-4">
                This information may include your name, email address, phone number, company name, and project details.
              </p>
            </section>

            <section>
              <h2 className="font-title text-2xl font-bold text-brand-dark-text mt-12 mb-4">
                How We Use Your Information
              </h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you information about our services</li>
                <li>Improve our website and services</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-title text-2xl font-bold text-brand-dark-text mt-12 mb-4">
                Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="font-title text-2xl font-bold text-brand-dark-text mt-12 mb-4">
                Third-Party Services
              </h2>
              <p>
                We may use third-party service providers to help us operate our business and website. These providers have access to your personal information only to perform specific tasks on our behalf and are obligated to protect your information.
              </p>
            </section>

            <section>
              <h2 className="font-title text-2xl font-bold text-brand-dark-text mt-12 mb-4">
                Your Rights
              </h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your personal information</li>
              </ul>
            </section>

            <section>
              <h2 className="font-title text-2xl font-bold text-brand-dark-text mt-12 mb-4">
                Cookies
              </h2>
              <p>
                Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, although this may affect the functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="font-title text-2xl font-bold text-brand-dark-text mt-12 mb-4">
                Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="font-title text-2xl font-bold text-brand-dark-text mt-12 mb-4">
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Aeterno Media</strong><br />
                Email: privacy@aeternomedia.com<br />
                Phone: (555) 123-4567
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
