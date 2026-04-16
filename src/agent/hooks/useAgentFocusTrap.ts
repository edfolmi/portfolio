import { useEffect, type RefObject } from "react";

/**
 * Trap focus inside `containerRef` while `active`. Moves focus to first
 * focusable on activate. Intended for the full-screen consult overlay.
 */
export function useAgentFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
): void {
  useEffect(() => {
    if (!active) return;
    const el = containerRef.current;
    if (!el) return;

    const selector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const getFocusables = () =>
      Array.from(el.querySelectorAll<HTMLElement>(selector));

    const focusables = getFocusables();
    const first = focusables[0];
    queueMicrotask(() => first?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = getFocusables();
      if (list.length === 0) return;
      const f = list[0];
      const l = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === f) {
          e.preventDefault();
          l.focus();
        }
      } else {
        if (document.activeElement === l) {
          e.preventDefault();
          f.focus();
        }
      }
    };

    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, [active, containerRef]);
}
