// ============================================================================
// FightCamp Wizard — central site config. Edit these values to update the site.
// ============================================================================

export const APP_NAME = "FightCamp Wizard";
export const APP_TAGLINE = "Your AI cornerman for the perfect weight cut.";
export const CONTACT_EMAIL = "pratikrai@hotmail.co.uk";

// ============================================================================
// 📨 WAITLIST (Web3Forms) — makes the signup form actually work.
//    1. Get a FREE access key at https://web3forms.com (enter your email; they
//       send you a key). The key is PUBLIC (safe in client code, rate-limited).
//    2. Put it in a `.env` file as VITE_WEB3FORMS_ACCESS_KEY=your-key
//       (see .env.example), or paste it directly as the fallback string below.
//    Until a key is set, the form works locally (shows success) but does NOT
//    send anywhere — a console warning reminds you.
// ============================================================================
export const WEB3FORMS_ACCESS_KEY: string =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

// 🔗 App Store: app is not live yet. When it launches, paste the real URL here
//    and set APP_IS_LIVE = true — every download button updates automatically.
export const APP_IS_LIVE = false;
export const APP_STORE_URL = "#"; // e.g. "https://apps.apple.com/app/id000000000"

// ============================================================================
// 📸 PHONE SCREENS — drop your screenshots into /public/screens/ with these
//    exact filenames and they appear automatically. Leave empty for a labeled
//    placeholder slot. (1170 × 2532 px / 9:19.5 portrait works best.)
// ============================================================================
export const SCREENS = {
  dashboard: { src: "/screens/dashboard.png", label: "Dashboard" },
  cutPlan: { src: "/screens/cut-plan.png", label: "Cut Plan" },
  nutrition: { src: "/screens/nutrition.png", label: "Meal Scan" },
  weighIn: { src: "/screens/weigh-in.png", label: "Weigh-In" },
  wizardChat: { src: "/screens/wizard-chat.png", label: "Wizard Chat" },
  fightWeek: { src: "/screens/fight-week.png", label: "Fight Week" },
} as const;

export type ScreenKey = keyof typeof SCREENS;

// ============================================================================
// 💰 PRICING — placeholder prices, edit freely.
// ============================================================================
export const PRICING = {
  free: {
    name: "Free",
    price: "£0",
    cadence: "forever",
    blurb: "Everything you need to start cutting smart.",
    cta: "Start Free",
    highlight: false,
    features: [
      "Weight tracking & projections",
      "Meal & macro logging",
      "Weigh-in reminders",
      "Progress charts",
      "Community & leaderboards",
    ],
  },
  pro: {
    name: "Pro",
    blurb: "Unleash the full power of your Wizard.",
    cta: "Start 7-day free trial",
    highlight: true,
    // Everyone gets a 7-day free trial on either billing period.
    trial: "7-day free trial",
    // Monthly billing
    monthlyPrice: "£9.99",
    monthlyCadence: "/ month",
    // Annual billing — charged once a year, shown as a monthly equivalent.
    yearlyTotal: "£69.99",
    yearlyPerMonth: "£5.83",
    yearlyCadence: "/ month, billed £69.99 annually",
    savingsLabel: "Save 42%",
    features: [
      "Unlimited AI coaching",
      "Personalised cut plans",
      "AI meal photo scanning",
      "Fight-week mode & rehydration protocol",
      "Macro & recovery insights",
      "Community, leaderboards & gym groups",
      "Priority support",
    ],
  },
} as const;

// ============================================================================
// Brand assets (in /public/assets)
// ============================================================================
export const WIZARD = {
  hero: "/assets/wizard_3D.png",
  thoughtful: "/assets/thoughtful_wizard.png",
  food: "/assets/wizard_food.png",
  // App-icon style logo (blue background). Drop your image at the path below.
  logo: "/assets/wizard-logo.png",
  // Falls back to the original webp if the new logo isn't present yet.
  logoFallback: "/assets/wizard-logo.webp",
  simple: "/assets/wizard.png",
  tutorial: "/assets/wizard-tutorial.png",
  orb: "/assets/orb.png",
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how" },
  { label: "Pricing", href: "/#pricing" },
  { label: "For Coaches", href: "/#coaches" },
  { label: "About", href: "/about" },
] as const;
