import { motion } from "framer-motion";

const contacts = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nabanita-saha20041123/",
    bg: "from-[#1f2937] to-[#111827]",
  },
  {
    label: "Fiverr",
    href: "https://www.fiverr.com/nabanitasaha312",
    bg: "from-[#1f7a5f] to-[#145a45]",
  },
  {
    label: "Phone",
    href: "tel:9123672388",
    bg: "from-[#2b2b2b] to-[#171717]",
  },
  {
    label: "Gmail",
    href: "mailto:nabanitasaha433@gmail.com",
    bg: "from-[#3a3a3a] to-[#1f1f1f]",
  },
];

export default function Contact() {
  return (
    <main className="bg-black text-white min-h-screen px-16 pt-40 pb-32">

      {/* INTRO */}
      <section className="max-w-3xl mb-32">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-[clamp(3rem,6vw,4.5rem)] leading-tight"
        >
          Let’s connect.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white/60 mt-6 text-lg"
        >
          Choose a channel that feels most comfortable.
        </motion.p>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {contacts.map((item, i) => (
          <motion.a
            key={i}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`group h-[280px] rounded-[3rem] 
              bg-gradient-to-br ${item.bg}
              border border-white/10
              flex items-center justify-between px-16`}
          >
            {/* Label */}
            <span className="font-serif text-4xl">
              {item.label}
            </span>

            {/* Arrow */}
            <span className="text-white/40 text-2xl group-hover:text-white transition">
              →
            </span>
          </motion.a>
        ))}
      </section>

    </main>
  );
}
