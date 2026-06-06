import { motion } from "framer-motion";
import { WIZARD } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";

type Step = {
  title: string;
  desc: string;
  icon: JSX.Element;
};

/* ── Clean line icons (inline SVG, inherit currentColor) ─────────────────── */
const svg = (children: JSX.Element) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
    {children}
  </svg>
);

const STEPS: Step[] = [
  {
    title: "Tell the Wizard your fight",
    desc: "Your weight class, current weight and fight date. Two minutes of setup and the Wizard knows exactly what you're up against.",
    icon: svg(<><path d="M3 8V6a3 3 0 013-3h2M16 3h2a3 3 0 013 3v2M21 16v2a3 3 0 01-3 3h-2M8 21H6a3 3 0 01-3-3v-2" /><circle cx="12" cy="12" r="3.2" /></>),
  },
  {
    title: "Get your personalised cut plan",
    desc: "AI builds a day-by-day plan around your body and timeline, calories, water, sodium and training, all dialled in for you.",
    icon: svg(<><rect x="3" y="4.5" width="18" height="16" rx="2.5" /><path d="M3 9h18M8 2.5v4M16 2.5v4" /><path d="M7.5 13l1.8 1.8 3.2-3.6M15.5 13h2.5M15.5 16.5h2.5" /></>),
  },
  {
    title: "Track meals, weight & water",
    desc: "Log your day in seconds. Snap a photo and AI meal scanning handles your macros while the Wizard keeps you on pace.",
    icon: svg(<><path d="M4 7.5h3l1.2-2h7.6L17 7.5h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9a1 1 0 011-1z" /><circle cx="12" cy="13" r="3.2" /></>),
  },
  {
    title: "Nail fight week & rehydrate",
    desc: "Fight-week mode counts you down to weigh-in, then the rehydration protocol rebuilds you strong for fight night.",
    icon: svg(<><path d="M12 21a6 6 0 006-6c0-4-6-12-6-12S6 11 6 15a6 6 0 006 6z" /><path d="M9.5 15a2.5 2.5 0 002.5 2.5" /></>),
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="glass-card group relative flex h-full min-w-0 flex-col p-6 shadow-card sm:p-7"
    >
      {/* Header row: icon + step number, both inside the card */}
      <div className="flex items-center justify-between">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.07] bg-surface-2 p-2.5 text-accent transition-transform duration-300 group-hover:scale-110" aria-hidden>
          {step.icon}
        </span>
        <motion.span
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.15 + index * 0.12 }}
          className="font-mono text-3xl font-bold leading-none text-white/15"
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </div>
      <h3 className="mt-5 font-display text-lg font-extrabold uppercase leading-snug tracking-tight text-ink sm:text-xl">
        {step.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted text-pretty">
        {step.desc}
      </p>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden border-t border-white/[0.06] bg-night py-20 sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />

      <div className="container-px relative">
        {/* Header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink text-balance sm:text-4xl lg:text-5xl">
            From signup to <span className="text-gradient">weigh-in</span>, in
            four steps
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
            No spreadsheets, no guesswork. The Wizard turns your fight into a
            clear, day-by-day game plan you just follow.
          </p>
        </Reveal>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Dashed connector line (desktop only) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-5 hidden border-t-2 border-dashed border-white/15 lg:block"
          />
          {/* Animated accent travelling along the connector path */}
          <motion.span
            aria-hidden
            className="absolute top-5 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-accent shadow-glow lg:block"
            animate={{ left: ["2%", "98%", "2%"] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="grid gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.12} className="relative h-full min-w-0">
                <StepCard step={step} index={i} />
              </Reveal>
            ))}
          </div>

          {/* Playful mascot peeking from behind the steps (large screens only) */}
          <motion.img
            src={WIZARD.thoughtful}
            alt=""
            aria-hidden
            initial={{ y: 40, opacity: 0, rotate: -8 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.5 }}
            className="pointer-events-none absolute -right-4 -bottom-10 hidden h-24 w-24 animate-float select-none object-contain drop-shadow-xl lg:block"
          />
        </div>

        {/* Wizard accent */}
        <Reveal delay={0.2} className="mt-14 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
            className="flex items-center gap-3 rounded-full border border-white/[0.08] bg-surface px-5 py-2.5 shadow-card"
          >
            <img
              src={WIZARD.food}
              alt=""
              className="h-9 w-9 animate-float object-contain"
            />
            <p className="font-display text-sm font-bold text-white sm:text-base">
              The Wizard's got the plan, you just show up and follow it.
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
