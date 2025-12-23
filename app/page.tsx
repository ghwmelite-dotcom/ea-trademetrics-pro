'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedButton, AnimatedCard, AnimatedCounter, GlowingOrbs, FloatingParticles, GridBackground } from '@/components/ui';

export default function HomePage() {
  const services = [
    {
      icon: '🤖',
      title: 'MT4 Expert Advisors',
      description: 'Custom-coded trading bots for MetaTrader 4 with advanced risk management and optimization.',
      href: '/services/mt4-expert-advisor-development',
    },
    {
      icon: '⚡',
      title: 'MT5 Expert Advisors',
      description: 'Next-gen EAs leveraging MT5\'s multi-currency testing and hedging capabilities.',
      href: '/services/mt5-expert-advisor-development',
    },
    {
      icon: '🔄',
      title: 'Pine Script Conversion',
      description: 'Convert your TradingView strategies to MQL4/MQL5 for live automated trading.',
      href: '/services/pine-script-to-mql-conversion',
    },
    {
      icon: '📊',
      title: 'Backtesting & Optimization',
      description: 'Rigorous historical testing and parameter optimization for peak performance.',
      href: '/services/strategy-backtesting-optimization',
    },
  ];

  const stats = [
    { value: 400, suffix: '+', label: 'Service Pages' },
    { value: 12, label: 'Services' },
    { value: 52, suffix: '+', label: 'Locations' },
    { value: 98, suffix: '%', label: 'Satisfaction' },
  ];

  const features = [
    { icon: '🔒', title: 'Secure Code', description: 'Your strategy remains confidential' },
    { icon: '🚀', title: 'Fast Delivery', description: '2-4 weeks typical turnaround' },
    { icon: '🎯', title: 'Precision', description: 'Exact strategy replication' },
    { icon: '💬', title: '24/7 Support', description: 'Ongoing maintenance included' },
  ];

  const tools = [
    {
      icon: '📊',
      title: 'Profitability Calculator',
      description: 'Run 1,000 Monte Carlo simulations to see how your strategy could perform over time.',
      href: '/tools/calculator',
      color: 'from-[#00d4ff] to-[#0088cc]',
      stats: '1,000 simulations',
    },
    {
      icon: '💰',
      title: 'Cost Estimator',
      description: 'Get an instant price range for your EA project in under 2 minutes.',
      href: '/tools/estimator',
      color: 'from-[#00ff88] to-[#00cc6a]',
      stats: 'Instant quote',
    },
    {
      icon: '🔍',
      title: 'Strategy Audit',
      description: 'Paste your Pine Script and get complexity analysis, issues, and conversion estimate.',
      href: '/tools/audit',
      color: 'from-[#ff6b6b] to-[#ee5a5a]',
      stats: 'Free analysis',
    },
  ];

  const trackRecord = [
    { name: 'Momentum Scalper', gain: 127.4, drawdown: 12.3, status: 'live' },
    { name: 'SwingMaster EA', gain: 84.2, drawdown: 8.7, status: 'live' },
    { name: 'Grid Recovery', gain: 156.8, drawdown: 24.5, status: 'demo' },
    { name: 'Breakout Hunter', gain: 52.3, drawdown: 6.2, status: 'live' },
  ];

  const blogPosts = [
    {
      title: 'Why Your Pine Script Strategy Won\'t Work Directly as an EA',
      category: 'Conversion',
      readTime: '8 min',
      href: '/blog/pine-script-to-mql-conversion-guide',
    },
    {
      title: 'MT4 vs MT5 for EA Development: Which Platform?',
      category: 'Platform',
      readTime: '10 min',
      href: '/blog/mt4-vs-mt5-ea-development',
    },
    {
      title: 'How to Properly Backtest Your Expert Advisor',
      category: 'Testing',
      readTime: '12 min',
      href: '/blog/how-to-backtest-ea-properly',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-20 px-4 overflow-hidden">
        <GlowingOrbs variant="hero" />
        <FloatingParticles count={30} />
        <GridBackground />

        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Trust badge */}
            <AnimatedSection delay={0.1}>
              <motion.div
                className="inline-flex items-center gap-3 px-5 py-2.5 glass rounded-full mb-8"
                whileHover={{ scale: 1.02 }}
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
                </span>
                <span className="text-sm font-medium text-gray-300">
                  Trusted by <span className="text-white font-semibold">200+</span> Traders Worldwide
                </span>
              </motion.div>
            </AnimatedSection>

            {/* Main headline */}
            <AnimatedSection delay={0.2}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-display leading-[1.1]">
                Turn Your Strategy Into a
                <motion.span
                  className="block mt-2 text-gradient glow-text"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  Profitable Robot
                </motion.span>
              </h1>
            </AnimatedSection>

            {/* Subheadline */}
            <AnimatedSection delay={0.4}>
              <p className="text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto">
                Expert MT4/MT5 EA development and TradingView strategy conversion.
                <span className="text-white"> Get a custom-coded trading bot</span> that executes your strategy 24/7 with precision.
              </p>
            </AnimatedSection>

            {/* CTA Buttons */}
            <AnimatedSection delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <AnimatedButton href="/tools/estimator" variant="glow" size="lg">
                  <span>Get Instant Quote</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </AnimatedButton>
                <AnimatedButton href="/tools/calculator" variant="ghost" size="lg">
                  <span>Test Your Strategy</span>
                </AnimatedButton>
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection delay={0.8}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="relative p-6 glass-card rounded-2xl text-center group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                    />
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center">
            <motion.div
              className="w-1.5 h-3 bg-[#00d4ff] rounded-full mt-2"
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* Free Tools Section */}
      <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-transparent via-[#00ff88]/5 to-transparent">
        <div className="container mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-[#00ff88]">🎁</span>
              <span className="text-sm font-medium text-gray-300">100% Free Tools</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
              Plan Your Project <span className="text-gradient">Before You Start</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Use our free tools to analyze your strategy, estimate costs, and simulate performance - no sign-up required.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link href={tool.href}>
                  <motion.div
                    className="relative glass-card rounded-2xl p-8 h-full group overflow-hidden"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Gradient overlay on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Icon with glow */}
                    <motion.div
                      className="relative text-6xl mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {tool.icon}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${tool.color} blur-2xl opacity-30`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>

                    {/* Badge */}
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-4 bg-gradient-to-r ${tool.color} text-white`}>
                      {tool.stats}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 font-display group-hover:text-[#00d4ff] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {tool.description}
                    </p>

                    <div className="flex items-center gap-2 text-[#00d4ff] font-medium">
                      <span>Try Now</span>
                      <motion.svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Tools Showcase Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <GlowingOrbs variant="section" />
        <div className="container mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-[#00d4ff]">✨</span>
              <span className="text-sm font-medium text-gray-300">Premium Features</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
              Interactive <span className="text-gradient">Trading Tools</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience our live demo simulator, track real EA performance, and monitor your project progress in real-time.
            </p>
          </AnimatedSection>

          {/* Tool 1: EA Backtest Simulator */}
          <motion.div
            className="glass-card rounded-3xl p-8 mb-8 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">🎮</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">EA Backtest Simulator</h3>
                    <span className="text-[#00ff88] text-sm font-medium">Interactive Demo</span>
                  </div>
                </div>
                <p className="text-gray-400 mb-6">
                  Test trading strategies in real-time with our interactive simulator. Choose from MA Crossover, RSI Reversal, or Channel Breakout strategies and watch the equity curve unfold.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {['3 Strategies', 'Live Equity Curve', 'Full Statistics', 'Adjustable Parameters'].map((feature) => (
                    <span key={feature} className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10">
                      {feature}
                    </span>
                  ))}
                </div>
                <Link href="/tools/demo">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-bold rounded-xl flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Launch Simulator
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.button>
                </Link>
              </div>

              {/* Mini Chart Preview */}
              <motion.div
                className="relative bg-black/30 rounded-2xl p-6 border border-white/10"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">Equity Curve Preview</span>
                  <span className="px-2 py-1 bg-[#00ff88]/20 text-[#00ff88] text-xs rounded-full">+47.3%</span>
                </div>
                <svg className="w-full h-32" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00d4ff" />
                      <stop offset="100%" stopColor="#00ff88" />
                    </linearGradient>
                    <linearGradient id="chartFill1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 80 Q50 75 100 60 T200 40 T300 25 T400 15" fill="none" stroke="url(#chartGradient1)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M0 80 Q50 75 100 60 T200 40 T300 25 T400 15 L400 100 L0 100 Z" fill="url(#chartFill1)" />
                </svg>
                <div className="grid grid-cols-4 gap-4 mt-4 text-center">
                  <div>
                    <div className="text-white font-bold">156</div>
                    <div className="text-xs text-gray-500">Trades</div>
                  </div>
                  <div>
                    <div className="text-[#00ff88] font-bold">68.2%</div>
                    <div className="text-xs text-gray-500">Win Rate</div>
                  </div>
                  <div>
                    <div className="text-white font-bold">2.14</div>
                    <div className="text-xs text-gray-500">Profit Factor</div>
                  </div>
                  <div>
                    <div className="text-yellow-400 font-bold">12.3%</div>
                    <div className="text-xs text-gray-500">Max DD</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Tools 2 & 3: Side by Side */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tool 2: Performance Dashboard */}
            <motion.div
              className="glass-card rounded-2xl p-6 overflow-hidden group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📈</span>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Live Performance Dashboard</h3>
                  <span className="text-[#00d4ff] text-sm font-medium">Real Results</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Track real-time performance of EAs we&apos;ve built for clients. Verified results with equity curves and full statistics.
              </p>

              {/* Mini EA Cards Preview */}
              <div className="space-y-2 mb-4">
                {[
                  { name: 'Trend Hunter Pro', gain: '+48.5%', status: 'live' },
                  { name: 'Scalper X', gain: '+42.5%', status: 'live' },
                  { name: 'Grid Master', gain: '+25.0%', status: 'live' },
                ].map((ea, i) => (
                  <motion.div
                    key={ea.name}
                    className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/5"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
                      </span>
                      <span className="text-sm text-white">{ea.name}</span>
                    </div>
                    <span className="text-[#00ff88] font-bold text-sm">{ea.gain}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">6 Active EAs • Updated Live</span>
                <Link href="/tools/performance">
                  <motion.span
                    className="text-[#00d4ff] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    View Dashboard
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            {/* Tool 3: Project Tracker */}
            <motion.div
              className="glass-card rounded-2xl p-6 overflow-hidden group"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📍</span>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Project Progress Tracker</h3>
                  <span className="text-[#00ff88] text-sm font-medium">Client Portal</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Track your EA development project in real-time. See milestones, receive updates, and know exactly when your bot will be ready.
              </p>

              {/* Progress Preview */}
              <div className="bg-black/20 rounded-lg p-4 border border-white/5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white font-medium">Multi-Pair Scalper EA</span>
                  <span className="px-2 py-0.5 bg-[#00d4ff]/20 text-[#00d4ff] text-xs rounded-full">In Development</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-[#00d4ff] to-[#00ff88] h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '55%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>55% Complete</span>
                  <span>Est. Jan 15, 2026</span>
                </div>

                {/* Mini Timeline */}
                <div className="flex items-center gap-1 mt-3">
                  {['Discovery', 'Design', 'Development', 'Testing', 'Delivery'].map((phase, i) => (
                    <div key={phase} className="flex-1 flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${i < 3 ? 'bg-[#00ff88]' : i === 3 ? 'bg-[#00d4ff] animate-pulse' : 'bg-white/20'}`} />
                      <span className="text-[10px] text-gray-500 mt-1 hidden sm:block">{phase}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Demo: TMP-2025-A7B3</span>
                <Link href="/tools/tracker">
                  <motion.span
                    className="text-[#00d4ff] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    Track Project
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <GlowingOrbs variant="section" />

        <div className="container mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[#00d4ff] font-semibold text-sm uppercase tracking-wider mb-4 block">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
              Expert EA Development Services
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From concept to deployment, we build trading bots that perform.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <AnimatedCard key={index} delay={index * 0.1}>
                <Link href={service.href} className="block p-8 h-full">
                  <motion.div
                    className="text-5xl mb-6"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3 font-display">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#00d4ff] text-sm font-medium group-hover:gap-3 transition-all">
                    Learn more
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </AnimatedCard>
            ))}
          </div>

          <AnimatedSection delay={0.5} className="text-center mt-12">
            <AnimatedButton href="/services" variant="ghost">
              View All 12 Services
            </AnimatedButton>
          </AnimatedSection>
        </div>
      </section>

      {/* Track Record Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
                Our <span className="text-gradient">Track Record</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Real results from Expert Advisors we&apos;ve built. All accounts verified through third-party tracking services.
              </p>

              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#00ff88]">+97%</div>
                  <div className="text-xs text-gray-400">Avg Gain</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">13%</div>
                  <div className="text-xs text-gray-400">Avg DD</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#00d4ff]">6</div>
                  <div className="text-xs text-gray-400">Live EAs</div>
                </div>
              </div>

              <AnimatedButton href="/results" variant="glow">
                View Full Track Record
              </AnimatedButton>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="space-y-4">
                {trackRecord.map((ea, index) => (
                  <motion.div
                    key={index}
                    className="glass-card rounded-xl p-5 flex items-center justify-between"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#00ff88]/20 flex items-center justify-center text-xl">
                        🤖
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white">{ea.name}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            ea.status === 'live' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {ea.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">Max DD: {ea.drawdown}%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#00ff88]">+{ea.gain}%</div>
                      <div className="text-xs text-gray-500">Total Gain</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-[#00d4ff]/5 to-transparent">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-[#00d4ff] font-semibold text-sm uppercase tracking-wider mb-4 block">
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
                Your Strategy, <span className="text-gradient">Perfectly Coded</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                We don&apos;t just write code - we translate your trading vision into a precision instrument that executes flawlessly in any market condition.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-2xl">{feature.icon}</div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                      <p className="text-gray-500 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="relative">
                <motion.div
                  className="glass-card rounded-2xl p-8 font-mono text-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-2 mb-6">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <pre className="text-gray-300 overflow-x-auto">
                    <code>
{`// Your Strategy → Our Code
void OnTick() {
  if(BuySignal()) {
    OpenPosition(OP_BUY);
    `}<span className="text-[#00ff88]">{`// Risk-managed entry`}</span>{`
  }

  ManageTrailingStop();
  `}<span className="text-[#00d4ff]">{`// Dynamic SL/TP`}</span>{`

  if(SellSignal()) {
    OpenPosition(OP_SELL);
  }
}

`}<span className="text-[#00d4ff]">{`// Built with precision`}</span>{`
`}<span className="text-[#00ff88]">{`// Tested rigorously`}</span>{`
`}<span className="text-gray-500">{`// Delivered on time`}</span>
                    </code>
                  </pre>
                </motion.div>

                <motion.div
                  className="absolute -top-4 -right-4 glass px-4 py-2 rounded-full text-sm text-white"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  MQL4 / MQL5
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-full text-sm text-[#00d4ff]"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                >
                  Pine Script
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Knowledge Base Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <GlowingOrbs variant="section" />

        <div className="container mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-[#00d4ff]">📚</span>
              <span className="text-sm font-medium text-gray-300">Knowledge Base</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
              Learn From <span className="text-gradient">The Experts</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Free guides and tutorials on EA development, strategy conversion, and automated trading.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={post.href}>
                  <motion.article
                    className="glass-card rounded-xl overflow-hidden h-full group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-32 bg-gradient-to-br from-[#00d4ff]/20 to-[#00ff88]/20 relative">
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-1 bg-[#00d4ff] text-black text-xs font-bold rounded">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-white mb-3 group-hover:text-[#00d4ff] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{post.readTime} read</span>
                        <span className="text-[#00d4ff] flex items-center gap-1">
                          Read
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </div>

          <AnimatedSection delay={0.4} className="text-center mt-12">
            <AnimatedButton href="/blog" variant="ghost">
              View All Articles
            </AnimatedButton>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <GlowingOrbs variant="section" />

        <div className="container mx-auto relative z-10">
          <AnimatedSection>
            <motion.div
              className="relative glass-card rounded-3xl p-12 md:p-16 text-center overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 rounded-3xl border border-[#00d4ff]/20" />
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(0, 212, 255, 0.3), transparent)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
                  Ready to Automate <span className="text-gradient">Your Trading?</span>
                </h2>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                  Start with our free tools or schedule a consultation to discuss your project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AnimatedButton href="/tools/estimator" variant="glow" size="lg">
                    Get Instant Quote
                  </AnimatedButton>
                  <AnimatedButton href="/contact" variant="ghost" size="lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Book Consultation</span>
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
