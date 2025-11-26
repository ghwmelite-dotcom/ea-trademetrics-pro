'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover3D?: boolean;
  glowOnHover?: boolean;
}

export default function AnimatedCard({
  children,
  className = '',
  delay = 0,
  hover3D = true,
  glowOnHover = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={hover3D ? {
        y: -8,
        rotateX: 2,
        rotateY: 2,
        transition: { duration: 0.3 },
      } : {
        y: -4,
        transition: { duration: 0.3 },
      }}
      className={`relative glass-card rounded-2xl overflow-hidden card-shine ${glowOnHover ? 'hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]' : ''} ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {children}
    </motion.div>
  );
}

// Staggered card container for grid layouts
export function AnimatedCardGrid({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Individual card item for use inside AnimatedCardGrid
export function AnimatedCardItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
          },
        },
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      className={`relative glass-card rounded-2xl overflow-hidden card-shine hover:shadow-[0_0_40px_rgba(0,212,255,0.15)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
