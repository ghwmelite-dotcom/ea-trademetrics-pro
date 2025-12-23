'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection, GlowingOrbs, GridBackground } from '@/components/ui';

// Project status types
type ProjectStatus = 'requirements' | 'design' | 'development' | 'testing' | 'delivery' | 'completed';

interface ProjectMilestone {
  id: ProjectStatus;
  name: string;
  description: string;
  icon: string;
}

interface ProjectUpdate {
  date: string;
  title: string;
  description: string;
  type: 'info' | 'milestone' | 'delivery';
}

interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  estimatedDelivery: string;
  type: string;
  platform: string;
  updates: ProjectUpdate[];
  currentPhaseDetails: string;
}

const milestones: ProjectMilestone[] = [
  { id: 'requirements', name: 'Requirements', description: 'Gathering and documenting project specifications', icon: '📋' },
  { id: 'design', name: 'Design', description: 'Strategy architecture and logic design', icon: '🎨' },
  { id: 'development', name: 'Development', description: 'Coding and implementing the EA', icon: '💻' },
  { id: 'testing', name: 'Testing', description: 'Backtesting and optimization', icon: '🧪' },
  { id: 'delivery', name: 'Delivery', description: 'Final review and handover', icon: '🚀' },
  { id: 'completed', name: 'Completed', description: 'Project delivered successfully', icon: '✅' },
];

// Demo projects (in production, this would come from a database/API)
const demoProjects: Record<string, Project> = {
  'TMP-2025-A7B3': {
    id: 'TMP-2025-A7B3',
    name: 'Multi-Pair Scalper EA',
    client: 'John D.',
    status: 'development',
    progress: 55,
    startDate: '2025-12-05',
    estimatedDelivery: '2026-01-15',
    type: 'Scalping EA',
    platform: 'MT5',
    currentPhaseDetails: 'Currently implementing the multi-pair correlation filter and position sizing logic. Core entry/exit signals are complete.',
    updates: [
      { date: '2025-12-22', title: 'Development Progress', description: 'Position sizing module 80% complete. Moving to risk management integration.', type: 'info' },
      { date: '2025-12-18', title: 'Development Started', description: 'Core trading logic implementation begun. Entry signals coded and initial testing complete.', type: 'milestone' },
      { date: '2025-12-14', title: 'Design Approved', description: 'Strategy architecture finalized. Moving to development phase.', type: 'milestone' },
      { date: '2025-12-10', title: 'Design Phase', description: 'Designing the multi-pair correlation system and risk management module.', type: 'info' },
      { date: '2025-12-05', title: 'Project Started', description: 'Initial consultation completed. Requirements gathering begun.', type: 'milestone' },
    ],
  },
  'TMP-2025-K9F2': {
    id: 'TMP-2025-K9F2',
    name: 'News Trading Bot',
    client: 'Sarah M.',
    status: 'testing',
    progress: 78,
    startDate: '2025-11-18',
    estimatedDelivery: '2025-12-30',
    type: 'News Trading EA',
    platform: 'MT4',
    currentPhaseDetails: 'Running comprehensive backtests across major news events from 2021-2025. Optimizing entry timing and position sizing.',
    updates: [
      { date: '2025-12-21', title: 'Backtesting Progress', description: 'Completed 2023-2025 news events testing. Win rate at 64.2%.', type: 'info' },
      { date: '2025-12-16', title: 'Testing Phase Started', description: 'Beginning extensive backtesting on historical news events.', type: 'milestone' },
      { date: '2025-12-10', title: 'Development Complete', description: 'All features implemented including news calendar integration.', type: 'milestone' },
      { date: '2025-12-01', title: 'API Integration', description: 'Successfully integrated economic calendar API for news detection.', type: 'info' },
      { date: '2025-11-18', title: 'Project Started', description: 'Requirements gathered and design phase initiated.', type: 'milestone' },
    ],
  },
  'TMP-2025-M3P8': {
    id: 'TMP-2025-M3P8',
    name: 'Grid Recovery System',
    client: 'Michael R.',
    status: 'delivery',
    progress: 95,
    startDate: '2025-10-28',
    estimatedDelivery: '2025-12-24',
    type: 'Grid Trading EA',
    platform: 'MT5',
    currentPhaseDetails: 'Final documentation being prepared. EA files packaged and ready for delivery. Scheduling handover call for tomorrow.',
    updates: [
      { date: '2025-12-23', title: 'Preparing Delivery', description: 'Creating user manual and preparing final files for handover.', type: 'delivery' },
      { date: '2025-12-18', title: 'Testing Complete', description: 'All tests passed. Profit factor of 1.85 achieved in backtests.', type: 'milestone' },
      { date: '2025-12-08', title: 'Optimization Complete', description: 'Optimal parameters found for EURUSD, GBPUSD, and USDJPY.', type: 'info' },
      { date: '2025-11-22', title: 'Development Complete', description: 'Grid system with recovery logic fully implemented.', type: 'milestone' },
      { date: '2025-10-28', title: 'Project Started', description: 'Kicked off grid trading EA development.', type: 'milestone' },
    ],
  },
  'TMP-2025-X5Y1': {
    id: 'TMP-2025-X5Y1',
    name: 'Trend Following Suite',
    client: 'Emma L.',
    status: 'completed',
    progress: 100,
    startDate: '2025-09-15',
    estimatedDelivery: '2025-11-20',
    type: 'Trend Following EA',
    platform: 'MT4 & MT5',
    currentPhaseDetails: 'Project completed and delivered. 30-day support period active until January 20, 2026.',
    updates: [
      { date: '2025-12-20', title: 'Support Active', description: '30-day support period ongoing. Client running EA on live account with +12.4% gain so far.', type: 'info' },
      { date: '2025-11-20', title: 'Project Delivered', description: 'EA delivered with full documentation. Handover call completed.', type: 'delivery' },
      { date: '2025-11-15', title: 'Final Review', description: 'Client approved final version after review session.', type: 'milestone' },
      { date: '2025-10-30', title: 'Testing Complete', description: 'Achieved 68% win rate and 2.1 profit factor in backtests.', type: 'milestone' },
      { date: '2025-09-15', title: 'Project Started', description: 'Development of multi-timeframe trend following system begun.', type: 'milestone' },
    ],
  },
};

