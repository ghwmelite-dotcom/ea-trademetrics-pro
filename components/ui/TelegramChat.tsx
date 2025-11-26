'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface TelegramChatProps {
  username: string;
  className?: string;
}

export default function TelegramChat({ username, className = '' }: TelegramChatProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const telegramUrl = `https://t.me/${username.replace('@', '')}`;

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-20 right-0 whitespace-nowrap"
          >
            <div className="glass-card rounded-xl px-4 py-3 text-sm">
              <p className="text-white font-medium">Need help? Chat with us!</p>
              <p className="text-gray-400 text-xs mt-1">Usually responds within minutes</p>
            </div>
            <div className="absolute -bottom-2 right-6 w-4 h-4 glass-card rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#0088cc] to-[#00a8e8] shadow-lg cursor-pointer"
        onMouseEnter={() => {
          setIsHovered(true);
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setTimeout(() => setShowTooltip(false), 200);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 1,
        }}
      >
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#0088cc]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(0,136,204,0.5)]" />

        {/* Telegram Icon */}
        <motion.svg
          className="w-8 h-8 text-white relative z-10"
          fill="currentColor"
          viewBox="0 0 24 24"
          animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </motion.svg>

        {/* Online indicator */}
        <motion.div
          className="absolute top-0 right-0 w-4 h-4 bg-[#00ff88] rounded-full border-2 border-[#050508]"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.a>

      {/* "Live Chat" label on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-5 right-20 whitespace-nowrap"
          >
            <span className="glass-card rounded-full px-4 py-2 text-sm font-medium text-white">
              Live Chat
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Compact inline chat button for header/navbar
export function TelegramChatButton({ username, className = '' }: TelegramChatProps) {
  const telegramUrl = `https://t.me/${username.replace('@', '')}`;

  return (
    <motion.a
      href={telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0088cc] to-[#00a8e8] text-white font-medium rounded-xl cursor-pointer ${className}`}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 10px 30px rgba(0, 136, 204, 0.4)',
      }}
      whileTap={{ scale: 0.95 }}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
      <span>Live Chat</span>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
      </span>
    </motion.a>
  );
}
