export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-[#00d4ff]/20 rounded-full" />
          {/* Spinning ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-[#00d4ff] rounded-full animate-spin" />
          {/* Inner dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-[#00d4ff] rounded-full animate-pulse" />
          </div>
        </div>

        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}
