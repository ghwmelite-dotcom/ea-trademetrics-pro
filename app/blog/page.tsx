'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui';

// Lazy load heavy background effects for better mobile performance
const GlowingOrbs = dynamic(() => import('@/components/ui/GlowingOrbs').then(mod => mod.default), { ssr: false });
const GridBackground = dynamic(() => import('@/components/ui/GlowingOrbs').then(mod => mod.GridBackground), { ssr: false });

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featured?: boolean;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'pine-script-to-mql-conversion-guide',
    title: 'Why Your Pine Script Strategy Won\'t Work Directly as an EA (And How to Fix It)',
    excerpt: 'TradingView\'s Pine Script and MetaTrader\'s MQL are fundamentally different. Learn the key differences and what it takes to convert your profitable TradingView strategy into a working Expert Advisor.',
    category: 'Conversion',
    readTime: '8 min',
    date: '2024-12-15',
    featured: true,
  },
  {
    slug: 'mt4-vs-mt5-ea-development',
    title: 'MT4 vs MT5 for EA Development: Which Platform Should You Choose?',
    excerpt: 'A comprehensive comparison of MetaTrader 4 and MetaTrader 5 for automated trading. We cover execution speed, hedging capabilities, multi-currency testing, and more.',
    category: 'Platform',
    readTime: '10 min',
    date: '2024-12-10',
    featured: true,
  },
  {
    slug: 'how-to-backtest-ea-properly',
    title: 'How to Properly Backtest Your Expert Advisor (Avoid These 7 Mistakes)',
    excerpt: 'Most traders backtest incorrectly and get misleading results. Learn the right way to test your EA with proper data quality, spread simulation, and forward testing.',
    category: 'Testing',
    readTime: '12 min',
    date: '2024-12-05',
  },
  {
    slug: 'ea-risk-management-guide',
    title: 'Complete Guide to EA Risk Management: Position Sizing, Stop Loss, and Drawdown Control',
    excerpt: 'Risk management is what separates profitable EAs from account killers. Master the essential techniques for protecting your capital in automated trading.',
    category: 'Risk Management',
    readTime: '15 min',
    date: '2024-11-28',
  },
  {
    slug: 'common-ea-development-mistakes',
    title: '10 Common EA Development Mistakes That Kill Profitability',
    excerpt: 'From curve fitting to ignoring slippage, these mistakes can turn a winning strategy into a losing one. Learn how to avoid them and build robust EAs.',
    category: 'Development',
    readTime: '11 min',
    date: '2024-11-20',
  },
  {
    slug: 'ea-optimization-best-practices',
    title: 'EA Optimization Best Practices: Finding Robust Parameters Without Overfitting',
    excerpt: 'Optimization is a double-edged sword. Learn how to use the Strategy Tester effectively, implement walk-forward analysis, and find parameters that work in live trading.',
    category: 'Optimization',
    readTime: '14 min',
    date: '2024-11-15',
  },
  {
    slug: 'mql4-vs-mql5-differences',
    title: 'MQL4 vs MQL5: Key Differences Every EA Developer Should Know',
    excerpt: 'While similar in syntax, MQL4 and MQL5 have significant differences in event handling, order management, and indicator access. Here\'s what you need to know.',
    category: 'Development',
    readTime: '9 min',
    date: '2024-11-08',
  },
  {
    slug: 'ea-news-filter-implementation',
    title: 'How to Implement a News Filter in Your EA (Step-by-Step Guide)',
    excerpt: 'High-impact news events can cause massive slippage and unexpected losses. Learn how to add a robust news filter to protect your EA during volatile periods.',
    category: 'Development',
    readTime: '10 min',
    date: '2024-11-01',
  },
];

const categories = ['All', 'Conversion', 'Platform', 'Testing', 'Risk Management', 'Development', 'Optimization'];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured);

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
            <span className="text-[#00d4ff]">📚</span>
            <span className="text-sm font-medium text-gray-300">Knowledge Base</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
            EA Development <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expert guides, tutorials, and insights on Expert Advisor development, strategy conversion, and automated trading.
          </p>
        </AnimatedSection>

        {/* Categories */}
        <AnimatedSection delay={0.2} className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, index) => (
              <motion.button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0
                    ? 'bg-[#00d4ff] text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Featured Posts */}
        <AnimatedSection delay={0.3} className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 font-display">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <motion.article
                  className="glass-card rounded-2xl overflow-hidden h-full group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Gradient Header */}
                  <div className="h-40 bg-gradient-to-br from-[#00d4ff]/20 to-[#00ff88]/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-[#00d4ff] text-black text-xs font-bold rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <motion.div
                      className="absolute -top-10 -right-10 w-40 h-40 bg-[#00d4ff]/20 rounded-full blur-3xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00d4ff] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{post.date}</span>
                      <span className="text-[#00d4ff] flex items-center gap-1">
                        {post.readTime} read
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </AnimatedSection>

        {/* All Posts */}
        <AnimatedSection delay={0.4}>
          <h2 className="text-2xl font-bold text-white mb-6 font-display">All Articles</h2>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <motion.article
                  className="glass-card rounded-xl p-6 flex flex-col md:flex-row gap-6 group hover:border-[#00d4ff]/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 5 }}
                >
                  {/* Category Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#00ff88]/20 flex items-center justify-center">
                      <span className="text-2xl">
                        {post.category === 'Development' && '💻'}
                        {post.category === 'Testing' && '🧪'}
                        {post.category === 'Risk Management' && '🛡️'}
                        {post.category === 'Optimization' && '⚙️'}
                        {post.category === 'Conversion' && '🔄'}
                        {post.category === 'Platform' && '📊'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-0.5 bg-white/10 text-gray-300 text-xs rounded">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read Time */}
                  <div className="flex-shrink-0 flex items-center">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <svg className="w-5 h-5 text-[#00d4ff] ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </AnimatedSection>

        {/* Newsletter CTA */}
        <AnimatedSection delay={0.5} className="mt-16">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto relative overflow-hidden">
            <motion.div
              className="absolute -top-20 -right-20 w-60 h-60 bg-[#00d4ff]/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="relative z-10">
              <div className="text-4xl mb-4">📬</div>
              <h3 className="text-2xl font-bold text-white mb-3 font-display">
                Stay Updated
              </h3>
              <p className="text-gray-400 mb-6">
                Get weekly tips on EA development, trading automation, and strategy optimization delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff] transition-colors"
                />
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-bold rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </form>
              <p className="text-xs text-gray-500 mt-3">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
