import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Countdown } from "@/components/wedding/Countdown";
import { Envelope } from "@/components/wedding/Envelope";
import { Events } from "@/components/wedding/Events";
import { Footer } from "@/components/wedding/Footer";
import { Gallery } from "@/components/wedding/Gallery";
import { Hero } from "@/components/wedding/Hero";
import { Invitation } from "@/components/wedding/Invitation";
import { Nav } from "@/components/wedding/Nav";
import { Petals } from "@/components/wedding/Petals";
import { Quote } from "@/components/wedding/Quote";
import { Rsvp } from "@/components/wedding/Rsvp";
import { Story } from "@/components/wedding/Story";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mahnoor & Ahmed — Wedding Invitation · 28 November 2026" },
      { name: "description", content: "Join Mahnoor and Ahmed as they celebrate their Mehndi, Nikah and Walima in Karachi, November 2026. RSVP inside." },
      { property: "og:title", content: "Mahnoor & Ahmed — You're invited" },
      { property: "og:description", content: "A celebration of love in Karachi · 27–29 November 2026. Open the invitation and RSVP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    if (!opened) window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <main>
      <AnimatePresence>{!opened && <Envelope key="envelope" onOpen={() => setOpened(true)} />}</AnimatePresence>
      {opened && <Petals />}
      <Nav show={opened} />
      <Hero show={opened} />
      <Invitation />
      <Countdown />
      <Story />
      <Quote />
      <Events />
      <Gallery />
      <Rsvp />
      <Footer />
    </main>
  );
}
