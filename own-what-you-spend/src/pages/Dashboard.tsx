import { useEffect, useState } from 'react';
import { getTransactions, getMonthlySummary, addTransaction } from '../api';
import { Transaction, MonthlySummary } from '../types';
import { TransactionCard } from '../components/TransactionCard';
import { StatCard } from '../components/StatCard';
import { Button } from '../components/Button';
import { formatCurrency } from '../lib/formatters';

const DEMO_MERCHANTS = [
  { name: 'TESCO EXPRESS', amount: 15.50 },
  { name: 'GREGGS', amount: 4.25 },
  { name: 'SPOTIFY', amount: 10.99 },
  { name: 'STARBUCKS', amount: 4.85 },
  { name: 'AMAZON.CO.UK', amount: 35.99 },
];

export function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<MonthlySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [newTransactionId, setNewTransactionId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [txs, sum] = await Promise.all([
        getTransactions(20),
        getMonthlySummary(),
      ]);
      setTransactions(txs);
      setSummary(sum);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function simulateTransaction() {
    const randomMerchant = DEMO_MERCHANTS[Math.floor(Math.random() * DEMO_MERCHANTS.length)];

    try {
      const newTx = await addTransaction(randomMerchant.name, randomMerchant.amount);
      setNewTransactionId(newTx.id);

      // Reload data to update summary
      const [txs, sum] = await Promise.all([
        getTransactions(20),
        getMonthlySummary(),
      ]);
      setTransactions(txs);
      setSummary(sum);

      // Clear animation after 2 seconds
      setTimeout(() => setNewTransactionId(null), 2000);
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy-800 to-navy-900 border-b border-navy-700 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Dashboard</h1>
          <p className="text-gray-400">Track your spending and savings in real-time</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <StatCard
            label="Saved This Month"
            value={summary ? formatCurrency(summary.totalSaved) : '£0.00'}
            trend={summary && summary.companyBreakdown.length > 0
              ? `from ${summary.companyBreakdown.length} companies`
              : undefined}
          />
          <StatCard
            label="Spent at Public Companies"
            value={summary ? formatCurrency(summary.totalSpentAtPublicCompanies) : '£0.00'}
            trend={summary
              ? `${Math.round((summary.totalSpentAtPublicCompanies / summary.totalSpent) * 100)}% of total spend`
              : undefined}
          />
        </div>

        {/* Simulate Transaction Button */}
        <div className="mb-6">
          <Button
            onClick={simulateTransaction}
            variant="outline"
            className="w-full sm:w-auto"
          >
            💳 Simulate Card Transaction
          </Button>
        </div>

        {/* Recent Transactions Feed */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Recent Transactions</h2>

          {transactions.length === 0 ? (
            <div className="bg-navy-800 rounded-lg p-12 text-center border border-navy-700">
              <p className="text-gray-400 mb-2">No transactions yet</p>
              <p className="text-sm text-gray-500">
                Simulate a transaction to see your savings in action
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map(tx => (
                <TransactionCard
                  key={tx.id}
                  transaction={tx}
                  showAnimation={tx.id === newTransactionId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
