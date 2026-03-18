import type { SVGProps } from "react";

import type { IconKey } from "../../domain/forestince";

type IconProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

function SvgIcon({
  children,
  title,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function Icon({ name, ...props }: IconProps & { name: IconKey }) {
  switch (name) {
    case "dashboard":
      return (
        <SvgIcon {...props}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </SvgIcon>
      );
    case "calendar":
      return (
        <SvgIcon {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </SvgIcon>
      );
    case "facility":
      return (
        <SvgIcon {...props}>
          <path d="M5 20V8l7-4 7 4v12" />
          <path d="M8 20v-4h8v4M9 10h.01M15 10h.01" />
        </SvgIcon>
      );
    case "users":
      return (
        <SvgIcon {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9.5" cy="7" r="3.5" />
          <path d="m16 11 2 2 4-4" />
        </SvgIcon>
      );
    case "pending":
      return (
        <SvgIcon {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M12 8v5l3 2" />
        </SvgIcon>
      );
    case "reports":
      return (
        <SvgIcon {...props}>
          <path d="M7 3h7l5 5v13H7z" />
          <path d="M14 3v5h5M10 17v-4M14 17V9M18 17v-6" />
        </SvgIcon>
      );
    case "map":
      return (
        <SvgIcon {...props}>
          <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
          <path d="M9 4v14M15 6v14" />
        </SvgIcon>
      );
    case "settings":
      return (
        <SvgIcon {...props}>
          <circle cx="12" cy="12" r="3.5" />
          <path d="m12 2 1.3 2.8 3 .5-.8 3 2.3 2.1-2.3 2.1.8 3-3 .5L12 22l-1.3-2.8-3-.5.8-3-2.3-2.1 2.3-2.1-.8-3 3-.5Z" />
        </SvgIcon>
      );
    case "search":
      return (
        <SvgIcon {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </SvgIcon>
      );
    case "bell":
      return (
        <SvgIcon {...props}>
          <path d="M15 17H5l1.5-2V10a5.5 5.5 0 0 1 11 0v5L19 17h-4" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </SvgIcon>
      );
    case "chevron-right":
      return (
        <SvgIcon {...props}>
          <path d="m9 6 6 6-6 6" />
        </SvgIcon>
      );
    case "menu":
      return (
        <SvgIcon {...props}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </SvgIcon>
      );
    case "request":
      return (
        <SvgIcon {...props}>
          <path d="M12 3v18M3 12h18" />
        </SvgIcon>
      );
    case "leaf":
      return (
        <SvgIcon {...props}>
          <path d="M6 13c0-5 4-8 10-9 1 6-2 10-7 11M8 19c1-3 3-5 6-7" />
        </SvgIcon>
      );
    case "trail":
      return (
        <SvgIcon {...props}>
          <path d="M6 20c4-7 6-12 6-16M10 18c2 1 5 1 8-1M5 10h8" />
        </SvgIcon>
      );
    case "spa":
      return (
        <SvgIcon {...props}>
          <path d="M12 21c0-4-2-5-2-8s2-4 2-6 1-3 3-4c1 3 .5 4-.5 6S15 12 15 14s2 3 2 7" />
          <path d="M8 21v-5" />
        </SvgIcon>
      );
    case "water":
      return (
        <SvgIcon {...props}>
          <path d="M4 15c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0" />
          <path d="M4 10c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0" />
          <path d="M8 5c1 1 2 1 3 0" />
        </SvgIcon>
      );
    case "cabin":
      return (
        <SvgIcon {...props}>
          <path d="M4 11 12 4l8 7" />
          <path d="M6 10v10h12V10M10 20v-5h4v5" />
        </SvgIcon>
      );
    case "layers":
      return (
        <SvgIcon {...props}>
          <path d="m12 4 8 4-8 4-8-4 8-4ZM4 12l8 4 8-4M4 16l8 4 8-4" />
        </SvgIcon>
      );
    case "rule":
      return (
        <SvgIcon {...props}>
          <path d="M4 19h16M6 15l12-12M8 5l4 4" />
        </SvgIcon>
      );
    case "trend-up":
      return (
        <SvgIcon {...props}>
          <path d="m4 16 5-5 4 4 7-8" />
          <path d="M14 7h6v6" />
        </SvgIcon>
      );
    case "spark":
      return (
        <SvgIcon {...props}>
          <path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" />
        </SvgIcon>
      );
    default:
      return (
        <SvgIcon {...props}>
          <circle cx="12" cy="12" r="8" />
        </SvgIcon>
      );
  }
}
