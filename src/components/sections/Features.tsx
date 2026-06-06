import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { WIZARD } from "@/lib/constants";

/* ── Clean line icons (inline SVG, inherit currentColor) ─────────────────── */
const ic = {
  plan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" /><path d="M3 9h18M8 2.5v4M16 2.5v4" /><path d="M7.5 13l1.8 1.8 3.2-3.6M15.5 13h2.5M15.5 16.5h2.5" />
    </svg>
  ),
  scan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M3 8V6a3 3 0 013-3h2M16 3h2a3 3 0 013 3v2M21 16v2a3 3 0 01-3 3h-2M8 21H6a3 3 0 01-3-3v-2" /><circle cx="12" cy="12" r="3.2" /><path d="M12 8.8V12l2 1.4" />
    </svg>
  ),
  weight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M4 19h16M5 19l3-9h8l3 9" /><circle cx="12" cy="6" r="2.3" /><path d="M12 8.3V10" />
    </svg>
  ),
  fightweek: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M12 3c3 3 5 5.5 5 8.5a5 5 0 11-10 0C7 8.5 9 6 12 3z" /><path d="M12 20v-3" />
    </svg>
  ),
  rehydrate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M12 21a6 6 0 006-6c0-4-6-12-6-12S6 11 6 15a6 6 0 006 6z" /><path d="M9.5 15a2.5 2.5 0 002.5 2.5" />
    </svg>
  ),
  coach: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v8A2.5 2.5 0 0117.5 16H9l-4 3.5V16H6.5A2.5 2.5 0 014 13.5z" /><path d="M9 8.5h6M9 11.5h3.5" />
    </svg>
  ),
  insights: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M9.5 17.5h5M10 21h4" /><path d="M12 3a6 6 0 00-3.5 10.9c.5.4.8 1 .8 1.6h5.4c0-.6.3-1.2.8-1.6A6 6 0 0012 3z" />
    </svg>
  ),
  safety: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M12 3l7 2.5v5.5c0 4.4-3 8.2-7 9.5-4-1.3-7-5.1-7-9.5V5.5z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

/* ── Tile config. `span` drives the asymmetric bento on lg. ──────────────── */
type Tile = {
  key: string;
  title: string;
  desc: string;
  icon: keyof typeof ic;
  span: string; // lg grid spans
  tint: string; // background + icon styling
  iconColor: string; // bare icon color (no background chip)
};

const TILES: Tile[] = [
  // Row 1 — two rich, taller cards share a half-width each (matching heights).
  {
    key: "plan",
    title: "AI Cut Plans",
    desc: "Personalised, day-by-day plans mapped to your exact fight date, so every kilo lands on schedule.",
    icon: "plan",
    span: "lg:col-span-3",
    tint: "bg-brand-grad text-white",
    iconColor: "text-white",
  },
  {
    key: "insights",
    title: "Macro & Recovery Insights",
    desc: "AI insights drawn from your own data, macros, recovery and readiness in one view.",
    icon: "insights",
    span: "lg:col-span-3",
    tint: "bg-surface border border-white/[0.07] text-ink",
    iconColor: "text-accent",
  },
  // Rows 2-3 — six compact cards in equal thirds (matching heights).
  {
    key: "scan",
    title: "AI Meal Scan",
    desc: "Snap a photo of any meal and get instant calories & macros.",
    icon: "scan",
    span: "lg:col-span-2",
    tint: "bg-surface border border-white/[0.07] text-ink",
    iconColor: "text-accent",
  },
  {
    key: "weight",
    title: "Smart Weight Tracking",
    desc: "Weight trends, projections and a will-you-make-weight forecast.",
    icon: "weight",
    span: "lg:col-span-2",
    tint: "bg-surface border border-white/[0.07] text-ink",
    iconColor: "text-accent",
  },
  {
    key: "fightweek",
    title: "Fight-Week Mode",
    desc: "Water loading, sodium & carb manipulation, sweat protocol, guided and safe.",
    icon: "fightweek",
    span: "lg:col-span-2",
    tint: "bg-surface border border-white/[0.07] text-ink",
    iconColor: "text-accent",
  },
  {
    key: "rehydrate",
    title: "Rehydration Protocol",
    desc: "Science-based recovery after weigh-in so you perform on fight night.",
    icon: "rehydrate",
    span: "lg:col-span-2",
    tint: "bg-surface border border-white/[0.07] text-ink",
    iconColor: "text-accent",
  },
  {
    key: "coach",
    title: "24/7 Wizard Coach",
    desc: "Ask anything, get instant expert answers.",
    icon: "coach",
    span: "lg:col-span-2",
    tint: "bg-surface border border-white/[0.07] text-ink",
    iconColor: "text-accent",
  },
  {
    key: "safety",
    title: "Safety First",
    desc: "Built-in guardrails so you never cut dangerously.",
    icon: "safety",
    span: "lg:col-span-2",
    tint: "bg-surface border border-white/[0.07] text-ink",
    iconColor: "text-accent",
  },
];

