import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "RSVP", path: "/rsvp" },
  { label: "FAQ", path: "/faq" },
  { label: "GALLERY", path: "/gallery" },
  { label: "REGISTRY", path: "/registry" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-nav sticky top-0 z-50">
      <div className="relative flex items-center px-4 py-3 md:px-8">
        {/* Mobile hamburger */}
        <button
          className="md:hidden absolute left-4 text-nav-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo / Title */}
        <Link
          to="/"
          className="font-script text-primary text-xl md:text-2xl mx-auto md:mx-0"
        >
          Brianna & Josh
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 ml-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={
                  "text-nav-foreground font-serif text-sm tracking-[0.2em] font-semibold underline-offset-4 hover:underline transition-colors" +
                  (isActive ? " underline text-primary" : "")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-nav border-t border-nav-foreground/20 px-4 pb-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={
                  "block py-2 text-nav-foreground font-serif text-sm tracking-[0.2em] font-semibold" +
                  (isActive ? " underline text-primary underline-offset-4" : "")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}

export default Header;