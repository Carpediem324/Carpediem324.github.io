const PROJECTS = [
  {
    id: "creative-mobility-2023",
    titleKo: "2023 대학생 창작모빌리티 경진대회 무인모빌리티",
    titleEn: "Student Creative Mobility Competition 2023",
    roleKo: "Localization Lead",
    roleEn: "Localization Lead",
    periodKo: "2023.03 - 2023.10 | 8개월",
    periodEn: "Mar 2023 - Oct 2023 | 8 months",
    teamKo: "12명",
    teamEn: "12 members",
    summaryKo:
      "K-City 트랙에서 RTK GPS와 IMU 기반 위치 추정, WGS-84 to UTM 변환, JOSM 기반 글로벌 패스 생성을 담당해 무인모빌리티 부문 대상(국토교통부 장관상)을 수상했습니다.",
    summaryEn:
      "Led localization for autonomous missions at K-City using RTK GPS, IMU heading estimation, WGS-84 to UTM conversion, and JOSM-based global path generation. The team won the grand prize from the Ministry of Land, Infrastructure and Transport.",
    stack: "RTK GPS, IMU, WGS-84, UTM, JOSM",
    outcomeKo: "대상 | 국토교통부 장관상",
    outcomeEn: "Grand Prize | MOLIT Minister Award",
    image: "assets/images/projects/creative-mobility-2023.jpg",
    links: [
      { label: "Video", href: "https://www.youtube.com/live/g-u4luKR8nU?si=1tMJbcV1_7eGXlJx&t=16490" },
      { label: "Article", href: "https://www.yna.co.kr/view/AKR20231017031600003" },
    ],
  },
  {
    id: "nanosaur-line-tracing",
    titleKo: "나노 소어 라인 트레이싱",
    titleEn: "Nanosaur Line Tracing",
    roleKo: "팀장 | 모터 제어 & 라인 감지",
    roleEn: "Team Lead | Motor Control & Line Detection",
    periodKo: "2023.03 - 2023.06 | 3개월",
    periodEn: "Mar 2023 - Jun 2023 | 3 months",
    teamKo: "3명",
    teamEn: "3 members",
    summaryKo:
      "Jetson Nano 기반 무한궤도형 이동체를 제작하고 OpenCV HSV 변환으로 라인을 감지했으며, C++로 모터 제어 및 라인 팔로잉 로직을 구현했습니다.",
    summaryEn:
      "Built a tracked Nanosaur vehicle on Jetson Nano, detected lines with OpenCV HSV conversion, and implemented C++ motor control and line-following logic.",
    stack: "Jetson Nano, OpenCV, HSV, C++",
    outcomeKo: "라인 감지 및 주행 제어 구현",
    outcomeEn: "Line detection and vehicle control",
    image: "assets/images/projects/nanosaur-line-tracing.jpg",
    links: [{ label: "GitHub", href: "https://github.com/Carpediem324/nanosaur_robotprogramming" }],
  },
  {
    id: "kaeri-rover-panel",
    titleKo: "원자력연구원 우주탐사로버 웹 패널",
    titleEn: "KAERI Web Panel for Space Exploration Rover",
    roleKo: "WebRTC & ROS 연동",
    roleEn: "WebRTC & ROS Integration",
    periodKo: "2024.01 - 2024.03 | 3개월",
    periodEn: "Jan 2024 - Mar 2024 | 3 months",
    teamKo: "2명",
    teamEn: "2 members",
    summaryKo:
      "WebRTC로 로봇 카메라와 공유 화면을 웹 패널에 구현하고 roslib.js를 통해 모터 RPM 등 ROS 토픽 데이터를 실시간 시각화했습니다. 대한민국 과학축제 KAERI 부스 전시에 활용되었습니다.",
    summaryEn:
      "Implemented robot camera and screen-sharing views with WebRTC, visualized ROS topic data such as motor RPM through roslib.js, and supported the KAERI booth at the Korea Science Festival.",
    stack: "WebRTC, ROS, roslib.js, Ngrok",
    outcomeKo: "대한민국 과학축제 KAERI 부스 전시",
    outcomeEn: "Displayed at KAERI booth, Korea Science Festival",
    image: "assets/images/projects/kaeri-rover-panel.jpg",
    links: [],
  },
  {
    id: "indoor-slam-evaluation",
    titleKo: "극한환경 실내 SLAM 성능평가 및 개선",
    titleEn: "Indoor SLAM Evaluation in Extreme Environment",
    roleKo: "네트워크 및 SLAM 파라미터 분석",
    roleEn: "Network and SLAM Parameter Analysis",
    periodKo: "2024.01 - 2024.06 | 6개월",
    periodEn: "Jan 2024 - Jun 2024 | 6 months",
    teamKo: "3명",
    teamEn: "3 members",
    summaryKo:
      "OpenVPN 기반 내부 네트워크를 구성하고 ROS1/ROS2 Action Programming으로 RTT와 Network Budget을 측정했습니다. HDL Graph SLAM 파라미터 튜닝, Isaac Sim 테스트, Unitree Go1 실험, 방사선 데이터 결합 지도 제작을 수행했습니다.",
    summaryEn:
      "Built an OpenVPN internal network, measured RTT and network budget with ROS1/ROS2 action programming, tuned HDL Graph SLAM, tested in Isaac Sim, evaluated with Unitree Go1, and combined 3D maps with radiation data.",
    stack: "ROS1, ROS2, HDL Graph SLAM, Isaac Sim, Unitree Go1, PyQtGraph",
    outcomeKo: "실내 SLAM 평가 파이프라인 구축",
    outcomeEn: "Indoor SLAM evaluation pipeline",
    image: "assets/images/projects/indoor-slam-evaluation.jpg",
    links: [],
  },
  {
    id: "mock-interview-stt",
    titleKo: "STT 기반 모의면접 웹사이트",
    titleEn: "Mock Interview Website with STT",
    roleKo: "팀장 | 백엔드 & 프롬프트 엔지니어링",
    roleEn: "Team Lead | Backend & Prompt Engineering",
    periodKo: "2022.09 - 2023.06 | 10개월",
    periodEn: "Sep 2022 - Jun 2023 | 10 months",
    teamKo: "4명",
    teamEn: "4 members",
    summaryKo:
      "Firebase 인증/DB/배포를 구성하고 webkitSpeechRecognition 기반 STT, 한국어 키워드 추출, 맞춤법 검사, OpenAI GPT API 기반 면접 답변 및 꼬리질문 생성을 구현했습니다.",
    summaryEn:
      "Built Firebase authentication, database, and deployment; implemented STT with webkitSpeechRecognition, Korean keyword extraction, spell checking, and GPT-powered interview answers and follow-up questions.",
    stack: "Firebase, JavaScript, STT, OpenAI API, Prompt Engineering",
    outcomeKo: "실시간 면접 연습 웹 서비스 구현",
    outcomeEn: "Real-time interview practice web service",
    image: "assets/images/projects/mock-interview-stt.jpg",
    links: [
      { label: "GitHub", href: "https://github.com/toodox/kut_stt" },
      { label: "Web", href: "https://koreatechsttmockinterview.web.app" },
    ],
  },
  {
    id: "rag-chatbot",
    titleKo: "RAG 기반 챗봇 서비스",
    titleEn: "RAG-based Chatbot Service",
    roleKo: "팀장 | LangChain & Upstage RAG 파이프라인",
    roleEn: "Team Lead | LangChain & Upstage RAG Pipeline",
    periodKo: "2024.12 | 1개월",
    periodEn: "Dec 2024 | 1 month",
    teamKo: "4명",
    teamEn: "4 members",
    summaryKo:
      "LangChain과 UpstageEmbeddings 기반 RAG 파이프라인을 구축하고, Solar LLM 키워드 추출, 네이버 뉴스/Google SERP 검색, Chroma DB Top-K 검색, 기사 기반 답변 생성을 구현했습니다.",
    summaryEn:
      "Built a LangChain and UpstageEmbeddings RAG pipeline with Solar keyword extraction, Naver News and Google SERP search fallback, Chroma DB Top-K retrieval, and answer generation from retrieved articles.",
    stack: "LangChain, Upstage, Solar, Chroma DB, RAG",
    outcomeKo: "뉴스 기반 질의응답 RAG 서비스",
    outcomeEn: "News-grounded RAG Q&A service",
    image: "assets/images/projects/rag-chatbot.jpg",
    links: [{ label: "GitHub", href: "https://github.com/haerim-kweon/newchats" }],
  },
  {
    id: "dobot-magician",
    titleKo: "두봇 Magician 디지털 트윈 프로젝트",
    titleEn: "Dobot Magician Digital Twin Project",
    roleKo: "팀장 | ROS 프로그래밍 & 디지털 트윈 소켓 통신",
    roleEn: "Team Lead | ROS Programming & Digital Twin Socket Communication",
    periodKo: "2024.10 - 2024.11 | 2개월",
    periodEn: "Oct 2024 - Nov 2024 | 2 months",
    teamKo: "2명",
    teamEn: "2 members",
    summaryKo:
      "Dobot을 ROS 환경에서 제어하고 RoboDK와 Dobot 간 관절 각도 데이터를 송수신했습니다. YOLOv8 패널 인식, Raspberry Pi 소켓 통신, 컨베이어벨트 동작 및 객체 분류 흐름을 구현했습니다.",
    summaryEn:
      "Controlled Dobot in ROS, synchronized joint angles between RoboDK and Dobot, and implemented YOLOv8 panel recognition, Raspberry Pi socket communication, conveyor control, and object sorting.",
    stack: "ROS, RoboDK, YOLOv8, Raspberry Pi, Socket",
    outcomeKo: "Sim-to-Real-to-Sim 제어 흐름 구현",
    outcomeEn: "Sim-to-Real-to-Sim control flow",
    image: "assets/images/projects/dobot-magician.jpg",
    links: [{ label: "GitHub", href: "https://github.com/Carpediem324/ssafy_project" }],
  },
  {
    id: "robocop",
    titleKo: "무인 경비 로봇 관제 시스템 ROBOCOP",
    titleEn: "ROBOCOP Unmanned Security Robot Control System",
    roleKo: "시뮬레이션 자율주행 구현",
    roleEn: "Autonomous Navigation in Simulation",
    periodKo: "2025.01 - 2025.02 | 2개월",
    periodEn: "Jan 2025 - Feb 2025 | 2 months",
    teamKo: "6명",
    teamEn: "6 members",
    summaryKo:
      "웹소켓 기반 로봇 데이터 송수신, 웹 원격 조작, 현재 위치 기반 글로벌 맵/heading 발행, 3D LiDAR 객체 인식, A* 글로벌 경로계획, Pure Pursuit 주행 제어, 커스텀 토픽/서비스 기반 상태 제어를 구현했습니다.",
    summaryEn:
      "Implemented WebSocket robot telemetry, remote web control, global map and heading publication, 3D LiDAR object detection, A* global path planning, Pure Pursuit control, and robot state control with custom topics and services.",
    stack: "ROS2, WebSocket, 3D LiDAR, A*, Pure Pursuit",
    outcomeKo: "무인 경비 로봇 관제/자율주행 시뮬레이션",
    outcomeEn: "Security robot control and autonomous driving simulation",
    image: "assets/images/projects/robocop.jpg",
    links: [{ label: "GitHub", href: "https://github.com/Carpediem324/robocop_pjt.git" }],
  },
  {
    id: "voice-assistant",
    titleKo: "가정용 지능형 음성 비서 시스템",
    titleEn: "Distributed Voice Event Detection and AI Assistant",
    roleKo: "임베디드 온디바이스 키워드 인식",
    roleEn: "Embedded On-device Keyword Recognition",
    periodKo: "2025.02 - 2025.04 | 3개월",
    periodEn: "Feb 2025 - Apr 2025 | 3 months",
    teamKo: "6명",
    teamEn: "6 members",
    summaryKo:
      "삼성전자 DA사업부 연계 프로젝트로 라즈베리파이5 Ubuntu 24.04 도커 환경을 구축하고 Wakeup 키워드 인식 모듈, MQTT 음성 데이터 전송, PulseAudio 마이크 다중 접근, 도커허브 배포를 수행했습니다.",
    summaryEn:
      "In a Samsung Electronics DA collaboration, built a Raspberry Pi 5 Ubuntu 24.04 Docker environment, implemented wake-word recognition, MQTT audio transfer, PulseAudio multi-access handling, and Docker Hub deployment.",
    stack: "Raspberry Pi 5, Docker, MQTT, PulseAudio, Keyword Spotting",
    outcomeKo: "SSAFY DA 연계 프로젝트 우수상",
    outcomeEn: "SSAFY DA-linked Project Excellence Award",
    image: "assets/images/projects/voice-assistant.jpg",
    links: [],
  },
  {
    id: "gaemi",
    titleKo: "재난지역탐사로봇 GAEMI",
    titleEn: "GAEMI Disaster Area Exploration Robot",
    roleKo: "임베디드 온디바이스 키워드 인식",
    roleEn: "Embedded On-device Keyword Recognition",
    periodKo: "2025.04 - 2025.05 | 2개월",
    periodEn: "Apr 2025 - May 2025 | 2 months",
    teamKo: "7명",
    teamEn: "7 members",
    summaryKo:
      "NVIDIA Isaac Sim을 활용한 6족 보행 로봇 강화학습과 다양한 센서 데이터 드라이버 관리 및 데이터 발행을 중심으로 진행한 재난지역 탐사 로봇 프로젝트입니다.",
    summaryEn:
      "A disaster exploration robot project focused on reinforcement learning for a hexapod robot in NVIDIA Isaac Sim and managing/publishing multi-sensor driver data.",
    stack: "NVIDIA Isaac Sim, Reinforcement Learning, Sensor Drivers",
    outcomeKo: "진행 프로젝트",
    outcomeEn: "In progress",
    image: "assets/images/projects/gaemi.jpg",
    links: [],
  },
];

