import React from "react";
import {
  Award,
  BadgeCheck,
  Bot,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Mail,
  Moon,
  Radar,
  Sun,
  UserRound,
} from "lucide-react";
import {
  careerEn,
  careerHighlights,
  copy,
  experienceEn,
  profile,
  profileEn,
  projectEn,
  projects,
  stats,
} from "./data.js";

const SAFE_MAILTO_PATTERN = /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const SAFE_URL_BASE = "https://carpediem324.github.io";

function getSafeHref(href) {
  if (typeof href !== "string") return null;
  const trimmed = href.trim();
  if (trimmed.length === 0) return null;

  if (SAFE_MAILTO_PATTERN.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed, SAFE_URL_BASE);
    if (url.protocol === "https:") return url.href;
  } catch {
    return null;
  }

  return null;
}

function SafeLink({ href, className, children }) {
  const safeHref = getSafeHref(href);
  const isMail = safeHref?.startsWith("mailto:");

  if (!safeHref) {
    return <span className={className}>{children}</span>;
  }

  return (
    <a
      className={className}
      href={safeHref}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      referrerPolicy={isMail ? undefined : "no-referrer"}
    >
      {children}
    </a>
  );
}

function App() {
  const [page, setPage] = React.useState("home");
  const [dark, setDark] = React.useState(false);
  const [lang, setLang] = React.useState("ko");
  const [ripples, setRipples] = React.useState([]);
  const featuredProjects = projects.slice(0, 5);
  const text = copy[lang];

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  React.useEffect(() => {
    const isReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isInteractiveTarget = (target) => target.closest("a, button, input, textarea, select, [role='button']");
    const isGutterPoint = (x) => {
      const shell = document.querySelector(".app-shell");
      const rect = shell?.getBoundingClientRect();
      return Boolean(rect && (x < rect.left || x > rect.right));
    };

    const onMouseDown = (event) => {
      if (event.button !== 0) return;
      if (isInteractiveTarget(event.target)) return;
      if (isGutterPoint(event.clientX)) event.preventDefault();
    };

    const onClick = (event) => {
      if (isReducedMotion()) return;
      if (isInteractiveTarget(event.target)) return;
      if (!isGutterPoint(event.clientX)) return;

      const id = `${Date.now()}-${Math.random()}`;
      const drops = Array.from({ length: 8 }, (_, index) => ({
        angle: index * 45 + Math.random() * 18,
        distance: 28 + Math.random() * 34,
        size: 5 + Math.random() * 5,
      }));

      setRipples((items) => [...items.slice(-4), { id, x: event.clientX, y: event.clientY, drops }]);
      window.setTimeout(() => {
        setRipples((items) => items.filter((item) => item.id !== id));
      }, 900);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <RippleLayer ripples={ripples} />
      <div className="app-shell">
        <Header page={page} setPage={setPage} dark={dark} setDark={setDark} lang={lang} setLang={setLang} text={text} />
        {page === "home" && <Home projects={featuredProjects} setPage={setPage} lang={lang} text={text} />}
        {page === "profile" && <Profile lang={lang} text={text} />}
        {page === "projects" && <Projects projects={projects} lang={lang} text={text} />}
      </div>
    </>
  );
}

function RippleLayer({ ripples }) {
  return (
    <div className="ripple-layer" aria-hidden="true">
      {ripples.map((ripple) => (
        <span className="ripple-pop" key={ripple.id} style={{ left: ripple.x, top: ripple.y }}>
          {ripple.drops.map((drop, index) => (
            <i
              key={index}
              style={{
                "--angle": `${drop.angle}deg`,
                "--distance": `${drop.distance}px`,
                "--drop-size": `${drop.size}px`,
              }}
            ></i>
          ))}
        </span>
      ))}
    </div>
  );
}

function Header({ page, setPage, dark, setDark, lang, setLang, text }) {
  const links = [
    ["home", text.nav.home],
    ["profile", text.nav.profile],
    ["projects", text.nav.projects],
  ];

  return (
    <header className="topbar">
      <button className="brand" onClick={() => setPage("home")} type="button" aria-label="Home">
        <Bot size={22} />
        <span>CARPEDIEM</span>
      </button>
      <nav className="nav-tabs" aria-label="Primary navigation">
        {links.map(([key, label]) => (
          <button className={page === key ? "active" : ""} key={key} onClick={() => setPage(key)} type="button">
            {label}
          </button>
        ))}
      </nav>
      <button className="lang-btn" onClick={() => setLang((value) => (value === "ko" ? "en" : "ko"))} type="button" aria-label="Language toggle">
        <span className={lang === "ko" ? "active" : ""}>한</span>
        <i></i>
        <span className={lang === "en" ? "active" : ""}>EN</span>
      </button>
      <button className="icon-btn" onClick={() => setDark((value) => !value)} type="button" aria-label="Theme toggle">
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}

function Home({ projects, setPage, lang, text }) {
  const careerItems = lang === "en" ? careerEn : careerHighlights;
  const currentProfile = lang === "en" ? { ...profile, ...profileEn } : profile;

  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">
            <Radar size={16} /> {text.heroEyebrow}
          </p>
          <h1>{text.heroTitle}</h1>
          <p>{text.heroLead}</p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => setPage("projects")} type="button">
              {text.primaryCta} <ChevronRight size={18} />
            </button>
            <button className="secondary-btn" onClick={() => setPage("profile")} type="button">
              {text.secondaryCta}
            </button>
          </div>
          <div className="hero-signal-row">
            <span>RTK GPS / IMU</span>
            <span>3D LiDAR</span>
            <span>ROS2</span>
            <span>A* / Pure Pursuit</span>
          </div>
        </div>
        <div className="hero-card" aria-label="Career highlights">
          <div className="profile-strip">
            <img src="/assets/images/profile/hyeonhak-shin.jpg" alt="Hyeonhak Shin profile" />
            <div>
              <strong>{currentProfile.name}</strong>
              <span>{currentProfile.headline}</span>
            </div>
          </div>
          <div className="career-card">
            <p className="career-card__label">{text.careerLabel}</p>
            <h2>{text.careerTitle}</h2>
            <div className="career-timeline">
              {careerItems.map((item) => (
                <article className="career-item" key={`${item.period}-${item.title}`}>
                  <span>{item.period}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        {stats[lang].map((item) => (
          <article className="stat-card" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <SectionHeader title={text.featuredTitle} action={text.featuredAction} onAction={() => setPage("projects")} />
      <div className="project-grid featured">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} lang={lang} text={text} />
        ))}
      </div>
    </main>
  );
}

function Profile({ lang, text }) {
  const currentProfile = lang === "en" ? { ...profile, ...profileEn } : profile;
  const experienceItems =
    lang === "en"
      ? experienceEn
      : [
          "POSCO DX P/C Engineer | 산업 시스템의 실시간 데이터 흐름과 제어 인터페이스 경험",
          "KAERI Research Intern | Isaac Sim 3D SLAM 테스트, Unitree Go1 실험, ROS 로봇 데이터 연동",
        ];

  return (
    <main className="page-grid">
      <section className="profile-panel">
        <img src="/assets/images/profile/hyeonhak-shin.jpg" alt="Hyeonhak Shin profile photo" />
        <div>
          <p className="eyebrow">
            <UserRound size={16} /> {text.profileEyebrow}
          </p>
          <h1>{currentProfile.name}</h1>
          <p>{currentProfile.intro}</p>
          <div className="skill-row">
            {["C++", "Python", "ROS / ROS2", "SLAM", "Path Planning", "Autonomous Driving"].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </section>
      <InfoCard icon={<Mail />} title={text.contact} items={currentProfile.contact} />
      <InfoCard icon={<Cpu />} title={text.experience} items={experienceItems} />
      <InfoCard icon={<GraduationCap />} title={text.education} items={currentProfile.education} />
      <InfoCard icon={<Code2 />} title={text.training} items={currentProfile.training} />
      <InfoCard icon={<Award />} title={text.awards} items={currentProfile.awards} />
      <InfoCard icon={<BadgeCheck />} title={text.certifications} items={currentProfile.certifications} />
    </main>
  );
}

function Projects({ projects, lang, text }) {
  return (
    <main>
      <section className="page-title">
        <p className="eyebrow">
          <Code2 size={16} /> {text.projectsEyebrow}
        </p>
        <h1>{text.projectsTitle}</h1>
        <p>{text.projectsLead}</p>
      </section>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} lang={lang} text={text} />
        ))}
      </div>
    </main>
  );
}

