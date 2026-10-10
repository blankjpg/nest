/**
 * Data service layer for Own What You Spend
 *
 * This module provides mock data implementations of all API functions.
 * To integrate with real APIs (Starling Engine API and Trading 212 API),
 * replace the mock implementations in this file with actual API calls.
 * The interface should remain the same to avoid changes elsewhere in the app.
 */

import { Transaction, MonthlySummary, Portfolio, Settings, CompanySpend, InvestmentAllocation, Holding } from '../types';
import { mockTransactions } from '../data/mockTransactions';
import { companies } from '../data/companies';
import { calculateSavings } from '../lib/merchantMatcher';

// In-memory storage for demo purposes
let transactions = [...mockTransactions];
let settings: Settings = {
  savingsRate: 5,
  autoInvest: false,
  excludedCompanies: [],
};

let portfolio: Holding[] = [
  {
    companyId: 'tesco',
    company: companies.find(c => c.id === 'tesco')!,
    shares: 15,
    averageCost: 3.20,
    currentValue: 52.50,
  },
  {
    companyId: 'apple',
    company: companies.find(c => c.id === 'apple')!,
    shares: 0.5,
    averageCost: 150.00,
    currentValue: 95.00,
  },
];

/**
 * Get all transactions, optionally filtered by date range
 */
export async function getTransactions(limit = 50): Promise<Transaction[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  return transactions
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);
}

/**
 * Get monthly summary of spending at public companies
 */
export async function getMonthlySummary(): Promise<MonthlySummary> {
  await new Promise(resolve => setTimeout(resolve, 150));

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const monthTransactions = transactions.filter(tx => tx.timestamp >= firstDayOfMonth);

  const totalSpent = monthTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const totalSpentAtPublicCompanies = monthTransactions
    .filter(tx => tx.companyId !== null)
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalSaved = monthTransactions.reduce((sum, tx) => sum + tx.savedAmount, 0);

  // Group by company
  const companyMap = new Map<string, CompanySpend>();

  monthTransactions.forEach(tx => {
    if (tx.companyId) {
      const existing = companyMap.get(tx.companyId);
      const company = companies.find(c => c.id === tx.companyId)!;

      if (existing) {
        existing.totalSpent += tx.amount;
        existing.savedAmount += tx.savedAmount;
      } else {
        companyMap.set(tx.companyId, {
          company,
          totalSpent: tx.amount,
          savedAmount: tx.savedAmount,
          investmentPercentage: 100, // default
        });
      }
    }
  });

  const companyBreakdown = Array.from(companyMap.values())
    .sort((a, b) => b.savedAmount - a.savedAmount);

  return {
    month: now.toLocaleString('default', { month: 'long', year: 'numeric' }),
    totalSpent,
    totalSpentAtPublicCompanies,
    totalSaved,
    companyBreakdown,
  };
}

/**
 * Get current portfolio holdings
 */
export async function getPortfolio(): Promise<Portfolio> {
  await new Promise(resolve => setTimeout(resolve, 100));

  const totalValue = portfolio.reduce((sum, h) => sum + h.currentValue, 0);

  return {
    holdings: portfolio,
    totalValue,
  };
}

/**
 * Get user settings
 */
export async function getSettings(): Promise<Settings> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return { ...settings };
}

/**
 * Update user settings
 */
export async function updateSettings(newSettings: Partial<Settings>): Promise<Settings> {
  await new Promise(resolve => setTimeout(resolve, 100));
  settings = { ...settings, ...newSettings };

  // Recalculate saved amounts on existing transactions if savings rate changed
  if (newSettings.savingsRate !== undefined) {
    transactions = transactions.map(tx => ({
      ...tx,
      savedAmount: tx.companyId ? calculateSavings(tx.amount, newSettings.savingsRate) : 0,
    }));
  }

  return { ...settings };
}

/**
 * Confirm investment allocations and execute trades
 */
export async function confirmInvestments(allocations: InvestmentAllocation[]): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real implementation, this would place orders via Trading 212 API
  // For now, we'll just simulate adding to portfolio
  allocations.forEach(allocation => {
    if (allocation.amount > 0) {
      const company = companies.find(c => c.id === allocation.companyId)!;
      const existingHolding = portfolio.find(h => h.companyId === allocation.companyId);

      // Simulate share price and purchase
      const mockSharePrice = 50 + Math.random() * 100;
      const shares = allocation.amount / mockSharePrice;

      if (existingHolding) {
        const totalShares = existingHolding.shares + shares;
        existingHolding.averageCost =
          ((existingHolding.averageCost * existingHolding.shares) + allocation.amount) / totalShares;
        existingHolding.shares = totalShares;
        existingHolding.currentValue += allocation.amount;
      } else {
        portfolio.push({
          companyId: allocation.companyId,
          company,
          shares,
          averageCost: mockSharePrice,
          currentValue: allocation.amount,
        });
      }
    }
  });
}

/**
 * Add a new transaction (for demo/simulation purposes)
 */
export async function addTransaction(merchantName: string, amount: number): Promise<Transaction> {
  await new Promise(resolve => setTimeout(resolve, 100));

  const { matchMerchantToCompany } = await import('../lib/merchantMatcher');
  const companyId = matchMerchantToCompany(merchantName);
  const savedAmount = companyId ? calculateSavings(amount, settings.savingsRate) : 0;

  const newTransaction: Transaction = {
    id: `tx-${Date.now()}`,
    merchantName,
    amount,
    timestamp: new Date(),
    companyId,
    savedAmount,
  };

  transactions.unshift(newTransaction);
  return newTransaction;
}
