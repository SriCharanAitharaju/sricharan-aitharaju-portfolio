import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

/* ------- prefers-reduced-motion + coarse-pointer hooks ------- */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const u = () => setReduced(m.matches);
    u();
    m.addEventListener("change", u);
    return () => m.removeEventListener("change", u);
  }, []);
  return reduced;
}

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(pointer: coarse)");
    const u = () => setCoarse(m.matches);
    u();
    m.addEventListener("change", u);
    return () => m.removeEventListener("change", u);
  }, []);
  return coarse;
}

/* ------- 3D Tilt card ------- */
export function TiltCard({
  children,
  className = "",
  glare = true,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  glare?: boolean;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const enabled = !reduced && !coarse;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const onMove = (e: PointerEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const rx = (0.5 - y) * max * 2;
        const ry = (x - 0.5) * max * 2;
        el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
        el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
        el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        el.style.setProperty("--active", "1");
      });
    };
    const onLeave = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--active", "0");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, max]);

  const style: CSSProperties = {
    transform: enabled
      ? "perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(0)"
      : undefined,
    transformStyle: "preserve-3d",
    transition: "transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1)",
    willChange: enabled ? "transform" : undefined,
  };

  return (
    <div ref={ref} className={`tilt-card relative ${className}`} style={style}>
      {children}
      {enabled && glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), color-mix(in oklch, var(--cyan-glow) 22%, transparent), transparent 55%)",
            opacity: "calc(var(--active, 0) * 0.9)",
            transition: "opacity 250ms ease",
            mixBlendMode: "screen",
          }}
        />
      )}
    </div>
  );
}

/* ------- Hero parallax wrapper (mouse-following depth) ------- */
export function ParallaxLayer({
  children,
  depth = 12,
  className = "",
}: {
  children: ReactNode;
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const enabled = !reduced && !coarse;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * depth;
        const y = (e.clientY / window.innerHeight - 0.5) * depth;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [depth, enabled]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: "transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1)", willChange: "transform" }}
    >
      {children}
    </div>
  );
}

/* ------- Neural network canvas background ------- */
export function NeuralBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // density scales with area; cap for perf
      const target = Math.min(70, Math.max(28, Math.floor((w * h) / 22000)));
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let running = true;
    const io = new IntersectionObserver(([e]) => (running = e.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(canvas);

    // mouse
    let mx = -9999;
    let my = -9999;
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const linkDist = 130;
    const draw = () => {
      if (!running) {
        raf = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            const o = 1 - d / linkDist;
            ctx.strokeStyle = `oklch(0.78 0.18 220 / ${(o * 0.28).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // node
        const n = nodes[i];
        const dxm = n.x - mx;
        const dym = n.y - my;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        const boost = dm < 140 ? 1 - dm / 140 : 0;
        ctx.fillStyle = `oklch(0.78 0.18 220 / ${(0.45 + boost * 0.5).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6 + boost * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
