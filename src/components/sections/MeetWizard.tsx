import { motion } from "framer-motion";
import { WIZARD } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";

/** Chat thread shown to the right of the mascot, feels like a real convo. */
const THREAD = [
  {
    from: "user" as const,
    text: "Yo wizard 😅 I'm 4 lbs over and I fight in 3 days. Am I cooked?",
  },
  {
    from: "wizard" as const,
    text: "Not even close. You've got time. We'll trim water gradually, keep your strength up, and hit weigh-in sharp. Here's the plan 👇",
  },
  {
    from: "wizard" as const,
    text: "Today: 3L water + clean carbs. Tomorrow we taper sodium. Cut morning drops it the rest. You'll make 155 with energy to spare.",
  },
];

function ChatBubble({
  from,
  text,
  delay,
}: {
  from: "user" | "wizard";
  text: string;
  delay: number;
}) {
  const isWizard = from === "wizard";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isWizard ? "justify-start" : "justify-end"}`}
    >
      <div
        className={[
          "min-w-0 max-w-[85%] break-words rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-soft sm:max-w-[78%] sm:text-[0.95rem]",
          isWizard
            ? "rounded-bl-md bg-white text-ink ring-1 ring-brand-100"
            : "rounded-br-md bg-brand-600 text-white",
        ].join(" ")}
      >
        {isWizard && (
          <span className="mb-1 flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-brand-600">
            <img
              src={WIZARD.logo}
              alt=""
              className="h-4 w-4 rounded-full object-cover"
            />
            Wizard
          </span>
        )}
        <span className="text-pretty">{text}</span>
      </div>
    </motion.div>
  );
}

export default function MeetWizard() {
  return (
    <section className="relative overflow-hidden bg-hero-grad py-20 sm:py-28">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Mascot side */}
          <Reveal className="order-2 min-w-0 lg:order-1">
            <div className="relative mx-auto flex max-w-md items-center justify-center">
              {/* Soft glowing radial blob */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 mx-auto h-72 w-72 rounded-full bg-brand-400/40 blur-3xl sm:h-96 sm:w-96"
              />
              <img
                src={WIZARD.thoughtful}
                alt="The FightCamp Wizard, thinking through your cut"
                className="w-64 animate-float-slow drop-shadow-2xl sm:w-80 lg:w-full"
              />
              {/* Floating sparkle accents */}
              <span className="absolute -right-2 top-6 animate-bounce-soft text-2xl sm:text-3xl">
                ✨
              </span>
              <span className="absolute bottom-10 -left-1 animate-float text-xl sm:text-2xl">
                💧
              </span>
            </div>
          </Reveal>

          {/* Copy + chat side */}
          <div className="order-1 min-w-0 lg:order-2">
            <Reveal>
              <span className="eyebrow">Meet your Wizard 🧙</span>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-ink text-balance sm:text-4xl lg:text-5xl">
                Your AI cornerman,{" "}
                <span className="text-gradient">in your pocket</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
                The Wizard learns your body, your weight class and your fight
                date, then guides every single step of the cut. It's like
                having a world-class coach and nutritionist in your corner,
                24/7, who never panics and always has a plan.
              </p>
            </Reveal>

            {/* Chat bubbles */}
            <div className="mt-8 space-y-3 rounded-4xl border border-brand-100 bg-white/60 p-4 backdrop-blur-sm sm:p-5">
              {THREAD.map((m, i) => (
                <ChatBubble
                  key={i}
                  from={m.from}
                  text={m.text}
                  delay={0.15 + i * 0.18}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
