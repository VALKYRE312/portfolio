import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GhoroaBazar() {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(null);

  const images = [
    "https://res.cloudinary.com/dbnqvbllo/image/upload/v1783868219/portfolio/gallery/cg9f5ijm9xruic6gzonn.png",
    "https://res.cloudinary.com/dbnqvbllo/image/upload/v1783868221/portfolio/gallery/qq27wisetedyexr3eltp.png",
    "https://res.cloudinary.com/dbnqvbllo/image/upload/v1783868224/portfolio/gallery/tzb7ntpdyccxbshwgdkb.png",
    "https://res.cloudinary.com/dbnqvbllo/image/upload/v1783868220/portfolio/gallery/c4o2sa4dmiqssqxuyzga.png",
    "https://res.cloudinary.com/dbnqvbllo/image/upload/v1783868221/portfolio/gallery/meemsuq34ydicgwvn8kx.png",
    "https://res.cloudinary.com/dbnqvbllo/image/upload/v1783868223/portfolio/gallery/d8rqbmzkj9imcnnjyse8.png",
    "https://res.cloudinary.com/dbnqvbllo/image/upload/v1783868222/portfolio/gallery/manlgn8swl2lt99eyqqe.png",
    "https://res.cloudinary.com/dbnqvbllo/image/upload/v1783868220/portfolio/gallery/uuuan4aiuanw72lydx3f.png",
    "https://res.cloudinary.com/dbnqvbllo/image/upload/v1783868221/portfolio/gallery/hu6rgmrgaq2cvjs6kdvb.png",
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
        Ghoroa Bazar
      </h1>

      <p className="max-w-2xl text-white/70 text-lg leading-relaxed mb-4">
        A full-stack e-commerce platform for discovering and purchasing 
        authentic homemade products from local artisans.
      </p>

      <p className="max-w-2xl text-white/50 text-base leading-relaxed">
        Connects customers with local sellers offering homemade and handcrafted products. 
        Features secure user authentication, product catalog management, shopping cart, 
        order processing, inventory management, cloud-based image storage, and an advanced 
        admin dashboard. Built with Next.js, React, Node.js, MongoDB, Tailwind CSS, 
        Cloudinary, JWT, and REST API.
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
