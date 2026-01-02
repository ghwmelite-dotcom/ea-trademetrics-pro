'use client';

import CurrencySelector from './CurrencySelector';

export default function ServicesHeader() {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-end mb-4">
        <CurrencySelector />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Our EA Development Services
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Professional Expert Advisor development for MT4 and MT5. From custom trading bots to TradingView strategy conversion.
      </p>
    </div>
  );
}
