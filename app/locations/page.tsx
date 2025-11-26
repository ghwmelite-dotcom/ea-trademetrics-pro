import Link from 'next/link';
import { getAllLocations } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Locations in Ghana | TradeMetrics Pro EA Development',
  description: 'TradeMetrics Pro serves 52+ locations across Greater Accra Region. Find EA development services near you in Accra, Tema, East Legon, and more.',
};

export default async function LocationsPage() {
  const locations = await getAllLocations();

  // Group locations by type
  const groupedLocations = locations.reduce((acc, loc) => {
    const type = loc.type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(loc);
    return acc;
  }, {} as Record<string, typeof locations>);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Service Locations
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Serving {locations.length}+ locations across Greater Accra Region, Ghana.
            Find professional EA development services near you.
          </p>
        </div>

        {/* Location Groups */}
        {Object.entries(groupedLocations).map(([type, locs]) => (
          <section key={type} className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 capitalize">
              {type}s ({locs.length})
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {locs.map((location) => (
                <Link
                  key={location.id}
                  href={`/locations/${location.slug}`}
                  className="group bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-[#00d4ff]/30 transition-all"
                >
                  <h3 className="font-semibold text-white group-hover:text-[#00d4ff] transition-colors">
                    {location.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {location.distanceFromMain.value}km from Accra Central
                  </p>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {location.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="text-center mt-12 bg-gradient-to-r from-[#00d4ff]/10 to-[#0066ff]/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Don&apos;t See Your Location?
          </h2>
          <p className="text-gray-300 mb-6">
            We serve clients globally via remote consultation. Contact us to discuss your project.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/30 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
