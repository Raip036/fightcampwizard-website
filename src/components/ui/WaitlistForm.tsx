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
  // `variant` is retained as part of the public API. In the all-dark Cornerman
  // design system both variants render identically (everything lives on a dark
  // surface), so the value no longer branches the styling.
  variant: _variant = "light",
  className = "",
  anchor = false,
}: Props) {
  const [email, setEmail] = useState("");
  // Honeypot: real users never fill this; bots often do.
  const [botField, setBotField] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

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
            className="flex items-start gap-3 rounded-2xl bg-white/[0.04] px-5 py-4 text-ink ring-1 ring-white/10"
          >
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 320, damping: 14 }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/20 text-success"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 13 4 4L19 7" />
              </svg>
            </motion.span>
            <span>
              <span className="block font-display font-bold leading-tight text-ink">
                You're on the list!
              </span>
              <span className="mt-0.5 block text-sm text-ink-soft">
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
              className={`h-14 min-h-[44px] flex-1 rounded-2xl border px-5 font-medium text-ink placeholder:text-ink-faint outline-none transition-colors disabled:opacity-60 ${
                error
                  ? "border-danger bg-white/[0.04] focus:border-danger"
                  : "border-white/15 bg-white/[0.04] focus:border-brand-400"
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
            className="mt-2 flex items-start gap-1.5 text-xs font-medium text-danger"
          >
            <svg viewBox="0 0 24 24" className="mt-px h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Persistent helper text (hidden once the success state or an error shows). */}
      {!done && !error && (
        <p
          id="waitlist-help"
          className="mt-2.5 text-center text-xs text-ink-muted sm:text-left"
        >
          Be first in line when FightCamp Wizard hits the App Store. No spam, ever.
        </p>
      )}
    </div>
  );
}
