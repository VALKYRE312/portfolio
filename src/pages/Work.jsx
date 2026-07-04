import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import usePortfolioData from "../hooks/usePortfolioData";



function VideoPreview({ src, image }) {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);
  
  const [progress, setProgress] = useState(0);

  /* ===== Auto-pause when offscreen ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (!entry.isIntersecting) {
          videoRef.current.pause();
          setPaused(true);
        }
      },
      { threshold: 0.4 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  /* ===== Progress tracking ===== */
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    setProgress((currentTime / duration) * 100);
  };

  /* ===== Play / Pause ===== */
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setPaused(false);
    } else {
      videoRef.current.pause();
      setPaused(true);
    }
  };

  /* ===== Mute / Unmute ===== */
  
  if (!src) {
    return (
      <div className="relative h-[260px] bg-white/10">
        {image ? (
          <img src={image} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/35 font-serif text-2xl">
            Preview
          </div>
        )}
      </div>
    );
  }

  return (
    <div
  onClick={(e) => {
    e.stopPropagation();
    togglePlay();
  }}
  className="relative cursor-pointer group"
>

      {/* VIDEO */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-[260px] object-cover"
      />

      {/* PLAY OVERLAY */}
      <motion.div
        animate={{ opacity: paused ? 1 : 0 }}
        className="
          absolute inset-0
          flex items-center justify-center
          bg-black/30 backdrop-blur-sm
          pointer-events-none
        "
      >
        <div className="
          w-14 h-14
          rounded-full
          border border-white/60
          flex items-center justify-center
          text-white text-xl
        ">
          ▶
        </div>
      </motion.div>

      {/* MUTE BUTTON */}
      

      {/* PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/20">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-white transition-[width] duration-100"
        />
      </div>
    </div>
  );
}

export default function Work() {
  const navigate = useNavigate();
  const { projects } = usePortfolioData();

  return (
    <main className="bg-black text-white px-6 md:px-12 lg:px-20 pt-32 pb-40">

      

      <section className="max-w-7xl mx-auto space-y-32">
        {projects.map((project, index) => {
          const reverse = index % 2 !== 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={() => navigate(project.link)}
              className={`
                ${project.color}
                group cursor-pointer
                flex flex-col lg:flex-row items-center gap-20
                ${reverse ? "lg:flex-row-reverse" : ""}
                rounded-3xl p-10
                transition-all duration-300
                border border-white/10
                hover:border-white/40
              `}
            >
              {/* TEXT */}
              <div className="flex-1">
                <h2 className="font-serif text-3xl mb-6 group-hover:underline underline-offset-4">
                  {project.title}
                </h2>

              <p className="text-white/70 text-lg leading-relaxed max-w-xl">
  {project.description}
</p>

<p className="text-white/50 text-sm leading-relaxed max-w-xl mt-4">
  {project.backend}
</p>

              </div>

              {/* VIDEO */}
              <div className="flex-1 w-full max-w-md rounded-2xl overflow-hidden shadow-lg">
                <VideoPreview src={project.video} image={project.images?.[0]} />
              </div>
            </motion.div>
          );
        })}
      </section>

      
    </main>
  );
}
