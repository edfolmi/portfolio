import { create } from "zustand";
import {
  classifyIntent,
  parseDayFromText,
  parseDurationFromText,
  looksLikeAffirmative,
  looksLikeNegative,
  isValidEmail,
} from "../intent/classifyIntent";
import {
  DEMO_SIMULATE_CALENDAR_BUSY,
  DEMO_SIMULATE_IN_CALL,
  DEFAULT_SLOT_DAY,
  FALLBACK_NEXT_AVAILABILITY,
  slotRangesForDisplay,
  slotsForDay,
} from "../engine/constants";
import { delay } from "../engine/delays";
import { systemMessage, userMessage, textBlock, slotGridBlock } from "../engine/messages";
import type {
  AgentMessage,
  AgentSessionFlags,
  AgentTransportSnapshot,
  LiveSessionState,
  SchedulingState,
  UiMode,
} from "../types";

const TECHNICAL_RESPONSE = `STRUCTURED BRIEF
— Candleweb: Real-time trading stack (Django REST, PostgreSQL, Redis, WebSockets, Celery). Throttling, idempotency, and cache-heavy query paths for high-throughput bot activity.
— ShugaNetwork: Ticketing platform (DRF, PostgreSQL, S3, Celery). Multi-provider payments (Paystack, Stripe, PayPal) with mobile distribution.

If you need a deeper pass: specify subsystem (auth, data model, observability, or deployment).`;

const GENERAL_RESPONSE = `This portfolio focuses on backend systems, APIs, and production reliability. Recent work spans trading infrastructure and large-scale ticketing.

Suggested next step: ask for a technical deep dive on a specific project, or check availability for a focused conversation.`;

const PROJECTS_OVERVIEW = `Highlighted work:
01 Candleweb — AI trading platform: streaming market data, secure APIs, operational scale.
02 ShugaNetwork — Event ticketing: payments, media, and multi-platform delivery.

Request a technical deep dive for architecture notes on either line item.`;

function initialLive(): LiveSessionState {
  return { phase: "off", muted: false, connectedAtMs: null };
}

function initialFlags(): AgentSessionFlags {
  return {
    simulateInCall: DEMO_SIMULATE_IN_CALL,
    simulateCalendarBusy: DEMO_SIMULATE_CALENDAR_BUSY,
  };
}

interface AgentStore {
  isOpen: boolean;
  uiMode: UiMode;
  statusLine: string;
  messages: AgentMessage[];
  scheduling: SchedulingState | null;
  live: LiveSessionState;
  flags: AgentSessionFlags;
  /** Input locked during simulated async operations */
  inputLocked: boolean;

  open: () => void;
  /** Fresh session from /agent (or ?book=1); edge trigger continues to use open() */
  openFromEntry: (mode: "consult" | "book") => void;
  close: () => void;
  setStatusLine: (s: string) => void;
  appendMessages: (msgs: AgentMessage[]) => void;
  /** Public entry: user-typed or suggestion-sent text */
  submitUserText: (text: string) => Promise<void>;
  /** Scheduling: duration button */
  selectDuration: (minutes: 30 | 60) => Promise<void>;
  /** Scheduling: slot button */
  selectSlot: (startTime: string) => Promise<void>;
  /** Live: confirm / decline */
  confirmLiveSession: () => Promise<void>;
  declineLiveSession: () => void;
  toggleLiveMute: () => void;
  endLiveSession: () => void;
  /** Post-call option chips */
  submitPostCallChoice: (label: string) => Promise<void>;
  getTransportSnapshot: () => AgentTransportSnapshot;
}

