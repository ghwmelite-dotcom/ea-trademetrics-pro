'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Error Icon */}
        <motion.div
          className="w-24 h-24 mx-auto mb-8 bg-red-500/20 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-4 font-display">
          Something Went Wrong
        </h1>
        <p className="text-gray-400 mb-8">
          We apologize for the inconvenience. An unexpected error occurred while loading this page.
        </p>

        {/* Error details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-8 text-left bg-white/5 rounded-lg p-4">
            <summary className="text-sm text-gray-400 cursor-pointer">
              Error Details
            </summary>
            <pre className="mt-2 text-xs text-red-400 overflow-auto">
              {error.message}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-semibold rounded-xl hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:ring-offset-2 focus:ring-offset-[#050508]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Try Again
          </motion.button>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-center focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Go Home
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          If this problem persists, please{' '}
          <Link href="/contact" className="text-[#00d4ff] hover:underline">
            contact us
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
}
