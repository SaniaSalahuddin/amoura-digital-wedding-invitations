import { useEffect, useState, type CSSProperties } from "react";

type Petal = { left: number; size: number; dur: number; delay: number; drift: number; spin: number; tone: number };
const TONES = ["text-petal", "text-blush", "text-gold-soft", "text-primary"];

export function Petals({ count = 26 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  // Random layout is generated after hydration so server and client markup match.
  useEffect(() => {
    setPetals(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 16,
        dur: 10 + Math.random() * 12,
        delay: -Math.random() * 20,
        drift: (Math.random() - 0.5) * 300,
        spin: 200 + Math.random() * 600,
        tone: Math.floor(Math.random() * TONES.length),
      })),
    );
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className={`absolute -top-10 animate-petal ${TONES[p.tone]}`}
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
              "--drift": `${p.drift}px`,
              "--spin": `${p.spin}deg`,
              opacity: 0.85,
            } as CSSProperties
          }
        >
          <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-sm">
            <path d="M12 1 C 21 6, 20 18, 12 23 C 4 18, 3 6, 12 1 Z" fill="currentColor" />
            <path d="M12 3 C 13 9, 13 15, 12 21" stroke="currentColor" strokeOpacity="0.3" fill="none" className="text-wine" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export function FloatingHearts({ count = 14 }: { count?: number }) {
  const [hearts, setHearts] = useState<{ left: number; size: number; dur: number; delay: number }[]>([]);
  useEffect(() => {
    setHearts(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 18,
        dur: 9 + Math.random() * 10,
        delay: -Math.random() * 15,
      })),
    );
  }, [count]);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute -bottom-10 animate-float-up text-gold/60"
          style={{ left: `${h.left}%`, width: h.size, height: h.size, "--dur": `${h.dur}s`, "--delay": `${h.delay}s` } as CSSProperties}
        >
          <path d="M12 21 C 3 14, 2 7, 7 5 C 10 4, 12 6, 12 8 C 12 6, 14 4, 17 5 C 22 7, 21 14, 12 21 Z" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}

export function Stars({ count = 40 }: { count?: number }) {
  const [stars, setStars] = useState<{ left: number; top: number; dur: number; delay: number; size: number }[]>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        dur: 2 + Math.random() * 4,
        delay: -Math.random() * 4,
        size: 2 + Math.random() * 3,
      })),
    );
  }, [count]);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-gold-soft"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, "--dur": `${s.dur}s`, "--delay": `${s.delay}s` } as CSSProperties}
        />
      ))}
    </div>
  );
}
