import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL, defaultProjects } from "../data/portfolioData";

export default function DynamicProject() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      // Check if it's an existing hardcoded project
      const existingProject = defaultProjects.find((item) => item.id === projectId);
      
      if (existingProject) {
        setProject(existingProject);
        setLoading(false);
        return;
      }

      // Otherwise fetch from API
      try {
        const response = await fetch(`${API_BASE_URL}/projects/${projectId}`);
        if (response.ok) {
          const data = await response.json();
          setProject(data);
        } else {
          setProject(null);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white px-6 md:px-12 lg:px-16 pt-32 pb-32">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white/50 text-lg">Loading project...</div>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-black text-white px-6 md:px-12 lg:px-16 pt-32 pb-32">
        <button
          onClick={() => navigate("/work")}
          className="mb-12 text-white/60 hover:text-white transition"
        >
          Back to Work
        </button>
        <h1 className="font-serif text-5xl mb-6">Project not found</h1>
        <p className="text-white/60">This project is not available in the portfolio.</p>
      </main>
    );
  }

  const images = project.images || [];

  return (
    <main className="bg-black text-white px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pb-40">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => navigate("/work")}
        className="mb-12 text-sm sm:text-base text-white/60 hover:text-white transition"
      >
        Back to Work
      </motion.button>

      <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-8">
        {project.title}
      </h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Left: Description */}
        <div className="flex-1">
          <p className="text-white/70 text-lg leading-relaxed">
            {project.description}
          </p>

          {project.backend && (
            <p className="text-white/45 text-base leading-relaxed mt-5">
              {project.backend}
            </p>
          )}

          {project.techStack && project.techStack.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm tracking-widest text-white/45 mb-3">TECH STACK</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(project.github || project.live) && (
            <div className="mt-8 flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full border border-white/20 text-white/75 hover:bg-white hover:text-black transition text-sm"
                >
                  GitHub →
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-white text-black hover:bg-white/90 transition text-sm font-medium"
                >
                  Live Demo →
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right: Video */}
        {project.video && (
          <div className="w-full lg:w-[480px] lg:sticky lg:top-32">
            <video
              src={project.video}
              controls
              playsInline
              className="w-full rounded-xl border border-white/10"
            />
          </div>
        )}
      </div>

      {images.length > 0 && (
        <section className="mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {images.map((img, i) => (
              <motion.img
                key={`${img}-${i}`}
                src={img}
                alt=""
                onClick={() => setActiveImage(img)}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl object-cover w-full h-48 sm:h-56 cursor-pointer hover:scale-[1.03] transition"
              />
            ))}
          </div>
        </section>
      )}

      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center px-4"
            onClick={() => setActiveImage(null)}
          >
            <motion.img
              src={activeImage}
              alt=""
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
