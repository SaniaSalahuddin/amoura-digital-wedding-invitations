import { motion } from "motion/react";
import { useState } from "react";
import { Bismillah } from "./Bismillah";
import { COUPLE } from "./data";
import { Stars } from "./Petals";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [stage, setStage] = useState<"closed" | "opening">("closed");
  const [flapBehind, setFlapBehind] = useState(false);

  const open = () => {
    if (stage !== "closed") return;
    setStage("opening");
    setTimeout(() => setFlapBehind(true), 450);
    setTimeout(onOpen, 2300);
  };

  const opening = stage === "opening";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-wine px-6"
      exit={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Stars count={60} />

      <motion.div
        className="mb-8"
        animate={{ opacity: opening ? 0 : 1, y: opening ? -30 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <Bismillah />
      </motion.div>

      <motion.p
        className="mb-10 text-center font-display text-sm uppercase tracking-[0.5em] text-gold-soft"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        You are cordially invited
      </motion.p>

      <motion.div
        className="relative aspect-[4/3] w-[min(88vw,420px)]"
        style={{ perspective: 1200 }}
        initial={{ opacity: 0, y: 60, rotate: -4 }}
        animate={{ opacity: 1, y: opening ? 80 : 0, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* back */}
        <div className="absolute inset-0 rounded-md bg-secondary shadow-card" />

        {/* letter */}
        <motion.div
          className="absolute inset-x-[6%] top-[6%] bottom-[6%] z-10 flex flex-col items-center justify-center rounded-sm bg-card px-4 text-center shadow-card"
          animate={opening ? { y: "-62%" } : { y: 0 }}
          transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-display text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Save the date</span>
          <span className="mt-2 font-script text-4xl text-primary">
            {COUPLE.bride} & {COUPLE.groom}
          </span>
          <span className="mt-2 font-display tracking-[0.3em] text-foreground">{COUPLE.dateLabel}</span>
        </motion.div>

        {/* front pocket */}
        <div
          className="absolute inset-0 z-20 rounded-md bg-accent"
          style={{ clipPath: "polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)" }}
        />
        <div
          className="absolute inset-0 z-20 rounded-md bg-blush"
          style={{ clipPath: "polygon(0 100%, 50% 48%, 100% 100%)" }}
        />

        {/* flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[60%] origin-top bg-secondary"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            zIndex: flapBehind ? 5 : 30,
            backfaceVisibility: "visible",
          }}
          animate={{ rotateX: opening ? 180 : 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />

        {/* wax seal */}
        <motion.button
          type="button"
          onClick={open}
          aria-label="Open the invitation"
          className="absolute left-1/2 top-[60%] z-40 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-gradient-romance shadow-romance ring-2 ring-gold/70 ring-offset-2 ring-offset-accent"
          animate={opening ? { scale: 0, opacity: 0, rotate: 90 } : { scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="animate-heartbeat font-script text-3xl text-primary-foreground">{COUPLE.initials}</span>
        </motion.button>
      </motion.div>

      <motion.p
        className="mt-12 font-display text-lg italic text-wine-foreground/80"
        animate={{ opacity: opening ? 0 : [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: opening ? 0 : Infinity }}
      >
        Tap the seal to open
      </motion.p>
    </motion.div>
  );
}
