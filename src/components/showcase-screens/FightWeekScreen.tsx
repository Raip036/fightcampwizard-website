const protocol = [
  { day: "Mon", task: "Water load", state: "done" as const },
  { day: "Tue", task: "Water load", state: "done" as const },
  { day: "Wed", task: "Sodium cut", state: "today" as const },
  { day: "Thu", task: "Carb taper", state: "upcoming" as const },
  { day: "Fri", task: "Sweat + cut", state: "upcoming" as const },
  { day: "Sat", task: "Weigh-in 07:00", state: "weighin" as const },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CountdownRing() {
  const size = 88;
  const stroke = 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const progress = 0.66; // 2 of 3 remaining segment fill
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#3b82f6"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold leading-none text-white">2</span>
        <span className="mt-0.5 text-[7px] font-medium tracking-wider text-white/55">DAYS TO</span>
        <span className="text-[7px] font-medium tracking-wider text-white/55">WEIGH-IN</span>
      </div>
    </div>
  );
}

export default function FightWeekScreen() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#0a0e14] pt-7 font-sans text-white">
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pb-1 text-[10px] font-semibold text-white/90">
        <span>07:00</span>
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 18 12" className="h-2.5 w-3.5" fill="currentColor">
            <rect x="0" y="8" width="3" height="4" rx="0.5" />
            <rect x="5" y="5" width="3" height="7" rx="0.5" />
            <rect x="10" y="2" width="3" height="10" rx="0.5" />
            <rect x="15" y="0" width="3" height="12" rx="0.5" opacity="0.4" />
          </svg>
          <svg viewBox="0 0 16 12" className="h-2.5 w-3.5" fill="currentColor">
            <path d="M8 11.5c.5 0 .9-.4.9-.9s-.4-.9-.9-.9-.9.4-.9.9.4.9.9.9z" />
            <path d="M3.2 6.7a7 7 0 019.6 0l-1 1a5.6 5.6 0 00-7.6 0l-1-1z" />
            <path d="M.7 4.2a10.5 10.5 0 0114.6 0l-1 1a9.1 9.1 0 00-12.6 0l-1-1z" />
          </svg>
          <svg viewBox="0 0 26 12" className="h-2.5 w-5" fill="none">
            <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" strokeOpacity="0.5" />
            <rect x="2" y="2" width="17" height="8" rx="1.5" fill="currentColor" />
            <rect x="24" y="4" width="2" height="4" rx="1" fill="currentColor" fillOpacity="0.5" />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4">
        {/* Header */}
        <div className="pt-1">
          <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-[#5b9cff]">FIGHT WEEK</span>
          <div className="mt-0.5 flex items-baseline justify-between">
            <h1 className="text-base font-bold tracking-tight text-white">Peak Protocol</h1>
            <span className="text-[11px] font-semibold text-white/60">Day 3 of 6</span>
          </div>
          {/* Week tracker */}
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${i < 3 ? "bg-[#2563eb]" : "bg-white/10"}`}
              />
            ))}
          </div>
        </div>

        {/* Hero countdown card */}
        <div className="mt-3 flex items-center gap-3 rounded-3xl border border-white/[0.06] bg-[#10151e] p-3.5">
          <CountdownRing />
          <div className="flex-1">
            <div className="rounded-2xl bg-white/[0.03] px-3 py-2">
              <div className="text-[8px] font-medium tracking-wider text-white/45">TARGET</div>
              <div className="text-sm font-bold text-white">70.0 <span className="text-[10px] font-medium text-white/50">kg</span></div>
            </div>
            <div className="mt-1.5 rounded-2xl bg-white/[0.03] px-3 py-2">
              <div className="text-[8px] font-medium tracking-wider text-white/45">NOW</div>
              <div className="text-sm font-bold text-[#5b9cff]">71.8 <span className="text-[10px] font-medium text-white/50">kg</span></div>
            </div>
          </div>
        </div>

        {/* Water load card */}
        <div className="mt-3 rounded-2xl border border-white/[0.06] bg-[#161d2a] p-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-semibold tracking-[0.15em] text-white/45">TODAY · WATER LOAD</span>
            <span className="text-sm font-bold text-white">8 <span className="text-[10px] font-medium text-white/50">L</span></span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#3b82f6]" style={{ width: "60%" }} />
          </div>
          <p className="mt-2 text-[10px] leading-snug text-white/55">Front-load now, cut from Thursday.</p>
        </div>

        {/* Protocol list */}
        <div className="mt-3 space-y-1">
          {protocol.map((p) => {
            const highlighted = p.state === "today";
            return (
              <div
                key={p.day}
                className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 ${highlighted ? "bg-white/[0.04]" : ""}`}
              >
                <span className={`w-7 text-[10px] font-semibold ${p.state === "upcoming" ? "text-white/35" : "text-white/70"}`}>
                  {p.day}
                </span>
                <span className={`flex-1 text-[11px] font-medium ${
                  p.state === "upcoming"
                    ? "text-white/35"
                    : p.state === "weighin"
                    ? "text-[#f59e0b]"
                    : "text-white"
                }`}>
                  {p.task}
                </span>
                {p.state === "done" && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#34d399]/15 text-[#34d399]">
                    <CheckIcon />
                  </span>
                )}
                {p.state === "today" && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3b82f6] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3b82f6]" />
                  </span>
                )}
                {p.state === "weighin" && (
                  <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
                )}
                {p.state === "upcoming" && (
                  <span className="h-2 w-2 rounded-full border border-white/20" />
                )}
              </div>
            );
          })}
        </div>

        {/* Rehydration teaser */}
        <div className="mt-3 mb-2 flex items-center gap-2.5 rounded-2xl border border-[#f59e0b]/20 bg-[#f59e0b]/[0.06] p-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f59e0b]/15 text-[#f59e0b]">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 018 0v4" />
            </svg>
          </span>
          <div className="flex-1">
            <div className="text-[10px] font-semibold text-white">REHYDRATION</div>
            <div className="text-[9px] font-medium text-white/55">Unlocks Sat 07:00 · +2.8 kg plan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
