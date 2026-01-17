import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import aboutImage from "../assets/images/home-about.jpeg";
import projectOneImage from "../assets/images/project-1.jpeg";
import projectTwoImage from "../assets/images/project-2.jpeg";
import projectThreeImage from "../assets/images/project-3.jpeg";
import qSideImage from "../assets/images/q-side.jpeg";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="bg-black text-white">
      <div id="top" />

      {/* ================= HERO ================= */}
<section className="min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-30 relative">
  
  {/* Hero Text */}
 <div className="max-w-5xl">
  <br></br>
  <motion.h1
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    className="font-serif text-[clamp(2rem,6vw,6rem)] leading-[1.1]"
  >
    Hello & welcome. I’m a Full-Stack
    <br />
    Developer & AI Builder
    <br />
    I create intelligent,
    <br />
    scalable, <em className="italic">user-focused</em>
    <br />
    digital products.
  </motion.h1>
<br></br><br></br>

</div>



</section>

<br></br><br></br>
      {/* ================= PROJECT 1 ================= */}
      <ProjectBlock
        image={projectOneImage}
        title="Personify"
        link="/work/personify"
      />

      {/* ================= PROJECT 2 ================= */}
      <ProjectBlock
        image={projectTwoImage}
        title="Year-Wrap"
        link="/work/year-wrap"
      />

      {/* ================= ABOUT ================= */}
      <section className="px-6 md:px-12 lg:px-16 lg:py-32 flex flex-col lg:flex-row gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h3 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] mb-10 leading-tight">
            Nice to meet you,
            <br />
            my name is Kyrie.
          </h3>

         <p className="text-white/70 text-[clamp(1.1rem,2vw,1.6rem)] leading-relaxed">
  As a frontend-focused designer, I enjoy working
  at the intersection of design and development,
  collaborating across disciplines to build
  meaningful digital experiences.
</p>

{/* 👉 ABOUT PAGE BUTTON */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.3, duration: 0.6 }}
  className="mt-10"
>
  <button
    onClick={() => navigate("/about")}
    className="
      px-8 py-3 rounded-full
      border border-white/40
      text-sm tracking-wide
      text-white/80
      hover:bg-white hover:text-black
      transition-all duration-300
    "
  >
    More about me
  </button>
</motion.div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-full lg:flex-1 h-[320px] md:h-[420px] lg:h-[520px] overflow-hidden rounded-2xl"
        >
          <img
            src={aboutImage}
            alt="About"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>
<br></br><br></br><br></br>
      {/* ================= PROJECT 3 ================= */}
      <ProjectBlock
        image={projectThreeImage}
        title="Brew n Crumbs"
        link="/work/brew-n-crumbs"
      />

      {/* ================= PHILOSOPHY ================= */}
      <section className="px-6 md:px-12 lg:px-16 py-32">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex-1"
          >
            <div className="border-l border-white/20 pl-6">
              <p className="font-serif text-[clamp(2.2rem,6vw,6.5rem)] leading-tight text-white/90">
                Designing possibilities
                <br />
                and shaping the future.
              </p>
            </div>

            <p className="font-serif mt-12 pl-6 text-[clamp(1.4rem,3vw,3rem)]">
              <em className="italic">With Passion,</em> Rue.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:flex-1 h-[320px] md:h-[420px] lg:h-[520px] overflow-hidden rounded-2xl"
          >
            <img
              src={qSideImage}
              alt="Philosophy"
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="px-6 md:px-12 lg:px-16 py-32 md:py-48 border-t border-white/20"
      >
        <h2 className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-tight max-w-4xl text-[#58737f]">
          Feel free to drop a message on{" "}
          <span className="underline">LinkedIn</span>, or
          send me an <span className="underline">email</span> —<br />
          I’d love to connect.
        </h2>
      </motion.section>

     
    </main>
  );
}

/* ================= PROJECT BLOCK ================= */

function ProjectBlock({ image, title, link }) {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="px-6 md:px-12 lg:px-16 pb-32 lg:pb-40"
    >
      <div className="w-full h-[40vh] md:h-[55vh] lg:h-[68vh] overflow-hidden rounded-2xl mb-10">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between border-t border-white/20 pt-6">
        <h2 className="font-serif text-3xl">{title}</h2>

        <div className="flex items-center gap-8 text-sm text-white/60">
          <span>// Frontend Design</span>
          <span>// Interaction</span>

          <button
            onClick={() => navigate(link)}
            className="border border-white/40 px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
          >
            View Project
          </button>
        </div>
      </div>
    </motion.section>
  );
}
