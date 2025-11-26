import { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';

// Generate static params for all blog posts
export function generateStaticParams() {
  return [
    { slug: 'pine-script-to-mql-conversion-guide' },
    { slug: 'mt4-vs-mt5-ea-development' },
    { slug: 'how-to-backtest-ea-properly' },
    { slug: 'ea-risk-management-guide' },
    { slug: 'common-ea-development-mistakes' },
    { slug: 'ea-optimization-best-practices' },
    { slug: 'mql4-vs-mql5-differences' },
    { slug: 'ea-news-filter-implementation' },
  ];
}

// Blog metadata
const blogMeta: Record<string, { title: string; description: string }> = {
  'pine-script-to-mql-conversion-guide': {
    title: 'Why Your Pine Script Strategy Won\'t Work as an EA | TradeMetrics Pro',
    description: 'Learn the key differences between Pine Script and MQL, and what it takes to convert your TradingView strategy into a working Expert Advisor.',
  },
  'mt4-vs-mt5-ea-development': {
    title: 'MT4 vs MT5 for EA Development | TradeMetrics Pro',
    description: 'A comprehensive comparison of MetaTrader 4 and MetaTrader 5 for automated trading. Covers execution, testing, and when to choose each platform.',
  },
  'how-to-backtest-ea-properly': {
    title: 'How to Properly Backtest Your EA (Avoid These 7 Mistakes) | TradeMetrics Pro',
    description: 'Most traders backtest incorrectly and get misleading results. Learn the right way to test your EA with proper data quality, spread simulation, and forward testing.',
  },
  'ea-risk-management-guide': {
    title: 'Complete EA Risk Management Guide: Position Sizing & Drawdown Control | TradeMetrics Pro',
    description: 'Master position sizing, stop loss strategies, and drawdown control. Learn the Kelly Criterion and how to implement proper risk management in your Expert Advisor.',
  },
  'common-ea-development-mistakes': {
    title: '10 Common EA Development Mistakes That Kill Profitability | TradeMetrics Pro',
    description: 'From curve fitting to ignoring slippage, these mistakes can turn a winning strategy into a losing one. Learn how to avoid them and build robust EAs.',
  },
  'ea-optimization-best-practices': {
    title: 'EA Optimization Best Practices: Find Robust Parameters | TradeMetrics Pro',
    description: 'Learn how to use the Strategy Tester effectively, implement walk-forward analysis, and find parameters that work in live trading without overfitting.',
  },
  'mql4-vs-mql5-differences': {
    title: 'MQL4 vs MQL5: Key Differences Every EA Developer Should Know | TradeMetrics Pro',
    description: 'While similar in syntax, MQL4 and MQL5 have significant differences in event handling, order management, and indicator access. Complete comparison guide.',
  },
  'ea-news-filter-implementation': {
    title: 'How to Implement a News Filter in Your EA (Step-by-Step) | TradeMetrics Pro',
    description: 'High-impact news events can cause massive slippage and losses. Learn how to add a robust news filter to protect your EA during volatile periods.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = blogMeta[slug];
  return {
    title: meta?.title || 'Blog | TradeMetrics Pro',
    description: meta?.description || 'Expert guides on EA development and automated trading.',
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
