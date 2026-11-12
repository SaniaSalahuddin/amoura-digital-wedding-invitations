import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import firstMeet from "@/assets/story-first-meet.jpg";
import lettersChai from "@/assets/story-letters-chai.jpg";
import proposal from "@/assets/story-proposal.jpg";
import ring from "@/assets/story-ring.jpg";
import sunset from "@/assets/sunset-walk.jpg";
import hands from "@/assets/hands-rings.jpg";
import portrait from "@/assets/couple-portrait.jpg";
import walima from "@/assets/walima-reception.jpg";
import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";

type Chapter = {
  year: string;
  title: string;
  text: string;
  img: string;
  alt: string;
  polaroid: string;
  polaroidAlt: string;
  caption: string;
};

const CHAPTERS: Chapter[] = [
  {
    year: "2019",
    title: "The First Glance",
    text: "It began at a friend's wedding in Lahore — a dropped jhumka, a quiet laugh, and Ahmed kneeling to hand it back. Mahnoor still says he held on to it a second too long. He says it was on purpose.",
    img: firstMeet,
    alt: "Ahmed handing Mahnoor her fallen jhumka at a wedding",
    polaroid: portrait,
    polaroidAlt: "Mahnoor and Ahmed years later",
    caption: "…and look at us now",
  },
  {
    year: "2021",
    title: "Letters & Late-Night Chai",
    text: "Miles apart for two long years, they wrote to each other every night — handwritten letters, voice notes, poetry and endless cups of chai over video calls. Distance only taught them how much they belonged together.",
    img: lettersChai,
    alt: "Love letters tied with ribbon beside two cups of chai",
    polaroid: sunset,
    polaroidAlt: "Walking through the blossoms of Hunza Valley",
    caption: "the day he came home",
  },
  {
    year: "2025",
    title: "The Promise",
    text: "On a pink-sky evening by the sea, inside a heart of rose petals and lanterns, Ahmed knelt and asked forever. With tears in her eyes, Mahnoor whispered the only answer her heart ever knew — yes.",
    img: proposal,
    alt: "Ahmed proposing to Mahnoor on the beach at sunset",
    polaroid: ring,
    polaroidAlt: "The engagement ring in a red velvet box",
    caption: "she said yes!",
  },
  {
    year: "2026",
    title: "Forever Begins",
    text: "Now, with the duas of our families and the love of our friends, we begin our greatest chapter. Nothing would make it more beautiful than having you by our side.",
    img: walima,
    alt: "Mahnoor and Ahmed together at their walima reception",
    polaroid: hands,
    polaroidAlt: "Her henna hand resting in his",
    caption: "hand in hand, forever",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function Words({ text, className, delay = 0, stagger = 0.03 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
          }}
        >
          {w}{" "}
        </motion.span>
      ))}
    </motion.span>
  );
}

function ChapterHearts() {
  const [hearts, setHearts] = useState<{ left: number; delay: number; size: number; dur: number }[]>([]);
  useEffect(() => {
    setHearts(
      Array.from({ length: 6 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 6,
        size: 10 + Math.random() * 14,
        dur: 7 + Math.random() * 5,
      })),
    );
  }, []);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 text-primary/40"
          style={{ left: `${h.left}%` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -420, opacity: [0, 1, 0], x: [0, 14, -10, 0] }}
          transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: "easeOut" }}
        >
          <Heart style={{ width: h.size, height: h.size }} className="fill-current" />
        </motion.span>
      ))}
    </div>
  );
}

