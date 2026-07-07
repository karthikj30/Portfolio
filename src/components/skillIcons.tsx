import type { ComponentType, CSSProperties } from "react";
import {
  SiC,
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiJson,
  SiMysql,
  SiMongodb,
  SiSqlite,
  SiGooglecloud,
  SiGooglegemini,
  SiPrometheus,
  SiGrafana,
  SiGit,
  SiGithub,
  SiDocker,
  SiUbuntu,
  SiKalilinux,
  SiDjango,
  SiFlask,
  SiStreamlit,
  SiBootstrap,
  SiOpencv,
  SiAndroid,
  SiReactrouter,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import {
  TbApi,
  TbBrain,
  TbBrandVscode,
  TbBrandOpenai,
  TbSparkles,
  TbUsers,
  TbUsersGroup,
  TbBulb,
  TbEye,
  TbRobot,
  TbChartBar,
  TbSpeakerphone,
  TbSpider,
  TbTargetArrow,
  TbCode,
  TbMap,
} from "react-icons/tb";

export type SkillIcon = ComponentType<{
  size?: number;
  className?: string;
  style?: CSSProperties;
}>;
export type SkillMeta = { Icon: SkillIcon; color: string };

const ACCENT = "#22d3ee";
const VIOLET = "#8b5cf6";

const MAP: Record<string, SkillMeta> = {
  c: { Icon: SiC, color: "#A8B9CC" },
  "c++": { Icon: SiCplusplus, color: "#00599C" },
  python: { Icon: SiPython, color: "#3776AB" },
  java: { Icon: FaJava, color: "#E76F00" },
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  typescript: { Icon: SiTypescript, color: "#3178C6" },

  html: { Icon: SiHtml5, color: "#E34F26" },
  css: { Icon: SiCss, color: "#1572B6" },
  react: { Icon: SiReact, color: "#61DAFB" },
  node: { Icon: SiNodedotjs, color: "#5FA04E" },
  express: { Icon: SiExpress, color: "#B4B4B4" },
  "restful apis": { Icon: TbApi, color: ACCENT },
  json: { Icon: SiJson, color: "#B4B4B4" },

  mysql: { Icon: SiMysql, color: "#4479A1" },
  mongodb: { Icon: SiMongodb, color: "#47A248" },
  sqlite: { Icon: SiSqlite, color: "#3A9BDC" },
  "vertex ai": { Icon: SiGooglecloud, color: "#4285F4" },
  "google cloud": { Icon: SiGooglecloud, color: "#4285F4" },
  "gemini api": { Icon: SiGooglegemini, color: VIOLET },
  "multimodal rag": { Icon: TbBrain, color: ACCENT },
  prometheus: { Icon: SiPrometheus, color: "#E6522C" },
  grafana: { Icon: SiGrafana, color: "#F46800" },

  git: { Icon: SiGit, color: "#F05032" },
  github: { Icon: SiGithub, color: "#E2E2E2" },
  docker: { Icon: SiDocker, color: "#2496ED" },
  "linux (ubuntu)": { Icon: SiUbuntu, color: "#E95420" },
  "kali linux": { Icon: SiKalilinux, color: "#367BF0" },
  "vs code": { Icon: TbBrandVscode, color: "#0098FF" },

  django: { Icon: SiDjango, color: "#44B78B" },
  flask: { Icon: SiFlask, color: "#E2E2E2" },
  streamlit: { Icon: SiStreamlit, color: "#FF4B4B" },
  bootstrap: { Icon: SiBootstrap, color: "#7952B3" },
  opencv: { Icon: SiOpencv, color: "#5C6BC0" },
  android: { Icon: SiAndroid, color: "#3DDC84" },
  "react router": { Icon: SiReactrouter, color: "#F44250" },
  d3: { Icon: TbChartBar, color: "#F9A03C" },

  openai: { Icon: TbBrandOpenai, color: "#74AA9C" },
  "generative ai": { Icon: TbBrain, color: VIOLET },
  genai: { Icon: TbBrain, color: VIOLET },
  imagen: { Icon: SiGooglecloud, color: "#4285F4" },
  litellm: { Icon: TbApi, color: ACCENT },
  langfuse: { Icon: TbEye, color: ACCENT },
  "dcgm exporter": { Icon: TbChartBar, color: "#76B900" },
  "gpu telemetry": { Icon: TbChartBar, color: "#76B900" },
  observability: { Icon: TbEye, color: "#E6522C" },
  "power bi": { Icon: TbChartBar, color: "#F2C811" },
  "web scraping": { Icon: TbSpider, color: ACCENT },
  chatbots: { Icon: TbRobot, color: VIOLET },
  maps: { Icon: TbMap, color: ACCENT },
  "360° media": { Icon: TbSparkles, color: VIOLET },

  leadership: { Icon: TbUsers, color: VIOLET },
  teamwork: { Icon: TbUsersGroup, color: ACCENT },
  marketing: { Icon: TbSpeakerphone, color: VIOLET },
  partnerships: { Icon: TbUsers, color: ACCENT },
  "event ops": { Icon: TbTargetArrow, color: VIOLET },
  community: { Icon: TbUsersGroup, color: ACCENT },
  "problem-solving": { Icon: TbBulb, color: "#F2C811" },
  "rapid prototyping": { Icon: TbBulb, color: "#F2C811" },
  "ui/ux": { Icon: TbSparkles, color: VIOLET },
  "full-stack": { Icon: TbCode, color: ACCENT },
};

const FALLBACK: SkillMeta = { Icon: TbSparkles, color: ACCENT };

function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/\.js\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getSkillMeta(name: string): SkillMeta {
  return MAP[normalize(name)] ?? FALLBACK;
}
