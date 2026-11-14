import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COUPLE } from "./data";
import { Ornament } from "./Ornament";
import { FloatingHearts } from "./Petals";
import { Reveal } from "./Reveal";

const EVENTS = ["Mehndi", "Nikah & Baraat", "Walima"];

// EmailJS keys — replace these three with your own from emailjs.com
const EMAILJS_SERVICE_ID = "service_z56dhm6";
const EMAILJS_TEMPLATE_ID = "template_tggxe8e";
const EMAILJS_PUBLIC_KEY = "Dl4W5zzAo3n6gnFZJ";
const field =
  "w-full border-0 border-b border-border bg-transparent px-1 py-3 font-display text-xl text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none";

export function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(2);
  const [events, setEvents] = useState<string[]>(EVENTS);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const toggle = (e: string) => setEvents((cur) => (cur.includes(e) ? cur.filter((x) => x !== e) : [...cur, e]));

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!name.trim() || sending) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            name: name.trim(),
            attending: attending === "yes" ? "Yes" : "No",
            guests: attending === "yes" ? String(guests) : "0",
            events: attending === "yes" ? events.join(", ") || "None selected" : "—",
            message: message.trim() || "—",
          },
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSent(true);
    } catch (err) {
      console.error("RSVP send failed", err);
      setError("Sorry, your RSVP couldn't be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="rsvp" className="relative overflow-hidden bg-gradient-blush px-6 py-28 md:py-36">
      <FloatingHearts count={16} />
      <div className="relative mx-auto max-w-2xl">
        <Reveal className="text-center">
          <p className="font-display text-xs uppercase tracking-[0.5em] text-muted-foreground">Kindly reply by {COUPLE.rsvpBy}</p>
          <h2 className="mt-3 font-script text-6xl text-primary md:text-8xl">Will you join us?</h2>
          <Ornament className="mt-4" />
        </Reveal>

        <Reveal delay={0.2} className="mt-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-gold/40 bg-card/90 p-8 shadow-card backdrop-blur md:p-12">
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                  className="space-y-8"
                >
                  <div>
                    <label htmlFor="rsvp-name" className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">Your name</label>
                    <input id="rsvp-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sara Ahmed" className={field} />
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">Attendance</span>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {([
                        ["yes", "Joyfully accepts"],
                        ["no", "Regretfully declines"],
                      ] as const).map(([v, label]) => (
                        <button
                          type="button"
                          key={v}
                          onClick={() => setAttending(v)}
                          className={cn(
                            "relative rounded-full border px-4 py-3 font-display text-lg transition-colors duration-500",
                            attending === v ? "border-primary text-primary-foreground" : "border-border text-foreground hover:border-primary",
                          )}
                        >
                          {attending === v && (
                            <motion.span layoutId="attend-pill" className="absolute inset-0 -z-0 rounded-full bg-gradient-romance" />
                          )}
                          <span className="relative">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {attending === "yes" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-8 overflow-hidden"
                      >
                        <div>
                          <span className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">Number of guests</span>
                          <div className="mt-3 flex gap-3">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <motion.button
                                type="button"
                                key={n}
                                whileTap={{ scale: 0.85 }}
                                onClick={() => setGuests(n)}
                                className={cn(
                                  "grid h-12 w-12 place-items-center rounded-full border font-display text-xl transition-all duration-300",
                                  guests === n ? "border-gold bg-gold text-wine shadow-glow" : "border-border hover:border-gold",
                                )}
                              >
                                {n}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">Celebrations you'll attend</span>
                          <div className="mt-3 flex flex-wrap gap-3">
                            {EVENTS.map((e) => (
                              <button
                                type="button"
                                key={e}
                                onClick={() => toggle(e)}
                                className={cn(
                                  "flex items-center gap-2 rounded-full border px-5 py-2 font-display text-lg transition-all duration-300",
                                  events.includes(e) ? "border-primary bg-secondary text-primary" : "border-border text-muted-foreground",
                                )}
                              >
                                <Heart className={cn("h-4 w-4 transition-all", events.includes(e) && "fill-primary")} />
                                {e}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label htmlFor="rsvp-msg" className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">A note for the couple</label>
                    <textarea id="rsvp-msg" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Share your blessings…" className={cn(field, "resize-none")} />
                  </div>

                  <div className="text-center">
                    <Button type="submit" variant="romance" size="xl" disabled={sending}>
                      {sending ? "Sending…" : <>Send with love <Heart className="fill-primary-foreground" /></>}
                    </Button>
                    {error && <p role="alert" className="mt-4 font-display text-lg text-destructive">{error}</p>}
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative py-10 text-center"
                >
                  <div className="relative mx-auto h-24 w-24">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const a = (i / 12) * Math.PI * 2;
                      return (
                        <motion.span
                          key={i}
                          className="absolute left-1/2 top-1/2"
                          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
                          animate={{ x: Math.cos(a) * 120, y: Math.sin(a) * 120, opacity: 0, scale: 1.2 }}
                          transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
                        >
                          <Heart className="h-5 w-5 -translate-x-1/2 -translate-y-1/2 fill-petal text-petal" />
                        </motion.span>
                      );
                    })}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 180, damping: 8 }}
                      className="grid h-24 w-24 place-items-center rounded-full bg-gradient-romance shadow-romance"
                    >
                      <Heart className="h-10 w-10 animate-heartbeat fill-primary-foreground text-primary-foreground" />
                    </motion.div>
                  </div>
                  <h3 className="mt-8 font-script text-5xl text-primary">Thank you, {name.split(" ")[0]}!</h3>
                  <p className="mt-4 font-display text-xl text-muted-foreground">
                    {attending === "yes"
                      ? `We can't wait to celebrate with you${guests > 1 ? ` and your ${guests - 1} guest${guests > 2 ? "s" : ""}` : ""}.`
                      : "You'll be missed — thank you for your love and prayers."}
                  </p>
                  <p className="mt-6 text-xs uppercase tracking-[0.4em] text-gold">{COUPLE.hashtag}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
