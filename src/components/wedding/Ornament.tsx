import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Ornament({ className }: { className?: string }) {
  const draw = {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true },
  };
  return (
    <svg viewBox="0 0 260 30" className={cn("mx-auto h-8 w-64 text-gold", className)} aria-hidden>
      <motion.path {...draw} transition={{ duration: 1.6, ease: "easeInOut" }} d="M2 15 C 40 15, 60 5, 104 15" fill="none" stroke="currentColor" strokeWidth="1" />
      <motion.path {...draw} transition={{ duration: 1.6, ease: "easeInOut" }} d="M258 15 C 220 15, 200 5, 156 15" fill="none" stroke="currentColor" strokeWidth="1" />
      <motion.circle {...draw} transition={{ duration: 1, delay: 0.8 }} cx="96" cy="15" r="2" fill="currentColor" />
      <motion.circle {...draw} transition={{ duration: 1, delay: 0.8 }} cx="164" cy="15" r="2" fill="currentColor" />
      <motion.path
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", delay: 1, stiffness: 160, damping: 10 }}
        style={{ transformOrigin: "130px 15px" }}
        d="M130 25 C 116 16, 118 4, 130 10 C 142 4, 144 16, 130 25 Z"
        fill="currentColor"
      />
    </svg>
  );
}