const WEATHER_FALLBACK = {
  latitude: 35.1595,
  longitude: 126.8526,
  labelKo: "광주 기준",
  labelEn: "Gwangju fallback",
};

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
        <span class="utility-actions">
          <button id="langButton" type="button" aria-label="Language toggle" class="interactive utility-btn utility-btn--lang">EN</button>
          <button id="themeButton" type="button" aria-label="Theme toggle" class="interactive utility-btn utility-btn--theme" data-theme-icon-dark="☾" data-theme-icon-light="☀">☾</button>
        </span>
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

  apply(theme, language = "ko") {
    const isDark = theme === "dark";
    this.root.classList.toggle("dark", isDark);
    this.root.style.colorScheme = isDark ? "dark" : "light";
    localStorage.setItem(this.storageKey, theme);
    if (this.button) {
      this.button.textContent = isDark ? this.button.dataset.themeIconLight : this.button.dataset.themeIconDark;
      this.button.setAttribute("title", isDark ? "Light mode" : "Dark mode");
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

class WeatherScene {
  constructor(root) {
    this.root = root;
    this.scene = null;
    this.label = null;
    this.status = {
      type: "clear",
      code: 0,
      temperature: null,
      locationKo: WEATHER_FALLBACK.labelKo,
      locationEn: WEATHER_FALLBACK.labelEn,
    };
  }

  init() {
    this.scene = document.createElement("div");
    this.scene.className = "weather-scene";
    this.scene.setAttribute("aria-hidden", "true");
    this.scene.innerHTML = `
      <div class="sky-orb"></div>
      <div class="weather-haze weather-haze--one"></div>
      <div class="weather-haze weather-haze--two"></div>
      <div class="weather-particles"></div>
    `;
    document.body.prepend(this.scene);

    this.label = document.createElement("p");
    this.label.className = "weather-label";
    this.label.setAttribute("data-weather-label", "");
    document.querySelector("[data-site-header]")?.after(this.label);

    this.apply();
    this.load();
  }

  getType(code) {
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) return "rain";
    if ([1, 2, 3, 45, 48].includes(code)) return "cloud";
    return "clear";
  }

  getCoords() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(WEATHER_FALLBACK);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            labelKo: "현재 위치 기준",
            labelEn: "Current location",
          }),
        () => resolve(WEATHER_FALLBACK),
        { enableHighAccuracy: false, timeout: 2200, maximumAge: 1000 * 60 * 30 },
      );
    });
  }

  async load() {
    try {
      const coords = await this.getCoords();
      const params = new URLSearchParams({
        latitude: String(coords.latitude),
        longitude: String(coords.longitude),
        current: "temperature_2m,weather_code,is_day,precipitation,rain,snowfall",
        timezone: "auto",
      });
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
      if (!response.ok) throw new Error("weather unavailable");
      const data = await response.json();
      const current = data.current || {};
      const code = Number(current.weather_code || 0);

      this.status = {
        type: this.getType(code),
        code,
        temperature: Number.isFinite(current.temperature_2m) ? Math.round(current.temperature_2m) : null,
        locationKo: coords.labelKo,
        locationEn: coords.labelEn,
      };
      this.apply();
    } catch {
      this.apply();
    }
  }

  getText(language) {
    const names = {
      ko: { clear: "맑음", cloud: "흐림", rain: "비", snow: "눈" },
      en: { clear: "Clear", cloud: "Cloudy", rain: "Rain", snow: "Snow" },
    };
    const temp = this.status.temperature === null ? "" : ` · ${this.status.temperature}°C`;
    const location = language === "en" ? this.status.locationEn : this.status.locationKo;
    return `${location} · ${names[language]?.[this.status.type] || names.ko[this.status.type]}${temp}`;
  }

  apply() {
    this.root.dataset.weather = this.status.type;
    if (this.label) this.label.textContent = this.getText(this.root.lang === "en" ? "en" : "ko");
  }
}

