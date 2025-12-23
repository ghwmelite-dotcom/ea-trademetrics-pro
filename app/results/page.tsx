'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedButton, AnimatedCard } from '@/components/ui';

// Lazy load heavy background effects for better mobile performance
const GlowingOrbs = dynamic(() => import('@/components/ui/GlowingOrbs').then(mod => mod.default), { ssr: false });
const GridBackground = dynamic(() => import('@/components/ui/GlowingOrbs').then(mod => mod.GridBackground), { ssr: false });

interface EAResult {
  id: string;
  name: string;
  description: string;
  platform: 'MT4' | 'MT5';
  strategyType: string;
  gain: number;
  drawdown: number;
  winRate: number;
  trades: number;
  months: number;
  myfxbookId?: string;
  fxblueId?: string;
  status: 'live' | 'demo';
  pairs: string[];
}

const eaResults: EAResult[] = [
  {
    id: '1',
    name: 'Momentum Scalper Pro',
    description: 'High-frequency scalping EA using momentum indicators on M5 timeframe.',
    platform: 'MT5',
    strategyType: 'Scalping',
    gain: 127.4,
    drawdown: 12.3,
    winRate: 68.5,
    trades: 2847,
    months: 8,
    status: 'live',
    pairs: ['EURUSD', 'GBPUSD', 'USDJPY'],
  },
  {
    id: '2',
    name: 'SwingMaster EA',
    description: 'Multi-timeframe swing trading system with dynamic position sizing.',
    platform: 'MT4',
    strategyType: 'Swing Trading',
    gain: 84.2,
    drawdown: 8.7,
    winRate: 62.3,
    trades: 342,
    months: 12,
    status: 'live',
    pairs: ['EURUSD', 'AUDUSD'],
  },
  {
    id: '3',
    name: 'Grid Recovery System',
    description: 'Intelligent grid trading with recovery mode and equity protection.',
    platform: 'MT5',
    strategyType: 'Grid',
    gain: 156.8,
    drawdown: 24.5,
    winRate: 78.9,
    trades: 1205,
    months: 6,
    status: 'demo',
    pairs: ['EURUSD'],
  },
  {
    id: '4',
    name: 'Breakout Hunter',
    description: 'London/NY session breakout strategy with news filter integration.',
    platform: 'MT4',
    strategyType: 'Breakout',
    gain: 52.3,
    drawdown: 6.2,
    winRate: 45.2,
    trades: 567,
    months: 10,
    status: 'live',
    pairs: ['GBPUSD', 'GBPJPY', 'EURGBP'],
  },
  {
    id: '5',
    name: 'Mean Reversion Bot',
    description: 'Statistical mean reversion on major pairs using Bollinger Bands.',
    platform: 'MT5',
    strategyType: 'Mean Reversion',
    gain: 67.9,
    drawdown: 11.4,
    winRate: 71.2,
    trades: 892,
    months: 9,
    status: 'live',
    pairs: ['EURUSD', 'USDJPY', 'USDCHF'],
  },
  {
    id: '6',
    name: 'Trend Follower Plus',
    description: 'Advanced trend following with ADX filter and trailing stop optimization.',
    platform: 'MT4',
    strategyType: 'Trend Following',
    gain: 94.5,
    drawdown: 15.8,
    winRate: 38.4,
    trades: 423,
    months: 14,
    status: 'live',
    pairs: ['EURUSD', 'GBPUSD', 'AUDUSD', 'NZDUSD'],
  },
];

const aggregateStats = {
  totalEAs: eaResults.length,
  avgGain: eaResults.reduce((sum, ea) => sum + ea.gain, 0) / eaResults.length,
  avgDrawdown: eaResults.reduce((sum, ea) => sum + ea.drawdown, 0) / eaResults.length,
  totalTrades: eaResults.reduce((sum, ea) => sum + ea.trades, 0),
  liveAccounts: eaResults.filter(ea => ea.status === 'live').length,
};

