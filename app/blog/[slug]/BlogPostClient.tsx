'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedButton, GlowingOrbs, GridBackground } from '@/components/ui';

// Blog post content (in production, this would come from a CMS or MDX files)
const blogContent: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
  tableOfContents: string[];
}> = {
  'pine-script-to-mql-conversion-guide': {
    title: 'Why Your Pine Script Strategy Won\'t Work Directly as an EA (And How to Fix It)',
    category: 'Conversion',
    date: '2024-12-15',
    readTime: '8 min',
    tableOfContents: [
      'The Fundamental Differences',
      'Execution Model',
      'Data Access',
      'Order Management',
      'What Needs to Change',
      'Conclusion',
    ],
    content: [
      `## The Fundamental Differences

TradingView's Pine Script and MetaTrader's MQL4/MQL5 were designed with completely different philosophies. Understanding these differences is crucial before attempting any conversion.

**Pine Script** is a domain-specific language designed for rapid strategy prototyping and indicator creation. It abstracts away most of the complexity of market data handling and order execution, making it easy for traders to test ideas quickly.

**MQL4/MQL5**, on the other hand, gives you direct access to the trading platform's internals. This power comes with responsibility - you need to handle things that Pine Script does automatically.`,

      `## Execution Model

One of the biggest differences is how code executes:

### Pine Script
- Runs once per bar close (by default)
- Has access to all historical data at once
- Can "look ahead" in backtests (dangerous!)
- Repainting is common if not careful

### MQL4/MQL5
- Runs on every tick in real-time
- Must explicitly request historical data
- No future data access (more realistic)
- Handles real-time price updates

**Key Issue:** A strategy that "works" in Pine Script backtests might fail in live MQL trading because of these execution differences.`,

      `## Data Access

### Pine Script
\`\`\`pine
// Simple indicator access
rsi = ta.rsi(close, 14)
sma = ta.sma(close, 20)
\`\`\`

### MQL4
\`\`\`mql4
// More explicit data handling
double rsi = iRSI(Symbol(), Period(), 14, PRICE_CLOSE, 0);
double sma = iMA(Symbol(), Period(), 20, 0, MODE_SMA, PRICE_CLOSE, 0);
\`\`\`

The MQL approach requires more code but gives you finer control over buffer management and multi-timeframe access.`,

      `## Order Management

This is where the biggest differences lie:

### Pine Script
\`\`\`pine
if buyCondition
    strategy.entry("Long", strategy.long)
strategy.exit("Exit", "Long", profit=100, loss=50)
\`\`\`

In MQL, you need to handle slippage settings, error checking, order modification (SL/TP can't always be set on entry), position tracking, partial closes, and multiple orders per strategy.`,

      `## What Needs to Change

When converting your Pine Script strategy to MQL, expect to:

1. **Rewrite indicator access** - MQL uses handles and buffers
2. **Add error handling** - Every order operation can fail
3. **Implement tick handling** - Decide when to check for signals
4. **Build position management** - Track your own orders
5. **Handle partial fills** - MQL shows the real market
6. **Add proper logging** - Debug issues in live trading
7. **Consider spread and slippage** - Real trading costs`,

      `## Conclusion

Converting Pine Script to MQL isn't just "translating" code - it's rebuilding your strategy for a different trading environment. The good news is that strategies that survive this process tend to be more robust and realistic.

**Our recommendation:** Before converting, make sure your Pine Script strategy doesn't rely on repainting indicators, uses realistic spread/commission settings, has proper risk management, and shows consistent results across different time periods.

Need help with your conversion? [Get a free strategy audit](/tools/audit) or [contact us](/contact) to discuss your project.`,
    ],
  },
  'mt4-vs-mt5-ea-development': {
    title: 'MT4 vs MT5 for EA Development: Which Platform Should You Choose?',
    category: 'Platform',
    date: '2024-12-10',
    readTime: '10 min',
    tableOfContents: [
      'Platform Overview',
      'Language Differences',
      'Testing Capabilities',
      'Order Execution',
      'When to Choose MT4',
      'When to Choose MT5',
    ],
    content: [
      `## Platform Overview

MetaTrader 4 (MT4) has been the industry standard since 2005. MetaTrader 5 (MT5) was released in 2010 with significant improvements. Both platforms remain widely used, and the choice between them impacts your EA development.

**MT4 Statistics:**
- Used by 70%+ of retail forex brokers
- Simpler API, easier to learn
- Larger community and code library
- Limited to forex/CFDs at most brokers

**MT5 Statistics:**
- Growing adoption, especially for stocks
- More powerful backtesting
- Better multi-currency support
- Access to exchange-traded instruments`,

      `## Language Differences

### MQL4 Characteristics
- C-like syntax
- Simple order functions (OrderSend, OrderModify)
- Direct indicator access
- Easier to learn for beginners

### MQL5 Characteristics
- Object-oriented programming support
- Handle-based indicator system
- More complex but more powerful
- Better code organization for large projects`,

      `## Testing Capabilities

**MT4 Strategy Tester:**
- Single currency testing only
- "Every tick" or "Open prices only"
- Basic optimization
- Good for simple strategies

**MT5 Strategy Tester:**
- Multi-currency testing
- Real tick data support
- Forward testing built-in
- Visual mode improvements
- Cloud optimization (MQL5 Cloud Network)

For serious backtesting, MT5 is significantly better.`,

      `## Order Execution

### MT4 (Hedging by default)
- Can have multiple positions on same symbol
- Simple position management
- OrderSend for all operations
- Limited order types

### MT5 (Netting or Hedging)
- Netting mode: One position per symbol
- Hedging mode: Multiple positions (like MT4)
- More order types (Buy Stop Limit, etc.)
- Position-based accounting`,

      `## When to Choose MT4

Choose MT4 when your broker only offers MT4, your strategy is simple (single pair, single timeframe), you need to use existing MT4 indicators/EAs, target audience primarily uses MT4, or quick development is priority.`,

      `## When to Choose MT5

Choose MT5 when building multi-currency portfolios, need accurate tick-by-tick backtesting, trading stocks or futures, building complex scalable systems, or for long-term projects with ongoing development.

**Our Recommendation:** For new projects in 2024+, we recommend MT5 unless you have a specific reason to use MT4.

Need help deciding? [Contact us](/contact) for a consultation.`,
    ],
  },
};

