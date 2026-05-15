import React from "react";
import { createRoot } from "react-dom/client";
import {
  Award,
  Bot,
  CalendarDays,
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
import "./styles.css";

const projects = [
  {
    id: "creative-mobility-2023",
    title: "2023 대학생 창작모빌리티 경진대회 무인모빌리티",
    role: "Localization Lead",
    period: "2023.03 - 2023.10",
    team: "12명",
    summary:
      "K-City 트랙에서 RTK GPS와 IMU 기반 위치 추정, WGS-84 to UTM 변환, JOSM 기반 글로벌 패스 생성을 담당했습니다.",
    stack: ["RTK GPS", "IMU", "UTM", "JOSM"],
    outcome: "대상 | 국토교통부 장관상",
    image: "/assets/images/projects/creative-mobility-2023.jpg",
    links: [
      { label: "Video", href: "https://www.youtube.com/live/g-u4luKR8nU?si=1tMJbcV1_7eGXlJx&t=16490" },
      { label: "Article", href: "https://www.yna.co.kr/view/AKR20231017031600003" },
    ],
  },
  {
    id: "robocop",
    title: "무인 경비 로봇 관제 시스템 ROBOCOP",
    role: "자율주행 경로계획 & 주행제어",
    period: "2025.01 - 2025.02",
    team: "6명",
    summary:
      "3D LiDAR 객체 인식, A* 글로벌 경로계획, Pure Pursuit 주행 제어, ROS2 토픽/서비스 기반 상태 제어를 구현했습니다.",
    stack: ["ROS2", "3D LiDAR", "A*", "Pure Pursuit"],
    outcome: "자율주행 시뮬레이션",
    image: "/assets/images/projects/robocop-1.jpg",
    links: [{ label: "GitHub", href: "https://github.com/Carpediem324/robocop_pjt.git" }],
  },
  {
    id: "indoor-slam-evaluation",
    title: "극한환경 실내 SLAM 성능평가 및 개선",
    role: "SLAM 평가 & 로봇 실험",
    period: "2024.01 - 2024.06",
    team: "3명",
    summary:
      "HDL Graph SLAM 파라미터 튜닝, Isaac Sim 시뮬레이션, Unitree Go1 실험, 방사선 데이터 결합 3D 지도 제작을 수행했습니다.",
    stack: ["ROS1/2", "HDL Graph SLAM", "Isaac Sim", "Unitree Go1"],
    outcome: "실내 SLAM 평가 파이프라인",
    image: "/assets/images/projects/indoor-slam-evaluation.jpg",
    links: [],
  },
  {
    id: "gaemi",
    title: "재난지역탐사로봇 GAEMI",
    role: "6족 보행 로봇 강화학습 & 센서 드라이버",
    period: "2025.04 - 2025.05",
    team: "7명",
    summary:
      "NVIDIA Isaac Sim에서 6족 보행 로봇 강화학습 환경을 구성하고 센서 드라이버 관리와 데이터 발행 흐름을 담당했습니다.",
    stack: ["Isaac Sim", "Reinforcement Learning", "Sensor Drivers"],
    outcome: "SSAFY 자율 프로젝트 전체 1등",
    image: "/assets/images/projects/gaemi-1.jpg",
    links: [],
  },
  {
    id: "kaeri-rover-panel",
    title: "원자력연구원 우주탐사로버 ROS 원격 운영",
    role: "ROS 데이터 연동 & 원격 운영",
    period: "2024.01 - 2024.03",
    team: "2명",
    summary:
      "로봇 카메라 영상과 ROS 토픽 데이터를 원격 운영 화면에 연동하고 모터 RPM 등 상태 데이터를 실시간 확인할 수 있게 구현했습니다.",
    stack: ["ROS", "roslib.js", "WebRTC"],
    outcome: "로버 원격 운영 데모",
    image: "/assets/images/projects/kaeri-rover-panel-1.jpg",
    links: [],
  },
  {
    id: "nanosaur-line-tracing",
    title: "나노 소어 라인 트레이싱",
    role: "팀장 | 모터 제어 & 라인 감지",
    period: "2023.03 - 2023.06",
    team: "3명",
    summary:
      "Jetson Nano 기반 무한궤도형 이동체를 제작하고 OpenCV HSV 변환으로 라인 감지와 C++ 모터 제어 로직을 구현했습니다.",
    stack: ["Jetson Nano", "OpenCV", "C++"],
    outcome: "라인 감지 및 주행 제어",
    image: null,
    links: [{ label: "GitHub", href: "https://github.com/Carpediem324/nanosaur_robotprogramming" }],
  },
  {
    id: "dobot-magician",
    title: "두봇 Magician 디지털 트윈 프로젝트",
    role: "팀장 | ROS 프로그래밍 & 소켓 통신",
    period: "2024.10 - 2024.11",
    team: "2명",
    summary:
      "Dobot을 ROS 환경에서 제어하고 RoboDK와 관절 각도 데이터를 송수신했으며 YOLOv8 패널 인식과 객체 분류 흐름을 구현했습니다.",
    stack: ["ROS", "RoboDK", "YOLOv8", "Raspberry Pi"],
    outcome: "Sim-to-Real-to-Sim 제어",
    image: null,
    links: [{ label: "GitHub", href: "https://github.com/Carpediem324/ssafy_project" }],
  },
  {
    id: "voice-assistant",
    title: "가정용 지능형 음성 비서 시스템",
    role: "임베디드 온디바이스 키워드 인식",
    period: "2025.02 - 2025.04",
    team: "6명",
    summary:
      "Raspberry Pi 5 Docker 환경, Wakeup 키워드 인식, MQTT 음성 데이터 전송, PulseAudio 마이크 다중 접근을 구현했습니다.",
    stack: ["Raspberry Pi", "Docker", "MQTT"],
    outcome: "SSAFY DA 연계 프로젝트 우수상",
    image: "/assets/images/projects/voice-assistant-1.jpg",
    links: [],
  },
  {
    id: "mock-interview-stt",
    title: "STT 기반 모의면접 웹사이트",
    role: "팀장 | 백엔드 & 프롬프트 엔지니어링",
    period: "2022.09 - 2023.06",
    team: "4명",
    summary:
      "Firebase 인증/DB/배포, STT, 한국어 키워드 추출, 맞춤법 검사, GPT 기반 면접 답변과 꼬리질문 생성을 구현했습니다.",
    stack: ["Firebase", "STT", "OpenAI API"],
    outcome: "실시간 면접 연습 서비스",
    image: "/assets/images/projects/mock-interview-stt.jpg",
    links: [
      { label: "GitHub", href: "https://github.com/toodox/kut_stt" },
      { label: "Web", href: "https://koreatechsttmockinterview.web.app" },
    ],
  },
  {
    id: "rag-chatbot",
    title: "RAG 기반 챗봇 서비스",
    role: "팀장 | RAG 파이프라인",
    period: "2024.12",
    team: "4명",
    summary:
      "LangChain, UpstageEmbeddings, Solar LLM, Chroma DB Top-K 검색을 활용해 뉴스 기반 질의응답 RAG 서비스를 구현했습니다.",
    stack: ["LangChain", "Upstage", "Chroma DB"],
    outcome: "뉴스 기반 RAG Q&A",
    image: "/assets/images/projects/rag-chatbot.jpg",
    links: [{ label: "GitHub", href: "https://github.com/haerim-kweon/newchats" }],
  },
];

const profile = {
  name: "신현학",
  headline: "Robotics & Autonomous Driving Software Engineer",
  intro:
    "C++, Python, ROS/ROS2, SLAM, 경로 계획 경험을 바탕으로 로봇이 환경을 인식하고 안정적으로 주행하는 소프트웨어를 만들고 싶습니다.",
  contact: ["대한민국, 여수시", "imur.navigator@gmail.com", "github.com/Carpediem324", "한국어 Native | 영어 Business Level"],
  education: [
    "한국기술교육대학교 컴퓨터공학부 스마트IoT 트랙 공학사 | 2018 - 2024",
    "삼성청년SW아카데미 임베디드 로봇 트랙 | 2024.07 - 2025.06",
  ],
  awards: [
    "2023 대학생 창작모빌리티 경진대회 무인모빌리티 부문 대상",
    "SSAFY 자율 프로젝트 우수상 | 1등",
    "SSAFY 프로젝트 전시발표회 발표부문 | 1등",
    "PCCP C++ Lv.3",
  ],
};

const stats = [
  { label: "Robotics Projects", value: "7+" },
  { label: "Autonomy Awards", value: "3" },
  { label: "Core Stack", value: "ROS2" },
];

const careerHighlights = [
  {
    period: "2023",
    title: "자율주행자동차 연구회",
    text: "K-City 무인모빌리티 경진대회에서 RTK GPS/IMU 위치 추정과 글로벌 경로 생성을 맡아 국토교통부 장관상을 수상했습니다.",
  },
  {
    period: "2024.01 - 2024.06",
    title: "한국원자력연구원 인턴연구원",
    text: "Isaac Sim 기반 3D SLAM 테스트, Unitree Go1 실험, ROS 로봇 데이터 연동을 수행했습니다.",
  },
  {
    period: "2024.07 - 2025.06",
    title: "SSAFY 임베디드 로봇 트랙",
    text: "ROBOCOP, GAEMI 등 ROS2 자율주행/보행 로봇 프로젝트를 진행했고 자율 프로젝트 전체 1등을 수상했습니다.",
  },
  {
    period: "현재",
    title: "POSCO DX P/C 엔지니어",
    text: "제철소 Level2/P-C 전산설계 업무를 수행하며 산업 현장의 데이터 흐름, 제어 인터페이스, 안정적인 운영 시스템을 익히고 있습니다.",
  },
];

function App() {
  const [page, setPage] = React.useState("home");
  const [dark, setDark] = React.useState(false);
  const featuredProjects = projects.slice(0, 5);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="app-shell">
      <Header page={page} setPage={setPage} dark={dark} setDark={setDark} />
      {page === "home" && <Home projects={featuredProjects} setPage={setPage} />}
      {page === "profile" && <Profile />}
      {page === "projects" && <Projects projects={projects} />}
    </div>
  );
}

