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
      { label: "JT", color: "bg-brand-600" },
      { label: "MK", color: "bg-flame" },
      { label: "AS", color: "bg-grape" },
      { label: "RD", color: "bg-mint" },
    ],
  },
  {
    name: "Apex Boxing Club",
    location: "Manchester",
    members: 134,
    initials: [
      { label: "CL", color: "bg-sun" },
      { label: "BN", color: "bg-brand-500" },
      { label: "DV", color: "bg-flame" },
    ],
  },
  {
    name: "Gracie Grapplers",
    location: "Leeds",
    members: 87,
    initials: [
      { label: "FP", color: "bg-mint" },
      { label: "OK", color: "bg-grape" },
      { label: "TW", color: "bg-brand-600" },
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
    color: "bg-brand-600",
    caption: "Made weight 🎉 145.0 on the dot, fight week locked in!",
    photoLabel: "Weigh-in photo",
    photo: "/assets/community-weigh-in.jpg",
    likes: 128,
    comments: 24,
  },
  {
    name: "Mia Kovac",
    handle: "@miakovac",
    color: "bg-flame",
    caption: "Meal prep done for the week 🍱 staying lean and full.",
    photoLabel: "Meal prep photo",
    photo: "/assets/community-meal-prep.jpg",
    likes: 86,
    comments: 11,
  },
];

interface Rank {
  pos: number;
  medal: string;
  name: string;
  weightClass: string;
  meta: string;
  you?: boolean;
}

const LEAGUE: Rank[] = [
  { pos: 1, medal: "🥇", name: "Carla Reyes", weightClass: "Featherweight", meta: "1,240 pts" },
  { pos: 2, medal: "🥈", name: "Sam Okafor", weightClass: "Featherweight", meta: "🔥 18-day streak" },
  { pos: 3, medal: "🥉", name: "Leo Marchetti", weightClass: "Featherweight", meta: "1,090 pts" },
  { pos: 4, medal: "4", name: "You", weightClass: "Featherweight", meta: "🔥 12-day streak", you: true },
  { pos: 5, medal: "5", name: "Priya Nair", weightClass: "Featherweight", meta: "910 pts" },
];

// Playful drifting confetti dots scattered behind the content (desktop/tablet only).
const CONFETTI = [
  { className: "left-[5%] top-40 h-3.5 w-3.5 bg-sun/70", delay: 0, dur: 5 },
  { className: "left-[14%] bottom-24 h-2.5 w-2.5 bg-flame/60", delay: 0.5, dur: 6 },
  { className: "right-[6%] top-52 h-3 w-3 bg-grape/60", delay: 1, dur: 5.5 },
  { className: "right-[22%] bottom-32 h-2.5 w-2.5 bg-mint/70", delay: 0.3, dur: 6.5 },
  { className: "left-[28%] top-24 h-2 w-2 bg-brand-400/70", delay: 1.2, dur: 5 },
];

function Avatar({ label, color, size = "h-9 w-9" }: { label: string; color: string; size?: string }) {
  return (
    <div
      className={`${size} ${color} flex shrink-0 items-center justify-center rounded-full font-display text-xs font-bold text-white ring-2 ring-white`}
    >
      {label}
    </div>
  );
}

