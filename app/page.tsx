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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-20 px-4 overflow-hidden">
        {/* Animated backgrounds */}
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
                <AnimatedButton href="/contact" variant="glow" size="lg">
                  <span>Start Your Project</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </AnimatedButton>
                <AnimatedButton href="/services" variant="ghost" size="lg">
                  <span>View Services</span>
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
                {/* Decorative code block */}
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
{`// Your Strategy → Our Code
void OnTick() {
  if(BuySignal()) {
    OpenPosition(OP_BUY);
    `}<span className="text-[#00ff88]">// Risk-managed entry</span>{`
  }

  ManageTrailingStop();
  `}<span className="text-[#00d4ff]">// Dynamic SL/TP</span>{`

  if(SellSignal()) {
    OpenPosition(OP_SELL);
  }
}

`}<span className="text-[#00d4ff]">// Built with precision</span>{`
`}<span className="text-[#00ff88]">// Tested rigorously</span>{`
`}<span className="text-gray-500">// Delivered on time</span>
                  </pre>
                </motion.div>

                {/* Floating badges */}
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
              {/* Animated border */}
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
                  Schedule a free consultation to discuss your project. No obligations, just expert advice.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AnimatedButton href="/contact" variant="glow" size="lg">
                    Get Free Consultation
                  </AnimatedButton>
                  <AnimatedButton href="tel:+233XXXXXXXX" variant="ghost" size="lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Call Us Now</span>
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
