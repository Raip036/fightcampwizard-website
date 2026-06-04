import { motion } from "framer-motion";
import { WIZARD } from "@/lib/constants";
import WaitlistForm from "@/components/ui/WaitlistForm";
import AppStoreButton from "@/components/ui/AppStoreButton";

// Decorative floating bits scattered around the mascot.
const SPARKLES = [
  { emoji: "✨", top: "4%", left: "8%", size: "text-3xl", delay: 0, dur: 3.4 },
  { emoji: "⭐️", top: "12%", right: "6%", size: "text-2xl", delay: 0.6, dur: 4.2 },
  { emoji: "🪄", top: "62%", left: "2%", size: "text-3xl", delay: 1.1, dur: 3.8 },
  { emoji: "💫", top: "78%", right: "10%", size: "text-2xl", delay: 0.3, dur: 4.6 },
  { emoji: "✨", top: "40%", right: "0%", size: "text-xl", delay: 1.4, dur: 3.2 },
  { emoji: "🔵", top: "30%", left: "0%", size: "text-base", delay: 0.9, dur: 4 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

// Avatar stack: initials circles (no external images), brand-tinted gradients.
const AVATARS = [
  { initials: "JM", grad: "from-brand-500 to-brand-700" },
  { initials: "RK", grad: "from-flame to-sun" },
  { initials: "AL", grad: "from-mint to-brand-500" },
  { initials: "TC", grad: "from-grape to-brand-600" },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-hero-grad pt-28 pb-16 sm:pt-36 sm:pb-24 lg:min-h-[92vh] lg:pb-28">
      {/* subtle grid overlay */}
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.6]" aria-hidden />
      {/* soft glow blobs */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-brand-300/30 blur-3xl"
        aria-hidden
      />

      <div className="container-px relative grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        {/* ---------- Copy ---------- */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12, delayChildren: 0.05 }}
          className="relative z-10 order-2 text-center lg:order-1 lg:text-left"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <span className="eyebrow">⚡ AI-powered weight cutting</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-balance mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            Hit your weight.{" "}
            <span className="text-gradient">Every camp.</span>
            <span className="mt-1 block text-ink-soft">Without the misery.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-pretty mx-auto mt-5 max-w-xl text-base text-ink-muted sm:text-lg lg:mx-0"
          >
            Your AI cornerman maps every phase of the cut, reads your meals and
            macros straight from a photo, and dials in fight week to the gram, so
            you step on the scale dialed in and step in the cage full of fire.
          </motion.p>

          {/* CTA — waitlist is the ONE primary action; App Store is secondary. */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-8 flex w-full flex-col items-stretch gap-4 sm:items-start"
          >
            <WaitlistForm anchor className="w-full max-w-md" />
            <div className="flex w-full items-center gap-3 sm:w-auto">
              <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-ink-muted/70 sm:inline">
                or
              </span>
              <AppStoreButton size="md" className="w-full sm:w-auto" />
            </div>
          </motion.div>

          {/* credibility cluster */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-3 lg:items-start lg:justify-start"
          >
            {/* avatar stack + count */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {AVATARS.map((a) => (
                  <span
                    key={a.initials}
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${a.grad} text-[11px] font-bold text-white ring-2 ring-white shadow-soft`}
                    aria-hidden
                  >
                    {a.initials}
                  </span>
                ))}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-sm font-bold text-ink-soft ring-2 ring-white">
                  +
                </span>
              </div>
              <p className="text-left text-sm text-ink-muted">
                Join{" "}
                <span className="font-semibold text-ink">fighters worldwide</span>{" "}
                on the waitlist
              </p>
            </div>

            {/* divider (desktop only) */}
            <span className="hidden h-5 w-px bg-ink/10 sm:inline" aria-hidden />

            {/* star rating */}
            <div className="flex items-center gap-2">
              <span
                className="text-base leading-none tracking-tight text-sun"
                aria-hidden
              >
                ★★★★★
              </span>
              <span className="text-sm text-ink-muted">
                Loved by early testers
              </span>
            </div>
          </motion.div>

          {/* risk-free line */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-3 text-center text-xs text-ink-muted/80 lg:text-left"
          >
            No spam. Be first when we launch.
          </motion.p>
        </motion.div>

        {/* ---------- Mascot ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative order-1 mx-auto w-full max-w-sm sm:max-w-md lg:order-2 lg:max-w-none"
        >
          <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-xl">
            {/* halo behind wizard */}
            <div
              className="absolute inset-[12%] rounded-full bg-sky-grad opacity-70 blur-2xl"
              aria-hidden
            />

            {/* floating sparkles */}
            {SPARKLES.map((s, i) => (
              <motion.span
                key={i}
                className={`pointer-events-none absolute z-20 select-none ${s.size}`}
                style={{
                  top: s.top,
                  left: s.left,
                  right: s.right,
                }}
                animate={{ y: [0, -14, 0], rotate: [0, 12, 0], opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: s.dur,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden
              >
                {s.emoji}
              </motion.span>
            ))}

            {/* wizard */}
            <img
              src={WIZARD.hero}
              alt="FightCamp Wizard mascot holding a scale"
              className="animate-float relative z-10 h-full w-full object-contain drop-shadow-[0_24px_48px_rgba(37,99,235,0.25)]"
              loading="eager"
            />

            {/* speech bubble — sits to the wizard's upper-left; tail points right, at him */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="animate-bounce-soft absolute left-0 top-[4%] z-30 max-w-[8.5rem] rounded-3xl rounded-tr-md bg-white px-3 py-2 text-left text-xs font-semibold text-ink shadow-float sm:left-2 sm:top-[6%] sm:max-w-[13rem] sm:px-4 sm:py-3 sm:text-base"
            >
              Let&apos;s cut that weight, safely. 🪄
              {/* tail pointing toward the wizard on the right */}
              <span className="absolute -right-1.5 bottom-5 h-4 w-4 rotate-45 bg-white" aria-hidden />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-muted lg:flex"
      >
        <span className="text-xs font-medium uppercase tracking-[0.2em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-ink-muted/50 p-1"
        >
          <span className="h-2 w-1 rounded-full bg-ink-muted/70" />
        </motion.span>
      </motion.div>
    </section>
  );
}
