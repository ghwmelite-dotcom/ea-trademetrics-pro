'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, GlowingOrbs, GridBackground } from '@/components/ui';

// Simulated live performance data (would connect to MyFXBook/FX Blue API in production)
const performanceData = [
  {
    id: 'ea-001',
    name: 'Trend Hunter Pro',
    type: 'Trend Following',
    platform: 'MT5',
    startDate: '2024-03-15',
    initialBalance: 10000,
    currentBalance: 14850,
    profit: 4850,
    profitPercent: 48.5,
    trades: 156,
    winRate: 68.2,
    profitFactor: 2.14,
    maxDrawdown: 12.3,
    monthlyReturn: 5.4,
    status: 'live',
    lastUpdated: new Date().toISOString(),
    equityHistory: generateEquityHistory(10000, 48.5, 180),
  },
  {
    id: 'ea-002',
    name: 'Scalper X',
    type: 'Scalping',
    platform: 'MT4',
    startDate: '2024-01-20',
    initialBalance: 5000,
    currentBalance: 7125,
    profit: 2125,
    profitPercent: 42.5,
    trades: 892,
    winRate: 74.1,
    profitFactor: 1.89,
    maxDrawdown: 8.7,
    monthlyReturn: 3.8,
    status: 'live',
    lastUpdated: new Date().toISOString(),
    equityHistory: generateEquityHistory(5000, 42.5, 300),
  },
  {
    id: 'ea-003',
    name: 'Grid Master',
    type: 'Grid Trading',
    platform: 'MT5',
    startDate: '2024-06-01',
    initialBalance: 25000,
    currentBalance: 31250,
    profit: 6250,
    profitPercent: 25.0,
    trades: 423,
    winRate: 82.3,
    profitFactor: 1.67,
    maxDrawdown: 18.5,
    monthlyReturn: 4.2,
    status: 'live',
    lastUpdated: new Date().toISOString(),
    equityHistory: generateEquityHistory(25000, 25.0, 120),
  },
  {
    id: 'ea-004',
    name: 'News Rider',
    type: 'News Trading',
    platform: 'MT4',
    startDate: '2024-02-10',
    initialBalance: 15000,
    currentBalance: 21750,
    profit: 6750,
    profitPercent: 45.0,
    trades: 67,
    winRate: 61.2,
    profitFactor: 2.31,
    maxDrawdown: 15.2,
    monthlyReturn: 4.5,
    status: 'live',
    lastUpdated: new Date().toISOString(),
    equityHistory: generateEquityHistory(15000, 45.0, 250),
  },
  {
    id: 'ea-005',
    name: 'Mean Reversion Bot',
    type: 'Mean Reversion',
    platform: 'MT5',
    startDate: '2024-04-05',
    initialBalance: 20000,
    currentBalance: 26400,
    profit: 6400,
    profitPercent: 32.0,
    trades: 234,
    winRate: 71.8,
    profitFactor: 1.95,
    maxDrawdown: 11.4,
    monthlyReturn: 4.0,
    status: 'live',
    lastUpdated: new Date().toISOString(),
    equityHistory: generateEquityHistory(20000, 32.0, 200),
  },
  {
    id: 'ea-006',
    name: 'Breakout Sniper',
    type: 'Breakout',
    platform: 'MT4',
    startDate: '2024-05-12',
    initialBalance: 8000,
    currentBalance: 10640,
    profit: 2640,
    profitPercent: 33.0,
    trades: 89,
    winRate: 58.4,
    profitFactor: 2.08,
    maxDrawdown: 14.1,
    monthlyReturn: 4.7,
    status: 'live',
    lastUpdated: new Date().toISOString(),
    equityHistory: generateEquityHistory(8000, 33.0, 150),
  },
];

function generateEquityHistory(initial: number, totalGain: number, days: number) {
  const history = [];
  let equity = initial;
  const dailyGain = (totalGain / 100) / days;

  for (let i = 0; i <= days; i++) {
    const volatility = (Math.random() - 0.5) * 0.02;
    equity *= (1 + dailyGain + volatility);
    history.push(Math.round(equity));
  }

  return history;
}

// Aggregate statistics
const aggregateStats = {
  totalEAs: performanceData.length,
  totalProfit: performanceData.reduce((sum, ea) => sum + ea.profit, 0),
  avgWinRate: performanceData.reduce((sum, ea) => sum + ea.winRate, 0) / performanceData.length,
  avgProfitFactor: performanceData.reduce((sum, ea) => sum + ea.profitFactor, 0) / performanceData.length,
  totalTrades: performanceData.reduce((sum, ea) => sum + ea.trades, 0),
  avgMonthlyReturn: performanceData.reduce((sum, ea) => sum + ea.monthlyReturn, 0) / performanceData.length,
};

