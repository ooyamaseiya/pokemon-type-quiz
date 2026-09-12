import { SVGProps } from 'react';

export default function SkullIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <path d="M12 3c-4 0-7 3-7 7 0 2 .8 3.8 2.2 5.1L6 21h12l-.2-2.9C18.2 16.8 19 15 19 13c0-4-3-7-7-7z"/>
      <circle cx="9" cy="10" r="1.5"/>
      <circle cx="15" cy="10" r="1.5"/>
      <path d="M10 18v3"/>
      <path d="M12 18v3"/>
      <path d="M14 18v3"/>
    </svg>
  );
}
