export default function Project() {
  return (
    <main className="bg-black text-white px-16 pt-40 pb-32">

      {/* Hero image */}
      <div className="w-full h-[600px] bg-white/10 mb-24" />

      {/* Title */}
      <h1 className="font-serif text-6xl mb-12">
        Project One Title
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-white/70 text-lg leading-relaxed mb-24">
        This project explores clarity, spacing, and interaction
        through a calm frontend experience. The goal was to
        create a design that feels intentional and restrained.
      </p>

      {/* Images */}
      <div className="space-y-20">
        <div className="w-full h-[520px] bg-white/10" />
        <div className="w-full h-[520px] bg-white/10" />
      </div>

    </main>
  );
}
