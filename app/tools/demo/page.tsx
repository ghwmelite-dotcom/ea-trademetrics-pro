'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui';

// Lazy load background effects for better mobile performance
const GlowingOrbs = dynamic(() => import('@/components/ui/GlowingOrbs').then(mod => mod.default), { ssr: false });
const GridBackground = dynamic(() => import('@/components/ui/GlowingOrbs').then(mod => mod.GridBackground), { ssr: false });

// TypeScript interfaces for type safety
interface OHLCData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface Trade {
  type: 'long' | 'short';
  entry: number;
  exit: number;
  pips: number;
  entryDate: string;
  exitDate: string;
}

interface StrategyParams {
  [key: string]: number;
}

interface EquityPoint {
  date: string;
  equity: number;
}

interface BacktestResults {
  trades: Trade[];
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalPips: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  equityCurve: EquityPoint[];
  finalEquity: number;
  returnPercent: number;
  maxDrawdown: number;
}

// Sample historical data (simplified OHLC for demo)
const generateHistoricalData = (days: number, volatility: number = 0.02) => {
  const data = [];
  let price = 1.1000; // Starting price (e.g., EUR/USD)
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const change = (Math.random() - 0.5) * 2 * volatility;
    const open = price;
    const close = price * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * volatility * 0.5);
    const low = Math.min(open, close) * (1 - Math.random() * volatility * 0.5);

    data.push({
      date: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
    });

    price = close;
  }

  return data;
};

