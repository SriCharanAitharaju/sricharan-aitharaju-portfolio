import { useEffect, useState } from "react";

/**
 * Premium cinematic splash: "SRICHARAN AITHARAJU" fades in with blur-to-sharp
 * and gentle scale, then lifts and dissolves into the home page.
 * Shows once per browser session. Respects prefers-reduced-motion.
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

    const t1 = setTimeout(() => setPhase("out"), 2000);
    const t2 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 2900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted || phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-black transition-opacity duration-[800ms] ease-[cubic-bezier(.6,.05,.4,1)] ${
        phase === "out" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      {/* subtle ambient gradient */}
      <div className="pointer-events-none absolute inset-0 splash-ambient" />

      <h1
        className={`splash-name relative px-6 text-center font-display font-bold uppercase text-white ${
          phase === "out" ? "splash-out" : "splash-in"
        }`}
        style={{
          fontSize: "clamp(1.75rem, 7vw, 5.5rem)",
          letterSpacing: "0.18em",
          lineHeight: 1.1,
        }}
      >
        Sricharan Aitharaju
      </h1>
    </div>
  );
}
