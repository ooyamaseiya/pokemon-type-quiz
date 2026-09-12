import { SVGProps } from 'react';

interface DragonIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export default function DragonIcon({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  ...props
}: DragonIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      {/* Head outline: snout (left) over the cranium to the nape, down to the jaw tip */}
      <path d="M4 10c3-3 6.5-4.5 10-4.5 3.5 0 6 2 6 4.5 0 2.5-1.5 5-4 6l-.5 4" />
      {/* Open lower jaw */}
      <path d="M15.5 20c-.5-3-2-4.5-5-5.5L5 14" />
      {/* Horn */}
      <path d="M17 6c1-2 2.5-3 4-2.5" />
      {/* Eye */}
      <path d="M13.5 9.5h.01" />
    </svg>
  );
}