// Strategy implementations
const strategies = {
  'ma-crossover': {
    name: 'Moving Average Crossover',
    description: 'Classic trend-following strategy using fast and slow MA crossovers',
    params: [
      { id: 'fastPeriod', label: 'Fast MA Period', default: 10, min: 5, max: 50 },
      { id: 'slowPeriod', label: 'Slow MA Period', default: 20, min: 10, max: 100 },
    ],
    execute: (data: OHLCData[], params: StrategyParams): Trade[] => {
      const { fastPeriod, slowPeriod } = params;
      const trades: Trade[] = [];
      let position: 'long' | 'short' | null = null;
      let entryPrice = 0;
      let entryDate = '';

      // Calculate MAs
      const calculateMA = (index: number, period: number) => {
        if (index < period - 1) return null;
        let sum = 0;
        for (let i = index - period + 1; i <= index; i++) {
          sum += data[i].close;
        }
        return sum / period;
      };

      for (let i = slowPeriod; i < data.length; i++) {
        const fastMA = calculateMA(i, fastPeriod);
        const prevFastMA = calculateMA(i - 1, fastPeriod);
        const slowMA = calculateMA(i, slowPeriod);
        const prevSlowMA = calculateMA(i - 1, slowPeriod);

        if (!fastMA || !slowMA || !prevFastMA || !prevSlowMA) continue;

        // Golden cross - buy signal
        if (prevFastMA <= prevSlowMA && fastMA > slowMA && position !== 'long') {
          if (position === 'short') {
            const pips = (entryPrice - data[i].close) * 10000;
            trades.push({ type: 'short', entry: entryPrice, exit: data[i].close, pips, entryDate, exitDate: data[i].date });
          }
          position = 'long';
          entryPrice = data[i].close;
          entryDate = data[i].date;
        }
        // Death cross - sell signal
        else if (prevFastMA >= prevSlowMA && fastMA < slowMA && position !== 'short') {
          if (position === 'long') {
            const pips = (data[i].close - entryPrice) * 10000;
            trades.push({ type: 'long', entry: entryPrice, exit: data[i].close, pips, entryDate, exitDate: data[i].date });
          }
          position = 'short';
          entryPrice = data[i].close;
          entryDate = data[i].date;
        }
      }

      return trades;
    },
  },
  'rsi-reversal': {
    name: 'RSI Reversal',
    description: 'Mean reversion strategy based on RSI overbought/oversold levels',
    params: [
      { id: 'rsiPeriod', label: 'RSI Period', default: 14, min: 5, max: 30 },
      { id: 'oversold', label: 'Oversold Level', default: 30, min: 10, max: 40 },
      { id: 'overbought', label: 'Overbought Level', default: 70, min: 60, max: 90 },
    ],
    execute: (data: OHLCData[], params: StrategyParams): Trade[] => {
      const { rsiPeriod, oversold, overbought } = params;
      const trades: Trade[] = [];
      let position: 'long' | 'short' | null = null;
      let entryPrice = 0;
      let entryDate = '';

      // Calculate RSI
      const calculateRSI = (index: number) => {
        if (index < rsiPeriod) return null;
        let gains = 0, losses = 0;
        for (let i = index - rsiPeriod + 1; i <= index; i++) {
          const change = data[i].close - data[i - 1].close;
          if (change > 0) gains += change;
          else losses -= change;
        }
        const avgGain = gains / rsiPeriod;
        const avgLoss = losses / rsiPeriod;
        if (avgLoss === 0) return 100;
        const rs = avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
      };

      for (let i = rsiPeriod + 1; i < data.length; i++) {
        const rsi = calculateRSI(i);
        const prevRsi = calculateRSI(i - 1);

        if (rsi === null || prevRsi === null) continue;

        // RSI crosses above oversold - buy signal
        if (prevRsi <= oversold && rsi > oversold && position !== 'long') {
          if (position === 'short') {
            const pips = (entryPrice - data[i].close) * 10000;
            trades.push({ type: 'short', entry: entryPrice, exit: data[i].close, pips, entryDate, exitDate: data[i].date });
          }
          position = 'long';
          entryPrice = data[i].close;
          entryDate = data[i].date;
        }
        // RSI crosses below overbought - sell signal
        else if (prevRsi >= overbought && rsi < overbought && position !== 'short') {
          if (position === 'long') {
            const pips = (data[i].close - entryPrice) * 10000;
            trades.push({ type: 'long', entry: entryPrice, exit: data[i].close, pips, entryDate, exitDate: data[i].date });
          }
          position = 'short';
          entryPrice = data[i].close;
          entryDate = data[i].date;
        }
      }

      return trades;
    },
  },
  'breakout': {
    name: 'Channel Breakout',
    description: 'Momentum strategy trading breakouts from price channels',
    params: [
      { id: 'channelPeriod', label: 'Channel Period', default: 20, min: 10, max: 50 },
    ],
    execute: (data: OHLCData[], params: StrategyParams): Trade[] => {
      const { channelPeriod } = params;
      const trades: Trade[] = [];
      let position: 'long' | 'short' | null = null;
      let entryPrice = 0;
      let entryDate = '';

      for (let i = channelPeriod; i < data.length; i++) {
        let highest = 0, lowest = Infinity;
        for (let j = i - channelPeriod; j < i; j++) {
          highest = Math.max(highest, data[j].high);
          lowest = Math.min(lowest, data[j].low);
        }

        // Breakout above channel - buy
        if (data[i].close > highest && position !== 'long') {
          if (position === 'short') {
            const pips = (entryPrice - data[i].close) * 10000;
            trades.push({ type: 'short', entry: entryPrice, exit: data[i].close, pips, entryDate, exitDate: data[i].date });
          }
          position = 'long';
          entryPrice = data[i].close;
          entryDate = data[i].date;
        }
        // Breakout below channel - sell
        else if (data[i].close < lowest && position !== 'short') {
          if (position === 'long') {
            const pips = (data[i].close - entryPrice) * 10000;
            trades.push({ type: 'long', entry: entryPrice, exit: data[i].close, pips, entryDate, exitDate: data[i].date });
          }
          position = 'short';
          entryPrice = data[i].close;
          entryDate = data[i].date;
        }
      }

      return trades;
    },
  },
};

type StrategyKey = keyof typeof strategies;

