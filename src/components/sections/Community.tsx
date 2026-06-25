import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { WIZARD } from "@/lib/constants";

// ============================================================================
// Community, the social heartbeat of FightCamp Wizard. Join your gym, share
// progress, and climb the leaderboard. All avatars are CSS/initial based and
// all member photos are clearly-styled dashed placeholders (users add their own).
// ============================================================================

interface Gym {
  name: string;
  location: string;
  members: number;
  initials: { label: string; color: string }[];
}

const GYMS: Gym[] = [
  {
    name: "Iron Lions MMA",
    location: "London",
    members: 248,
    initials: [
      { label: "JT", color: "bg-gradient-to-br from-brand-500 to-brand-700" },
      { label: "MK", color: "bg-gradient-to-br from-accent to-brand-600" },
      { label: "AS", color: "bg-gradient-to-br from-brand-400 to-brand-600" },
      { label: "RD", color: "bg-gradient-to-br from-brand-500 to-brand-700" },
    ],
  },
  {
    name: "Apex Boxing Club",
    location: "Manchester",
    members: 134,
    initials: [
      { label: "CL", color: "bg-gradient-to-br from-accent to-brand-600" },
      { label: "BN", color: "bg-gradient-to-br from-brand-500 to-brand-700" },
      { label: "DV", color: "bg-gradient-to-br from-brand-400 to-brand-600" },
    ],
  },
  {
    name: "Gracie Grapplers",
    location: "Leeds",
    members: 87,
    initials: [
      { label: "FP", color: "bg-gradient-to-br from-brand-500 to-brand-700" },
      { label: "OK", color: "bg-gradient-to-br from-accent to-brand-600" },
      { label: "TW", color: "bg-gradient-to-br from-brand-400 to-brand-600" },
    ],
  },
];

interface Post {
  name: string;
  handle: string;
  color: string;
  caption: string;
  photoLabel: string;
  /** Optional photo (Pexels License, free for commercial use, no attribution). */
  photo?: string;
  likes: number;
  comments: number;
}

const POSTS: Post[] = [
  {
    name: "Jordan Tate",
    handle: "@jtate_mma",
    color: "bg-gradient-to-br from-brand-500 to-brand-700",
    caption: "Made weight. 145.0 on the dot, fight week locked in.",
    photoLabel: "Weigh-in photo",
    photo: "/assets/community-weigh-in.jpg",
    likes: 128,
    comments: 24,
  },
  {
    name: "Mia Kovac",
    handle: "@miakovac",
    color: "bg-gradient-to-br from-accent to-brand-600",
    caption: "Meal prep done for the week, staying lean and full.",
    photoLabel: "Meal prep photo",
    photo: "/assets/community-meal-prep.jpg",
    likes: 86,
    comments: 11,
  },
];

interface Rank {
  pos: number;
  name: string;
  weightClass: string;
  /** Numeric value for points-based rows (rendered as "N,NNN pts"). */
  points?: number;
  /** Day count for streak-based rows (rendered with a flame icon). */
  streak?: number;
  you?: boolean;
}

const LEAGUE: Rank[] = [
  { pos: 1, name: "Carla Reyes", weightClass: "Featherweight", points: 1240 },
  { pos: 2, name: "Sam Okafor", weightClass: "Featherweight", streak: 18 },
  { pos: 3, name: "Leo Marchetti", weightClass: "Featherweight", points: 1090 },
  { pos: 4, name: "You", weightClass: "Featherweight", streak: 12, you: true },
  { pos: 5, name: "Priya Nair", weightClass: "Featherweight", points: 910 },
];

// Playful drifting accent dots scattered behind the content (desktop/tablet only).
const CONFETTI = [
  { className: "left-[5%] top-40 h-3.5 w-3.5 bg-brand-500/60", delay: 0, dur: 5 },
  { className: "left-[14%] bottom-24 h-2.5 w-2.5 bg-accent/50", delay: 0.5, dur: 6 },
  { className: "right-[6%] top-52 h-3 w-3 bg-brand-400/50", delay: 1, dur: 5.5 },
  { className: "right-[22%] bottom-32 h-2.5 w-2.5 bg-brand-500/60", delay: 0.3, dur: 6.5 },
  { className: "left-[28%] top-24 h-2 w-2 bg-accent/60", delay: 1.2, dur: 5 },
];

// Inline SVG icons (no emoji) ────────────────────────────────────────────────
function GymIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M4 9v6M20 9v6M7 7v10M17 7v10M7 12h10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2l1.2-2h6.6L15.5 7h2A1.5 1.5 0 0 1 19 8.5v9A1.5 1.5 0 0 1 17.5 19h-13A1.5 1.5 0 0 1 3 17.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="11" cy="13" r="3" stroke="currentColor" strokeWidth="1.7" fill="none" />
    </svg>
  );
}

function ImagePlaceholderIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <circle cx="9" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="m5 17 4.5-4.5 3 3L16 12l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function TrophyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M7 4h10v3a5 5 0 0 1-10 0V4Z" fill="currentColor" opacity="0.9" />
      <path
        d="M7 4H4v2a3 3 0 0 0 3 3M17 4h3v2a3 3 0 0 1-3 3M9 12h6l-.5 3h-5L9 12ZM8 19h8v1.5H8V19Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function FlameIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2c1 3.5-1.5 4.5-1.5 7A2 2 0 0 0 12 11a2 2 0 0 0 1.8-1.2C15 12 16.5 13 16.5 16a4.5 4.5 0 1 1-9 0c0-3.2 2-4.8 2.7-7.2C10.7 6.8 10.5 4.2 12 2Z" />
    </svg>
  );
}

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12 20s-7-4.35-7-9.5A4 4 0 0 1 12 7a4 4 0 0 1 7 3.5C19 15.65 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function CommentIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M4 5h16v11H8l-4 3V5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function Avatar({ label, color, size = "h-9 w-9" }: { label: string; color: string; size?: string }) {
  return (
    <div
      className={`${size} ${color} flex shrink-0 items-center justify-center rounded-full font-display text-xs font-bold text-white ring-2 ring-night`}
    >
      {label}
    </div>
  );
}

