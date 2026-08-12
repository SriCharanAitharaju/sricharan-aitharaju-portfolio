import { useEffect, useState } from "react";

/**
 * Cinematic opening:
 *  Phase 1 — multilingual greetings cycle ("Namaste", "Hello", ...)
 *  Phase 2 — per-letter reveal of "SRICHARAN AITHARAJU"
 *  Phase 3 — lift + dissolve, then the portfolio reveals.
 * Self-contained: all styles inline / in a local <style> tag.
 */

const GREETINGS = [
  "नमस्ते",
  "Hello",
  "నమస్కారం",
  "Bonjour",
  "こんにちは",
  "Hola",
  "Namaste",
];

const GREETING_MS = 300;
const NAME = "SRICHARAN AITHARAJU";

export function NameIntro() {
  const [mounted, setMounted] = useState(true);
  const [phase, setPhase] = useState<"greet" | "name" | "out">("greet");
  const [gi, setGi] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setMounted(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-splash-reveal", "");
    styleEl.textContent = `
      @keyframes splashPageReveal {
        0%   { opacity: 0; transform: translateY(16px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      body.splash-revealing > * {
        animation: splashPageReveal 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
    `;
    document.head.appendChild(styleEl);

    const timers: number[] = [];

    // Greeting cycle
    GREETINGS.forEach((_, idx) => {
      if (idx === 0) return;
      timers.push(window.setTimeout(() => setGi(idx), idx * GREETING_MS));
    });

    const greetEnd = GREETINGS.length * GREETING_MS;
    const nameDuration = 2400;

    timers.push(window.setTimeout(() => setPhase("name"), greetEnd));
    timers.push(window.setTimeout(() => setPhase("out"), greetEnd + nameDuration));
    timers.push(
      window.setTimeout(() => {
        setMounted(false);
        document.body.style.overflow = "";
        document.body.classList.add("splash-revealing");
        window.setTimeout(() => {
          document.body.classList.remove("splash-revealing");
          styleEl.remove();
        }, 750);
      }, greetEnd + nameDuration + 800),
    );

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
      document.body.classList.remove("splash-revealing");
      styleEl.remove();
    };
  }, []);

  if (!mounted) return null;

  const letters = NAME.split("");

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
        overflow: "hidden",
        animation:
          phase === "out"
            ? "splashCurtain 800ms cubic-bezier(0.6,0.05,0.4,1) both"
            : undefined,
      }}
    >
      <style>{`
        @keyframes splashGreetIn {
          0%   { opacity: 0; transform: translateY(14px) scale(0.97); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes splashLetterIn {
          0%   { opacity: 0; transform: translateY(46px) rotateX(-80deg) scale(1.25); filter: blur(10px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) rotateX(0deg) scale(1); filter: blur(0); }
        }
        @keyframes splashLineGrow {
          0%   { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes splashSweep {
          0%   { left: -40%; opacity: 0; }
          20%  { opacity: 1; }
          100% { left: 140%; opacity: 0; }
        }
        @keyframes splashCurtain {
          0%   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
          100% { opacity: 0; transform: translateY(-40px) scale(1.04); filter: blur(8px); }
        }
        @keyframes splashHalo {
          0%, 100% { opacity: 0.45; }
          50%      { opacity: 0.9; }
        }
      `}</style>

      {/* ambient halo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,194,255,0.10), transparent 62%)",
          animation: "splashHalo 4s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {phase === "greet" ? (
        <div
          key={gi}
          style={{
            fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
            fontWeight: 600,
            fontSize: "clamp(2rem, 7vw, 4.5rem)",
            color: "#ffffff",
            letterSpacing: "0.02em",
            textAlign: "center",
            padding: "0 1rem",
            animation: "splashGreetIn 260ms cubic-bezier(0.22,1,0.36,1) both",
          }}
        >
          {GREETINGS[gi]}
        </div>
      ) : (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.1rem",
            perspective: "900px",
            padding: "0 1rem",
          }}
        >
          <h1
            style={{
              margin: 0,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
              fontWeight: 800,
              fontSize: "clamp(1.9rem, 8.5vw, 6.5rem)",
              letterSpacing: "0.08em",
              lineHeight: 1.1,
              color: "#ffffff",
              transformStyle: "preserve-3d",
            }}
          >
            {letters.map((ch, i) => (
              <span
                key={`${ch}-${i}`}
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  animation: `splashLetterIn 700ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms both`,
                  willChange: "transform, opacity, filter",
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h1>

          <div
            style={{
              position: "relative",
              width: "min(70vw, 420px)",
              height: 2,
              background:
                "linear-gradient(90deg, transparent, rgba(0,194,255,0.9), transparent)",
              transformOrigin: "center",
              animation: `splashLineGrow 700ms cubic-bezier(0.22,1,0.36,1) ${letters.length * 55 + 120}ms both`,
              overflow: "hidden",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 0,
                width: "40%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, #ffffff, transparent)",
                animation: `splashSweep 1200ms ease-in-out ${letters.length * 55 + 400}ms both`,
              }}
            />
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
}
