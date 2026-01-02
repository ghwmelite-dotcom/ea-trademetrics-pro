import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllServicePages, getServicePageBySlug } from '@/lib/data';
import { Metadata } from 'next';
import { PricingInfo } from '@/components/ServicePriceDisplay';
import CurrencySelector from '@/components/CurrencySelector';

interface Props {
  params: Promise<{ serviceSlug: string; locationSlug: string }>;
}

export async function generateStaticParams() {
  const pages = await getAllServicePages();
  return pages.map((page) => ({
    serviceSlug: page.serviceId || page.slug?.split('-').slice(0, -1).join('-'),
    locationSlug: page.locationId || page.slug?.split('-').pop(),
  })).filter(p => p.serviceSlug && p.locationSlug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug, locationSlug } = await params;
  const slug = `${serviceSlug}-${locationSlug}`;
  const page = await getServicePageBySlug(slug);

  if (!page) return { title: 'Page Not Found' };

  return {
    title: page.pageTitle,
    description: page.metaDescription,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractImages(images: any) {
  if (!images) return { heroImage: null, galleryImages: [] };

  // Handle object format { heroImage, gallery }
  if (images.heroImage) {
    return {
      heroImage: images.heroImage,
      galleryImages: images.gallery || [],
    };
  }

  // Handle array format
  if (Array.isArray(images)) {
    return {
      heroImage: images[0] || null,
      galleryImages: images.slice(1),
    };
  }

  return { heroImage: null, galleryImages: [] };
}

export default async function ServiceLocationPage({ params }: Props) {
  const { serviceSlug, locationSlug } = await params;
  const slug = `${serviceSlug}-${locationSlug}`;
  const page = await getServicePageBySlug(slug);

  if (!page) notFound();

  const { heroImage, galleryImages } = extractImages(page.images);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-[#00d4ff]/10 to-[#0066ff]/10">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li>/</li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li>/</li>
              <li><Link href={`/services/${serviceSlug}`} className="hover:text-white">{page.serviceName || page.service}</Link></li>
              <li>/</li>
              <li className="text-white">{page.locationName || page.location}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {page.heroHeadline}
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {page.heroSubheadline}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/30 transition-all"
                >
                  {page.cta?.primary || page.ctaText || 'Get Started'}
                </Link>
                <a
                  href={`tel:${page.cta?.phone || page.ctaPhone || '+233XXXXXXXX'}`}
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                >
                  Call Now
                </a>
              </div>
            </div>
            {heroImage && (
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
                <Image
                  src={heroImage.url}
                  alt={heroImage.alt || page.heroHeadline}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  {page.serviceName || page.service} in {page.locationName || page.location}
                </h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  {page.localizedContent?.intro && <p>{page.localizedContent.intro}</p>}
                  {page.description && <p>{page.description}</p>}
                </div>
              </div>

              {/* Benefits */}
              {(page.localizedContent?.localBenefits || page.benefits) && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Why Choose Us</h2>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {(page.localizedContent?.localBenefits || page.benefits)?.map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-[#00ff88]">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Process */}
              {page.process && page.process.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Our Process</h2>
                  <div className="space-y-4">
                    {page.process.map((step: { step: number; title: string; description: string }) => (
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
                </div>
              )}

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.map((img: { url: string; alt?: string }, i: number) => (
                      <div key={i} className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={img.url}
                          alt={img.alt || `Gallery image ${i + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {page.faq && page.faq.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">FAQ</h2>
                  <div className="space-y-4">
                    {page.faq.map((item: { question: string; answer: string }, i: number) => (
                      <details key={i} className="bg-white/5 rounded-lg p-4 group">
                        <summary className="font-semibold text-white cursor-pointer list-none flex justify-between items-center">
                          {item.question}
                          <span className="text-[#00d4ff] group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-gray-400">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-[#00d4ff]/20 to-[#0066ff]/20 border border-[#00d4ff]/30 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-2">
                  Get {page.serviceName || page.service}
                </h3>
                <p className="text-gray-300 mb-6">
                  Serving {page.locationName || page.location} and surrounding areas.
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-semibold rounded-lg hover:shadow-lg transition-all mb-3"
                >
                  {page.cta?.primary || page.ctaText || 'Request Quote'}
                </Link>
                <a
                  href={`https://wa.me/${(page.cta?.whatsapp || page.ctaPhone || '').replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BA5C] transition-all mb-3"
                >
                  WhatsApp Us
                </a>
                <a
                  href={`tel:${page.cta?.phone || page.ctaPhone || '+233XXXXXXXX'}`}
                  className="block w-full text-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                >
                  Call Now
                </a>
              </div>

              {/* Pricing */}
              {(page.pricing || page.pricingInfo) && (
                <div className="bg-white/5 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Pricing</h3>
                    <CurrencySelector />
                  </div>
                  <PricingInfo
                    pricingInfo={page.pricingInfo}
                    min={page.pricing?.min || 3153}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
