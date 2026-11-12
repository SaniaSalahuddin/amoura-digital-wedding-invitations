import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import venue from "@/assets/venue.jpg";
import { Reveal } from "./Reveal";

export function Quote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="relative flex h-[80vh] min-h-[480px] items-center justify-center overflow-hidden">
      <motion.img
        src={venue}
        alt="Mohatta Palace in Karachi lit with fairy lights and marigold garlands"
        loading="lazy"
        style={{ y, scale: 1.3 }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-wine/60" />
      <Reveal className="relative z-10 max-w-3xl px-6 text-center text-wine-foreground">
        <p lang="ar" className="mb-6 font-arabic text-4xl leading-[2] text-gold-soft md:text-6xl">وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً</p>
        <p className="font-display text-3xl font-light italic leading-snug md:text-5xl">
          And He placed between you affection and mercy.
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.5em] text-gold-soft">— Surah Ar-Rum · 30:21</p>
      </Reveal>
    </section>
  );
}
