import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRICING, WIZARD } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path
        d="M5 10.5l3.2 3.2L15 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Free plan — fixed price, no billing toggle. */
function FreeCard() {
  const plan = PRICING.free;
  return (
    <div className="glass-card relative flex h-full flex-col rounded-4xl p-7 text-ink sm:p-8">
      <h3 className="font-display text-xl font-extrabold text-ink">{plan.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted text-pretty">
        {plan.blurb}
      </p>

      <div className="mt-6 flex min-w-0 flex-wrap items-baseline gap-x-2">
        <span className="font-display text-5xl font-extrabold tracking-tight text-ink tabular-nums sm:text-6xl">
          {plan.price}
        </span>
        <span className="text-sm font-semibold text-ink-muted">
          {plan.cadence}
        </span>
      </div>
      <p className="mt-1.5 text-sm text-ink-muted">No card required to start.</p>

      <a
        href="#waitlist"
        className="btn-ghost mt-7 h-14 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      >
        {plan.cta}
      </a>

      <div className="mt-7 h-px w-full bg-white/[0.07]" />

      <ul className="mt-6 flex flex-1 flex-col gap-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-500/15 text-accent">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 text-sm leading-snug text-ink-soft">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Pro plan — price driven by the billing toggle. */
function ProCard({ yearly }: { yearly: boolean }) {
  const plan = PRICING.pro;
  const bigPrice = yearly ? plan.yearlyPerMonth : plan.monthlyPrice;

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-4xl bg-surface p-7 text-ink shadow-glow ring-1 ring-brand-500/50 sm:p-8 lg:scale-[1.05]">
      {/* Soft blue glow for extra elevation */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl"
        aria-hidden
      />

      <span className="absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-3.5 py-1.5 font-display text-[0.7rem] font-extrabold uppercase tracking-wide text-[#3a2a00] shadow-gold">
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden className="h-3.5 w-3.5">
          <path d="M10 1.6l2.47 5 5.53.8-4 3.9.94 5.5L10 14.2 5.06 16.8 6 11.3l-4-3.9 5.53-.8z" />
        </svg>
        Most Popular
      </span>

      <div className="relative z-10 flex items-center gap-2">
        <h3 className="font-display text-xl font-extrabold text-ink">
          {plan.name}
        </h3>
        <img
          src={WIZARD.simple}
          alt=""
          className="h-7 w-7 flex-none animate-float-slow object-contain drop-shadow-[0_0_12px_rgba(91,156,255,0.55)]"
        />
      </div>

      <p className="relative z-10 mt-2 max-w-[18rem] text-sm leading-relaxed text-ink-muted text-pretty">
        {plan.blurb}
      </p>

      {/* Animated price — changes with billing toggle */}
      <div className="relative z-10 mt-6 min-h-[5.25rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={yearly ? "yearly" : "monthly"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex min-w-0 flex-wrap items-end gap-x-2.5">
              <span className="font-display text-5xl font-extrabold leading-none tracking-tight text-ink tabular-nums sm:text-6xl">
                {bigPrice}
              </span>
              <span className="pb-1 text-sm font-semibold text-ink-muted">
                / month
              </span>
              {yearly && (
                <span className="mb-1 inline-flex items-center rounded-full bg-success/20 px-2.5 py-0.5 font-display text-xs font-extrabold uppercase tracking-wide text-success">
                  {plan.savingsLabel}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-ink-muted tabular-nums">
              {yearly ? (
                <>
                  Billed{" "}
                  <span className="font-semibold text-ink-soft">
                    {plan.yearlyTotal}
                  </span>{" "}
                  annually
                </>
              ) : (
                <>
                  Billed{" "}
                  <span className="font-semibold text-ink-soft">
                    {plan.monthlyPrice}
                  </span>{" "}
                  monthly, cancel anytime
                </>
              )}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 7-day free trial — risk removal, applies on both billing periods */}
      <div className="relative z-10 mt-5 inline-flex max-w-full items-center gap-2 self-start rounded-full bg-brand-500/15 px-3.5 py-2 ring-1 ring-brand-500/30">
        <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-brand-500/20 text-accent">
          <CheckIcon className="h-2.5 w-2.5" />
        </span>
        <span className="font-display text-xs font-bold text-ink-soft">
          {plan.trial} · then cancel anytime
        </span>
      </div>

      <a
        href="#waitlist"
        className="btn-gold relative z-10 mt-6 h-14 w-full"
      >
        {plan.cta}
      </a>

      <div className="relative z-10 mt-7 h-px w-full bg-white/[0.08]" />

      <ul className="relative z-10 mt-6 flex flex-1 flex-col gap-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-500/15 text-accent">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 text-sm leading-snug text-ink-soft">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-white/[0.06] bg-night py-20 sm:py-28"
    >
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
      />
      <div className="container-px relative">
        {/* Header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Simple pricing</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold uppercase leading-tight text-ink text-balance sm:text-4xl lg:text-5xl">
            Start free. Go <span className="text-accent">Pro</span> when you're
            ready.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
            Try the Wizard free, then unlock unlimited coaching when your camp
            heats up. Every Pro plan starts with a 7-day free trial.
          </p>
        </Reveal>

        {/* Monthly / Yearly toggle */}
        <Reveal delay={0.08} className="mt-8 flex justify-center">
          <div className="grid max-w-full grid-cols-2 gap-1 rounded-full border border-white/[0.08] bg-white/[0.06] p-1 shadow-card">
            {[false, true].map((isYearly) => {
              const active = yearly === isYearly;
              return (
                <button
                  key={isYearly ? "yearly" : "monthly"}
                  type="button"
                  onClick={() => setYearly(isYearly)}
                  aria-pressed={active}
                  className={`relative flex h-11 w-full cursor-pointer items-center justify-center gap-1.5 rounded-full px-3 font-display text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-base sm:px-4 ${
                    active ? "text-white" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="billing-pill"
                      aria-hidden
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-brand-600 shadow-glow"
                    />
                  )}
                  <span className="relative z-10">
                    {isYearly ? "Yearly" : "Monthly"}
                  </span>
                  {isYearly && (
                    <span
                      className={`relative z-10 whitespace-nowrap rounded-full px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wide ${
                        active ? "bg-white/25 text-white" : "bg-success/20 text-success"
                      }`}
                    >
                      {PRICING.pro.savingsLabel}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Cards — Pro emphasised first on mobile, side-by-side on md+ */}
        <div className="mx-auto mt-14 grid max-w-3xl items-stretch gap-6 sm:gap-7 md:grid-cols-2 lg:gap-8">
          <Reveal delay={0.05} className="order-2 h-full md:order-1">
            <FreeCard />
          </Reveal>
          <Reveal delay={0.12} className="order-1 h-full md:order-2">
            <ProCard yearly={yearly} />
          </Reveal>
        </div>

        {/* Micro-testimonial reassurance */}
        <Reveal delay={0.16} className="mt-9 flex justify-center">
          <p className="mx-auto max-w-md rounded-full border border-white/[0.08] bg-surface/70 px-5 py-2.5 text-center text-sm font-medium text-ink-soft text-pretty shadow-card">
            "Made my last cut the smoothest yet." Pro fighter, 2 weight classes
          </p>
        </Reveal>

        {/* Trust / guarantee line */}
        <Reveal delay={0.2} className="mt-6 text-center">
          <p className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm text-ink-muted text-pretty">
            <span>Cancel anytime</span>
            <span aria-hidden className="text-ink-faint">
              ·
            </span>
            <span>No commitment</span>
            <span aria-hidden className="text-ink-faint">
              ·
            </span>
            <span>Secure via the App Store</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
