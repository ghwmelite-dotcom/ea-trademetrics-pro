import Link from 'next/link';
import { getAllServices } from '@/lib/data';
import { Metadata } from 'next';
import ServicesHeader from '@/components/ServicesHeader';
import ServicePriceDisplay from '@/components/ServicePriceDisplay';

export const metadata: Metadata = {
  title: 'EA Development Services | TradeMetrics Pro',
  description: 'Professional Expert Advisor development services for MT4/MT5. Custom trading bots, Pine Script conversion, backtesting, and more.',
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto">
        {/* Header with Currency Selector */}
        <ServicesHeader />

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#00d4ff]/30 transition-all"
            >
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#00d4ff] transition-colors">
                {service.name}
              </h2>
              <p className="text-gray-400 mb-4 line-clamp-3">
                {service.shortDescription}
              </p>
              <div className="flex items-center justify-between">
                <ServicePriceDisplay
                  min={service.priceRange.min}
                  max={service.priceRange.max}
                  className="text-[#00d4ff] font-semibold"
                />
                <span className="text-sm text-gray-500">
                  {service.timeframe}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/30 transition-all"
          >
            Get Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
