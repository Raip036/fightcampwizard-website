import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { APP_NAME, NAV_LINKS, WIZARD } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav item for the section currently in view (home only).
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }
    const ids = NAV_LINKS.map((l) => l.href.split("#")[1]).filter(
      Boolean,
    ) as string[];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    const isRoute = href.startsWith("/") && !href.includes("#");
    if (isRoute) return pathname === href;
    if (pathname !== "/") return false;
    return href.endsWith(activeSection) && activeSection !== "";
  };

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-night/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between gap-3 sm:h-20">
        <Link to="/" className="flex min-w-0 shrink items-center gap-2.5">
          <img
            src={WIZARD.logo}
            alt=""
            onError={(e) => {
              e.currentTarget.src = WIZARD.logoFallback;
            }}
            className="h-9 w-9 shrink-0 rounded-xl object-cover sm:h-10 sm:w-10"
          />
          <span className="truncate font-display text-lg font-extrabold uppercase tracking-tight text-ink sm:text-xl">
            FightCamp <span className="text-accent">Wizard</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((l) => (
            <NavItem
              key={l.href}
              href={l.href}
              label={l.label}
              active={isActive(l.href)}
            />
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <a href="/#waitlist" className="btn-chunky !px-5 !py-2.5 !text-sm">
            Get the App
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-surface/70 xl:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/[0.06] bg-night/95 backdrop-blur-xl xl:hidden"
          >
            <div className="container-px flex flex-col gap-1 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`rounded-xl px-4 py-3 font-display font-bold transition-colors ${
                    isActive(l.href)
                      ? "bg-white/[0.06] text-accent"
                      : "text-ink hover:bg-white/[0.04] hover:text-accent"
                  }`}
                >
                  {l.label}
                </a>
              ))}
              <a href="/#waitlist" className="btn-chunky mt-2 w-full">
                Get the App
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  const isRoute = href.startsWith("/") && !href.includes("#");
  const cls = `inline-flex h-11 items-center whitespace-nowrap rounded-xl px-3 font-display text-sm font-bold transition-colors cursor-pointer ${
    active
      ? "bg-white/[0.06] text-accent"
      : "text-ink-soft hover:bg-white/[0.04] hover:text-accent"
  }`;
  return isRoute ? (
    <Link to={href} className={cls} aria-current={active ? "page" : undefined}>
      {label}
    </Link>
  ) : (
    <a href={href} className={cls} aria-current={active ? "page" : undefined}>
      {label}
    </a>
  );
}
