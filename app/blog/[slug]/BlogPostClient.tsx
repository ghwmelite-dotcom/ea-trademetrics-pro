'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedButton, GlowingOrbs, GridBackground } from '@/components/ui';

// Blog post content (in production, this would come from a CMS or MDX files)
const blogContent: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
  tableOfContents: string[];
}> = {
  'pine-script-to-mql-conversion-guide': {
    title: 'Why Your Pine Script Strategy Won\'t Work Directly as an EA (And How to Fix It)',
    category: 'Conversion',
    date: '2024-12-15',
    readTime: '8 min',
    tableOfContents: [
      'The Fundamental Differences',
      'Execution Model',
      'Data Access',
      'Order Management',
      'What Needs to Change',
      'Conclusion',
    ],
    content: [
      `## The Fundamental Differences

TradingView's Pine Script and MetaTrader's MQL4/MQL5 were designed with completely different philosophies. Understanding these differences is crucial before attempting any conversion.

**Pine Script** is a domain-specific language designed for rapid strategy prototyping and indicator creation. It abstracts away most of the complexity of market data handling and order execution, making it easy for traders to test ideas quickly.

**MQL4/MQL5**, on the other hand, gives you direct access to the trading platform's internals. This power comes with responsibility - you need to handle things that Pine Script does automatically.`,

      `## Execution Model

One of the biggest differences is how code executes:

### Pine Script
- Runs once per bar close (by default)
- Has access to all historical data at once
- Can "look ahead" in backtests (dangerous!)
- Repainting is common if not careful

### MQL4/MQL5
- Runs on every tick in real-time
- Must explicitly request historical data
- No future data access (more realistic)
- Handles real-time price updates

**Key Issue:** A strategy that "works" in Pine Script backtests might fail in live MQL trading because of these execution differences.`,

      `## Data Access

### Pine Script
\`\`\`pine
// Simple indicator access
rsi = ta.rsi(close, 14)
sma = ta.sma(close, 20)
\`\`\`

### MQL4
\`\`\`mql4
// More explicit data handling
double rsi = iRSI(Symbol(), Period(), 14, PRICE_CLOSE, 0);
double sma = iMA(Symbol(), Period(), 20, 0, MODE_SMA, PRICE_CLOSE, 0);
\`\`\`

The MQL approach requires more code but gives you finer control over buffer management and multi-timeframe access.`,

      `## Order Management

This is where the biggest differences lie:

### Pine Script
\`\`\`pine
if buyCondition
    strategy.entry("Long", strategy.long)
strategy.exit("Exit", "Long", profit=100, loss=50)
\`\`\`

In MQL, you need to handle slippage settings, error checking, order modification (SL/TP can't always be set on entry), position tracking, partial closes, and multiple orders per strategy.`,

      `## What Needs to Change

When converting your Pine Script strategy to MQL, expect to:

1. **Rewrite indicator access** - MQL uses handles and buffers
2. **Add error handling** - Every order operation can fail
3. **Implement tick handling** - Decide when to check for signals
4. **Build position management** - Track your own orders
5. **Handle partial fills** - MQL shows the real market
6. **Add proper logging** - Debug issues in live trading
7. **Consider spread and slippage** - Real trading costs`,

      `## Conclusion

Converting Pine Script to MQL isn't just "translating" code - it's rebuilding your strategy for a different trading environment. The good news is that strategies that survive this process tend to be more robust and realistic.

**Our recommendation:** Before converting, make sure your Pine Script strategy doesn't rely on repainting indicators, uses realistic spread/commission settings, has proper risk management, and shows consistent results across different time periods.

Need help with your conversion? [Get a free strategy audit](/tools/audit) or [contact us](/contact) to discuss your project.`,
    ],
  },
  'mt4-vs-mt5-ea-development': {
    title: 'MT4 vs MT5 for EA Development: Which Platform Should You Choose?',
    category: 'Platform',
    date: '2024-12-10',
    readTime: '10 min',
    tableOfContents: [
      'Platform Overview',
      'Language Differences',
      'Testing Capabilities',
      'Order Execution',
      'When to Choose MT4',
      'When to Choose MT5',
    ],
    content: [
      `## Platform Overview

MetaTrader 4 (MT4) has been the industry standard since 2005. MetaTrader 5 (MT5) was released in 2010 with significant improvements. Both platforms remain widely used, and the choice between them impacts your EA development.

**MT4 Statistics:**
- Used by 70%+ of retail forex brokers
- Simpler API, easier to learn
- Larger community and code library
- Limited to forex/CFDs at most brokers

**MT5 Statistics:**
- Growing adoption, especially for stocks
- More powerful backtesting
- Better multi-currency support
- Access to exchange-traded instruments`,

      `## Language Differences

### MQL4 Characteristics
- C-like syntax
- Simple order functions (OrderSend, OrderModify)
- Direct indicator access
- Easier to learn for beginners

### MQL5 Characteristics
- Object-oriented programming support
- Handle-based indicator system
- More complex but more powerful
- Better code organization for large projects`,

      `## Testing Capabilities

**MT4 Strategy Tester:**
- Single currency testing only
- "Every tick" or "Open prices only"
- Basic optimization
- Good for simple strategies

**MT5 Strategy Tester:**
- Multi-currency testing
- Real tick data support
- Forward testing built-in
- Visual mode improvements
- Cloud optimization (MQL5 Cloud Network)

For serious backtesting, MT5 is significantly better.`,

      `## Order Execution

### MT4 (Hedging by default)
- Can have multiple positions on same symbol
- Simple position management
- OrderSend for all operations
- Limited order types

### MT5 (Netting or Hedging)
- Netting mode: One position per symbol
- Hedging mode: Multiple positions (like MT4)
- More order types (Buy Stop Limit, etc.)
- Position-based accounting`,

      `## When to Choose MT4

Choose MT4 when your broker only offers MT4, your strategy is simple (single pair, single timeframe), you need to use existing MT4 indicators/EAs, target audience primarily uses MT4, or quick development is priority.`,

      `## When to Choose MT5

Choose MT5 when building multi-currency portfolios, need accurate tick-by-tick backtesting, trading stocks or futures, building complex scalable systems, or for long-term projects with ongoing development.

**Our Recommendation:** For new projects in 2024+, we recommend MT5 unless you have a specific reason to use MT4.

Need help deciding? [Contact us](/contact) for a consultation.`,
    ],
  },
  'how-to-backtest-ea-properly': {
    title: 'How to Properly Backtest Your Expert Advisor (Avoid These 7 Mistakes)',
    category: 'Testing',
    date: '2024-12-05',
    readTime: '12 min',
    tableOfContents: [
      'Why Backtesting Matters',
      'The 7 Critical Mistakes',
      'Data Quality',
      'Spread and Slippage',
      'Walk-Forward Analysis',
      'Statistical Significance',
      'Conclusion',
    ],
    content: [
      `## Why Backtesting Matters

Backtesting is your EA's first real test. It simulates how your strategy would have performed on historical data. But here's the problem: **most traders backtest incorrectly** and get results that don't translate to live trading.

A properly backtested EA should give you:
- Realistic expectation of profitability
- Understanding of drawdown characteristics
- Confidence in various market conditions
- Data to optimize without overfitting

**The harsh truth:** An EA that shows 500% returns in backtesting might lose money in live trading if the test was flawed.`,

      `## The 7 Critical Mistakes

### Mistake 1: Using Low-Quality Data
Most traders use the default data from their broker, which has gaps, incorrect prices, and missing ticks. This is like testing a race car on a broken track.

**Solution:** Use 99% modeling quality tick data from providers like Dukascopy or TrueFX. For MT5, download real tick data from your broker.

### Mistake 2: Ignoring Spread Variations
Fixed spreads in backtests don't reflect reality. Spreads widen during news, Asian sessions, and low liquidity periods.

**Solution:** Use variable spread simulation or add a spread buffer (e.g., if average spread is 1.2 pips, test with 1.8 pips).

### Mistake 3: Not Accounting for Slippage
In live trading, you rarely get the exact price you requested. Slippage can be 0.5-3 pips on average, more during volatility.

**Solution:** Add slippage simulation of at least 1 pip for major pairs, 2-3 pips for exotic pairs.`,

      `## Data Quality

### What Good Data Looks Like
- **Modeling quality:** 99% or higher
- **Mismatched charts errors:** Zero
- **Tick data:** Real ticks, not interpolated
- **Time coverage:** At least 5 years for swing strategies, 2 years for scalpers

### How to Check Data Quality
\`\`\`
In MT4/MT5 Strategy Tester:
1. Run a test
2. Check the "Report" tab
3. Look for "Modeling quality" percentage
4. Look for "Mismatched charts errors"
\`\`\`

**Red flags:**
- Modeling quality below 90%
- Any mismatched charts errors
- Gaps in the data (visible in chart)
- Suspicious price spikes`,

      `## Spread and Slippage

### Realistic Spread Settings

| Pair | Average Spread | Test With |
|------|---------------|-----------|
| EURUSD | 0.8-1.2 pips | 1.5-2.0 pips |
| GBPUSD | 1.0-1.5 pips | 2.0-2.5 pips |
| USDJPY | 0.8-1.2 pips | 1.5-2.0 pips |
| XAUUSD | 20-35 cents | 40-50 cents |

### Slippage in Code

\`\`\`mql4
// Add slippage to your OrderSend
int slippage = 30; // 3 pips for 5-digit broker
ticket = OrderSend(Symbol(), OP_BUY, lots, Ask, slippage, sl, tp);
\`\`\`

**Pro tip:** Run the same backtest with different spread/slippage settings. If your profits disappear with slightly higher costs, your edge is too thin.`,

      `## Walk-Forward Analysis

Walk-forward analysis is the **gold standard** for validating EA performance. It prevents curve-fitting by testing on data the optimizer never saw.

### How It Works
1. **Optimize** on Period 1 (e.g., Jan 2020 - Dec 2020)
2. **Test** best parameters on Period 2 (Jan 2021 - Mar 2021)
3. **Optimize** on Period 2 (Jan 2021 - Dec 2021)
4. **Test** on Period 3 (Jan 2022 - Mar 2022)
5. Repeat...

### What Good Results Look Like
- Out-of-sample periods are profitable (not just in-sample)
- Performance is consistent across periods
- Drawdowns are similar in-sample and out-of-sample
- No dramatic parameter changes between periods

**If your EA only works on optimized periods, it's curve-fitted and will fail live.**`,

      `## Statistical Significance

### How Many Trades Do You Need?

A backtest with 50 trades is **statistically meaningless**. Here's the minimum:

| Confidence Level | Minimum Trades |
|-----------------|----------------|
| Low confidence | 100 trades |
| Medium confidence | 300 trades |
| High confidence | 500+ trades |

### Key Metrics to Evaluate

- **Profit Factor:** Should be > 1.3 (ideally > 1.5)
- **Sharpe Ratio:** Should be > 1.0 (ideally > 2.0)
- **Maximum Drawdown:** Should be < 30% of total profit
- **Recovery Factor:** Should be > 3.0
- **Win Rate vs R:R:** Must make mathematical sense

### The Monte Carlo Test

Run 1,000 simulations with randomized trade order to see:
- Best case scenario
- Worst case scenario
- Most likely outcome
- Probability of ruin

Use our [Monte Carlo Calculator](/tools/calculator) to test your strategy parameters.`,

      `## Conclusion

Proper backtesting is hard work, but it separates professional EA developers from gamblers. Follow these principles:

1. **Use quality data** - 99% modeling quality minimum
2. **Add realistic costs** - Spread buffers and slippage
3. **Walk-forward test** - Validate on unseen data
4. **Ensure significance** - 300+ trades minimum
5. **Monte Carlo simulate** - Understand your risk of ruin
6. **Forward test** - Run on demo before going live
7. **Start small** - Even after all tests, start with micro lots

**Remember:** A smaller, verified edge is worth more than a big, unverified one.

Need help validating your EA? [Get a free strategy audit](/tools/audit) or use our [profitability calculator](/tools/calculator) to stress-test your parameters.`,
    ],
  },
  'ea-risk-management-guide': {
    title: 'Complete Guide to EA Risk Management: Position Sizing, Stop Loss, and Drawdown Control',
    category: 'Risk Management',
    date: '2024-11-28',
    readTime: '15 min',
    tableOfContents: [
      'Why Risk Management Matters',
      'Position Sizing Methods',
      'Stop Loss Strategies',
      'Drawdown Control',
      'Kelly Criterion',
      'Implementing in MQL',
      'Conclusion',
    ],
    content: [
      `## Why Risk Management Matters

Here's a truth that separates profitable traders from broke ones: **Your edge is worthless without risk management.**

Consider two EAs with identical 55% win rates and 1:1.5 risk-reward:
- **EA 1:** Risks 10% per trade → Blows up after a losing streak
- **EA 2:** Risks 1% per trade → Compounds steadily over years

The math is brutal. After 10 consecutive losses (which WILL happen eventually):
- EA 1: Down 65% (needs 186% gain to recover)
- EA 2: Down 9.6% (needs 10.6% gain to recover)

**Risk management isn't optional. It's survival.**`,

      `## Position Sizing Methods

### Method 1: Fixed Percentage Risk

The most common and recommended approach. Risk a fixed percentage of your account on each trade.

\`\`\`mql4
double CalculateLotSize(double stopLossPips, double riskPercent) {
    double accountBalance = AccountBalance();
    double riskAmount = accountBalance * (riskPercent / 100);
    double tickValue = MarketInfo(Symbol(), MODE_TICKVALUE);
    double tickSize = MarketInfo(Symbol(), MODE_TICKSIZE);
    double pipValue = tickValue * (0.0001 / tickSize);

    double lotSize = riskAmount / (stopLossPips * pipValue);

    // Normalize to broker's lot step
    double lotStep = MarketInfo(Symbol(), MODE_LOTSTEP);
    lotSize = MathFloor(lotSize / lotStep) * lotStep;

    // Apply min/max limits
    double minLot = MarketInfo(Symbol(), MODE_MINLOT);
    double maxLot = MarketInfo(Symbol(), MODE_MAXLOT);
    lotSize = MathMax(minLot, MathMin(maxLot, lotSize));

    return lotSize;
}
\`\`\`

**Recommended risk levels:**
- Conservative: 0.5-1% per trade
- Moderate: 1-2% per trade
- Aggressive: 2-3% per trade
- Gambling: >3% per trade (not recommended)

### Method 2: Fixed Lot Size

Simple but flawed. Uses the same lot size regardless of stop loss distance or account size.

**Problems:**
- Doesn't scale with account growth
- Variable risk per trade
- Can risk too much on wide stops

**Only use for:** Initial testing or very small accounts

### Method 3: Volatility-Adjusted Sizing

Adjusts position size based on current market volatility (ATR).

\`\`\`mql4
double CalculateVolatilityAdjustedLots(double riskPercent) {
    double atr = iATR(Symbol(), Period(), 14, 0);
    double stopLossPips = atr * 2 / Point / 10; // 2x ATR stop
    return CalculateLotSize(stopLossPips, riskPercent);
}
\`\`\`

**Benefits:**
- Smaller positions in volatile markets
- Larger positions in calm markets
- Natural risk normalization`,

      `## Stop Loss Strategies

### Hard Stop Loss (Required)

Every trade MUST have a stop loss. No exceptions.

**Types of stop losses:**
1. **Fixed pips:** Simple but doesn't adapt to volatility
2. **ATR-based:** Adapts to current market conditions
3. **Structure-based:** Below/above key support/resistance
4. **Percentage-based:** Fixed % of entry price

### ATR-Based Stop Loss

\`\`\`mql4
double CalculateStopLoss(int orderType, double atrMultiplier) {
    double atr = iATR(Symbol(), Period(), 14, 0);
    double stopDistance = atr * atrMultiplier;

    if(orderType == OP_BUY) {
        return Bid - stopDistance;
    } else {
        return Ask + stopDistance;
    }
}
\`\`\`

**Recommended ATR multipliers:**
- Scalping: 1.0-1.5x ATR
- Day trading: 1.5-2.5x ATR
- Swing trading: 2.0-3.0x ATR

### Trailing Stop Loss

Locks in profits as price moves in your favor.

\`\`\`mql4
void ManageTrailingStop(int ticket, double trailPips) {
    if(OrderSelect(ticket, SELECT_BY_TICKET)) {
        double trailDistance = trailPips * Point * 10;

        if(OrderType() == OP_BUY) {
            double newStop = Bid - trailDistance;
            if(newStop > OrderStopLoss() && newStop > OrderOpenPrice()) {
                OrderModify(ticket, OrderOpenPrice(), newStop, OrderTakeProfit(), 0);
            }
        }
        // Similar for SELL orders...
    }
}
\`\`\``,

      `## Drawdown Control

### Maximum Drawdown Limits

Set hard limits on how much your EA can lose before stopping.

\`\`\`mql4
// Global variables
double startingBalance;
double maxDrawdownPercent = 20.0; // Stop at 20% drawdown

int OnInit() {
    startingBalance = AccountBalance();
    return INIT_SUCCEEDED;
}

void OnTick() {
    // Check drawdown before any trading
    double currentDrawdown = (startingBalance - AccountBalance()) / startingBalance * 100;

    if(currentDrawdown >= maxDrawdownPercent) {
        CloseAllTrades();
        Alert("Maximum drawdown reached. EA stopped.");
        ExpertRemove();
        return;
    }

    // Continue with normal trading logic...
}
\`\`\`

### Daily Loss Limits

Prevents revenge trading and emotional spirals.

\`\`\`mql4
double dailyStartBalance;
double maxDailyLossPercent = 3.0;

void CheckDailyLimit() {
    if(dailyStartBalance == 0) {
        dailyStartBalance = AccountBalance();
    }

    double dailyLoss = (dailyStartBalance - AccountBalance()) / dailyStartBalance * 100;

    if(dailyLoss >= maxDailyLossPercent) {
        tradingAllowed = false;
        Alert("Daily loss limit reached. Trading paused until tomorrow.");
    }
}
\`\`\`

### Consecutive Loss Limits

Stop trading after X losses in a row.

\`\`\`mql4
int consecutiveLosses = 0;
int maxConsecutiveLosses = 5;

void OnTradeClose(bool isWin) {
    if(isWin) {
        consecutiveLosses = 0;
    } else {
        consecutiveLosses++;
        if(consecutiveLosses >= maxConsecutiveLosses) {
            tradingAllowed = false;
            Alert("Max consecutive losses reached. Review and reset required.");
        }
    }
}
\`\`\``,

      `## Kelly Criterion

The Kelly Criterion tells you the mathematically optimal percentage of your bankroll to risk.

### The Formula

\`\`\`
Kelly % = W - [(1-W) / R]

Where:
W = Win rate (as decimal)
R = Win/Loss ratio (average win / average loss)
\`\`\`

### Example Calculation

- Win rate: 55% (W = 0.55)
- Average win: $150
- Average loss: $100
- R = 150/100 = 1.5

Kelly % = 0.55 - [(1-0.55) / 1.5] = 0.55 - 0.30 = 0.25 = **25%**

### Why You Should Use Half-Kelly

Full Kelly is mathematically optimal but emotionally brutal. The variance is extreme.

**Recommendations:**
- Half Kelly (12.5% in example above): Good balance
- Quarter Kelly (6.25%): Conservative, smoother equity curve
- Never exceed Kelly: Mathematically guaranteed to hurt you

\`\`\`mql4
double CalculateKellyRisk(double winRate, double avgWin, double avgLoss) {
    double R = avgWin / avgLoss;
    double kelly = winRate - ((1 - winRate) / R);

    // Use Half Kelly for safety
    double halfKelly = kelly / 2;

    // Cap at reasonable maximum
    return MathMin(halfKelly * 100, 5.0); // Max 5%
}
\`\`\``,

      `## Implementing in MQL

### Complete Risk Management Class

\`\`\`mql4
class CRiskManager {
private:
    double m_riskPercent;
    double m_maxDrawdown;
    double m_dailyLossLimit;
    double m_startingBalance;
    double m_dailyStartBalance;

public:
    CRiskManager(double risk, double maxDD, double dailyLimit) {
        m_riskPercent = risk;
        m_maxDrawdown = maxDD;
        m_dailyLossLimit = dailyLimit;
        m_startingBalance = AccountBalance();
        m_dailyStartBalance = AccountBalance();
    }

    bool CanTrade() {
        // Check max drawdown
        double dd = (m_startingBalance - AccountBalance()) / m_startingBalance * 100;
        if(dd >= m_maxDrawdown) return false;

        // Check daily limit
        double dailyDD = (m_dailyStartBalance - AccountBalance()) / m_dailyStartBalance * 100;
        if(dailyDD >= m_dailyLossLimit) return false;

        return true;
    }

    double GetLotSize(double stopLossPips) {
        double riskAmount = AccountBalance() * (m_riskPercent / 100);
        double tickValue = MarketInfo(Symbol(), MODE_TICKVALUE);
        double tickSize = MarketInfo(Symbol(), MODE_TICKSIZE);
        double pipValue = tickValue * (0.0001 / tickSize);

        double lots = riskAmount / (stopLossPips * pipValue);

        // Normalize
        double lotStep = MarketInfo(Symbol(), MODE_LOTSTEP);
        lots = MathFloor(lots / lotStep) * lotStep;

        return MathMax(MarketInfo(Symbol(), MODE_MINLOT),
               MathMin(MarketInfo(Symbol(), MODE_MAXLOT), lots));
    }

    void ResetDaily() {
        m_dailyStartBalance = AccountBalance();
    }
};
\`\`\``,

      `## Conclusion

Risk management is the foundation of profitable automated trading. Here's your checklist:

### Essential Rules
1. **Never risk more than 2%** per trade (1% is safer)
2. **Always use stop losses** - No exceptions, ever
3. **Set daily loss limits** - 3-5% maximum
4. **Set maximum drawdown** - Stop at 20-30%
5. **Use Kelly/Half-Kelly** - Don't guess, calculate

### Advanced Techniques
- Volatility-adjusted position sizing
- Trailing stops for trend-following
- Scaling in/out of positions
- Correlation-based exposure limits
- Monte Carlo stress testing

### Red Flags Your Risk Management Is Broken
- Averaging down on losers
- Removing stop losses
- Increasing size after losses
- Single trade can blow 10%+ of account
- No daily or weekly limits

**Remember:** The goal isn't to maximize returns. It's to maximize returns **while surviving**.

Test your strategy's risk parameters with our [Monte Carlo Calculator](/tools/calculator) or [contact us](/contact) for a professional risk assessment.`,
    ],
  },
  'common-ea-development-mistakes': {
    title: '10 Common EA Development Mistakes That Kill Profitability',
    category: 'Development',
    date: '2024-11-20',
    readTime: '11 min',
    tableOfContents: [
      'Introduction',
      'Mistakes 1-3: Strategy Flaws',
      'Mistakes 4-6: Technical Errors',
      'Mistakes 7-9: Testing Problems',
      'Mistake 10: Deployment Failures',
      'Conclusion',
    ],
    content: [
      `## Introduction

After developing 200+ Expert Advisors, we've seen the same mistakes destroy profitability over and over. Some are obvious in hindsight. Others are subtle killers that take months to manifest.

This guide covers the **10 most common mistakes** and exactly how to avoid them. If you're building an EA, consider this your pre-flight checklist.

**Spoiler:** Most failed EAs die from mistakes #1 and #4. Fix those first.`,

      `## Mistakes 1-3: Strategy Flaws

### Mistake 1: Curve Fitting (The Silent Killer)

**What it is:** Optimizing parameters until they perfectly fit historical data, creating an EA that "predicts the past" but fails on new data.

**Signs you're curve-fitting:**
- Backtests show incredible returns (100%+ annually)
- Optimal parameters are very specific (e.g., SMA 23, not SMA 20)
- Small parameter changes destroy profitability
- Walk-forward testing fails miserably

**How to avoid it:**
- Use out-of-sample testing (30% of data never seen by optimizer)
- Prefer round numbers for parameters (20, 50, 100 vs 23, 47, 103)
- Test parameter stability (nearby values should also be profitable)
- Run walk-forward analysis

\`\`\`
Good: SMA period 18-22 all profitable
Bad: Only SMA 19 works, SMA 18 and 20 lose money
\`\`\`

### Mistake 2: Ignoring Transaction Costs

**What it is:** Backtesting without realistic spreads, commissions, and slippage.

**The math that kills strategies:**
- Your scalper makes 5 pips per trade (sounds good!)
- Spread: 1.2 pips
- Commission: 0.7 pips equivalent
- Slippage: 0.5 pips average
- **Real profit: 2.6 pips** (48% of expected!)

**How to avoid it:**
- Add 50-100% buffer to average spreads
- Include commission in profit calculations
- Simulate slippage (1-2 pips minimum)
- Test during high-spread periods (news, Asian session)

### Mistake 3: No Edge Definition

**What it is:** Building an EA without understanding WHY it should make money.

**Questions you must answer:**
- What market inefficiency are you exploiting?
- Why does this inefficiency exist?
- Why hasn't it been arbitraged away?
- Under what conditions does your edge disappear?

**Examples of real edges:**
- Mean reversion during range-bound markets (predictable oscillation)
- Momentum following during trends (behavioral bias)
- Volatility breakouts (liquidity gaps)

**Not an edge:**
- "The indicators say buy"
- "It worked in backtesting"
- "RSI oversold means price goes up"`,

      `## Mistakes 4-6: Technical Errors

### Mistake 4: No Error Handling

**What it is:** Assuming every order will execute perfectly.

**Reality check:**
- Orders fail (requotes, slippage, timeout)
- Connections drop
- Broker servers go down
- Prices gap past your stops

**The dangerous code:**
\`\`\`mql4
// BAD - No error handling
OrderSend(Symbol(), OP_BUY, 0.1, Ask, 3, 0, 0);
\`\`\`

**The safe code:**
\`\`\`mql4
// GOOD - Proper error handling
int ticket = OrderSend(Symbol(), OP_BUY, lots, Ask, slippage, sl, tp);
if(ticket < 0) {
    int error = GetLastError();
    Print("Order failed. Error: ", error, " - ", ErrorDescription(error));

    if(error == ERR_REQUOTE || error == ERR_PRICE_CHANGED) {
        RefreshRates();
        // Retry logic here
    }
}
\`\`\`

### Mistake 5: Magic Number Conflicts

**What it is:** Running multiple EAs that interfere with each other's orders.

**The problem:**
\`\`\`mql4
// EA 1 closes EA 2's profitable trade by accident
for(int i = OrdersTotal()-1; i >= 0; i--) {
    if(OrderSelect(i, SELECT_BY_POS)) {
        if(OrderSymbol() == Symbol()) { // No magic number check!
            OrderClose(OrderTicket(), OrderLots(), Bid, 3);
        }
    }
}
\`\`\`

**The solution:**
\`\`\`mql4
input int MagicNumber = 12345; // Unique per EA

// Always filter by magic number
if(OrderSelect(i, SELECT_BY_POS)) {
    if(OrderSymbol() == Symbol() && OrderMagicNumber() == MagicNumber) {
        // Safe to manage this order
    }
}
\`\`\`

### Mistake 6: Broker-Specific Code

**What it is:** Writing code that only works with your specific broker.

**Common issues:**
- Point vs Pip confusion (4 vs 5 digit brokers)
- Minimum lot size assumptions
- Stop level requirements
- ECN vs Market Maker order types

**Universal code:**
\`\`\`mql4
// Works on any broker
double PipSize() {
    if(Digits == 5 || Digits == 3) return Point * 10;
    return Point;
}

double MinLot() {
    return MarketInfo(Symbol(), MODE_MINLOT);
}

double StopLevel() {
    return MarketInfo(Symbol(), MODE_STOPLEVEL) * Point;
}
\`\`\``,

      `## Mistakes 7-9: Testing Problems

### Mistake 7: Insufficient Testing Duration

**What it is:** Testing on 6 months of data and assuming it represents all market conditions.

**What you miss with short tests:**
- Bull markets (if you only tested bears)
- High volatility events (flash crashes)
- Low volatility periods (summer doldrums)
- Interest rate environments
- Black swan events

**Minimum testing periods:**
- Scalpers: 2 years minimum
- Day traders: 3-5 years
- Swing traders: 5-10 years

**Must include:**
- 2008 (financial crisis)
- 2015 (SNB event, China crash)
- 2020 (COVID crash and recovery)
- 2022 (rate hike cycle)

### Mistake 8: Not Testing on Multiple Pairs

**What it is:** Developing for EURUSD only and expecting it to work everywhere.

**Why multi-pair testing matters:**
- Reveals if edge is universal or pair-specific
- Identifies optimal pairs for your strategy
- Prevents false confidence from single-pair results

**Strategy validation:**
\`\`\`
Strong strategy: Works on 5+ correlated pairs
Decent strategy: Works on 2-3 pairs
Weak strategy: Only works on 1 pair (likely curve-fitted)
\`\`\`

### Mistake 9: Skipping Forward Testing

**What it is:** Going straight from backtest to live trading.

**The forward testing protocol:**
1. **Demo account:** 1-3 months minimum
2. **Micro live account:** 1-3 months, real money tiny size
3. **Small live account:** Scale up gradually
4. **Full deployment:** Only after consistent results

**What forward testing catches:**
- Execution differences
- Spread variations
- Slippage reality
- Emotional reactions
- Broker-specific issues`,

      `## Mistake 10: Deployment Failures

### Not Monitoring Live Performance

**What it is:** Turning on the EA and forgetting about it.

**What can go wrong:**
- Strategy stops working (market regime change)
- Connection issues (missed trades)
- Broker changes conditions
- Memory leaks crash the EA
- VPS goes down

**Monitoring checklist:**
- Daily equity check
- Trade execution review
- Error log analysis
- Drawdown alerts
- Weekly performance comparison to backtest

**Automated monitoring:**
\`\`\`mql4
void SendPerformanceReport() {
    string report = StringFormat(
        "Daily Report\\n" +
        "Balance: %.2f\\n" +
        "Equity: %.2f\\n" +
        "Open Trades: %d\\n" +
        "Today P/L: %.2f",
        AccountBalance(),
        AccountEquity(),
        OrdersTotal(),
        CalculateTodayPL()
    );

    SendNotification(report);
    // Or email: SendMail("EA Report", report);
}
\`\`\``,

      `## Conclusion

Avoiding these 10 mistakes will put you ahead of 90% of EA developers:

### Strategy Layer
1. Don't curve-fit - Use walk-forward validation
2. Include realistic costs - Spread, commission, slippage
3. Define your edge - Know WHY it works

### Technical Layer
4. Handle errors - Every order can fail
5. Use magic numbers - Isolate EA orders
6. Write universal code - Works on any broker

### Testing Layer
7. Test long periods - 3-5 years minimum
8. Test multiple pairs - Validate universality
9. Forward test - Demo then micro live

### Deployment Layer
10. Monitor constantly - Set up alerts and reports

**One final tip:** Keep a development journal. Document every change, every test result, every live observation. You'll thank yourself later.

Need a professional review of your EA? [Get a free strategy audit](/tools/audit) or [contact us](/contact) for development assistance.`,
    ],
  },
  'ea-optimization-best-practices': {
    title: 'EA Optimization Best Practices: Finding Robust Parameters Without Overfitting',
    category: 'Optimization',
    date: '2024-11-15',
    readTime: '14 min',
    tableOfContents: [
      'The Optimization Paradox',
      'Genetic Algorithm Settings',
      'Parameter Selection',
      'Walk-Forward Optimization',
      'Robustness Testing',
      'Implementation Guide',
      'Conclusion',
    ],
    content: [
      `## The Optimization Paradox

Optimization is a double-edged sword. Done right, it finds parameters that extract maximum edge from your strategy. Done wrong, it creates a perfectly curve-fitted EA that fails spectacularly in live trading.

**The goal isn't finding the "best" parameters.** It's finding parameters that are:
- Profitable across different market conditions
- Stable (nearby values also work)
- Logical (make sense given your strategy)
- Consistent in out-of-sample testing

**Remember:** If your EA needs exact parameters to work, it's not a strategy - it's a coincidence.`,

      `## Genetic Algorithm Settings

### MT5 Optimization Modes

**Slow complete algorithm:**
- Tests every combination
- Best for < 1,000 total combinations
- Guarantees finding the global optimum
- Can take days for complex EAs

**Fast genetic algorithm:**
- Uses evolutionary selection
- Finds near-optimal solutions quickly
- Best for > 1,000 combinations
- May miss isolated optimal points

### Recommended GA Settings

\`\`\`
Population size: 256 (balance speed vs coverage)
Generations: Automatic (let it converge)
Selection: Tournament
Crossover: 0.9 (90% of new population)
Mutation: 0.1 (10% random changes)
\`\`\`

### Optimization Criteria

| Criteria | Best For |
|----------|----------|
| Balance | Maximizing raw profit |
| Profit Factor | Risk-adjusted returns |
| Expected Payoff | Consistency per trade |
| Drawdown | Minimizing risk |
| Sharpe Ratio | Overall risk-adjusted performance |
| Custom | Your specific goals |

**Our recommendation:** Optimize for **Profit Factor** or **Custom criterion** that balances profit and drawdown.`,

      `## Parameter Selection

### Which Parameters to Optimize

**Good candidates:**
- Indicator periods (MA length, RSI period)
- Entry/exit thresholds
- Stop loss and take profit distances
- Position sizing multipliers

**Bad candidates (usually):**
- Magic numbers
- Lot sizes (use risk-based sizing instead)
- Broker-specific settings
- Timing parameters (hour, minute)

### Setting Parameter Ranges

**Too narrow:** Might miss better values
**Too wide:** Wastes time testing impossible values

**Example - RSI Period:**
\`\`\`
Bad: 2 to 100, step 1 (99 values, many useless)
Good: 10 to 30, step 2 (11 values, all reasonable)
\`\`\`

**Example - Stop Loss (pips):**
\`\`\`
Scalper: 5 to 20, step 5
Day trader: 20 to 60, step 10
Swing trader: 50 to 150, step 25
\`\`\`

### The Stability Rule

**Test nearby values for each optimal parameter:**

\`\`\`
Optimal MA period: 21
Test 19, 20, 21, 22, 23

If all are profitable: ROBUST
If only 21 works: CURVE-FITTED
\`\`\``,

      `## Walk-Forward Optimization

Walk-forward is the **gold standard** for finding robust parameters.

### How It Works

1. Divide your data into segments (e.g., 6-month periods)
2. Optimize on segment 1
3. Test best parameters on segment 2 (out-of-sample)
4. Optimize on segments 1+2
5. Test on segment 3
6. Continue...

### Example Timeline

\`\`\`
2019 Jan-Jun: Optimize (In-Sample)
2019 Jul-Sep: Test (Out-of-Sample) ✓
2019 Jan-Sep: Optimize (In-Sample)
2019 Oct-Dec: Test (Out-of-Sample) ✓
2019 Jan - 2020 Jun: Optimize (In-Sample)
2020 Jul-Sep: Test (Out-of-Sample) ✓
...
\`\`\`

### Walk-Forward Efficiency Ratio

\`\`\`
WF Efficiency = Out-of-Sample Profit / In-Sample Profit

> 0.5: Acceptable (strategy has real edge)
> 0.7: Good (robust strategy)
> 0.9: Excellent (very stable strategy)
< 0.3: Poor (likely curve-fitted)
\`\`\`

### Walk-Forward Matrix (MT5)

MT5's Strategy Tester includes built-in walk-forward testing:

1. Open Strategy Tester
2. Select "Forward" period
3. Choose forward mode: "Half year", "Year", or "Custom"
4. Run optimization
5. Check "Forward" results in report`,

      `## Robustness Testing

### Monte Carlo Simulation

Test how your EA performs under randomized conditions:

1. **Trade order randomization:** Does profit depend on trade sequence?
2. **Parameter perturbation:** What if parameters are slightly off?
3. **Data variation:** How does noise affect results?

**Use our [Monte Carlo Calculator](/tools/calculator) to stress-test your parameters.**

### Multi-Market Validation

A robust strategy should work on similar markets:

\`\`\`
Original pair: EURUSD ✓
Test on GBPUSD: ✓ (should also work)
Test on USDJPY: ✓ (should also work)
Test on AUDNZD: ✓ (optional, different dynamics)
\`\`\`

**If it only works on EURUSD, you've likely curve-fitted to that pair's specific history.**

### Regime Testing

Test across different market regimes:

| Regime | Date Range | Your EA Result |
|--------|------------|----------------|
| Trending | 2017 | Should be profitable |
| Ranging | 2018 | Should survive |
| Crisis | 2020 Q1 | Should not blow up |
| Recovery | 2020 Q2-Q4 | Should work |
| High rates | 2022 | Should adapt |`,

      `## Implementation Guide

### Step-by-Step Optimization Process

**Phase 1: Initial Exploration**
\`\`\`
1. Set wide parameter ranges
2. Run genetic optimization on 60% of data
3. Identify promising regions
4. Note parameter clusters that work
\`\`\`

**Phase 2: Refinement**
\`\`\`
1. Narrow ranges around promising regions
2. Run detailed optimization
3. Select top 10 parameter sets
4. Test stability of each
\`\`\`

**Phase 3: Walk-Forward Validation**
\`\`\`
1. Run walk-forward optimization
2. Calculate WF efficiency ratio
3. Reject if < 0.5
4. Keep sets with > 0.6 efficiency
\`\`\`

**Phase 4: Robustness Testing**
\`\`\`
1. Monte Carlo simulation (1000 runs)
2. Multi-pair testing
3. Regime testing
4. Final parameter selection
\`\`\`

### Code for Custom Optimization Criterion

\`\`\`mql5
double OnTester() {
    // Get standard metrics
    double profit = TesterStatistics(STAT_PROFIT);
    double drawdown = TesterStatistics(STAT_EQUITY_DD_RELATIVE);
    double trades = TesterStatistics(STAT_TRADES);
    double profitFactor = TesterStatistics(STAT_PROFIT_FACTOR);

    // Reject if too few trades
    if(trades < 100) return 0;

    // Reject if drawdown too high
    if(drawdown > 30) return 0;

    // Reject if profit factor too low
    if(profitFactor < 1.2) return 0;

    // Custom score: Profit * Profit Factor / Drawdown
    double score = profit * profitFactor / (drawdown + 1);

    return score;
}
\`\`\``,

      `## Conclusion

Optimization is an art as much as a science. Here's your checklist:

### Before Optimizing
- Define what "success" looks like (criteria)
- Set logical parameter ranges
- Reserve 30% of data for out-of-sample testing
- Know your strategy's theoretical basis

### During Optimization
- Use genetic algorithm for large parameter spaces
- Optimize for risk-adjusted returns, not just profit
- Check parameter stability (nearby values should work)
- Run multiple optimizations to confirm results

### After Optimizing
- Walk-forward validate (WF efficiency > 0.5)
- Monte Carlo test (95th percentile acceptable?)
- Multi-pair test (works on similar markets?)
- Regime test (survives different conditions?)

### Red Flags
- Only one parameter set works
- Very specific values (SMA 47 but not 46 or 48)
- WF efficiency below 0.3
- Dramatically different results on similar pairs
- Works only in specific time periods

**The final test:** If you wouldn't bet your own money on the parameters, don't deploy them.

Need help optimizing your EA? [Get a free strategy audit](/tools/audit) or [contact us](/contact) for professional optimization services.`,
    ],
  },
  'mql4-vs-mql5-differences': {
    title: 'MQL4 vs MQL5: Key Differences Every EA Developer Should Know',
    category: 'Development',
    date: '2024-11-08',
    readTime: '9 min',
    tableOfContents: [
      'Language Overview',
      'Order System Differences',
      'Indicator Access',
      'Event Handling',
      'Code Migration Tips',
      'Which to Choose',
    ],
    content: [
      `## Language Overview

MQL4 and MQL5 look similar but have fundamental differences that affect how you write EAs. Understanding these differences is crucial for writing efficient, bug-free code.

### MQL4 Characteristics
- Procedural programming focus
- Direct indicator value access
- Simple order model (OrderSend/OrderModify)
- Single-threaded execution
- Backwards compatible with legacy code

### MQL5 Characteristics
- Full object-oriented programming (OOP)
- Handle-based indicator system
- Position/Order/Deal separation
- Multi-threaded backtesting
- More powerful but steeper learning curve

**Key insight:** MQL5 isn't just "MQL4 with more features." It's a fundamentally different approach to trading system development.`,

      `## Order System Differences

This is where MQL4 and MQL5 differ most dramatically.

### MQL4: Order-Centric Model

\`\`\`mql4
// Open a trade
int ticket = OrderSend(Symbol(), OP_BUY, 0.1, Ask, 3,
                       Ask - 50*Point, Ask + 100*Point);

// Modify stop loss
if(OrderSelect(ticket, SELECT_BY_TICKET)) {
    OrderModify(ticket, OrderOpenPrice(), newSL, OrderTakeProfit(), 0);
}

// Close trade
if(OrderSelect(ticket, SELECT_BY_TICKET)) {
    OrderClose(ticket, OrderLots(), Bid, 3);
}
\`\`\`

**Simple concepts:**
- Each trade has one ticket number
- OrderSend opens, OrderClose closes
- Everything is straightforward

### MQL5: Position/Order/Deal Model

\`\`\`mql5
// Open a trade
MqlTradeRequest request = {};
MqlTradeResult result = {};

request.action = TRADE_ACTION_DEAL;
request.symbol = Symbol();
request.volume = 0.1;
request.type = ORDER_TYPE_BUY;
request.price = SymbolInfoDouble(Symbol(), SYMBOL_ASK);
request.sl = request.price - 50 * Point();
request.tp = request.price + 100 * Point();
request.deviation = 3;

OrderSend(request, result);

// Modify position
request.action = TRADE_ACTION_SLTP;
request.position = result.deal; // Position ticket
request.sl = newSL;
OrderSend(request, result);

// Close position
request.action = TRADE_ACTION_DEAL;
request.type = ORDER_TYPE_SELL;
request.position = positionTicket;
OrderSend(request, result);
\`\`\`

**Complex concepts:**
- **Order:** A request to trade (pending or executed)
- **Deal:** A single transaction (fill)
- **Position:** Aggregate of all deals on a symbol (netting) or individual trades (hedging)

**Why the complexity?** MQL5 supports real exchange trading where one order can result in multiple partial fills (deals).`,

      `## Indicator Access

### MQL4: Direct Access

\`\`\`mql4
// Get RSI value - one line!
double rsi = iRSI(Symbol(), Period(), 14, PRICE_CLOSE, 0);

// Get moving average
double ma = iMA(Symbol(), Period(), 20, 0, MODE_SMA, PRICE_CLOSE, 0);

// Access custom indicator
double custom = iCustom(Symbol(), Period(), "MyIndicator", param1, param2, 0, 0);
\`\`\`

**Simple and direct.** Each call returns the value immediately.

### MQL5: Handle-Based Access

\`\`\`mql5
// Create indicator handles (in OnInit)
int rsiHandle = iRSI(Symbol(), Period(), 14, PRICE_CLOSE);
int maHandle = iMA(Symbol(), Period(), 20, 0, MODE_SMA, PRICE_CLOSE);

// Prepare buffers
double rsiBuffer[];
double maBuffer[];
ArraySetAsSeries(rsiBuffer, true);
ArraySetAsSeries(maBuffer, true);

// Copy values (in OnTick)
CopyBuffer(rsiHandle, 0, 0, 1, rsiBuffer);
CopyBuffer(maHandle, 0, 0, 1, maBuffer);

double rsi = rsiBuffer[0];
double ma = maBuffer[0];
\`\`\`

**Why handles?**
- Performance: Indicator calculated once, reused
- Efficiency: Multiple values copied at once
- Multi-threading: Safe for parallel execution

**Pro tip:** Create handles in OnInit, copy buffers in OnTick. Don't create handles repeatedly.`,

      `## Event Handling

### MQL4 Events

\`\`\`mql4
int OnInit() {
    // Called once when EA starts
    return INIT_SUCCEEDED;
}

void OnDeinit(const int reason) {
    // Called when EA stops
}

void OnTick() {
    // Called on every tick (main logic here)
}

void OnTimer() {
    // Called on timer events
}

void OnChartEvent(const int id, const long& lparam,
                  const double& dparam, const string& sparam) {
    // Chart interaction events
}
\`\`\`

### MQL5 Events (Additional)

\`\`\`mql5
// All MQL4 events plus:

void OnTrade() {
    // Called when trade events occur (order placed, modified, closed)
}

void OnTradeTransaction(const MqlTradeTransaction& trans,
                        const MqlTradeRequest& request,
                        const MqlTradeResult& result) {
    // Detailed trade transaction info
}

void OnBookEvent(const string& symbol) {
    // Market depth changes
}

double OnTester() {
    // Custom optimization criterion
    return customScore;
}

void OnTesterInit() {
    // Before optimization starts
}

void OnTesterPass() {
    // After each optimization pass
}

void OnTesterDeinit() {
    // After optimization ends
}
\`\`\`

**Key addition:** OnTrade and OnTradeTransaction give you precise control over trade event handling without polling in OnTick.`,

      `## Code Migration Tips

### Converting MQL4 to MQL5

**Order functions:**
\`\`\`
MQL4 OrderSend() → MQL5 OrderSend() with MqlTradeRequest
MQL4 OrderModify() → MQL5 OrderSend() with TRADE_ACTION_SLTP
MQL4 OrderClose() → MQL5 OrderSend() with opposite direction
MQL4 OrderSelect() → MQL5 PositionSelect() or OrderSelect()
MQL4 OrdersTotal() → MQL5 PositionsTotal() or OrdersTotal()
\`\`\`

**Indicator functions:**
\`\`\`
MQL4 iRSI(Symbol(), Period(), 14, PRICE_CLOSE, 0)
↓
MQL5
  int handle = iRSI(Symbol(), Period(), 14, PRICE_CLOSE);
  double buffer[];
  CopyBuffer(handle, 0, 0, 1, buffer);
  double value = buffer[0];
\`\`\`

**Price data:**
\`\`\`
MQL4 Close[0] → MQL5 iClose(Symbol(), Period(), 0)
MQL4 Open[0] → MQL5 iOpen(Symbol(), Period(), 0)
MQL4 High[0] → MQL5 iHigh(Symbol(), Period(), 0)
MQL4 Bid → MQL5 SymbolInfoDouble(Symbol(), SYMBOL_BID)
MQL4 Ask → MQL5 SymbolInfoDouble(Symbol(), SYMBOL_ASK)
\`\`\`

### Using the Standard Library

MQL5's Standard Library simplifies trading:

\`\`\`mql5
#include <Trade/Trade.mqh>
#include <Trade/PositionInfo.mqh>

CTrade trade;
CPositionInfo position;

// Open trade (much simpler!)
trade.Buy(0.1, Symbol(), 0, sl, tp);

// Close position
trade.PositionClose(Symbol());

// Modify SL/TP
trade.PositionModify(Symbol(), newSL, newTP);
\`\`\``,

      `## Which to Choose

### Choose MQL4 When:
- Your broker only supports MT4
- You're maintaining existing MT4 EAs
- Target audience primarily uses MT4
- Simple strategy, quick development needed
- Working with legacy indicators

### Choose MQL5 When:
- Building new projects (future-proof)
- Need multi-currency backtesting
- Trading stocks/futures (not just forex)
- Building complex, scalable systems
- Want better optimization tools
- Need accurate tick-by-tick backtesting

### Migration Decision Matrix

| Factor | Stay MT4 | Move to MT5 |
|--------|----------|-------------|
| Broker support | MT4 only | MT5 available |
| Strategy complexity | Simple | Complex/Multi-asset |
| Backtest needs | Basic | Advanced/Multi-currency |
| Development time | Limited | Flexible |
| Future plans | Maintenance | New development |

**Our recommendation:** For any new project starting in 2024 or later, choose MQL5. The learning curve pays off quickly.

Need help migrating your EA from MT4 to MT5? [Contact us](/contact) for professional conversion services.`,
    ],
  },
  'ea-news-filter-implementation': {
    title: 'How to Implement a News Filter in Your EA (Step-by-Step Guide)',
    category: 'Development',
    date: '2024-11-01',
    readTime: '10 min',
    tableOfContents: [
      'Why Filter News Events',
      'News Data Sources',
      'Basic Implementation',
      'Advanced Filtering',
      'Testing Your Filter',
      'Complete Code Example',
    ],
    content: [
      `## Why Filter News Events

High-impact news events can wreak havoc on automated trading strategies:

**What happens during news:**
- Spreads widen 5-20x normal
- Slippage increases dramatically
- Price gaps occur (stops skipped)
- Volatility spikes unpredictably
- Technical levels become meaningless

**Real example:**
- Normal EURUSD spread: 0.8 pips
- During NFP: 8-15 pips
- Your scalper expecting 5 pip profit now faces 15 pip spread

**The solution:** Stop trading before, during, and after high-impact news events.`,

      `## News Data Sources

### Option 1: MQL5 Economic Calendar (MT5 Only)

MT5 has a built-in economic calendar accessible via MQL5:

\`\`\`mql5
MqlCalendarValue values[];
int count = CalendarValueHistory(values, startTime, endTime);

for(int i = 0; i < count; i++) {
    MqlCalendarEvent event;
    CalendarEventById(values[i].event_id, event);

    Print("Event: ", event.name);
    Print("Impact: ", event.importance); // Low, Medium, High
    Print("Time: ", values[i].time);
}
\`\`\`

**Pros:** Built-in, always up-to-date
**Cons:** MT5 only

### Option 2: External Calendar File

Download CSV from Forex Factory, Trading Economics, etc.

\`\`\`csv
Date,Time,Currency,Impact,Event
2024-01-05,08:30,USD,High,Non-Farm Payrolls
2024-01-05,08:30,USD,High,Unemployment Rate
2024-01-10,08:30,USD,High,CPI m/m
\`\`\`

**Pros:** Works on MT4, customizable
**Cons:** Requires manual updates

### Option 3: Web API

Use services like Forex Factory API, Investing.com API, or custom endpoints.

\`\`\`mql4
string url = "https://nfs.faireconomy.media/ff_calendar_thisweek.json";
string response = WebRequest("GET", url, headers, timeout, data, result);
// Parse JSON response
\`\`\`

**Pros:** Always current, automated
**Cons:** Requires web request permissions, potential latency`,

      `## Basic Implementation

### Simple Time-Based Filter

\`\`\`mql4
input int NewsMinutesBefore = 30;   // Minutes before news to stop
input int NewsMinutesAfter = 30;    // Minutes after news to resume
input bool FilterHighImpact = true;
input bool FilterMediumImpact = false;

// Define news times (update weekly)
datetime newsEvents[] = {
    D'2024.01.05 13:30', // NFP
    D'2024.01.10 13:30', // CPI
    D'2024.01.17 13:30', // Retail Sales
    // Add more events...
};

bool IsNewsTime() {
    datetime currentTime = TimeCurrent();

    for(int i = 0; i < ArraySize(newsEvents); i++) {
        datetime newsTime = newsEvents[i];
        datetime startFilter = newsTime - NewsMinutesBefore * 60;
        datetime endFilter = newsTime + NewsMinutesAfter * 60;

        if(currentTime >= startFilter && currentTime <= endFilter) {
            return true; // We're in a news window
        }
    }

    return false;
}

void OnTick() {
    // Check news filter first
    if(IsNewsTime()) {
        Comment("Trading paused - News event nearby");
        return; // Skip trading logic
    }

    // Normal trading logic continues...
}
\`\`\``,

      `## Advanced Filtering

### Currency-Specific Filtering

Only filter news for currencies your EA trades:

\`\`\`mql4
struct NewsEvent {
    datetime time;
    string currency;
    int impact; // 1=Low, 2=Medium, 3=High
    string description;
};

NewsEvent events[];

bool ShouldFilter(string symbol) {
    string baseCurrency = StringSubstr(symbol, 0, 3);
    string quoteCurrency = StringSubstr(symbol, 3, 3);

    datetime currentTime = TimeCurrent();

    for(int i = 0; i < ArraySize(events); i++) {
        // Skip if wrong currency
        if(events[i].currency != baseCurrency &&
           events[i].currency != quoteCurrency) continue;

        // Skip if impact too low
        if(events[i].impact < MinImpactLevel) continue;

        // Check time window
        datetime startFilter = events[i].time - NewsMinutesBefore * 60;
        datetime endFilter = events[i].time + NewsMinutesAfter * 60;

        if(currentTime >= startFilter && currentTime <= endFilter) {
            return true;
        }
    }

    return false;
}
\`\`\`

### Spread-Based Detection

Detect news indirectly by monitoring spread:

\`\`\`mql4
input double MaxSpreadMultiplier = 2.0;  // Close if spread > 2x normal

double normalSpread = 12; // Set based on your pair (in points)

bool IsSpreadTooHigh() {
    double currentSpread = MarketInfo(Symbol(), MODE_SPREAD);

    if(currentSpread > normalSpread * MaxSpreadMultiplier) {
        Print("High spread detected: ", currentSpread, " (normal: ", normalSpread, ")");
        return true;
    }

    return false;
}
\`\`\`

### Volatility-Based Detection

Use ATR spike detection:

\`\`\`mql4
double GetVolatilityRatio() {
    double currentATR = iATR(Symbol(), PERIOD_M5, 14, 0);
    double averageATR = iATR(Symbol(), PERIOD_H1, 14, 0);

    return currentATR / averageATR;
}

bool IsHighVolatility() {
    return GetVolatilityRatio() > 2.0; // 2x normal volatility
}
\`\`\``,

      `## Testing Your Filter

### Backtest Verification

Test your EA with and without the news filter:

**Test 1: No Filter**
\`\`\`
Total trades: 1000
Profit factor: 1.45
Max drawdown: 25%
Trades during news: 87
\`\`\`

**Test 2: With Filter**
\`\`\`
Total trades: 913
Profit factor: 1.62
Max drawdown: 18%
Trades during news: 0
\`\`\`

**Analysis:**
- Fewer trades (as expected)
- Higher profit factor (news trades were hurting)
- Lower drawdown (avoided news volatility)

### Live Monitoring

Add logging to verify your filter works:

\`\`\`mql4
void LogNewsFilter(string reason) {
    string message = StringFormat(
        "NEWS FILTER ACTIVE: %s | Time: %s | Spread: %.1f",
        reason,
        TimeToString(TimeCurrent()),
        MarketInfo(Symbol(), MODE_SPREAD)
    );

    Print(message);

    // Optional: Send notification
    // SendNotification(message);
}
\`\`\``,

      `## Complete Code Example

### Full News Filter Class

\`\`\`mql4
//+------------------------------------------------------------------+
//| NewsFilter.mqh - Comprehensive News Filter for MT4               |
//+------------------------------------------------------------------+

class CNewsFilter {
private:
    int m_minutesBefore;
    int m_minutesAfter;
    int m_minImpact;
    double m_maxSpreadMultiplier;
    double m_normalSpread;
    datetime m_newsEvents[];
    string m_newsCurrencies[];
    int m_newsImpacts[];

public:
    CNewsFilter() {
        m_minutesBefore = 30;
        m_minutesAfter = 30;
        m_minImpact = 3; // High impact only
        m_maxSpreadMultiplier = 2.0;
        m_normalSpread = 12;
    }

    void SetParameters(int before, int after, int impact) {
        m_minutesBefore = before;
        m_minutesAfter = after;
        m_minImpact = impact;
    }

    void SetSpreadFilter(double multiplier, double normalSpread) {
        m_maxSpreadMultiplier = multiplier;
        m_normalSpread = normalSpread;
    }

    void AddNewsEvent(datetime time, string currency, int impact) {
        int size = ArraySize(m_newsEvents);
        ArrayResize(m_newsEvents, size + 1);
        ArrayResize(m_newsCurrencies, size + 1);
        ArrayResize(m_newsImpacts, size + 1);

        m_newsEvents[size] = time;
        m_newsCurrencies[size] = currency;
        m_newsImpacts[size] = impact;
    }

    bool ShouldTrade(string symbol) {
        // Check spread first (fastest check)
        if(IsSpreadHigh()) {
            LogFilter("High spread detected");
            return false;
        }

        // Check news events
        if(IsNearNews(symbol)) {
            LogFilter("Near news event");
            return false;
        }

        return true;
    }

private:
    bool IsSpreadHigh() {
        double spread = MarketInfo(Symbol(), MODE_SPREAD);
        return spread > m_normalSpread * m_maxSpreadMultiplier;
    }

    bool IsNearNews(string symbol) {
        string base = StringSubstr(symbol, 0, 3);
        string quote = StringSubstr(symbol, 3, 3);
        datetime now = TimeCurrent();

        for(int i = 0; i < ArraySize(m_newsEvents); i++) {
            // Check currency match
            if(m_newsCurrencies[i] != base && m_newsCurrencies[i] != quote)
                continue;

            // Check impact level
            if(m_newsImpacts[i] < m_minImpact)
                continue;

            // Check time window
            datetime start = m_newsEvents[i] - m_minutesBefore * 60;
            datetime end = m_newsEvents[i] + m_minutesAfter * 60;

            if(now >= start && now <= end)
                return true;
        }

        return false;
    }

    void LogFilter(string reason) {
        Print("NEWS FILTER: ", reason, " at ", TimeToString(TimeCurrent()));
    }
};

//+------------------------------------------------------------------+
//| Example usage in EA                                               |
//+------------------------------------------------------------------+
CNewsFilter newsFilter;

int OnInit() {
    // Configure filter
    newsFilter.SetParameters(30, 30, 3); // 30 min before/after, high impact
    newsFilter.SetSpreadFilter(2.0, 12); // 2x normal spread of 12 points

    // Add this week's news (update weekly)
    newsFilter.AddNewsEvent(D'2024.01.05 13:30', "USD", 3); // NFP
    newsFilter.AddNewsEvent(D'2024.01.10 13:30', "USD", 3); // CPI
    newsFilter.AddNewsEvent(D'2024.01.11 10:00', "EUR", 3); // ECB Speech

    return INIT_SUCCEEDED;
}

void OnTick() {
    // Check news filter first
    if(!newsFilter.ShouldTrade(Symbol())) {
        Comment("Trading paused - News filter active");
        return;
    }

    // Your normal trading logic here...
}
\`\`\`

### Integration Checklist

1. Add news events for current week (Sunday task)
2. Set appropriate filter windows for your strategy
3. Configure spread threshold for your pair
4. Test on demo before live deployment
5. Monitor logs to verify filter activates correctly

Need help implementing a news filter? [Contact us](/contact) or [get a free strategy audit](/tools/audit) to review your EA's risk management.`,
    ],
  },
};

