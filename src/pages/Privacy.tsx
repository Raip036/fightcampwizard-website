import { Link } from "react-router-dom";
import { APP_NAME, CONTACT_EMAIL } from "@/lib/constants";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">{title}</h2>
      <div className="mt-3 space-y-4 text-base leading-relaxed text-ink-muted text-pretty">
        {children}
      </div>
    </section>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-semibold text-ink">{children}</h3>;
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function Privacy() {
  return (
    <div className="overflow-x-hidden bg-night">
      <div className="container-px pt-28 pb-20 sm:pt-36 sm:pb-28">
        <article className="mx-auto max-w-3xl">
          <header>
            <span className="eyebrow">Legal</span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-ink text-balance sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm font-medium text-ink-muted">
              Last updated: April 13, 2026
            </p>
          </header>

          <div className="mt-8 text-base leading-relaxed text-ink-muted text-pretty">
            <p>
              {APP_NAME} ("we", "our", "the app") is operated by Pratik Rai. This
              policy explains what data we collect, how we use it, and your rights
              regarding your information.
            </p>
          </div>

          <Section title="1. Data we collect">
            <SubTitle>Account information</SubTitle>
            <Bullets
              items={[
                "Email address (for authentication)",
                "Display name (optional, set by you)",
                "Profile photo (optional, uploaded by you)",
                "Authentication tokens (managed by Convex Auth)",
              ]}
            />

            <SubTitle>Health &amp; fitness data</SubTitle>
            <Bullets
              items={[
                "Body weight logs (date and weight entries)",
                "Nutrition logs (meal descriptions, calories, macronutrients)",
                "Hydration intake records",
                "Sleep logs (date and hours slept)",
                "Training session logs (type, duration, intensity, RPE, notes)",
                "Fight camp records (dates, weight targets, progress)",
                "Recovery and wellness check-in data",
              ]}
            />

            <SubTitle>Subscription &amp; purchase data</SubTitle>
            <Bullets
              items={[
                "Subscription status and tier (managed by RevenueCat)",
                "Anonymous purchase identifiers (no payment card details are stored by us)",
                "AI gem balance and usage count",
              ]}
            />

            <SubTitle>App usage data</SubTitle>
            <Bullets
              items={[
                "Crash reports and error logs (via Sentry — no personal data included)",
                "Feature usage patterns (anonymised)",
                "Device type and iOS version (for compatibility)",
              ]}
            />
          </Section>

          <Section title="2. How we use your data">
            <Bullets
              items={[
                "To provide personalised weight tracking, nutrition analysis, sleep tracking, and training insights",
                "To generate AI-powered meal plans, diet analysis, and coaching advice",
                "To calculate recovery scores, readiness metrics, and fight week schedules",
                "To manage your subscription and AI gem balance",
                "To maintain your account and sync data across sessions",
                "To improve app stability and fix bugs (crash reports)",
              ]}
            />
          </Section>

          <Section title="3. Third-party services">
            <p>We use the following services to operate the app:</p>

            <SubTitle>Convex</SubTitle>
            <p>
              Database hosting, user authentication, realtime sync, file storage,
              and serverless functions (including the AI inference orchestration
              layer). All data is encrypted in transit (TLS) and at rest. Convex is
              operated by Convex, Inc. on US-based infrastructure.
            </p>

            <SubTitle>Groq (Llama API)</SubTitle>
            <p>
              Powers AI features including meal analysis, diet scoring, fight week
              protocols, daily coaching, training summaries, and the AI chatbot.
              Meal descriptions and anonymised health context are sent to generate
              personalised responses. No personal identifiers are included in AI
              requests.
            </p>

            <SubTitle>RevenueCat</SubTitle>
            <p>
              Subscription management and in-app purchase processing. RevenueCat
              receives anonymous app user identifiers and purchase receipts from
              Apple to verify subscription status. No personal data, health data, or
              account credentials are shared with RevenueCat.
            </p>

            <SubTitle>Sentry</SubTitle>
            <p>
              Error monitoring and crash reporting. Collects technical error data
              only — no personal information, health data, or user content is sent to
              Sentry. PII collection is disabled.
            </p>

            <SubTitle>USDA FoodData Central</SubTitle>
            <p>
              Food nutrition database used for ingredient lookups and food search.
              Only search queries are sent — no user data.
            </p>

            <SubTitle>Open Food Facts</SubTitle>
            <p>
              Barcode-based food lookup database. Only barcode numbers are sent — no
              user data.
            </p>
          </Section>

          <Section title="4. Data storage & security">
            <Bullets
              items={[
                "All data is stored in Convex — every function checks the caller's identity and only allows access to that user's own rows",
                "All connections use HTTPS/TLS encryption",
                "Authentication tokens are securely stored on-device",
                "Profile photos and session media are stored in Convex File Storage and served over time-limited signed URLs",
                "We do not sell, rent, or share your personal data with advertisers or data brokers",
              ]}
            />
          </Section>

          <Section title="5. Your rights">
            <Bullets
              items={[
                "Access: View all your data within the app at any time",
                "Export: Download your data as CSV from Settings > Reset Data > Export",
                "Deletion: Permanently delete your account and all data from Settings > Delete Account",
                "Correction: Edit your profile, weight logs, and nutrition entries at any time",
              ]}
            />
            <p>
              Account deletion is immediate and irreversible. All database records,
              authentication data, and stored files are permanently removed.
            </p>
          </Section>

          <Section title="6. Data retention">
            <p>
              Your data is retained for as long as your account is active. When you
              delete your account, all data is permanently removed from our servers
              within 30 days (including any backups). Anonymised crash reports in
              Sentry are retained for 90 days.
            </p>
          </Section>

          <Section title="7. Children's privacy">
            <p>
              {APP_NAME} is not intended for users under 17 years of age. We do not
              knowingly collect data from children. If you believe a child has
              provided us with data, contact us to have it removed.
            </p>
          </Section>

          <Section title="8. Changes to this policy">
            <p>
              We may update this policy from time to time. Changes will be reflected
              on this page with an updated date. Continued use of the app constitutes
              acceptance of the updated policy.
            </p>
          </Section>

          <Section title="9. Contact">
            <p>
              For privacy-related questions or data requests, email us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-accent underline underline-offset-2 hover:text-brand-300"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <footer className="mt-12 border-t border-white/[0.07] pt-6 text-sm text-ink-muted">
            See also our{" "}
            <Link
              to="/terms"
              className="font-semibold text-accent underline underline-offset-2 hover:text-brand-300"
            >
              Terms of Service
            </Link>
            .
          </footer>
        </article>
      </div>
    </div>
  );
}
