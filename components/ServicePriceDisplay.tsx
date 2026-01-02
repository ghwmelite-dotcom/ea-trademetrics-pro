'use client';

import { useCurrency } from '@/contexts/CurrencyContext';

interface ServicePriceDisplayProps {
  min: number;
  max: number;
  className?: string;
}

export default function ServicePriceDisplay({ min, max, className = '' }: ServicePriceDisplayProps) {
  const { formatPrice } = useCurrency();

  return (
    <span className={className}>
      {formatPrice(min)} - {formatPrice(max)}
    </span>
  );
}

interface ServicePriceBadgeProps {
  min: number;
  max: number;
  currency: string;
}

export function ServicePriceBadge({ min, max }: ServicePriceBadgeProps) {
  const { formatPrice, currency } = useCurrency();

  return (
    <span className="px-4 py-2 bg-[#00d4ff]/20 text-[#00d4ff] rounded-full text-sm font-semibold">
      {formatPrice(min)} - {formatPrice(max)} {currency.code}
    </span>
  );
}

interface PricingInfoProps {
  pricingInfo?: string;
  min?: number;
}

export function PricingInfo({ pricingInfo, min = 3153 }: PricingInfoProps) {
  const { formatPrice } = useCurrency();

  if (pricingInfo) {
    return <p className="text-gray-300">{pricingInfo}</p>;
  }

  return <p className="text-gray-300">Starting from {formatPrice(min)}</p>;
}
