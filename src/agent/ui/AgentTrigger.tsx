import clsx from "clsx";
import { useAgentStore } from "../state/agentStore";

export function AgentTrigger() {
  const open = useAgentStore((s) => s.open);
  const isOpen = useAgentStore((s) => s.isOpen);

  return (
    <div
      className={clsx(
        "agent-trigger-wrap pointer-events-none fixed z-50",
        /* Mobile: bottom-centered, clear of home indicator */
        "bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 right-auto top-auto max-md:-translate-x-1/2 max-md:translate-y-0",
        /* Desktop: vertical center, right edge */
        "md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:pr-5",
      )}
    >
      <button
        type="button"
        onClick={open}
        className={clsx(
          "agent-trigger pointer-events-auto group flex max-w-[min(100vw-2rem,20rem)] items-center gap-2.5 rounded-none border-0 bg-transparent py-2.5 pl-1 text-left md:gap-3 md:py-3 md:pl-2",
          "opacity-[0.42] transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-white/40",
        )}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Open consult the system interface"
      >
        <span
          className="agent-emblem relative flex h-8 w-8 shrink-0 items-center justify-center md:h-9 md:w-9"
          aria-hidden
        >
          <span className="agent-emblem__ring absolute inset-0 rounded-full border border-charcoal/55 group-hover:border-charcoal/80" />
          <span className="agent-emblem__pulse absolute inset-[3px] rounded-full border border-charcoal/25 group-hover:border-charcoal/45" />
        </span>
        <span className="flex min-w-0 flex-col gap-0.5 md:gap-1">
          <span className="ed-label !text-[0.52rem] !leading-none !tracking-[0.26em] text-charcoal/70 group-hover:text-charcoal md:!text-[0.58rem] md:!tracking-[0.28em]">
            AI SYSTEM ONLINE
          </span>
          <span className="max-h-0 overflow-hidden text-[0.6rem] font-medium uppercase tracking-[0.16em] text-charcoal/0 transition-all duration-300 group-hover:max-h-6 group-hover:text-charcoal/55 md:text-[0.65rem] md:tracking-[0.18em]">
            Consult the system
          </span>
        </span>
      </button>
    </div>
  );
}
