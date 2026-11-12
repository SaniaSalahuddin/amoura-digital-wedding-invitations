import { motion } from "motion/react";
import { useEffect, useState } from "react";

type Strand = { left: number; flowers: number; delay: number; duration: number };

/**
 * Hanging genda-phool (marigold) toran — the classic Pakistani shaadi décor.
 * Strand lengths are randomised in useEffect to avoid SSR hydration mismatches.
 */
export function Garland({ strands = 18, className = "" }: { strands?: number; className?: string }) {
  const [items, setItems] = useState<Strand[]>([]);

  useEffect(() => {
    setItems(
      Array.from({ length: strands }, (_, i) => ({
        left: ((i + 0.5) / strands) * 100,
        flowers: i % 2 === 0 ? 7 + Math.floor(Math.random() * 3) : 4 + Math.floor(Math.random() * 3),
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      })),
    );
  }, [strands]);

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 z-20 h-56 overflow-hidden ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* rope */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-marigold-deep via-marigold to-marigold-deep shadow-romance" />
      {items.map((s, i) => (
        <motion.div
          key={i}
          className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
          style={{ left: `${s.left}%`, transformOrigin: "top center" }}
          variants={{ hidden: { y: -260 }, show: { y: 0 } }}
          transition={{ type: "spring", stiffness: 60, damping: 9, delay: i * 0.04 }}
        >
          <motion.div
            className="flex flex-col items-center"
            style={{ transformOrigin: "top center" }}
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {Array.from({ length: s.flowers }, (_, f) => (
              <span
                key={f}
                className={`-mt-1 block h-4 w-4 rounded-full shadow-sm md:h-5 md:w-5 ${
                  f % 3 === 1 ? "bg-marigold" : "bg-marigold-deep"
                }`}
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--gold-soft) 70%, transparent) 0 18%, transparent 20%), repeating-conic-gradient(from 0deg, transparent 0 12deg, color-mix(in oklab, var(--marigold-deep) 60%, transparent) 12deg 18deg)",
                }}
              />
            ))}
            {/* rose bead + leaf tassel */}
            <span className="-mt-0.5 block h-3 w-3 rounded-full bg-primary" />
            <span className="block h-4 w-2 rounded-b-full bg-leaf" />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
