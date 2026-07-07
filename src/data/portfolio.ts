export const profile = {
  name: "Karthik Janardhan",
  initials: "KJ",
  role: "IT Student & GenAI Builder",
  roles: [
    "IT Student & GenAI Builder",
    "Full-Stack Developer",
    "GenAI / LLM Tooling",
    "Hackathon Builder",
  ],
  tagline:
    "Third-year IT student who builds full-stack products and GenAI tooling — from LLM observability stacks to hackathon-winning platforms, shipped under real deadlines.",
  location: "Mumbai, India",
  email: "karthikjanardhan5@gmail.com",
  cgpi: "8.40 (T.E.)",
  education: "B.E. Information Technology, St. Francis Institute of Technology (2023–present)",
  resumeUrl: "/resume.pdf",
  githubUser: "karthikj30",
  leetcodeUser: "karthikjanardhan5",
  socials: {
    github: "https://github.com/karthikj30",
    linkedin: "https://www.linkedin.com/in/karthik-janardhan-73a8b12a8/",
    leetcode: "https://leetcode.com/u/karthikjanardhan5/",
  },
};

export const about = {
  paragraphs: [
    "I'm a third-year Information Technology student at St. Francis Institute of Technology, currently holding a CGPI of 8.40. I like building things end-to-end — from the data pipeline to the UI — and I gravitate toward projects where AI tooling solves a real, unglamorous problem.",
    "Over the last two years that's meant an LLM observability stack for a national stock exchange, a heritage-tourism platform that won a hackathon, and a marketplace assistant for Indian artisans powered by Vertex AI. I've also spent time on the other side of the table — leading marketing for Google Developer Groups on Campus and organizing a national-level hackathon.",
  ],
  languages: ["English", "Hindi", "Kannada"],
};

export type Skill = { name: string; category: string };

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: ["C", "C++", "Python", "Java", "JavaScript", "TypeScript"],
  },
  {
    title: "Web",
    items: [
      "HTML",
      "CSS",
      "React.js",
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "JSON",
    ],
  },
  {
    title: "Data & AI",
    items: [
      "MySQL",
      "MongoDB",
      "SQLite",
      "Vertex AI",
      "Gemini API",
      "Multimodal RAG",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Docker", "Linux (Ubuntu)", "Kali Linux", "VS Code"],
  },
];

export type Experience = {
  role: string;
  org: string;
  date: string;
  bullets: string[];
  tag?: string;
  skills: string[];
};

/** Skill-domain proficiency for the animated growth chart in Experience. */
export const skillBars: { label: string; level: number }[] = [
  { label: "Full-Stack Development", level: 85 },
  { label: "Generative AI / LLMs", level: 82 },
  { label: "Observability & DevOps", level: 72 },
  { label: "Data & Databases", level: 76 },
  { label: "Leadership & Communication", level: 90 },
];

export const experience: Experience[] = [
  {
    role: "Application Developer — WEBTECH",
    org: "NSE (National Stock Exchange) — Internship",
    date: "Jun 2026 – Jul 2026",
    tag: "Current",
    bullets: [
      "Designed and implemented an observability stack for LLM-serving infrastructure — real-time tracking of token consumption, model failures, request latency, and GPU utilization.",
      "Used Prometheus for metric scraping and alerts, Grafana for dashboards, DCGM Exporter for NVIDIA GPU telemetry, and LiteLLM + Langfuse for tracing and token-level visibility.",
      "Enabled faster failure investigation, load correlation, and capacity planning across model-serving workloads.",
    ],
    skills: ["Prometheus", "Grafana", "Langfuse", "LiteLLM", "GPU Telemetry", "Observability"],
  },
  {
    role: "Marketing — Joint Head",
    org: "Google Developer Groups on Campus",
    date: "Jan 2026 – Present",
    bullets: [
      "Lead marketing and outreach — securing sponsors and partnerships for technical events and student activities.",
      "Played a key role in organizing HackX 2.0, a national-level hackathon run with the CSI team: event promotion, partner coordination, and community engagement.",
    ],
    skills: ["Leadership", "Marketing", "Partnerships", "Event Ops", "Community"],
  },
  {
    role: "Runner-Up",
    org: "OpenAI × NextWave Hackathon",
    date: "Sep 2025 – Jan 2026",
    bullets: [
      "Achieved Runner-Up position, selected for the finale round among 1,700+ competing teams.",
      "Recognized for innovative problem-solving, technical implementation, and team collaboration under competitive constraints.",
    ],
    skills: ["Problem-Solving", "Rapid Prototyping", "OpenAI", "Teamwork"],
  },
  {
    role: "Intern",
    org: "Google Cloud — Generative AI (via SmartBridge & AICTE)",
    date: "Nov 2025 – Jan 2026",
    bullets: [
      "Completed a virtual internship on Google Cloud Generative AI in collaboration with AICTE.",
      "Hands-on experience with GenAI concepts, real-world use cases, and practical implementation on Google Cloud.",
    ],
    skills: ["Generative AI", "Google Cloud", "Vertex AI"],
  },
  {
    role: "Intern",
    org: "GET AnalyticX",
    date: "Jun 2025 – Jul 2025",
    bullets: [
      "Mastery-level skill training internship — AI tools, Python, and Django-based application development.",
      "Worked with GitHub, web scraping, and chatbot development.",
      "Designed and delivered a live Power BI project (IPL Dashboard) for data visualization and insight generation.",
    ],
    skills: ["Python", "Django", "Web Scraping", "Power BI", "Chatbots"],
  },
  {
    role: "Leading the Team",
    org: "Google Cloud GenAI Academy",
    date: "Jan 2025 – Jun 2025",
    bullets: [
      "Completed Google Cloud GenAI Academy — hands-on with Vertex AI, Gemini APIs, Imagen, Streamlit, and Multimodal RAG.",
      "Recognized as a Top 50 Learner (June) among 250,000+ participants; ranked in the Top 1% performers with 800 points.",
    ],
    skills: ["Vertex AI", "Gemini API", "Imagen", "Streamlit", "Multimodal RAG"],
  },
  {
    role: "Winner & Leader",
    org: "Colloquium'25 Inter-College IT Hackathon",
    date: "Mar 2024",
    bullets: [
      "Won first prize under the theme \"IT for Good Governance\" for Itihaas, a heritage-tourism platform.",
      "Co-developed guided tours, interactive maps, rewards, and curated merchandise for user engagement.",
    ],
    skills: ["Flask", "Full-Stack", "UI/UX", "Teamwork"],
  },
];

