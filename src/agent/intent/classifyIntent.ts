import type { AgentIntent } from "../types";

const norm = (s: string) => s.toLowerCase();

/**
 * Temporary mock classifier. Replace with backend / model later.
 * Priority: live > booking > availability > technical > general
 */
export function classifyIntent(raw: string): AgentIntent {
  const t = norm(raw);

  const live =
    /\b(live session|talk now|speak now|voice call|video call|hop on|can we talk|call now|establish a live|start live)\b/.test(
      t,
    ) || (t.includes("live") && t.includes("session"));

  const booking =
    /\b(book|booking|reserve|appointment|schedule a|schedule an|set up a meeting|calendar invite)\b/.test(
      t,
    );

  const availability =
    /\b(available|availability|free\b|open slot|when can|this week|openings?|calendar)\b/.test(
      t,
    ) ||
    /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/.test(t);

  const technical =
    /\b(architecture|stack|technical|deep dive|implementation|scalability|performance|infrastructure|database|redis|websocket|api design|system design|how (does|do) you build)\b/.test(
      t,
    );

  if (live) return "live";
  if (booking) return "booking";
  if (availability) return "availability";
  if (technical) return "technical";
  return "general";
}

export function parseDayFromText(raw: string): string {
  const t = norm(raw);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ] as const;
  for (const d of days) {
    if (t.includes(d.toLowerCase())) return d;
  }
  return "Thursday";
}

export function parseDurationFromText(raw: string): 30 | 60 | null {
  const t = norm(raw);
  if (/\b(60|1\s*hour|one hour|full hour)\b/.test(t)) return 60;
  if (/\b(30|half\s*hour|half an hour)\b/.test(t)) return 30;
  return null;
}

export function looksLikeAffirmative(raw: string): boolean {
  const t = norm(raw.trim());
  if (/^(y|yes|yeah|yep|confirm|ok|okay|sure|proceed|establish|start)$/.test(t))
    return true;
  if (t.startsWith("yes") || t.startsWith("sure") || t.startsWith("ok"))
    return true;
  if (t.includes("establish") && t.includes("session")) return true;
  return false;
}

export function looksLikeNegative(raw: string): boolean {
  const t = norm(raw.trim());
  if (/^(n|no|nope|decline|cancel|not now)$/.test(t)) return true;
  if (t.startsWith("no")) return true;
  return false;
}

export function isValidEmail(raw: string): boolean {
  const s = raw.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
