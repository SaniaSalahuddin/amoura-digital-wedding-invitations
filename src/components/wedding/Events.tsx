import { useState } from "react";
import { CalendarHeart, Clock, MapPin, Navigation } from "lucide-react";
import { EVENT_DETAILS, type EventKey } from "./data";
import mehndi from "@/assets/mehndi-night.jpg";
import portrait from "@/assets/couple-portrait.jpg";
import walima from "@/assets/walima-reception.jpg";
import { Reveal } from "./Reveal";
import { Stars } from "./Petals";

const IMAGES: Record<EventKey, string> = { mehndi, nikah: portrait, walima };
const EVENTS = EVENT_DETAILS.map((e) => ({ ...e, img: IMAGES[e.key] }));

const directionsUrl = (q: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;

export function Events() {
  return (
    <section id="events" className="relative overflow-hidden bg-wine px-6 pt-52 pb-28 text-wine-foreground md:pt-60 md:pb-36">
      <Stars count={50} />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="font-display text-xs uppercase tracking-[0.5em] text-gold-soft">Join us for</p>
          <h2 className="mt-3 font-script text-6xl text-gold-shimmer md:text-8xl">The Celebrations</h2>
        </Reveal>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {EVENTS.map((e) => (
            <article
              key={e.name}
              className="group relative overflow-hidden rounded-t-[12rem] border border-gold/40 bg-wine-foreground/5 p-3 backdrop-blur-sm transition-transform duration-500 hover:-translate-y-3"
            >
              <div className="overflow-hidden rounded-t-[11.5rem]">
                <img
                  src={e.img}
                  alt={`${e.name} celebration`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1.6s] group-hover:scale-110"
                />
              </div>
              <div className="px-4 pb-6 pt-7 text-center">
                <p className="text-[11px] uppercase tracking-[0.4em] text-gold-soft">{e.tagline}</p>
                <h3 className="mt-2 font-script text-5xl text-wine-foreground">{e.name}</h3>
                <div className="mx-auto my-5 h-px w-16 bg-gold transition-all duration-700 group-hover:w-32" />
                <ul className="space-y-3 font-display text-lg text-wine-foreground/85">
                  <li className="flex items-center justify-center gap-2"><CalendarHeart className="h-4 w-4 text-gold" />{e.date}</li>
                  <li className="flex items-center justify-center gap-2"><Clock className="h-4 w-4 text-gold" />{e.time}</li>
                  <li className="flex items-center justify-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold" /><span>{e.venue}<span className="block text-sm text-wine-foreground/60">{e.address}</span></span></li>
                </ul>
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-wine-foreground/60">Dress: {e.dress}</p>
                <a
                  href={directionsUrl(e.mapQuery)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block rounded-full border border-gold px-6 py-2 text-[11px] uppercase tracking-[0.3em] text-gold transition-all duration-500 hover:bg-gold hover:text-wine"
                >
                  Get directions
                </a>
              </div>
            </article>
          ))}
        </div>

        <VenueMap />
      </div>
    </section>
  );
}

function VenueMap() {
  const [active, setActive] = useState<EventKey>("nikah");
  const ev = EVENTS.find((e) => e.key === active) ?? EVENTS[0]!;

  return (
    <div id="venue-map" className="mt-28 scroll-mt-24">
      <Reveal className="text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em] text-gold-soft">Find your way</p>
        <h3 className="mt-3 font-script text-5xl text-wine-foreground md:text-7xl">The Venues</h3>
      </Reveal>

      <Reveal delay={0.15}>
        <div role="tablist" aria-label="Choose an event" className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-3">
          {EVENTS.map((e) => {
            const on = e.key === active;
            return (
              <button
                key={e.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(e.key)}
                className={`rounded-full border border-gold/60 px-5 py-2 text-[11px] uppercase tracking-[0.3em] transition-colors duration-500 ${on ? "bg-gold text-wine" : "text-gold hover:text-gold-soft"}`}
              >
                {e.name}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mx-auto mt-10 grid max-w-5xl overflow-hidden rounded-3xl border border-gold/40 bg-wine-foreground/5 shadow-romance backdrop-blur-sm md:grid-cols-[1fr_1.6fr]">
          <div key={ev.key} className="flex flex-col justify-center gap-4 p-8 text-center md:text-left">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold-soft">{ev.name}</p>
            <h4 className="font-display text-3xl text-wine-foreground">{ev.venue}</h4>
            <p className="flex items-start justify-center gap-2 font-display text-lg text-wine-foreground/80 md:justify-start">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />
              {ev.address}
            </p>
            <p className="flex items-center justify-center gap-2 font-display text-lg text-wine-foreground/80 md:justify-start">
              <CalendarHeart className="h-4 w-4 text-gold" />
              {ev.date}
            </p>
            <p className="flex items-center justify-center gap-2 font-display text-lg text-wine-foreground/80 md:justify-start">
              <Clock className="h-4 w-4 text-gold" />
              {ev.time}
            </p>
            <a
              href={directionsUrl(ev.mapQuery)}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 self-center rounded-full bg-gold px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-wine transition-transform duration-500 hover:scale-105 md:self-start"
            >
              <Navigation className="h-4 w-4" /> Get directions
            </a>
          </div>

          <div className="relative min-h-[320px] md:min-h-[420px]">
            <iframe
              key={ev.key}
              title={`Map of ${ev.venue}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(ev.mapQuery)}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
