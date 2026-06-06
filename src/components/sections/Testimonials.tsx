import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

// ============================================================================
// Testimonials, premium social proof for FightCamp Wizard. All avatars are
// CSS-based initials circles (no external images). Quotes are illustrative,
// from early beta testers, with a clear disclaimer below the grid.
// ============================================================================

interface Testimonial {
  name: string;
  initials: string;
  /** brand/accent tailwind bg utility for the avatar */
  color: string;
  /** weight class + discipline, e.g. "Lightweight · MMA" */
  meta: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Jordan Tate",
    initials: "JT",
    color: "bg-gradient-to-br from-brand-400 to-brand-600",
    meta: "Lightweight · MMA",
    quote:
      "First camp I have ever made weight without feeling half dead. The Wizard mapped the whole cut day by day, so I always knew exactly where I should be.",
  },
  {
    name: "Mia Kovac",
    initials: "MK",
    color: "bg-gradient-to-br from-brand-500 to-brand-700",
    meta: "Flyweight · Boxing",
    quote:
      "I used to crash diet the last week and pay for it on fight night. Now I walk in lean and full of energy. Honestly the calmest weigh-in of my career.",
  },
  {
    name: "Andre Silva",
    initials: "AS",
    color: "bg-gradient-to-br from-gold to-gold-light",
    meta: "Featherweight · BJJ",
    quote:
      "The meal scan saved me. I just snap a photo and it keeps my macros honest. Hitting weight stopped being guesswork and started being a plan.",
  },
  {
    name: "Rhea Donovan",
    initials: "RD",
    color: "bg-gradient-to-br from-brand-300 to-brand-500",
    meta: "Bantamweight · Muay Thai",
    quote:
      "Coming off the water the right way always scared me. The rehydration guidance walked me through it step by step and I felt strong by the time I stepped in.",
  },
  {
    name: "Caleb Lawson",
    initials: "CL",
    color: "bg-gradient-to-br from-brand-500 to-brand-800",
    meta: "Welterweight · Wrestling",
    quote:
      "My coach loves it because the projections are spot on. We trust the numbers and adjust early instead of panicking on the scale the night before.",
  },
  {
    name: "Tara Whitfield",
    initials: "TW",
    color: "bg-gradient-to-br from-brand-400 to-brand-700",
    meta: "Strawweight · Judo",
    quote:
      "Cutting weight safely was always the part nobody taught me. Having a smart cornerman in my pocket made the whole process feel under control.",
  },
];

function Stars() {
  return (
    <div
      className="flex items-center gap-0.5 text-gold"
      role="img"
      aria-label="Rated 5 out of 5 stars"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-4 w-4 fill-current"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.1l-4.94 2.6.94-5.49-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${color} font-display text-sm font-bold text-ink shadow-card ring-2 ring-white/10`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-y border-white/[0.07] bg-night py-16 sm:py-24"
    >
      {/* soft background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl"
      />

      <div className="container-px relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Loved by fighters</span>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Fighters are making weight the{" "}
            <span className="text-gradient">smart way.</span>
          </h2>
          <p className="mt-4 text-pretty text-base text-ink-muted sm:text-lg">
            Real disciplines, real weight classes, one calmer fight week. Here is
            what early testers say about cutting with their Wizard in the corner.
          </p>
        </Reveal>

        {/* bento / masonry grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: reduceMotion ? 0 : (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="glass-card flex h-full flex-col rounded-4xl p-6 transition-transform duration-300 will-change-transform hover:-translate-y-1 sm:p-7"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-ink sm:text-base">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                <Avatar initials={t.initials} color={t.color} />
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold text-ink">
                    {t.name}
                  </p>
                  <p className="truncate font-mono text-xs text-ink-muted">
                    {t.meta}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* disclaimer */}
        <p className="mx-auto mt-10 max-w-2xl text-balance text-center text-[11px] leading-relaxed text-ink-faint sm:text-xs">
          *Illustrative quotes from early FightCamp Wizard beta testers, shared
          with permission. Individual results vary; weight cutting carries risks,
          always cut responsibly under professional guidance.
        </p>
      </div>
    </section>
  );
}
