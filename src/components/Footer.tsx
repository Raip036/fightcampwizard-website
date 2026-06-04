import { Link } from "react-router-dom";
import { APP_NAME, CONTACT_EMAIL, WIZARD } from "@/lib/constants";
import AppStoreButton from "./ui/AppStoreButton";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="container-px relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={WIZARD.logo}
              alt=""
              onError={(e) => {
                e.currentTarget.src = WIZARD.logoFallback;
              }}
              className="h-11 w-11 rounded-xl object-cover"
            />
            <span className="font-display text-2xl font-extrabold">
              FightCamp <span className="text-brand-400">Wizard</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-pretty text-white/60">
            Your AI cornerman for the perfect weight cut. Make weight. Win fights.
            Recover smarter, with a wizard in your corner.
          </p>
          <div className="mt-6">
            <AppStoreButton />
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/50">
            Product
          </h4>
          <ul className="mt-4 space-y-3 text-white/70">
            <li><a href="/#features" className="hover:text-brand-300">Features</a></li>
            <li><a href="/#how" className="hover:text-brand-300">How it works</a></li>
            <li><a href="/#pricing" className="hover:text-brand-300">Pricing</a></li>
            <li><a href="/#faq" className="hover:text-brand-300">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/50">
            Company
          </h4>
          <ul className="mt-4 space-y-3 text-white/70">
            <li><Link to="/about" className="hover:text-brand-300">About</Link></li>
            <li><Link to="/privacy" className="hover:text-brand-300">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-brand-300">Terms of Service</Link></li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-300">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-px relative flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-white/50 sm:flex-row">
        <p>© {year} {APP_NAME}. All rights reserved.</p>
        <p className="text-center sm:text-right">
          Not medical advice. Always cut weight responsibly under professional guidance.
        </p>
      </div>
    </footer>
  );
}
