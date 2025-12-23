import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllLocations, getLocationBySlug, getAllServices, getServicePagesByLocationId } from '@/lib/data';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const locations = await getAllLocations();
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);
  if (!location) return { title: 'Location Not Found' };

  return {
    title: `EA Development Services in ${location.name} | TradeMetrics Pro`,
    description: `Professional MT4/MT5 Expert Advisor development in ${location.name}, Ghana. Custom trading bots and TradingView strategy conversion.`,
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);
  if (!location) notFound();

  const services = await getAllServices();
  // Service pages for this location (available for future use)
  const _locationPages = await getServicePagesByLocationId(location.id);
  void _locationPages; // Suppress unused warning

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li>/</li>
            <li><Link href="/locations" className="hover:text-white">Locations</Link></li>
            <li>/</li>
            <li className="text-white">{location.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-[#00d4ff]/10 to-[#0066ff]/10 rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-[#00d4ff]/20 text-[#00d4ff] text-sm rounded-full capitalize">
              {location.type}
            </span>
            <span className="text-gray-400 text-sm">
              {location.distanceFromMain.value}km from Accra Central
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            EA Development Services in {location.name}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            {location.description}. Professional MT4/MT5 Expert Advisor development serving {location.name} and surrounding areas.
          </p>
        </div>

        {/* Services Available */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Services Available in {location.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}/${slug}`}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#00d4ff]/30 transition-all"
              >
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {service.shortDescription}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#00d4ff]">
                    From ${service.priceRange.min}
                  </span>
                  <span className="text-gray-500">{service.timeframe}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white/5 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Why Choose TradeMetrics Pro in {location.name}?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Local Expertise</h3>
                <p className="text-gray-400 text-sm">Understanding of local trading conditions and broker availability</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Fast Communication</h3>
                <p className="text-gray-400 text-sm">Same timezone support for quick responses</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-2xl">💳</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Local Payment</h3>
                <p className="text-gray-400 text-sm">Accept mobile money and local bank transfers</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Project in {location.name}?
          </h2>
          <p className="text-gray-300 mb-6">
            Schedule a free consultation to discuss your EA development needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/30 transition-all"
            >
              Get Free Consultation
            </Link>
            <a
              href="tel:+233XXXXXXXX"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