function Header({ page, setPage, dark, setDark }) {
  const links = [
    ["home", "홈"],
    ["profile", "프로필"],
    ["projects", "프로젝트"],
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
      <button className="icon-btn" onClick={() => setDark((value) => !value)} type="button" aria-label="Theme toggle">
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}

function Home({ projects, setPage }) {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">
            <Radar size={16} /> ROBOTICS SOFTWARE PORTFOLIO
          </p>
          <h1>센서 데이터에서 주행 제어까지, 움직이는 로봇을 만듭니다.</h1>
          <p>자율주행 수상 경험과 로봇 실험, 그리고 현업 제어 시스템 경험을 연결해 성장하고 있습니다.</p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => setPage("projects")} type="button">
              프로젝트 보기 <ChevronRight size={18} />
            </button>
            <button className="secondary-btn" onClick={() => setPage("profile")} type="button">
              프로필 보기
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
              <strong>{profile.name}</strong>
              <span>{profile.headline}</span>
            </div>
          </div>
          <div className="career-card">
            <p className="career-card__label">Career Track</p>
            <h2>자율주행 연구회 수상부터 현업 전산설계까지</h2>
            <div className="career-timeline">
              {careerHighlights.map((item) => (
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
        {stats.map((item) => (
          <article className="stat-card" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <SectionHeader title="Featured Work" action="전체 보기" onAction={() => setPage("projects")} />
      <div className="project-grid featured">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}

function Profile() {
  return (
    <main className="page-grid">
      <section className="profile-panel">
        <img src="/assets/images/profile/hyeonhak-shin.jpg" alt="Hyeonhak Shin profile photo" />
        <div>
          <p className="eyebrow">
            <UserRound size={16} /> Hyeonhak Shin
          </p>
          <h1>{profile.name}</h1>
          <p>{profile.intro}</p>
          <div className="skill-row">
            {["C++", "Python", "ROS / ROS2", "SLAM", "Path Planning", "Autonomous Driving"].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </section>
      <InfoCard icon={<Mail />} title="Contact" items={profile.contact} />
      <InfoCard
        icon={<Cpu />}
        title="Experience"
        items={[
          "POSCO DX P/C Engineer | 산업 시스템의 실시간 데이터 흐름과 제어 인터페이스 경험",
          "KAERI Research Intern | Isaac Sim 3D SLAM 테스트, Unitree Go1 실험, ROS 로봇 데이터 연동",
        ]}
      />
      <InfoCard icon={<GraduationCap />} title="Education" items={profile.education} />
      <InfoCard icon={<Award />} title="Awards & Certifications" items={profile.awards} />
    </main>
  );
}

function Projects({ projects }) {
  return (
    <main>
      <section className="page-title">
        <p className="eyebrow">
          <Code2 size={16} /> Selected Work
        </p>
        <h1>프로젝트</h1>
        <p>자율주행 위치 추정, ROS 기반 로봇 제어, SLAM 평가, 시뮬레이션과 임베디드 로봇 프로젝트를 중심으로 정리했습니다.</p>
      </section>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-media">
        {project.image ? <img src={project.image} alt={project.title} /> : <div className="media-fallback">{project.title}</div>}
        <span>{project.outcome}</span>
      </div>
      <div className="project-body">
        <div className="project-meta">
          <span>
            <CalendarDays size={14} /> {project.period}
          </span>
          <span>{project.team}</span>
        </div>
        <h2>{project.title}</h2>
        <strong>{project.role}</strong>
        <p>{project.summary}</p>
        <div className="tag-row">
          {project.stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project.links.length > 0 && (
          <div className="link-row">
            {project.links.map((link) => (
              <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                {link.label === "GitHub" ? <GitBranch size={15} /> : <ExternalLink size={15} />} {link.label}
              </a>
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
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
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

createRoot(document.getElementById("root")).render(<App />);