export default function Community() {
  return (
    <section id="community" className="relative overflow-hidden bg-sand py-20 sm:py-28">
      {/* Soft brand glow + grid backdrop */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.4]" aria-hidden />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-grape/20 blur-3xl" aria-hidden />

      {/* Floating confetti dots + reaction emojis drifting behind content */}
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
        className="pointer-events-none absolute left-[8%] top-16 hidden text-2xl md:block"
        animate={{ y: [0, -12, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        🙌
      </motion.span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-28 hidden text-xl md:block"
        animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        ❤️
      </motion.span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-[16%] bottom-20 hidden text-xl md:block"
        animate={{ y: [0, -10, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 6, delay: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        ✨
      </motion.span>

      <div className="container-px relative mx-auto max-w-6xl">
        {/* Header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Community</span>
          <h2 className="text-balance mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            You don&apos;t cut <span className="text-gradient">alone.</span>
          </h2>
          <p className="text-pretty mx-auto mt-4 max-w-xl text-base text-ink-muted sm:text-lg">
            Train alongside your gym, share weigh-in wins and progress pics, and climb the ranks.
            Your camp hypes you up, every single cut.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12">
          {/* ── Join your gym ─────────────────────────────────────────── */}
          <Reveal className="lg:col-span-5" delay={0.05}>
            <div className="glass-card flex h-full flex-col rounded-4xl p-5 shadow-card sm:p-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏟️</span>
                <h3 className="font-display text-lg font-bold text-ink">Join your gym</h3>
              </div>
              <p className="mt-1 text-sm text-ink-muted">Find your team and cut together.</p>

              <div className="mt-5 flex flex-col gap-3">
                {GYMS.map((gym) => (
                  <motion.div
                    key={gym.name}
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="flex flex-wrap items-center gap-3 rounded-3xl border border-ink/5 bg-white/80 p-3 shadow-soft sm:flex-nowrap"
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
            <div className="glass-card flex h-full flex-col rounded-4xl p-5 shadow-card sm:p-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">📸</span>
                <h3 className="font-display text-lg font-bold text-ink">Share your wins</h3>
              </div>
              <p className="mt-1 text-sm text-ink-muted">Post progress, hype the squad.</p>

              <div className="mt-5 flex flex-col gap-4">
                {POSTS.map((post) => (
                  <motion.article
                    key={post.handle}
                    whileHover={{ y: -4, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="rounded-3xl border border-ink/5 bg-white/80 p-3.5 shadow-soft"
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
                      <div className="mt-3 grid aspect-[4/3] w-full place-items-center rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50/60 text-center">
                        <span className="px-3 text-xs font-medium text-brand-600">
                          🖼️ {post.photoLabel}
                        </span>
                      </div>
                    )}
                    <div className="mt-3 flex items-center gap-4 text-xs font-medium text-ink-muted">
                      <motion.span
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className="inline-flex cursor-pointer items-center gap-1"
                      >
                        <motion.span
                          aria-hidden
                          animate={{ scale: [1, 1.18, 1] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          ❤️
                        </motion.span>
                        {post.likes}
                      </motion.span>
                      <span className="inline-flex items-center gap-1">💬 {post.comments}</span>
                      <motion.span
                        whileHover={{ scale: 1.1, rotate: -4 }}
                        whileTap={{ scale: 0.92 }}
                        className="ml-auto cursor-pointer font-semibold text-brand-600"
                      >
                        Hype 🙌
                      </motion.span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── Leaderboard ───────────────────────────────────────────── */}
          <Reveal className="lg:col-span-3" delay={0.15}>
            <div className="glass-card relative flex h-full flex-col rounded-4xl p-5 shadow-card sm:p-6">
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
                  className="text-xl"
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  🏆
                </motion.span>
                <h3 className="font-display text-lg font-bold text-ink">Leaderboard</h3>
              </div>
              <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-sun/20 px-2.5 py-1 text-xs font-semibold text-flame">
                ⚡ Featherweight League
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
                        : "bg-white/70"
                    }`}
                  >
                    {row.pos === 1 ? (
                      <motion.span
                        className="grid h-7 w-7 shrink-0 place-items-center text-sm"
                        animate={{ y: [0, -3, 0], rotate: [-6, 6, -6] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {row.medal}
                      </motion.span>
                    ) : (
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center text-sm ${
                          row.pos <= 3 ? "" : row.you ? "font-display font-bold text-white" : "font-display font-bold text-ink-muted"
                        }`}
                      >
                        {row.medal}
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
                    {row.meta.includes("🔥") ? (
                      <motion.span
                        className={`shrink-0 text-right text-[11px] font-semibold ${
                          row.you ? "text-white" : "text-brand-600"
                        }`}
                        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {row.meta}
                      </motion.span>
                    ) : (
                      <span
                        className={`shrink-0 text-right text-[11px] font-semibold ${
                          row.you ? "text-white" : "text-brand-600"
                        }`}
                      >
                        {row.meta}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              <p className="mt-4 text-center text-xs text-ink-muted">
                Stay consistent to rank up each week 🚀
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
