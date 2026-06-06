type ChatMessage = {
  id: number;
  from: "wizard" | "you";
  text: string;
};

const MESSAGES: ChatMessage[] = [
  {
    id: 1,
    from: "wizard",
    text: "Morning. You're 1.2 kg above today's target — normal for a Tuesday. Want me to adjust the plan?",
  },
  { id: 2, from: "you", text: "4 lbs over, fight in 3 days" },
  {
    id: 3,
    from: "wizard",
    text: "Totally doable. Start an 8 L water load today, we taper Thursday. I'll handle the sodium timing.",
  },
  { id: 4, from: "you", text: "what about training?" },
  {
    id: 5,
    from: "wizard",
    text: "Keep Tue/Wed light, technique only. Full rest Thursday so your body banks recovery before the cut.",
  },
];

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5 text-white"
      aria-hidden="true"
    >
      <path
        d="M12 3l1.6 4.8a3 3 0 0 0 1.9 1.9L20 11l-4.5 1.6a3 3 0 0 0-1.9 1.9L12 19l-1.6-4.5a3 3 0 0 0-1.9-1.9L4 11l4.5-1.3a3 3 0 0 0 1.9-1.9L12 3z"
        fill="currentColor"
      />
    </svg>
  );
}

function WizardAvatar({ size = "h-7 w-7" }: { size?: string }) {
  return (
    <div
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] shadow-[0_0_12px_rgba(59,130,246,0.45)] ring-1 ring-white/15`}
    >
      <SparkleIcon />
    </div>
  );
}

export default function WizardChatScreen() {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden font-sans text-white"
      style={{ background: "#0a0e14" }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-7 text-[10px] font-medium text-white/90">
        <span>20:39</span>
        <div className="flex items-center gap-1.5">
          {/* Signal */}
          <svg viewBox="0 0 18 12" className="h-2.5 w-3.5" aria-hidden="true">
            <rect x="0" y="8" width="3" height="4" rx="0.6" fill="currentColor" />
            <rect x="5" y="5" width="3" height="7" rx="0.6" fill="currentColor" />
            <rect x="10" y="2.5" width="3" height="9.5" rx="0.6" fill="currentColor" />
            <rect x="15" y="0" width="3" height="12" rx="0.6" fill="currentColor" opacity="0.4" />
          </svg>
          {/* Wifi */}
          <svg viewBox="0 0 16 12" className="h-2.5 w-3.5" aria-hidden="true">
            <path
              d="M8 11.2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2z"
              fill="currentColor"
            />
            <path
              d="M3.4 6.2a6.6 6.6 0 0 1 9.2 0"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M1.2 3.6a9.9 9.9 0 0 1 13.6 0"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
          </svg>
          {/* Battery */}
          <svg viewBox="0 0 26 12" className="h-2.5 w-5" aria-hidden="true">
            <rect
              x="0.5"
              y="0.5"
              width="22"
              height="11"
              rx="3"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
            <rect x="2" y="2" width="16" height="8" rx="1.6" fill="currentColor" />
            <rect x="24" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Chat header */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 pb-3 pt-2.5">
        <button
          type="button"
          aria-label="Back"
          className="flex h-6 w-6 items-center justify-center rounded-full text-white/60"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
        <WizardAvatar />
        <div className="flex flex-col leading-tight">
          <span className="text-[13px] font-bold tracking-tight text-white">Wizard</span>
          <span className="flex items-center gap-1 text-[8px] font-medium text-[#34d399]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#34d399] shadow-[0_0_5px_#34d399]" />
            Online
          </span>
        </div>
      </div>

      {/* Chat thread */}
      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-3 py-3.5">
        <div className="mb-0.5 flex justify-center">
          <span className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[8px] font-medium text-white/40">
            Today
          </span>
        </div>

        {MESSAGES.map((msg) =>
          msg.from === "wizard" ? (
            <div key={msg.id} className="flex items-end gap-1.5">
              <WizardAvatar size="h-5 w-5" />
              <div className="max-w-[78%] rounded-2xl rounded-bl-md border border-white/[0.06] bg-[#161d2a] px-3 py-2 text-[11px] leading-snug text-white/90">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex justify-end">
              <div className="max-w-[78%] rounded-2xl rounded-br-md bg-[#2563eb] px-3 py-2 text-[11px] leading-snug text-white shadow-[0_2px_10px_rgba(37,99,235,0.35)]">
                {msg.text}
              </div>
            </div>
          )
        )}

        {/* Typing indicator */}
        <div className="flex items-end gap-1.5">
          <WizardAvatar size="h-5 w-5" />
          <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/[0.06] bg-[#161d2a] px-3 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* Bottom input bar */}
      <div className="border-t border-white/[0.06] bg-[#10151e] px-3 pb-5 pt-3">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-white/[0.06] bg-[#161d2a] px-3.5 py-2.5">
            <span className="flex-1 truncate text-[11px] text-white/40">
              Ask the Wizard...
            </span>
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 text-white/30"
              aria-hidden="true"
            >
              <path
                d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3zM19 11a7 7 0 0 1-14 0M12 18v3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <button
            type="button"
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] shadow-[0_2px_10px_rgba(37,99,235,0.5)]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" aria-hidden="true">
              <path
                d="M5 12h13M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
