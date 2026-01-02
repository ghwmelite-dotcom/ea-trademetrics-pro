'use client';

import { useState, useRef, useEffect } from 'react';
import { useCurrency, CurrencyCode } from '@/contexts/CurrencyContext';

export default function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00d4ff]/30 rounded-lg transition-all text-sm font-medium text-white"
        aria-label="Select currency"
        aria-expanded={isOpen}
      >
        <span className="text-base">{currency.flag}</span>
        <span>{currency.code}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#0a0a0f] border border-white/10 rounded-xl shadow-xl shadow-black/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            <p className="text-xs text-gray-500 px-2 py-1 uppercase tracking-wider">Select Currency</p>
          </div>
          <div className="border-t border-white/5">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => {
                  setCurrency(curr.code as CurrencyCode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${
                  currency.code === curr.code
                    ? 'bg-[#00d4ff]/10 text-[#00d4ff]'
                    : 'text-white'
                }`}
              >
                <span className="text-lg">{curr.flag}</span>
                <div className="flex-1 text-left">
                  <p className="font-medium">{curr.code}</p>
                  <p className="text-xs text-gray-500">{curr.name}</p>
                </div>
                {currency.code === curr.code && (
                  <svg className="w-5 h-5 text-[#00d4ff]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
