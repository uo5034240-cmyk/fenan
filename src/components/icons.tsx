import type { SVGProps } from "react";

// Outline-style icon set matching the brand kit's icon row (tooth, shield,
// implant, braces, smile). Each icon takes a standard SVG props object so
// className/size can be controlled by the caller — no icon library dependency.

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ToothIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3c-2.2 0-3.4 1.1-4.6 1.1C5.8 4.1 4 3.4 4 6.2c0 2.4.8 4.6 1.4 6.8.5 1.9.9 4.6 2.1 6.4.5.8 1.1 1.4 1.8 1.4.9 0 1.1-1.4 1.3-2.6.2-1.1.4-2.3 1.4-2.3s1.2 1.2 1.4 2.3c.2 1.2.4 2.6 1.3 2.6.7 0 1.3-.6 1.8-1.4 1.2-1.8 1.6-4.5 2.1-6.4.6-2.2 1.4-4.4 1.4-6.8 0-2.8-1.8-2.1-3.4-1.1C15.4 4.1 14.2 3 12 3Z" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5c.6 3.4 1.5 5.6 3 7.1 1.5 1.5 3.7 2.4 7.1 3-3.4.6-5.6 1.5-7.1 3-1.5 1.5-2.4 3.7-3 7.1-.6-3.4-1.5-5.6-3-7.1-1.5-1.5-3.7-2.4-7.1-3 3.4-.6 5.6-1.5 7.1-3 1.5-1.5 2.4-3.7 3-7.1Z" />
    </svg>
  );
}

export function BracesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 9c2 5 4 7 9 7s7-2 9-7" />
      <circle cx="5.5" cy="8.6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="11.6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="11.6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="8.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ImplantIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 4.5c0-1 1.8-1.8 4-1.8s4 .8 4 1.8-1.8 3-4 3-4-2-4-3Z" />
      <path d="M12 7.5v3" />
      <path d="M9.5 10.5h5L13.6 21h-3.2L9.5 10.5Z" />
      <path d="M10.2 13h3.6M10.6 16h2.8M11 19h2" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.8 19 5.5v5.3c0 5-3 8.6-7 10.4-4-1.8-7-5.4-7-10.4V5.5L12 2.8Z" />
      <path d="M12 8.2c.3 1.5.7 2.4 1.4 3.1.7.7 1.6 1.1 3.1 1.4-1.5.3-2.4.7-3.1 1.4-.7.7-1.1 1.6-1.4 3.1-.3-1.5-.7-2.4-1.4-3.1-.7-.7-1.6-1.1-3.1-1.4 1.5-.3 2.4-.7 3.1-1.4.7-.7 1.1-1.6 1.4-3.1Z" />
    </svg>
  );
}

export function SmileIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 13.5c.9 1.8 2.3 2.7 4 2.7s3.1-.9 4-2.7" />
      <circle cx="8.7" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.3" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20.2c-4.6-3-8.4-6.4-8.4-10.4 0-2.6 2-4.4 4.4-4.4 1.6 0 3 .8 4 2.2 1-1.4 2.4-2.2 4-2.2 2.4 0 4.4 1.8 4.4 4.4 0 4-3.8 7.4-8.4 10.4Z" />
    </svg>
  );
}

export function DiamondIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 4h10l4 5.5L12 21 3 9.5 7 4Z" />
      <path d="M3 9.5h18M9 4l-2 5.5L12 21M15 4l2 5.5L12 21" />
    </svg>
  );
}

export function LightbulbIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" />
    </svg>
  );
}
