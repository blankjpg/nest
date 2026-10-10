import { InvestmentAllocation } from '../types';
import { formatCurrency } from '../lib/formatters';
import { Button } from './Button';
import { companies } from '../data/companies';

interface ConfirmationModalProps {
  allocations: InvestmentAllocation[];
  totalAmount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({ allocations, totalAmount, onConfirm, onCancel }: ConfirmationModalProps) {
  const activeAllocations = allocations.filter(a => a.amount > 0);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-navy-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-navy-700 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-navy-700">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Review Your Investments</h2>
          <p className="text-gray-400">Please review the following investments before confirming</p>
        </div>

        {/* Investment Summary */}
        <div className="p-6 space-y-3">
          {activeAllocations.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No investments selected</p>
          ) : (
            activeAllocations.map(allocation => {
              const company = companies.find(c => c.id === allocation.companyId);
              return (
                <div
                  key={allocation.companyId}
                  className="flex items-center justify-between p-4 bg-navy-900 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-600 text-white flex items-center justify-center font-bold">
                      {company?.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-100">{company?.name}</p>
                      <p className="text-xs text-gray-400">{company?.ticker}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent-400">{formatCurrency(allocation.amount)}</p>
                    <p className="text-xs text-gray-500">{allocation.percentage}% of savings</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Total */}
        <div className="px-6 py-4 bg-navy-900 border-t border-navy-700">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-100">Total to invest:</span>
            <span className="text-2xl font-bold text-accent-400">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        {/* Risk Warning */}
        <div className="p-6 bg-amber-900/20 border-t border-amber-800/30">
          <div className="flex gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-sm font-semibold text-amber-400 mb-1">Investment Risk Warning</p>
              <p className="text-xs text-amber-200/80">
                The value of investments can go down as well as up, and you may get back less than you invest.
                Past performance is not a reliable indicator of future results.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-navy-700 flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            disabled={activeAllocations.length === 0}
            className="flex-1"
          >
            Confirm & Invest
          </Button>
        </div>
      </div>
    </div>
  );
}
