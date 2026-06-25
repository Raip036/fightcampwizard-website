import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CONTACT_EMAIL } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";

// ── Mock roster data for the coach dashboard (illustrative, not real). ───────
type Status = "ready" | "track" | "risk";

interface Fighter {
  name: string;
  initials: string;
  weightClass: string;
  current: number; // kg
  target: number; // kg
  days: number;
  status: Status;
}

const ROSTER: Fighter[] = [
  { name: "Diego Marto", initials: "DM", weightClass: "Lightweight", current: 70.4, target: 70.3, days: 2, status: "ready" },
  { name: "Aisha Khan", initials: "AK", weightClass: "Strawweight", current: 53.1, target: 52.2, days: 9, status: "track" },
  { name: "Tom Reilly", initials: "TR", weightClass: "Welterweight", current: 81.6, target: 77.1, days: 5, status: "risk" },
  { name: "Lena Vos", initials: "LV", weightClass: "Flyweight", current: 57.8, target: 56.7, days: 12, status: "track" },
  { name: "Marcus Bell", initials: "MB", weightClass: "Featherweight", current: 67.9, target: 65.8, days: 4, status: "risk" },
];

// Mono status labels + functional colours (replaces neon pills).
const STATUS_META: Record<Status, { label: string; text: string; dot: string; bar: string }> = {
  ready: { label: "Fight ready", text: "text-success", dot: "bg-success", bar: "bg-success" },
  track: { label: "On track", text: "text-accent", dot: "bg-accent", bar: "bg-brand-500" },
  risk: { label: "At risk", text: "text-danger", dot: "bg-danger", bar: "bg-danger" },
};

const SUMMARY = [
  { value: 12, label: "Athletes", tone: "text-ink" },
  { value: 9, label: "On track", tone: "text-accent" },
  { value: 2, label: "At risk", tone: "text-danger" },
  { value: 1, label: "Fight ready", tone: "text-success" },
];

const VALUE_BULLETS = [
  {
    title: "Spot at-risk cuts early",
    body: "Real-time alerts flag any athlete drifting off their weight curve before it becomes a missed weigh-in.",
  },
  {
    title: "Post gym announcements",
    body: "Broadcast weigh-in times, schedule changes and fight-week reminders to your whole roster in one tap.",
  },
  {
    title: "Send & manage fight offers",
    body: "Offer a fight to any athlete with the bout details attached. They accept in-app and their camp builds itself.",
  },
];

// Progress toward target: how far through the cut from a +6kg start point.
function cutProgress(f: Fighter): number {
  const start = f.target + 6;
  const pct = ((start - f.current) / (start - f.target)) * 100;
  return Math.max(6, Math.min(100, Math.round(pct)));
}

// Lightweight count-up for the summary stats (adds life to the dashboard).
function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 900, 1);
      setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref} className={className}>{n}</span>;
}

