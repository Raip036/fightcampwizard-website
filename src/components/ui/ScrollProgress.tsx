import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin fixed scroll-progress bar pinned to the very top of the page.
 * Sits above the navbar (z-[60]) and uses a transform-only scaleX so it
 * stays smooth and, under prefers-reduced-motion, effectively static.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand-grad pointer-events-none"
    />
  );
}
