import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const isArchive = pathname === "/archive";

  // link color logic
  const linkClass = (isActive) =>
    isArchive
      ? isActive
        ? "text-[#111]"
        : "text-[#666]"
      : isActive
      ? "text-white"
      : "text-muted";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 ${
        isArchive
          ? "bg-[#f2f2f2]"
          : "bg-bg/80 backdrop-blur"
      }`}
    >
      <div className="flex items-center justify-between px-16 py-6">
        
        {/* Logo / Name */}
        <NavLink
          to="/"
          className={`text-lg font-semibold tracking-wide ${
            isArchive ? "text-[#111]" : "text-white"
          }`}
        >
        Kyrie
        </NavLink>

        {/* Links */}
        <div className="flex gap-10 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) => linkClass(isActive)}
          >
            Home
          </NavLink>

          <NavLink
            to="/work"
            className={({ isActive }) => linkClass(isActive)}
          >
            Work
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => linkClass(isActive)}
          >
            About Me
          </NavLink>

          <NavLink
  to="/contact"
  className={({ isActive }) =>
    isActive ? "text-white" : "text-muted"
  }
>
  Contact
</NavLink>


         
        </div>

      </div>
    </nav>
  );
}
