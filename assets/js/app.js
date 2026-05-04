const SAMPLE_PROJECTS = [
  {
    id: "steel-scada",
    title: "SCADA Level2 Data Simulator",
    description:
      "OPC 기반 공정 데이터를 모사하고 인터페이스 검증을 자동화해 현장 테스트 시간을 줄인 프로젝트입니다.",
    stack: "C#, OPC, ISA-95, SCADA",
    outcome: "Interface test coverage improved",
    image1:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "slam-panel",
    title: "3D SLAM Visualization Panel",
    description:
      "4족 보행 로봇의 공간 인식 데이터를 시각화해 실험 상태를 빠르게 파악할 수 있도록 만든 패널입니다.",
    stack: "Python, ROS, 3D SLAM, Visualization",
    outcome: "Faster experiment review",
    image1:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
  },
];

class HeaderComponent {
  constructor(root) {
    this.root = root;
  }

  render(page) {
    const pages = {
      index: {
        leftHref: "index.html",
        links: [
          { href: "profile.html", ko: "프로필", en: "Profile" },
          { href: "projects.html", ko: "프로젝트", en: "Projects" },
        ],
      },
      profile: {
        leftHref: "index.html",
        links: [{ href: "projects.html", ko: "프로젝트", en: "Projects" }],
      },
      projects: {
        leftHref: "index.html",
        links: [{ href: "profile.html", ko: "프로필", en: "Profile" }],
      },
    };

    const cfg = pages[page] || pages.index;
    const links = cfg.links
      .map(
        (link) =>
          `<a href="${link.href}" class="interactive nav-link" data-i18n data-i18n-ko="${link.ko}" data-i18n-en="${link.en}">${link.ko}</a>`,
      )
      .join("");

    return `<header class="site-header">
      <a href="${cfg.leftHref}" class="interactive brand" aria-label="Home">CARPEDIEM</a>
      <nav class="header-actions" aria-label="Primary navigation">
        ${links}
        <button id="langButton" type="button" aria-label="Language toggle" class="interactive control-btn">EN</button>
        <button id="themeButton" type="button" aria-label="Theme toggle" class="interactive control-btn" data-theme-label-dark-ko="다크 모드" data-theme-label-light-ko="라이트 모드" data-theme-label-dark-en="Dark mode" data-theme-label-light-en="Light mode">다크 모드</button>
      </nav>
    </header>`;
  }

  init() {
    const target = document.querySelector("[data-site-header]");
    if (!target) return;
    target.innerHTML = this.render(target.dataset.page || "index");
  }
}

class ThemeManager {
  constructor(root, button) {
    this.root = root;
    this.button = button;
    this.storageKey = "portfolio-theme";
  }

  getInitialTheme() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  getLabel(language, isDark) {
    if (!this.button) return "";
    const darkLabel =
      language === "en" ? this.button.dataset.themeLabelDarkEn : this.button.dataset.themeLabelDarkKo;
    const lightLabel =
      language === "en" ? this.button.dataset.themeLabelLightEn : this.button.dataset.themeLabelLightKo;
    return isDark ? lightLabel : darkLabel;
  }

  apply(theme, language = "ko") {
    const isDark = theme === "dark";
    this.root.classList.toggle("dark", isDark);
    this.root.style.colorScheme = isDark ? "dark" : "light";
    localStorage.setItem(this.storageKey, theme);
    if (this.button) {
      this.button.textContent = this.getLabel(language, isDark);
      this.button.setAttribute("aria-pressed", String(isDark));
    }
  }

  toggle(language) {
    this.apply(this.root.classList.contains("dark") ? "light" : "dark", language);
  }
}

class LanguageManager {
  constructor(root, button) {
    this.root = root;
    this.button = button;
    this.storageKey = "portfolio-language";
  }

