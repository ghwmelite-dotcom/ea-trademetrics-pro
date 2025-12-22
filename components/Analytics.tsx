'use client';

import Script from 'next/script';
import { siteConfig } from '@/lib/config';

// Google Analytics Component
export function GoogleAnalytics() {
  const gaId = siteConfig.analytics.gaId;

  if (!gaId || !siteConfig.features.analytics) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
          });
        `}
      </Script>
    </>
  );
}

// Plausible Analytics (privacy-focused alternative)
export function PlausibleAnalytics() {
  const domain = siteConfig.analytics.plausibleDomain;

  if (!domain || !siteConfig.features.analytics) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}

// Combined Analytics Provider
export function AnalyticsProvider() {
  if (!siteConfig.features.analytics) {
    return null;
  }

  // Prefer Plausible if configured, otherwise use GA
  if (siteConfig.analytics.plausibleDomain) {
    return <PlausibleAnalytics />;
  }

  if (siteConfig.analytics.gaId) {
    return <GoogleAnalytics />;
  }

  return null;
}

// Track custom events
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  // Plausible
  if (window.plausible) {
    window.plausible(eventName, { props: eventParams });
  }
}

// Track page views (for SPA navigation)
export function trackPageView(url: string) {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (window.gtag && siteConfig.analytics.gaId) {
    window.gtag('config', siteConfig.analytics.gaId, {
      page_path: url,
    });
  }

  // Plausible tracks automatically
}

// Declare global types for analytics
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
    dataLayer?: unknown[];
  }
}
