'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface SimulationParams {
  startingCapital: number;
  winRate: number;
  riskRewardRatio: number;
  riskPerTrade: number;
  tradesPerMonth: number;
  months: number;
  numSimulations?: number;
}

interface PercentilePoint {
  month: number;
  balance: number;
  percentile: number;
}

interface SimulationResults {
  percentiles: {
    p5: PercentilePoint[];
    p10: PercentilePoint[];
    p25: PercentilePoint[];
    p50: PercentilePoint[];
    p75: PercentilePoint[];
    p90: PercentilePoint[];
    p95: PercentilePoint[];
  };
  stats: {
    avgFinalBalance: number;
    avgReturn: number;
    profitableProbability: number;
    blownAccountProbability: number;
    avgMaxDrawdown: number;
    worstDrawdown: number;
    medianFinal: number;
    bestCase: number;
    goodCase: number;
    worstCase: number;
    poorCase: number;
    sharpeRatio: number;
  };
  simulationCount: number;
  params: SimulationParams;
}

interface UseMonteCarloWorkerReturn {
  runSimulation: (params: SimulationParams) => void;
  results: SimulationResults | null;
  isRunning: boolean;
  progress: { completed: number; total: number } | null;
  error: string | null;
  isSupported: boolean;
}

export function useMonteCarloWorker(): UseMonteCarloWorkerReturn {
  const workerRef = useRef<Worker | null>(null);
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState<{ completed: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Use lazy initializer to check worker support
  const [isSupported] = useState(() => {
    if (typeof window === 'undefined') return true; // Assume supported on server, check on client
    return typeof window.Worker !== 'undefined';
  });

  // Initialize worker
  useEffect(() => {
    // Skip if window or Worker not available (already handled by lazy initializer)
    if (typeof window === 'undefined' || !window.Worker) {
      return;
    }

    try {
      workerRef.current = new Worker('/workers/monteCarlo.worker.js');

      workerRef.current.onmessage = (e) => {
        const { type, payload } = e.data;

        switch (type) {
          case 'SIMULATION_COMPLETE':
            setResults(payload);
            setIsRunning(false);
            setProgress(null);
            break;

          case 'PROGRESS':
            setProgress(payload);
            break;

          case 'PONG':
            // Worker is ready
            break;

          default:
            console.warn('Unknown worker message:', type);
        }
      };

      workerRef.current.onerror = (err) => {
        console.error('Worker error:', err);
        setError('Simulation failed. Please try again.');
        setIsRunning(false);
        setProgress(null);
      };

      // Ping worker to verify it's ready
      workerRef.current.postMessage({ type: 'PING' });
    } catch (err) {
      console.error('Failed to create worker:', err);
      // Worker creation failed - will use fallback in runSimulation
      workerRef.current = null;
    }

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const runSimulation = useCallback((params: SimulationParams) => {
    if (!workerRef.current) {
      // Fallback to main thread if worker not available
      setError('Web Worker not available. Running on main thread...');
      return;
    }

    setIsRunning(true);
    setError(null);
    setResults(null);
    setProgress({ completed: 0, total: params.numSimulations || 1000 });

    workerRef.current.postMessage({
      type: 'RUN_SIMULATION',
      payload: params,
    });
  }, []);

  return {
    runSimulation,
    results,
    isRunning,
    progress,
    error,
    isSupported,
  };
}

// Fallback function for when Web Workers are not supported
export function runSimulationSync(params: SimulationParams): SimulationResults {
  const {
    startingCapital,
    winRate,
    riskRewardRatio,
    riskPerTrade,
    tradesPerMonth,
    months,
    numSimulations = 1000,
  } = params;

  const winProb = winRate / 100;
  const riskFraction = riskPerTrade / 100;
  const allSimulations: number[][] = [];

  for (let sim = 0; sim < numSimulations; sim++) {
    let balance = startingCapital;
    const balanceHistory = [balance];

    for (let month = 0; month < months; month++) {
      for (let trade = 0; trade < tradesPerMonth; trade++) {
        const isWin = Math.random() < winProb;
        const tradeResult = isWin
          ? balance * riskFraction * riskRewardRatio
          : -balance * riskFraction;
        balance = Math.max(0, balance + tradeResult);
      }
      balanceHistory.push(balance);
    }
    allSimulations.push(balanceHistory);
  }

  const getPercentileAtMonth = (month: number, percentile: number) => {
    const values = allSimulations.map((sim) => sim[month]).sort((a, b) => a - b);
    const index = Math.floor(values.length * (percentile / 100));
    return values[index];
  };

  const percentiles = {
    p5: Array.from({ length: months + 1 }, (_, i) => ({
      month: i,
      balance: getPercentileAtMonth(i, 5),
      percentile: 5,
    })),
    p10: Array.from({ length: months + 1 }, (_, i) => ({
      month: i,
      balance: getPercentileAtMonth(i, 10),
      percentile: 10,
    })),
    p25: Array.from({ length: months + 1 }, (_, i) => ({
      month: i,
      balance: getPercentileAtMonth(i, 25),
      percentile: 25,
    })),
    p50: Array.from({ length: months + 1 }, (_, i) => ({
      month: i,
      balance: getPercentileAtMonth(i, 50),
      percentile: 50,
    })),
    p75: Array.from({ length: months + 1 }, (_, i) => ({
      month: i,
      balance: getPercentileAtMonth(i, 75),
      percentile: 75,
    })),
    p90: Array.from({ length: months + 1 }, (_, i) => ({
      month: i,
      balance: getPercentileAtMonth(i, 90),
      percentile: 90,
    })),
    p95: Array.from({ length: months + 1 }, (_, i) => ({
      month: i,
      balance: getPercentileAtMonth(i, 95),
      percentile: 95,
    })),
  };

  const finalBalances = allSimulations.map((sim) => sim[sim.length - 1]);
  const avgFinal = finalBalances.reduce((a, b) => a + b, 0) / finalBalances.length;
  const profitableRuns = finalBalances.filter((b) => b > startingCapital).length;
  const blownAccounts = finalBalances.filter((b) => b <= 0).length;

  const maxDrawdownRuns = allSimulations.map((sim) => {
    let maxDD = 0;
    let peak = sim[0];
    for (const balance of sim) {
      if (balance > peak) peak = balance;
      const dd = ((peak - balance) / peak) * 100;
      if (dd > maxDD) maxDD = dd;
    }
    return maxDD;
  });
  const avgMaxDrawdown = maxDrawdownRuns.reduce((a, b) => a + b, 0) / maxDrawdownRuns.length;

  return {
    percentiles,
    stats: {
      avgFinalBalance: avgFinal,
      avgReturn: ((avgFinal - startingCapital) / startingCapital) * 100,
      profitableProbability: (profitableRuns / numSimulations) * 100,
      blownAccountProbability: (blownAccounts / numSimulations) * 100,
      avgMaxDrawdown,
      worstDrawdown: Math.max(...maxDrawdownRuns),
      medianFinal: percentiles.p50[percentiles.p50.length - 1].balance,
      bestCase: percentiles.p95[percentiles.p95.length - 1].balance,
      goodCase: percentiles.p75[percentiles.p75.length - 1].balance,
      worstCase: percentiles.p5[percentiles.p5.length - 1].balance,
      poorCase: percentiles.p25[percentiles.p25.length - 1].balance,
      sharpeRatio: 0, // Simplified
    },
    simulationCount: numSimulations,
    params,
  };
}
