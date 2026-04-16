import { memo } from "react";
import clsx from "clsx";
import type { AgentMessage, MessageBlock } from "../types";

function BlockView({ block }: { block: MessageBlock }) {
  if (block.type === "text") {
    return (
      <div className="agent-msg__text min-w-0 whitespace-pre-line break-words text-[0.9375rem] leading-[1.65] text-warm-white/88 sm:leading-relaxed">
        {block.text}
      </div>
    );
  }
  return (
    <div className="agent-msg__grid mt-4 max-w-full border border-warm-white/15 sm:mt-4">
      <div className="agent-msg__grid-head border-b border-warm-white/10 px-4 py-2.5 sm:px-4 sm:py-2 ed-label !text-warm-white/45 !tracking-[0.2em]">
        {block.day}
      </div>
      <ul className="divide-y divide-warm-white/10" role="list">
        {block.ranges.map((r) => (
          <li
            key={r}
            className="min-w-0 break-all px-4 py-3 font-mono text-[0.8125rem] tracking-wide text-warm-white/80 sm:px-4 sm:py-2.5 sm:break-normal"
          >
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AgentMessageThreadInner({ messages }: { messages: AgentMessage[] }) {
  return (
    <div
      className="agent-thread flex min-w-0 flex-col gap-0 border border-warm-white/10 bg-charcoal/40 py-3 sm:py-2"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
    >
      {messages.map((m) => (
        <article
          key={m.id}
          className={clsx(
            "agent-thread__row min-w-0 border-b border-warm-white/5 px-4 py-5 last:border-b-0 sm:px-5 sm:py-5",
            m.role === "user" ? "agent-thread__row--user" : "agent-thread__row--system",
          )}
        >
          <header className="mb-3 sm:mb-2">
            <span
              className={clsx(
                "ed-label !text-[0.6rem] !tracking-[0.22em] sm:!text-[0.65rem]",
                m.role === "user"
                  ? "!text-warm-white/35"
                  : m.kind === "status"
                    ? "!text-warm-white/50"
                    : "!text-warm-white/40",
              )}
            >
              {m.role === "user" ? "INPUT" : m.kind === "status" ? "STATUS" : "SYSTEM"}
            </span>
          </header>
          <div className="flex min-w-0 flex-col gap-3.5 sm:gap-3">
            {m.blocks.map((b, i) => (
              <BlockView key={`${m.id}-b-${i}`} block={b} />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export const AgentMessageThread = memo(AgentMessageThreadInner);
