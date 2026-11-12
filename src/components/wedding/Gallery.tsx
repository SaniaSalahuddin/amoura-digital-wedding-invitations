import { AnimatePresence, motion } from "motion/react";
import { Heart, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import hero from "@/assets/hero-couple.jpg";
import portrait from "@/assets/couple-portrait.jpg";
import hands from "@/assets/hands-rings.jpg";
import venue from "@/assets/venue.jpg";
import mehndi from "@/assets/mehndi-night.jpg";
import sunset from "@/assets/sunset-walk.jpg";
import walima from "@/assets/walima-reception.jpg";
import faisal from "@/assets/faisal-mosque-couple.jpg";
import { Reveal } from "./Reveal";

const PHOTOS = [
  { src: portrait, alt: "A quiet moment by the fountains", place: "Shalimar Gardens, Lahore" },
  { src: sunset, alt: "Walking among the apricot blossoms", place: "Hunza Valley" },
  { src: hands, alt: "Her henna hand in his", place: "Mehndi rasm" },
  { src: hero, alt: "Shaadi day at sunset", place: "Badshahi Mosque, Lahore" },
  { src: mehndi, alt: "Dholki & marigolds at the mehndi", place: "Androon Lahore haveli" },
  { src: walima, alt: "Mahnoor & Ahmed at the walima", place: "Walima reception" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="gallery" className="relative paper-texture px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="font-display text-xs uppercase tracking-[0.5em] text-muted-foreground">Moments we treasure</p>
          <h2 className="mt-3 font-script text-6xl text-primary md:text-8xl">Captured in Love</h2>
        </Reveal>

        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {PHOTOS.map((p, i) => (
            <motion.button
              type="button"
              key={i}
              onClick={() => setActive(i)}
              layoutId={`photo-${i}`}
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl shadow-card break-inside-avoid"
            >
              <img src={p.src} alt={`${p.alt} — ${p.place}`} loading="lazy" className="w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
              <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-wine/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold-soft backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-0">
                <MapPin className="h-3 w-3" /> {p.place}
              </span>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-wine/0 opacity-0 transition-all duration-700 group-hover:bg-wine/50 group-hover:opacity-100">
                <Heart className="h-8 w-8 animate-heartbeat fill-primary-foreground text-primary-foreground" />
                <span className="font-display text-lg italic text-wine-foreground">{p.alt}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-wine/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.img
              layoutId={`photo-${active}`}
              src={PHOTOS[active]!.src}
              alt={PHOTOS[active]!.alt}
              className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-glow"
            />
            <button
              type="button"
              aria-label="Close photo"
              className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-gold text-gold"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