function ProjectCard({ project, lang, text }) {
  const localized = lang === "en" ? { ...project, ...projectEn[project.id] } : project;
  const images = project.images ?? (project.image ? [project.image] : []);
  const [imageIndex, setImageIndex] = React.useState(0);
  const currentImage = images[imageIndex] ?? project.image;
  const hasMultipleImages = images.length > 1;
  const showPreviousImage = (event) => {
    event?.stopPropagation();
    setImageIndex((index) => (index - 1 + images.length) % images.length);
  };
  const showNextImage = (event) => {
    event?.stopPropagation();
    setImageIndex((index) => (index + 1) % images.length);
  };
  const handleMediaKeyDown = (event) => {
    if (!hasMultipleImages) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showNextImage(event);
    }
  };

  return (
    <article className="project-card">
      <div
        className={`project-media${hasMultipleImages ? " is-clickable" : ""}${project.imageFit === "contain" ? " is-contain" : ""}`}
        onClick={hasMultipleImages ? showNextImage : undefined}
        onKeyDown={handleMediaKeyDown}
        role={hasMultipleImages ? "button" : undefined}
        tabIndex={hasMultipleImages ? 0 : undefined}
        aria-label={hasMultipleImages ? `${localized.title} image ${imageIndex + 1} of ${images.length}` : localized.title}
      >
        {currentImage ? <img src={currentImage} alt={localized.title} /> : <div className="media-fallback">{localized.title}</div>}
        <span>{localized.outcome}</span>
        {hasMultipleImages && (
          <>
            <button className="media-nav media-nav--prev" onClick={showPreviousImage} type="button" aria-label="Previous image">
              <ChevronLeft size={16} />
            </button>
            <button className="media-nav media-nav--next" onClick={showNextImage} type="button" aria-label="Next image">
              <ChevronRight size={16} />
            </button>
            <div className="media-dots" aria-hidden="true">
              {images.map((image, index) => (
                <i className={index === imageIndex ? "active" : ""} key={image}></i>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="project-body">
        <div className="project-meta">
          <span>
            <CalendarDays size={14} /> {project.period}
          </span>
          <span>{localized.team}</span>
        </div>
        <h2>{localized.title}</h2>
        <strong>{localized.role}</strong>
        <p>{localized.summary}</p>
        <div className="tag-row">
          {project.stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project.links.length > 0 && (
          <div className="link-row">
            {project.links.map((link) => (
              <SafeLink href={link.href} key={link.href}>
                {link.label === "GitHub" ? <GitBranch size={15} /> : <ExternalLink size={15} />} {link.label}
              </SafeLink>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function InfoCard({ icon, title, items }) {
  return (
    <article className="info-card">
      <h2>
        {React.cloneElement(icon, { size: 19 })} {title}
      </h2>
      <ul>
        {items.map((item) => {
          const key = typeof item === "string" ? item : item.href;
          return (
            <li key={key}>
              {typeof item === "string" ? (
                item
              ) : (
                <SafeLink className="profile-link" href={item.href}>
                  {item.label}
                  {!item.href.startsWith("mailto:") && <ExternalLink size={14} />}
                </SafeLink>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function SectionHeader({ title, action, onAction }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      <button onClick={onAction} type="button">
        {action} <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default App;
