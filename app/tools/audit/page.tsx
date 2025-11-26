'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection, AnimatedButton, GlowingOrbs, GridBackground } from '@/components/ui';

interface AuditResult {
  complexity: 'simple' | 'moderate' | 'complex';
  estimatedTime: string;
  estimatedCost: { low: number; high: number };
  indicators: string[];
  issues: Array<{ severity: 'warning' | 'critical' | 'info'; message: string }>;
  features: string[];
  conversionDifficulty: number;
  recommendations: string[];
}

const analyzeStrategy = (code: string): AuditResult => {
  const lowerCode = code.toLowerCase();

  // Detect indicators
  const indicatorPatterns = [
    { pattern: /sma|ta\.sma/g, name: 'Simple Moving Average' },
    { pattern: /ema|ta\.ema/g, name: 'Exponential Moving Average' },
    { pattern: /rsi|ta\.rsi/g, name: 'RSI' },
    { pattern: /macd|ta\.macd/g, name: 'MACD' },
    { pattern: /bollinger|ta\.bb/g, name: 'Bollinger Bands' },
    { pattern: /stoch|ta\.stoch/g, name: 'Stochastic' },
    { pattern: /atr|ta\.atr/g, name: 'ATR' },
    { pattern: /adx|ta\.adx/g, name: 'ADX' },
    { pattern: /cci|ta\.cci/g, name: 'CCI' },
    { pattern: /ichimoku/g, name: 'Ichimoku Cloud' },
    { pattern: /pivot/g, name: 'Pivot Points' },
    { pattern: /fib|fibonacci/g, name: 'Fibonacci' },
    { pattern: /volume/g, name: 'Volume Analysis' },
    { pattern: /vwap/g, name: 'VWAP' },
  ];

  const detectedIndicators: string[] = [];
  indicatorPatterns.forEach(({ pattern, name }) => {
    if (pattern.test(lowerCode)) {
      detectedIndicators.push(name);
    }
  });

  // Detect features
  const featurePatterns = [
    { pattern: /strategy\.entry/g, name: 'Entry Logic' },
    { pattern: /strategy\.exit|strategy\.close/g, name: 'Exit Logic' },
    { pattern: /stop_loss|stop loss|sl/g, name: 'Stop Loss' },
    { pattern: /take_profit|take profit|tp/g, name: 'Take Profit' },
    { pattern: /trailing/g, name: 'Trailing Stop' },
    { pattern: /alertcondition|alert/g, name: 'Alerts' },
    { pattern: /input\./g, name: 'Configurable Inputs' },
    { pattern: /timeframe|resolution/g, name: 'Multi-Timeframe' },
    { pattern: /strategy\.risk/g, name: 'Risk Management' },
    { pattern: /pyramiding/g, name: 'Position Pyramiding' },
  ];

  const detectedFeatures: string[] = [];
  featurePatterns.forEach(({ pattern, name }) => {
    if (pattern.test(lowerCode)) {
      detectedFeatures.push(name);
    }
  });

  // Detect issues
  const issues: Array<{ severity: 'warning' | 'critical' | 'info'; message: string }> = [];

  if (/request\.security/g.test(lowerCode)) {
    issues.push({
      severity: 'warning',
      message: 'Uses multi-timeframe data - requires careful handling in MQL to avoid repainting',
    });
  }

  if (/lookahead/g.test(lowerCode)) {
    issues.push({
      severity: 'critical',
      message: 'Potential lookahead bias detected - results may not be reproducible in live trading',
    });
  }

  if (!(/stop_loss|sl =|stop =/gi.test(lowerCode))) {
    issues.push({
      severity: 'warning',
      message: 'No explicit stop loss detected - recommend adding risk management',
    });
  }

  if (/plot\(|plotshape\(/g.test(lowerCode) && detectedIndicators.length > 3) {
    issues.push({
      severity: 'info',
      message: 'Multiple indicators may lead to curve fitting - consider simplifying',
    });
  }

  if (/barstate\.isrealtime/g.test(lowerCode)) {
    issues.push({
      severity: 'info',
      message: 'Uses real-time bar state - behavior may differ between platforms',
    });
  }

  if (code.length > 5000) {
    issues.push({
      severity: 'info',
      message: 'Large codebase detected - may require modular conversion approach',
    });
  }

  // Calculate complexity
  let complexityScore = 0;
  complexityScore += detectedIndicators.length * 10;
  complexityScore += detectedFeatures.length * 5;
  complexityScore += issues.filter(i => i.severity === 'critical').length * 20;
  complexityScore += issues.filter(i => i.severity === 'warning').length * 10;
  complexityScore += code.length / 100;

  const complexity: 'simple' | 'moderate' | 'complex' =
    complexityScore < 50 ? 'simple' : complexityScore < 100 ? 'moderate' : 'complex';

  // Calculate conversion difficulty (1-10)
  const conversionDifficulty = Math.min(10, Math.max(1, Math.round(complexityScore / 15)));

  // Estimate time and cost
  const baseTime = complexity === 'simple' ? 5 : complexity === 'moderate' ? 10 : 20;
  const baseCost = complexity === 'simple' ? 300 : complexity === 'moderate' ? 600 : 1200;

  // Generate recommendations
  const recommendations: string[] = [];

  if (!detectedFeatures.includes('Stop Loss')) {
    recommendations.push('Add explicit stop loss logic for better risk management');
  }
  if (detectedIndicators.length > 4) {
    recommendations.push('Consider reducing indicator count to avoid over-optimization');
  }
  if (!detectedFeatures.includes('Configurable Inputs')) {
    recommendations.push('Add input parameters for easier optimization in MT4/MT5');
  }
  if (complexity === 'complex') {
    recommendations.push('Consider breaking into multiple modules for maintainability');
  }
  if (issues.some(i => i.severity === 'critical')) {
    recommendations.push('Address critical issues before proceeding with conversion');
  }

  return {
    complexity,
    estimatedTime: `${baseTime - 3} - ${baseTime + 3} business days`,
    estimatedCost: { low: Math.round(baseCost * 0.8), high: Math.round(baseCost * 1.2) },
    indicators: detectedIndicators,
    issues,
    features: detectedFeatures,
    conversionDifficulty,
    recommendations,
  };
};

export default function AuditPage() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<AuditResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [email, setEmail] = useState('');

  const handleAnalyze = () => {
    if (code.trim().length < 50) return;

    setIsAnalyzing(true);
    // Simulate analysis time
    setTimeout(() => {
      setResult(analyzeStrategy(code));
      setIsAnalyzing(false);
    }, 1500);
  };

  const sampleCode = `// Example Pine Script Strategy
//@version=5
strategy("My Strategy", overlay=true)

// Inputs
length = input.int(14, "RSI Length")
overbought = input.int(70, "Overbought")
oversold = input.int(30, "Oversold")

// Indicators
rsi = ta.rsi(close, length)
sma20 = ta.sma(close, 20)
sma50 = ta.sma(close, 50)

// Conditions
longCondition = ta.crossover(sma20, sma50) and rsi < oversold
shortCondition = ta.crossunder(sma20, sma50) and rsi > overbought

// Entries
if longCondition
    strategy.entry("Long", strategy.long)
if shortCondition
    strategy.entry("Short", strategy.short)

// Exit
strategy.exit("Exit Long", "Long", profit=200, loss=100)
strategy.exit("Exit Short", "Short", profit=200, loss=100)`;

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
            <span className="text-[#00d4ff]">🔍</span>
            <span className="text-sm font-medium text-gray-300">Free Analysis</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
            Strategy <span className="text-gradient">Audit Tool</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Paste your Pine Script code and get an instant assessment of complexity, potential issues, and conversion estimate.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Input Section */}
          <AnimatedSection delay={0.2}>
            <div className="glass-card rounded-2xl p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white font-display">Your Pine Script Code</h2>
                <motion.button
                  onClick={() => setCode(sampleCode)}
                  className="text-sm text-[#00d4ff] hover:underline"
                  whileHover={{ x: 3 }}
                >
                  Load Example
                </motion.button>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your Pine Script strategy code here..."
                className="w-full h-80 bg-[#0a0a0f] border border-white/10 rounded-xl p-4 text-gray-300 font-mono text-sm resize-none focus:outline-none focus:border-[#00d4ff] transition-colors"
                spellCheck={false}
              />

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  {code.length} characters
                  {code.length < 50 && code.length > 0 && (
                    <span className="text-yellow-400 ml-2">Need at least 50 characters</span>
                  )}
                </div>
                <motion.button
                  onClick={handleAnalyze}
                  disabled={code.length < 50 || isAnalyzing}
                  className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      Analyze Strategy
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </AnimatedSection>

          {/* Results Section */}
          <AnimatedSection delay={0.4}>
            <div className="glass-card rounded-2xl p-6 h-full">
              <h2 className="text-xl font-bold text-white mb-6 font-display">Analysis Results</h2>

              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-[400px] text-center"
                  >
                    <div className="text-6xl mb-4">🔬</div>
                    <p className="text-gray-400">Paste your Pine Script code and click "Analyze Strategy" to get started.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Complexity Badge */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Complexity Level</div>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                          result.complexity === 'simple' ? 'bg-[#00ff88]/20 text-[#00ff88]' :
                          result.complexity === 'moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {result.complexity.toUpperCase()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400 mb-1">Conversion Difficulty</div>
                        <div className="flex gap-1">
                          {Array.from({ length: 10 }, (_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-6 rounded-sm ${
                                i < result.conversionDifficulty
                                  ? result.conversionDifficulty <= 3 ? 'bg-[#00ff88]' :
                                    result.conversionDifficulty <= 6 ? 'bg-yellow-400' : 'bg-red-400'
                                  : 'bg-white/10'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Estimates */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-sm text-gray-400 mb-1">Estimated Time</div>
                        <div className="text-xl font-bold text-white">{result.estimatedTime}</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-sm text-gray-400 mb-1">Estimated Cost</div>
                        <div className="text-xl font-bold text-[#00d4ff]">
                          ${result.estimatedCost.low} - ${result.estimatedCost.high}
                        </div>
                      </div>
                    </div>

                    {/* Detected Indicators */}
                    {result.indicators.length > 0 && (
                      <div>
                        <div className="text-sm text-gray-400 mb-2">Detected Indicators ({result.indicators.length})</div>
                        <div className="flex flex-wrap gap-2">
                          {result.indicators.map((ind, i) => (
                            <span key={i} className="px-3 py-1 bg-[#00d4ff]/10 text-[#00d4ff] text-sm rounded-full">
                              {ind}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Detected Features */}
                    {result.features.length > 0 && (
                      <div>
                        <div className="text-sm text-gray-400 mb-2">Detected Features ({result.features.length})</div>
                        <div className="flex flex-wrap gap-2">
                          {result.features.map((feat, i) => (
                            <span key={i} className="px-3 py-1 bg-[#00ff88]/10 text-[#00ff88] text-sm rounded-full">
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Issues */}
                    {result.issues.length > 0 && (
                      <div>
                        <div className="text-sm text-gray-400 mb-2">Potential Issues</div>
                        <div className="space-y-2">
                          {result.issues.map((issue, i) => (
                            <div
                              key={i}
                              className={`p-3 rounded-lg flex items-start gap-3 ${
                                issue.severity === 'critical' ? 'bg-red-500/10 border border-red-500/20' :
                                issue.severity === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                                'bg-blue-500/10 border border-blue-500/20'
                              }`}
                            >
                              <span className={`text-lg ${
                                issue.severity === 'critical' ? 'text-red-400' :
                                issue.severity === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                              }`}>
                                {issue.severity === 'critical' ? '❌' : issue.severity === 'warning' ? '⚠️' : 'ℹ️'}
                              </span>
                              <span className="text-sm text-gray-300">{issue.message}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    {result.recommendations.length > 0 && (
                      <div>
                        <div className="text-sm text-gray-400 mb-2">Recommendations</div>
                        <ul className="space-y-2">
                          {result.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="text-[#00d4ff]">→</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Email for Full Report */}
                    <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 rounded-xl p-4 border border-[#00d4ff]/20">
                      <p className="text-sm text-gray-300 mb-3">Get a detailed PDF report with line-by-line analysis:</p>
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>

        {/* CTA Section */}
        <AnimatedSection delay={0.6} className="mt-16 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 font-display">
              Ready for Professional Conversion?
            </h3>
            <p className="text-gray-400 mb-6">
              Book a free 15-minute strategy review call with our team. We'll discuss your specific needs and provide a custom quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton href="/contact" variant="glow">
                Book Free Strategy Review
              </AnimatedButton>
              <AnimatedButton href="/tools/estimator" variant="ghost">
                Get Detailed Estimate
              </AnimatedButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
