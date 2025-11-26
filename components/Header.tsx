'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-white/10">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">TradeMetrics</span>
              <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>Pro</span>
            </div>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm font-medium text-gray-300">EA Development</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link href="/" className="text-gray-300 hover:text-[var(--color-primary)] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-gray-300 hover:text-[var(--color-primary)] transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/locations" className="text-gray-300 hover:text-[var(--color-primary)] transition-colors">
                Locations
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-300 hover:text-[var(--color-primary)] transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-300 hover:text-[var(--color-primary)] transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="https://trademetricspro.com"
                target="_blank"
                className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors font-medium"
              >
                Main Platform
              </Link>
            </li>
          </ul>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[var(--color-primary)]/30 transition-all"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/"
                  className="block text-gray-300 hover:text-[var(--color-primary)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="block text-gray-300 hover:text-[var(--color-primary)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="block text-gray-300 hover:text-[var(--color-primary)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block text-gray-300 hover:text-[var(--color-primary)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block text-gray-300 hover:text-[var(--color-primary)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="https://trademetricspro.com"
                  target="_blank"
                  className="block text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Main Platform
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