export default function TrackerPage() {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLookup = async () => {
    setError('');
    setProject(null);
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundProject = demoProjects[referenceNumber.toUpperCase()];

    if (foundProject) {
      setProject(foundProject);
    } else {
      setError('Project not found. Please check your reference number and try again.');
    }

    setIsLoading(false);
  };

  const getStatusIndex = (status: ProjectStatus) => {
    return milestones.findIndex(m => m.id === status);
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <GlowingOrbs variant="hero" />
      <GridBackground />

      <div className="container mx-auto relative z-10 max-w-4xl">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-[#00d4ff]">📍</span>
            <span className="text-sm font-medium text-gray-300">Project Tracker</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
            Track Your <span className="text-gradient">Project</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Enter your project reference number to view real-time progress updates on your EA development.
          </p>
        </AnimatedSection>

        {/* Lookup Form */}
        <motion.div
          className="glass-card rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="reference" className="block text-sm font-medium text-gray-300 mb-2">
                Project Reference Number
              </label>
              <input
                type="text"
                id="reference"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                placeholder="e.g., TMP-2025-A7B3"
                className="input-premium w-full uppercase tracking-wider"
              />
            </div>
            <div className="flex items-end">
              <motion.button
                onClick={handleLookup}
                disabled={!referenceNumber || isLoading}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-bold rounded-xl disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Looking up...
                  </span>
                ) : (
                  'Track Project'
                )}
              </motion.button>
            </div>
          </div>

          {error && (
            <motion.p
              className="mt-4 text-red-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          {/* Demo Reference Numbers */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-500 mb-2">Try these demo reference numbers:</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(demoProjects).map((ref) => (
                <button
                  key={ref}
                  onClick={() => setReferenceNumber(ref)}
                  className="text-xs px-3 py-1 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-colors font-mono"
                >
                  {ref}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project Details */}
        <AnimatePresence mode="wait">
          {project && (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Project Header */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white font-display">{project.name}</h2>
                    <p className="text-gray-400">Reference: {project.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      project.status === 'completed'
                        ? 'bg-[#00ff88]/20 text-[#00ff88]'
                        : 'bg-[#00d4ff]/20 text-[#00d4ff]'
                    }`}>
                      {project.status === 'completed' ? '✅ Completed' : '🔄 In Progress'}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Overall Progress</span>
                    <span className="text-[#00d4ff] font-semibold">{project.progress}%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#00d4ff] to-[#00ff88] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Project Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Project Type', value: project.type },
                    { label: 'Platform', value: project.platform },
                    { label: 'Start Date', value: new Date(project.startDate).toLocaleDateString() },
                    { label: 'Est. Delivery', value: new Date(project.estimatedDelivery).toLocaleDateString() },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/5 rounded-xl p-4">
                      <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                      <div className="text-white font-medium">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestone Timeline */}
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 font-display">Project Milestones</h3>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10" />

                  {milestones.map((milestone, index) => {
                    const statusIndex = getStatusIndex(project.status);
                    const isCompleted = index < statusIndex || project.status === 'completed';
                    const isCurrent = index === statusIndex && project.status !== 'completed';

                    return (
                      <motion.div
                        key={milestone.id}
                        className="relative flex items-start gap-4 pb-8 last:pb-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {/* Icon */}
                        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                          isCompleted
                            ? 'bg-[#00ff88]/20 ring-2 ring-[#00ff88]'
                            : isCurrent
                              ? 'bg-[#00d4ff]/20 ring-2 ring-[#00d4ff] animate-pulse'
                              : 'bg-white/10'
                        }`}>
                          {isCompleted ? '✓' : milestone.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-2">
                          <div className={`font-semibold ${
                            isCompleted || isCurrent ? 'text-white' : 'text-gray-500'
                          }`}>
                            {milestone.name}
                          </div>
                          <div className="text-sm text-gray-400">{milestone.description}</div>
                          {isCurrent && (
                            <div className="mt-2 p-3 bg-[#00d4ff]/10 rounded-lg text-sm text-[#00d4ff]">
                              {project.currentPhaseDetails}
                            </div>
                          )}
                        </div>

                        {/* Status badge */}
                        {isCurrent && (
                          <span className="px-2 py-1 bg-[#00d4ff]/20 text-[#00d4ff] text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Updates */}
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 font-display">Recent Updates</h3>

                <div className="space-y-4">
                  {project.updates.map((update, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-xl border ${
                        update.type === 'delivery'
                          ? 'border-[#00ff88]/30 bg-[#00ff88]/5'
                          : update.type === 'milestone'
                            ? 'border-[#00d4ff]/30 bg-[#00d4ff]/5'
                            : 'border-white/10 bg-white/5'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold text-white">{update.title}</div>
                          <div className="text-sm text-gray-400 mt-1">{update.description}</div>
                        </div>
                        <div className="text-xs text-gray-500 whitespace-nowrap">
                          {new Date(update.date).toLocaleDateString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact Support */}
              <div className="glass-card rounded-2xl p-8 text-center border border-[#00d4ff]/30">
                <h3 className="text-xl font-bold text-white mb-3 font-display">Have Questions?</h3>
                <p className="text-gray-400 mb-6">
                  Our team is here to help. Reach out if you have any questions about your project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/contact"
                    className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-bold rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Support
                  </motion.a>
                  <motion.a
                    href="https://t.me/my_ea_hub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-white/20 text-white font-bold rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Chat on Telegram
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No project state */}
        {!project && !isLoading && (
          <motion.div
            className="glass-card rounded-2xl p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-3 font-display">Enter Your Reference Number</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Your project reference number was provided when you started your EA development project.
              It looks like: TMP-XXXX-XXXX
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
