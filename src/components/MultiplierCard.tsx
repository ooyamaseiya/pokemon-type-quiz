import { useTranslation } from 'react-i18next';
import {
  ArrowUpRight,
  ArrowDown,
  Minus,
  Shield,
  Star
} from 'lucide-react';

interface MultiplierCardProps {
  multiplier: number;
  isSelected?: boolean;
  isCorrect?: boolean;
  isRevealed?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export default function MultiplierCard({
  multiplier,
  isSelected = false,
  isCorrect = false,
  isRevealed = false,
  onClick,
  disabled = false,
}: MultiplierCardProps) {
  const { t } = useTranslation();

  const getMultiplierCategory = (m: number): 'immune' | 'weak' | 'normal' | 'super' | 'double' => {
    if (m === 0) return 'immune';
    if (m < 1) return 'weak';
    if (m === 1) return 'normal';
    if (m >= 2) return 'double';
    return 'super';
  };

  const category = getMultiplierCategory(multiplier);

  const getButtonClasses = () => {
    if (isSelected && isCorrect) return 'bg-green-500 hover:bg-green-600 text-white scale-105 ring-2 ring-green-300';
    if (isSelected && !isCorrect) return 'bg-red-500 hover:bg-red-600 text-white scale-105 ring-2 ring-red-300';
    if (isRevealed && !isSelected) return 'bg-green-500 text-white';
    return 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white border-2 border-gray-200 dark:border-gray-600';
  };

  const getIcon = () => {
    switch (category) {
      case 'immune':
        return <Shield size={24} className="text-gray-500" />;
      case 'weak':
        return <ArrowDown size={24} className="text-orange-500" />;
      case 'normal':
        return <Minus size={24} className="text-green-500" />;
      case 'super':
        return <ArrowUpRight size={24} className="text-blue-500" />;
      case 'double':
        return <Star size={24} className="text-red-500" fill="currentColor" fillOpacity={0.3} />;
      default:
        return null;
    }
  };

  const getIconCount = () => {
    if (category === 'double') return 2;
    if (category === 'super') return 1;
    if (category === 'weak') return 1;
    if (category === 'immune') return 1;
    return 1;
  };

  const formatMultiplier = (m: number): string => {
    if (m === 0) return '0×';
    if (m === 1) return '1×';
    return `${m}×`;
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative flex flex-col items-center justify-center
        py-4 px-3 rounded-xl font-bold transition-all duration-200
        ${getButtonClasses()}
        ${disabled ? 'cursor-default' : 'cursor-pointer hover:scale-105'}
      `}
    >
      {/* Visual Icon(s) */}
      <div className="flex gap-1 mb-1">
        {Array.from({ length: getIconCount() }).map((_, i) => (
          <div key={i} className="flex-shrink-0">
            {getIcon()}
          </div>
        ))}
      </div>

      {/* Numeric Value */}
      <span className="text-2xl">{formatMultiplier(multiplier)}</span>

      {/* Category Label */}
      <span className="text-xs mt-1 opacity-75">
        {category === 'immune' && t('multiplier.immune')}
        {category === 'weak' && t('multiplier.weak')}
        {category === 'normal' && t('multiplier.normal')}
        {category === 'super' && t('multiplier.super')}
        {category === 'double' && t('multiplier.double')}
      </span>
    </button>
  );
}
