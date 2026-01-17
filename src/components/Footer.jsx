export default function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-16 py-16 bg-[#394d56]">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between text-sm text-white/70">
        <button
  onClick={() =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  className="border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-black transition"  style={{ fontFamily: "serif" }}
>
  Nowhere to go but up.
</button>


        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
