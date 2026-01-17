import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import aboutImage from "../assets/images/home-about.jpeg";

/* ================= VERTICAL STATEMENT ================= */

const lines = [
  "A frontend engineer.",
  "A design-driven developer.",
  "A motion-focused problem solver.",
  "A builder of scalable UI systems.",
  "A detail-obsessed interface crafter.",
  "A systems thinker.",
  "An insight gatherer.",
];

// duplicate first line for seamless loop
const loopedLines = [...lines, lines[0]];

export function VerticalStatement() {
  const lineHeight = 64;

  return (
    <section className="my-40 text-center">
      <p className="font-serif text-4xl text-white/80">
        I am a Web Developer.
      </p>

      <p className="mt-4 mb-12 font-serif text-2xl text-white/50">
        But I am also…
      </p>

      <div className="mx-auto overflow-hidden" style={{ height: lineHeight }}>
        <motion.div
          animate={{ y: -lineHeight * (loopedLines.length - 1) }}
          transition={{
            duration: loopedLines.length * 2.2,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex flex-col"
        >
          {loopedLines.map((text, i) => (
            <div
              key={i}
              style={{ height: lineHeight }}
              className="flex items-center justify-center"
            >
              <p className="font-serif text-4xl md:text-5xl text-white">
                {text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================= DATA ================= */

const skills = [
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

const hobbies = [
  {
    title: "Design Exploration",
    color: "bg-pink-200",
    images: [
      "src/assets/hobbies/design1.jpg",
      "src/assets/hobbies/design2.jpg",
      "src/assets/hobbies/design3.jpg",
    ],
  },
  {
    title: "Pets",
    color: "bg-emerald-300",
    images: [
      "src/assets/hobbies/social1.jpg",
      "src/assets/hobbies/social2.jpg",
      "src/assets/hobbies/social3.jpg",
    ],
  },
  {
    title: "Art",
    color: "bg-orange-200",
    images: [
      "src/assets/hobbies/plan1.jpg",
      "src/assets/hobbies/plan2.jpg",
      "src/assets/hobbies/plan3.jpg",
    ],
  },
  {
    title: "Writing",
    color: "bg-yellow-200",
    images: [
      "src/assets/hobbies/write1.jpg",
      "src/assets/hobbies/write2.jpg",
      "src/assets/hobbies/write3.jpg",
    ],
  },
  {
    title: "Travelling",
    color: "bg-fuchsia-300",
    images: [
      "src/assets/hobbies/travel1.jpg",
      "src/assets/hobbies/travel2.jpg",
      "src/assets/hobbies/travel3.jpg",
    ],
  },
  {
    title: "Cooking",
    color: "bg-sky-300",
    images: [
      "src/assets/hobbies/recipe1.jpg",
      "src/assets/hobbies/recipe2.jpg",
      "src/assets/hobbies/recipe3.jpg",
    ],
  },
];

/* ================= MAIN PAGE ================= */

export default function About() {
  const navigate = useNavigate();
  const [activeHobby, setActiveHobby] = useState(null);

  return (
    <motion.main
      initial={{ backgroundColor: "#000" }}
      animate={{ backgroundColor: "#0a0a0a" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen text-white px-6 md:px-12 lg:px-20 pt-28 pb-40"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* ================= IDENTITY ================= */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="rounded-2xl overflow-hidden">
            <img
              src={aboutImage}
              alt="Rue portrait"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-8xl mb-8 font-serif">It’s Kyrie.</h1>

          <p className="text-white/70 leading-relaxed max-w-xl text-2xl font-serif">
            I’m a web developer focused on building clean,
            thoughtful, and motion-aware digital experiences.
            <br /><br />
            I work at the intersection of design and development —
            translating visual intent into reliable frontend systems.
          </p>

          <motion.div className="mt-10">
            <button
              onClick={() => navigate("/work")}
              className="px-8 py-3 rounded-full border border-white/30
                         text-sm tracking-wide text-white/80
                         hover:bg-white hover:text-black transition-all"
            >
              My works!
            </button>
          </motion.div>
        </motion.div>
      </section>

      <VerticalStatement />

      {/* ================= SKILLS + EXPERIENCE ================= */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h3 className="text-xs tracking-widest text-white/50 mb-6">
            SKILLS
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="h-12 rounded-lg bg-white/10
                           flex items-center justify-center
                           text-sm text-white/80"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

<div>
  <h3 className="text-xs tracking-widest text-white/50 mb-6">
    EXPERIENCE
  </h3>

  <div className="space-y-6">
    
    {/* Current Main Role */}
    <div>
      <p className="font-medium">2022 – Present</p>
      <p className="text-white/60">
        Full Stack Developer — Freelance & Personal Projects
      </p>
      <p className="text-white/40 text-sm mt-1">
        Building scalable web apps, REST APIs, authentication systems, and cloud deployments.
      </p>
    </div>

    {/* API + Backend Work */}
    <div>
      <p className="font-medium">2021 – 2022</p>
      <p className="text-white/60">
        Backend & API Development
      </p>
      <p className="text-white/40 text-sm mt-1">
        Designed REST APIs with Node, Express, FastAPI, database integration, and AWS cloud hosting.
      </p>
    </div>

    {/* AI + Auth */}
    <div>
      <p className="font-medium">2023 – Present</p>
      <p className="text-white/60">
        AI Integration & Authentication Systems
      </p>
      <p className="text-white/40 text-sm mt-1">
        Implementing AI-powered features, OAuth / JWT authentication, and secure user systems.
      </p>
    </div>

    {/* EDUCATION */}
    <div className="pt-6">
      <h4 className="text-xs tracking-widest text-white/50 mb-2">
        EDUCATION
      </h4>
      <p className="font-medium">2020 – 2024</p>
      <p className="text-white/60">
        Bachelor’s in Computer Science
      </p>
      <p className="text-white/40 text-sm mt-1">
        Focused on software engineering, databases, and web technologies.
      </p>
    </div>

  </div>
</div>

      </section>

      {/* ================= HOBBIES ================= */}
      <section className="max-w-6xl mx-auto mt-52">
        <h3 className="text-6xl tracking-widest text-white/50 mb-20 text-left font-serif">
          Apart from work, I am a geek for..
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-32 gap-y-32 justify-items-center">
          {hobbies.map((hobby) => (
            <motion.div
              key={hobby.title}
              className="text-center cursor-pointer"
              whileHover={{ y: -8 }}
              onClick={() => setActiveHobby(hobby)}
            >
              <div
                className={`${hobby.color} w-64 h-40 rounded-2xl relative shadow-lg`}
              >
                <div className="absolute -top-3 left-6 w-24 h-7 bg-white/70 rounded-t-xl" />
              </div>

              <p className="mt-4 font-serif text-lg text-white/80">
                {hobby.title}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {activeHobby && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center px-6"
          onClick={() => setActiveHobby(null)}
        >
          <div
            className="bg-[#111] rounded-2xl max-w-4xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-serif text-3xl mb-6">
              {activeHobby.title}
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {activeHobby.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="rounded-lg object-cover w-full h-40"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.main>
  );
}
