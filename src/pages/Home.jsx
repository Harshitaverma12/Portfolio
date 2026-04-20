import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useScrollAnimation,
  useCounterAnimation,
} from "../hooks/useScrollAnimation";
import "./Home.css";

const MARQUEE_ITEMS = [
  "React.js",
  "JavaScript ES6+",
  "Next.js",
  "Redux",
  "Ant Design",
  "Tailwind CSS",
  "Material UI",
  "AG-Grid",
  "Recharts",
  "HighCharts",
  "Node.js",
  "REST APIs",
  "Socket.io",
  "Figma",
  "CI/CD",
];

const FEATURED_PROJECTS = [
  {
    id: "01",
    cat: "HR Tech",
    title: "Employee Management System",
    desc: "Scalable PMS with multi-level appraisal workflows, KRA goal tracking, Redux state management, and approval dashboards for 150+ employees.",
    stack: ["React", "Redux", "Ant Design"],
    tagStyle: ["ptr", "ptv", "ptt"],
    slug: "ems",
    thumb: "thumb-analytics",
  },
  {
    id: "02",
    cat: "Finance",
    title: "PO Approval System",
    desc: "Purchase Order portal with approve/reject/delegate workflows, animated dashboards, audit trail, and JWT-based session management.",
    stack: ["React", "Ant Design", "Tailwind"],
    tagStyle: ["ptv", "ptn", "ptr"],
    slug: "po-approval",
    thumb: "thumb-task",
  },
  {
    id: "03",
    cat: "Analytics",
    title: "Managed Services Dashboard",
    desc: "Real-time network monitoring dashboard with role-based access for 4 user types, Recharts visualizations, and Excel/PDF export.",
    stack: ["React", "Recharts", "Ant Design"],
    tagStyle: ["ptr", "ptv", "ptt"],
    slug: "managed-services",
    thumb: "thumb-analytics",
  },
  {
    id: "04",
    cat: "HR Tech",
    title: "Attendance Application",
    desc: "Digitized attendance with real-time check-in/check-out, selfie verification, JWT auth, leave management, and Excel export for payroll.",
    stack: ["React", "Ant Design", "Axios"],
    tagStyle: ["ptn", "ptr", "ptt"],
    slug: "attendance",
    thumb: "thumb-ecom",
  },
];

function ProjectCard({ project, delay }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting)
          setTimeout(() => el.classList.add("visible"), delay);
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <article
      ref={ref}
      className="pcard fade-up"
      onClick={() => navigate(`/work/${project.slug}`)}
      data-hover="true"
    >
      <div className={`pthumb ${project.thumb}`}>
        {project.thumb === "thumb-analytics" && <AnalyticsThumb />}
        {project.thumb === "thumb-ecom" && <EcomThumb />}
        {project.thumb === "thumb-task" && <TaskThumb />}
      </div>
      <div className="pinfo">
        <div className="pnum">
          {project.id} — {project.cat}
        </div>
        <h3 className="ptit">{project.title}</h3>
        <p className="pdesc">{project.desc}</p>
        <div className="pfoot">
          <div className="pstack">
            {project.stack.map((s, i) => (
              <span key={s} className={`ptag ${project.tagStyle[i]}`}>
                {s}
              </span>
            ))}
          </div>
          <span className="plink">View case →</span>
        </div>
      </div>
    </article>
  );
}

