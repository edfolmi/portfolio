/**
 * Demo toggles for edge-case copy. Flip in code for portfolio walkthroughs.
 */
export const DEMO_SIMULATE_IN_CALL = false;
export const DEMO_SIMULATE_CALENDAR_BUSY = false;

export const DEFAULT_SLOT_DAY = "Thursday";

/** Simulated open ranges for the scheduling UX */
export function slotsForDay(day: string): string[] {
  void day;
  return ["10:00", "10:30", "15:00"];
}

export function slotRangesForDisplay(day: string): string[] {
  void day;
  return ["10:00–10:30", "10:30–11:00", "15:00–16:00"];
}

export const FALLBACK_NEXT_AVAILABILITY =
  "Next availability:\nTuesday 15:00–17:00";

export const SUGGESTION_PROMPTS: readonly string[] = [
  "Ask about projects",
  "Technical deep dive",
  "Check availability",
  "Book a meeting",
  "Start live session",
] as const;
