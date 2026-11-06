import React from "react";
import VisitorCounter from "./VisitorCounter.jsx";
import { trackPage } from "./analytics.js";
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
  Search,
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

function readPreference(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Navigation and preferences still work when browser storage is unavailable.
  }
}

function pageFromHash() {
  const page = window.location.hash.slice(1);
  return ["profile", "projects"].includes(page) ? page : "home";
}

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
  const [page, setPage] = React.useState(pageFromHash);
  const [dark, setDark] = React.useState(() => readPreference("portfolio-theme", "light") === "dark");
  const [lang, setLang] = React.useState(() => readPreference("portfolio-language", "ko") === "en" ? "en" : "ko");
  const previousPage = React.useRef(page);
  const [ripples, setRipples] = React.useState([]);
  const featuredProjects = projects.slice(0, 5);
  const text = copy[lang];

  const navigate = (nextPage) => {
    window.location.hash = nextPage;
  };

  React.useEffect(() => {
    const handleHashChange = () => setPage(pageFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  React.useEffect(() => {
    if (previousPage.current !== page) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("main-content")?.focus({ preventScroll: true });
      previousPage.current = page;
    }
  }, [page]);

  React.useEffect(() => {
    trackPage(page);
  }, [page]);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    savePreference("portfolio-theme", dark ? "dark" : "light");
  }, [dark]);

  React.useEffect(() => {
    document.documentElement.lang = lang;
    savePreference("portfolio-language", lang);
  }, [lang]);

  React.useEffect(() => {
    document.title = `${text.nav[page]} · ${lang === "ko" ? "신현학" : "Hyeonhak Shin"} | Robotics Portfolio`;
  }, [page, lang, text]);

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
      <a className="skip-link" href="#main-content" onClick={(event) => {
        event.preventDefault();
        document.getElementById("main-content")?.focus();
      }}>{lang === "ko" ? "본문 바로가기" : "Skip to content"}</a>
      <RippleLayer ripples={ripples} />
      <div className="app-shell">
        <Header page={page} setPage={navigate} dark={dark} setDark={setDark} lang={lang} setLang={setLang} text={text} />
        {page === "home" && <Home projects={featuredProjects} setPage={navigate} lang={lang} text={text} />}
        {page === "profile" && <Profile lang={lang} text={text} />}
        {page === "projects" && <Projects projects={projects} lang={lang} text={text} />}
        <Footer lang={lang} />
        <VisitorCounter lang={lang} />
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
          <button className={page === key ? "active" : ""} aria-current={page === key ? "page" : undefined} key={key} onClick={() => setPage(key)} type="button">
            {label}
          </button>
        ))}
      </nav>
      <button className="lang-btn" onClick={() => setLang((value) => (value === "ko" ? "en" : "ko"))} type="button" aria-label="Language toggle" title={lang === "ko" ? "Switch to English" : "한국어로 전환"}>
        <span className={lang === "ko" ? "active" : ""}>한</span>
        <i></i>
        <span className={lang === "en" ? "active" : ""}>EN</span>
      </button>
      <button className="icon-btn" onClick={() => setDark((value) => !value)} type="button" aria-label="Theme toggle" aria-pressed={dark} title={lang === "ko" ? "화면 테마 변경" : "Change color theme"}>
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}

function Home({ projects, setPage, lang, text }) {
  const careerItems = [...(lang === "en" ? careerEn : careerHighlights)].reverse();
  const currentProfile = lang === "en" ? { ...profile, ...profileEn } : profile;

  return (
    <main id="main-content" tabIndex={-1}>
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
          <div className="hero-proof"><Award size={18} /><span>{lang === "ko" ? "국토교통부 장관상 · SSAFY 자율 프로젝트 1등" : "MOLIT Minister Award · SSAFY Autonomous Project, 1st Place"}</span></div>
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
    <main id="main-content" tabIndex={-1} className="page-grid">
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
  const [query, setQuery] = React.useState("");
  const matchingProjects = projects.filter((project) => {
    const english = projectEn[project.id];
    return [project.title, project.role, project.summary, ...project.stack, english?.title, english?.role, english?.summary]
      .join(" ").toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
  });

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-title">
        <p className="eyebrow">
          <Code2 size={16} /> {text.projectsEyebrow}
        </p>
        <h1>{text.projectsTitle}</h1>
        <p>{text.projectsLead}</p>
      </section>
      <div className="project-toolbar">
        <label className="project-search">
          <Search size={20} aria-hidden="true" />
          <span className="visitor-sr-only">{lang === "ko" ? "프로젝트 검색" : "Search projects"}</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={lang === "ko" ? "프로젝트, 기술, 역할 검색" : "Search projects, skills, or roles"} />
        </label>
        <p role="status">{lang === "ko" ? `${matchingProjects.length}개의 프로젝트` : `${matchingProjects.length} projects`}</p>
      </div>
      <div className="project-grid">
        {matchingProjects.map((project) => (
          <ProjectCard key={project.id} project={project} lang={lang} text={text} />
        ))}
      </div>
      {matchingProjects.length === 0 && <div className="empty-state"><h2>{lang === "ko" ? "일치하는 프로젝트가 없습니다" : "No matching projects"}</h2><p>{lang === "ko" ? "다른 기술명이나 키워드로 검색해 보세요." : "Try a different skill or keyword."}</p><button className="secondary-btn" type="button" onClick={() => setQuery("")}>{lang === "ko" ? "전체 프로젝트 보기" : "Show all projects"}</button></div>}
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
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousImage(event);
    } else if (event.key === "ArrowRight") {
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
        role={hasMultipleImages ? "group" : undefined}
        aria-label={hasMultipleImages ? `${localized.title} image ${imageIndex + 1} of ${images.length}` : localized.title}
      >
        {currentImage ? <img src={currentImage} alt={`${localized.title}${hasMultipleImages ? ` (${imageIndex + 1}/${images.length})` : ""}`} decoding="async" /> : <div className="media-fallback"><Bot size={40} /><span>{project.stack.join(" / ")}</span></div>}
        <span className="project-outcome">{localized.outcome}</span>
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
            <span className="visitor-sr-only" aria-live="polite">{lang === "ko" ? `이미지 ${imageIndex + 1} / ${images.length}` : `Image ${imageIndex + 1} of ${images.length}`}</span>
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

function Footer({ lang }) {
  return (
    <footer className="site-footer">
      <div className="contact-panel">
        <div><p className="eyebrow">LET’S CONNECT</p><h2>{lang === "ko" ? "다음 로봇의 움직임을 함께." : "Let’s build what moves next."}</h2><p>{lang === "ko" ? "로보틱스 소프트웨어와 자율주행에 관한 이야기를 기다립니다." : "Get in touch about robotics software and autonomous systems."}</p></div>
        <SafeLink className="primary-btn" href="mailto:imur.navigator@gmail.com"><Mail size={18} />{lang === "ko" ? "이메일로 연락하기" : "Get in touch"}<ChevronRight size={18} /></SafeLink>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Hyeonhak Shin</span><span>Robotics & Autonomous Driving</span><SafeLink href="https://github.com/Carpediem324">GitHub <ExternalLink size={14} /></SafeLink></div>
    </footer>
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
