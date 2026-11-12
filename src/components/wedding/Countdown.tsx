import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { COUPLE } from "./data";
import { FloatingHearts } from "./Petals";
import { Reveal } from "./Reveal";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    Days: Math.floor(ms / 86400000),
    Hours: Math.floor((ms / 3600000) % 24),
    Minutes: Math.floor((ms / 60000) % 60),
    Seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const target = new Date(COUPLE.weddingAt).getTime();
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setTime(diff(target));
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = ["Days", "Hours", "Minutes", "Seconds"] as const;

  return (
    <section className="relative overflow-hidden bg-wine px-6 py-24 text-wine-foreground">
      <FloatingHearts count={18} />
      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.5em] text-gold-soft">Counting every heartbeat</p>
          <h2 className="mt-3 font-script text-6xl text-gold-shimmer md:text-7xl">Until forever begins</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {units.map((u, i) => {
            const value = time ? String(time[u]).padStart(2, "0") : "--";
            return (
              <Reveal key={u} delay={i * 0.12} scale={0.8}>
                <div className="relative rounded-t-full border border-gold/50 bg-wine-foreground/5 px-4 pb-6 pt-12 backdrop-blur-sm transition-transform duration-500 hover:-translate-y-2">
                  <div className="relative h-16 overflow-hidden md:h-20">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={value}
                        className="absolute inset-0 font-display text-5xl font-light md:text-6xl"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {value}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="mt-2 block text-[11px] uppercase tracking-[0.4em] text-gold-soft">{u}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
