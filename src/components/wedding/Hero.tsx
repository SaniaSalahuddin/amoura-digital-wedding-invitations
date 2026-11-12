import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroImg from "@/assets/hero-couple.jpg";
import { BISMILLAH, COUPLE } from "./data";

function AnimatedName({ text, delay, show }: { text: string; delay: number; show: boolean }) {
  return (
    <span className="inline-block" aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: 60, rotate: -8, filter: "blur(10px)" }}
          animate={show ? { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero({ show }: { show: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: show ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.2, delay },
  });

  return (
    <section ref={ref} id="home" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroImg}
          alt={`${COUPLE.bride} and ${COUPLE.groom} in bridal dress at Badshahi Mosque, Lahore, at sunset`}
          width={1920}
          height={1088}
          className={`h-full w-full object-cover object-[18%_center] ${show ? "animate-ken-burns" : "scale-[1.18]"}`}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-hero" />

      <motion.div
        style={{ opacity: fade, y: lift }}
        className="relative z-10 flex h-full flex-col items-center justify-end pb-28 text-center text-wine-foreground md:justify-center md:pb-0"
      >
        <motion.p
          {...fadeIn(0.1)}
          lang="ar"
          className="mb-4 font-arabic text-3xl leading-[2] text-gold-soft drop-shadow-lg md:text-5xl"
        >
          {BISMILLAH.arabic}
        </motion.p>
        <motion.p {...fadeIn(0.2)} className="font-display text-xs uppercase tracking-[0.5em] md:text-sm">
          Together with their families
        </motion.p>

        <h1 className="mt-4 font-script text-7xl leading-[1.1] drop-shadow-lg sm:text-8xl md:text-[9rem]">
          <AnimatedName text={COUPLE.bride} delay={0.4} show={show} />
          <motion.span
            className="mx-4 inline-block text-gold-shimmer"
            initial={{ opacity: 0, scale: 0, rotate: -40 }}
            animate={show ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", delay: 1.1, stiffness: 120, damping: 10 }}
          >
            &
          </motion.span>
          <AnimatedName text={COUPLE.groom} delay={1.3} show={show} />
        </h1>

        <motion.p {...fadeIn(2)} className="mt-6 font-display text-xl italic md:text-2xl">
          request the honour of your presence
        </motion.p>

        <motion.div {...fadeIn(2.4)} className="mt-8 flex items-center gap-5">
          <span className="h-px w-12 bg-gold md:w-20" />
          <span className="font-display text-2xl tracking-[0.35em] text-gold-soft md:text-3xl">{COUPLE.dateLabel}</span>
          <span className="h-px w-12 bg-gold md:w-20" />
        </motion.div>
        <motion.p {...fadeIn(2.7)} className="mt-3 text-xs uppercase tracking-[0.4em] text-wine-foreground/80">
          {COUPLE.city}
        </motion.p>
      </motion.div>

      <motion.a
        href="#invite"
        {...fadeIn(3.2)}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-wine-foreground/80"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-wine-foreground/60 pt-2">
          <span className="h-2 w-1 rounded-full bg-gold animate-scroll-dot" />
        </span>
        Scroll
      </motion.a>
    </section>
  );
}
