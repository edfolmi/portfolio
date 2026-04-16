/**
 * One-shot consumption of /agent deep links. Survives React StrictMode double
 * mount so we do not duplicate bootstrap messages or double-submit booking.
 */
let lastConsumedKey: string | null = null;

export type AgentRouteEntryMode = "consult" | "book";

export function consumeAgentRouteEntry(
  pathname: string,
  search: string,
): AgentRouteEntryMode | null {
  if (pathname !== "/agent") {
    lastConsumedKey = null;
    return null;
  }
  const key = `${pathname}${search}`;
  if (lastConsumedKey === key) return null;
  lastConsumedKey = key;

  const q = search.startsWith("?") ? search.slice(1) : search;
  const book = new URLSearchParams(q).get("book");
  if (book === "1" || book === "true") return "book";
  return "consult";
}