function ChapterRow({ c, i }: { c: Chapter; i: number }) {
  const flip = i % 2 === 1;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const yearY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const polaroidY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <div ref={ref} className="relative grid items-center gap-12 pl-12 md:grid-cols-2 md:gap-20 md:pl-0">
      <ChapterHearts />

      {/* timeline dot */}
      <motion.span
        className="absolute left-4 top-8 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-background shadow-glow ring-2 ring-gold md:left-1/2 md:top-1/2 md:-translate-y-1/2"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 160, damping: 12 }}
      >
        <Heart className="h-4 w-4 animate-heartbeat fill-primary text-primary" />
      </motion.span>

      {/* images */}
      <div className={`relative ${flip ? "md:order-2" : ""}`}>
        <div className="relative mx-auto max-w-md">
          <motion.div
            aria-hidden
            className="absolute -inset-3 rounded-t-[12rem] rounded-b-[2.5rem] border border-gold/60"
            initial={{ opacity: 0, scale: 0.85, rotate: flip ? 8 : -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: flip ? 2 : -2 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
          />
          <motion.div
            className="group relative overflow-hidden rounded-t-[11rem] rounded-b-[2rem] shadow-card"
            initial={{ clipPath: "inset(100% 0% 0% 0% round 11rem 11rem 2rem 2rem)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 11rem 11rem 2rem 2rem)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            <motion.img
              src={c.img}
              alt={c.alt}
              loading="lazy"
              style={{ y: imgY }}
              initial={{ scale: 1.35 }}
              whileInView={{ scale: 1.15 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: EASE }}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-hero opacity-40 transition-opacity duration-700 group-hover:opacity-10" />
            <motion.span
              className="absolute bottom-5 left-6 font-display text-6xl font-light text-wine-foreground/90"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            >
              {c.year}
            </motion.span>
          </motion.div>

          {/* polaroid */}
          <motion.figure
            style={{ y: polaroidY }}
            className={`absolute -bottom-10 z-10 w-32 sm:w-40 md:w-44 ${flip ? "-left-6 md:-left-14" : "-right-4 md:-right-12"}`}
          >
            <motion.div
              className="rounded-sm bg-card p-2 pb-8 shadow-romance"
              initial={{ opacity: 0, scale: 0.4, rotate: flip ? -40 : 40, x: flip ? -80 : 80 }}
              whileInView={{ opacity: 1, scale: 1, rotate: flip ? -8 : 8, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 70, damping: 12, delay: 0.9 }}
              whileHover={{ rotate: 0, scale: 1.12 }}
            >
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <img src={c.polaroid} alt={c.polaroidAlt} loading="lazy" className="aspect-square w-full object-cover" />
                <figcaption className="mt-2 text-center font-script text-xl leading-none text-primary">{c.caption}</figcaption>
              </motion.div>
            </motion.div>
            <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 rotate-[-4deg] bg-gold/40 backdrop-blur-sm" />
          </motion.figure>
        </div>
      </div>

      {/* text */}
      <div className={`relative ${flip ? "md:order-1 md:text-right" : ""}`}>
        <motion.span
          aria-hidden
          style={{ y: yearY }}
          className={`pointer-events-none absolute -top-16 select-none font-display text-[7rem] font-light leading-none text-gold/15 md:text-[11rem] ${flip ? "right-0" : "left-0"}`}
        >
          {c.year}
        </motion.span>
        <motion.p
          className="relative font-display text-sm uppercase tracking-[0.5em] text-gold"
          initial={{ opacity: 0, letterSpacing: "1.2em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          Chapter {i + 1}
        </motion.p>
        <h3 className="relative mt-3 font-display text-4xl font-light text-foreground md:text-5xl">
          <Words text={c.title} stagger={0.12} delay={0.2} />
        </h3>
        <motion.div
          className={`relative my-5 h-px bg-gold ${flip ? "md:ml-auto" : ""}`}
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        />
        <p className="relative font-display text-xl leading-relaxed text-muted-foreground">
          <Words text={c.text} delay={0.6} stagger={0.025} />
        </p>
      </div>
    </div>
  );
}

const STRIP = [firstMeet, lettersChai, sunset, proposal, ring, hands, portrait, walima];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  const heartTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="story" className="relative overflow-hidden bg-background px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="font-display text-xs uppercase tracking-[0.5em] text-muted-foreground">How it all began</p>
          <h2 className="mt-3 font-script text-6xl text-primary md:text-8xl">
            {"Our Love Story".split("").map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block whitespace-pre"
                initial={{ opacity: 0, y: 40, rotate: -10 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.05, ease: EASE }}
              >
                {ch}
              </motion.span>
            ))}
          </h2>
          <Ornament className="mt-4" />
        </Reveal>

        <div ref={ref} className="relative mt-24">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
          <motion.div style={{ scaleY }} className="absolute left-4 top-0 h-full w-px origin-top bg-gold md:left-1/2" />
          <motion.div
            aria-hidden
            style={{ top: heartTop }}
            className="absolute left-4 z-20 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
          >
            <Heart className="h-6 w-6 animate-heartbeat fill-primary text-primary drop-shadow-[0_0_10px_var(--color-primary)]" />
          </motion.div>

          <div className="space-y-36 md:space-y-48">
            {CHAPTERS.map((c, i) => (
              <ChapterRow key={c.year} c={c} i={i} />
            ))}
          </div>
        </div>
      </div>

      {/* moving film strip */}
      <div className="relative mt-32 -mx-6">
        <Reveal className="mb-8 text-center">
          <p className="font-script text-4xl text-primary md:text-5xl">a few of our favourite moments</p>
        </Reveal>
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex shrink-0 gap-5 pr-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...STRIP, ...STRIP].map((src, i) => (
              <div
                key={i}
                className={`h-56 w-44 shrink-0 overflow-hidden rounded-2xl border-4 border-card shadow-card md:h-72 md:w-56 ${i % 2 ? "rotate-2" : "-rotate-2"}`}
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