export default function DemoPage() {
  const [selectedStrategy, setSelectedStrategy] = useState<StrategyKey>('ma-crossover');
  const [params, setParams] = useState<Record<string, number>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<BacktestResults | null>(null);
  const [historicalData] = useState(() => generateHistoricalData(365, 0.015));

  const strategy = strategies[selectedStrategy];

  // Initialize params when strategy changes
  const currentParams = useMemo(() => {
    const defaults: Record<string, number> = {};
    strategy.params.forEach(p => {
      defaults[p.id] = params[p.id] ?? p.default;
    });
    return defaults;
  }, [params, strategy.params]);

  const runBacktest = async () => {
    setIsRunning(true);
    setResults(null);

    // Simulate processing time for effect
    await new Promise(resolve => setTimeout(resolve, 1500));

    const trades = strategy.execute(historicalData, currentParams);

    // Calculate statistics
    const winningTrades = trades.filter(t => t.pips > 0);
    const losingTrades = trades.filter(t => t.pips <= 0);
    const totalPips = trades.reduce((sum, t) => sum + t.pips, 0);
    const avgWin = winningTrades.length > 0
      ? winningTrades.reduce((sum, t) => sum + t.pips, 0) / winningTrades.length
      : 0;
    const avgLoss = losingTrades.length > 0
      ? Math.abs(losingTrades.reduce((sum, t) => sum + t.pips, 0) / losingTrades.length)
      : 0;
    const profitFactor = avgLoss > 0 ? (avgWin * winningTrades.length) / (avgLoss * losingTrades.length) : avgWin > 0 ? Infinity : 0;

    // Calculate equity curve
    let equity = 10000; // Starting balance
    const equityCurve = [{ date: historicalData[0].date, equity }];
    trades.forEach(trade => {
      equity += trade.pips * 10; // $10 per pip
      equityCurve.push({ date: trade.exitDate, equity });
    });

    // Calculate max drawdown
    let maxEquity = 10000;
    let maxDrawdown = 0;
    equityCurve.forEach(point => {
      maxEquity = Math.max(maxEquity, point.equity);
      const drawdown = ((maxEquity - point.equity) / maxEquity) * 100;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    });

    setResults({
      trades,
      totalTrades: trades.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      winRate: trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0,
      totalPips,
      avgWin,
      avgLoss,
      profitFactor: isFinite(profitFactor) ? profitFactor : 0,
      equityCurve,
      finalEquity: equity,
      returnPercent: ((equity - 10000) / 10000) * 100,
      maxDrawdown,
    });

    setIsRunning(false);
  };

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
            <span className="text-[#00d4ff]">🎮</span>
            <span className="text-sm font-medium text-gray-300">Interactive Demo</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
            EA <span className="text-gradient">Backtest Simulator</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the power of algorithmic trading. Select a strategy, adjust parameters, and see real backtest results instantly.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Strategy Selection */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-xl font-bold text-white mb-4 font-display">Select Strategy</h2>
              <div className="space-y-3">
                {(Object.keys(strategies) as StrategyKey[]).map((key) => (
                  <motion.button
                    key={key}
                    onClick={() => {
                      setSelectedStrategy(key);
                      setParams({});
                      setResults(null);
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedStrategy === key
                        ? 'bg-[#00d4ff]/20 border-2 border-[#00d4ff]'
                        : 'bg-white/5 border-2 border-transparent hover:border-white/20'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold text-white">{strategies[key].name}</div>
                    <div className="text-sm text-gray-400 mt-1">{strategies[key].description}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Parameters */}
            <motion.div
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-bold text-white mb-4 font-display">Parameters</h2>
              <div className="space-y-4">
                {strategy.params.map((param) => (
                  <div key={param.id}>
                    <div className="flex justify-between text-sm mb-2">
                      <label className="text-gray-300">{param.label}</label>
                      <span className="text-[#00d4ff] font-mono">{currentParams[param.id]}</span>
                    </div>
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      value={currentParams[param.id]}
                      onChange={(e) => setParams({ ...params, [param.id]: Number(e.target.value) })}
                      className="w-full accent-[#00d4ff]"
                    />
                  </div>
                ))}
              </div>

              <motion.button
                onClick={runBacktest}
                disabled={isRunning}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-bold rounded-xl disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isRunning ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Running Backtest...
                  </span>
                ) : (
                  'Run Backtest'
                )}
              </motion.button>
            </motion.div>

            {/* Info Box */}
            <motion.div
              className="glass-card rounded-2xl p-6 border border-[#00d4ff]/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <div className="font-semibold text-white mb-1">This is a simulation</div>
                  <div className="text-sm text-gray-400">
                    Results shown are based on historical data simulation. Actual EA performance depends on market conditions, broker execution, and strategy optimization.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {!results && !isRunning && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[500px]"
                >
                  <div className="text-6xl mb-6">📊</div>
                  <h3 className="text-2xl font-bold text-white mb-3 font-display">Ready to Test</h3>
                  <p className="text-gray-400 max-w-md">
                    Select a strategy, adjust the parameters, and click &quot;Run Backtest&quot; to see how it would have performed over the past year.
                  </p>
                </motion.div>
              )}

              {isRunning && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[500px]"
                >
                  <motion.div
                    className="w-20 h-20 border-4 border-[#00d4ff]/30 border-t-[#00d4ff] rounded-full mb-6"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <h3 className="text-2xl font-bold text-white mb-3 font-display">Running Backtest</h3>
                  <p className="text-gray-400">Analyzing 365 days of historical data...</p>
                </motion.div>
              )}

              {results && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Return', value: `${results.returnPercent >= 0 ? '+' : ''}${results.returnPercent.toFixed(1)}%`, color: results.returnPercent >= 0 ? 'text-[#00ff88]' : 'text-red-400' },
                      { label: 'Win Rate', value: `${results.winRate.toFixed(1)}%`, color: results.winRate >= 50 ? 'text-[#00ff88]' : 'text-yellow-400' },
                      { label: 'Profit Factor', value: results.profitFactor.toFixed(2), color: results.profitFactor >= 1.5 ? 'text-[#00ff88]' : 'text-yellow-400' },
                      { label: 'Max Drawdown', value: `${results.maxDrawdown.toFixed(1)}%`, color: results.maxDrawdown <= 20 ? 'text-[#00ff88]' : 'text-red-400' },
                    ].map((metric, i) => (
                      <motion.div
                        key={metric.label}
                        className="glass-card rounded-xl p-4 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                        <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Equity Curve */}
                  <motion.div
                    className="glass-card rounded-2xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg font-bold text-white mb-4">Equity Curve</h3>
                    <div className="h-64 relative">
                      {/* Simple SVG chart */}
                      <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                        {/* Grid lines */}
                        {[0, 1, 2, 3, 4].map(i => (
                          <line key={i} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        ))}

                        {/* Equity line */}
                        <path
                          d={(() => {
                            const minEquity = Math.min(...results.equityCurve.map((p: EquityPoint) => p.equity));
                            const maxEquity = Math.max(...results.equityCurve.map((p: EquityPoint) => p.equity));
                            const range = maxEquity - minEquity || 1;

                            return results.equityCurve.map((point: EquityPoint, i: number) => {
                              const x = (i / (results.equityCurve.length - 1)) * 800;
                              const y = 200 - ((point.equity - minEquity) / range) * 180 - 10;
                              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                            }).join(' ');
                          })()}
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Gradient definition */}
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00d4ff" />
                            <stop offset="100%" stopColor="#00ff88" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                        <span>${Math.max(...results.equityCurve.map((p: EquityPoint) => p.equity)).toLocaleString()}</span>
                        <span>${Math.min(...results.equityCurve.map((p: EquityPoint) => p.equity)).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Start</span>
                      <span>End</span>
                    </div>
                  </motion.div>

                  {/* Trade Statistics */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="glass-card rounded-2xl p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-lg font-bold text-white mb-4">Trade Statistics</h3>
                      <div className="space-y-3">
                        {[
                          { label: 'Total Trades', value: results.totalTrades },
                          { label: 'Winning Trades', value: results.winningTrades, color: 'text-[#00ff88]' },
                          { label: 'Losing Trades', value: results.losingTrades, color: 'text-red-400' },
                          { label: 'Total Pips', value: `${results.totalPips >= 0 ? '+' : ''}${results.totalPips.toFixed(1)}`, color: results.totalPips >= 0 ? 'text-[#00ff88]' : 'text-red-400' },
                          { label: 'Avg Win', value: `+${results.avgWin.toFixed(1)} pips`, color: 'text-[#00ff88]' },
                          { label: 'Avg Loss', value: `-${results.avgLoss.toFixed(1)} pips`, color: 'text-red-400' },
                        ].map((stat) => (
                          <div key={stat.label} className="flex justify-between">
                            <span className="text-gray-400">{stat.label}</span>
                            <span className={stat.color || 'text-white'}>{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      className="glass-card rounded-2xl p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-lg font-bold text-white mb-4">Performance Summary</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-xl">
                          <div className="text-sm text-gray-400 mb-1">Final Balance</div>
                          <div className="text-3xl font-bold text-white">${results.finalEquity.toLocaleString()}</div>
                          <div className={`text-sm ${results.returnPercent >= 0 ? 'text-[#00ff88]' : 'text-red-400'}`}>
                            {results.returnPercent >= 0 ? '+' : ''}{results.returnPercent.toFixed(2)}% from $10,000
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          <p className="mb-2">This backtest used:</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>365 days of simulated EUR/USD data</li>
                            <li>$10 per pip position sizing</li>
                            <li>No spread or commission applied</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* CTA */}
                  <motion.div
                    className="glass-card rounded-2xl p-8 text-center border border-[#00d4ff]/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-3 font-display">
                      Want This Strategy as a Real EA?
                    </h3>
                    <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                      We can build a professional, optimized Expert Advisor based on this strategy - with proper risk management, multi-pair support, and advanced features.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.a
                        href="/tools/estimator"
                        className="px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-bold rounded-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Get a Quote
                      </motion.a>
                      <motion.a
                        href="/contact"
                        className="px-8 py-3 border border-white/20 text-white font-bold rounded-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Contact Us
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
