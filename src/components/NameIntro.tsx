import { useEffect, useState } from "react";

/**
 * Cinematic opening: full name "AITHARAJU SRICHARAN" reveal.
 * Step 1: AITHARAJU letters fly up. Step 2: SRICHARAN letters fly up.
 * Step 3: shimmer sweep across both. Step 4: zoom-blur dissolve.
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

    const t1 = setTimeout(() => setPhase("out"), 4200);
    const t2 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 5100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted || phase === "done") return null;

  const first = "AITHARAJU";
  const last = "SRICHARAN";
  const firstBase = 0;
  const stepMs = 50;
  const lastBase = 1500;

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-background transition-opacity duration-[800ms] ${
        phase === "out" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 intro-radial" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="intro-scan absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_24px_4px_hsl(var(--primary)/0.35)]" />
      </div>

      <div
        className={`relative w-full max-w-[100vw] px-4 text-center ${
          phase === "out" ? "intro-zoom-out" : ""
        }`}
      >
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.5em] text-primary/80 intro-fade-in-up">
          // initializing portfolio
        </div>

        <h1
          className="name-shimmer font-extrabold leading-[1.02] tracking-[0.04em] name-orbitron"
          style={{ fontSize: "clamp(2.25rem, 11vw, 8rem)" }}
        >
          <span className="block whitespace-nowrap name-gradient">
            {first.split("").map((c, i) => (
              <span
                key={`f${i}`}
                className="inline-block intro-letter-spring"
                style={{ animationDelay: `${firstBase + i * stepMs}ms` }}
              >
                {c}
              </span>
            ))}
          </span>
          <span className="mt-1 block whitespace-nowrap name-gradient sm:mt-2">
            {last.split("").map((c, i) => (
              <span
                key={`l${i}`}
                className="inline-block intro-letter-spring"
                style={{ animationDelay: `${lastBase + i * stepMs}ms` }}
              >
                {c}
              </span>
            ))}
          </span>
        </h1>

        <div
          className="mx-auto mt-6 h-[2px] w-0 bg-gradient-to-r from-transparent via-primary to-transparent intro-line"
          style={{ animationDelay: `2900ms` }}
        />
        <div
          className="mt-5 font-mono text-[10px] tracking-[0.35em] text-muted-foreground intro-fade-in-up sm:text-xs"
          style={{ animationDelay: `3000ms` }}
        >
          ECE · VLSI · EMBEDDED
        </div>
      </div>
    </div>
  );
}