function AnalyticsThumb() {
  return (
    <div className="mock-browser">
      <div className="mock-winbar">
        <span className="wd wr" />
        <span className="wd wy" />
        <span className="wd wg" />
      </div>
      <div className="mock-body">
        <div className="mock-line accent-line" />
        <div className="mock-line" style={{ width: "80%" }} />
        <div className="mock-chart">
          {[55, 80, 45, 100, 70, 60, 90].map((h, i) => (
            <div
              key={i}
              className="mock-bar-col"
              style={{
                height: `${h}%`,
                background:
                  i % 2 === 0
                    ? "rgba(124,109,250,0.35)"
                    : "rgba(255,95,143,0.28)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function EcomThumb() {
  return (
    <div className="ecom-mock">
      <div className="ecom-brand">attend.</div>
      <div className="ecom-cards">
        {[0.12, 0.08, 0.05].map((o, i) => (
          <div
            key={i}
            className="ecom-card"
            style={{
              background: `rgba(63,255,210,${o})`,
              borderColor: `rgba(63,255,210,${o + 0.08})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
function TaskThumb() {
  const tasks = [
    { label: "PO Approval pending", color: "rgba(124,109,250,0.55)" },
    { label: "Finance review", color: "rgba(63,255,210,0.55)" },
    { label: "Auto-approved", color: "rgba(255,95,143,0.55)" },
  ];
  return (
    <div className="task-mock">
      <div className="task-header">PO BOARD</div>
      <div className="task-list">
        {tasks.map((t) => (
          <div
            key={t.label}
            className="task-item"
            style={{ borderLeftColor: t.color }}
          >
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const projRef = useScrollAnimation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-ping" />
            <span className="badge-text">Open to opportunities</span>
          </div>
          <h1 className="hero-h1">
            <span className="h1-line">
              <span className="h1-word">Building</span>
            </span>
            <span className="h1-line">
              <span className="h1-word outline-text">Scalable</span>
            </span>
            <span className="h1-line">
              <span className="h1-word grad-text">Experiences</span>
            </span>
          </h1>
          <p className="hero-sub">
            Frontend Software Engineer with 3 years of experience architecting
            React.js applications, designing reusable component libraries, and
            delivering high-impact user experiences across enterprise products.
          </p>
          <div className="hero-btns">
            <Link to="/work" className="btn-glow">
              View my work
            </Link>
            <a
              href="/resume.pdf"
              download="Harshita_Verma_Resume.pdf"
              className="btn-outline"
            >
              ↓ Download CV
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-num">3yr</div>
              <div className="stat-label">Experience</div>
            </div>
            <div>
              <div className="stat-num">11+</div>
              <div className="stat-label">Projects shipped</div>
            </div>
            <div>
              <div className="stat-num">70%</div>
              <div className="stat-label">Error reduction</div>
            </div>
          </div>
          <div className="scroll-hint">
            <div className="scroll-line" />
            <span className="scroll-text">scroll</span>
          </div>
        </div>

        <div className="hero-right">
          <div className="code-window">
            <div className="win-bar">
              <span className="wd wr" />
              <span className="wd wy" />
              <span className="wd wg" />
              <span className="win-title">Portfolio.tsx</span>
            </div>
            <pre className="code-body">
              <span className="ck">const </span>
              <span className="cf">Harshita</span>
              <span className="co"> = </span>(){" "}
              <span className="co">=&gt;</span> {"{"}
              {"\n"} <span className="ck">const </span>role{" "}
              <span className="co">=</span>{" "}
              <span className="cs">"Frontend Engineer"</span>;{"\n"}{" "}
              <span className="ck">const </span>exp{" "}
              <span className="co">=</span>{" "}
              <span className="cs">"3 years"</span>;{"\n"}{" "}
              <span className="ck">const </span>projects{" "}
              <span className="co">=</span> <span className="cn">11</span>;
              {"\n"}
              {"\n"} <span className="cc">{"// Passion for great UX"}</span>
              {"\n"} <span className="ck">return</span> ({"\n"}{" "}
              <span className="co">&lt;</span>
              <span className="cf">Developer</span>
              {"\n"} stack<span className="co">=</span>
              {"{["}
              <span className="cs">"React"</span>,{" "}
              <span className="cs">"Next.js"</span>
              {"]}"}
              {"\n"} coffee<span className="co">=</span>
              <span className="cs">"unlimited"</span>
              {"\n"} <span className="co">/&gt;</span>
              {"\n"} );
              {"\n"}
              {"}"}
              <span className="type-cursor" />
            </pre>
          </div>
          <div className="fbadge fb1">
            <div className="fb-icon fbi-g">◆</div>
            <div>
              <div className="fb-name">Performance</div>
              <div className="fb-sub" style={{ color: "var(--accent3)" }}>
                60% faster systems
              </div>
            </div>
          </div>
          <div className="fbadge fb2">
            <div className="fb-icon fbi-p">⬡</div>
            <div>
              <div className="fb-name">React Expert</div>
              <div className="fb-sub">3+ years</div>
            </div>
          </div>
          <div className="fbadge fb3">
            <div className="fb-icon fbi-y">★</div>
            <div>
              <div className="fb-name">MCA Graduate</div>
              <div className="fb-sub" style={{ color: "var(--accent4)" }}>
                Christ University
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="m-item">
              <span className="m-icon">◈</span>
              {item}
              <span className="m-sep">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* FEATURED PROJECTS */}
      <section className="section-container fade-up" ref={projRef}>
        <div className="section-tag">Portfolio</div>
        <h2 className="section-title">Featured Work</h2>
        <p className="section-sub">
          A selection of projects across HR tech, analytics, finance, and
          logistics — all shipped in production.
        </p>
        <div className="proj-grid">
          {FEATURED_PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 150} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/work" className="btn-glow">
            See all 11 projects →
          </Link>
        </div>
      </section>
    </main>
  );
}