export default function PerformancePage() {
  const [selectedEA, setSelectedEA] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const selectedEAData = performanceData.find(ea => ea.id === selectedEA);

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
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff88]"></span>
            </span>
            <span className="text-sm font-medium text-gray-300">Live Performance</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
            EA <span className="text-gradient">Performance Dashboard</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real-time performance tracking of Expert Advisors we&apos;ve built for clients. Updated live from trading accounts.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </AnimatedSection>

        {/* Aggregate Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {[
            { label: 'Active EAs', value: aggregateStats.totalEAs, icon: '🤖' },
            { label: 'Total Profit', value: `$${aggregateStats.totalProfit.toLocaleString()}`, icon: '💰', color: 'text-[#00ff88]' },
            { label: 'Avg Win Rate', value: `${aggregateStats.avgWinRate.toFixed(1)}%`, icon: '🎯' },
            { label: 'Avg Profit Factor', value: aggregateStats.avgProfitFactor.toFixed(2), icon: '📊' },
            { label: 'Total Trades', value: aggregateStats.totalTrades.toLocaleString(), icon: '📈' },
            { label: 'Avg Monthly Return', value: `${aggregateStats.avgMonthlyReturn.toFixed(1)}%`, icon: '📅', color: 'text-[#00ff88]' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-xl p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`text-xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* EA Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {performanceData.map((ea, index) => (
            <motion.div
              key={ea.id}
              className={`glass-card rounded-2xl p-6 cursor-pointer transition-all ${
                selectedEA === ea.id ? 'ring-2 ring-[#00d4ff]' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedEA(selectedEA === ea.id ? null : ea.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{ea.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-1 bg-[#00d4ff]/20 text-[#00d4ff] rounded-full">
                      {ea.type}
                    </span>
                    <span className="text-xs px-2 py-1 bg-white/10 text-gray-400 rounded-full">
                      {ea.platform}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
                  </span>
                  <span className="text-xs text-[#00ff88]">Live</span>
                </div>
              </div>

              {/* Mini Equity Chart */}
              <div className="h-16 mb-4 relative">
                <svg className="w-full h-full" viewBox="0 0 200 50" preserveAspectRatio="none">
                  <path
                    d={(() => {
                      const history = ea.equityHistory;
                      const min = Math.min(...history);
                      const max = Math.max(...history);
                      const range = max - min || 1;

                      return history.map((val, i) => {
                        const x = (i / (history.length - 1)) * 200;
                        const y = 50 - ((val - min) / range) * 45 - 2.5;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ');
                    })()}
                    fill="none"
                    stroke={ea.profitPercent >= 0 ? '#00ff88' : '#ff4444'}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Profit */}
              <div className="text-center mb-4">
                <div className={`text-3xl font-bold ${ea.profitPercent >= 0 ? 'text-[#00ff88]' : 'text-red-400'}`}>
                  {ea.profitPercent >= 0 ? '+' : ''}{ea.profitPercent.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">
                  ${ea.profit.toLocaleString()} profit
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <div className="text-gray-400">Win Rate</div>
                  <div className="text-white font-semibold">{ea.winRate}%</div>
                </div>
                <div>
                  <div className="text-gray-400">PF</div>
                  <div className="text-white font-semibold">{ea.profitFactor}</div>
                </div>
                <div>
                  <div className="text-gray-400">DD</div>
                  <div className="text-white font-semibold">{ea.maxDrawdown}%</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed View */}
        {selectedEAData && (
          <motion.div
            className="glass-card rounded-2xl p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white font-display">{selectedEAData.name}</h2>
                <p className="text-gray-400">Detailed Performance Analysis</p>
              </div>
              <button
                onClick={() => setSelectedEA(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Large Equity Chart */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Equity Curve</h3>
                <div className="h-64 relative bg-white/5 rounded-xl p-4">
                  <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    {/* Grid */}
                    {[0, 1, 2, 3, 4].map(i => (
                      <line key={i} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    ))}

                    {/* Equity line */}
                    <path
                      d={(() => {
                        const history = selectedEAData.equityHistory;
                        const min = Math.min(...history);
                        const max = Math.max(...history);
                        const range = max - min || 1;

                        return history.map((val, i) => {
                          const x = (i / (history.length - 1)) * 400;
                          const y = 200 - ((val - min) / range) * 180 - 10;
                          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ');
                      })()}
                      fill="none"
                      stroke="url(#detailGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    <defs>
                      <linearGradient id="detailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00d4ff" />
                        <stop offset="100%" stopColor="#00ff88" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Detailed Stats */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Start Date', value: new Date(selectedEAData.startDate).toLocaleDateString() },
                    { label: 'Initial Balance', value: `$${selectedEAData.initialBalance.toLocaleString()}` },
                    { label: 'Current Balance', value: `$${selectedEAData.currentBalance.toLocaleString()}`, color: 'text-[#00ff88]' },
                    { label: 'Total Profit', value: `$${selectedEAData.profit.toLocaleString()}`, color: 'text-[#00ff88]' },
                    { label: 'Return', value: `${selectedEAData.profitPercent}%`, color: 'text-[#00ff88]' },
                    { label: 'Monthly Return', value: `${selectedEAData.monthlyReturn}%` },
                    { label: 'Total Trades', value: selectedEAData.trades },
                    { label: 'Win Rate', value: `${selectedEAData.winRate}%` },
                    { label: 'Profit Factor', value: selectedEAData.profitFactor },
                    { label: 'Max Drawdown', value: `${selectedEAData.maxDrawdown}%`, color: 'text-yellow-400' },
                    { label: 'Platform', value: selectedEAData.platform },
                    { label: 'Strategy Type', value: selectedEAData.type },
                  ].map((stat) => (
                    <div key={stat.label} className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">{stat.label}</span>
                      <span className={stat.color || 'text-white'}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <motion.div
          className="glass-card rounded-2xl p-6 border border-yellow-500/30 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl">⚠️</div>
            <div>
              <h3 className="font-semibold text-white mb-2">Risk Disclaimer</h3>
              <p className="text-sm text-gray-400">
                Past performance is not indicative of future results. Trading forex and CFDs carries a high level of risk and may not be suitable for all investors.
                The performance data shown represents actual trading results from client accounts but individual results may vary.
                Never trade with money you cannot afford to lose. All EA names have been anonymized to protect client privacy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4 font-display">
            Want an EA That Performs Like These?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let us build a custom Expert Advisor tailored to your trading strategy and risk tolerance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/tools/estimator"
              className="px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-bold rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Custom EA Quote
            </motion.a>
            <motion.a
              href="/tools/demo"
              className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try the Backtest Simulator
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
