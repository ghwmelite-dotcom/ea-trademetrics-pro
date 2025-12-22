/**
 * Monte Carlo Simulation Web Worker
 * Runs 1000+ simulations off the main thread for better UI performance
 */

// Message handler
self.onmessage = function(e) {
  const { type, payload } = e.data;

  switch (type) {
    case 'RUN_SIMULATION':
      const results = runMonteCarloSimulation(payload);
      self.postMessage({ type: 'SIMULATION_COMPLETE', payload: results });
      break;

    case 'PING':
      self.postMessage({ type: 'PONG' });
      break;

    default:
      console.warn('Unknown message type:', type);
  }
};

/**
 * Run Monte Carlo simulation
 * @param {Object} params - Simulation parameters
 * @returns {Object} Simulation results with percentiles and statistics
 */
function runMonteCarloSimulation(params) {
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

  const allSimulations = [];

  // Run simulations
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

        // Early exit if account blown
        if (balance <= 0) break;
      }
      balanceHistory.push(balance);

      if (balance <= 0) {
        // Fill remaining months with 0
        for (let i = month + 1; i < months; i++) {
          balanceHistory.push(0);
        }
        break;
      }
    }

    allSimulations.push(balanceHistory);

    // Send progress update every 100 simulations
    if ((sim + 1) % 100 === 0) {
      self.postMessage({
        type: 'PROGRESS',
        payload: { completed: sim + 1, total: numSimulations },
      });
    }
  }

  // Calculate percentiles
  const getPercentileAtMonth = (month, percentile) => {
    const values = allSimulations.map((sim) => sim[month]).sort((a, b) => a - b);
    const index = Math.floor(values.length * percentile / 100);
    return values[Math.min(index, values.length - 1)];
  };

  const percentiles = {
    p5: [],
    p10: [],
    p25: [],
    p50: [],
    p75: [],
    p90: [],
    p95: [],
  };

  for (let i = 0; i <= months; i++) {
    percentiles.p5.push({ month: i, balance: getPercentileAtMonth(i, 5), percentile: 5 });
    percentiles.p10.push({ month: i, balance: getPercentileAtMonth(i, 10), percentile: 10 });
    percentiles.p25.push({ month: i, balance: getPercentileAtMonth(i, 25), percentile: 25 });
    percentiles.p50.push({ month: i, balance: getPercentileAtMonth(i, 50), percentile: 50 });
    percentiles.p75.push({ month: i, balance: getPercentileAtMonth(i, 75), percentile: 75 });
    percentiles.p90.push({ month: i, balance: getPercentileAtMonth(i, 90), percentile: 90 });
    percentiles.p95.push({ month: i, balance: getPercentileAtMonth(i, 95), percentile: 95 });
  }

  // Calculate statistics
  const finalBalances = allSimulations.map((sim) => sim[sim.length - 1]);
  const avgFinal = finalBalances.reduce((a, b) => a + b, 0) / finalBalances.length;
  const profitableRuns = finalBalances.filter((b) => b > startingCapital).length;
  const blownAccounts = finalBalances.filter((b) => b <= 0).length;

  // Calculate max drawdowns
  const maxDrawdownRuns = allSimulations.map((sim) => {
    let maxDD = 0;
    let peak = sim[0];
    for (const balance of sim) {
      if (balance > peak) peak = balance;
      if (peak > 0) {
        const dd = ((peak - balance) / peak) * 100;
        if (dd > maxDD) maxDD = dd;
      }
    }
    return maxDD;
  });
  const avgMaxDrawdown = maxDrawdownRuns.reduce((a, b) => a + b, 0) / maxDrawdownRuns.length;
  const worstDrawdown = Math.max(...maxDrawdownRuns);

  // Calculate Sharpe-like ratio (simplified)
  const monthlyReturns = allSimulations.flatMap((sim) => {
    const returns = [];
    for (let i = 1; i < sim.length; i++) {
      if (sim[i - 1] > 0) {
        returns.push((sim[i] - sim[i - 1]) / sim[i - 1]);
      }
    }
    return returns;
  });

  const avgReturn = monthlyReturns.length > 0
    ? monthlyReturns.reduce((a, b) => a + b, 0) / monthlyReturns.length
    : 0;
  const stdDev = monthlyReturns.length > 1
    ? Math.sqrt(
        monthlyReturns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) /
          (monthlyReturns.length - 1)
      )
    : 0;
  const sharpeRatio = stdDev > 0 ? (avgReturn / stdDev) * Math.sqrt(12) : 0; // Annualized

  return {
    percentiles,
    stats: {
      avgFinalBalance: avgFinal,
      avgReturn: ((avgFinal - startingCapital) / startingCapital) * 100,
      profitableProbability: (profitableRuns / numSimulations) * 100,
      blownAccountProbability: (blownAccounts / numSimulations) * 100,
      avgMaxDrawdown,
      worstDrawdown,
      medianFinal: percentiles.p50[percentiles.p50.length - 1].balance,
      bestCase: percentiles.p95[percentiles.p95.length - 1].balance,
      goodCase: percentiles.p75[percentiles.p75.length - 1].balance,
      worstCase: percentiles.p5[percentiles.p5.length - 1].balance,
      poorCase: percentiles.p25[percentiles.p25.length - 1].balance,
      sharpeRatio,
    },
    simulationCount: numSimulations,
    params,
  };
}
