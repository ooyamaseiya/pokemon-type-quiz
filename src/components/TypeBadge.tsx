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

  // Rounded-square container with generous padding so the icon and
  // label both fit comfortably. Width is fixed; aspect-square keeps
  // the height equal so the badge is always a true square.
  const sizeClasses = {
    sm: 'w-20 p-2 text-xs',
    md: 'w-24 p-3 text-sm',
    lg: 'w-28 p-4 text-base',
  };

  const labelSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const iconSizes = {
    sm: 28,
    md: 36,
    lg: 44,
  };

  return (
    <div
      className={`inline-flex flex-col items-center justify-center gap-1.5 aspect-square rounded-2xl shadow-md ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: config.color }}
      title={t(`type.${type}`)}
    >
      {IconComponent && (
        <IconComponent
          size={iconSizes[size]}
          color={config.iconColor}
          strokeWidth={2.5}
        />
      )}
      {showLabel && (
        <span className={`font-semibold text-white leading-none ${labelSizes[size]} drop-shadow`}>
          {t(`type.${type}`)}
        </span>
      )}
    </div>
  );
}
