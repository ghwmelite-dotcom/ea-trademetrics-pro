'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [toolsOpen, setToolsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/results', label: 'Results' },
    { href: '/blog', label: 'Blog' },
  ];

  const toolsItems = [
    { href: '/tools/calculator', label: 'Profitability Calculator', icon: '📊', description: 'Monte Carlo simulation' },
    { href: '/tools/estimator', label: 'Cost Estimator', icon: '💰', description: 'Get instant quote' },
    { href: '/tools/audit', label: 'Strategy Audit', icon: '🔍', description: 'Analyze Pine Script' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-strong shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Animated Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="text-2xl font-bold text-white font-display"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                TradeMetrics
              </motion.span>
              <motion.span
                className="text-2xl font-bold text-gradient font-display"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Pro
              </motion.span>
            </motion.div>
            <motion.span
              className="text-gray-500 hidden sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              |
            </motion.span>
            <motion.span
              className="text-sm font-medium text-gray-400 hidden sm:block group-hover:text-[#00d4ff] transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              EA Development
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <motion.ul
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                <Link href={item.href} className="nav-link py-2">
                  {item.label}
                </Link>
              </motion.li>
            ))}
            {/* Tools Dropdown */}
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button className="nav-link py-2 flex items-center gap-1">
                Tools
                <svg className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-72 glass-card rounded-xl p-2 shadow-xl"
                  >
                    {toolsItems.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <span className="text-2xl">{tool.icon}</span>
                        <div>
                          <div className="text-white font-medium text-sm">{tool.label}</div>
                          <div className="text-gray-400 text-xs">{tool.description}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            >
              <a
                href="https://trademetricspro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00d4ff] hover:text-[#00ff88] transition-colors font-medium flex items-center gap-1"
              >
                Main Platform
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.li>
          </motion.ul>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 relative z-50"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              <motion.span
                className="absolute left-0 w-6 h-0.5 bg-white rounded-full"
                animate={{
                  top: isMenuOpen ? '50%' : '25%',
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? '-50%' : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-white rounded-full"
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                  x: isMenuOpen ? 20 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-0 w-6 h-0.5 bg-white rounded-full"
                animate={{
                  bottom: isMenuOpen ? '50%' : '25%',
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? '50%' : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <motion.ul
                className="flex flex-col gap-2 py-6"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                }}
              >
                {navItems.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -20 },
                    }}
                  >
                    <Link
                      href={item.href}
                      className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                {/* Tools in Mobile */}
                <motion.li
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -20 },
                  }}
                >
                  <div className="py-2 px-4">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Tools</div>
                    <div className="space-y-1">
                      {toolsItems.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="flex items-center gap-3 py-2 px-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span>{tool.icon}</span>
                          <span className="text-sm">{tool.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.li>
                <motion.li
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -20 },
                  }}
                >
                  <a
                    href="https://trademetricspro.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-3 px-4 text-[#00d4ff] hover:text-[#00ff88] transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Main Platform
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
