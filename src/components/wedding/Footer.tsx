import { motion } from "motion/react";
import { COUPLE } from "./data";
import { Stars } from "./Petals";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-wine px-6 py-24 text-center text-wine-foreground">
      <Stars count={40} />
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative font-script text-7xl text-gold-shimmer md:text-9xl"
      >
        {COUPLE.bride} & {COUPLE.groom}
      </motion.p>
      <p className="relative mt-4 font-display text-xl italic text-wine-foreground/80">and so the adventure begins…</p>
      <p className="relative mt-8 text-xs uppercase tracking-[0.5em] text-gold-soft">
        {COUPLE.dateLabel} · {COUPLE.hashtag}
      </p>
    </footer>
  );
}
