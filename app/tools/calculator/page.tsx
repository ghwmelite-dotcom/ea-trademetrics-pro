'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedButton, GlowingOrbs, GridBackground } from '@/components/ui';
import { SoftwareToolSchema } from '@/components/StructuredData';
import { useMonteCarloWorker, runSimulationSync } from '@/lib/useMonteCarloWorker';
import { validateCalculatorForm } from '@/lib/validations';
import { siteConfig } from '@/lib/config';

export default function CalculatorPage() {
  const [formData, setFormData] = useState({
    startingCapital: 10000,
    winRate: 55,
    riskRewardRatio: 2,
    riskPerTrade: 2,
    tradesPerMonth: 20,
    months: 12,
  });

  const [email, setEmail] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Use Web Worker for simulations
  const {
    runSimulation,
    results: workerResults,
    isRunning,
    progress,
    error: workerError,
    isSupported: workerSupported,
  } = useMonteCarloWorker();

  // Fallback results for when worker isn't supported
  const [fallbackResults, setFallbackResults] = useState<ReturnType<typeof runSimulationSync> | null>(null);

  const simulationResults = workerResults || fallbackResults;
  const showResults = simulationResults !== null;

  const handleInputChange = useCallback((field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear results when parameters change
    setFallbackResults(null);
  }, []);

  const handleRunSimulation = useCallback(() => {
    // Validate inputs
    const validation = validateCalculatorForm(formData);
    if (!validation.success) {
      setValidationErrors(validation.errors.map(e => e.message));
      return;
    }
    setValidationErrors([]);

    if (workerSupported) {
      runSimulation(formData);
    } else {
      // Fallback to synchronous execution
      const results = runSimulationSync(formData);
      setFallbackResults(results);
    }
  }, [formData, workerSupported, runSimulation]);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }, []);

  const maxBalance = simulationResults
    ? Math.max(...simulationResults.percentiles.p95.map(p => p.balance))
    : formData.startingCapital * 2;

  // Prefetch reduced motion preference - using lazy initializer and sync subscription
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="min-h-screen py-20 px-4">
      {/* Structured Data */}
      <SoftwareToolSchema
        name="Strategy Profitability Calculator"
        description="Run 1,000 Monte Carlo simulations to see how your trading strategy could perform over time. Free trading strategy analysis tool."
        url={`${siteConfig.url}/tools/calculator`}
        applicationCategory="FinanceApplication"
      />

      <GlowingOrbs variant="hero" />
      <GridBackground />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          >
            <span className="text-[#00ff88]" aria-hidden="true">📊</span>
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
            <div className="glass-card rounded-2xl p-8" role="form" aria-label="Strategy parameters">
              <h2 className="text-2xl font-bold text-white mb-6 font-display">Strategy Parameters</h2>

              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg" role="alert">
                  <ul className="list-disc list-inside text-sm text-red-400">
                    {validationErrors.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-6">
                {/* Starting Capital */}
                <div>
                  <label htmlFor="startingCapital" className="block text-sm font-medium text-gray-300 mb-2">
                    Starting Capital
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true">$</span>
                    <input
                      type="number"
                      id="startingCapital"
                      min="100"
                      max="10000000"
                      value={formData.startingCapital}
                      onChange={(e) => handleInputChange('startingCapital', Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:border-[#00d4ff] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/20 transition-colors"
                      aria-describedby="startingCapital-help"
                    />
                  </div>
                  <p id="startingCapital-help" className="mt-1 text-xs text-gray-500">
                    Your initial trading account balance
                  </p>
                </div>

                {/* Win Rate */}
                <div>
                  <label htmlFor="winRate" className="block text-sm font-medium text-gray-300 mb-2">
                    Win Rate: <span className="text-[#00d4ff]">{formData.winRate}%</span>
                  </label>
                  <input
                    type="range"
                    id="winRate"
                    min="30"
                    max="80"
                    value={formData.winRate}
                    onChange={(e) => handleInputChange('winRate', Number(e.target.value))}
                    className="w-full accent-[#00d4ff]"
                    aria-valuemin={30}
                    aria-valuemax={80}
                    aria-valuenow={formData.winRate}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1" aria-hidden="true">
                    <span>30%</span>
                    <span>80%</span>
                  </div>
                </div>

                {/* Risk:Reward Ratio */}
                <div>
                  <label htmlFor="riskRewardRatio" className="block text-sm font-medium text-gray-300 mb-2">
                    Risk:Reward Ratio: <span className="text-[#00d4ff]">1:{formData.riskRewardRatio}</span>
                  </label>
                  <input
                    type="range"
                    id="riskRewardRatio"
                    min="0.5"
                    max="5"
                    step="0.1"
                    value={formData.riskRewardRatio}
                    onChange={(e) => handleInputChange('riskRewardRatio', Number(e.target.value))}
                    className="w-full accent-[#00d4ff]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1" aria-hidden="true">
                    <span>1:0.5</span>
                    <span>1:5</span>
                  </div>
                </div>

                {/* Risk Per Trade */}
                <div>
                  <label htmlFor="riskPerTrade" className="block text-sm font-medium text-gray-300 mb-2">
                    Risk Per Trade: <span className="text-[#00d4ff]">{formData.riskPerTrade}%</span>
                  </label>
                  <input
                    type="range"
                    id="riskPerTrade"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={formData.riskPerTrade}
                    onChange={(e) => handleInputChange('riskPerTrade', Number(e.target.value))}
                    className="w-full accent-[#00d4ff]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1" aria-hidden="true">
                    <span>0.5%</span>
                    <span>5%</span>
                  </div>
                </div>

                {/* Trades Per Month */}
                <div>
                  <label htmlFor="tradesPerMonth" className="block text-sm font-medium text-gray-300 mb-2">
                    Trades Per Month: <span className="text-[#00d4ff]">{formData.tradesPerMonth}</span>
                  </label>
                  <input
                    type="range"
                    id="tradesPerMonth"
                    min="5"
                    max="100"
                    value={formData.tradesPerMonth}
                    onChange={(e) => handleInputChange('tradesPerMonth', Number(e.target.value))}
                    className="w-full accent-[#00d4ff]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1" aria-hidden="true">
                    <span>5</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Simulation Period */}
                <div>
                  <label htmlFor="months" className="block text-sm font-medium text-gray-300 mb-2">
                    Simulation Period: <span className="text-[#00d4ff]">{formData.months} months</span>
                  </label>
                  <input
                    type="range"
                    id="months"
                    min="3"
                    max="36"
                    value={formData.months}
                    onChange={(e) => handleInputChange('months', Number(e.target.value))}
                    className="w-full accent-[#00d4ff]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1" aria-hidden="true">
                    <span>3 months</span>
                    <span>36 months</span>
                  </div>
                </div>

                {/* Worker Error */}
                {workerError && (
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg" role="alert">
                    <p className="text-sm text-yellow-400">{workerError}</p>
                  </div>
                )}

                {/* Run Button */}
                <motion.button
                  onClick={handleRunSimulation}
                  disabled={isRunning}
                  className="w-full py-4 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:ring-offset-2 focus:ring-offset-[#050508]"
                  whileHover={prefersReducedMotion || isRunning ? {} : { scale: 1.02 }}
                  whileTap={prefersReducedMotion || isRunning ? {} : { scale: 0.98 }}
                  aria-busy={isRunning}
                >
                  {isRunning ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        aria-hidden="true"
                      />
                      {progress ? `Running... ${progress.completed}/${progress.total}` : 'Running...'}
                    </span>
                  ) : (
                    'Run 1,000 Simulations'
                  )}
                </motion.button>
              </div>
            </div>
          </AnimatedSection>

          {/* Results */}
          <AnimatedSection delay={0.4}>
            <div className="glass-card rounded-2xl p-8 h-full" role="region" aria-label="Simulation results" aria-live="polite">
              <h2 className="text-2xl font-bold text-white mb-6 font-display">Simulation Results</h2>

              {!showResults ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <div className="text-6xl mb-4" aria-hidden="true">📈</div>
                  <p className="text-gray-400">Configure your strategy parameters and click &quot;Run Simulations&quot; to see projected outcomes.</p>
                </div>
              ) : simulationResults && (
                <div className="space-y-6">
                  {/* Monte Carlo Chart */}
                  <div className="relative h-64 bg-white/5 rounded-xl p-4" role="img" aria-label="Monte Carlo simulation chart showing potential balance outcomes over time">
                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
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
                  <div className="flex flex-wrap gap-4 text-xs" role="list" aria-label="Chart legend">
                    <div className="flex items-center gap-2" role="listitem">
                      <div className="w-4 h-1 bg-[#00d4ff]" aria-hidden="true"></div>
                      <span className="text-gray-400">Median (50th percentile)</span>
                    </div>
                    <div className="flex items-center gap-2" role="listitem">
                      <div className="w-4 h-4 bg-[#00d4ff]/20" aria-hidden="true"></div>
                      <span className="text-gray-400">25th-75th percentile</span>
                    </div>
                    <div className="flex items-center gap-2" role="listitem">
                      <div className="w-4 h-4 bg-[#00d4ff]/10" aria-hidden="true"></div>
                      <span className="text-gray-400">10th-90th percentile</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4" role="list" aria-label="Simulation statistics">
                    <div className="bg-white/5 rounded-xl p-4" role="listitem">
                      <div className="text-sm text-gray-400 mb-1">Median Final Balance</div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(simulationResults.stats.medianFinal)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4" role="listitem">
                      <div className="text-sm text-gray-400 mb-1">Probability of Profit</div>
                      <div className="text-2xl font-bold text-[#00ff88]">{simulationResults.stats.profitableProbability.toFixed(1)}%</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4" role="listitem">
                      <div className="text-sm text-gray-400 mb-1">Best Case (95th)</div>
                      <div className="text-2xl font-bold text-[#00d4ff]">{formatCurrency(simulationResults.stats.bestCase)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4" role="listitem">
                      <div className="text-sm text-gray-400 mb-1">Worst Case (5th)</div>
                      <div className="text-2xl font-bold text-red-400">{formatCurrency(simulationResults.stats.worstCase)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 col-span-2" role="listitem">
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
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-[#00d4ff] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/20"
                        aria-label="Email address for report"
                      />
                      <motion.button
                        className="px-4 py-2 bg-[#00d4ff] text-black font-medium rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:ring-offset-2 focus:ring-offset-[#050508]"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
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
