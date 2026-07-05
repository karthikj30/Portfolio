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
  socials: {
    github: "https://github.com/karthikj30",
    linkedin: "https://www.linkedin.com/in/karthik-janardhan-73a8b12a8/",
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
};

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
  },
  {
    role: "Marketing — Joint Head",
    org: "Google Developer Groups on Campus",
    date: "Jan 2026 – Present",
    bullets: [
      "Lead marketing and outreach — securing sponsors and partnerships for technical events and student activities.",
      "Played a key role in organizing HackX 2.0, a national-level hackathon run with the CSI team: event promotion, partner coordination, and community engagement.",
    ],
  },
  {
    role: "Runner-Up",
    org: "OpenAI × NextWave Hackathon",
    date: "Sep 2025 – Jan 2026",
    bullets: [
      "Achieved Runner-Up position, selected for the finale round among 1,700+ competing teams.",
      "Recognized for innovative problem-solving, technical implementation, and team collaboration under competitive constraints.",
    ],
  },
  {
    role: "Intern",
    org: "Google Cloud — Generative AI (via SmartBridge & AICTE)",
    date: "Nov 2025 – Jan 2026",
    bullets: [
      "Completed a virtual internship on Google Cloud Generative AI in collaboration with AICTE.",
      "Hands-on experience with GenAI concepts, real-world use cases, and practical implementation on Google Cloud.",
    ],
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
  },
  {
    role: "Leading the Team",
    org: "Google Cloud GenAI Academy",
    date: "Jan 2025 – Jun 2025",
    bullets: [
      "Completed Google Cloud GenAI Academy — hands-on with Vertex AI, Gemini APIs, Imagen, Streamlit, and Multimodal RAG.",
      "Recognized as a Top 50 Learner (June) among 250,000+ participants; ranked in the Top 1% performers with 800 points.",
    ],
  },
  {
    role: "Winner & Leader",
    org: "Colloquium'25 Inter-College IT Hackathon",
    date: "Mar 2024",
    bullets: [
      "Won first prize under the theme \"IT for Good Governance\" for Itihaas, a heritage-tourism platform.",
      "Co-developed guided tours, interactive maps, rewards, and curated merchandise for user engagement.",
    ],
  },
];

export type Project = {
  name: string;
  date: string;
  stack: string;
  description: string;
  href?: string;
};

export const projects: Project[] = [
  {
    name: "NSE_Observability",
    date: "Jun 2026 – Jul 2026",
    stack: "Prometheus · Grafana · DCGM Exporter · LiteLLM · Langfuse",
    description:
      "An observability stack for LLM-serving infrastructure — monitors latency, token usage, GPU utilization, and model failures to improve troubleshooting and capacity planning.",
  },
  {
    name: "VendorConnect",
    date: "Sep 2025 – Jan 2026",
    stack: "Python · OpenAI · Android",
    description:
      "A digital platform solving raw-material sourcing for street food vendors across India — connects vendors with verified suppliers, group ordering for bulk discounts, and real-time price alerts.",
  },
  {
    name: "Skillora",
    date: "Jul 2025 – Dec 2025",
    stack: "Python · Django · MongoDB",
    description:
      "A centralized learning platform connecting skill development with job opportunities through courses, job matching, and instructor-led learning.",
    href: "https://github.com/karthikj30/Skillora",
  },
  {
    name: "CodeMinds",
    date: "Jul 2025 – Aug 2025",
    stack: "Python · OpenCV",
    description:
      "Built during a Google hackathon — fire detection, crowd monitoring, and automated alert generation.",
  },
  {
    name: "Itihaas",
    date: "Jan 2025 – Apr 2025",
    stack: "Python · Flask · HTML · CSS · SQLite",
    description:
      "A heritage-tourism platform connecting travelers with India's monuments and historical sites — guided tours, interactive maps, rewards, and curated merchandise. Won first prize at Colloquium'25.",
  },
];

export type GithubProject = {
  name: string;
  description: string;
  stack: string;
  href: string;
};

export const githubProjects: GithubProject[] = [
  {
    name: "Monastery360",
    description:
      "A digital heritage platform for Sikkim's 200+ monasteries — 360° virtual tours, interactive maps, and a reward system for spiritual tourism.",
    stack: "React · Maps · 360° Media",
    href: "https://github.com/karthikj30/Monastery360",
  },
  {
    name: "Karigar",
    description:
      "An AI-powered marketplace assistant empowering Indian artisans to tell their story and reach global buyers, with local-language voice narration and artisan mapping.",
    stack: "Vertex AI · GenAI · Maps",
    href: "https://github.com/karthikj30/Karigar",
  },
  {
    name: "EcoSaksham",
    description:
      "A role-based waste-management platform connecting residents, BMC workers, and NGOs for cleaner, smarter cities — with a companion Android app.",
    stack: "Flask · SQLite · Bootstrap · Android",
    href: "https://github.com/karthikj30/EcoSaksham",
  },
  {
    name: "BharatYatra",
    description:
      "A culturally-inspired travel planner for exploring, planning, and booking journeys across India's destinations.",
    stack: "React · React Router",
    href: "https://github.com/karthikj30/BharatYatra",
  },
  {
    name: "DebtEase",
    description:
      "An explainable debt-settlement and expense-sharing assistant — a greedy settlement algorithm paired with an interactive dashboard.",
    stack: "React · Node/Express · D3",
    href: "https://github.com/karthikj30/DebtEase",
  },
  {
    name: "GForce",
    description: "Built for the Bharatiya Antariksh Hackathon (ISRO).",
    stack: "Python",
    href: "https://github.com/karthikj30/GForce",
  },
];

export const certificates: string[] = [
  "Internship Completion Certificate — GET AnalyticX",
  "Gen AI Program — Gen AI Academy (Forge)",
  "Virtual Internship — Generative AI — SmartBridge",
  "Introduction to Technology Apprenticeship — Accenture (Forage)",
  "Cybersecurity Analyst — Job Simulation — Accenture (Forage)",
  "ISRO Course — Government of India",
  "Introduction to Generative AI — IBM SkillsBuild",
  "Certificate of Appreciation — NXT WAVE / OpenAI Academy",
  "Certificate of Acknowledgement — Bharatiya Antariksh Hackathon",
  "Google Developer Groups on Campus",
  "NoSQL & MongoDB Bootcamp — DevTown",
  "Microsoft Student Chapter (MSIT)",
  "Google Cloud Generative AI / AI Completion Certificate",
];
