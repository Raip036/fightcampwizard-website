import { motion } from "framer-motion";
import { WIZARD } from "@/lib/constants";
import AppStoreButton from "@/components/ui/AppStoreButton";
import WaitlistForm from "@/components/ui/WaitlistForm";

/** Floating confetti/sparkle emoji that loops gently around the panel. */
const SPARKLES = [
  { emoji: "✨", className: "left-[8%] top-[14%]", size: "text-2xl sm:text-3xl", dur: 5 },
  { emoji: "💧", className: "right-[10%] top-[20%]", size: "text-xl sm:text-2xl", dur: 6 },
  { emoji: "🎉", className: "left-[14%] bottom-[18%]", size: "text-2xl sm:text-3xl", dur: 7 },
  { emoji: "⚡", className: "right-[8%] bottom-[22%]", size: "text-xl sm:text-2xl", dur: 5.5 },
  { emoji: "🥇", className: "right-[18%] top-[8%]", size: "hidden text-2xl sm:block", dur: 6.5 },
  { emoji: "💪", className: "left-[20%] top-[8%]", size: "hidden text-2xl sm:block", dur: 6 },
];

export default function FinalCTA() {
  return (
    <section className="container-px py-16 sm:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-5xl bg-brand-grad px-5 py-14 text-center text-white shadow-glow sm:px-12 sm:py-20 lg:py-24">
        {/* Subtle grid + glow texture */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-20" />
        <div
          aria-hidden
          className="absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
        />

        {/* Looping floating sparkles */}
        {SPARKLES.map((s, i) => (
          <motion.span
            key={i}
            aria-hidden
            className={`pointer-events-none absolute ${s.className} ${s.size}`}
            animate={{ y: [0, -14, 0], rotate: [0, 8, -6, 0], opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: s.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          >
            {s.emoji}
          </motion.span>
        ))}

        {/* Wizard mascot */}
        <div className="relative mx-auto mb-6 flex justify-center">
          <div
            aria-hidden
            className="absolute inset-0 mx-auto h-32 w-32 rounded-full bg-white/25 blur-2xl sm:h-40 sm:w-40"
          />
          <img
            src={WIZARD.hero}
            alt="The FightCamp Wizard, ready to guide your cut"
            className="relative w-28 animate-float drop-shadow-2xl sm:w-36 lg:w-40"
          />
        </div>

        <h2 className="mx-auto max-w-3xl font-display text-2xl font-extrabold leading-tight text-balance sm:text-4xl lg:text-5xl">
          Ready to make weight the smart way?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 text-pretty sm:text-lg">
          Join the waitlist and be first in line when your AI cornerman lands on
          the App Store. Cleaner cuts, sharper weigh-ins, more energy on fight
          night.
        </p>

        {/* Waitlist form — this instance owns the #waitlist anchor */}
        <div className="mx-auto mt-9 flex w-full max-w-md flex-col items-center gap-6">
          <WaitlistForm variant="dark" anchor />
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-white/50">
            <span className="h-px w-8 bg-white/25" />
            or
            <span className="h-px w-8 bg-white/25" />
          </div>
          <AppStoreButton size="lg" />
        </div>
      </div>
    </section>
  );
}
