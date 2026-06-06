import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { SCREENS } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";
import WizardChatScreen from "@/components/showcase-screens/WizardChatScreen";
import FightWeekScreen from "@/components/showcase-screens/FightWeekScreen";

// Tabs without a screenshot render a live in-app mockup instead.
const SCREEN_NODES: Partial<Record<string, React.ReactNode>> = {
  wizardChat: <WizardChatScreen />,
  fightWeek: <FightWeekScreen />,
};

// ── Feature-sync config: order the tabs + give each a caption. ───────────────
const TABS = [
  {
    key: "dashboard" as const,
    accent: "text-accent",
    dot: "bg-accent",
    caption:
      "Your whole cut at a glance, weight trend, days to weigh-in, hydration and today's plan in one calm dashboard.",
  },
  {
    key: "cutPlan" as const,
    accent: "text-accent",
    dot: "bg-brand-400",
    caption:
      "A day-by-day cut plan built around your fight date, walk-around weight and how your body actually responds.",
  },
  {
    key: "nutrition" as const,
    accent: "text-accent",
    dot: "bg-brand-500",
    caption:
      "Snap a photo of your meal and let the Wizard log calories and macros, no tedious manual entry.",
  },
  {
    key: "weighIn" as const,
    accent: "text-accent",
    dot: "bg-brand-300",
    caption:
      "Log every weigh-in, track water cuts and see exactly how close you are to making weight in real time.",
  },
  {
    key: "wizardChat" as const,
    accent: "text-accent",
    dot: "bg-brand-400",
    caption:
      "Ask anything, any hour. Your AI cornerman answers cut, fuel and recovery questions like a coach in your pocket.",
  },
  {
    key: "fightWeek" as const,
    accent: "text-accent",
    dot: "bg-brand-500",
    caption:
      "Fight-week mode flips on water loading, sodium timing and the rehydration protocol to peak you on the day.",
  },
];

const AUTO_MS = 4000;

export default function Showcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);

  // Auto-advance, paused on interaction / hover.
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setDir(1);
      setActive((i) => (i + 1) % TABS.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, active]);

  const select = (i: number) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
    setPaused(true);
  };

  const current = TABS[active];
  const screen = SCREENS[current.key];

  return (
    <section
      id="showcase"
      className="relative overflow-hidden bg-night py-20 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background: dark base + subtle grid + ambient brand glows */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.4]" />
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />

      <div className="container-px mx-auto max-w-6xl">
        {/* Heading */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Take a look inside</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl md:text-5xl">
            Beautiful. Powerful.{" "}
            <span className="text-accent">In your corner.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base text-ink-muted sm:text-lg">
            This is the real app experience, every screen designed to make a brutal
            weight cut feel calm, clear and totally in control.
          </p>
        </Reveal>

        {/* Layout: tabs + phone */}
        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          {/* ── Tab list (desktop side / mobile scroll row) ─────────────── */}
          <Reveal delay={0.1} className="order-2 min-w-0 lg:order-1">
            {/* Mobile: horizontal pill scroller */}
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => select(i)}
                  className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    i === active
                      ? "border-transparent bg-brand-600 text-white shadow-glow"
                      : "border-white/12 bg-surface text-ink-muted hover:text-ink"
                  }`}
                >
                  {SCREENS[t.key].label}
                </button>
              ))}
            </div>

            {/* Desktop: vertical feature list */}
            <ul className="hidden flex-col gap-2 lg:flex">
              {TABS.map((t, i) => {
                const isActive = i === active;
                return (
                  <li key={t.key}>
                    <button
                      onClick={() => select(i)}
                      className={`group relative w-full overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all ${
                        isActive
                          ? "border-white/12 bg-surface-2 shadow-card"
                          : "border-transparent bg-surface/40 hover:bg-surface"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-2.5 w-2.5 shrink-0 rounded-full transition-transform ${t.dot} ${
                            isActive ? "scale-125" : "scale-90 opacity-60"
                          }`}
                        />
                        <span
                          className={`font-display text-lg font-bold uppercase ${
                            isActive ? "text-ink" : "text-ink-muted group-hover:text-ink-soft"
                          }`}
                        >
                          {SCREENS[t.key].label}
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden text-sm leading-relaxed text-ink-muted"
                          >
                            <span className="mt-2 block pl-[1.4rem]">{t.caption}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                      {/* active progress underline */}
                      {isActive && !paused && (
                        <motion.span
                          key={`bar-${active}`}
                          className="absolute bottom-0 left-0 h-0.5 bg-accent"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* ── Phone stage ────────────────────────────────────────────── */}
          <Reveal delay={0.15} className="order-1 flex min-w-0 flex-col items-center lg:order-2">
            <div className="relative flex w-full max-w-full items-center justify-center">
              {/* glow behind phone */}
              <div className="pointer-events-none absolute h-[80%] w-[70%] rounded-full bg-brand-500/20 blur-3xl" />

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={current.key}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: 60 * d, scale: 0.94 }),
                    center: { opacity: 1, x: 0, scale: 1 },
                    exit: (d: number) => ({ opacity: 0, x: -60 * d, scale: 0.94 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  <PhoneMockup
                    src={screen.src}
                    label={screen.label}
                    widthClass="w-[clamp(220px,72vw,300px)]"
                  >
                    {SCREEN_NODES[current.key]}
                  </PhoneMockup>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Caption (mobile + as reinforcement under phone) */}
            <div className="mt-7 min-h-[5.5rem] w-full max-w-sm text-center lg:min-h-0 lg:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className={`font-display text-xl font-bold uppercase ${current.accent}`}>
                    {screen.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {current.caption}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots (mobile) */}
            <div className="mt-5 flex items-center justify-center gap-2 lg:hidden">
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => select(i)}
                  aria-label={`Show ${SCREENS[t.key].label}`}
                  className="grid h-9 w-9 place-items-center"
                >
                  <span
                    className={`block rounded-full transition-all ${
                      i === active ? "h-2.5 w-6 bg-accent" : "h-2.5 w-2.5 bg-white/20"
                    }`}
                  />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
