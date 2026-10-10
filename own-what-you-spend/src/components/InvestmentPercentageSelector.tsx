import { useState } from 'react';

interface InvestmentPercentageSelectorProps {
  value: number;
  onChange: (percentage: number) => void;
}

const PRESET_OPTIONS = [100, 50, 20, 0];

export function InvestmentPercentageSelector({ value, onChange }: InvestmentPercentageSelectorProps) {
  const [isCustom, setIsCustom] = useState(!PRESET_OPTIONS.includes(value));
  const [customValue, setCustomValue] = useState(value.toString());

  const handlePresetClick = (percentage: number) => {
    setIsCustom(false);
    onChange(percentage);
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    setCustomValue(value.toString());
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomValue(val);

    const numVal = parseInt(val);
    if (!isNaN(numVal) && numVal >= 0 && numVal <= 100) {
      onChange(numVal);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 flex-wrap">
        {PRESET_OPTIONS.map(percentage => (
          <button
            key={percentage}
            onClick={() => handlePresetClick(percentage)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all
              ${!isCustom && value === percentage
                ? 'bg-accent-600 text-white shadow-lg'
                : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
              }
            `}
          >
            {percentage}%
          </button>
        ))}

        <button
          onClick={handleCustomClick}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all
            ${isCustom
              ? 'bg-accent-600 text-white shadow-lg'
              : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
            }
          `}
        >
          Custom
        </button>
      </div>

      {isCustom && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="100"
            value={customValue}
            onChange={handleCustomChange}
            className="w-20 px-3 py-2 bg-navy-700 border border-navy-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
          <span className="text-gray-400">%</span>
        </div>
      )}
    </div>
  );
}
