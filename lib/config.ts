// Site Configuration - Centralized constants
// Values can be overridden via environment variables

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'TradeMetrics Pro EA Development',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ea.trademetricspro.com',
  description: 'Professional Expert Advisor development for MT4/MT5. Convert your TradingView strategies to automated trading bots.',

  // Contact Information
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ea@trademetricspro.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+233559876543',
    whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || '+233559876543',
    telegram: process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || 'my_ea_hub',
  },

  // Business Information
  business: {
    name: 'TradeMetrics Pro',
    legalName: 'TradeMetrics Pro (Hodges & Co.)',
    address: {
      street: '',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      countryCode: 'GH',
    },
    hours: 'Mon - Fri: 8:00 AM - 6:00 PM GMT',
    timezone: 'Africa/Accra',
  },

  // Social Links
  social: {
    telegram: 'https://t.me/my_ea_hub',
    twitter: 'https://twitter.com/trademetricspro',
    linkedin: 'https://linkedin.com/company/trademetricspro',
    github: 'https://github.com/trademetricspro',
  },

  // SEO Defaults
  seo: {
    titleTemplate: '%s | TradeMetrics Pro EA Development',
    defaultTitle: 'TradeMetrics Pro EA Development | Professional MT4/MT5 Expert Advisors',
    defaultDescription: 'Professional Expert Advisor development for MT4/MT5. Convert your TradingView strategies to automated trading bots. Based in Accra, Ghana, serving traders worldwide.',
    keywords: [
      'MT4 EA development',
      'MT5 Expert Advisor',
      'TradingView conversion',
      'automated trading',
      'forex robot',
      'trading bot',
      'MQL4',
      'MQL5',
      'Pine Script conversion',
      'Ghana',
    ],
  },

  // Feature Flags
  features: {
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    chatWidget: process.env.NEXT_PUBLIC_ENABLE_CHAT_WIDGET !== 'false',
  },

  // Analytics
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '',
  },
} as const;

// Service categories for structured data
export const serviceCategories = [
  'EA Development',
  'Strategy Conversion',
  'Backtesting',
  'Optimization',
  'Custom Indicators',
  'Maintenance',
] as const;

// Supported platforms
export const platforms = ['MT4', 'MT5', 'TradingView'] as const;

export type Platform = typeof platforms[number];
export type ServiceCategory = typeof serviceCategories[number];
