import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { useAgentStore, suggestionToUtterance } from "../state/agentStore";
import { SUGGESTION_PROMPTS } from "../engine/constants";
import { useAgentFocusTrap } from "../hooks/useAgentFocusTrap";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useStickToBottomScroll } from "../hooks/useStickToBottomScroll";
import { useVisualViewportBottomInset } from "../hooks/useVisualViewportInset";
import { createConnectionSound, playHangUpSound } from "../audio/connectionSound";
import { userMessage as makeUserMessage } from "../engine/messages";
import { AgentMessageThread } from "./AgentMessageThread";
import { LiveSessionHud } from "./LiveSessionHud";

const POST_CALL_ACTIONS = [
  "Summary of discussion",
  "Follow-up email",
  "Schedule another session",
] as const;

function isNarrowAgentViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 639px)").matches;
}

export function AgentOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const connectionSoundRef = useRef<ReturnType<typeof createConnectionSound> | null>(
    null,
  );

  const [mobileSuggestionsCollapsed, setMobileSuggestionsCollapsed] = useState(false);

  const isOpen = useAgentStore((s) => s.isOpen);
  const close = useAgentStore((s) => s.close);
  const messages = useAgentStore((s) => s.messages);
  const statusLine = useAgentStore((s) => s.statusLine);
  const inputLocked = useAgentStore((s) => s.inputLocked);
  const scheduling = useAgentStore((s) => s.scheduling);
  const live = useAgentStore((s) => s.live);
  const uiMode = useAgentStore((s) => s.uiMode);

  const submitUserText = useAgentStore((s) => s.submitUserText);
  const appendMessages = useAgentStore((s) => s.appendMessages);
  const selectDuration = useAgentStore((s) => s.selectDuration);
  const selectSlot = useAgentStore((s) => s.selectSlot);
  const confirmLiveSession = useAgentStore((s) => s.confirmLiveSession);
  const declineLiveSession = useAgentStore((s) => s.declineLiveSession);
  const toggleLiveMute = useAgentStore((s) => s.toggleLiveMute);
  const endLiveSession = useAgentStore((s) => s.endLiveSession);
  const submitPostCallChoice = useAgentStore((s) => s.submitPostCallChoice);

  const appendUserLine = (text: string) => appendMessages([makeUserMessage(text)]);

  const consultInputVisible =
    live.phase !== "connecting" &&
    live.phase !== "connected" &&
    !inputLocked;

  const overlayLive =
    live.phase === "connecting" || live.phase === "connected";

  const showSuggestionRow =
    consultInputVisible &&
    uiMode !== "post_call" &&
    scheduling == null &&
    live.phase === "off";

  const keyboardBottomInset = useVisualViewportBottomInset(isOpen);

  const scrollSignature = useMemo(() => {
    const last = messages[messages.length - 1];
    return [
      messages.length,
      last?.id ?? "",
      scheduling?.step ?? "",
      live.phase,
      uiMode,
      inputLocked ? "1" : "0",
    ].join("|");
  }, [messages, scheduling?.step, live.phase, uiMode, inputLocked]);

  useStickToBottomScroll(mainScrollRef, scrollSignature, {
    enabled: isOpen,
    thresholdPx: 100,
  });

  useEffect(() => {
    if (!isOpen) setMobileSuggestionsCollapsed(false);
  }, [isOpen]);

  useEffect(() => {
    if (!showSuggestionRow) setMobileSuggestionsCollapsed(false);
  }, [showSuggestionRow]);

  /** After availability loads, duration/slot controls sit below the thread; always reveal them on mobile even if the user scrolled up to read the grid. */
  useLayoutEffect(() => {
    if (!isOpen) return;
    const step = scheduling?.step;
    if (step !== "choose_duration" && step !== "choose_slot") return;
    const el = mainScrollRef.current;
    if (!el) return;
    const toEnd = () => {
      el.scrollTop = Math.max(0, el.scrollHeight - el.clientHeight);
    };
    toEnd();
    requestAnimationFrame(() => {
      toEnd();
      window.setTimeout(toEnd, 60);
      window.setTimeout(toEnd, 200);
    });
  }, [isOpen, scheduling?.step, scrollSignature]);

  useAgentFocusTrap(containerRef, isOpen);
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) {
      connectionSoundRef.current?.dispose();
      connectionSoundRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (live.phase === "connected") {
      connectionSoundRef.current?.finishConnected();
      connectionSoundRef.current = null;
    }
  }, [live.phase]);

  /**
   * Keyboard confirm ("yes") never hits beginLiveConnection; start tone in the
   * same frame as the connecting transition when no handle exists (button path
   * already assigned ref + started in the click handler).
   */
  useLayoutEffect(() => {
    if (live.phase !== "connecting") return;
    if (connectionSoundRef.current) return;
    const handle = createConnectionSound();
    connectionSoundRef.current = handle;
    handle.start();
  }, [live.phase]);

  useEffect(() => {
    return () => {
      connectionSoundRef.current?.dispose();
      connectionSoundRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onDocKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", onDocKey);
    return () => document.removeEventListener("keydown", onDocKey);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen || !consultInputVisible) return;
    queueMicrotask(() => inputRef.current?.focus());
  }, [isOpen, consultInputVisible]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const v = inputRef.current?.value?.trim() ?? "";
    if (!v) return;
    void submitUserText(v);
    if (inputRef.current) inputRef.current.value = "";
  };

  const beginLiveConnection = () => {
    connectionSoundRef.current?.dispose();
    const handle = createConnectionSound();
    connectionSoundRef.current = handle;
    handle.start();
    void confirmLiveSession();
  };

  if (!isOpen) return null;

  const node = (
    <div
      ref={containerRef}
      className={clsx(
        "agent-overlay fixed inset-0 z-[100] flex max-h-[100dvh] min-h-0 w-full max-w-[100vw] flex-col overflow-hidden",
        "bg-charcoal text-warm-white",
        overlayLive && "agent-overlay--live",
      )}
      style={
        {
          height: "100dvh",
          maxHeight: "100dvh",
          paddingTop: "env(safe-area-inset-top, 0px)",
          "--agent-keyboard-inset": `${keyboardBottomInset}px`,
        } as CSSProperties
      }
      role="dialog"
      aria-modal="true"
      aria-labelledby="consult-heading"
    >
      {live.phase === "connecting" && (
        <output className="sr-only" aria-live="assertive">
          Connecting. Negotiating secure connection.
        </output>
      )}
      {live.phase === "connected" && (
        <output className="sr-only" aria-live="polite">
          Live session active.
        </output>
      )}

      <div className="agent-overlay__inner flex min-h-0 flex-1 flex-col px-4 pb-0 pt-5 sm:px-6 sm:pt-6 md:px-10 md:pt-10">
        <header className="relative flex shrink-0 flex-col border-b border-warm-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:pb-8">
          <div className="min-w-0 pr-12 sm:flex-1 sm:pr-6 md:pr-8">
            <h1
              id="consult-heading"
              className="ed-headline max-w-[18ch] text-xl leading-[1.1] tracking-tight text-warm-white sm:max-w-[20ch] sm:text-[clamp(1.35rem,4.5vw,3.75rem)] sm:leading-[1.08] md:text-4xl lg:text-5xl"
            >
              CONSULT THE SYSTEM
            </h1>
            <p
              className="mt-3 ed-label !text-[0.62rem] !leading-snug !tracking-[0.16em] !text-warm-white/38 sm:mt-3 sm:!text-warm-white/40 sm:!tracking-[0.2em]"
              aria-live="polite"
            >
              {statusLine}
            </p>
          </div>
          <button
            type="button"
            className="agent-close-icon sm:hidden"
            onClick={close}
            aria-label="Close"
          >
            <span aria-hidden className="block text-[1.75rem] font-light leading-none text-warm-white/45">
              ×
            </span>
          </button>
          <button
            type="button"
            className="agent-sys-btn agent-sys-btn--ghost hidden shrink-0 sm:inline-flex"
            onClick={close}
          >
            Close
          </button>
        </header>

        <div className="agent-scroll-stack relative mt-6 flex min-h-0 min-w-0 flex-1 flex-col sm:mt-8">
          <div
            ref={mainScrollRef}
            className="agent-overlay__scroll min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain"
            tabIndex={-1}
          >
            <div className="flex min-w-0 flex-col gap-6 pb-6 sm:gap-8 sm:pb-8">
            <AgentMessageThread messages={messages} />

            {live.phase === "prompt" && (
              <div
                className="flex flex-col gap-3 border border-warm-white/10 bg-warm-white/[0.03] p-4 sm:flex-row sm:flex-wrap sm:gap-2 sm:p-4"
                role="group"
                aria-label="Live session confirmation"
              >
                <button
                  type="button"
                  className="agent-sys-btn agent-sys-btn--touch w-full sm:w-auto"
                  onClick={() => {
                    appendUserLine("Establish live session");
                    beginLiveConnection();
                  }}
                >
                  Establish session
                </button>
                <button
                  type="button"
                  className="agent-sys-btn agent-sys-btn--ghost agent-sys-btn--touch w-full sm:w-auto"
                  onClick={() => {
                    connectionSoundRef.current?.abort();
                    connectionSoundRef.current = null;
                    appendUserLine("Decline");
                    declineLiveSession();
                  }}
                >
                  Decline
                </button>
              </div>
            )}

            <LiveSessionHud
              live={live}
              onMute={toggleLiveMute}
              onEnd={() => {
                playHangUpSound();
                appendUserLine("End session");
                endLiveSession();
              }}
            />

            {scheduling?.step === "choose_duration" && (
              <div
                className="flex flex-col gap-3 border border-warm-white/10 p-4 sm:flex-row sm:flex-wrap sm:gap-2 sm:p-4"
                role="group"
                aria-label="Select duration"
              >
                <button
                  type="button"
                  className="agent-sys-btn agent-sys-btn--touch w-full sm:w-auto"
                  onClick={() => {
                    appendUserLine("30 minutes");
                    void selectDuration(30);
                  }}
                >
                  30 minutes
                </button>
                <button
                  type="button"
                  className="agent-sys-btn agent-sys-btn--touch w-full sm:w-auto"
                  onClick={() => {
                    appendUserLine("60 minutes");
                    void selectDuration(60);
                  }}
                >
                  60 minutes
                </button>
              </div>
            )}

            {scheduling?.step === "choose_slot" && scheduling.slots.length > 0 && (
              <div
                className="flex flex-col gap-3 border border-warm-white/10 p-4 sm:flex-row sm:flex-wrap sm:gap-2 sm:p-4"
                role="group"
                aria-label="Select start time"
              >
                {scheduling.slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className="agent-sys-btn agent-sys-btn--touch w-full font-mono text-sm sm:w-auto"
                    onClick={() => {
                      appendUserLine(slot);
                      void selectSlot(slot);
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}

            {uiMode === "post_call" && (
              <div
                className="flex flex-col gap-3 border border-warm-white/10 p-4 sm:flex-row sm:flex-wrap sm:gap-2 sm:p-4"
                role="group"
                aria-label="Post-session options"
              >
                {POST_CALL_ACTIONS.map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="agent-sys-btn agent-sys-btn--ghost agent-sys-btn--touch w-full text-left sm:w-auto"
                    onClick={() => {
                      appendMessages([makeUserMessage(label)]);
                      void submitPostCallChoice(label);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
            </div>
          </div>
          <div className="agent-scroll-fade pointer-events-none" aria-hidden />
        </div>

        <div className="agent-composer-tray agent-composer-tray--elevated shrink-0 border-t border-warm-white/10 bg-charcoal pt-4 sm:pt-3">
          <footer className="px-0 pb-3 sm:pb-3">
            <ul className="flex flex-col gap-1 ed-label !text-[0.58rem] !normal-case !tracking-[0.12em] !text-warm-white/30">
              <li>End-to-end encrypted session</li>
              <li>Secure calendar integration</li>
            </ul>
          </footer>

          {consultInputVisible && (
            <form
              onSubmit={onSubmit}
              className="agent-composer sticky bottom-0 space-y-4 pb-[calc(env(safe-area-inset-bottom,0px)+var(--agent-keyboard-inset,0px)+1rem)] pt-0 sm:space-y-4 sm:pb-[calc(env(safe-area-inset-bottom,0px)+var(--agent-keyboard-inset,0px)+1rem)]"
            >
              <label htmlFor="consult-input" className="sr-only">
                Consult input
              </label>
              <input
                ref={inputRef}
                id="consult-input"
                name="consult"
                type="text"
                enterKeyHint="send"
                autoComplete="off"
                placeholder="What would you like to know?"
                disabled={inputLocked}
                className="agent-input agent-input--primary box-border max-sm:min-h-14 w-full max-w-full rounded-none border border-warm-white/22 bg-charcoal px-4 py-4 font-sans text-base leading-normal text-warm-white placeholder:text-warm-white/35 focus:border-warm-white/50 focus:outline-none disabled:opacity-40 max-sm:text-[16px] sm:min-h-0 sm:py-3.5 sm:text-[0.9375rem]"
              />
              {showSuggestionRow && (
                <>
                  <ul
                    id="agent-suggested-prompts"
                    className={clsx(
                      "agent-suggestion-list flex flex-col overflow-hidden rounded-none border border-warm-white/12",
                      mobileSuggestionsCollapsed && "max-sm:hidden",
                    )}
                    aria-label="Suggested prompts"
                  >
                    {SUGGESTION_PROMPTS.map((label) => (
                      <li key={label} className="m-0 list-none p-0">
                        <button
                          type="button"
                          className="agent-suggestion-row"
                          onClick={() => {
                            void submitUserText(suggestionToUtterance(label));
                            if (isNarrowAgentViewport()) {
                              setMobileSuggestionsCollapsed(true);
                            }
                          }}
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                  {mobileSuggestionsCollapsed && (
                    <button
                      type="button"
                      className="agent-suggestion-reveal sm:hidden"
                      onClick={() => setMobileSuggestionsCollapsed(false)}
                      aria-label="Show suggested prompts"
                      aria-expanded={false}
                      aria-controls="agent-suggested-prompts"
                    >
                      <span className="agent-suggestion-reveal__icon" aria-hidden>
                        ↑
                      </span>
                      <span className="agent-suggestion-reveal__label">
                        Suggested prompts
                      </span>
                    </button>
                  )}
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
