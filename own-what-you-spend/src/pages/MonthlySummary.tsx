import { useEffect, useState } from 'react';
import { getMonthlySummary, confirmInvestments } from '../api';
import { MonthlySummary as MonthlySummaryType, CompanySpend, InvestmentAllocation } from '../types';
import { CompanyInvestmentCard } from '../components/CompanyInvestmentCard';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { SuccessScreen } from '../components/SuccessScreen';
import { Button } from '../components/Button';
import { formatCurrency } from '../lib/formatters';

export function MonthlySummary() {
  const [summary, setSummary] = useState<MonthlySummaryType | null>(null);
  const [companySpends, setCompanySpends] = useState<CompanySpend[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getMonthlySummary();
      setSummary(data);
      setCompanySpends(data.companyBreakdown);
    } catch (error) {
      console.error('Failed to load monthly summary:', error);
    } finally {
      setLoading(false);
    }
  }

  const handlePercentageChange = (companyId: string, percentage: number) => {
    setCompanySpends(prev =>
      prev.map(cs =>
        cs.company.id === companyId
          ? { ...cs, investmentPercentage: percentage }
          : cs
      )
    );
  };

  const totalToInvest = companySpends.reduce(
    (sum, cs) => sum + (cs.savedAmount * cs.investmentPercentage) / 100,
    0
  );

  const allocations: InvestmentAllocation[] = companySpends.map(cs => ({
    companyId: cs.company.id,
    amount: (cs.savedAmount * cs.investmentPercentage) / 100,
    percentage: cs.investmentPercentage,
  }));

  const handleReviewClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await confirmInvestments(allocations.filter(a => a.amount > 0));
      setShowConfirmModal(false);
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to confirm investments:', error);
    } finally {
      setIsConfirming(false);
    }
  };

  if (showSuccess) {
    const activeAllocations = allocations.filter(a => a.amount > 0);
    return (
      <SuccessScreen
        totalInvested={totalToInvest}
        companiesCount={activeAllocations.length}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading monthly summary...</p>
        </div>
      </div>
    );
  }

  if (!summary || companySpends.length === 0) {
    return (
      <div className="min-h-screen bg-navy-900 pb-20">
        <div className="bg-gradient-to-br from-navy-800 to-navy-900 border-b border-navy-700 px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Monthly Summary</h1>
            <p className="text-gray-400">Review and invest your savings</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-navy-800 rounded-lg p-12 text-center border border-navy-700">
            <p className="text-xl text-gray-300 mb-2">No savings this month</p>
            <p className="text-gray-500">
              Start spending at public companies to see your investment opportunities
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy-800 to-navy-900 border-b border-navy-700 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Monthly Summary</h1>
          <p className="text-gray-400">{summary.month}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-navy-800 rounded-lg p-4 border border-navy-700">
            <p className="text-sm text-gray-400 mb-1">Total Saved</p>
            <p className="text-2xl font-bold text-accent-400">{formatCurrency(summary.totalSaved)}</p>
          </div>
          <div className="bg-navy-800 rounded-lg p-4 border border-navy-700">
            <p className="text-sm text-gray-400 mb-1">Companies</p>
            <p className="text-2xl font-bold text-gray-100">{companySpends.length}</p>
          </div>
          <div className="bg-navy-800 rounded-lg p-4 border border-navy-700">
            <p className="text-sm text-gray-400 mb-1">To Invest</p>
            <p className="text-2xl font-bold text-accent-400">{formatCurrency(totalToInvest)}</p>
          </div>
        </div>

        {/* Company Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Choose Your Investments</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {companySpends.map(cs => (
              <CompanyInvestmentCard
                key={cs.company.id}
                companySpend={cs}
                onPercentageChange={(percentage) => handlePercentageChange(cs.company.id, percentage)}
              />
            ))}
          </div>
        </div>

        {/* Review Button */}
        <div className="sticky bottom-0 bg-navy-900 pt-4 pb-6 border-t border-navy-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400">Total to invest</p>
              <p className="text-3xl font-bold text-accent-400">{formatCurrency(totalToInvest)}</p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleReviewClick}
              disabled={totalToInvest === 0}
            >
              Review & Confirm
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          allocations={allocations}
          totalAmount={totalToInvest}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}
