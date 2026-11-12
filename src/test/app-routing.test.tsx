import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { EVENT_DETAILS } from "@/components/wedding/data";
import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("keeps the Mehndi and Nikah venues in the correct order", () => {
    const mehndi = EVENT_DETAILS.find((event) => event.key === "mehndi");
    const nikah = EVENT_DETAILS.find((event) => event.key === "nikah");

    expect(mehndi).toMatchObject({
      venue: "Pearl Continental Hotel",
      address: "Club Road, Civil Lines, Karachi",
      mapQuery: "Pearl Continental Hotel, Club Road, Karachi, Pakistan",
    });

    expect(nikah).toMatchObject({
      venue: "Beach Luxury Hotel",
      address: "M.T. Khan Road, Karachi",
      mapQuery: "Beach Luxury Hotel, M.T. Khan Road, Karachi, Pakistan",
    });
  });
});
