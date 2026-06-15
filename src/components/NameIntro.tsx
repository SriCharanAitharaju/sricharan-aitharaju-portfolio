import { useEffect, useState } from "react";

/**
 * Cinematic opening: letter-by-letter reveal of "Sricharan Aitharaju"
 * with scan-line sweep, glitch flash, then a smooth dissolve.
 * Shows once per browser session.
 */
export function NameIntro() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("introPlayed") === "1") return;
    sessionStorage.setItem("introPlayed", "1");
    setMounted(true);
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setPhase("out"), 3400);
    const t2 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 4300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted || phase === "done") return null;

  const first = "AITHARAJU";
  const last = "SRICHARAN";

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-[900ms] ${
        phase === "out" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      {/* radial pulse */}
      <div className="pointer-events-none absolute inset-0 intro-radial" />
      {/* grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* scan sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="intro-scan absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_24px_4px_hsl(var(--primary)/0.35)]" />
      </div>

      <div
        className={`relative px-6 text-center ${
          phase === "out" ? "intro-zoom-out" : ""
        }`}
      >
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.5em] text-primary/80 intro-fade-in-up">
          // initializing portfolio
        </div>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-[0.04em] sm:text-7xl md:text-8xl">
          <span className="relative inline-block name-shimmer">
            <span className="block">
              {first.split("").map((c, i) => (
                <span
                  key={`f${i}`}
                  className="inline-block intro-letter text-foreground"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  {c}
                </span>
              ))}
            </span>
            <span className="mt-2 block text-gradient-animated">
              {last.split("").map((c, i) => (
                <span
                  key={`l${i}`}
                  className="inline-block intro-letter"
                  style={{ animationDelay: `${700 + i * 70}ms` }}
                >
                  {c}
                </span>
              ))}
            </span>
          </span>
        </h1>
        <div
          className="mx-auto mt-8 h-[2px] w-0 bg-gradient-to-r from-transparent via-primary to-transparent intro-line"
        />
        <div
          className="mt-5 font-mono text-xs tracking-[0.35em] text-muted-foreground intro-fade-in-up"
          style={{ animationDelay: "1700ms" }}
        >
          ECE · VLSI · EMBEDDED
        </div>
      </div>
    </div>
  );
}
