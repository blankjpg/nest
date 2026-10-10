import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | ReactNode;
  trend?: string;
  icon?: ReactNode;
}

export function StatCard({ label, value, trend, icon }: StatCardProps) {
  return (
    <div className="bg-navy-800 rounded-lg p-4 border border-navy-700">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-100">{value}</p>
          {trend && (
            <p className="text-xs text-accent-400 mt-1">{trend}</p>
          )}
        </div>
        {icon && (
          <div className="text-accent-500 opacity-50">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