export type Project = {
  name: string;
  date: string;
  stack: string;
  description: string;
  href?: string;
  /** Optional cover image, e.g. "/images/projects/vendorconnect.png" (place file in public/images/projects/). */
  image?: string;
  /** Extra images shown in the project dialog gallery (optional). */
  images?: string[];
  /** Longer description (shown in the dialog) — summarised from the repo README. */
  about?: string;
  /** Live deployment link (Vercel/Render/etc). Leave blank to hide the button. */
  demo?: string;
};

export const projects: Project[] = [
  {
    name: "NSE_Observability",
    date: "Jun 2026 – Jul 2026",
    stack: "Prometheus · Grafana · DCGM Exporter · LiteLLM · Langfuse",
    description:
      "An observability stack for LLM-serving infrastructure — monitors latency, token usage, GPU utilization, and model failures to improve troubleshooting and capacity planning.",
    about:
      "An observability stack for local LLM inference — Prometheus + Grafana dashboards, LiteLLM for API-key usage logging, PostgreSQL request logs, and a custom Python exporter. It tracks token consumption, request latency, GPU utilization, and model failures, enabling faster failure investigation, load correlation, and capacity planning across model-serving workloads.",
    image: "/images/projects/nse-observability.png",
    href: "https://github.com/karthikj30/NSE_Observability",
  },
  {
    name: "VendorConnect",
    date: "Sep 2025 – Jan 2026",
    stack: "Python · OpenAI · Android",
    description:
      "A digital platform solving raw-material sourcing for street food vendors across India — connects vendors with verified suppliers, group ordering for bulk discounts, and real-time price alerts.",
    about:
      "A comprehensive digital platform designed to solve the raw-material sourcing problems faced by street-food vendors across India. It connects vendors with verified suppliers, offers group ordering for bulk discounts, and provides real-time price alerts — reducing costs and improving reliability for small food businesses.",
    image: "/images/projects/vendorconnect.png",
    href: "https://github.com/karthikj30/VendorConnect",
    demo: "https://vendorconnect-gkhy.onrender.com",
  },
  {
    name: "Skillora",
    date: "Jul 2025 – Dec 2025",
    stack: "Python · Django · MongoDB",
    description:
      "A centralized learning platform connecting skill development with job opportunities through courses, job matching, and instructor-led learning.",
    about:
      "A Django-powered learning platform that connects skill development with real job opportunities. Skillora brings together courses, job matching, and instructor-led learning in one place, helping learners build in-demand skills and translate them into career growth.",
    image: "/images/projects/skillora.png",
    href: "https://github.com/karthikj30/Skillora",
  },
  {
    name: "EV-Bharat",
    date: "2026",
    stack: "Python · FastAPI · TypeScript · YOLO · RAG",
    description:
      "An AI-integrated EV ecosystem bridging vehicle hardware (ESP32/BMS) with predictive intelligence — battery SOC/SOH/RUL forecasting, computer-vision driver-drowsiness detection, and a RAG advisory bot.",
    about:
      "A state-of-the-art, AI-integrated platform engineered to streamline Electric Vehicle adoption and management in the Indian market. EV-Bharat bridges low-level vehicle hardware (ESP32/BMS sensors) with high-level predictive intelligence: a Battery Intelligence Engine (SOC/SOH/RUL predictions), a computer-vision Driver Safety Engine (MediaPipe drowsiness detection), a YOLO detection service, and a RAG advisory bot — all coordinated through a central WebSocket hub.",
    image: "/images/projects/evbharat.png",
    href: "https://github.com/karthikj30/EV-Bharat",
  },
  {
    name: "Itihaas",
    date: "Jan 2025 – Apr 2025",
    stack: "Python · Flask · HTML · CSS · SQLite",
    description:
      "A heritage-tourism platform connecting travelers with India's monuments and historical sites — guided tours, interactive maps, rewards, and curated merchandise. Won first prize at Colloquium'25.",
    about:
      "A comprehensive Indian heritage-tourism platform that connects travelers with India's rich cultural heritage, monuments, and historical sites. Itihaas offers guided tours, curated merchandise, interactive maps, and a unique reward system to enhance the tourism experience. It won first prize at the Colloquium'25 inter-college IT hackathon under the theme \"IT for Good Governance\".",
    image: "/images/projects/itihaas.png",
    href: "https://github.com/karthikj30/Itihaas",
  },
];