function Avatar({ initials, status }: { initials: string; status: Status }) {
  const ring =
    status === "ready" ? "ring-success/50" : status === "risk" ? "ring-danger/50" : "ring-accent/50";
  return (
    <div
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-sm font-bold text-ink ring-2 ${ring}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function ProgressBar({ pct, tone, delay }: { pct: number; tone: string; delay: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-inset ring-white/[0.04]">
      <motion.div
        className={`h-full rounded-full ${tone}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// Bold coloured status text (replaces the old neon pill).
function StatusLabel({ status }: { status: Status }) {
  const meta = STATUS_META[status];
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide ${meta.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

export default function Coaches() {
  return (
    <section
      id="coaches"
      className="relative overflow-hidden bg-night py-20 text-ink sm:py-28"
    >
      {/* Ambient glow + grid backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-px relative">
        {/* ── Header ───────────────────────────────────────────────────── */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">For coaches &amp; gyms</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold uppercase leading-tight text-balance text-ink sm:text-4xl lg:text-5xl">
            Run your entire fight camp from{" "}
            <span className="text-gradient">one dashboard</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-pretty text-ink-muted sm:text-lg">
            Get a real-time view of every athlete's weight, days to weigh-in, cut
            status and <span className="font-semibold text-ink">fight-readiness</span>, so
            nobody on your team ever misses weight again.
          </p>
        </Reveal>

        {/* ── Mock coach dashboard ─────────────────────────────────────── */}
        <Reveal delay={0.1} className="mt-14">
          <div className="mx-auto max-w-5xl rounded-4xl border border-white/[0.07] bg-surface-2 p-4 shadow-float backdrop-blur-xl sm:p-7">
            {/* Window chrome */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] pb-5">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 font-display text-sm font-bold text-ink">
                  FW
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold text-ink">Coach console</p>
                  <p className="truncate font-mono text-xs text-ink-muted">Team Apex · Live roster</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-success drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success shadow-[0_0_8px_2px_rgba(34,197,94,0.6)]" />
                Live
              </span>
            </div>

            {/* Summary stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {SUMMARY.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className="rounded-2xl border border-white/[0.07] bg-surface p-4"
                >
                  <CountUp value={s.value} className={`font-display text-2xl font-extrabold ${s.tone}`} />
                  <p className="mt-0.5 font-mono text-xs uppercase tracking-wide text-ink-faint">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Roster, desktop header row (hidden on mobile) */}
            <div className="mt-8 hidden grid-cols-12 gap-4 px-3 pb-2 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-ink-faint lg:grid">
              <div className="col-span-4">Fighter</div>
              <div className="col-span-3">Weight vs target</div>
              <div className="col-span-2">Days</div>
              <div className="col-span-3 text-right">Status</div>
            </div>

            {/* Roster rows → stacked cards on mobile, table-like on lg */}
            <div className="space-y-3.5">
              {ROSTER.map((f, i) => {
                const meta = STATUS_META[f.status];
                const pct = cutProgress(f);
                const delta = (f.current - f.target).toFixed(1);
                return (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.45, delay: 0.06 * i }}
                    className="grid grid-cols-1 gap-3.5 rounded-2xl border border-white/[0.07] bg-surface p-4 transition-colors hover:bg-surface-3 lg:grid-cols-12 lg:items-center lg:gap-4"
                  >
                    {/* Fighter identity */}
                    <div className="flex min-w-0 items-center gap-3 lg:col-span-4">
                      <Avatar initials={f.initials} status={f.status} />
                      <div className="min-w-0">
                        <p className="truncate font-display text-sm font-bold text-ink">{f.name}</p>
                        <p className="truncate font-mono text-xs text-ink-muted">{f.weightClass}</p>
                      </div>
                    </div>

                    {/* Weight vs target + progress */}
                    <div className="min-w-0 lg:col-span-3">
                      <div className="mb-1.5 flex items-center justify-between gap-2 font-mono text-xs">
                        <span className="font-semibold text-ink">
                          {f.current.toFixed(1)}
                          <span className="text-ink-faint"> / {f.target.toFixed(1)} kg</span>
                        </span>
                        <span className="shrink-0 text-ink-muted">+{delta}</span>
                      </div>
                      <ProgressBar pct={pct} tone={meta.bar} delay={0.1 + 0.06 * i} />
                    </div>

                    {/* Days to fight */}
                    <div className="flex items-center gap-1.5 lg:col-span-2">
                      <span className="font-mono text-xs text-ink-faint lg:hidden">Days to fight:</span>
                      <span className="font-display text-sm font-bold text-ink">
                        {f.days}
                        <span className="font-mono text-xs font-normal text-ink-faint"> days</span>
                      </span>
                    </div>

                    {/* Status (bold coloured text) */}
                    <div className="lg:col-span-3 lg:text-right">
                      <StatusLabel status={f.status} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ── Announcements + Fight offers ─────────────────────────────── */}
        <div className="mx-auto mt-6 grid max-w-5xl gap-4 md:grid-cols-2">
          {/* Announcements */}
          <Reveal>
            <div className="glass-card h-full rounded-3xl p-6">
              <h3 className="font-display text-base font-bold text-ink">Announcements</h3>
              <p className="mt-2 text-sm text-pretty text-ink-muted">
                Post once, reach the whole gym, weigh-in times, schedule changes and fight-week hype.
              </p>
              <div className="mt-4 space-y-2.5">
                <div className="rounded-xl border border-white/[0.07] bg-surface-2 px-4 py-3">
                  <p className="text-sm font-semibold text-ink">Weigh-ins moved to 7am Friday</p>
                  <p className="mt-0.5 font-mono text-xs text-ink-faint">Posted 2h ago · seen by 11 / 12</p>
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-surface-2 px-4 py-3">
                  <p className="text-sm font-semibold text-ink">Open mat Sunday, bring a towel</p>
                  <p className="mt-0.5 font-mono text-xs text-ink-faint">Posted yesterday · seen by 12 / 12</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Fight offers */}
          <Reveal delay={0.08}>
            <div className="glass-card h-full rounded-3xl p-6">
              <h3 className="font-display text-base font-bold text-ink">Fight offers</h3>
              <p className="mt-2 text-sm text-pretty text-ink-muted">
                Send a bout offer to any athlete with the details attached. They accept in-app and the camp builds itself.
              </p>
              <div className="mt-4 rounded-xl border border-white/[0.07] bg-surface-2 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-bold text-ink">vs. R. Okafor</p>
                    <p className="truncate font-mono text-xs text-ink-muted">Lightweight · 12 Jul · London</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs font-semibold uppercase tracking-wide text-warn">Offer sent</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="flex-1 rounded-lg bg-success/15 py-2 text-center font-display text-xs font-bold text-success">
                    Accept
                  </span>
                  <span className="flex-1 rounded-lg bg-white/[0.06] py-2 text-center font-display text-xs font-bold text-ink-soft">
                    Decline
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Value bullets ────────────────────────────────────────────── */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {VALUE_BULLETS.map((b, i) => (
            <Reveal key={b.title} delay={0.05 * i}>
              <div className="glass-card h-full rounded-3xl p-6">
                <div className="mb-3 text-accent">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-display text-base font-bold text-ink">{b.title}</h3>
                <p className="mt-1.5 text-sm text-pretty text-ink-muted">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── B2B CTA block ────────────────────────────────────────────── */}
        <Reveal delay={0.1} className="mt-14">
          <div className="relative overflow-hidden rounded-4xl border border-white/[0.07] bg-surface p-7 text-center shadow-glow sm:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[30rem] max-w-full -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <h3 className="font-display text-2xl font-extrabold uppercase text-balance text-ink sm:text-3xl">
                Bring the <span className="text-gradient">Wizard</span> to your whole gym.
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-pretty text-ink-muted">
                Custom plans for teams &amp; gyms, let's talk. Get early access and
                we'll build a roster that fits how your camp runs.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="mailto:weightcutwizard@gmail.com?subject=FightCamp%20Wizard%20for%20Coaches"
                  className="btn-chunky w-full sm:w-auto"
                >
                  Request a demo
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=FightCamp%20Wizard%20-%20Early%20access%20for%20my%20gym`}
                  className="btn-ghost w-full sm:w-auto"
                >
                  Get early access
                </a>
              </div>
              <p className="mt-4 text-sm text-ink-muted">
                No per-seat pricing surprises, pricing scales with your roster.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