const hover = { y: -6, scale: 1.015 };
const tap = { scale: 0.99 };

/* ── Mini macro ring used inside the Meal Scan tile ──────────────────────── */
function MacroRing() {
  const R = 30;
  const C = 2 * Math.PI * R;
  const segs = [
    { color: "#5b9cff", frac: 0.45 }, // carbs (accent)
    { color: "#7eb0ff", frac: 0.35 }, // protein (brand-400)
    { color: "#d9b873", frac: 0.2 }, // fat (gold)
  ];
  let offset = 0;
  return (
    <div className="relative h-20 w-20 shrink-0" aria-hidden="true">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={R} fill="none" stroke="#ffffff14" strokeWidth="9" />
        {segs.map((s, i) => {
          const dash = `${s.frac * C} ${C}`;
          const el = (
            <circle key={i} cx="40" cy="40" r={R} fill="none" stroke={s.color} strokeWidth="9" strokeLinecap="round" strokeDasharray={dash} strokeDashoffset={-offset * C} />
          );
          offset += s.frac;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-base font-bold leading-none text-ink">612</span>
        <span className="text-[10px] font-medium text-ink-faint">kcal</span>
      </div>
    </div>
  );
}

/* ── Weight-trend chart card (Smart Weight Tracking) ─────────────────────── */
function WeightCard() {
  // 7-day downward trend with a couple of wobbles, mapped into a 0..100 viewbox.
  const pts = [
    { x: 4, y: 16 },
    { x: 20, y: 26 },
    { x: 36, y: 22 },
    { x: 52, y: 36 },
    { x: 68, y: 33 },
    { x: 84, y: 46 },
    { x: 116, y: 52 },
  ];
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
  const area = `${line} L116 64 L4 64 Z`;
  return (
    <div className="mt-auto w-full rounded-3xl border border-white/[0.07] bg-surface-2 p-3.5 shadow-card sm:p-4">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-xl font-bold tabular-nums text-ink sm:text-2xl">76.4</span>
        <span className="text-xs font-medium text-ink-muted">kg today</span>
        <span className="ml-auto rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
          -0.4 kg
        </span>
      </div>
      <div className="relative mt-2.5">
        <span className="pointer-events-none absolute left-0 top-0 text-[9px] font-medium text-ink-faint">
          78
        </span>
        <span className="pointer-events-none absolute bottom-0 left-0 text-[9px] font-medium text-ink-faint">
          74
        </span>
        <svg viewBox="0 0 120 66" className="h-16 w-full pl-5" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="wt-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b9cff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#5b9cff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#wt-fill)" />
          <path d={line} fill="none" stroke="#5b9cff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="116" cy="52" r="3.2" fill="#5b9cff" stroke="#0b0d12" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-2xl bg-success/10 px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
        <span className="text-[11px] font-semibold text-ink">On pace for 70.0 by Fri</span>
      </div>
    </div>
  );
}

/* ── Fight-week protocol checklist card (Fight-Week Mode) ─────────────────── */
function FightWeekCard() {
  const rows = [
    { day: "Mon", task: "Water load 8L", done: true },
    { day: "Tue", task: "Water load 8L", done: true },
    { day: "Wed", task: "Sodium cut", done: false },
    { day: "Thu", task: "Carb taper", done: false },
    { day: "Fri", task: "Sweat session", done: false },
    { day: "Sat", task: "Weigh-in", done: false },
  ];
  return (
    <div className="mt-auto w-full rounded-3xl border border-white/[0.07] bg-surface-2 p-3.5 shadow-card sm:p-4">
      <div className="flex items-center gap-2">
        <span className="font-display text-sm font-bold text-ink">Fight week</span>
        <span className="rounded-full bg-brand-500/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
          Day 3 of 6
        </span>
        <span className="ml-auto text-[10px] font-medium text-ink-faint">Auto-guided</span>
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1.5">
        {rows.map((r) => (
          <div key={r.day} className="flex items-center gap-1.5">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md ${
                r.done ? "bg-accent text-night" : "border border-white/15 text-transparent"
              }`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6.2l2.2 2.2L9.5 3.6" />
              </svg>
            </span>
            <span className="w-7 shrink-0 text-[11px] font-semibold text-ink">{r.day}</span>
            <span className="truncate text-[11px] font-medium text-ink-muted">{r.task}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Rehydration recovery timeline card (Rehydration Protocol) ───────────── */
function RehydrateCard() {
  const steps = [
    { t: "+0h", task: "500ml + electrolytes", bar: "w-1/3", c: "bg-brand-400" },
    { t: "+1h", task: "50g carbs + fluids", bar: "w-2/3", c: "bg-brand-500" },
    { t: "+3h", task: "Full meal + rehydrate", bar: "w-full", c: "bg-brand-600" },
  ];
  return (
    <div className="mt-auto w-full rounded-3xl border border-white/[0.07] bg-surface-2 p-3.5 shadow-card sm:p-4">
      <div className="flex items-center gap-2">
        <span className="font-display text-sm font-bold text-ink">Recovery plan</span>
        <span className="ml-auto rounded-full bg-brand-500/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
          +2.8 kg regained
        </span>
      </div>
      <div className="mt-2.5 space-y-2">
        {steps.map((s) => (
          <div key={s.t} className="flex items-center gap-2">
            <span className="w-7 shrink-0 font-display text-[11px] font-bold tabular-nums text-accent">
              {s.t}
            </span>
            <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-ink">{s.task}</span>
            <span className="h-1.5 w-10 shrink-0 overflow-hidden rounded-full bg-white/10">
              <span className={`block h-full rounded-full ${s.c} ${s.bar}`} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Wizard chatbot card (24/7 Wizard Coach) ─────────────────────────────── */
function CoachCard() {
  return (
    <div className="mt-auto w-full rounded-3xl border border-white/[0.07] bg-surface-2 p-3.5 shadow-card sm:p-4">
      <div className="space-y-2">
        <div className="flex justify-end">
          <span className="max-w-[80%] rounded-2xl rounded-br-md bg-brand-500 px-3 py-1.5 text-[11px] font-medium leading-snug text-night">
            4 lbs over, fight in 3 days?
          </span>
        </div>
        <div className="flex items-end gap-1.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-500/30 bg-brand-500/15 text-accent" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" /><path d="M5 18h14" />
            </svg>
          </span>
          <span className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium leading-snug text-ink">
            Totally doable. Start an 8L water load today, we'll taper from Thursday.
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-full border border-white/10 bg-surface-3 px-3 py-1.5">
        <span className="text-[11px] font-medium text-ink-muted">Ask the Wizard...</span>
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-night" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/* ── Recovery score ring used inside the Insights tile ───────────────────── */
function RecoveryRing() {
  const R = 26;
  const C = 2 * Math.PI * R;
  const score = 82;
  return (
    <div className="relative h-16 w-16 shrink-0" aria-hidden="true">
      <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
        <circle cx="36" cy="36" r={R} fill="none" stroke="#ffffff14" strokeWidth="8" />
        <circle
          cx="36"
          cy="36"
          r={R}
          fill="none"
          stroke="#5b9cff"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * C} ${C}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-base font-bold leading-none text-ink">{score}</span>
        <span className="text-[8px] font-medium text-ink-faint">recovery</span>
      </div>
    </div>
  );
}

/* ── Macro + Recovery insights card (two stacked mini cards) ─────────────── */
function InsightsCard() {
  return (
    <div className="mt-auto grid w-full gap-3 sm:grid-cols-2">
      {/* analysed diet → vitamin breakdown (how the feature actually works) */}
      <div className="flex flex-col rounded-3xl border border-white/[0.07] bg-surface-2 p-3.5 shadow-card">
        <div className="flex items-center justify-between gap-2 whitespace-nowrap">
          <span className="font-display text-xs font-bold text-ink">Analysed diet</span>
          <span className="text-[10px] font-medium text-ink-faint">% of target</span>
        </div>
        <div className="mt-2.5 space-y-2">
          {[
            { l: "Vitamin D", pct: 35, low: true },
            { l: "Vitamin B12", pct: 92, low: false },
            { l: "Iron", pct: 58, low: false },
            { l: "Vitamin C", pct: 100, low: false },
          ].map((v) => (
            <div key={v.l}>
              <div className="flex items-center justify-between gap-2 whitespace-nowrap text-[11px] font-medium">
                <span className="text-ink-muted">{v.l}</span>
                <span className={`font-semibold tabular ${v.low ? "text-warn" : "text-ink"}`}>
                  {v.pct}%
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${v.low ? "bg-warn" : "bg-accent"}`}
                  style={{ width: `${v.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl bg-warn/10 px-2.5 py-2 text-[11px] font-semibold leading-snug text-ink">
          Vitamin D's low — add eggs &amp; sunlight.
        </div>
      </div>

      {/* recovery page */}
      <div className="flex flex-col rounded-3xl border border-white/[0.07] bg-surface-2 p-3.5 shadow-card">
        <span className="font-display text-xs font-bold text-ink">Recovery</span>
        <div className="mt-3 flex items-center gap-4">
          <RecoveryRing />
          <div className="min-w-0 flex-1 space-y-2.5 text-xs font-medium">
            {[
              { l: "Sleep", v: "7h 42m" },
              { l: "HRV", v: "68 ms" },
              { l: "Resting HR", v: "51 bpm" },
            ].map((s) => (
              <div
                key={s.l}
                className="flex items-center justify-between gap-3 whitespace-nowrap border-b border-white/[0.05] pb-2 last:border-0 last:pb-0"
              >
                <span className="text-ink-muted">{s.l}</span>
                <span className="font-semibold tabular text-ink">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Safe-cut guardrail card (Safety First) ──────────────────────────────── */
function SafetyCard() {
  return (
    <div className="mt-auto w-full rounded-3xl border border-white/[0.07] bg-surface-2 p-3.5 shadow-card sm:p-4">
      <div className="flex items-center gap-2">
        <span className="font-display text-sm font-bold text-ink">Safe cut zone</span>
        <span className="ml-auto rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
          Within safe range
        </span>
      </div>
      <div className="mt-2.5 flex items-baseline gap-1.5">
        <span className="font-display text-xl font-bold tabular-nums text-ink sm:text-2xl">6.2%</span>
        <span className="text-[11px] font-medium text-ink-muted">of bodyweight</span>
      </div>
      <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-gradient-to-r from-success via-gold to-danger">
        {/* marker at the athlete's position inside the safe band */}
        <span className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-night bg-ink shadow-card" style={{ left: "31%" }} aria-hidden="true" />
      </div>
      <div className="mt-1 flex justify-between text-[9px] font-semibold text-ink-faint">
        <span>Safe</span>
        <span>Caution</span>
        <span>Risky</span>
      </div>
      <p className="mt-2.5 text-[11px] font-medium text-ink-muted">
        We'll warn you before a cut gets risky.
      </p>
    </div>
  );
}

function TileCard({ tile, idx }: { tile: Tile; idx: number }) {
  const dark = tile.tint.includes("bg-brand-grad");
  return (
    <Reveal delay={Math.min(idx * 0.06, 0.4)} className={`${tile.span} h-full min-w-0`}>
      <motion.div
        whileHover={hover}
        whileTap={tap}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className={`group relative flex h-full min-w-0 flex-col gap-4 overflow-hidden rounded-4xl p-5 shadow-card sm:p-6 ${tile.tint} ${
          dark ? "shadow-glow" : ""
        }`}
      >
        {/* large feature tile: floating mascot accent with soft blue corner-glow */}
        {tile.key === "plan" && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-accent/25 blur-3xl"
            />
            <img
              src={WIZARD.thoughtful}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -right-4 hidden w-28 select-none opacity-90 animate-float sm:block sm:w-32 lg:w-44"
            />
          </>
        )}

        <div
          className={`flex items-center justify-center ${tile.iconColor} ${
            dark ? "h-9 w-9" : "h-9 w-9"
          }`}
        >
          {ic[tile.icon]}
        </div>

        <div className="min-w-0">
          <h3 className={`font-display text-lg font-bold leading-tight sm:text-xl ${dark ? "text-white" : "text-ink"}`}>
            {tile.title}
          </h3>
          <p className={`text-pretty mt-1.5 text-sm leading-relaxed ${dark ? "text-white/85" : "text-ink-muted"} ${tile.key === "plan" ? "max-w-[18rem]" : ""}`}>
            {tile.desc}
          </p>
        </div>

        {/* Meal-scan tile: rich mini visual */}
        {tile.key === "scan" && (
          <div className="mt-auto flex items-center gap-3 rounded-3xl border border-white/[0.07] bg-surface-2 p-3">
            <MacroRing />
            <div className="min-w-0 space-y-1.5 text-xs font-medium">
              {[
                { l: "Carbs", c: "bg-accent", v: "68g" },
                { l: "Protein", c: "bg-brand-400", v: "42g" },
                { l: "Fat", c: "bg-gold", v: "19g" },
              ].map((m) => (
                <div key={m.l} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${m.c}`} />
                  <span className="text-ink-muted">{m.l}</span>
                  <span className="ml-auto font-semibold text-ink">{m.v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* large plan tile: realistic mock cut-plan card */}
        {tile.key === "plan" && (
          <div className="relative z-10 mt-auto w-full max-w-sm rounded-3xl border border-white/[0.07] bg-surface-2 p-3.5 shadow-card sm:p-4">
            {/* card header */}
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold text-ink">Your cut plan</span>
              <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
                On track
              </span>
              <span className="ml-auto text-[10px] font-medium text-ink-faint">5 days to weigh-in</span>
            </div>

            {/* day rows */}
            <div className="mt-2.5 divide-y divide-white/[0.06]">
              {[
                { day: "Mon", w: "78.4", task: "Water load", tone: "text-accent bg-brand-500/15" },
                { day: "Tue", w: "77.6", task: "Carb taper", tone: "text-gold bg-gold/10" },
                { day: "Wed", w: "76.8", task: "Sodium cut", tone: "text-accent bg-brand-500/15" },
                { day: "Weigh-in", w: "76.0", task: "Make weight", tone: "text-success bg-success/15" },
              ].map((r) => (
                <div key={r.day} className="flex items-center gap-2 py-1.5">
                  <span className="w-14 shrink-0 text-[11px] font-semibold text-ink sm:text-xs">{r.day}</span>
                  <span className="font-display text-[11px] font-bold tabular-nums text-ink sm:text-xs">
                    {r.w}
                    <span className="text-ink-muted"> kg</span>
                  </span>
                  <span className={`ml-auto truncate rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.tone}`}>
                    {r.task}
                  </span>
                </div>
              ))}
            </div>

            {/* downward trend bar */}
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-3/4 rounded-full bg-brand-grad" />
            </div>
          </div>
        )}

        {tile.key === "weight" && <WeightCard />}
        {tile.key === "fightweek" && <FightWeekCard />}
        {tile.key === "rehydrate" && <RehydrateCard />}
        {tile.key === "coach" && <CoachCard />}
        {tile.key === "insights" && <InsightsCard />}
        {tile.key === "safety" && <SafetyCard />}
      </motion.div>
    </Reveal>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden border-t border-white/[0.06] bg-night py-20 sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true" />
      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Everything in your corner</span>
          <h2 className="text-balance mt-3 font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-4xl lg:text-5xl">
            One app. <span className="text-gradient">Your entire weight cut.</span>
          </h2>
          <p className="text-pretty mx-auto mt-4 max-w-xl text-base text-ink-muted sm:text-lg">
            From your first kilo to fight-night rehydration, every tool you need to make weight
            smarter, safer and stress-free.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6">
          {TILES.map((tile, idx) => (
            <TileCard key={tile.key} tile={tile} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
