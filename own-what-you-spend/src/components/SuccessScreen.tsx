import { Button } from './Button';
import { formatCurrency } from '../lib/formatters';
import { useNavigate } from 'react-router-dom';

interface SuccessScreenProps {
  totalInvested: number;
  companiesCount: number;
}

export function SuccessScreen({ totalInvested, companiesCount }: SuccessScreenProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-100 mb-3">Investment Confirmed!</h1>
        <p className="text-gray-400 mb-8">
          Your investments have been successfully placed
        </p>

        {/* Summary */}
        <div className="bg-navy-800 rounded-lg p-6 border border-navy-700 mb-8">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total invested:</span>
              <span className="text-2xl font-bold text-accent-400">{formatCurrency(totalInvested)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Companies:</span>
              <span className="text-xl font-semibold text-gray-100">{companiesCount}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="primary"
            onClick={() => navigate('/portfolio')}
            className="w-full"
          >
            View Portfolio
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="w-full"
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Additional Info */}
        <p className="text-xs text-gray-500 mt-8">
          You'll receive a confirmation email shortly with the details of your investments.
        </p>
      </div>
    </div>
  );
}
