import { motion } from "framer-motion";
import { WIZARD } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";

type Step = {
  title: string;
  desc: string;
  icon: string;
};

const STEPS: Step[] = [
  {
    title: "Tell the Wizard your fight",
    desc: "Your weight class, current weight and fight date. Two minutes of setup and the Wizard knows exactly what you're up against.",
    icon: "🥊",
  },
  {
    title: "Get your personalised cut plan",
    desc: "AI builds a day-by-day plan around your body and timeline, calories, water, sodium and training, all dialled in for you.",
    icon: "🧙",
  },
  {
    title: "Track meals, weight & water",
    desc: "Log your day in seconds. Snap a photo and AI meal scanning handles your macros while the Wizard keeps you on pace.",
    icon: "📸",
  },
  {
    title: "Nail fight week & rehydrate",
    desc: "Fight-week mode counts you down to weigh-in, then the rehydration protocol rebuilds you strong for fight night.",
    icon: "💧",
  },
];

// Playful floating decorative shapes scattered behind the steps.
const FLOATERS = [
  { className: "left-[4%] top-10 h-10 w-10 bg-sun/50", delay: 0, dur: 5 },
  { className: "right-[6%] top-24 h-14 w-14 bg-grape/30", delay: 0.6, dur: 7 },
  { className: "left-[12%] bottom-8 h-12 w-12 bg-mint/40", delay: 1.1, dur: 6 },
  { className: "right-[14%] bottom-16 h-9 w-9 bg-flame/30", delay: 0.3, dur: 5.5 },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="glass-card group relative flex h-full min-w-0 flex-col p-6 shadow-card sm:p-7"
    >
      {/* Big number badge, pops in with a spring then keeps a gentle bob */}
      <motion.span
        initial={{ scale: 0, rotate: -45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.15 + index * 0.12 }}
        className="absolute -top-4 left-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-grad font-display text-lg font-extrabold text-white shadow-float"
      >
        {index + 1}
      </motion.span>
      <span className="mt-3 inline-block text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:animate-wiggle sm:text-4xl" aria-hidden>
        {step.icon}
      </span>
      <h3 className="mt-4 font-display text-lg font-extrabold leading-snug text-ink sm:text-xl">
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
    <section id="how" className="relative overflow-hidden bg-sand py-20 sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      {/* Floating decorative blobs (desktop/tablet only to avoid mobile crowding) */}
      {FLOATERS.map((f, i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`pointer-events-none absolute -z-0 hidden rounded-3xl blur-[1px] md:block ${f.className}`}
          animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
          transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Drifting sparkles */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-[22%] top-12 hidden text-2xl md:block"
        animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        ✨
      </motion.span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-[20%] bottom-24 hidden text-xl md:block"
        animate={{ y: [0, -8, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        ⭐
      </motion.span>

      <div className="container-px relative">
        {/* Header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-ink text-balance sm:text-4xl lg:text-5xl">
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
            className="absolute left-0 right-0 top-5 hidden border-t-2 border-dashed border-brand-200 lg:block"
          />
          {/* Animated accent travelling along the connector path */}
          <motion.span
            aria-hidden
            className="absolute top-5 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-brand-500 shadow-glow lg:block"
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
            className="flex items-center gap-3 rounded-full border border-brand-100 bg-white px-5 py-2.5 shadow-soft"
          >
            <img
              src={WIZARD.food}
              alt=""
              className="h-9 w-9 animate-bounce-soft object-contain"
            />
            <p className="font-display text-sm font-bold text-ink sm:text-base">
              The Wizard's got the plan, you just show up and follow it.
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
