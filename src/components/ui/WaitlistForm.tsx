import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { APP_NAME, WEB3FORMS_ACCESS_KEY } from "@/lib/constants";

interface Props {
  variant?: "light" | "dark";
  className?: string;
  /** Render the `#waitlist` scroll anchor on this instance (use on one only). */
  anchor?: boolean;
}

// Pragmatic email check: something@something.tld with no spaces.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * "Coming Soon" email waitlist capture, wired to Web3Forms.
 * Set VITE_WEB3FORMS_ACCESS_KEY (see .env.example / constants.ts) to enable real
 * delivery. Without a key it still confirms locally so the UI is testable.
 */
export default function WaitlistForm({
  variant = "light",
  className = "",
  anchor = false,
}: Props) {
  const [email, setEmail] = useState("");
  // Honeypot: real users never fill this; bots often do.
  const [botField, setBotField] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const dark = variant === "dark";

  const validate = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return "Enter your email so we can save your spot.";
    if (!EMAIL_RE.test(trimmed))
      return "Hmm, that doesn't look like an email. Try name@example.com.";
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const msg = validate(email);
    if (msg) {
      setError(msg);
      return;
    }
    setError(null);

    // No key configured yet: keep the UI working locally, but don't pretend to send.
    if (!WEB3FORMS_ACCESS_KEY) {
      console.warn(
        "[WaitlistForm] No VITE_WEB3FORMS_ACCESS_KEY set — signup not delivered. Add a key to enable real signups."
      );
      setDone(true);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          email: email.trim(),
          subject: `New ${APP_NAME} waitlist signup`,
          from_name: `${APP_NAME} waitlist`,
          botcheck: botField, // honeypot
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDone(true);
      } else {
        setError("Something went wrong saving your spot. Please try again.");
      }
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBlur = () => {
    // Only surface an error on blur if the user actually typed something.
    if (email.trim()) setError(validate(email));
  };

  return (
    <div className={`w-full max-w-md ${className}`} id={anchor ? "waitlist" : undefined}>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
            className={`flex items-start gap-3 rounded-2xl px-5 py-4 ${
              dark
                ? "bg-white/15 text-white ring-1 ring-white/20"
                : "bg-brand-50 text-brand-800 ring-1 ring-brand-200"
            }`}
          >
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 320, damping: 14 }}
              className="text-2xl leading-none"
              aria-hidden
            >
              🎉
            </motion.span>
            <span>
              <span className="block font-display font-bold leading-tight">
                You're on the list!
              </span>
              <span
                className={`mt-0.5 block text-sm ${
                  dark ? "text-white/80" : "text-brand-700/80"
                }`}
              >
                We'll ping you the moment the Wizard lands. Keep an eye on your inbox.
              </span>
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            {/* Honeypot — visually hidden, off the tab order; bots fill it, humans don't. */}
            <input
              type="text"
              name="botcheck"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              disabled={submitting}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              onBlur={handleBlur}
              placeholder="Enter your email"
              aria-label="Email address"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "waitlist-error" : "waitlist-help"}
              className={`h-14 min-h-[44px] flex-1 rounded-2xl border-2 px-5 font-medium outline-none transition-colors disabled:opacity-60 ${
                error
                  ? dark
                    ? "border-flame/80 bg-white/10 text-white placeholder:text-white/50 focus:border-flame"
                    : "border-flame/70 bg-white text-ink placeholder:text-ink-muted focus:border-flame"
                  : dark
                    ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white/60"
                    : "border-ink/10 bg-white text-ink placeholder:text-ink-muted focus:border-brand-400"
              }`}
            />
            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="btn-chunky h-14 min-h-[44px] whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-80"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    aria-hidden
                  />
                  Joining…
                </span>
              ) : (
                "Join Waitlist"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Inline error — announced politely, with a recovery hint baked into the copy. */}
      <AnimatePresence>
        {!done && error && (
          <motion.p
            key="err"
            id="waitlist-error"
            role="alert"
            aria-live="polite"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className={`mt-2 flex items-start gap-1.5 text-xs font-medium ${
              dark ? "text-flame" : "text-flame"
            }`}
          >
            <span aria-hidden>⚠️</span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Persistent helper text (hidden once the success state or an error shows). */}
      {!done && !error && (
        <p
          id="waitlist-help"
          className={`mt-2.5 text-center text-xs sm:text-left ${
            dark ? "text-white/60" : "text-ink-muted"
          }`}
        >
          Be first in line when FightCamp Wizard hits the App Store. No spam, ever.
        </p>
      )}
    </div>
  );
}