class ProjectManager {
  constructor(root) {
    this.root = root;
    this.container = document.getElementById("projectsContainer");
  }

  getValue(project, key) {
    const suffix = this.root.lang === "en" ? "En" : "Ko";
    return project[`${key}${suffix}`] || project[`${key}Ko`] || "";
  }

  projectCard(project) {
    const title = this.getValue(project, "title");
    const summary = this.getValue(project, "summary");
    const role = this.getValue(project, "role");
    const period = this.getValue(project, "period");
    const team = this.getValue(project, "team");
    const outcome = this.getValue(project, "outcome");
    const initials = project.id
      .split("-")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
    const imageText = this.root.lang === "en" ? "Add image file" : "이미지 준비 중";
    const imageHtml = `<div class="project-image-wrap">
      <div class="project-image-fallback">
        <span>${initials}</span>
        <small>${imageText}</small>
      </div>
      <img src="${project.image}" alt="${title}" class="project-image" loading="lazy">
    </div>`;
    const links = (project.links || [])
      .map(
        (link) =>
          `<a class="interactive project-link" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`,
      )
      .join("");
    return `<article class="project-card">
      ${imageHtml}
      <div class="project-card__body">
        <div>
          <p class="project-meta">${project.stack}</p>
          <h2 class="project-title">${title}</h2>
          <p class="project-description">${summary}</p>
          <dl class="project-facts">
            <div><dt>${this.root.lang === "en" ? "Role" : "역할"}</dt><dd>${role}</dd></div>
            <div><dt>${this.root.lang === "en" ? "Period" : "기간"}</dt><dd>${period}</dd></div>
            <div><dt>${this.root.lang === "en" ? "Team" : "팀"}</dt><dd>${team}</dd></div>
          </dl>
        </div>
        <div class="project-card__footer">
          <span class="project-outcome">${outcome}</span>
          <div class="project-links">${links}</div>
        </div>
      </div>
    </article>`;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = PROJECTS.map((project) => this.projectCard(project)).join("");
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
    const weather = new WeatherScene(root);
    const projects = new ProjectManager(root);
    const initialLanguage = language.getInitialLanguage();

    language.apply(initialLanguage);
    theme.apply(theme.getInitialTheme(), initialLanguage);
    weather.init();
    langButton?.addEventListener("click", () => {
      language.toggle();
      theme.apply(root.classList.contains("dark") ? "dark" : "light", root.lang);
      weather.apply();
      projects.render();
    });
    themeButton?.addEventListener("click", () => theme.toggle(root.lang));

    new CursorEffect().setup();
    projects.init();
  }
}

document.addEventListener("DOMContentLoaded", () => new PortfolioApp().init());
