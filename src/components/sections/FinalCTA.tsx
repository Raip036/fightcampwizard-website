import { WIZARD } from "@/lib/constants";
import AppStoreButton from "@/components/ui/AppStoreButton";
import WaitlistForm from "@/components/ui/WaitlistForm";

export default function FinalCTA() {
  return (
    <section className="container-px py-16 sm:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-5xl bg-hero-grad px-5 py-14 text-center text-ink shadow-float ring-1 ring-white/10 sm:px-12 sm:py-20 lg:py-24">
        {/* Subtle grid + dramatic brand glow */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-[0.4]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/25 blur-3xl"
        />

        {/* Wizard mascot */}
        <div className="relative mx-auto mb-6 flex justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mx-auto h-32 w-32 rounded-full bg-brand-500/25 blur-2xl sm:h-40 sm:w-40"
          />
          <img
            src={WIZARD.hero}
            alt="The FightCamp Wizard, ready to guide your cut"
            className="relative w-28 animate-float drop-shadow-2xl sm:w-36 lg:w-40"
          />
        </div>

        <h2 className="mx-auto max-w-3xl font-display text-2xl font-extrabold uppercase leading-tight text-balance text-ink sm:text-4xl lg:text-5xl">
          Ready to make weight the{" "}
          <span className="text-accent">smart</span> way?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
          Join the waitlist and be first in line when your AI cornerman lands on
          the App Store. Cleaner cuts, sharper weigh-ins, more energy on fight
          night.
        </p>

        {/* Waitlist form — this instance owns the #waitlist anchor */}
        <div className="mx-auto mt-9 flex w-full max-w-md flex-col items-center gap-6">
          <WaitlistForm variant="dark" anchor />
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-ink-faint">
            <span className="h-px w-8 bg-white/15" />
            or
            <span className="h-px w-8 bg-white/15" />
          </div>
          <AppStoreButton size="lg" />
        </div>
      </div>
    </section>
  );
}