export default function Community() {
  return (
    <section id="community" className="relative overflow-hidden border-y border-white/[0.06] bg-night py-20 sm:py-28">
      {/* Subtle grid + ambient brand glows */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.4]" aria-hidden />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" aria-hidden />

      {/* Floating accent dots drifting behind content */}
      {CONFETTI.map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`pointer-events-none absolute -z-0 hidden rounded-full md:block ${c.className}`}
          animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
          transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-16 hidden md:block"
        animate={{ y: [0, -12, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <HeartIcon className="h-6 w-6 text-brand-500/50" />
      </motion.span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-28 hidden md:block"
        animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FlameIcon className="h-5 w-5 text-accent/50" />
      </motion.span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-[16%] bottom-20 hidden md:block"
        animate={{ y: [0, -10, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 6, delay: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <TrophyIcon className="h-5 w-5 text-gold/50" />
      </motion.span>

      <div className="container-px relative mx-auto max-w-6xl">
        {/* Header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Community</span>
          <h2 className="text-balance mt-3 font-display text-3xl font-bold uppercase tracking-tight text-ink sm:text-4xl lg:text-5xl">
            You don&apos;t cut <span className="text-gradient">alone.</span>
          </h2>
          <p className="text-pretty mx-auto mt-4 max-w-xl text-base text-ink-muted sm:text-lg">
            Train alongside your gym, share weigh-in wins and progress pics, and climb the ranks.
            Your camp hypes you up, every single cut.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-6 lg:mt-16 lg:grid-cols-12">
          {/* ── Join your gym ─────────────────────────────────────────── */}
          <Reveal className="lg:col-span-5" delay={0.05}>
            <div className="glass-card flex h-full flex-col rounded-4xl border border-white/[0.07] bg-surface p-5 shadow-card sm:p-6">
              <div className="flex items-center gap-2">
                <GymIcon className="h-5 w-5 text-accent" />
                <h3 className="font-display text-lg font-bold uppercase text-ink">Join your gym</h3>
              </div>
              <p className="mt-1 text-sm text-ink-muted">Find your team and cut together.</p>

              <div className="mt-5 flex flex-col gap-3">
                {GYMS.map((gym) => (
                  <motion.div
                    key={gym.name}
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="flex flex-wrap items-center gap-3 rounded-3xl border border-white/[0.07] bg-surface-2 p-3 shadow-card sm:flex-nowrap"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-grad font-display text-sm font-bold text-white">
                      {gym.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-semibold text-ink">{gym.name}</p>
                      <p className="truncate text-xs text-ink-muted">
                        {gym.location} · {gym.members} members
                      </p>
                    </div>
                    <div className="flex -space-x-2">
                      {gym.initials.slice(0, 4).map((a, i) => (
                        <Avatar key={i} label={a.label} color={a.color} size="h-7 w-7" />
                      ))}
                    </div>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="ml-auto inline-flex min-h-[44px] shrink-0 items-center rounded-full bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:ml-0"
                    >
                      Join
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── Share photos & progress ───────────────────────────────── */}
          <Reveal className="lg:col-span-4" delay={0.1}>
            <div className="glass-card flex h-full flex-col rounded-4xl border border-white/[0.07] bg-surface p-5 shadow-card sm:p-6">
              <div className="flex items-center gap-2">
                <CameraIcon className="h-5 w-5 text-accent" />
                <h3 className="font-display text-lg font-bold uppercase text-ink">Share your wins</h3>
              </div>
              <p className="mt-1 text-sm text-ink-muted">Post progress, hype the squad.</p>

              <div className="mt-5 flex flex-col gap-4">
                {POSTS.map((post) => (
                  <motion.article
                    key={post.handle}
                    whileHover={{ y: -4, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="rounded-3xl border border-white/[0.07] bg-surface-2 p-3.5 shadow-card"
                  >
                    <div className="flex items-center gap-2.5">
                      <Avatar label={post.name.split(" ").map((w) => w[0]).join("")} color={post.color} />
                      <div className="min-w-0">
                        <p className="truncate font-display text-sm font-semibold text-ink">{post.name}</p>
                        <p className="truncate text-xs text-ink-muted">{post.handle}</p>
                      </div>
                    </div>
                    <p className="text-pretty mt-2.5 text-sm text-ink-soft">{post.caption}</p>
                    {post.photo ? (
                      <img
                        src={post.photo}
                        alt={post.photoLabel}
                        loading="lazy"
                        className="mt-3 aspect-[4/3] w-full rounded-2xl object-cover"
                      />
                    ) : (
                      // Dashed placeholder, members add their own photos
                      <div className="mt-3 flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 bg-surface-2 text-center">
                        <ImagePlaceholderIcon className="h-7 w-7 text-ink-faint" />
                        <span className="px-3 text-xs font-medium text-ink-faint">{post.photoLabel}</span>
                      </div>
                    )}
                    <div className="mt-3 flex items-center gap-4 text-xs font-medium text-ink-muted">
                      <motion.span
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className="inline-flex cursor-pointer items-center gap-1.5"
                      >
                        <motion.span
                          aria-hidden
                          animate={{ scale: [1, 1.18, 1] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <HeartIcon className="h-4 w-4 text-danger" />
                        </motion.span>
                        {post.likes}
                      </motion.span>
                      <span className="inline-flex items-center gap-1.5">
                        <CommentIcon className="h-4 w-4 text-ink-muted" />
                        {post.comments}
                      </span>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        className="ml-auto cursor-pointer font-semibold text-accent"
                      >
                        Hype
                      </motion.span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── Leaderboard ───────────────────────────────────────────── */}
          <Reveal className="lg:col-span-3" delay={0.15}>
            <div className="glass-card relative flex h-full flex-col rounded-4xl border border-white/[0.07] bg-surface p-5 shadow-card sm:p-6">
              {/* Wizard accent, bobs and gives a playful wave on hover */}
              <motion.img
                src={WIZARD.simple}
                alt=""
                aria-hidden
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.3 }}
                whileHover={{ rotate: [0, -10, 10, -6, 0] }}
                className="animate-float-slow pointer-events-none absolute -right-3 -top-7 h-16 w-16 select-none drop-shadow-md sm:h-20 sm:w-20"
              />
              <div className="flex items-center gap-2">
                <motion.span
                  className="inline-flex"
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <TrophyIcon className="h-5 w-5 text-gold" />
                </motion.span>
                <h3 className="font-display text-lg font-bold uppercase text-ink">Leaderboard</h3>
              </div>
              <span className="mt-2 inline-flex w-fit items-center gap-1 text-xs font-semibold text-gold">
                Featherweight League
              </span>

              <div className="mt-4 flex flex-col gap-2">
                {LEAGUE.map((row, i) => (
                  <motion.div
                    key={row.pos}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 + i * 0.08 }}
                    whileHover={{ x: 4, scale: 1.02 }}
                    className={`flex items-center gap-2.5 rounded-2xl px-2.5 py-2 ${
                      row.you
                        ? "bg-brand-grad text-white shadow-glow ring-1 ring-brand-400"
                        : "bg-surface-2"
                    }`}
                  >
                    {row.pos === 1 ? (
                      <motion.span
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/15 font-display text-sm font-bold text-gold"
                        animate={{ y: [0, -3, 0], rotate: [-6, 6, -6] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      >
                        1
                      </motion.span>
                    ) : (
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-display text-sm font-bold ${
                          row.pos === 2
                            ? "bg-white/[0.08] text-ink-soft"
                            : row.pos === 3
                            ? "bg-white/5 text-ink-muted"
                            : row.you
                            ? "text-white"
                            : "text-ink-muted"
                        }`}
                      >
                        {row.pos}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate font-display text-sm font-semibold ${
                          row.you ? "text-white" : "text-ink"
                        }`}
                      >
                        {row.name}
                      </p>
                      <p className={`truncate text-[11px] ${row.you ? "text-brand-50" : "text-ink-muted"}`}>
                        {row.weightClass}
                      </p>
                    </div>
                    {row.streak !== undefined ? (
                      <motion.span
                        className={`inline-flex shrink-0 items-center gap-1 text-right text-[11px] font-semibold ${
                          row.you ? "text-white" : "text-accent"
                        }`}
                        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <FlameIcon className={`h-3.5 w-3.5 ${row.you ? "text-white" : "text-gold"}`} />
                        {row.streak}-day streak
                      </motion.span>
                    ) : (
                      <span
                        className={`shrink-0 text-right text-[11px] font-semibold ${
                          row.you ? "text-white" : "text-accent"
                        }`}
                      >
                        {row.points?.toLocaleString()} pts
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              <p className="mt-4 text-center text-xs text-ink-muted">
                Stay consistent to rank up each week.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