// Default content for posts without full content
const defaultContent = {
  title: 'Article Coming Soon',
  category: 'General',
  date: '2024-12-01',
  readTime: '5 min',
  tableOfContents: ['Introduction', 'Main Content', 'Conclusion'],
  content: [
    `## Introduction

This article is currently being written by our team of EA development experts. Check back soon for the full content.

In the meantime, feel free to explore our other resources:

- [Strategy Profitability Calculator](/tools/calculator) - Test your strategy parameters
- [EA Cost Estimator](/tools/estimator) - Get an instant quote
- [Strategy Audit Tool](/tools/audit) - Analyze your Pine Script
- [Our Track Record](/results) - See verified EA results`,

    `## Want This Article Faster?

Subscribe to our newsletter and we'll notify you when new articles are published.

Or [contact us](/contact) directly if you have specific questions about EA development.`,
  ],
};

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const post = blogContent[slug] || {
    ...defaultContent,
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <GlowingOrbs variant="section" />
      <GridBackground />

      <div className="container mx-auto relative z-10">
        {/* Breadcrumb */}
        <AnimatedSection className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#00d4ff] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-300">{post.category}</span>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#00d4ff]/20 text-[#00d4ff] text-sm font-medium rounded-full">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">{post.date}</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">{post.readTime} read</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">
              {post.title}
            </h1>
          </AnimatedSection>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <AnimatedSection delay={0.2} className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="glass-card rounded-xl p-4">
                  <h3 className="text-sm font-bold text-white mb-3">Table of Contents</h3>
                  <ul className="space-y-2">
                    {post.tableOfContents.map((item, index) => (
                      <li key={index}>
                        <a
                          href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors block py-1"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Main Content */}
            <AnimatedSection delay={0.3} className="lg:col-span-3">
              <article className="glass-card rounded-2xl p-6 md:p-10">
                <div className="prose prose-invert prose-lg max-w-none">
                  {post.content.map((section, index) => (
                    <div
                      key={index}
                      className="mb-8 text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: section
                          .replace(/^## (.+)$/gm, '<h2 id="$1" class="text-2xl font-bold text-white mt-10 mb-4 font-display scroll-mt-24">$1</h2>')
                          .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-6 mb-3 font-display">$1</h3>')
                          .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                          .replace(/`([^`]+)`/g, '<code class="px-2 py-1 bg-white/10 rounded text-[#00d4ff] text-sm font-mono">$1</code>')
                          .replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre class="bg-[#0a0a0f] rounded-xl p-4 overflow-x-auto my-4"><code class="text-sm font-mono text-gray-300">$2</code></pre>')
                          .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#00d4ff] hover:underline">$1</a>')
                          .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
                          .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4"><span class="text-[#00d4ff]">$1.</span> $2</li>')
                          .replace(/\n\n/g, '</p><p class="mb-4">')
                      }}
                    />
                  ))}
                </div>
              </article>

              {/* Author Box */}
              <motion.div
                className="glass-card rounded-xl p-6 mt-8 flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#00ff88] flex items-center justify-center text-2xl">
                  🧑‍💻
                </div>
                <div>
                  <h4 className="font-bold text-white">TradeMetrics Pro Team</h4>
                  <p className="text-sm text-gray-400">Expert EA developers with 10+ years of experience in automated trading systems.</p>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                className="glass-card rounded-xl p-8 mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl font-bold text-white mb-3">Need Help With Your EA Project?</h3>
                <p className="text-gray-400 mb-6">Get expert assistance with strategy conversion, EA development, or optimization.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AnimatedButton href="/tools/audit" variant="glow">
                    Free Strategy Audit
                  </AnimatedButton>
                  <AnimatedButton href="/contact" variant="ghost">
                    Contact Us
                  </AnimatedButton>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Related Posts */}
          <AnimatedSection delay={0.6} className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6 font-display">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(blogContent)
                .filter(([s]) => s !== slug)
                .slice(0, 2)
                .map(([s, p]) => (
                  <Link href={`/blog/${s}`} key={s}>
                    <motion.div
                      className="glass-card rounded-xl p-6 hover:border-[#00d4ff]/30 transition-colors"
                      whileHover={{ y: -5 }}
                    >
                      <span className="text-xs px-2 py-1 bg-white/10 rounded text-gray-300">{p.category}</span>
                      <h3 className="text-lg font-bold text-white mt-3 mb-2">{p.title}</h3>
                      <span className="text-sm text-[#00d4ff]">{p.readTime} read →</span>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
