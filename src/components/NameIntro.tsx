import { useEffect, useState } from "react";

/**
 * Premium splash screen — "SRICHARAN AITHARAJU" on black.
 * Self-contained: all styles inline, no external CSS dependencies.
 */
export function NameIntro() {
  const [mounted, setMounted] = useState(true);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setMounted(false);
      return;
    }

    document.body.style.overflow = "hidden";

    // Inject a one-off page-reveal animation on unmount.
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-splash-reveal", "");
    styleEl.textContent = `
      @keyframes splashPageReveal {
        0%   { opacity: 0; transform: translateY(16px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      body.splash-revealing > * {
        animation: splashPageReveal 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
    `;
    document.head.appendChild(styleEl);

    const t1 = window.setTimeout(() => setPhase("out"), 2000);
    const t2 = window.setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = "";
      document.body.classList.add("splash-revealing");
      window.setTimeout(() => {
        document.body.classList.remove("splash-revealing");
        styleEl.remove();
      }, 650);
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
      document.body.classList.remove("splash-revealing");
      styleEl.remove();
    };
  }, []);

  if (!mounted) return null;

  const isIn = phase === "in";

  const nameStyle: React.CSSProperties = {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    fontWeight: 800,
    fontSize: "clamp(2.5rem, 10vw, 7.5rem)",
    letterSpacing: "0.08em",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 1.1,
    margin: 0,
    padding: "0 1rem",
    opacity: isIn ? undefined : 0,
    transform: isIn ? undefined : "translateY(-24px)",
    filter: "blur(0)",
    animation: isIn
      ? "splashNameIn 1400ms cubic-bezier(0.22, 1, 0.36, 1) both"
      : "splashNameOut 800ms cubic-bezier(0.4, 0, 0.2, 1) both",
    willChange: "opacity, transform, filter",
  };

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes splashNameIn {
          0%   { opacity: 0; transform: scale(0.96); filter: blur(8px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        @keyframes splashNameOut {
          0%   { opacity: 1; transform: translateY(0); filter: blur(0px); }
          100% { opacity: 0; transform: translateY(-24px); filter: blur(0px); }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.04), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <h1 style={nameStyle}>SRICHARAN AITHARAJU</h1>
    </div>
  );
}
