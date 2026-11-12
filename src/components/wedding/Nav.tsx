import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { COUPLE } from "./data";

const LINKS = [
  ["Story", "#story"],
  ["Events", "#events"],
  ["Gallery", "#gallery"],
  ["RSVP", "#rsvp"],
] as const;

export function Nav({ show }: { show: boolean }) {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 80));

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, delay: 3 }}
      className={cn(
        "fixed inset-x-0 top-0 z-30 transition-all duration-700",
        solid ? "bg-background/80 py-3 shadow-sm backdrop-blur-md" : "py-6",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#home" className={cn("font-script text-3xl transition-colors", solid ? "text-primary" : "text-wine-foreground")}>
          {COUPLE.monogram}
        </a>
        <ul className="flex gap-5 md:gap-10">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className={cn(
                  "group relative text-[11px] uppercase tracking-[0.3em] transition-colors",
                  solid ? "text-foreground" : "text-wine-foreground",
                )}
              >
                {label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
