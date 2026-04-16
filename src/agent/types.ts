/**
 * Core types for the portfolio AI system interface.
 * Structured for future WebSocket transport: messages and session snapshots
 * map cleanly to server events.
 */

export type AgentIntent =
  | "general"
  | "technical"
  | "availability"
  | "booking"
  | "live";

export type UiMode = "idle" | "scheduling" | "live" | "post_call";

export type SchedulingStep =
  | "idle"
  | "consulting"
  | "show_grid"
  | "choose_duration"
  | "choose_slot"
  | "collect_email"
  | "securing"
  | "complete";

export type LivePhase = "off" | "prompt" | "connecting" | "connected";

export interface SchedulingState {
  step: SchedulingStep;
  /** Display label e.g. "Thursday" */
  targetDay: string;
  /** Start times like "10:00" */
  slots: string[];
  durationMin: 30 | 60 | null;
  selectedSlot: string | null;
  /** When calendar is "busy", show fallback copy instead of grid */
  showingFallbackAvailability: boolean;
}

export interface LiveSessionState {
  phase: LivePhase;
  muted: boolean;
  /** Wall clock when connected phase began (client-side timer baseline) */
  connectedAtMs: number | null;
}

export type MessageBlock =
  | { type: "text"; text: string }
  | {
      type: "slot_grid";
      day: string;
      ranges: string[];
    };

export interface AgentMessage {
  id: string;
  role: "system" | "user";
  /** system status lines use calmer styling */
  kind?: "status" | "body";
  blocks: MessageBlock[];
  createdAt: number;
}

/** Future: mirror of server session; today used for simulated flags */
export interface AgentSessionFlags {
  /** Demo: respond as if owner is already in a live session */
  simulateInCall: boolean;
  /** Demo: no slots today; show next window copy */
  simulateCalendarBusy: boolean;
}

export interface AgentTransportSnapshot {
  uiMode: UiMode;
  messages: AgentMessage[];
  scheduling: SchedulingState | null;
  live: LiveSessionState;
  flags: AgentSessionFlags;
}
