'use client';

import { useState, useRef, useEffect } from 'react';
import { useCurrency, CurrencyCode } from '@/contexts/CurrencyContext';

export default function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      {/* Animated glow background */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-[#00ff88] rounded-2xl blur-md transition-all duration-500 ${
          isOpen || isHovered ? 'opacity-70 scale-105' : 'opacity-0 scale-100'
        }`}
      />

      {/* Main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
          isOpen
            ? 'bg-[#0a0a15]/95 shadow-2xl shadow-[#00d4ff]/20'
            : 'bg-gradient-to-br from-[#0f0f1a]/90 to-[#1a1a2e]/90'
        } backdrop-blur-xl border border-white/10 hover:border-[#00d4ff]/50 group`}
        aria-label="Select currency"
        aria-expanded={isOpen}
      >
        {/* Animated currency icon */}
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-br from-[#00d4ff] to-[#00ff88] rounded-full blur-sm transition-opacity duration-300 ${
            isHovered || isOpen ? 'opacity-60' : 'opacity-0'
          }`} />
          <div className="relative w-8 h-8 bg-gradient-to-br from-[#00d4ff]/20 to-[#a855f7]/20 rounded-full flex items-center justify-center border border-white/10">
            <span className="text-lg transform group-hover:scale-110 transition-transform duration-300">
              {currency.flag}
            </span>
          </div>
        </div>

        {/* Currency info */}
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-400 leading-none">Currency</span>
          <span className="font-bold text-white tracking-wide flex items-center gap-1">
            <span className="text-[#00d4ff]">{currency.symbol}</span>
            {currency.code}
          </span>
        </div>

        {/* Animated chevron */}
        <div className={`ml-1 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg
            className="w-4 h-4 text-[#00d4ff]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Sparkle effect on hover */}
        <div className={`absolute top-1 right-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-[10px] animate-pulse">✨</span>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 z-50 animate-in fade-in slide-in-from-top-3 duration-300">
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-b from-[#00d4ff]/30 via-[#a855f7]/20 to-transparent rounded-2xl blur-xl" />

          {/* Main dropdown container */}
          <div className="relative bg-[#0a0a12]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
            {/* Header with animated gradient line */}
            <div className="relative px-4 py-3 border-b border-white/5">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#00d4ff]/20 to-[#a855f7]/20 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#00d4ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-300">Select Currency</span>
              </div>
            </div>

            {/* Currency options */}
            <div className="py-2 max-h-80 overflow-y-auto">
              {currencies.map((curr, index) => (
                <button
                  key={curr.code}
                  onClick={() => {
                    setCurrency(curr.code as CurrencyCode);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 group/item relative ${
                    currency.code === curr.code
                      ? 'bg-gradient-to-r from-[#00d4ff]/15 via-[#00d4ff]/10 to-transparent'
                      : 'hover:bg-white/5'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Active indicator line */}
                  {currency.code === curr.code && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#00d4ff] to-[#00ff88] rounded-r-full" />
                  )}

                  {/* Flag with glow */}
                  <div className="relative">
                    {currency.code === curr.code && (
                      <div className="absolute inset-0 bg-[#00d4ff] rounded-full blur-md opacity-40" />
                    )}
                    <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      currency.code === curr.code
                        ? 'bg-gradient-to-br from-[#00d4ff]/30 to-[#a855f7]/30 scale-110'
                        : 'bg-white/5 group-hover/item:bg-white/10 group-hover/item:scale-105'
                    }`}>
                      <span className="text-xl">{curr.flag}</span>
                    </div>
                  </div>

                  {/* Currency details */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold transition-colors ${
                        currency.code === curr.code ? 'text-[#00d4ff]' : 'text-white'
                      }`}>
                        {curr.code}
                      </span>
                      <span className={`text-sm px-1.5 py-0.5 rounded-md ${
                        currency.code === curr.code
                          ? 'bg-[#00d4ff]/20 text-[#00d4ff]'
                          : 'bg-white/5 text-gray-400'
                      }`}>
                        {curr.symbol}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{curr.name}</p>
                  </div>

                  {/* Checkmark */}
                  {currency.code === curr.code && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#00ff88] flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Footer with live rate indicator */}
            <div className="px-4 py-2.5 border-t border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
                </span>
                Live rates • Updated Jan 2026
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
