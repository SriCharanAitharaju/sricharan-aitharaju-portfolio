/**
 * Decorative animated SVG graphics for the hero background.
 * Represents a student's engineering journey: graduation cap,
 * college building, books, ball, papers, lightbulb, chip, stars.
 * All elements are semi-transparent and looped via CSS keyframes.
 */
export function HeroGraphics() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* College building silhouette - left */}
      <svg
        className="absolute bottom-0 left-0 hidden h-40 w-64 opacity-[0.18] sm:block"
        viewBox="0 0 200 120"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="1.2" className="text-primary">
          <rect x="20" y="50" width="160" height="65" fill="currentColor" fillOpacity="0.08" />
          <polygon points="20,50 100,18 180,50" fill="currentColor" fillOpacity="0.08" />
          <rect x="95" y="0" width="10" height="22" fill="currentColor" fillOpacity="0.15" />
          <circle cx="100" cy="2" r="2" fill="currentColor" />
          <rect x="35" y="65" width="14" height="18" />
          <rect x="60" y="65" width="14" height="18" />
          <rect x="85" y="65" width="14" height="18" />
          <rect x="110" y="65" width="14" height="18" />
          <rect x="135" y="65" width="14" height="18" />
          <rect x="92" y="92" width="16" height="23" fill="currentColor" fillOpacity="0.2" />
        </g>
      </svg>

      {/* Graduation cap - bobs */}
      <svg
        className="hero-float absolute right-[8%] top-[14%] h-16 w-16 opacity-[0.28] sm:h-24 sm:w-24"
        viewBox="0 0 64 64"
        style={{ animationDuration: "5s" }}
      >
        <g className="text-primary" fill="currentColor">
          <polygon points="32,12 60,22 32,32 4,22" />
          <path d="M14 26 L14 38 Q32 48 50 38 L50 26 L32 33 Z" fillOpacity="0.55" />
          <line x1="58" y1="22" x2="58" y2="36" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="58" cy="38" r="2.4" />
        </g>
      </svg>

      {/* Stacked books - wiggle */}
      <svg
        className="hero-wiggle absolute bottom-[14%] right-[12%] h-16 w-20 opacity-[0.25] sm:h-24 sm:w-28"
        viewBox="0 0 80 60"
      >
        <g className="text-primary" fill="currentColor">
          <rect x="6" y="40" width="68" height="12" rx="1.5" fillOpacity="0.55" />
          <rect x="10" y="26" width="58" height="12" rx="1.5" fillOpacity="0.4" transform="rotate(-3 39 32)" />
          <rect x="12" y="12" width="50" height="12" rx="1.5" fillOpacity="0.7" transform="rotate(2 37 18)" />
        </g>
      </svg>

      {/* Football - bounce */}
      <svg
        className="hero-bounce absolute bottom-[8%] left-[18%] h-10 w-10 opacity-[0.25] sm:h-14 sm:w-14"
        viewBox="0 0 40 40"
      >
        <g className="text-primary">
          <circle cx="20" cy="20" r="14" fill="currentColor" fillOpacity="0.35" />
          <polygon points="20,12 25,16 23,22 17,22 15,16" fill="currentColor" fillOpacity="0.7" />
          <path d="M20 6 L20 12 M28 14 L25 16 M12 14 L15 16 M17 22 L13 28 M23 22 L27 28" stroke="currentColor" strokeWidth="1" fill="none" />
        </g>
      </svg>

      {/* Floating papers */}
      <svg
        className="hero-drift absolute left-[10%] top-[28%] h-10 w-8 opacity-[0.22] sm:h-14 sm:w-12"
        viewBox="0 0 32 40"
        style={{ animationDuration: "9s" }}
      >
        <g className="text-primary" fill="currentColor">
          <path d="M4 4 H22 L28 10 V36 H4 Z" fillOpacity="0.35" />
          <path d="M22 4 V10 H28" stroke="currentColor" strokeWidth="1" fill="none" />
          <line x1="8" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth="0.8" />
          <line x1="8" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="0.8" />
          <line x1="8" y1="24" x2="18" y2="24" stroke="currentColor" strokeWidth="0.8" />
        </g>
      </svg>
      <svg
        className="hero-drift absolute right-[20%] top-[40%] h-9 w-7 opacity-[0.2] sm:h-12 sm:w-10"
        viewBox="0 0 32 40"
        style={{ animationDuration: "11s", animationDelay: "1.5s" }}
      >
        <g className="text-primary" fill="currentColor">
          <path d="M4 4 H22 L28 10 V36 H4 Z" fillOpacity="0.35" />
          <line x1="8" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth="0.8" />
          <line x1="8" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="0.8" />
        </g>
      </svg>

      {/* Lightbulb - pulse glow */}
      <svg
        className="hero-glow absolute left-[42%] top-[12%] h-12 w-12 opacity-[0.3] sm:h-16 sm:w-16"
        viewBox="0 0 48 48"
      >
        <g className="text-primary" fill="currentColor">
          <path d="M24 6 a14 14 0 0 1 8 25 v4 H16 v-4 a14 14 0 0 1 8 -25 z" fillOpacity="0.4" />
          <rect x="18" y="36" width="12" height="3" rx="1" />
          <rect x="20" y="40" width="8" height="3" rx="1" />
          <path d="M24 14 v14 M19 22 l10 0" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7" />
        </g>
      </svg>

      {/* Circuit/chip - rotate */}
      <svg
        className="hero-spin absolute bottom-[28%] left-[6%] h-14 w-14 opacity-[0.22] sm:h-20 sm:w-20"
        viewBox="0 0 64 64"
      >
        <g className="text-primary" stroke="currentColor" strokeWidth="1.2" fill="none">
          <rect x="18" y="18" width="28" height="28" rx="2" fill="currentColor" fillOpacity="0.18" />
          <rect x="26" y="26" width="12" height="12" />
          {[22, 30, 38].map((p) => (
            <g key={p}>
              <line x1={p} y1="18" x2={p} y2="10" />
              <line x1={p} y1="46" x2={p} y2="54" />
              <line x1="18" y1={p} x2="10" y2={p} />
              <line x1="46" y1={p} x2="54" y2={p} />
            </g>
          ))}
        </g>
      </svg>

      {/* Twinkling stars */}
      {[
        { top: "8%", left: "20%", d: "2.2s", delay: "0s" },
        { top: "18%", left: "70%", d: "3s", delay: "0.6s" },
        { top: "55%", left: "85%", d: "2.6s", delay: "1.1s" },
        { top: "70%", left: "30%", d: "3.4s", delay: "0.3s" },
        { top: "35%", left: "55%", d: "2.4s", delay: "1.4s" },
        { top: "78%", left: "62%", d: "2.8s", delay: "0.8s" },
      ].map((s, i) => (
        <span
          key={i}
          className="hero-twinkle absolute h-1 w-1 rounded-full bg-primary"
          style={{
            top: s.top,
            left: s.left,
            animationDuration: s.d,
            animationDelay: s.delay,
            boxShadow: "0 0 8px 1px var(--cyan-glow)",
          }}
        />
      ))}
    </div>
  );
}
