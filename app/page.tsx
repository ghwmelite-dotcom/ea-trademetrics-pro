import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/10 to-[#0066ff]/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-full mb-6">
              <span className="text-sm font-semibold text-white">Trusted by 200+ Traders Worldwide</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Turn Your Trading Strategy Into a
              <span className="block mt-2 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent">
                Profitable Robot
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Expert MT4/MT5 EA development and TradingView strategy conversion.
              Get a custom-coded trading bot that executes your strategy 24/7 with precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/30 transition-all"
              >
                Start Your Project
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                View Services
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00d4ff] mb-1">400+</div>
                <div className="text-sm text-gray-400">Service Pages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00d4ff] mb-1">12</div>
                <div className="text-sm text-gray-400">Services</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00d4ff] mb-1">52+</div>
                <div className="text-sm text-gray-400">Locations Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00d4ff] mb-1">98%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#00d4ff]/10 to-[#0066ff]/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Automate Your Trading?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation to discuss your project. No obligations, just expert advice.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/30 transition-all"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
