import { useEffect, useRef, useState } from "react";

/**
 * Cinematic divider between sections: a thin animated scan line
 * with a centered glowing node label that draws in on scroll.
 */
export function SectionTransition({ label }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative mx-auto my-2 flex h-16 max-w-7xl items-center justify-center px-6"
    >
      <div
        className="h-px flex-1 origin-right bg-gradient-to-r from-transparent to-primary/40"
        style={{
          transform: shown ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 900ms cubic-bezier(.2,.8,.2,1)",
        }}
      />
      <div
        className="mx-4 flex items-center gap-2"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 600ms ease 350ms, transform 600ms ease 350ms",
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_16px_2px_hsl(var(--primary)/0.6)]" />
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            {label}
          </span>
        )}
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_16px_2px_hsl(var(--primary)/0.6)]" />
      </div>
      <div
        className="h-px flex-1 origin-left bg-gradient-to-l from-transparent to-primary/40"
        style={{
          transform: shown ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 900ms cubic-bezier(.2,.8,.2,1)",
        }}
      />
    </div>
  );
}
