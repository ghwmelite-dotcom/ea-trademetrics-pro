import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllServices, getServiceBySlug, getAllLocations, getServicePagesByServiceId } from '@/lib/data';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({ serviceSlug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = await getServiceBySlug(serviceSlug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.name} | TradeMetrics Pro`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { serviceSlug } = await params;
  const service = await getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const locations = await getAllLocations();
  // Location pages for this service (available for future use)
  const _servicePages = await getServicePagesByServiceId(service.id);
  void _servicePages; // Suppress unused warning

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li>/</li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li>/</li>
            <li className="text-white">{service.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-[#00d4ff]/10 to-[#0066ff]/10 rounded-2xl p-8 md:p-12 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {service.name}
          </h1>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl">
            {service.shortDescription}
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-[#00d4ff]/20 text-[#00d4ff] rounded-full text-sm font-semibold">
              ${service.priceRange.min} - ${service.priceRange.max} {service.priceRange.currency}
            </span>
            <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm">
              {service.timeframe}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">About This Service</h2>
              <p className="text-gray-300 leading-relaxed">{service.longDescription}</p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-[#00ff88]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            {/* Process */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Process</h2>
              <div className="space-y-4">
                {service.process.map((step) => (
                  <div key={step.step} className="flex gap-4 bg-white/5 rounded-lg p-4">
                    <div className="w-10 h-10 bg-[#00d4ff] rounded-full flex items-center justify-center font-bold text-white shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {service.faq.map((item, i) => (
                  <details key={i} className="bg-white/5 rounded-lg p-4 group">
                    <summary className="font-semibold text-white cursor-pointer list-none flex justify-between items-center">
                      {item.question}
                      <span className="text-[#00d4ff] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-gray-400">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-[#00d4ff]/20 to-[#0066ff]/20 border border-[#00d4ff]/30 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">Get Started Today</h3>
              <p className="text-gray-300 mb-6">Schedule a free consultation to discuss your project.</p>
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-semibold rounded-lg hover:shadow-lg transition-all mb-3"
              >
                Request Quote
              </Link>
              <a
                href="tel:+233XXXXXXXX"
                className="block w-full text-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
              >
                Call Us Now
              </a>
            </div>

            {/* Locations */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Available in {locations.length} Locations</h3>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {locations.slice(0, 20).map((location) => (
                  <Link
                    key={location.id}
                    href={`/services/${serviceSlug}/${location.slug}`}
                    className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full hover:bg-[#00d4ff]/20 hover:text-white transition-all"
                  >
                    {location.name}
                  </Link>
                ))}
                {locations.length > 20 && (
                  <span className="px-3 py-1 text-gray-500 text-sm">+{locations.length - 20} more</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
