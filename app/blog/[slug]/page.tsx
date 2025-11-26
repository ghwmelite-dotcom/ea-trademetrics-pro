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
