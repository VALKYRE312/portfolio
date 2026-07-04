export const defaultProjects = [
  {
    id: "personify",
    title: "Personify",
    description:
      "A personality-driven web experience focused on motion, layout rhythm, and emotional tone.",
    backend:
      "Built with React, Framer Motion, Flask, PostgreSQL, and JWT authentication. Includes AI-driven personality logic and dynamic user sessions.",
    video: "https://res.cloudinary.com/dbnqvbllo/video/upload/personify_qpqv3l.mp4",
    color: "bg-pink-200/10",
    link: "/work/personify",
  },
  {
    id: "year-wrap",
    title: "Year Wrap",
    description:
      "An interactive yearly recap designed around storytelling and progressive disclosure.",
    backend:
      "Powered by React, Node.js, Express, and MongoDB. Uses AI summarization APIs to generate personalized yearly insights.",
    video: "https://res.cloudinary.com/dbnqvbllo/video/upload/yearwrap_c5vjid.mp4",
    color: "bg-emerald-200/10",
    link: "/work/year-wrap",
  },
  {
    id: "brew-n-crumbs",
    title: "Brew n Crumbs",
    description:
      "A brand-focused website exploring warmth, typography, and subtle interactions.",
    backend:
      "Full-stack e-commerce setup with React, Firebase, Stripe payments, and a custom admin dashboard for product management.",
    video: "https://res.cloudinary.com/dbnqvbllo/video/upload/brew_fzjcgf.mp4",
    color: "bg-orange-200/10",
    link: "/work/brew-n-crumbs",
  },
  {
    id: "smart-health",
    title: "Smart Health",
    description: "A frontend experiment exploring layout systems and transitions.",
    backend:
      "Healthcare dashboard built with Next.js, FastAPI, and PostgreSQL. Includes protected routes and REST API integration.",
    video: "https://res.cloudinary.com/dbnqvbllo/video/upload/sh_reoow2.mp4",
    color: "bg-yellow-200/10",
    link: "/work/smart-health",
  },
  {
    id: "italian-cuisine",
    title: "Italian Cuisine",
    description: "A UI-focused project emphasizing clarity and hierarchy.",
    backend:
      "Restaurant web app using React, Node.js, Express, and MySQL with reservation and contact form APIs.",
    video: "https://res.cloudinary.com/dbnqvbllo/video/upload/italian_k0jd9x.mp4",
    color: "bg-fuchsia-200/10",
    link: "/work/italian-cuisine",
  },
  {
    id: "eye-opener",
    title: "Eye Opener",
    description: "A motion-first interface designed for smooth user flow.",
    backend:
      "Animation-heavy React experience with GSAP and Framer Motion, optimized for performance and scroll-based transitions.",
    video: "https://res.cloudinary.com/dbnqvbllo/video/upload/eo_ybwpfa.mp4",
    color: "bg-sky-200/10",
    link: "/work/eye-opener",
  },
];

export const defaultSkills = [
  "JavaScript",
  "React",
  "NodeJS",
  "ExpressJS",
  "Tailwind",
  "Python",
  "Fast API",
  "Rest API",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "AWS",
];

export const STORAGE_KEYS = {
  projects: "portfolio.customProjects",
  skills: "portfolio.customSkills",
};

export const projectColors = [
  "bg-pink-200/10",
  "bg-emerald-200/10",
  "bg-orange-200/10",
  "bg-yellow-200/10",
  "bg-fuchsia-200/10",
  "bg-sky-200/10",
];

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readStoredArray(key) {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getCustomProjects() {
  return readStoredArray(STORAGE_KEYS.projects);
}

export function saveCustomProjects(projects) {
  window.localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
}

export function getCustomSkills() {
  return readStoredArray(STORAGE_KEYS.skills);
}

export function saveCustomSkills(skills) {
  window.localStorage.setItem(STORAGE_KEYS.skills, JSON.stringify(skills));
}

export function getProjects() {
  return [...defaultProjects, ...getCustomProjects()];
}

export function getSkills() {
  return [...defaultSkills, ...getCustomSkills()];
}