// Default content for posts without full content
const defaultContent = {
  title: 'Article Coming Soon',
  category: 'General',
  date: '2024-12-01',
  readTime: '5 min',
  tableOfContents: ['Introduction', 'Main Content', 'Conclusion'],
  content: [
    `## Introduction

This article is currently being written by our team of EA development experts. Check back soon for the full content.

In the meantime, feel free to explore our other resources:

- [Strategy Profitability Calculator](/tools/calculator) - Test your strategy parameters
- [EA Cost Estimator](/tools/estimator) - Get an instant quote
- [Strategy Audit Tool](/tools/audit) - Analyze your Pine Script
- [Our Track Record](/results) - See verified EA results`,

    `## Want This Article Faster?

Subscribe to our newsletter and we'll notify you when new articles are published.

Or [contact us](/contact) directly if you have specific questions about EA development.`,
  ],
};

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const post = blogContent[slug] || {
    ...defaultContent,
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <GlowingOrbs variant="section" />
      <GridBackground />

      <div className="container mx-auto relative z-10">
        {/* Breadcrumb */}
        <AnimatedSection className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#00d4ff] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-300">{post.category}</span>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#00d4ff]/20 text-[#00d4ff] text-sm font-medium rounded-full">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">{post.date}</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">{post.readTime} read</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">
              {post.title}
            </h1>
          </AnimatedSection>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <AnimatedSection delay={0.2} className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="glass-card rounded-xl p-4">
                  <h3 className="text-sm font-bold text-white mb-3">Table of Contents</h3>
                  <ul className="space-y-2">
                    {post.tableOfContents.map((item, index) => (
                      <li key={index}>
                        <a
                          href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors block py-1"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Main Content */}
            <AnimatedSection delay={0.3} className="lg:col-span-3">
              <article className="glass-card rounded-2xl p-6 md:p-10">
                <div className="prose prose-invert prose-lg max-w-none">
                  {post.content.map((section, index) => (
                    <div
                      key={index}
                      className="mb-8 text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: section
                          .replace(/^## (.+)$/gm, '<h2 id="$1" class="text-2xl font-bold text-white mt-10 mb-4 font-display scroll-mt-24">$1</h2>')
                          .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-6 mb-3 font-display">$1</h3>')
                          .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                          .replace(/`([^`]+)`/g, '<code class="px-2 py-1 bg-white/10 rounded text-[#00d4ff] text-sm font-mono">$1</code>')
                          .replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre class="bg-[#0a0a0f] rounded-xl p-4 overflow-x-auto my-4"><code class="text-sm font-mono text-gray-300">$2</code></pre>')
                          .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#00d4ff] hover:underline">$1</a>')
                          .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
                          .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4"><span class="text-[#00d4ff]">$1.</span> $2</li>')
                          .replace(/\n\n/g, '</p><p class="mb-4">')
                      }}
                    />
                  ))}
                </div>
              </article>

              {/* Author Box */}
              <motion.div
                className="glass-card rounded-xl p-6 mt-8 flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#00ff88] flex items-center justify-center text-2xl">
                  🧑‍💻
                </div>
                <div>
                  <h4 className="font-bold text-white">TradeMetrics Pro Team</h4>
                  <p className="text-sm text-gray-400">Expert EA developers with 10+ years of experience in automated trading systems.</p>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                className="glass-card rounded-xl p-8 mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl font-bold text-white mb-3">Need Help With Your EA Project?</h3>
                <p className="text-gray-400 mb-6">Get expert assistance with strategy conversion, EA development, or optimization.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AnimatedButton href="/tools/audit" variant="glow">
                    Free Strategy Audit
                  </AnimatedButton>
                  <AnimatedButton href="/contact" variant="ghost">
                    Contact Us
                  </AnimatedButton>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Related Posts */}
          <AnimatedSection delay={0.6} className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6 font-display">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(blogContent)
                .filter(([s]) => s !== slug)
                .slice(0, 2)
                .map(([s, p]) => (
                  <Link href={`/blog/${s}`} key={s}>
                    <motion.div
                      className="glass-card rounded-xl p-6 hover:border-[#00d4ff]/30 transition-colors"
                      whileHover={{ y: -5 }}
                    >
                      <span className="text-xs px-2 py-1 bg-white/10 rounded text-gray-300">{p.category}</span>
                      <h3 className="text-lg font-bold text-white mt-3 mb-2">{p.title}</h3>
                      <span className="text-sm text-[#00d4ff]">{p.readTime} read →</span>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
