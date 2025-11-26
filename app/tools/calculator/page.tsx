'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedButton, GlowingOrbs, GridBackground } from '@/components/ui';

interface SimulationResult {
  month: number;
  balance: number;
  percentile: number;
}

export default function CalculatorPage() {
  const [formData, setFormData] = useState({
    startingCapital: 10000,
    winRate: 55,
    riskRewardRatio: 2,
    riskPerTrade: 2,
    tradesPerMonth: 20,
    months: 12,
  });

  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');

  // Monte Carlo Simulation
  const simulationResults = useMemo(() => {
    if (!showResults) return null;

    const { startingCapital, winRate, riskRewardRatio, riskPerTrade, tradesPerMonth, months } = formData;
    const numSimulations = 1000;
    const winProb = winRate / 100;
    const riskFraction = riskPerTrade / 100;

    const allSimulations: number[][] = [];

    for (let sim = 0; sim < numSimulations; sim++) {
      let balance = startingCapital;
      const balanceHistory = [balance];

      for (let month = 0; month < months; month++) {
        for (let trade = 0; trade < tradesPerMonth; trade++) {
          const isWin = Math.random() < winProb;
          const tradeResult = isWin
            ? balance * riskFraction * riskRewardRatio
            : -balance * riskFraction;
          balance = Math.max(0, balance + tradeResult);
        }
        balanceHistory.push(balance);
      }
      allSimulations.push(balanceHistory);
    }

    // Calculate percentiles
    const getPercentileAtMonth = (month: number, percentile: number) => {
      const values = allSimulations.map(sim => sim[month]).sort((a, b) => a - b);
      const index = Math.floor(values.length * percentile / 100);
      return values[index];
    };

    const percentiles = {
      p10: Array.from({ length: months + 1 }, (_, i) => ({
        month: i,
        balance: getPercentileAtMonth(i, 10),
        percentile: 10,
      })),
      p25: Array.from({ length: months + 1 }, (_, i) => ({
        month: i,
        balance: getPercentileAtMonth(i, 25),
        percentile: 25,
      })),
      p50: Array.from({ length: months + 1 }, (_, i) => ({
        month: i,
        balance: getPercentileAtMonth(i, 50),
        percentile: 50,
      })),
      p75: Array.from({ length: months + 1 }, (_, i) => ({
        month: i,
        balance: getPercentileAtMonth(i, 75),
        percentile: 75,
      })),
      p90: Array.from({ length: months + 1 }, (_, i) => ({
        month: i,
        balance: getPercentileAtMonth(i, 90),
        percentile: 90,
      })),
    };

    // Calculate statistics
    const finalBalances = allSimulations.map(sim => sim[sim.length - 1]);
    const avgFinal = finalBalances.reduce((a, b) => a + b, 0) / finalBalances.length;
    const profitableRuns = finalBalances.filter(b => b > startingCapital).length;
    const maxDrawdownRuns = allSimulations.map(sim => {
      let maxDD = 0;
      let peak = sim[0];
      for (const balance of sim) {
        if (balance > peak) peak = balance;
        const dd = (peak - balance) / peak * 100;
        if (dd > maxDD) maxDD = dd;
      }
      return maxDD;
    });
    const avgMaxDrawdown = maxDrawdownRuns.reduce((a, b) => a + b, 0) / maxDrawdownRuns.length;

    return {
      percentiles,
      stats: {
        avgFinalBalance: avgFinal,
        avgReturn: ((avgFinal - startingCapital) / startingCapital) * 100,
        profitableProbability: (profitableRuns / numSimulations) * 100,
        avgMaxDrawdown,
        medianFinal: percentiles.p50[percentiles.p50.length - 1].balance,
        bestCase: percentiles.p90[percentiles.p90.length - 1].balance,
        worstCase: percentiles.p10[percentiles.p10.length - 1].balance,
      },
    };
  }, [formData, showResults]);

  const handleInputChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setShowResults(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const maxBalance = simulationResults
    ? Math.max(...simulationResults.percentiles.p90.map(p => p.balance))
    : formData.startingCapital * 2;

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
            <span className="text-[#00ff88]">📊</span>
            <span className="text-sm font-medium text-gray-300">Free Tool</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
            Strategy <span className="text-gradient">Profitability Calculator</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Run 1,000 Monte Carlo simulations to see how your strategy could perform over time.
            Understand your edge before you trade.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Input Form */}
          <AnimatedSection delay={0.2}>
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 font-display">Strategy Parameters</h2>

              <div className="space-y-6">
                {/* Starting Capital */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Starting Capital
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={formData.startingCapital}
                      onChange={(e) => handleInputChange('startingCapital', Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:border-[#00d4ff] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Win Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Win Rate: <span className="text-[#00d4ff]">{formData.winRate}%</span>
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="80"
                    value={formData.winRate}
                    onChange={(e) => handleInputChange('winRate', Number(e.target.value))}
                    className="w-full accent-[#00d4ff]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>30%</span>
                    <span>80%</span>
                  </div>
                </div>

                {/* Risk:Reward Ratio */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Risk:Reward Ratio: <span className="text-[#00d4ff]">1:{formData.riskRewardRatio}</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.1"
                    value={formData.riskRewardRatio}
                    onChange={(e) => handleInputChange('riskRewardRatio', Number(e.target.value))}
                    className="w-full accent-[#00d4ff]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1:0.5</span>
                    <span>1:5</span>
                  </div>
                </div>

                {/* Risk Per Trade */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Risk Per Trade: <span className="text-[#00d4ff]">{formData.riskPerTrade}%</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={formData.riskPerTrade}
                    onChange={(e) => handleInputChange('riskPerTrade', Number(e.target.value))}
                    className="w-full accent-[#00d4ff]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0.5%</span>
                    <span>5%</span>
                  </div>
                </div>

                {/* Trades Per Month */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Trades Per Month: <span className="text-[#00d4ff]">{formData.tradesPerMonth}</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={formData.tradesPerMonth}
                    onChange={(e) => handleInputChange('tradesPerMonth', Number(e.target.value))}
                    className="w-full accent-[#00d4ff]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Simulation Period */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Simulation Period: <span className="text-[#00d4ff]">{formData.months} months</span>
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="36"
                    value={formData.months}
                    onChange={(e) => handleInputChange('months', Number(e.target.value))}
                    className="w-full accent-[#00d4ff]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>3 months</span>
                    <span>36 months</span>
                  </div>
                </div>

                <motion.button
                  onClick={() => setShowResults(true)}
                  className="w-full py-4 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-bold rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Run 1,000 Simulations
                </motion.button>
              </div>
            </div>
          </AnimatedSection>

          {/* Results */}
          <AnimatedSection delay={0.4}>
            <div className="glass-card rounded-2xl p-8 h-full">
              <h2 className="text-2xl font-bold text-white mb-6 font-display">Simulation Results</h2>

              {!showResults ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <div className="text-6xl mb-4">📈</div>
                  <p className="text-gray-400">Configure your strategy parameters and click "Run Simulations" to see projected outcomes.</p>
                </div>
              ) : simulationResults && (
                <div className="space-y-6">
                  {/* Monte Carlo Chart */}
                  <div className="relative h-64 bg-white/5 rounded-xl p-4">
                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                      {/* P10-P90 Band */}
                      <path
                        d={`M ${simulationResults.percentiles.p10.map((p, i) =>
                          `${(i / formData.months) * 400},${200 - (p.balance / maxBalance) * 180}`
                        ).join(' L ')} L ${simulationResults.percentiles.p90.map((p, i) =>
                          `${((formData.months - i) / formData.months) * 400},${200 - (simulationResults.percentiles.p90[formData.months - i].balance / maxBalance) * 180}`
                        ).join(' L ')} Z`}
                        fill="rgba(0, 212, 255, 0.1)"
                      />
                      {/* P25-P75 Band */}
                      <path
                        d={`M ${simulationResults.percentiles.p25.map((p, i) =>
                          `${(i / formData.months) * 400},${200 - (p.balance / maxBalance) * 180}`
                        ).join(' L ')} L ${simulationResults.percentiles.p75.map((p, i) =>
                          `${((formData.months - i) / formData.months) * 400},${200 - (simulationResults.percentiles.p75[formData.months - i].balance / maxBalance) * 180}`
                        ).join(' L ')} Z`}
                        fill="rgba(0, 212, 255, 0.2)"
                      />
                      {/* Median Line */}
                      <path
                        d={`M ${simulationResults.percentiles.p50.map((p, i) =>
                          `${(i / formData.months) * 400},${200 - (p.balance / maxBalance) * 180}`
                        ).join(' L ')}`}
                        stroke="#00d4ff"
                        strokeWidth="3"
                        fill="none"
                      />
                      {/* Starting Capital Line */}
                      <line
                        x1="0"
                        y1={200 - (formData.startingCapital / maxBalance) * 180}
                        x2="400"
                        y2={200 - (formData.startingCapital / maxBalance) * 180}
                        stroke="#666"
                        strokeDasharray="5,5"
                      />
                    </svg>
                    <div className="absolute bottom-2 left-4 text-xs text-gray-500">Month 0</div>
                    <div className="absolute bottom-2 right-4 text-xs text-gray-500">Month {formData.months}</div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-[#00d4ff]"></div>
                      <span className="text-gray-400">Median (50th)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#00d4ff]/20"></div>
                      <span className="text-gray-400">25th-75th percentile</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#00d4ff]/10"></div>
                      <span className="text-gray-400">10th-90th percentile</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Median Final Balance</div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(simulationResults.stats.medianFinal)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Probability of Profit</div>
                      <div className="text-2xl font-bold text-[#00ff88]">{simulationResults.stats.profitableProbability.toFixed(1)}%</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Best Case (90th)</div>
                      <div className="text-2xl font-bold text-[#00d4ff]">{formatCurrency(simulationResults.stats.bestCase)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Worst Case (10th)</div>
                      <div className="text-2xl font-bold text-red-400">{formatCurrency(simulationResults.stats.worstCase)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 col-span-2">
                      <div className="text-sm text-gray-400 mb-1">Average Max Drawdown</div>
                      <div className="text-2xl font-bold text-yellow-400">{simulationResults.stats.avgMaxDrawdown.toFixed(1)}%</div>
                    </div>
                  </div>

                  {/* Email Capture */}
                  <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 rounded-xl p-4 border border-[#00d4ff]/20">
                    <p className="text-sm text-gray-300 mb-3">Get a detailed PDF report with all simulation data:</p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-[#00d4ff] focus:outline-none"
                      />
                      <motion.button
                        className="px-4 py-2 bg-[#00d4ff] text-black font-medium rounded-lg text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Send Report
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>

        {/* CTA Section */}
        <AnimatedSection delay={0.6} className="mt-16 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 font-display">
              Ready to Automate This Strategy?
            </h3>
            <p className="text-gray-400 mb-6">
              Let us convert your profitable strategy into a fully automated Expert Advisor that trades 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton href="/tools/estimator" variant="glow">
                Get Cost Estimate
              </AnimatedButton>
              <AnimatedButton href="/contact" variant="ghost">
                Book Consultation
              </AnimatedButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
