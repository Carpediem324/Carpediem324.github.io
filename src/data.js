export const projects = [
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
    images: ["/assets/images/projects/robocop-1.jpg", "/assets/images/projects/robocop-2.jpg"],
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
    images: [
      "/assets/images/projects/gaemi-1.jpg",
      "/assets/images/projects/gaemi-2.jpg",
      "/assets/images/projects/gaemi-3.jpg",
    ],
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
    images: ["/assets/images/projects/kaeri-rover-panel-1.jpg", "/assets/images/projects/kaeri-rover-panel-2.jpg"],
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
    image: "/assets/images/projects/dobot.png",
    imageFit: "contain",
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
    outcome: "SSAFY 삼성전자 DA사업부 연계 프로젝트 우수상 | 3등",
    image: "/assets/images/projects/voice-assistant-1.jpg",
    images: ["/assets/images/projects/voice-assistant-1.jpg", "/assets/images/projects/voice-assistant-2.jpg"],
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

export const profile = {
  name: "신현학",
  headline: "Robotics & Autonomous Driving Software Engineer",
  intro:
    "C++, Python, ROS/ROS2, SLAM, 경로 계획 경험을 바탕으로 로봇이 환경을 인식하고 안정적으로 주행하는 소프트웨어를 만들고 싶습니다.",
  contact: [
    "대한민국, 여수시",
    { label: "imur.navigator@gmail.com", href: "mailto:imur.navigator@gmail.com" },
    { label: "github.com/Carpediem324", href: "https://github.com/Carpediem324" },
    { label: "linkedin.com/in/현학-신-138298299", href: "https://www.linkedin.com/in/현학-신-138298299" },
    "한국어 Native | 영어 Business Level",
  ],
  education: [
    "한국기술교육대학교 컴퓨터공학부 스마트IoT 트랙 공학사 | 2018 - 2024",
  ],
  training: [
    "삼성청년SWAI아카데미 임베디드 로봇 트랙 | 멀티캠퍼스 | 2024.07 - 2025.06",
    "H-모빌리티 클래스 | 현대NGV | 카인사이드아웃 자율주행 - 인지 | 2026.04.20 - 2026.06.26 | 이수 중",
  ],
  awards: [
    "2023 대학생 창작모빌리티 경진대회 무인모빌리티 부문 대상",
    "SSAFY 자율 프로젝트 우수상 | 1등",
    "SSAFY 삼성전자 DA사업부 연계 프로젝트 우수상 | 3등",
    "SSAFY 프로젝트 전시발표회 발표부문 | 1등",
    "PCCP C++ Lv.3",
  ],
};

export const stats = {
  ko: [
    { label: "로보틱스 프로젝트 경력", value: "4년+" },
    { label: "관련 수상이력", value: "4+" },
    { label: "주요 개발 스택", value: "ROS2" },
  ],
  en: [
    { label: "Robotics Project Experience", value: "4Y+" },
    { label: "Related Awards", value: "4+" },
    { label: "Core Stack", value: "ROS2" },
  ],
};

export const careerHighlights = [
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

export const projectEn = {
  "creative-mobility-2023": {
    title: "Student Creative Mobility Competition 2023",
    role: "Localization Lead",
    team: "12 members",
    summary:
      "Led RTK GPS and IMU-based localization, WGS-84 to UTM conversion, and JOSM-based global path generation at K-City.",
    outcome: "Grand Prize | MOLIT Minister Award",
  },
  robocop: {
    title: "ROBOCOP Unmanned Security Robot Control System",
    role: "Autonomous Path Planning & Motion Control",
    team: "6 members",
    summary:
      "Implemented 3D LiDAR object detection, A* global path planning, Pure Pursuit control, and ROS2 topic/service-based state control.",
    outcome: "Autonomous driving simulation",
  },
  "indoor-slam-evaluation": {
    title: "Indoor SLAM Evaluation in Extreme Environments",
    role: "SLAM Evaluation & Robot Experiments",
    team: "3 members",
    summary:
      "Tuned HDL Graph SLAM, tested in Isaac Sim, evaluated with Unitree Go1, and built 3D maps combined with radiation data.",
    outcome: "Indoor SLAM evaluation pipeline",
  },
  gaemi: {
    title: "GAEMI Disaster Area Exploration Robot",
    role: "Hexapod Reinforcement Learning & Sensor Drivers",
    team: "7 members",
    summary:
      "Configured a hexapod reinforcement-learning environment in NVIDIA Isaac Sim and handled sensor driver management and data publishing.",
    outcome: "SSAFY Autonomous Project 1st Place",
  },
  "kaeri-rover-panel": {
    title: "KAERI ROS Remote Operation for Space Exploration Rover",
    role: "ROS Data Integration & Remote Operation",
    team: "2 members",
    summary:
      "Integrated robot camera streams and ROS topic data into a remote operation view with real-time status monitoring.",
    outcome: "Rover remote operation demo",
  },
  "nanosaur-line-tracing": {
    title: "Nanosaur Line Tracing",
    role: "Team Lead | Motor Control & Line Detection",
    team: "3 members",
    summary:
      "Built a Jetson Nano tracked vehicle and implemented OpenCV HSV line detection with C++ motor control logic.",
    outcome: "Line detection and driving control",
  },
  "dobot-magician": {
    title: "Dobot Magician Digital Twin Project",
    role: "Team Lead | ROS Programming & Socket Communication",
    team: "2 members",
    summary:
      "Controlled Dobot in ROS, synchronized joint data with RoboDK, and implemented YOLOv8 panel recognition and sorting logic.",
    outcome: "Sim-to-Real-to-Sim control",
  },
  "voice-assistant": {
    title: "Distributed Voice Event Detection and AI Assistant",
    role: "Embedded On-device Keyword Recognition",
    team: "6 members",
    summary:
      "Built Raspberry Pi 5 Docker runtime, wake-word recognition, MQTT audio transfer, and PulseAudio microphone access handling.",
    outcome: "SSAFY Samsung Electronics DA-linked Project Excellence Award | 3rd place",
  },
  "mock-interview-stt": {
    title: "Mock Interview Website with STT",
    role: "Team Lead | Backend & Prompt Engineering",
    team: "4 members",
    summary:
      "Implemented Firebase auth/database/deployment, STT, Korean keyword extraction, spell checking, and GPT-powered interview Q&A.",
    outcome: "Real-time interview practice service",
  },
  "rag-chatbot": {
    title: "RAG-based Chatbot Service",
    role: "Team Lead | RAG Pipeline",
    team: "4 members",
    summary:
      "Built a news-grounded RAG Q&A service using LangChain, UpstageEmbeddings, Solar LLM, and Chroma DB Top-K retrieval.",
    outcome: "News-grounded RAG Q&A",
  },
};

export const copy = {
  ko: {
    nav: { home: "홈", profile: "프로필", projects: "프로젝트" },
    heroEyebrow: "ROBOTICS SOFTWARE PORTFOLIO",
    heroTitle: "센서 데이터에서 주행 제어까지, 움직이는 로봇을 만듭니다.",
    heroLead: "자율주행 수상 경험과 로봇 실험, 그리고 현업 제어 시스템 경험을 연결해 성장하고 있습니다.",
    primaryCta: "대표 작업 살펴보기",
    secondaryCta: "이력 한눈에 보기",
    careerLabel: "이력 흐름",
    careerTitle: "자율주행 대회 수상에서 산업 제어 시스템 경험까지",
    featuredTitle: "대표 작업",
    featuredAction: "작업 전체 보기",
    profileEyebrow: "Hyeonhak Shin",
    contact: "연락처",
    experience: "경력",
    education: "학력",
    training: "교육 및 활동",
    awards: "수상 및 인증",
    projectsEyebrow: "Selected Work",
    projectsTitle: "프로젝트",
    projectsLead: "자율주행 위치 추정, ROS 기반 로봇 제어, SLAM 평가, 시뮬레이션과 임베디드 로봇 프로젝트를 중심으로 정리했습니다.",
    period: "기간",
  },
  en: {
    nav: { home: "Home", profile: "Profile", projects: "Projects" },
    heroEyebrow: "ROBOTICS SOFTWARE PORTFOLIO",
    heroTitle: "Building robot software from sensor data to motion control.",
    heroLead: "I connect autonomous-driving awards, hands-on robot experiments, and real-world control-system engineering.",
    primaryCta: "Explore Selected Work",
    secondaryCta: "View Career Snapshot",
    careerLabel: "Career Track",
    careerTitle: "From autonomous-driving awards to industrial P/C engineering",
    featuredTitle: "Featured Work",
    featuredAction: "View all work",
    profileEyebrow: "Hyeonhak Shin",
    contact: "Contact",
    experience: "Experience",
    education: "Education",
    training: "Training & Activities",
    awards: "Awards & Certifications",
    projectsEyebrow: "Selected Work",
    projectsTitle: "Projects",
    projectsLead: "Selected work across autonomous localization, ROS robot control, SLAM evaluation, simulation, and embedded robotics.",
    period: "Period",
  },
};

export const profileEn = {
  name: "Hyeonhak Shin",
  intro:
    "I want to build software that helps robots perceive their environment and navigate reliably, grounded in C++, Python, ROS/ROS2, SLAM, and path planning experience.",
  contact: [
    "Yeosu, Republic of Korea",
    { label: "imur.navigator@gmail.com", href: "mailto:imur.navigator@gmail.com" },
    { label: "github.com/Carpediem324", href: "https://github.com/Carpediem324" },
    { label: "linkedin.com/in/hyeonhak-shin", href: "https://www.linkedin.com/in/현학-신-138298299" },
    "Korean Native | English Business Level",
  ],
  education: [
    "KOREATECH, B.S. in Computer Science, Smart IoT Track | 2018 - 2024",
  ],
  training: [
    "Samsung Software AI Academy for Youth, Embedded Robot Track | Multicampus | 2024.07 - 2025.06",
    "H-Mobility Class | Hyundai NGV | Car Inside Out, Autonomous Driving - Perception | 2026.04.20 - 2026.06.26 | In progress",
  ],
  awards: [
    "Grand Prize, Student Creative Mobility Competition 2023, Unmanned Mobility",
    "SSAFY Autonomous Project Excellence Award | 1st place",
    "SSAFY Samsung Electronics DA-linked Project Excellence Award | 3rd place",
    "SSAFY Project Exhibition Presentation Award | 1st place",
    "PCCP C++ Lv.3",
  ],
};

export const careerEn = [
  {
    period: "2023",
    title: "Autonomous Vehicle Research Group",
    text: "Won the MOLIT Minister Award at the K-City unmanned mobility competition, leading RTK GPS/IMU localization and global path generation.",
  },
  {
    period: "Jan 2024 - Jun 2024",
    title: "KAERI Research Intern",
    text: "Worked on Isaac Sim 3D SLAM testing, Unitree Go1 experiments, and ROS robot data integration.",
  },
  {
    period: "Jul 2024 - Jun 2025",
    title: "SSAFY Embedded Robot Track",
    text: "Built ROS2 autonomous driving and walking robot projects including ROBOCOP and GAEMI, winning 1st place in the autonomous project.",
  },
  {
    period: "Current",
    title: "POSCO DX P/C Engineer",
    text: "Working on steel-mill Level2/P-C design while learning industrial data flow, control interfaces, and reliable operating systems.",
  },
];

export const experienceEn = [
  "POSCO DX P/C Engineer | Real-time industrial data flow and control-interface experience",
  "KAERI Research Intern | Isaac Sim 3D SLAM testing, Unitree Go1 experiments, ROS robot data integration",
];
