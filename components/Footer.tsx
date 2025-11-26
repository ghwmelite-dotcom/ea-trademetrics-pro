import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a2e] border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-white">TradeMetrics</span>
              <span className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>Pro</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Professional Expert Advisor development services for traders worldwide. Transform your trading strategies into automated systems.
            </p>
            <Link
              href="https://trademetricspro.com"
              target="_blank"
              className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] text-sm font-medium"
            >
              Visit Main Platform →
            </Link>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/mt4-expert-advisor-development" className="text-gray-400 hover:text-[var(--color-primary)] text-sm">
                  MT4 EA Development
                </Link>
              </li>
              <li>
                <Link href="/services/mt5-expert-advisor-development" className="text-gray-400 hover:text-[var(--color-primary)] text-sm">
                  MT5 EA Development
                </Link>
              </li>
              <li>
                <Link href="/services/pine-script-to-mql-conversion" className="text-gray-400 hover:text-[var(--color-primary)] text-sm">
                  TradingView Conversion
                </Link>
              </li>
              <li>
                <Link href="/services/strategy-backtesting-optimization" className="text-gray-400 hover:text-[var(--color-primary)] text-sm">
                  Backtesting & Optimization
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[var(--color-primary)] text-sm">
                  View All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[var(--color-primary)] text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-gray-400 hover:text-[var(--color-primary)] text-sm">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[var(--color-primary)] text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://trademetricspro.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[var(--color-primary)] text-sm"
                >
                  TradeMetrics Pro Platform
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">
                <span className="block text-gray-500">Email:</span>
                <a href="mailto:ea@trademetricspro.com" className="hover:text-[var(--color-primary)]">
                  ea@trademetricspro.com
                </a>
              </li>
              <li className="text-gray-400 text-sm">
                <span className="block text-gray-500">Location:</span>
                Accra, Ghana (Serving globally)
              </li>
              <li className="flex gap-4 mt-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} TradeMetrics Pro EA Development. Part of OHWP Studios. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-500 hover:text-[var(--color-primary)] text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-[var(--color-primary)] text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-gray-600 text-xs mt-4 text-center md:text-left">
            <small>Trading involves substantial risk. Past performance does not guarantee future results.</small>
          </p>
        </div>
      </div>
    </footer>
  );
}
