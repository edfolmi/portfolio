import { useEffect, useState, memo } from "react";
import clsx from "clsx";
import type { LiveSessionState } from "../types";

function formatElapsed(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function LiveSessionHudInner(props: {
  live: LiveSessionState;
  onMute: () => void;
  onEnd: () => void;
}) {
  const { live, onMute, onEnd } = props;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (live.phase !== "connected" || live.connectedAtMs == null) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, [live.phase, live.connectedAtMs]);

  void tick;
  const elapsedSec =
    live.phase === "connected" && live.connectedAtMs != null
      ? Math.max(0, Math.floor((Date.now() - live.connectedAtMs) / 1000))
      : 0;

  if (live.phase === "off" || live.phase === "prompt") return null;

  return (
    <section
      className={clsx(
        "agent-live border border-warm-white/15 bg-black/35 px-4 py-4 sm:mt-6 sm:px-5 sm:py-5",
        live.phase === "connecting" && "agent-live--connecting",
      )}
      aria-label="Live session"
    >
      {live.phase === "connecting" && (
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <p
            className="ed-label !mb-3 !text-warm-white/45"
            id="agent-live-connecting-label"
          >
            CONNECTING
          </p>
          <div
            className="agent-waveform flex h-9 items-end justify-center gap-1 sm:justify-start"
            aria-hidden
          >
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <span
                key={i}
                className="agent-waveform__bar w-1 bg-warm-white/35"
                style={{ animationDelay: `${i * 90}ms` }}
              />
            ))}
          </div>
        </div>
      )}

      {live.phase === "connected" && (
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-left">
          <div className="min-w-0">
            <p className="ed-headline text-lg tracking-tight text-warm-white sm:text-xl md:text-2xl">
              LIVE SESSION ACTIVE
            </p>
            <p
              className="mt-1 font-mono text-base tabular-nums text-warm-white/70 sm:text-sm"
              aria-live="polite"
            >
              {formatElapsed(elapsedSec)}
            </p>
          </div>
          <div className="flex w-full max-w-sm flex-col gap-2 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-end">
            <button
              type="button"
              className={clsx(
                "agent-sys-btn agent-sys-btn--touch w-full sm:w-auto",
                live.muted && "agent-sys-btn--active",
              )}
              aria-pressed={live.muted}
              onClick={onMute}
            >
              {live.muted ? "Unmute" : "Mute"}
            </button>
            <button
              type="button"
              className="agent-sys-btn agent-sys-btn--touch w-full sm:w-auto"
              onClick={onEnd}
            >
              End Session
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export const LiveSessionHud = memo(LiveSessionHudInner);
