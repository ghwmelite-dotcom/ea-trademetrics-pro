'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection, AnimatedButton, GlowingOrbs, GridBackground } from '@/components/ui';

interface FormData {
  strategyType: string;
  platform: string;
  indicators: number;
  riskManagement: string;
  multiPair: boolean;
  timeframes: number;
  features: string[];
  urgency: string;
}

const initialFormData: FormData = {
  strategyType: '',
  platform: '',
  indicators: 1,
  riskManagement: 'basic',
  multiPair: false,
  timeframes: 1,
  features: [],
  urgency: 'standard',
};

const strategyTypes = [
  { id: 'scalping', label: 'Scalping', description: 'High-frequency, small profit targets', icon: '⚡', multiplier: 1.3 },
  { id: 'daytrading', label: 'Day Trading', description: 'Intraday positions, no overnight', icon: '📊', multiplier: 1.0 },
  { id: 'swing', label: 'Swing Trading', description: 'Multi-day positions', icon: '📈', multiplier: 0.9 },
  { id: 'grid', label: 'Grid / Martingale', description: 'Position averaging strategies', icon: '🎯', multiplier: 1.4 },
  { id: 'breakout', label: 'Breakout', description: 'Support/resistance breaks', icon: '🚀', multiplier: 1.0 },
  { id: 'meanreversion', label: 'Mean Reversion', description: 'Counter-trend strategies', icon: '🔄', multiplier: 1.1 },
];

const platforms = [
  { id: 'mt4', label: 'MetaTrader 4', icon: '🔵' },
  { id: 'mt5', label: 'MetaTrader 5', icon: '🟢' },
  { id: 'both', label: 'Both MT4 & MT5', icon: '🔵🟢' },
];

const riskManagementOptions = [
  { id: 'basic', label: 'Basic', description: 'Fixed lot size, simple SL/TP', price: 0 },
  { id: 'moderate', label: 'Moderate', description: '% risk, trailing stop, break-even', price: 150 },
  { id: 'advanced', label: 'Advanced', description: 'Dynamic sizing, partial closes, hedging', price: 350 },
];

const additionalFeatures = [
  { id: 'newsfilter', label: 'News Filter', description: 'Avoid trading during high-impact news', price: 100 },
  { id: 'sessionfilter', label: 'Session Filter', description: 'Trade only during specific sessions', price: 75 },
  { id: 'dashboard', label: 'Visual Dashboard', description: 'On-chart statistics and controls', price: 200 },
  { id: 'telegram', label: 'Telegram Alerts', description: 'Trade notifications to Telegram', price: 150 },
  { id: 'optimization', label: 'Optimization Ready', description: 'Parameter inputs for strategy tester', price: 100 },
  { id: 'logging', label: 'Advanced Logging', description: 'Detailed trade logs and analytics', price: 100 },
];

const urgencyOptions = [
  { id: 'standard', label: 'Standard', description: '3-4 weeks', multiplier: 1.0 },
  { id: 'priority', label: 'Priority', description: '2 weeks', multiplier: 1.25 },
  { id: 'rush', label: 'Rush', description: '1 week', multiplier: 1.5 },
];

