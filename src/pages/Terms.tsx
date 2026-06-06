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

export default function Terms() {
  return (
    <div className="overflow-x-hidden bg-night">
      <div className="container-px pt-28 pb-20 sm:pt-36 sm:pb-28">
        <article className="mx-auto max-w-3xl">
          <header>
            <span className="eyebrow">Legal</span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-ink text-balance sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-3 text-sm font-medium text-ink-muted">
              Last updated: June 2026
            </p>

            <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/[0.08] p-4 text-sm leading-relaxed text-ink-soft sm:p-5">
              <strong className="font-bold text-ink">Please note:</strong> This is
              a template provided as a starting point. Review it with a qualified
              legal professional before launch to make sure it fits your
              jurisdiction and practices.
            </div>
          </header>

          <Section title="1. Acceptance of terms">
            <p>
              These Terms of Service ("Terms") govern your access to and use of{" "}
              {APP_NAME} and its related services (the "Service"). By downloading,
              accessing, or using the Service, you agree to be bound by these
              Terms. If you do not agree, please do not use the Service.
            </p>
          </Section>

          <Section title="2. Description of the service">
            <p>
              {APP_NAME} is an AI-powered companion app for combat-sports athletes
              that provides informational guidance, tracking, and planning tools
              to help manage weight cuts, hydration, nutrition, and fight-week
              preparation. The Service is provided for informational and
              educational purposes only.
            </p>
          </Section>

          <Section title="3. Eligibility & age">
            <p>
              You must be at least 16 years old to use the Service. Users under 18
              should use the Service only with the guidance and supervision of a
              parent, guardian, or qualified coach. By using the Service, you
              represent that you meet these requirements.
            </p>
          </Section>

          <Section title="4. Account responsibilities">
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activity that occurs under your
              account. Provide accurate information, keep it up to date, and
              notify us promptly of any unauthorised use of your account.
            </p>
          </Section>

          <Section title="5. Subscriptions & billing">
            <p>
              The Service offers a free tier and a paid "Pro" subscription.
              Subscriptions are processed through the Apple App Store using Apple
              In-App Purchase.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Payment is charged to your Apple ID account at confirmation of
                purchase.
              </li>
              <li>
                Subscriptions automatically renew unless auto-renewal is turned
                off at least 24 hours before the end of the current period.
              </li>
              <li>
                You can manage or cancel your subscription at any time through
                your Apple ID account settings in the App Store. Cancellation
                takes effect at the end of the current billing period.
              </li>
              <li>
                The free tier provides core features; the Pro tier unlocks
                additional features as described in the app. Pricing and feature
                availability may change over time.
              </li>
            </ul>
          </Section>

          <Section title="6. Acceptable use">
            <p>You agree not to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Use the Service for any unlawful or harmful purpose.</li>
              <li>
                Attempt to reverse-engineer, copy, or disrupt the Service or its
                infrastructure.
              </li>
              <li>
                Misuse, resell, or provide false information through the Service.
              </li>
              <li>
                Infringe the rights of others or violate any applicable laws or
                regulations.
              </li>
            </ul>
          </Section>

          <Section title="7. Health & safety disclaimer">
            <p>
              <strong className="text-ink">
                This is important, please read carefully.
              </strong>{" "}
              Weight cutting carries serious health risks, including dehydration,
              and can be dangerous if done improperly. {APP_NAME} is an
              informational tool only. It is not a medical device, and it does not
              provide medical advice, diagnosis, or treatment.
            </p>
            <p>
              Always consult a qualified physician, registered dietitian, or other
              health professional before beginning any weight-cut, diet,
              hydration, or training program, and stop immediately and seek help
              if you feel unwell. You are solely responsible for decisions you
              make about your health, and you assume all risk associated with your
              use of the Service.
            </p>
          </Section>

          <Section title="8. Intellectual property">
            <p>
              The Service, including its software, design, branding, content, and
              the {APP_NAME} name and mascot, is owned by us or our licensors and
              is protected by intellectual-property laws. We grant you a limited,
              non-exclusive, non-transferable licence to use the Service for your
              personal, non-commercial use, subject to these Terms.
            </p>
          </Section>

          <Section title="9. Disclaimers & limitation of liability">
            <p>
              The Service is provided "as is" and "as available" without
              warranties of any kind, whether express or implied, including
              fitness for a particular purpose and non-infringement. We do not
              warrant that the Service will be uninterrupted, error-free, or
              produce any particular result.
            </p>
            <p>
              To the maximum extent permitted by law, we are not liable for any
              indirect, incidental, special, consequential, or punitive damages,
              or any loss arising from your use of, or inability to use, the
              Service, including any health outcomes.
            </p>
          </Section>

          <Section title="10. Termination">
            <p>
              We may suspend or terminate your access to the Service at any time
              if you violate these Terms or for any other reasonable cause. You
              may stop using the Service at any time. Provisions that by their
              nature should survive termination will continue to apply.
            </p>
          </Section>

          <Section title="11. Governing law">
            <p>
              These Terms are governed by the laws of [insert governing
              jurisdiction], without regard to conflict-of-law principles. Any
              disputes will be subject to the exclusive jurisdiction of the courts
              located in [insert jurisdiction]. Finalise this section with your
              legal advisor.
            </p>
          </Section>

          <Section title="12. Changes to these terms">
            <p>
              We may update these Terms from time to time. When we make material
              changes, we will update the "Last updated" date above and, where
              appropriate, notify you within the app. Continued use of the Service
              after changes means you accept the updated Terms.
            </p>
          </Section>

          <Section title="13. Contact us">
            <p>
              If you have questions about these Terms, reach out at{" "}
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
              to="/privacy"
              className="font-semibold text-accent underline underline-offset-2 hover:text-brand-300"
            >
              Privacy Policy
            </Link>
            .
          </footer>
        </article>
      </div>
    </div>
  );
}