export type GithubProject = {
  name: string;
  description: string;
  stack: string;
  href: string;
  image?: string;
};

export const githubProjects: GithubProject[] = [
  {
    name: "Monastery360",
    description:
      "A digital heritage platform for Sikkim's 200+ monasteries — 360° virtual tours, interactive maps, and a reward system for spiritual tourism.",
    stack: "React · Maps · 360° Media",
    href: "https://github.com/karthikj30/Monastery360",
    image: "/images/projects/monastery360.png",
  },
  {
    name: "Karigar",
    description:
      "An AI-powered marketplace assistant empowering Indian artisans to tell their story and reach global buyers, with local-language voice narration and artisan mapping.",
    stack: "Vertex AI · GenAI · Maps",
    href: "https://github.com/karthikj30/Karigar",
    image: "/images/projects/karigar.png",
  },
  {
    name: "EcoSaksham",
    description:
      "A role-based waste-management platform connecting residents, BMC workers, and NGOs for cleaner, smarter cities — with a companion Android app.",
    stack: "Flask · SQLite · Bootstrap · Android",
    href: "https://github.com/karthikj30/EcoSaksham",
    image: "/images/projects/ecosaksham.png",
  },
  {
    name: "BharatYatra",
    description:
      "A culturally-inspired travel planner for exploring, planning, and booking journeys across India's destinations.",
    stack: "React · React Router",
    href: "https://github.com/karthikj30/BharatYatra",
    image: "/images/projects/bharatyatra.png",
  },
  {
    name: "DebtEase",
    description:
      "An explainable debt-settlement and expense-sharing assistant — a greedy settlement algorithm paired with an interactive dashboard.",
    stack: "React · Node/Express · D3",
    href: "https://github.com/karthikj30/DebtEase",
    image: "/images/projects/debtease.png",
  },
  {
    name: "HealthSaathi",
    description:
      "A patient pre-consultation assistant — guided symptom intake, urgency detection, and doctor-ready reports for better continuity of care.",
    stack: "Node · Express · PostgreSQL",
    href: "https://github.com/karthikj30/HealthSaathi",
    image: "/images/projects/healthsaathi.png",
  },
  {
    name: "Arka Jewels",
    description:
      "A modern, fully responsive jewellery e-commerce web app with a catalogue, cart, and product pages.",
    stack: "React 18 · React Router",
    href: "https://github.com/karthikj30/Arka-Jewels",
    image: "/images/projects/arka-jewels.png",
  },
  {
    name: "GForce",
    description: "Built for the Bharatiya Antariksh Hackathon (ISRO).",
    stack: "Python",
    href: "https://github.com/karthikj30/GForce",
    image: "/images/projects/gforce.png",
  },
];

export type Certificate = {
  title: string;
  /** Optional image, e.g. "/images/certificates/genai.png" (place file in public/images/certificates/). */
  image?: string;
};

export const certificates: Certificate[] = [
  { title: "Internship Completion Certificate — GET AnalyticX", image: "/images/certificates/get.png" },
  { title: "Gen AI Program — Gen AI Academy (Forge)", image: "/images/certificates/genai.jpg" },
  { title: "Virtual Internship — Generative AI — SmartBridge", image: "/images/certificates/google.png" },
  { title: "Introduction to Technology Apprenticeship — Accenture (Forage)", image: "/images/certificates/accenture.png" },
  { title: "Cybersecurity Analyst — Job Simulation — TATA (Forage)", image: "/images/certificates/tata.png" },
  { title: "ISRO Course — Government of India", image: "/images/certificates/isro.png" },
  { title: "Introduction to Generative AI — IBM SkillsBuild", image: "/images/certificates/ibm.png" },
  { title: "Certificate of Appreciation — NXT WAVE / OpenAI Academy", image: "/images/certificates/openai.png" },
  { title: "Certificate of Acknowledgement — Bharatiya Antariksh Hackathon", image: "/images/certificates/bahHack2skill-Certificate.png" },
  { title: "Google Developer Groups on Campus", image: "/images/certificates/gdgvit.png" },
  { title: "NoSQL & MongoDB Bootcamp — DevTown", image: "/images/certificates/microsoft.png" },
  { title: "Microsoft Student Chapter (MSIT)", image: "/images/certificates/google.png" },
  { title: "Google Cloud Generative AI / AI Completion Certificate", image: "/images/certificates/genai.jpg" },
];
