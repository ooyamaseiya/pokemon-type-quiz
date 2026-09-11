import { useTranslation } from 'react-i18next';
import { TYPE_ICONS } from '../data/typeIcons';
import { Type } from '../data/typeData';

interface TypeBadgeProps {
  type: Type;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function TypeBadge({ type, size = 'md', showLabel = true, className = '' }: TypeBadgeProps) {
  const { t } = useTranslation();
  const config = TYPE_ICONS[type];
  const IconComponent = config.icon;
  
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5 text-xs',
    md: 'w-12 h-12 p-2 text-sm',
    lg: 'w-16 h-16 p-3 text-base',
  };
  
  const labelSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  
  return (
    <div
      className={`inline-flex flex-col items-center justify-center rounded-full shadow-md ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: config.color }}
      title={t(`type.${type}`)}
    >
      <IconComponent
        size={size === 'sm' ? 14 : size === 'lg' ? 28 : 20}
        color={config.iconColor}
        strokeWidth={2.5}
      />
      {showLabel && (
        <span className={`mt-1 font-semibold text-white ${labelSizes[size]} drop-shadow`}>
          {t(`type.${type}`)}
        </span>
      )}
    </div>
  );
}
