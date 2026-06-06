import { useState, type ReactNode } from "react";

interface Props {
  /** Path to a screenshot (e.g. "/screens/dashboard.png"). If missing/unloaded,
   *  a clearly-labeled empty slot is shown so you can swap images in later. */
  src?: string;
  label?: string;
  /** Optional custom content rendered inside the screen instead of an image. */
  children?: ReactNode;
  className?: string;
  /** Tailwind width classes, e.g. "w-[260px]". */
  widthClass?: string;
}

/**
 * Realistic iPhone mockup with notch/dynamic-island, bezel and reflection.
 * Drop a screenshot via `src`; if it's absent or fails to load you get a
 * labeled empty placeholder ("Add screenshot"). Fully responsive.
 */
export default function PhoneMockup({
  src,
  label = "Add screenshot",
  children,
  className = "",
  widthClass = "w-[clamp(200px,62vw,280px)]",
}: Props) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

  return (
    <div className={`${widthClass} ${className}`}>
      <div className="relative aspect-[9/19.5] rounded-[2.6rem] border-[3px] border-white/10 bg-[#1a2230] p-2 shadow-float ring-1 ring-black/40">
        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-surface-2">
          {/* Dynamic island */}
          <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black/80" />

          {children ? (
            <div className="h-full w-full">{children}</div>
          ) : showImage ? (
            <img
              src={src}
              alt={label}
              onError={() => setErrored(true)}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            // Empty, swappable slot
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-white/12 bg-surface-2 p-6 text-center text-ink-faint">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.04] text-ink-faint">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <circle cx="8.5" cy="8.5" r="1.6" fill="currentColor" stroke="none" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              </div>
              <p className="font-display text-sm font-bold text-ink-soft">{label}</p>
              <p className="text-[11px] leading-tight text-ink-faint">
                Drop an image at
                <br />
                <code className="rounded bg-white/[0.06] px-1 py-0.5 text-[10px] text-ink-muted">
                  {src ?? "/screens/…"}
                </code>
              </p>
            </div>
          )}

          {/* Glass reflection */}
          <div className="pointer-events-none absolute inset-0 rounded-[2.1rem] bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
        </div>

        {/* Side buttons */}
        <div className="absolute -left-1 top-24 h-10 w-1 rounded-l bg-white/15" />
        <div className="absolute -left-1 top-36 h-14 w-1 rounded-l bg-white/15" />
        <div className="absolute -right-1 top-32 h-16 w-1 rounded-r bg-white/15" />
      </div>
    </div>
  );
}
