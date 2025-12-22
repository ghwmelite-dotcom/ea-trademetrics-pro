import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | TradeMetrics Pro EA Development',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Icon */}
        <div className="w-32 h-32 mx-auto mb-8 bg-[#00d4ff]/20 rounded-full flex items-center justify-center">
          <span className="text-5xl font-bold text-[#00d4ff] font-display">404</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4 font-display">
          Page Not Found
        </h1>
        <p className="text-gray-400 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-semibold rounded-xl hover:shadow-lg transition-all text-center focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:ring-offset-2 focus:ring-offset-[#050508]"
          >
            Go Home
          </Link>
          <Link
            href="/services"
            className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-center focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            View Services
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-gray-500 mb-4">Popular pages you might be looking for:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/services/mt4-expert-advisor-development"
              className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-full hover:bg-white/10 hover:text-white transition-all"
            >
              MT4 EA Development
            </Link>
            <Link
              href="/services/pine-script-to-mql-conversion"
              className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-full hover:bg-white/10 hover:text-white transition-all"
            >
              Pine Script Conversion
            </Link>
            <Link
              href="/tools/calculator"
              className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-full hover:bg-white/10 hover:text-white transition-all"
            >
              Profitability Calculator
            </Link>
            <Link
              href="/contact"
              className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-full hover:bg-white/10 hover:text-white transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
