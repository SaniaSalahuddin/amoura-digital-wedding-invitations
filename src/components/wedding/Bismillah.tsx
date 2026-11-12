import { motion } from "motion/react";
import { BISMILLAH } from "./data";

/** Animated Bismillah shown at the very top of the invitation. */
export function Bismillah({ className = "" }: { className?: string }) {
  const words = BISMILLAH.arabic.split(" ");
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <motion.div
        className="mb-3 h-px w-24 bg-gold"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <p lang="ar" dir="rtl" className="font-arabic text-4xl leading-[1.9] text-gold-soft md:text-5xl">
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block px-1.5"
            initial={{ opacity: 0, y: 18, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 + i * 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        ))}
      </p>
      <motion.p
        className="mt-2 font-display text-sm italic text-wine-foreground/70 md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.9 }}
      >
        {BISMILLAH.translation}
      </motion.p>
      <motion.div
        className="mt-3 h-px w-24 bg-gold"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
