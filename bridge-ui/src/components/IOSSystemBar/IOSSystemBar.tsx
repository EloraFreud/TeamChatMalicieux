import { cn } from '../../lib/cn';

export interface IOSSystemBarProps {
  /** Time shown on the left. */
  time?: string;
  className?: string;
}

/* Exact iOS status-bar glyphs exported from the Figma Flags/system set (Apple UI —
   intentionally NOT Phosphor). Fills use currentColor so they follow text-content-primary. */
const SignalIcon = () => (
  <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 6C2.55228 6 3 6.44772 3 7V9C3 9.55229 2.55228 10 2 10H1C0.447715 10 0 9.55229 0 9V7C0 6.44772 0.447715 6 1 6H2ZM7 4C7.55228 4 8 4.44772 8 5V9C8 9.55229 7.55228 10 7 10H6C5.44772 10 5 9.55229 5 9V5C5 4.44772 5.44772 4 6 4H7ZM12 2C12.5523 2 13 2.42979 13 2.95996V9.04004C13 9.57021 12.5523 10 12 10H11C10.4478 9.99994 10 9.57018 10 9.04004V2.95996C10 2.42982 10.4478 2.00006 11 2H12ZM17 0C17.5523 0 18 0.419733 18 0.9375V9.0625C18 9.58027 17.5523 10 17 10H16C15.4477 10 15 9.58027 15 9.0625V0.9375C15 0.419733 15.4477 0 16 0H17Z"
      fill="currentColor"
    />
  </svg>
);

const WifiIcon = () => (
  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.42676 8.40057C6.70234 7.32168 8.57111 7.32168 9.84669 8.40057C9.91067 8.45858 9.94746 8.54076 9.94923 8.62713C9.95093 8.71355 9.91717 8.79705 9.85548 8.8576L7.85841 10.8732C7.79988 10.9324 7.71997 10.966 7.63673 10.966C7.5535 10.966 7.47358 10.9324 7.41505 10.8732L5.417 8.8576C5.35539 8.79702 5.32151 8.7135 5.32325 8.62713C5.32508 8.5407 5.36265 8.45854 5.42676 8.40057ZM2.76173 5.71111C5.50985 3.15504 9.76555 3.15504 12.5137 5.71111C12.5756 5.77099 12.6114 5.85347 12.6123 5.93963C12.6132 6.02581 12.5793 6.10892 12.5186 6.1701L11.3643 7.33709C11.2453 7.45617 11.0527 7.45876 10.9307 7.34295C10.0282 6.52578 8.85415 6.07339 7.63673 6.07342C6.42004 6.07392 5.24661 6.52628 4.34473 7.34295C4.22266 7.45876 4.03007 7.45616 3.91114 7.33709L2.75684 6.1701C2.69612 6.10902 2.66228 6.02576 2.66309 5.93963C2.66401 5.85347 2.69974 5.77097 2.76173 5.71111ZM0.0966866 3.02947C4.3118 -1.0097 10.9618 -1.00995 15.1768 3.02947C15.2377 3.08942 15.2719 3.17156 15.2725 3.25701C15.273 3.34257 15.239 3.42481 15.1787 3.48553L14.0225 4.65252C13.9033 4.77199 13.7107 4.77324 13.5899 4.65545C11.9839 3.12872 9.85255 2.27764 7.63673 2.27752C5.42063 2.27751 3.28877 3.12856 1.68262 4.65545C1.56183 4.77344 1.36905 4.77222 1.25001 4.65252L0.0937569 3.48553C0.0334926 3.42476 -0.000556156 3.34259 6.87362e-06 3.25701C0.000622792 3.1715 0.0356758 3.08939 0.0966866 3.02947Z"
      fill="currentColor"
    />
  </svg>
);

const BatteryIcon = () => (
  <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path
      opacity="0.35"
      d="M2.66699 0.5H22.333C23.5296 0.5 24.5 1.47038 24.5 2.66699V10.333C24.5 11.5296 23.5296 12.5 22.333 12.5H2.66699C1.47038 12.5 0.5 11.5296 0.5 10.333V2.66699L0.510742 2.44531C0.621597 1.35265 1.54509 0.5 2.66699 0.5Z"
      fill="currentColor"
      stroke="currentColor"
    />
    <path
      opacity="0.4"
      d="M25.6499 5V9C26.4546 8.66122 26.9779 7.87313 26.9779 7C26.9779 6.12687 26.4546 5.33878 25.6499 5Z"
      fill="currentColor"
    />
    <path
      d="M2.2998 3.66634C2.2998 2.92996 2.89676 2.33301 3.63314 2.33301H21.1664C21.9028 2.33301 22.4998 2.92996 22.4998 3.66634V9.32967C22.4998 10.0661 21.9028 10.663 21.1664 10.663H3.63314C2.89676 10.663 2.2998 10.0661 2.2998 9.32967V3.66634Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * IOSSystemBar — iOS status bar. Figma 390×44. Time on the left, then the exact
 * Apple signal / wifi / battery glyphs (from Figma, not Phosphor), all Content/Primary.
 */
export function IOSSystemBar({ time = '9:41', className }: IOSSystemBarProps) {
  return (
    <div
      className={cn(
        'flex h-11 w-[390px] max-w-full flex-row items-center justify-between bg-transparent px-6 text-content-primary',
        className,
      )}
    >
      <span className="font-display text-label-base">{time}</span>
      <div className="flex items-center gap-1.5" aria-hidden>
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}
