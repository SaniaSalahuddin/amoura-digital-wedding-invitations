import portrait from "@/assets/couple-portrait.jpg";
import { motion } from "motion/react";
import { COUPLE } from "./data";
import { Garland } from "./Garland";
// import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";

export function Invitation() {
  return (
    <section id="invite" className="relative overflow-hidden paper-texture px-6 pt-52 pb-28 md:pt-60 md:pb-36">
      <Garland />
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <Reveal x={-60} y={0} className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-5 rounded-t-full border border-gold/60" />
          <motion.div
            aria-hidden
            className="absolute -right-10 -top-10 h-28 w-28 animate-spin-slow rounded-full border border-dashed border-gold/60"
          />
          <div className="overflow-hidden rounded-t-full shadow-card">
            <motion.img
              src={portrait}
              alt={`${COUPLE.bride} and ${COUPLE.groom} at the fountains of Shalimar Gardens, Lahore`}
              loading="lazy"
              width={1024}
              height={1408}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 1.2 }}
            />
          </div>
        </Reveal>

        <div className="text-center md:text-left">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.5em] text-muted-foreground">Bismillah · In the name of love</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="mt-4 font-script text-6xl text-primary md:text-7xl">Two hearts, one journey</h2>
          </Reveal>
          {/* <Reveal delay={0.3}>
            <Ornament className="my-6 md:mx-0" />
          </Reveal> */}
          <Reveal delay={0.45}>
            <p className="font-display text-xl leading-relaxed text-foreground/85 md:text-2xl">
              With hearts full of gratitude, we invite you to share in the joy as we begin our forever.
              Your blessings, laughter and love would make our celebration complete.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <p className="mt-8 font-display text-lg italic text-primary">{COUPLE.longDate}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
