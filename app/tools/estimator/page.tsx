'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection, GlowingOrbs, GridBackground } from '@/components/ui';

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
  const [quoteGenerated, setQuoteGenerated] = useState(false);
  const [quoteNumber, setQuoteNumber] = useState('');
  const quoteRef = useRef<HTMLDivElement>(null);
  const totalSteps = 5;

  const generateQuoteNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `TMP-${timestamp.slice(-4)}-${random}`;
  };

  const handleGenerateQuote = () => {
    setQuoteNumber(generateQuoteNumber());
    setQuoteGenerated(true);
  };

  const handlePrintQuote = () => {
    window.print();
  };

  const handleDownloadQuote = () => {
    // Create a text version of the quote for download
    const strategy = strategyTypes.find(s => s.id === formData.strategyType);
    const platform = platforms.find(p => p.id === formData.platform);
    const riskMgmt = riskManagementOptions.find(r => r.id === formData.riskManagement);
    const urgency = urgencyOptions.find(u => u.id === formData.urgency);
    const selectedFeatures = formData.features.map(f => additionalFeatures.find(af => af.id === f)?.label).filter(Boolean);

    const quoteText = `
================================================================================
                         TRADEMETRICS PRO - EA DEVELOPMENT
                              PROJECT QUOTE ESTIMATE
================================================================================

Quote Reference: ${quoteNumber}
Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Valid For: 14 days

--------------------------------------------------------------------------------
                              PROJECT SPECIFICATIONS
--------------------------------------------------------------------------------

Strategy Type:        ${strategy?.label} - ${strategy?.description}
Trading Platform:     ${platform?.label}
Number of Indicators: ${formData.indicators}
Timeframes Used:      ${formData.timeframes}
Multi-Pair Trading:   ${formData.multiPair ? 'Yes' : 'No'}
Risk Management:      ${riskMgmt?.label} - ${riskMgmt?.description}
Delivery Timeline:    ${urgency?.label} (${urgency?.description})

${selectedFeatures.length > 0 ? `Additional Features:
${selectedFeatures.map(f => `  - ${f}`).join('\n')}` : 'Additional Features:   None selected'}

--------------------------------------------------------------------------------
                              ESTIMATED INVESTMENT
--------------------------------------------------------------------------------

                    Low Estimate:     $${price.low}
                    Mid Estimate:     $${price.mid}  (Recommended Budget)
                    High Estimate:    $${price.high}

--------------------------------------------------------------------------------
                                 NEXT STEPS
--------------------------------------------------------------------------------

1. REVIEW THIS QUOTE
   Take time to review the specifications above. If anything needs adjustment,
   use our estimator tool again with updated requirements.

2. SCHEDULE A CONSULTATION
   Book a free 15-minute consultation to discuss your project in detail.
   Contact: contact@trademetricspro.com

3. PROJECT KICKOFF
   Once we agree on specifications, you'll receive:
   - Detailed project proposal
   - Development timeline
   - Payment schedule (50% upfront, 50% on completion)

4. DEVELOPMENT & DELIVERY
   - Regular progress updates
   - Testing phase with your feedback
   - Final delivery with documentation
   - 30-day support period included

--------------------------------------------------------------------------------
                                  CONTACT US
--------------------------------------------------------------------------------

Email:      contact@trademetricspro.com
Website:    https://ea.trademetricspro.com
Telegram:   @my_ea_hub

================================================================================
          Thank you for considering TradeMetrics Pro for your EA development!
================================================================================
`;

    const blob = new Blob([quoteText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TradeMetrics-Quote-${quoteNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleStartOver = () => {
    setFormData(initialFormData);
    setStep(1);
    setQuoteGenerated(false);
    setQuoteNumber('');
  };

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
                <p className="text-gray-400 mb-6">Select any extra features you&apos;d like included.</p>

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

            {/* Step 5: Results & Quote Generation */}
            {step === 5 && !quoteGenerated && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-2 font-display">Your Estimate</h2>
                <p className="text-gray-400 mb-6">Based on your requirements, here&apos;s the estimated cost.</p>

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
                  <motion.button
                    onClick={handleGenerateQuote}
                    className="flex-1 px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-bold rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Generate My Quote Document
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 5b: Generated Quote Document */}
            {step === 5 && quoteGenerated && (
              <motion.div
                key="step5b"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Action Buttons - Top */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <motion.button
                    onClick={handleDownloadQuote}
                    className="flex items-center gap-2 px-6 py-3 bg-[#00d4ff] text-black font-bold rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Quote
                  </motion.button>
                  <motion.button
                    onClick={handlePrintQuote}
                    className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-bold rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Quote
                  </motion.button>
                  <motion.button
                    onClick={handleStartOver}
                    className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-bold rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Start New Quote
                  </motion.button>
                </div>

                {/* Quote Document */}
                <div ref={quoteRef} className="glass-card rounded-2xl p-8 print:bg-white print:text-black" id="quote-document">
                  {/* Header */}
                  <div className="border-b border-white/10 print:border-gray-300 pb-6 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <h1 className="text-2xl font-bold text-white print:text-black font-display">TradeMetrics Pro</h1>
                        <p className="text-gray-400 print:text-gray-600">EA Development Services</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400 print:text-gray-600">Quote Reference</div>
                        <div className="text-xl font-mono font-bold text-[#00d4ff] print:text-blue-600">{quoteNumber}</div>
                        <div className="text-sm text-gray-400 print:text-gray-600 mt-1">
                          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 print:bg-gray-100 rounded-2xl p-6 mb-6 text-center">
                    <div className="text-sm text-gray-400 print:text-gray-600 mb-2">Estimated Investment</div>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 print:text-gray-500">Low</div>
                        <div className="text-xl text-gray-400 print:text-gray-600">${price.low}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-[#00d4ff] print:text-blue-600">Recommended</div>
                        <div className="text-4xl font-bold text-white print:text-black">${price.mid}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 print:text-gray-500">High</div>
                        <div className="text-xl text-gray-400 print:text-gray-600">${price.high}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 print:text-gray-600 mt-3">
                      Delivery: <span className="text-[#00d4ff] print:text-blue-600 font-medium">{getTimeline()}</span>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-white print:text-black mb-4">Project Specifications</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white/5 print:bg-gray-50 rounded-xl p-4">
                        <div className="text-xs text-gray-500 print:text-gray-500 uppercase tracking-wider mb-1">Strategy Type</div>
                        <div className="text-white print:text-black font-medium">{strategyTypes.find(s => s.id === formData.strategyType)?.label}</div>
                        <div className="text-sm text-gray-400 print:text-gray-600">{strategyTypes.find(s => s.id === formData.strategyType)?.description}</div>
                      </div>
                      <div className="bg-white/5 print:bg-gray-50 rounded-xl p-4">
                        <div className="text-xs text-gray-500 print:text-gray-500 uppercase tracking-wider mb-1">Platform</div>
                        <div className="text-white print:text-black font-medium">{platforms.find(p => p.id === formData.platform)?.label}</div>
                      </div>
                      <div className="bg-white/5 print:bg-gray-50 rounded-xl p-4">
                        <div className="text-xs text-gray-500 print:text-gray-500 uppercase tracking-wider mb-1">Technical Complexity</div>
                        <div className="text-white print:text-black font-medium">{formData.indicators} Indicators, {formData.timeframes} Timeframe{formData.timeframes > 1 ? 's' : ''}</div>
                        <div className="text-sm text-gray-400 print:text-gray-600">{formData.multiPair ? 'Multi-pair enabled' : 'Single pair'}</div>
                      </div>
                      <div className="bg-white/5 print:bg-gray-50 rounded-xl p-4">
                        <div className="text-xs text-gray-500 print:text-gray-500 uppercase tracking-wider mb-1">Risk Management</div>
                        <div className="text-white print:text-black font-medium">{riskManagementOptions.find(r => r.id === formData.riskManagement)?.label}</div>
                        <div className="text-sm text-gray-400 print:text-gray-600">{riskManagementOptions.find(r => r.id === formData.riskManagement)?.description}</div>
                      </div>
                    </div>

                    {/* Additional Features */}
                    {formData.features.length > 0 && (
                      <div className="mt-4">
                        <div className="text-xs text-gray-500 print:text-gray-500 uppercase tracking-wider mb-2">Additional Features</div>
                        <div className="flex flex-wrap gap-2">
                          {formData.features.map(featureId => {
                            const feature = additionalFeatures.find(f => f.id === featureId);
                            return feature ? (
                              <span key={featureId} className="px-3 py-1 bg-[#00d4ff]/10 print:bg-blue-100 text-[#00d4ff] print:text-blue-600 rounded-full text-sm">
                                {feature.label}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Next Steps */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-white print:text-black mb-4">Next Steps</h2>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00d4ff]/20 print:bg-blue-100 flex items-center justify-center text-[#00d4ff] print:text-blue-600 font-bold text-sm">1</div>
                        <div>
                          <div className="font-medium text-white print:text-black">Review Your Quote</div>
                          <div className="text-sm text-gray-400 print:text-gray-600">Take time to review the specifications. This quote is valid for 14 days.</div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00d4ff]/20 print:bg-blue-100 flex items-center justify-center text-[#00d4ff] print:text-blue-600 font-bold text-sm">2</div>
                        <div>
                          <div className="font-medium text-white print:text-black">Schedule a Consultation</div>
                          <div className="text-sm text-gray-400 print:text-gray-600">Book a free 15-minute call to discuss your project details and get a finalized quote.</div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00d4ff]/20 print:bg-blue-100 flex items-center justify-center text-[#00d4ff] print:text-blue-600 font-bold text-sm">3</div>
                        <div>
                          <div className="font-medium text-white print:text-black">Project Kickoff</div>
                          <div className="text-sm text-gray-400 print:text-gray-600">Upon agreement, receive a detailed proposal with timeline and payment schedule (50% upfront, 50% on completion).</div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00d4ff]/20 print:bg-blue-100 flex items-center justify-center text-[#00d4ff] print:text-blue-600 font-bold text-sm">4</div>
                        <div>
                          <div className="font-medium text-white print:text-black">Development & Delivery</div>
                          <div className="text-sm text-gray-400 print:text-gray-600">Regular updates, testing phase, final delivery with documentation, and 30-day support included.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="border-t border-white/10 print:border-gray-300 pt-6">
                    <h2 className="text-lg font-bold text-white print:text-black mb-4">Ready to Proceed?</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <a href="mailto:contact@trademetricspro.com" className="flex items-center gap-3 p-4 bg-white/5 print:bg-gray-50 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-[#00d4ff]/20 print:bg-blue-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#00d4ff] print:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 print:text-gray-500">Email</div>
                          <div className="text-sm text-white print:text-black">contact@trademetricspro.com</div>
                        </div>
                      </a>
                      <a href="https://t.me/my_ea_hub" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/5 print:bg-gray-50 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-[#00d4ff]/20 print:bg-blue-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#00d4ff] print:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 print:text-gray-500">Telegram</div>
                          <div className="text-sm text-white print:text-black">@my_ea_hub</div>
                        </div>
                      </a>
                      <a href="/contact" className="flex items-center gap-3 p-4 bg-white/5 print:bg-gray-50 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-[#00d4ff]/20 print:bg-blue-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#00d4ff] print:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 print:text-gray-500">Contact Form</div>
                          <div className="text-sm text-white print:text-black">Send a Message</div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-white/10 print:border-gray-300 text-center text-xs text-gray-500 print:text-gray-500">
                    <p>Quote Reference: {quoteNumber} | Valid for 14 days | Generated on {new Date().toLocaleDateString()}</p>
                    <p className="mt-1">TradeMetrics Pro - Professional EA Development Services</p>
                  </div>
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
