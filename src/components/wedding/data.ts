export const COUPLE = {
  bride: "Mahnoor",
  groom: "Ahmed",
  monogram: "M & A",
  initials: "MA",
  hashtag: "#MahnoorWedsAhmed",
  dateLabel: "28 · 11 · 2026",
  longDate: "Saturday, the twenty-eighth of November, 2026",
  city: "Karachi, Pakistan",
  rsvpBy: "22 November 2026",
  // Nikah ceremony start, Pakistan Standard Time
  weddingAt: "2026-11-28T19:00:00+05:00",
};

export const BISMILLAH = {
  arabic: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
  translation: "In the name of Allah, the Most Gracious, the Most Merciful",
};

export type EventKey = "mehndi" | "nikah" | "walima";

export const EVENT_DETAILS: {
  key: EventKey;
  name: string;
  tagline: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  /** Text Google Maps searches for to drop the pin */
  mapQuery: string;
  dress: string;
}[] = [
  {
    key: "mehndi",
    name: "Mehndi",
    tagline: "Henna, dholki & marigolds",
    date: "Friday, 27 November 2026",
    time: "7:00 PM onwards",
    venue: "Pearl Continental Hotel",
    address: "Club Road, Civil Lines, Karachi",
    mapQuery: "Pearl Continental Hotel, Club Road, Karachi, Pakistan",
    dress: "Yellows, greens & festive colours",
  },
  {
    key: "nikah",
    name: "Nikah & Baraat",
    tagline: "The sacred vows",
    date: "Saturday, 28 November 2026",
    time: "7:00 PM — Dinner at 9:30 PM",
    venue: "Beach Luxury Hotel",
    address: "M.T. Khan Road, Karachi",
    mapQuery: "Beach Luxury Hotel, M.T. Khan Road, Karachi, Pakistan",
    dress: "Formal · Ivory & blush",
  },
  {
    key: "walima",
    name: "Walima",
    tagline: "An evening of celebration",
    date: "Sunday, 29 November 2026",
    time: "8:00 PM onwards",
    venue: "Karachi Marriott Hotel",
    address: "Abdullah Haroon Road, Karachi",
    mapQuery: "Karachi Marriott Hotel, Abdullah Haroon Road, Karachi, Pakistan",
    dress: "Black tie · Blush & silver",
  },
];
