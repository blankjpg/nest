import { Transaction } from '../types';
import { companies } from '../data/companies';
import { formatCurrency } from '../lib/formatters';

interface TransactionCardProps {
  transaction: Transaction;
  showAnimation?: boolean;
}

export function TransactionCard({ transaction, showAnimation = false }: TransactionCardProps) {
  const company = transaction.companyId
    ? companies.find(c => c.id === transaction.companyId)
    : null;

  const timeAgo = getTimeAgo(transaction.timestamp);

  return (
    <div
      className={`
        bg-navy-800 rounded-lg p-4 border border-navy-700
        transition-all duration-300
        ${showAnimation ? 'animate-slide-in' : ''}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {/* Company initial or icon */}
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
            ${company ? 'bg-accent-600 text-white' : 'bg-navy-700 text-gray-400'}
          `}>
            {company ? company.name.charAt(0) : '?'}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-100 truncate">
              {transaction.merchantName}
            </p>
            {company && (
              <p className="text-xs text-accent-400 mt-0.5">
                {company.name} ({company.ticker})
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
          </div>
        </div>

        <div className="text-right ml-4">
          <p className="font-semibold text-gray-100">
            {formatCurrency(transaction.amount)}
          </p>
          {transaction.savedAmount > 0 && (
            <p className="text-xs text-accent-400 mt-1 font-medium">
              {formatCurrency(transaction.savedAmount)} saved
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
