import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Menu,
  X,
  Download,
  ArrowRight,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Cpu,
  Code2,
  Wrench,
  Radio,
  Zap,
  ExternalLink,
  Award,
  GraduationCap,
  Briefcase,
  Send,
  Sparkles,
} from "lucide-react";
import portraitAsset from "@/assets/sricharan-profile-new.jpeg.asset.json";
import { ChatWidget } from "@/components/ChatWidget";
const resumeUrl = "https://drive.google.com/uc?export=download&id=18L5R-_1OxvgTEOU9W3VUulsKE48Iwsqp";
const portrait = portraitAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sricharan Aitharaju — ECE & VLSI Engineer" },
      {
        name: "description",
        content:
          "ECE student at Anurag University building at the intersection of VLSI design, embedded systems, and IoT.",
      },
      { property: "og:title", content: "Sricharan Aitharaju — ECE & VLSI Engineer" },
      {
        property: "og:description",
        content: "Building at the intersection of hardware and intelligence.",
      },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const TITLES = [
  "VLSI Enthusiast",
  "ELECTRONICS AND COMMUNICATION ENGINEERING STUDENT",
  "EMBEDDED SYSTEMS LEARNER",
];

function useTypewriter(words: string[], speed = 80, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) setTimeout(() => setDel(true), pause);
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDel(false);
            setI((v) => v + 1);
          }
        }
      },
      del ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);

  return text;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const typed = useTypewriter(TITLES);
  const active = useActiveSection(NAV.map((n) => n.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        active={active}
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goTo={goTo}
      />
      <Hero typed={typed} goTo={goTo} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Education />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
}

/* -------------------- NAVBAR -------------------- */
function Navbar({
  active,
  scrolled,
  menuOpen,
  setMenuOpen,
  goTo,
}: {
  active: string;
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  goTo: (id: string) => void;
}) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card border-b" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button onClick={() => goTo("home")} className="flex items-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">Sricharan<span className="text-primary">.</span></span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => goTo(n.id)}
              className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active === n.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
              {active === n.id && (
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={resumeUrl}
            download
            className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:inline-flex"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="glass-card border-t lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => goTo(n.id)}
                className={`rounded-md px-3 py-2 text-left text-sm font-medium ${
                  active === n.id ? "bg-primary/10 text-primary" : "text-foreground/80"
                }`}
              >
                {n.label}
              </button>
            ))}
            <a
              href={resumeUrl}
              download
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* -------------------- HERO -------------------- */
function Hero({ typed, goTo }: { typed: string; goTo: (id: string) => void }) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-[1.3fr_1fr]">
        <div className="animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Open to VLSI & ECE Internships
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Sricharan
            <br />
            <span className="text-gradient">Aitharaju</span>
          </h1>
          <div className="mt-6 flex h-8 items-center text-xl font-medium text-foreground/80 sm:text-2xl">
            <span>{typed}</span>
            <span className="caret" />
          </div>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Building at the intersection of hardware and intelligence — from RTL design to
            real-world sensor systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => goTo("projects")}
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>
          <div className="mt-10 flex items-center gap-4">
            {[
              { Icon: Linkedin, href: "https://linkedin.com/in/sricharan-aitharaju", label: "LinkedIn" },
              { Icon: Github, href: "https://github.com/", label: "GitHub" },
              { Icon: Mail, href: "mailto:sricharanaitharaju@gmail.com", label: "Email" },
              { Icon: Phone, href: "tel:+919059071512", label: "Phone" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground transition hover:border-primary/60 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="animate-pulse-glow relative aspect-square overflow-hidden rounded-3xl border border-primary/30">
            <img
              src={portrait}
              alt="Sricharan Aitharaju portrait"
              width={768}
              height={768}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          <div className="glass-card absolute -bottom-6 -left-6 rounded-xl px-4 py-3 text-xs">
            <div className="font-mono text-primary">~ B.Tech ECE</div>
            <div className="text-muted-foreground">Anurag University · 2024–28</div>
          </div>
          <div className="glass-card absolute -right-4 top-8 rounded-xl px-4 py-3 text-xs">
            <div className="font-mono text-primary">CGPA</div>
            <div className="text-lg font-bold">8.25</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- SECTION HELPERS -------------------- */
function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-12 text-center">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        {kicker}
      </div>
      <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
  );
}

/* -------------------- ABOUT -------------------- */
function About() {
  const stats = [
    { label: "CGPA", value: "8.25" },
    { label: "JEE Advanced", value: "Qualified" },
    { label: "SIH 2025", value: "Selected" },
    { label: "Projects", value: "4" },
  ];
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionTitle kicker="01 — About Me" title="Hardware × Software" />
      </Reveal>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[auto_1fr]">
        <Reveal>
          <div className="relative mx-auto h-56 w-56 sm:h-64 sm:w-64">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/40 to-transparent blur-2xl" />
            <div className="glow-border relative h-full w-full overflow-hidden rounded-full">
              <img
                src={portrait}
                alt="Sricharan"
                loading="lazy"
                width={512}
                height={512}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <p className="text-lg leading-relaxed text-foreground/85">
              I'm <span className="font-semibold text-primary">Sricharan</span>, an ECE student
              at Anurag University with a passion for VLSI design, embedded systems, and IoT. I
              work with tools like Verilog, Cadence, MATLAB, Arduino, and ESP32. I thrive at the
              hardware-software boundary — from RTL design to real-world sensor systems.
              Currently seeking internship opportunities in VLSI and semiconductor design.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass-card hover-lift rounded-full px-5 py-2.5 text-sm"
                >
                  <span className="text-muted-foreground">{s.label}:</span>{" "}
                  <span className="font-semibold text-primary">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- SKILLS -------------------- */
function Skills() {
  const groups = [
    {
      icon: Cpu,
      title: "VLSI & Digital Design",
      skills: [
        "Verilog HDL",
        "RTL Design",
        "Digital Logic",
        "FSM Design",
        "FPGA (Vivado)",
        "Combinational & Sequential Circuits",
      ],
    },
    {
      icon: Wrench,
      title: "EDA Tools",
      skills: ["Cadence", "Xilinx Vivado", "Multisim"],
    },
    {
      icon: Code2,
      title: "Programming",
      skills: ["C", "Java", "Python"],
    },
    {
      icon: Radio,
      title: "Embedded & IoT",
      skills: ["Arduino", "ESP32", "Sensor Interfacing"],
    },
    {
      icon: Zap,
      title: "Core Electronics",
      skills: [
        "Semiconductor Fundamentals",
        "CMOS Basics",
        "Circuit Design",
        "Setup/Hold Timing",
      ],
    },
  ];

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionTitle kicker="02 — Skills" title="Technical Arsenal" />
      </Reveal>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 80}>
            <div className="glass-card hover-lift h-full rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                  <g.icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold">{g.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-background/40 px-3 py-1 text-xs text-foreground/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------- PROJECTS -------------------- */
function Projects() {
  const projects = [
    {
      title: "JalNetra: Smart Water Monitoring System",
      tags: ["Arduino", "IoT", "Sensors", "SIH 2025"],
      points: [
        "Real-time water quality, flow & usage monitoring system",
        "Threshold detection and alert mechanisms",
        "Selected for Smart India Hackathon 2025",
      ],
    },
    {
      title: "Smart Railway Track Crack Detection System",
      url: "https://github.com/SriCharanAitharaju/Railwaytrack-Crack-Detection-System-Using-TinkerCad",
      tags: ["Arduino", "IR Sensors", "Embedded Systems"],
      points: [
        "IR sensor-based prototype for real-time fault detection",
        "Alert mechanism for safety-critical railway monitoring",
        "Simulated real-world railway conditions",
      ],
    },
    {
      title: "Fingerprint Quality Estimator",
      tags: ["MATLAB", "Image Processing", "Biometrics"],
      points: [
        "Image processing model to evaluate fingerprint clarity",
        "Identifies low-quality inputs to improve biometric reliability",
        "Applied signal processing and algorithm-based evaluation",
      ],
    },
    {
      title: "Hardware-Accelerated Edge-AI Plant Stress Monitor",
      tags: ["Verilog RTL", "Zynq-7000 FPGA", "Vivado"],
      points: [
        "Edge-based plant monitoring using sensor data acquisition",
        "Verilog RTL modules for FPGA data processing",
        "Real-time hardware acceleration on Zynq-7000 PS+PL",
      ],
    },
  ];

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionTitle kicker="03 — Projects" title="Selected Work" />
      </Reveal>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p, i) => {
          const cardBody = (
            <>
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-bold leading-tight">{p.title}</h3>
                  {p.url ? (
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground transition group-hover:border-primary/50 group-hover:text-primary">
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground transition group-hover:border-primary/50 group-hover:text-primary">
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  )}
                </div>
                <div className="mb-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm text-foreground/80">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  {p.url ? (
                    <>View Project <ArrowRight className="h-3 w-3" /></>
                  ) : (
                    <>View Details <ArrowRight className="h-3 w-3" /></>
                  )}
                </div>
              </div>
            </>
          );
          return (
            <Reveal key={p.title} delay={i * 100}>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card hover-lift group relative block h-full overflow-hidden rounded-2xl p-7"
                >
                  {cardBody}
                </a>
              ) : (
                <article className="glass-card hover-lift group relative h-full overflow-hidden rounded-2xl p-7">
                  {cardBody}
                </article>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------- EXPERIENCE -------------------- */
function Experience() {
  const items = [
    {
      role: "Joint Secretary",
      org: "Kriya — Event Management Club, Anurag University",
      period: "March 2026 – Present",
      desc: "Led execution of university events, coordinating teams and managing large-scale operations.",
    },
    {
      role: "Member",
      org: "VLSI Club, Anurag University",
      period: "2025 – Present",
      desc: "Engaged in RTL design workshops and FPGA-based project workflows.",
    },
    {
      role: "Member",
      org: "NSS — National Service Scheme",
      period: "2025 – Present",
      desc: "Participated in community service and social impact initiatives.",
    },
  ];
  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionTitle kicker="04 — Experience" title="Leadership & Involvement" />
      </Reveal>
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent sm:left-1/2" />
        <div className="space-y-8">
          {items.map((it, i) => (
            <Reveal key={it.org} delay={i * 80}>
              <div
                className={`relative grid grid-cols-[2rem_1fr] gap-4 sm:grid-cols-2 sm:gap-10 ${
                  i % 2 === 0 ? "" : "sm:[&>*:first-child]:order-2"
                }`}
              >
                <div
                  className={`absolute left-4 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--background))] sm:left-1/2`}
                />
                <div className={`hidden sm:block ${i % 2 === 0 ? "text-right" : ""}`}>
                  <div className="text-sm font-mono text-primary">{it.period}</div>
                </div>
                <div className="glass-card hover-lift rounded-xl p-5">
                  <div className="mb-1 flex items-center gap-2 text-xs sm:hidden">
                    <Briefcase className="h-3.5 w-3.5 text-primary" />
                    <span className="font-mono text-primary">{it.period}</span>
                  </div>
                  <h3 className="font-semibold">{it.role}</h3>
                  <div className="text-sm text-muted-foreground">{it.org}</div>
                  <p className="mt-2 text-sm text-foreground/80">{it.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- ACHIEVEMENTS -------------------- */
function Achievements() {
  const achievements = [
    "Qualified JEE Advanced 2023",
    "Selected for SIH 2025 (JalNetra)",
    "Co-organized Sakshi's Spell Bee & Math Bee 2026",
  ];
  const certs = [
    "Arduino & Embedded Systems Workshop",
    "Cadence EDA Tools Workshop",
  ];

  return (
    <section id="achievements" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionTitle kicker="05 — Recognition" title="Achievements & Certifications" />
      </Reveal>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Reveal>
          <div className="glass-card hover-lift h-full rounded-2xl p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                <Award className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-bold">Achievements</h3>
            </div>
            <ul className="space-y-3">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3 text-foreground/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="glass-card hover-lift h-full rounded-2xl p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                <Sparkles className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-bold">Certifications</h3>
            </div>
            <ul className="space-y-3">
              {certs.map((c) => (
                <li key={c} className="flex gap-3 text-foreground/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- EDUCATION -------------------- */
function Education() {
  const items = [
    {
      title: "B.Tech, Electronics & Communication Engineering",
      org: "Anurag University, Hyderabad",
      period: "2024 – 2028",
      score: "CGPA: 8.25",
    },
    {
      title: "Class XII",
      org: "Nano Junior College, Hyderabad",
      period: "2023",
      score: "80.2%",
    },
    {
      title: "Class X",
      org: "Kamala Memorial High School, Hyderabad",
      period: "2021",
      score: "95%",
    },
  ];
  return (
    <section id="education" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionTitle kicker="06 — Education" title="Academic Background" />
      </Reveal>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 100}>
            <div className="glass-card hover-lift h-full rounded-2xl p-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div className="mt-4 font-mono text-xs text-primary">{it.period}</div>
              <h3 className="mt-1 font-semibold leading-tight">{it.title}</h3>
              <div className="mt-1 text-sm text-muted-foreground">{it.org}</div>
              <div className="mt-4 inline-block rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {it.score}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------- CONTACT -------------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    (e.currentTarget as HTMLFormElement).reset();
  };
  const items = [
    { Icon: Mail, label: "Email", value: "sricharanaitharaju@gmail.com", href: "mailto:sricharanaitharaju@gmail.com" },
    { Icon: Phone, label: "Phone", value: "+91 9059071512", href: "tel:+919059071512" },
    { Icon: Linkedin, label: "LinkedIn", value: "/sricharan-aitharaju", href: "https://linkedin.com/in/sricharan-aitharaju" },
    { Icon: MapPin, label: "Address", value: "Nacharam, Hyderabad", href: "#" },
  ];
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionTitle kicker="07 — Contact" title="Let's Connect" />
      </Reveal>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-4">
            {items.map((it) => (
              <a
                key={it.label}
                href={it.href}
                className="glass-card hover-lift flex items-center gap-4 rounded-xl p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                  <it.Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {it.label}
                  </div>
                  <div className="truncate font-medium">{it.value}</div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <form onSubmit={onSubmit} className="glass-card space-y-4 rounded-2xl p-6 sm:p-8">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Name
              </label>
              <input
                required
                maxLength={100}
                name="name"
                className="w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <input
                required
                type="email"
                maxLength={255}
                name="email"
                className="w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Message
              </label>
              <textarea
                required
                maxLength={1000}
                name="message"
                rows={5}
                className="w-full resize-none rounded-lg border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary"
                placeholder="Tell me about an opportunity, project, or just say hello."
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <Send className="h-4 w-4" />
              {sent ? "Message Sent — Thank you!" : "Send Message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- FOOTER -------------------- */
function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © 2026 Sricharan Aitharaju. Designed with purpose.
        </p>
        <div className="flex items-center gap-3">
          {[
            { Icon: Linkedin, href: "https://linkedin.com/in/sricharan-aitharaju", label: "LinkedIn" },
            { Icon: Github, href: "https://github.com/", label: "GitHub" },
            { Icon: Mail, href: "mailto:sricharanaitharaju@gmail.com", label: "Email" },
            { Icon: Phone, href: "tel:+919059071512", label: "Phone" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary/60 hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
