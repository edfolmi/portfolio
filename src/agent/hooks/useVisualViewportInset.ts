import { useEffect, useState } from "react";

/**
 * Approximates keyboard/obstruction overlap using Visual Viewport API.
 * Used to pad the composer so it stays above the mobile keyboard.
 */
export function useVisualViewportBottomInset(active: boolean): number {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    if (!active || typeof window === "undefined") {
      setInset(0);
      return;
    }

    const vv = window.visualViewport;
    if (!vv) {
      setInset(0);
      return;
    }

    const update = () => {
      const overlap = Math.max(
        0,
        window.innerHeight - vv.height - Math.max(0, vv.offsetTop),
      );
      setInset(overlap);
    };

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      setInset(0);
    };
  }, [active]);

  return inset;
}
