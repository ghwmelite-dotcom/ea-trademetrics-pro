'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load heavy animation components with no SSR
// This significantly reduces initial JavaScript bundle and improves LCP

export const LazyGlowingOrbs = dynamic(
  () => import('./GlowingOrbs').then(mod => mod.default),
  {
    ssr: false,
    loading: () => null // No placeholder needed for background effects
  }
);

export const LazyFloatingParticles = dynamic(
  () => import('./GlowingOrbs').then(mod => mod.FloatingParticles),
  {
    ssr: false,
    loading: () => null
  }
);

export const LazyGridBackground = dynamic(
  () => import('./GlowingOrbs').then(mod => mod.GridBackground),
  {
    ssr: false,
    loading: () => null
  }
);

// Lazy load animated components that aren't above the fold
export const LazyAnimatedCounter = dynamic(
  () => import('./AnimatedCounter').then(mod => mod.default),
  {
    ssr: true,
    loading: () => <div className="animate-pulse h-12 bg-white/5 rounded" />
  }
);

export const LazyStatsRow = dynamic(
  () => import('./AnimatedCounter').then(mod => mod.StatsRow),
  {
    ssr: true,
    loading: () => <div className="animate-pulse h-24 bg-white/5 rounded" />
  }
);

// Wrapper component that defers rendering until idle
export function DeferredRender({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

// Mobile-optimized orbs with reduced animations
export function OptimizedGlowingOrbs({ variant = 'hero' }: { variant?: 'hero' | 'section' | 'subtle' }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static gradient backgrounds instead of animated orbs on initial load */}
      <div
        className={`absolute rounded-full blur-3xl ${
          variant === 'hero'
            ? 'w-[400px] h-[400px] top-[-150px] right-[-100px] bg-gradient-radial from-[#00d4ff]/20 to-transparent'
            : variant === 'section'
            ? 'w-[300px] h-[300px] top-[-80px] right-[-50px] bg-gradient-radial from-[#00d4ff]/15 to-transparent'
            : 'w-[200px] h-[200px] top-[10%] right-[10%] bg-gradient-radial from-[#00d4ff]/10 to-transparent'
        }`}
        style={{ opacity: 0.6 }}
      />
      <div
        className={`absolute rounded-full blur-3xl ${
          variant === 'hero'
            ? 'w-[350px] h-[350px] bottom-[-120px] left-[-80px] bg-gradient-radial from-[#0066ff]/15 to-transparent'
            : variant === 'section'
            ? 'w-[220px] h-[220px] bottom-[-60px] left-[-40px] bg-gradient-radial from-[#0066ff]/10 to-transparent'
            : 'w-[150px] h-[150px] bottom-[20%] left-[5%] bg-gradient-radial from-[#0066ff]/10 to-transparent'
        }`}
        style={{ opacity: 0.5 }}
      />
    </div>
  );
}
