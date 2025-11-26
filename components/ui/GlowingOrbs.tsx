'use client';

import { motion } from 'framer-motion';

interface GlowingOrbsProps {
  className?: string;
  variant?: 'hero' | 'section' | 'subtle';
}

export default function GlowingOrbs({ className = '', variant = 'hero' }: GlowingOrbsProps) {
  const orbConfigs = {
    hero: [
      { color: 'from-[#00d4ff]/30', size: 'w-[500px] h-[500px]', position: 'top-[-200px] right-[-100px]', delay: 0 },
      { color: 'from-[#0066ff]/25', size: 'w-[400px] h-[400px]', position: 'bottom-[-150px] left-[-100px]', delay: 2 },
      { color: 'from-[#7c3aed]/20', size: 'w-[300px] h-[300px]', position: 'top-[40%] left-[20%]', delay: 4 },
    ],
    section: [
      { color: 'from-[#00d4ff]/20', size: 'w-[350px] h-[350px]', position: 'top-[-100px] right-[-50px]', delay: 0 },
      { color: 'from-[#0066ff]/15', size: 'w-[250px] h-[250px]', position: 'bottom-[-80px] left-[-50px]', delay: 1 },
    ],
    subtle: [
      { color: 'from-[#00d4ff]/10', size: 'w-[200px] h-[200px]', position: 'top-[10%] right-[10%]', delay: 0 },
      { color: 'from-[#0066ff]/10', size: 'w-[150px] h-[150px]', position: 'bottom-[20%] left-[5%]', delay: 1.5 },
    ],
  };

  const orbs = orbConfigs[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.size} ${orb.position} rounded-full bg-gradient-radial ${orb.color} to-transparent blur-3xl`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Floating particles effect
export function FloatingParticles({ count = 20, className = '' }: { count?: number; className?: string }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#00d4ff]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(0, 212, 255, 0.5)`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Grid lines background
export function GridBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Horizontal scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent"
          animate={{
            top: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Vertical scan line */}
        <motion.div
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00d4ff]/30 to-transparent"
          animate={{
            left: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
    </div>
  );
}
