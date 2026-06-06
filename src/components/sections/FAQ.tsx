import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

type QA = {
  q: string;
  a: React.ReactNode;
};

const FAQS: QA[] = [
  {
    q: "Is FightCamp Wizard safe for cutting weight?",
    a: (
      <>
        The Wizard is built around safe, gradual cutting, with guardrails,
        education and reminders to hydrate and refuel. It is a planning and
        tracking companion, not medical advice. Always work with your coach and
        a medical professional, especially for aggressive cuts.
      </>
    ),
  },
  {
    q: "When is the app available?",
    a: (
      <>
        FightCamp Wizard is coming soon to the App Store. Join the{" "}
        <a href="#waitlist" className="font-bold text-accent underline hover:text-brand-300">
          waitlist
        </a>{" "}
        and we'll ping you the moment it lands so you can be first in the cage.
      </>
    ),
  },
  {
    q: "Which sports is it for?",
    a: (
      <>
        Any combat sport with weigh-ins, MMA, boxing, BJJ, wrestling, Muay
        Thai, judo, kickboxing and more. If you cut weight to make a class, the
        Wizard has your corner.
      </>
    ),
  },
  {
    q: "How does the AI meal scanning work?",
    a: (
      <>
        Snap a photo of your plate and the AI estimates calories and macros in
        seconds, no manual logging. Tweak portions if you like, and the Wizard
        keeps your day on pace toward weigh-in.
      </>
    ),
  },
  {
    q: "What's the difference between Free and Pro?",
    a: (
      <>
        Free gives you 1 AI coaching use per day plus weight, hydration and
        meal tracking. Pro unlocks unlimited AI coaching, personalised cut
        plans, AI photo scanning and fight-week mode with the rehydration
        protocol.
      </>
    ),
  },
  {
    q: "Can it help me make weight on short notice?",
    a: (
      <>
        The Wizard always favours safe, gradual cuts. For tight timelines it
        builds the most sensible plan it can and is honest about the risks, it
        will never push a cut it considers unsafe. Short-notice cuts should
        always be cleared with a professional.
      </>
    ),
  },
  {
    q: "Do you store my health data securely?",
    a: (
      <>
        Privacy comes first. Your data is encrypted and never sold, and you stay
        in control of it. See our{" "}
        <a href="/privacy" className="font-bold text-accent underline hover:text-brand-300">
          privacy policy
        </a>{" "}
        for the full details.
      </>
    ),
  },
  {
    q: "Can I cancel anytime?",
    a: (
      <>
        Yes. Pro is billed through your App Store account and you can cancel
        anytime from your subscription settings, no emails, no hoops. You keep
        access until the end of your billing period.
      </>
    ),
  },
];

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: QA;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-surface transition-colors hover:bg-surface-3">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 px-4 py-5 text-left sm:gap-4 sm:px-6"
      >
        <span className="min-w-0 font-display text-base font-extrabold text-ink text-balance sm:text-lg">
          {item.q}
        </span>
        <motion.span
          aria-hidden
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-500/15 text-accent"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
            <path
              d="M5 8l5 5 5-5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-5 text-sm leading-relaxed text-ink text-pretty sm:px-6 sm:text-base">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden border-t border-white/[0.06] bg-night py-20 sm:py-28">
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
      />
      <div className="container-px relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-ink text-balance sm:text-4xl lg:text-5xl">
            Questions, <span className="text-gradient">answered</span>
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-3.5">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <FaqItem
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