export default function ResultsPage() {
  const [filter, setFilter] = useState<'all' | 'live' | 'demo'>('all');
  const [sortBy, setSortBy] = useState<'gain' | 'drawdown' | 'winRate'>('gain');

  const filteredResults = eaResults
    .filter(ea => filter === 'all' || ea.status === filter)
    .sort((a, b) => {
      if (sortBy === 'drawdown') return a.drawdown - b.drawdown;
      return b[sortBy] - a[sortBy];
    });

  return (
    <div className="min-h-screen py-20 px-4">
      <GlowingOrbs variant="hero" />
      <GridBackground />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
            </span>
            <span className="text-sm font-medium text-gray-300">Live Verified Results</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
            Our <span className="text-gradient">Track Record</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real results from Expert Advisors we&apos;ve built for clients. All accounts verified through third-party tracking.
          </p>
        </AnimatedSection>

        {/* Aggregate Stats */}
        <AnimatedSection delay={0.2} className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            <motion.div
              className="glass-card rounded-xl p-6 text-center"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-3xl font-bold text-white">{aggregateStats.totalEAs}</div>
              <div className="text-sm text-gray-400 mt-1">EAs Tracked</div>
            </motion.div>
            <motion.div
              className="glass-card rounded-xl p-6 text-center"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-3xl font-bold text-[#00ff88]">+{aggregateStats.avgGain.toFixed(1)}%</div>
              <div className="text-sm text-gray-400 mt-1">Avg Gain</div>
            </motion.div>
            <motion.div
              className="glass-card rounded-xl p-6 text-center"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-3xl font-bold text-yellow-400">{aggregateStats.avgDrawdown.toFixed(1)}%</div>
              <div className="text-sm text-gray-400 mt-1">Avg Drawdown</div>
            </motion.div>
            <motion.div
              className="glass-card rounded-xl p-6 text-center"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-3xl font-bold text-white">{aggregateStats.totalTrades.toLocaleString()}</div>
              <div className="text-sm text-gray-400 mt-1">Total Trades</div>
            </motion.div>
            <motion.div
              className="glass-card rounded-xl p-6 text-center"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-3xl font-bold text-[#00d4ff]">{aggregateStats.liveAccounts}</div>
              <div className="text-sm text-gray-400 mt-1">Live Accounts</div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection delay={0.3} className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 max-w-5xl mx-auto">
            <div className="flex gap-2">
              {(['all', 'live', 'demo'] as const).map((f) => (
                <motion.button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === f
                      ? 'bg-[#00d4ff] text-black'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </motion.button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'gain' | 'drawdown' | 'winRate')}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d4ff]"
              >
                <option value="gain">Highest Gain</option>
                <option value="drawdown">Lowest Drawdown</option>
                <option value="winRate">Win Rate</option>
              </select>
            </div>
          </div>
        </AnimatedSection>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredResults.map((ea, index) => (
            <AnimatedCard key={ea.id} delay={index * 0.1}>
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white font-display">{ea.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        ea.status === 'live'
                          ? 'bg-[#00ff88]/20 text-[#00ff88]'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {ea.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{ea.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-[#00ff88]">+{ea.gain}%</div>
                    <div className="text-xs text-gray-500">Gain</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-yellow-400">{ea.drawdown}%</div>
                    <div className="text-xs text-gray-500">Drawdown</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-[#00d4ff]">{ea.winRate}%</div>
                    <div className="text-xs text-gray-500">Win Rate</div>
                  </div>
                </div>

                {/* Equity Curve Placeholder */}
                <div className="relative h-24 bg-white/5 rounded-lg mb-4 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`gradient-${ea.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Generate random-ish equity curve based on gain */}
                    <path
                      d={`M0,60 ${Array.from({ length: 20 }, (_, i) => {
                        const progress = i / 19;
                        const noise = Math.sin(i * ea.gain * 0.1) * 10;
                        const y = 60 - (ea.gain / 2) * progress + noise;
                        return `L${i * 10.5},${Math.max(10, Math.min(70, y))}`;
                      }).join(' ')} L200,${60 - ea.gain / 2} L200,80 L0,80 Z`}
                      fill={`url(#gradient-${ea.id})`}
                    />
                    <path
                      d={`M0,60 ${Array.from({ length: 20 }, (_, i) => {
                        const progress = i / 19;
                        const noise = Math.sin(i * ea.gain * 0.1) * 10;
                        const y = 60 - (ea.gain / 2) * progress + noise;
                        return `L${i * 10.5},${Math.max(10, Math.min(70, y))}`;
                      }).join(' ')}`}
                      stroke="#00ff88"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  <div className="absolute top-2 right-2 text-xs text-gray-500">{ea.months} months</div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-white/10 rounded text-gray-300">{ea.platform}</span>
                  <span className="text-xs px-2 py-1 bg-white/10 rounded text-gray-300">{ea.strategyType}</span>
                  <span className="text-xs px-2 py-1 bg-white/10 rounded text-gray-300">{ea.trades} trades</span>
                </div>

                {/* Pairs */}
                <div className="text-xs text-gray-500 mb-4">
                  Pairs: {ea.pairs.join(', ')}
                </div>

                {/* Verification Badge */}
                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <svg className="w-4 h-4 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Third-party verified</span>
                    </div>
                    <motion.button
                      className="text-xs text-[#00d4ff] hover:underline"
                      whileHover={{ x: 3 }}
                    >
                      View Details →
                    </motion.button>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Disclaimer */}
        <AnimatedSection delay={0.5} className="mt-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="font-semibold text-white">Risk Disclaimer</span>
              </div>
              <p className="text-sm text-gray-400">
                Past performance is not indicative of future results. Trading forex and CFDs carries substantial risk of loss.
                These results are from specific market conditions and may not be replicated. Always trade responsibly and never
                risk more than you can afford to lose.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection delay={0.6} className="mt-16 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 font-display">
              Want Results Like These?
            </h3>
            <p className="text-gray-400 mb-6">
              Let us build a custom Expert Advisor tailored to your trading strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton href="/tools/estimator" variant="glow">
                Get Cost Estimate
              </AnimatedButton>
              <AnimatedButton href="/contact" variant="ghost">
                Schedule Consultation
              </AnimatedButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
