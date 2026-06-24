import { APP_IS_LIVE, APP_STORE_URL } from "@/lib/constants";

interface Props {
  className?: string;
  size?: "md" | "lg";
  /**
   * "primary" = filled white badge, used as the main hero/CTA action.
   * "secondary" = outlined glass badge, used where it sits below another CTA.
   */
  variant?: "primary" | "secondary";
}

/**
 * Apple "Download on the App Store" badge button. The iOS app is live, so this
 * links straight to APP_STORE_URL. If APP_IS_LIVE is flipped back to false it
 * gracefully reverts to a "Coming Soon" state.
 */
export default function AppStoreButton({
  className = "",
  size = "md",
  variant = "secondary",
}: Props) {
  const dims = size === "lg" ? "h-16 px-7" : "h-14 px-5";
  const isPrimary = variant === "primary";

  const shell = isPrimary
    ? "border-transparent bg-white text-night shadow-float hover:bg-white/90"
    : "border-white/15 bg-white/[0.04] text-ink backdrop-blur shadow-card hover:border-white/25 hover:bg-white/[0.08] hover:shadow-float";

  const appleFill = isPrimary ? "fill-night" : "fill-white";
  const eyebrowColor = isPrimary ? "text-night/60" : "text-ink-soft";

  const inner = (
    <span
      className={`group flex w-full min-h-[44px] items-center justify-center gap-3 rounded-2xl border ${shell} sm:w-auto sm:justify-start ${dims} transition-[transform,border-color,background-color,box-shadow] duration-200 hover:-translate-y-0.5 active:translate-y-0`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`shrink-0 ${appleFill} ${size === "lg" ? "h-8 w-8" : "h-7 w-7"}`}
        aria-hidden
      >
        <path d="M17.05 12.04c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.16-.47 7.83 1.3 10.4.86 1.26 1.89 2.67 3.24 2.62 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.28-1.28 3.13-2.55.99-1.46 1.4-2.88 1.42-2.95-.03-.01-2.72-1.04-2.75-4.12zM14.6 4.6c.71-.86 1.19-2.06 1.06-3.25-1.02.04-2.26.68-3 1.54-.66.76-1.24 1.98-1.08 3.14 1.14.09 2.31-.58 3.02-1.43z" />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className={`text-[10px] font-medium ${eyebrowColor}`}>
          {APP_IS_LIVE ? "Download on the" : "Coming soon to the"}
        </span>
        <span
          className={`font-display font-bold ${
            size === "lg" ? "text-xl" : "text-lg"
          }`}
        >
          App Store
        </span>
      </span>
    </span>
  );

  if (APP_IS_LIVE) {
    return (
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex cursor-pointer ${className}`}
        aria-label="Download FightCamp Wizard on the App Store"
      >
        {inner}
      </a>
    );
  }

  return (
    <a
      href="#waitlist"
      className={`inline-flex cursor-pointer ${className}`}
      aria-label="Coming soon to the App Store, join the waitlist"
    >
      {inner}
    </a>
  );
}