  getInitialLanguage() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === "ko" || saved === "en") return saved;
    return (navigator.language || "ko").toLowerCase().startsWith("ko") ? "ko" : "en";
  }

  getValue(el, language, prefix) {
    return el.dataset[language === "en" ? `${prefix}En` : `${prefix}Ko`];
  }

  apply(language) {
    this.root.lang = language;

    [
      ["i18n", "textContent"],
      ["i18nTitle", "title"],
      ["i18nContent", "content"],
      ["i18nPlaceholder", "placeholder"],
    ].forEach(([prefix, target]) => {
      const attr = prefix.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      document.querySelectorAll(`[data-${attr}]`).forEach((el) => {
        const value = this.getValue(el, language, prefix);
        if (!value) return;
        if (target === "textContent") el.textContent = value;
        else el.setAttribute(target, value);
      });
    });

    if (this.button) this.button.textContent = language === "ko" ? "EN" : "KO";
    localStorage.setItem(this.storageKey, language);
  }

  toggle() {
    this.apply(this.root.lang === "ko" ? "en" : "ko");
  }
}

class ProjectManager {
  constructor() {
    this.container = document.getElementById("projectsContainer");
  }

  projectCard(project) {
    const image = project.image1 || project.image2 || project.image3 || project.image4;
    const imageHtml = image
      ? `<img src="${image}" alt="${project.title}" class="project-image" loading="lazy">`
      : `<div class="project-image project-image--empty">No image</div>`;
    return `<article class="project-card">
      ${imageHtml}
      <div class="project-card__body">
        <div>
          <p class="project-meta">${project.stack || "Portfolio Project"}</p>
          <h2 class="project-title">${project.title}</h2>
          <p class="project-description">${project.description}</p>
        </div>
        <div class="project-card__footer">
          <span class="project-outcome">${project.outcome || "Case study"}</span>
        </div>
      </div>
    </article>`;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = SAMPLE_PROJECTS.map((project) => this.projectCard(project)).join("");
  }

  init() {
    if (!this.container) return;
    this.render();
  }
}

class CursorEffect {
  constructor() {
    this.ring = null;
    this.pointerX = innerWidth / 2;
    this.pointerY = innerHeight / 2;
    this.ringX = this.pointerX;
    this.ringY = this.pointerY;
  }

  setup() {
    if (!matchMedia("(min-width: 768px)").matches) return;
    this.ring = document.getElementById("cursorRing") || document.createElement("div");
    this.ring.id = "cursorRing";
    this.ring.className = "cursor-ring";
    if (!document.getElementById("cursorRing")) document.body.appendChild(this.ring);
    document.body.classList.add("custom-cursor");
    addEventListener("pointermove", (event) => {
      this.pointerX = event.clientX;
      this.pointerY = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      this.ring.classList.toggle(
        "is-hover",
        Boolean(target?.closest("a, button, input, textarea, select, [role='button'], .interactive")),
      );
    });
    addEventListener("pointerdown", () => this.ring.classList.add("is-active"));
    addEventListener("pointerup", () => this.ring.classList.remove("is-active"));
    requestAnimationFrame(() => this.animate());
  }

  animate() {
    if (!this.ring) return;
    this.ringX += (this.pointerX - this.ringX) * 0.16;
    this.ringY += (this.pointerY - this.ringY) * 0.16;
    this.ring.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(() => this.animate());
  }
}

class PortfolioApp {
  init() {
    new HeaderComponent(document.documentElement).init();

    const root = document.documentElement;
    const langButton = document.getElementById("langButton");
    const themeButton = document.getElementById("themeButton");
    const language = new LanguageManager(root, langButton);
    const theme = new ThemeManager(root, themeButton);
    const initialLanguage = language.getInitialLanguage();

    language.apply(initialLanguage);
    theme.apply(theme.getInitialTheme(), initialLanguage);
    langButton?.addEventListener("click", () => {
      language.toggle();
      theme.apply(root.classList.contains("dark") ? "dark" : "light", root.lang);
    });
    themeButton?.addEventListener("click", () => theme.toggle(root.lang));

    new CursorEffect().setup();
    new ProjectManager().init();
  }
}

document.addEventListener("DOMContentLoaded", () => new PortfolioApp().init());
