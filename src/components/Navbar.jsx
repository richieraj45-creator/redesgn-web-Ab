import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { CONTACT } from "../data/siteData";

const LINKS = [
  { label: "Home", path: "/", testId: "nav-link-home" },
  { label: "Collections", path: "/collections", testId: "nav-link-catalog" },
  { label: "About Mall", path: "/about", testId: "nav-link-about" },
  { label: "Careers", path: "/careers", testId: "nav-link-careers" },
  { label: "Contact", path: "/contact", testId: "nav-link-contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12">
        <Link to="/" aria-label="Askaran Binjraj home">
          <img src="/assets/logo-horizontal.png" alt="Askaran Binjraj" className="h-11 w-auto" data-testid="nav-logo" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" data-testid="desktop-nav">
          {LINKS.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              data-testid={l.testId}
              className={({ isActive }) =>
                `link-underline text-xs uppercase tracking-[0.22em] font-medium transition-colors duration-300 ${
                  isActive ? "text-brand-red" : "text-brand-mid hover:text-brand-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={CONTACT.shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-cta-shop-online"
            className="group flex items-center gap-2 bg-brand-red px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-medium text-white transition-colors duration-300 hover:bg-brand-redDark"
          >
            Shop Online
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </nav>
        <button
          className="flex h-11 w-11 items-center justify-center border border-brand-borderMid text-brand-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          data-testid="mobile-menu-toggle"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            key={location.pathname}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-brand-border bg-brand-paper lg:hidden"
            data-testid="mobile-nav"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {LINKS.map((l) => (
                <NavLink
                  key={l.path}
                  to={l.path}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-${l.testId}`}
                  className={({ isActive }) =>
                    `font-serif text-2xl ${isActive ? "italic text-brand-red" : "text-brand-ink"}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <a
                href={CONTACT.phoneMobileHref}
                className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-brand-mid"
                data-testid="mobile-nav-phone"
              >
                <Phone className="h-4 w-4 text-brand-red" /> {CONTACT.phoneMobile}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
