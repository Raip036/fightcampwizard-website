import { Link } from "react-router-dom";
import { APP_NAME, CONTACT_EMAIL } from "@/lib/constants";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">{title}</h2>
      <div className="mt-3 space-y-4 text-base leading-relaxed text-ink-soft text-pretty">
        {children}
      </div>
    </section>
  );
}

export default function Privacy() {
  return (
    <div className="overflow-x-hidden">
      <div className="container-px pt-28 pb-20 sm:pt-36 sm:pb-28">
        <article className="mx-auto max-w-3xl">
          <header>
            <span className="eyebrow">Legal</span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-ink text-balance sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm font-medium text-ink-muted">
              Last updated: June 2026
            </p>

            <div className="mt-6 rounded-2xl border-2 border-sun/40 bg-sun/10 p-4 text-sm leading-relaxed text-ink-soft sm:p-5">
              <strong className="font-bold text-ink">Please note:</strong> This is
              a template provided as a starting point. Review it with a qualified
              legal professional before launch to make sure it fits your
              jurisdiction and practices.
            </div>
          </header>

          <Section title="1. Introduction">
            <p>
              This Privacy Policy explains how {APP_NAME} ("we", "us", "our")
              collects, uses, and protects information when you use our mobile
              application and related services (the "Service"). By using the
              Service, you agree to the practices described here.
            </p>
          </Section>

          <Section title="2. Information we collect">
            <p>We collect the following categories of information:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-ink">Account information</strong>, such
                as your name, email address, and authentication details when you
                create an account.
              </li>
              <li>
                <strong className="text-ink">Health, weight & nutrition data</strong>{" "}
               , information you choose to enter, including body weight,
                hydration, target weight class, meals, macros, and training
                notes. You provide this voluntarily to receive coaching.
              </li>
              <li>
                <strong className="text-ink">Usage analytics</strong>, how you
                interact with features, screens viewed, and actions taken, so we
                can understand and improve the app.
              </li>
              <li>
                <strong className="text-ink">Device information</strong>, such as
                device model, operating system version, app version, and general
                diagnostic data.
              </li>
            </ul>
          </Section>

          <Section title="3. How we use your information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Provide AI-powered coaching and weight-cut guidance.</li>
              <li>Personalise plans, recommendations, and reminders to you.</li>
              <li>Operate, maintain, troubleshoot, and improve the Service.</li>
              <li>Communicate with you about updates, support, and your account.</li>
            </ul>
          </Section>

          <Section title="4. AI processing">
            <p>
              To generate personalised coaching, relevant information you enter
              may be sent to third-party AI providers that power our guidance
              features. We aim to send only the minimum data necessary for the
              feature to work and do not include data beyond what is needed to
              produce your result. AI-generated guidance is informational and is
              not a substitute for professional medical or coaching advice.
            </p>
          </Section>

          <Section title="5. Data storage & security">
            <p>
              We use industry-standard technical and organisational measures to
              protect your information, including encryption in transit and
              access controls. No method of transmission or storage is completely
              secure, so we cannot guarantee absolute security, but we work hard
              to safeguard your data.
            </p>
          </Section>

          <Section title="6. Third parties">
            <p>
              We rely on trusted third-party services to operate the app. These
              may include:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-ink">App Store & Apple In-App Purchase</strong>{" "}
               , to distribute the app and process subscriptions and payments.
              </li>
              <li>
                <strong className="text-ink">Analytics providers</strong>, to
                help us understand usage and improve the Service.
              </li>
              <li>
                <strong className="text-ink">AI providers</strong>, to generate
                coaching and personalised guidance.
              </li>
            </ul>
            <p>
              These providers process data under their own terms and privacy
              policies. We do not sell your personal information.
            </p>
          </Section>

          <Section title="7. Data retention">
            <p>
              We retain your information for as long as your account is active or
              as needed to provide the Service, comply with legal obligations,
              resolve disputes, and enforce our agreements. When data is no longer
              needed, we take steps to delete or anonymise it.
            </p>
          </Section>

          <Section title="8. Your rights">
            <p>
              Depending on where you live, you may have rights over your personal
              data, including the right to access, correct, export, or delete it,
              and to object to or restrict certain processing. These rights may
              include protections under the GDPR (for residents of the EU/UK) and
              the CCPA (for residents of California). To exercise any of these
              rights, contact us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-brand-600 underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section title="9. Children's privacy">
            <p>
              The Service is not intended for children under 16 without the
              guidance and supervision of a parent, guardian, or qualified coach.
              We do not knowingly collect personal information from children under
              16. If you believe a child has provided us information, please
              contact us so we can take appropriate action.
            </p>
          </Section>

          <Section title="10. Health-data disclaimer">
            <p>
              {APP_NAME} provides informational guidance only. It is not a medical
              device and does not provide medical advice, diagnosis, or treatment.
              Weight cutting carries real health risks. Always consult a qualified
              physician or health professional before starting any weight-cut,
              diet, hydration, or training program.
            </p>
          </Section>

          <Section title="11. Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time. When we make
              material changes, we will update the "Last updated" date above and,
              where appropriate, notify you within the app. Continued use of the
              Service after changes means you accept the updated policy.
            </p>
          </Section>

          <Section title="12. Contact us">
            <p>
              If you have questions about this Privacy Policy or how we handle
              your data, reach out at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-brand-600 underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <footer className="mt-12 border-t border-ink/10 pt-6 text-sm text-ink-muted">
            See also our{" "}
            <Link
              to="/terms"
              className="font-semibold text-brand-600 underline underline-offset-2"
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
