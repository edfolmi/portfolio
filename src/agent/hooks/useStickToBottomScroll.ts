import {
  useEffect,
  useLayoutEffect,
  useRef,
  type RefObject,
} from "react";

const DEFAULT_THRESHOLD_PX = 100;
/** Slightly more forgiving on small viewports (thumb scroll, sub-pixel) */
const MOBILE_THRESHOLD_PX = 140;

function prefersCoarseOrNarrowViewport(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(max-width: 639px)").matches) return true;
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches)
    return true;
  return false;
}

/**
 * Keeps a scroll container pinned to the bottom when the user is already
 * following the tail (within threshold). If they scroll up, new content does
 * not yank the viewport.
 *
 * Mobile hardening:
 * - Instant scroll (scrollTop) — iOS often ignores or mishandles smooth.
 * - ResizeObserver on inner content — catches late layout, async message paint,
 *   and font/subtree settling after React commit.
 * - Short delayed retries — second frame + 60ms + 200ms for WebKit quirks.
 */
export function useStickToBottomScroll(
  scrollRef: RefObject<HTMLElement | null>,
  dependencyKey: string | number,
  options: { enabled: boolean; thresholdPx?: number } = { enabled: true },
): void {
  const { enabled, thresholdPx = DEFAULT_THRESHOLD_PX } = options;
  const pinnedToBottomRef = useRef(true);
  const programmaticScrollRef = useRef(false);
  const prevEnabledRef = useRef(false);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const thresholdRef = useRef(thresholdPx);
  thresholdRef.current = prefersCoarseOrNarrowViewport()
    ? Math.max(thresholdPx, MOBILE_THRESHOLD_PX)
    : thresholdPx;

  const flushScrollToBottomRef = useRef<() => void>(() => {});

  flushScrollToBottomRef.current = () => {
    if (!enabledRef.current) return;
    const el = scrollRef.current;
    if (!el || !pinnedToBottomRef.current) return;

    const target = Math.max(0, el.scrollHeight - el.clientHeight);
    if (target <= 0) return;

    programmaticScrollRef.current = true;
    const instant = prefersCoarseOrNarrowViewport();

    if (instant) {
      el.scrollTop = target;
      requestAnimationFrame(() => {
        const el2 = scrollRef.current;
        if (!el2 || !pinnedToBottomRef.current) {
          programmaticScrollRef.current = false;
          return;
        }
        el2.scrollTop = Math.max(0, el2.scrollHeight - el2.clientHeight);
        window.setTimeout(() => {
          programmaticScrollRef.current = false;
        }, 120);
      });
    } else {
      el.scrollTo({ top: target, behavior: "smooth" });
      window.setTimeout(() => {
        programmaticScrollRef.current = false;
      }, 520);
    }
  };

  useEffect(() => {
    if (enabled && !prevEnabledRef.current) {
      pinnedToBottomRef.current = true;
    }
    prevEnabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !enabled) return;

    const onScroll = () => {
      if (programmaticScrollRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const distance = scrollHeight - scrollTop - clientHeight;
      pinnedToBottomRef.current = distance <= thresholdRef.current;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [enabled, scrollRef]);

  useLayoutEffect(() => {
    if (!enabled) return;

    const runChain = () => {
      flushScrollToBottomRef.current();
      if (!prefersCoarseOrNarrowViewport()) return;
      window.setTimeout(() => flushScrollToBottomRef.current(), 60);
      window.setTimeout(() => flushScrollToBottomRef.current(), 200);
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(runChain);
    });
  }, [dependencyKey, enabled]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !enabled) return;

    const child = el.firstElementChild;
    if (!(child instanceof HTMLElement)) return;

    let roRaf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(roRaf);
      roRaf = requestAnimationFrame(() => {
        flushScrollToBottomRef.current();
      });
    });

    ro.observe(child);

    return () => {
      cancelAnimationFrame(roRaf);
      ro.disconnect();
    };
  }, [enabled, scrollRef]);
}
