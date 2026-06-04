import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const DISCIPLINES = [
  { label: "MMA", icon: "🥊" },
  { label: "Boxing", icon: "🥊" },
  { label: "BJJ", icon: "🥋" },
  { label: "Wrestling", icon: "🤼" },
  { label: "Muay Thai", icon: "🦵" },
  { label: "Judo", icon: "🥋" },
];

interface Stat {
  value: number;
  /** decimals to render (e.g. 4.9) */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 10, suffix: "k+ lbs", label: "cut safely" },
  { value: 98, suffix: "%", label: "made weight" },
  { value: 4.9, decimals: 1, suffix: " ★", label: "average rating" },
  { value: 30, suffix: "+", label: "weight classes" },
];

/** Eases a number from 0 → target once it scrolls into view. */
function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: Stat) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const TRUST_AVATARS = [
  { label: "JT", color: "bg-brand-600" },
  { label: "MK", color: "bg-flame" },
  { label: "AS", color: "bg-grape" },
  { label: "RD", color: "bg-mint" },
  { label: "CL", color: "bg-sun" },
];

export default function SocialProof() {
  return (
    <section className="relative border-y border-ink/5 bg-white py-14 sm:py-20">
      <div className="container-px">
        <Reveal className="text-center">
          {/* avatar stack + rating trust row */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <div className="flex -space-x-3">
              {TRUST_AVATARS.map((a) => (
                <span
                  key={a.label}
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${a.color} font-display text-xs font-bold text-white shadow-soft ring-2 ring-white`}
                  aria-hidden
                >
                  {a.label}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span
                className="flex items-center gap-0.5 text-sun"
                role="img"
                aria-label="Rated 4.9 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.1l-4.94 2.6.94-5.49-4-3.9 5.53-.8L10 1.5z" />
                  </svg>
                ))}
              </span>
              <span className="text-sm font-semibold text-ink-soft">
                <span className="tabular-nums">4.9</span> from beta testers
              </span>
            </div>
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted sm:text-sm">
            Trusted by athletes across every discipline
          </p>

          {/* disciplines */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {DISCIPLINES.map((d) => (
              <span
                key={d.label}
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-sand/60 px-4 py-2 text-sm font-semibold text-ink-soft shadow-soft transition-colors hover:border-brand-300 hover:text-brand-600 sm:text-base"
              >
                <span aria-hidden>{d.icon}</span>
                {d.label}
              </span>
            ))}
          </div>
        </Reveal>

        {/* stat counters */}
        <Reveal delay={0.1} className="mt-10 sm:mt-14">
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card flex flex-col items-center justify-center rounded-4xl px-3 py-6 text-center sm:px-5 sm:py-8"
              >
                <span className="font-display text-3xl font-extrabold leading-none text-gradient sm:text-4xl lg:text-5xl">
                  <CountUp {...stat} />
                </span>
                <span className="mt-2 text-xs font-medium uppercase tracking-wide text-ink-muted sm:text-sm">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* disclaimer */}
          <p className="mx-auto mt-6 max-w-xl text-balance text-center text-[11px] leading-relaxed text-ink-muted/80 sm:text-xs">
            *Figures based on results reported by FightCamp Wizard beta testers.
            Individual results vary; weight cutting carries risks, always cut
            responsibly under professional guidance.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
