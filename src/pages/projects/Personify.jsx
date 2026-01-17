import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Personify() {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(null);

  const images = [
    "/images/personify/1.jpg",
    "/images/personify/2.jpg",
    "/images/personify/3.jpg",
    "/images/personify/4.jpg",
    "/images/personify/5.jpg",
    "/images/personify/6.jpg",
  ];

  return (
    <main className="bg-black text-white px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pb-40">

      {/* ================= BACK TO WORK ================= */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => navigate("/work")}
        className="
          mb-12
          text-sm sm:text-base
          text-white/60
          hover:text-white
          transition
        "
      >
        ← Back to Work
      </motion.button>

      {/* ================= HEADER ================= */}
      <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-8">
        Personify
      </h1>

      <p className="max-w-2xl text-white/70 text-lg leading-relaxed">
        Personify is a frontend-focused project exploring
        clarity, interaction, and clean visual hierarchy.
      </p>

      {/* ================= PROJECT IMAGES ================= */}
      <section className="mt-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {images.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt=""
              onClick={() => setActiveImage(img)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="
                rounded-xl
                object-cover
                w-full
                h-48 sm:h-56
                cursor-pointer
                hover:scale-[1.03]
                transition
              "
            />
          ))}
        </div>
      </section>

      {/* ================= IMAGE MODAL ================= */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-50
              bg-black/90 backdrop-blur
              flex items-center justify-center
              px-4
            "
            onClick={() => setActiveImage(null)}
          >
            <motion.img
              src={activeImage}
              alt=""
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="
                max-w-full
                max-h-[85vh]
                rounded-2xl
                object-contain
              "
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