function greetingMessages(): AgentMessage[] {
  return [
    systemMessage(
      [
        textBlock(
          "System online. State your objective, or select a suggestion below.",
        ),
      ],
      "body",
    ),
  ];
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  isOpen: false,
  uiMode: "idle",
  statusLine: "System ready.",
  messages: [],
  scheduling: null,
  live: initialLive(),
  flags: initialFlags(),
  inputLocked: false,

  getTransportSnapshot: () => {
    const s = get();
    return {
      uiMode: s.uiMode,
      messages: s.messages,
      scheduling: s.scheduling,
      live: s.live,
      flags: s.flags,
    };
  },

  open: () => {
    set((state) => ({
      isOpen: true,
      statusLine: "System ready.",
      messages: state.messages.length === 0 ? greetingMessages() : state.messages,
    }));
  },

  openFromEntry: (mode) => {
    set({
      isOpen: true,
      statusLine: "System ready.",
      messages: greetingMessages(),
      uiMode: "idle",
      scheduling: null,
      live: initialLive(),
      inputLocked: false,
    });
    if (mode === "book") {
      queueMicrotask(() => {
        void get().submitUserText(suggestionToUtterance("Book a meeting"));
      });
    }
  },

  close: () => {
    set({
      isOpen: false,
      uiMode: "idle",
      statusLine: "System ready.",
      messages: [],
      scheduling: null,
      live: initialLive(),
      inputLocked: false,
    });
  },

  setStatusLine: (statusLine) => set({ statusLine }),

  appendMessages: (msgs) =>
    set((s) => ({ messages: [...s.messages, ...msgs] })),

  selectDuration: async (minutes) => {
    const { scheduling, appendMessages } = get();
    if (!scheduling || scheduling.step !== "choose_duration") return;
    set({
      scheduling: { ...scheduling, durationMin: minutes, step: "choose_slot" },
      uiMode: "scheduling",
    });
    appendMessages([
      systemMessage(
        [textBlock("Select a time:")],
        "body",
      ),
    ]);
  },

  selectSlot: async (startTime) => {
    const { scheduling, appendMessages } = get();
    if (!scheduling || scheduling.step !== "choose_slot") return;
    set({
      scheduling: {
        ...scheduling,
        selectedSlot: startTime,
        step: "collect_email",
      },
    });
    appendMessages([
      systemMessage(
        [
          textBlock(
            "To confirm:\nPlease provide your email address.",
          ),
        ],
        "body",
      ),
    ]);
  },

  confirmLiveSession: async () => {
    const { live, appendMessages, setStatusLine } = get();
    if (live.phase !== "prompt") return;
    set({ inputLocked: true, live: { ...live, phase: "connecting" } });
    setStatusLine("Negotiating secure connection…");
    appendMessages([
      systemMessage(
        [textBlock("Negotiating secure connection…")],
        "status",
      ),
    ]);
    await delay(2200);
    const connectedAtMs = Date.now();
    set({
      live: {
        phase: "connected",
        muted: false,
        connectedAtMs,
      },
      inputLocked: false,
      statusLine: "Live session active.",
    });
    appendMessages([
      systemMessage(
        [textBlock("Connection established. Live session active.")],
        "status",
      ),
    ]);
  },

  declineLiveSession: () => {
    const { live, appendMessages } = get();
    if (live.phase !== "prompt") return;
    appendMessages([
      systemMessage(
        [
          textBlock(
            "Acknowledged. You may schedule a session or continue in text.",
          ),
        ],
        "body",
      ),
    ]);
    set({
      live: initialLive(),
      uiMode: "idle",
      statusLine: "System ready.",
    });
  },

  toggleLiveMute: () => {
    set((s) => {
      if (s.live.phase !== "connected") return s;
      return { live: { ...s.live, muted: !s.live.muted } };
    });
  },

  endLiveSession: () => {
    const { appendMessages } = get();
    appendMessages([
      systemMessage(
        [textBlock("Session ended.")],
        "status",
      ),
    ]);
    set({
      live: initialLive(),
      uiMode: "post_call",
      statusLine: "Session ended.",
    });
    appendMessages([
      systemMessage(
        [
          textBlock(
            "Would you like:\n• Summary of discussion\n• Follow-up email\n• Schedule another session",
          ),
        ],
        "body",
      ),
    ]);
  },

  submitPostCallChoice: async (label) => {
    const { appendMessages, uiMode } = get();
    if (uiMode !== "post_call") return;
    set({ inputLocked: true });
    await delay(400);
    const l = label.toLowerCase();
    if (l.includes("summary")) {
      appendMessages([
        systemMessage(
          [
            textBlock(
              "Summary (simulated): Requirements and constraints were captured. A structured follow-up can be sent when backend services are connected.",
            ),
          ],
          "body",
        ),
      ]);
    } else if (l.includes("follow")) {
      appendMessages([
        systemMessage(
          [
            textBlock(
              "Follow-up email queued (simulated). No message sent until integrations are live.",
            ),
          ],
          "body",
        ),
      ]);
    } else if (l.includes("schedule") || l.includes("another")) {
      appendMessages([
        systemMessage(
          [
            textBlock(
              "Opening scheduling context. State a preferred day or choose availability check.",
            ),
          ],
          "body",
        ),
      ]);
      set({ uiMode: "idle" });
    } else {
      appendMessages([
        systemMessage(
          [textBlock("Recorded. Continue with a new request when ready.")],
          "body",
        ),
      ]);
    }
    set({ uiMode: "idle", statusLine: "System ready.", inputLocked: false });
  },

  submitUserText: async (raw) => {
    const text = raw.trim();
    if (!text || get().inputLocked) return;

    const {
      scheduling,
      live,
      uiMode,
      flags,
      appendMessages,
      setStatusLine,
    } = get();

    appendMessages([userMessage(text)]);

    // —— Live prompt: natural language ——
    if (live.phase === "prompt") {
      if (looksLikeAffirmative(text)) {
        await get().confirmLiveSession();
        return;
      }
      if (looksLikeNegative(text)) {
        get().declineLiveSession();
        return;
      }
      appendMessages([
        systemMessage(
          [
            textBlock(
              'Reply "yes" to establish a live session, or "no" to remain in text.',
            ),
          ],
          "body",
        ),
      ]);
      return;
    }

    // —— Scheduling: email collection ——
    if (scheduling?.step === "collect_email") {
      if (!isValidEmail(text)) {
        appendMessages([
          systemMessage(
            [
              textBlock(
                "Invalid email format. Provide a single address to confirm the hold.",
              ),
            ],
            "body",
          ),
        ]);
        return;
      }
      set({ inputLocked: true, scheduling: { ...scheduling, step: "securing" } });
      setStatusLine("Securing time slot…");
      appendMessages([
        systemMessage([textBlock("Securing time slot…")], "status"),
      ]);
      await delay(1600);
      appendMessages([
        systemMessage(
          [
            textBlock(
              "Booking confirmed.\nCalendar invite sent (simulated).",
            ),
          ],
          "body",
        ),
      ]);
      set({
        scheduling: null,
        uiMode: "idle",
        statusLine: "System ready.",
        inputLocked: false,
      });
      return;
    }

    // —— Scheduling: typed duration / slot while in flow ——
    if (scheduling?.step === "choose_duration") {
      const d = parseDurationFromText(text);
      if (d) {
        await get().selectDuration(d);
        return;
      }
      appendMessages([
        systemMessage(
          [
            textBlock(
              "Specify duration: 30 minutes or 60 minutes (or use the controls).",
            ),
          ],
          "body",
        ),
      ]);
      return;
    }

    if (scheduling?.step === "choose_slot") {
      const slots = scheduling.slots;
      const hit = slots.find((s) => text.includes(s) || s.includes(text));
      if (hit) {
        await get().selectSlot(hit);
        return;
      }
      appendMessages([
        systemMessage(
          [
            textBlock(
              `Select one of: ${slots.join(", ")} (or use the controls).`,
            ),
          ],
          "body",
        ),
      ]);
      return;
    }

    // —— Post-call natural language ——
    if (uiMode === "post_call") {
      await get().submitPostCallChoice(text);
      return;
    }

    // —— Do not classify during live connected ——
    if (live.phase === "connected" || live.phase === "connecting") {
      appendMessages([
        systemMessage(
          [
            textBlock(
              "Live session in progress. Use session controls or end the session to return to consult mode.",
            ),
          ],
          "body",
        ),
      ]);
      return;
    }

    const intent = classifyIntent(text);

    if (intent === "live") {
      if (flags.simulateInCall) {
        appendMessages([
          systemMessage(
            [
              textBlock(
                "Currently in session.\nNext available in 42 minutes.",
              ),
            ],
            "body",
          ),
        ]);
        return;
      }
      appendMessages([
        systemMessage(
          [
            textBlock(
              "You're currently available.\nWould you like to establish a live session?",
            ),
          ],
          "body",
        ),
      ]);
      set({ live: { phase: "prompt", muted: false, connectedAtMs: null }, uiMode: "live" });
      return;
    }

    if (intent === "availability" || intent === "booking") {
      const targetDay = parseDayFromText(text);
      const busy = flags.simulateCalendarBusy;
      set({
        inputLocked: true,
        uiMode: "scheduling",
        scheduling: {
          step: "consulting",
          targetDay: busy ? DEFAULT_SLOT_DAY : targetDay,
          slots: slotsForDay(targetDay),
          durationMin: null,
          selectedSlot: null,
          showingFallbackAvailability: busy,
        },
      });
      setStatusLine("Consulting availability…");
      appendMessages([
        systemMessage([textBlock("Consulting availability…")], "status"),
      ]);
      await delay(900);

      if (busy) {
        appendMessages([
          systemMessage([textBlock(FALLBACK_NEXT_AVAILABILITY)], "body"),
        ]);
        set({
          scheduling: null,
          uiMode: "idle",
          statusLine: "System ready.",
          inputLocked: false,
        });
        return;
      }

      const ranges = slotRangesForDisplay(targetDay);
      appendMessages([
        systemMessage(
          [
            textBlock(`Availability for ${targetDay}:`),
            slotGridBlock(targetDay, ranges),
            textBlock("How long would you like?"),
          ],
          "body",
        ),
      ]);
      set((s) => ({
        scheduling: s.scheduling
          ? {
              ...s.scheduling,
              step: "choose_duration",
              targetDay,
              slots: slotsForDay(targetDay),
            }
          : null,
        statusLine: "Awaiting duration.",
        inputLocked: false,
      }));
      return;
    }

    if (intent === "technical") {
      appendMessages([systemMessage([textBlock(TECHNICAL_RESPONSE)], "body")]);
      appendMessages([
        systemMessage(
          [
            textBlock(
              "Offer: specify a subsystem for a deeper dive (auth, data, observability, deployment).",
            ),
          ],
          "body",
        ),
      ]);
      return;
    }

    if (intent === "general") {
      const t = text.toLowerCase();
      const projects =
        t.includes("project") ||
        t.includes("work") ||
        t.includes("portfolio") ||
        t.includes("case");
      appendMessages([
        systemMessage(
          [textBlock(projects ? PROJECTS_OVERVIEW : GENERAL_RESPONSE)],
          "body",
        ),
      ]);
      return;
    }
  },
}));

/** Map suggestion chip labels to classifier-friendly utterances */
export function suggestionToUtterance(label: string): string {
  switch (label) {
    case "Ask about projects":
      return "Tell me about your projects and recent work.";
    case "Technical deep dive":
      return "Technical deep dive on your architecture and stack choices.";
    case "Check availability":
      return "Are you free Thursday this week?";
    case "Book a meeting":
      return "I would like to book a meeting.";
    case "Start live session":
      return "Can we start a live session now?";
    default:
      return label;
  }
}
