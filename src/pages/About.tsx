import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WIZARD, APP_NAME } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";
import AppStoreButton from "@/components/ui/AppStoreButton";

const VALUES = [
  {
    emoji: "🛡️",
    title: "Safety first",
    body: "Aggressive, reckless cuts hurt athletes. Every plan the Wizard builds is gradual, monitored and designed to protect your health and performance, never just the number on the scale.",
  },
  {
    emoji: "🔬",
    title: "Science-backed",
    body: "Hydration, sodium loading, carb manipulation and rehydration are grounded in sports-science research, not gym-bro folklore. We translate the evidence into steps you can actually follow.",
  },
  {
    emoji: "🥊",
    title: "Athlete-obsessed",
    body: "Built with fighters, for fighters. Every feature answers a real fight-camp problem, from the first weigh-in countdown to the final water cut.",
  },
  {
    emoji: "🔒",
    title: "Privacy-first",
    body: "Your weight, your body, your data. We collect only what's needed to coach you, keep it secure, and never sell it. You stay in control.",
  },
];

export default function About() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero intro */}
      <section className="relative overflow-hidden bg-hero-grad pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <div className="container-px">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="min-w-0">
              <span className="eyebrow">Our story 🧙</span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-ink text-balance sm:text-5xl lg:text-6xl">
                Smarter cuts for{" "}
                <span className="text-gradient">every fighter</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
                {APP_NAME} was born from a simple, stubborn belief: cutting
                weight shouldn't be a dangerous guessing game. It should be safe,
                smart and within reach of every athlete, not just the ones with
                a full-time nutritionist.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="min-w-0">
              <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 mx-auto h-64 w-64 rounded-full bg-brand-400/40 blur-3xl sm:h-80 sm:w-80"
                />
                <img
                  src={WIZARD.thoughtful}
                  alt="The FightCamp Wizard, thinking through a weight cut"
                  className="w-56 animate-float-slow drop-shadow-2xl sm:w-72 lg:w-full"
                />
                <motion.span
                  aria-hidden
                  className="absolute -right-2 top-6 text-2xl sm:text-3xl"
                  animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✨
                </motion.span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The why */}
      <section className="py-16 sm:py-24">
        <div className="container-px">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <span className="eyebrow">Why we built it</span>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-ink text-balance sm:text-4xl">
                Weight cutting is dangerous, and confusing
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
                <p>
                  Ask ten fighters how to cut and you'll get ten different
                  answers, most of them passed down in locker rooms, half of
                  them risky. Crash diets, saunas the night before, no water for
                  a day: it costs athletes their energy, their performance, and
                  sometimes far more.
                </p>
                <p>
                  Meanwhile the people who cut <em>well</em> usually have a coach
                  and a nutritionist tracking every gram. That kind of guidance
                  works, it's just expensive and out of reach for most of the
                  athletes who need it.
                </p>
                <p>
                  We thought that was backwards. So we put a calm, science-backed
                  cornerman in everyone's pocket, one that knows your body, your
                  weight class and your fight date, and walks you through the cut
                  step by careful step.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission statement band */}
      <section className="container-px pb-16 sm:pb-24">
        <Reveal>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-5xl bg-brand-grad px-6 py-14 text-center text-white shadow-glow sm:px-12 sm:py-20">
            <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-20" />
            <span className="eyebrow text-white/80">Our mission</span>
            <p className="mx-auto mt-5 max-w-3xl font-display text-2xl font-extrabold leading-snug text-balance sm:text-3xl lg:text-4xl">
              To make weight cutting safe, smart and accessible to every fighter
              on the planet, so you make weight with energy to spare.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="py-4 pb-16 sm:pb-24">
        <div className="container-px">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="eyebrow">What we stand for</span>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-ink text-balance sm:text-4xl">
                The principles behind every plan
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="glass-card h-full rounded-4xl p-6 sm:p-8">
                  <span className="text-3xl sm:text-4xl">{v.emoji}</span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink sm:text-2xl">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted text-pretty sm:text-base">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container-px pb-20 sm:pb-28">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 rounded-5xl border border-brand-100 bg-white/60 px-6 py-12 text-center backdrop-blur-sm sm:px-12 sm:py-16">
            <img
              src={WIZARD.hero}
              alt=""
              className="w-24 animate-float drop-shadow-2xl sm:w-28"
            />
            <h2 className="font-display text-2xl font-extrabold leading-tight text-ink text-balance sm:text-3xl lg:text-4xl">
              Ready to cut smarter?
            </h2>
            <p className="max-w-md text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
              Join the waitlist and be first in line when {APP_NAME} hits the
              App Store.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Link to="/#waitlist" className="btn-chunky h-14 px-7">
                Join the Waitlist
              </Link>
              <AppStoreButton />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
