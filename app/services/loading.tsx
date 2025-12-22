export default function ServicesLoading() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-4 w-24 bg-white/10 rounded mx-auto mb-4" />
          <div className="h-12 w-96 max-w-full bg-white/10 rounded mx-auto mb-4" />
          <div className="h-6 w-80 max-w-full bg-white/10 rounded mx-auto" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-2xl p-6 animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-16 h-16 bg-white/10 rounded-xl mb-4" />
              <div className="h-6 w-3/4 bg-white/10 rounded mb-2" />
              <div className="h-4 w-full bg-white/10 rounded mb-1" />
              <div className="h-4 w-5/6 bg-white/10 rounded mb-4" />
              <div className="h-8 w-24 bg-white/10 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
