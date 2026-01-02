'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CurrencyCode = 'GHS' | 'USD' | 'NGN' | 'EUR' | 'GBP';

interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amount: number, showCode?: boolean) => string;
  convertPrice: (amountInGHS: number) => number;
  currencies: Currency[];
}

// Base currency is GHS - all prices in services.json are in GHS
// Exchange rates: 1 GHS = X other currency (January 2026 rates)
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  GHS: 1,
  USD: 0.0951,      // 1 GHS = 0.0951 USD (1 USD = 10.51 GHS)
  NGN: 149.5,       // 1 GHS = 149.5 NGN
  EUR: 0.0917,      // 1 GHS = 0.0917 EUR
  GBP: 0.0758,      // 1 GHS = 0.0758 GBP
};

export const CURRENCIES: Currency[] = [
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', flag: '🇬🇭' },
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
];

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]); // Default to GHS

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('preferred-currency');
    if (saved) {
      const found = CURRENCIES.find(c => c.code === saved);
      if (found) setCurrencyState(found);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    const found = CURRENCIES.find(c => c.code === code);
    if (found) {
      setCurrencyState(found);
      localStorage.setItem('preferred-currency', code);
    }
  };

  const convertPrice = (amountInGHS: number): number => {
    const rate = EXCHANGE_RATES[currency.code];
    return Math.round(amountInGHS * rate);
  };

  const formatPrice = (amountInGHS: number, showCode = false): string => {
    const converted = convertPrice(amountInGHS);
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(converted);

    return showCode
      ? `${currency.symbol}${formatted} ${currency.code}`
      : `${currency.symbol}${formatted}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      formatPrice,
      convertPrice,
      currencies: CURRENCIES
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
