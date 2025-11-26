'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode, MouseEvent, useState } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
  magnetic?: boolean;
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  magnetic = true,
}: AnimatedButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!magnetic) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-semibold rounded-xl',
    ghost: 'bg-white/5 border border-white/20 text-white font-semibold rounded-xl hover:border-[#00d4ff]/50',
    glow: 'bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-semibold rounded-xl pulse-glow',
  };

  const buttonContent = (
    <motion.span
      className="relative z-10 flex items-center justify-center gap-2"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.span>
  );

  const buttonStyles = `
    relative inline-flex items-center justify-center
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    overflow-hidden
    transition-all duration-300
    ${className}
  `;

  const motionProps = {
    whileHover: {
      scale: 1.02,
      boxShadow: variant === 'primary' || variant === 'glow'
        ? '0 10px 40px rgba(0, 212, 255, 0.4), 0 0 60px rgba(0, 212, 255, 0.2)'
        : '0 10px 40px rgba(255, 255, 255, 0.1)',
    },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles}
          {...motionProps}
        >
          {buttonContent}
          <ShineEffect />
        </motion.a>
      );
    }
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a className={buttonStyles} {...motionProps}>
          {buttonContent}
          <ShineEffect />
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button onClick={onClick} className={buttonStyles} {...motionProps}>
      {buttonContent}
      <ShineEffect />
    </motion.button>
  );
}

// Shine effect overlay
function ShineEffect() {
  return (
    <motion.span
      className="absolute inset-0 overflow-hidden rounded-xl"
      initial={{ x: '-100%' }}
      whileHover={{ x: '100%' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" />
    </motion.span>
  );
}

// Arrow button for CTAs
export function ArrowButton({
  children,
  href,
  className = '',
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link href={href}>
      <motion.span
        className={`group inline-flex items-center gap-2 text-[#00d4ff] font-medium cursor-pointer ${className}`}
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        {children}
        <motion.span
          className="inline-block"
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.span>
      </motion.span>
    </Link>
  );
}