export default function EstimatorPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const totalSteps = 5;

  const calculatePrice = () => {
    let basePrice = 400; // Base development cost

    // Strategy type multiplier
    const strategy = strategyTypes.find(s => s.id === formData.strategyType);
    if (strategy) basePrice *= strategy.multiplier;

    // Platform
    if (formData.platform === 'both') basePrice *= 1.6;

    // Indicators (each additional indicator adds complexity)
    basePrice += (formData.indicators - 1) * 75;

    // Risk management
    const riskMgmt = riskManagementOptions.find(r => r.id === formData.riskManagement);
    if (riskMgmt) basePrice += riskMgmt.price;

    // Multi-pair
    if (formData.multiPair) basePrice += 200;

    // Additional timeframes
    basePrice += (formData.timeframes - 1) * 50;

    // Features
    formData.features.forEach(featureId => {
      const feature = additionalFeatures.find(f => f.id === featureId);
      if (feature) basePrice += feature.price;
    });

    // Urgency
    const urgency = urgencyOptions.find(u => u.id === formData.urgency);
    if (urgency) basePrice *= urgency.multiplier;

    return {
      low: Math.round(basePrice * 0.85),
      mid: Math.round(basePrice),
      high: Math.round(basePrice * 1.15),
    };
  };

  const getTimeline = () => {
    const urgency = urgencyOptions.find(u => u.id === formData.urgency);
    return urgency?.description || '3-4 weeks';
  };

  const price = calculatePrice();

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const toggleFeature = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId],
    }));
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
            <span className="text-[#00d4ff]">💰</span>
            <span className="text-sm font-medium text-gray-300">Free Estimate</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
            EA Development <span className="text-gradient">Cost Estimator</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get an instant price range for your Expert Advisor project. Answer a few questions about your strategy.
          </p>
        </AnimatedSection>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    i + 1 <= step ? 'bg-[#00d4ff] text-black' : 'bg-white/10 text-gray-500'
                  }`}
                  animate={{ scale: i + 1 === step ? 1.1 : 1 }}
                >
                  {i + 1}
                </motion.div>
                {i < totalSteps - 1 && (
                  <div className={`w-12 sm:w-24 h-1 mx-2 ${i + 1 < step ? 'bg-[#00d4ff]' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Strategy Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-2 font-display">What type of strategy?</h2>
                <p className="text-gray-400 mb-6">Select the trading approach that best describes your strategy.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {strategyTypes.map((strategy) => (
                    <motion.button
                      key={strategy.id}
                      onClick={() => setFormData(prev => ({ ...prev, strategyType: strategy.id }))}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formData.strategyType === strategy.id
                          ? 'border-[#00d4ff] bg-[#00d4ff]/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-3xl mb-2">{strategy.icon}</div>
                      <div className="font-semibold text-white">{strategy.label}</div>
                      <div className="text-sm text-gray-400">{strategy.description}</div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <motion.button
                    onClick={nextStep}
                    disabled={!formData.strategyType}
                    className="px-8 py-3 bg-[#00d4ff] text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Next →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Platform */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-2 font-display">Which platform?</h2>
                <p className="text-gray-400 mb-6">Select your trading platform.</p>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {platforms.map((platform) => (
                    <motion.button
                      key={platform.id}
                      onClick={() => setFormData(prev => ({ ...prev, platform: platform.id }))}
                      className={`p-6 rounded-xl border-2 text-center transition-all ${
                        formData.platform === platform.id
                          ? 'border-[#00d4ff] bg-[#00d4ff]/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-4xl mb-2">{platform.icon}</div>
                      <div className="font-semibold text-white">{platform.label}</div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  <motion.button
                    onClick={prevStep}
                    className="px-8 py-3 border border-white/20 text-white font-bold rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ← Back
                  </motion.button>
                  <motion.button
                    onClick={nextStep}
                    disabled={!formData.platform}
                    className="px-8 py-3 bg-[#00d4ff] text-black font-bold rounded-xl disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Next →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Complexity */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-2 font-display">Strategy Complexity</h2>
                <p className="text-gray-400 mb-6">Tell us about the technical aspects of your strategy.</p>

                <div className="space-y-6">
                  {/* Number of Indicators */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Number of Indicators: <span className="text-[#00d4ff]">{formData.indicators}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.indicators}
                      onChange={(e) => setFormData(prev => ({ ...prev, indicators: Number(e.target.value) }))}
                      className="w-full accent-[#00d4ff]"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>10+</span>
                    </div>
                  </div>

                  {/* Number of Timeframes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Timeframes Used: <span className="text-[#00d4ff]">{formData.timeframes}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={formData.timeframes}
                      onChange={(e) => setFormData(prev => ({ ...prev, timeframes: Number(e.target.value) }))}
                      className="w-full accent-[#00d4ff]"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Single</span>
                      <span>5 (Multi-TF)</span>
                    </div>
                  </div>

                  {/* Multi-Pair */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <div className="font-semibold text-white">Multi-Pair Trading</div>
                      <div className="text-sm text-gray-400">Trade multiple currency pairs simultaneously</div>
                    </div>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, multiPair: !prev.multiPair }))}
                      className={`w-14 h-8 rounded-full transition-colors ${
                        formData.multiPair ? 'bg-[#00d4ff]' : 'bg-white/20'
                      }`}
                    >
                      <motion.div
                        className="w-6 h-6 bg-white rounded-full mx-1"
                        animate={{ x: formData.multiPair ? 22 : 0 }}
                      />
                    </button>
                  </div>

                  {/* Risk Management */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Risk Management Level</label>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {riskManagementOptions.map((option) => (
                        <motion.button
                          key={option.id}
                          onClick={() => setFormData(prev => ({ ...prev, riskManagement: option.id }))}
                          className={`p-4 rounded-xl border-2 text-left ${
                            formData.riskManagement === option.id
                              ? 'border-[#00d4ff] bg-[#00d4ff]/10'
                              : 'border-white/10 bg-white/5'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="font-semibold text-white">{option.label}</div>
                          <div className="text-xs text-gray-400 mt-1">{option.description}</div>
                          {option.price > 0 && (
                            <div className="text-xs text-[#00d4ff] mt-2">+${option.price}</div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <motion.button
                    onClick={prevStep}
                    className="px-8 py-3 border border-white/20 text-white font-bold rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    ← Back
                  </motion.button>
                  <motion.button
                    onClick={nextStep}
                    className="px-8 py-3 bg-[#00d4ff] text-black font-bold rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    Next →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Additional Features */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-2 font-display">Additional Features</h2>
                <p className="text-gray-400 mb-6">Select any extra features you'd like included.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {additionalFeatures.map((feature) => (
                    <motion.button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formData.features.includes(feature.id)
                          ? 'border-[#00d4ff] bg-[#00d4ff]/10'
                          : 'border-white/10 bg-white/5'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-white">{feature.label}</div>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          formData.features.includes(feature.id)
                            ? 'border-[#00d4ff] bg-[#00d4ff]'
                            : 'border-white/30'
                        }`}>
                          {formData.features.includes(feature.id) && (
                            <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">{feature.description}</div>
                      <div className="text-sm text-[#00d4ff] mt-2">+${feature.price}</div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  <motion.button
                    onClick={prevStep}
                    className="px-8 py-3 border border-white/20 text-white font-bold rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    ← Back
                  </motion.button>
                  <motion.button
                    onClick={nextStep}
                    className="px-8 py-3 bg-[#00d4ff] text-black font-bold rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    Next →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Results */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-2 font-display">Your Estimate</h2>
                <p className="text-gray-400 mb-6">Based on your requirements, here's the estimated cost.</p>

                {/* Urgency Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Delivery Timeline</label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {urgencyOptions.map((option) => (
                      <motion.button
                        key={option.id}
                        onClick={() => setFormData(prev => ({ ...prev, urgency: option.id }))}
                        className={`p-4 rounded-xl border-2 text-center ${
                          formData.urgency === option.id
                            ? 'border-[#00d4ff] bg-[#00d4ff]/10'
                            : 'border-white/10 bg-white/5'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="font-semibold text-white">{option.label}</div>
                        <div className="text-sm text-gray-400">{option.description}</div>
                        {option.multiplier > 1 && (
                          <div className="text-xs text-yellow-400 mt-1">+{((option.multiplier - 1) * 100).toFixed(0)}%</div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Price Display */}
                <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 rounded-2xl p-8 text-center mb-8">
                  <div className="text-sm text-gray-400 mb-2">Estimated Price Range</div>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-2xl text-gray-400">${price.low}</span>
                    <span className="text-5xl font-bold text-white">${price.mid}</span>
                    <span className="text-2xl text-gray-400">${price.high}</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-4">
                    Estimated delivery: <span className="text-[#00d4ff] font-medium">{getTimeline()}</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-white/5 rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-white mb-4">Project Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Strategy Type</span>
                      <span className="text-white">{strategyTypes.find(s => s.id === formData.strategyType)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Platform</span>
                      <span className="text-white">{platforms.find(p => p.id === formData.platform)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Indicators</span>
                      <span className="text-white">{formData.indicators}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Timeframes</span>
                      <span className="text-white">{formData.timeframes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Risk Management</span>
                      <span className="text-white">{riskManagementOptions.find(r => r.id === formData.riskManagement)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Multi-Pair</span>
                      <span className="text-white">{formData.multiPair ? 'Yes' : 'No'}</span>
                    </div>
                    {formData.features.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Additional Features</span>
                        <span className="text-white">{formData.features.length} selected</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={prevStep}
                    className="px-8 py-3 border border-white/20 text-white font-bold rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    ← Modify
                  </motion.button>
                  <AnimatedButton href="/contact" variant="glow" className="flex-1">
                    Get Exact Quote →
                  </AnimatedButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live Price Preview */}
        {step < 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-card rounded-full px-6 py-3 flex items-center gap-4"
          >
            <span className="text-gray-400 text-sm">Current estimate:</span>
            <span className="text-xl font-bold text-white">${price.mid}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
