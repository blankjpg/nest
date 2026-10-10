import { CompanySpend } from '../types';
import { formatCurrency } from '../lib/formatters';
import { InvestmentPercentageSelector } from './InvestmentPercentageSelector';

interface CompanyInvestmentCardProps {
  companySpend: CompanySpend;
  onPercentageChange: (percentage: number) => void;
}

export function CompanyInvestmentCard({ companySpend, onPercentageChange }: CompanyInvestmentCardProps) {
  const { company, totalSpent, savedAmount, investmentPercentage } = companySpend;
  const investmentAmount = (savedAmount * investmentPercentage) / 100;

  return (
    <div className="bg-navy-800 rounded-lg p-5 border border-navy-700 hover:border-navy-600 transition-all">
      <div className="flex items-start gap-4 mb-4">
        {/* Company Icon/Initial */}
        <div className="w-12 h-12 rounded-full bg-accent-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
          {company.name.charAt(0)}
        </div>

        {/* Company Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-100 text-lg">{company.name}</h3>
          <p className="text-sm text-accent-400 mb-1">{company.ticker}</p>
          <div className="flex gap-4 text-sm">
            <span className="text-gray-400">
              Spent: <span className="text-gray-200 font-medium">{formatCurrency(totalSpent)}</span>
            </span>
            <span className="text-gray-400">
              Saved: <span className="text-accent-400 font-medium">{formatCurrency(savedAmount)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Investment Percentage Selector */}
      <div className="mb-3">
        <label className="text-sm text-gray-400 mb-2 block">Investment allocation:</label>
        <InvestmentPercentageSelector
          value={investmentPercentage}
          onChange={onPercentageChange}
        />
      </div>

      {/* Investment Amount Display */}
      <div className="pt-3 border-t border-navy-700">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">To invest:</span>
          <span className={`text-lg font-bold ${investmentAmount > 0 ? 'text-accent-400' : 'text-gray-500'}`}>
            {formatCurrency(investmentAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}
