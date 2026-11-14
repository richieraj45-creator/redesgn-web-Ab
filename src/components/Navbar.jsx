import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { CONTACT } from "../data/siteData";

const CATEGORIES = [
  ["Women", "/collections/womens"], ["Men", "/collections/mens"], ["Kids", "/collections/girls"],
  ["Ethnic Wear", "/collections/traditional-wear"], ["Banarasi Sarees", "/collections/sarees"],
  ["Assam Silk", "/collections/sarees"], ["Travel Gear", "/collections/travel-gear"],
  ["Infants", "/collections/infants"], ["Home Furnishing & Decor", "/collections/furnishing-decor"],
  ["Home Improvements", "/collections/home-improvements"],
  ["Cosmetics", "/#cosmetics"], ["Fine Jewellery", "/collections/jewellery-lifestyle"],
];

const EDITS = [
  ["The Wedding Studio", "/collections/lehengas"], ["Festive Ready", "/collections/traditional-wear"],
  ["Workwear Essentials", "/collections/womens"], ["Vacation Edit", "/collections/travel-gear"],
];

const PROMOS = [
  { title: "The Royal Banarasi Edit", action: "Explore the collection", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1400", href: "/collections/sarees" },
  { title: "New Arrivals: Summer Collection", action: "Shop online", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=1400", href: CONTACT.shopUrl },
];

const MenuLinks = ({ items, onNavigate }) => items.map(([label, to]) => (
  <Link key={label} to={to} onClick={onNavigate} className="flex min-h-11 items-center py-1.5 text-sm text-white/80 transition-all hover:text-brand-gold hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] focus-visible:text-brand-gold">
    {label}
  </Link>
));

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40);
  const navigateFromMenu = () => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useEffect(() => {
    const updateScrollState = () => {
      const scrollY = window.scrollY;
      setScrolled((current) => {
        if (!current && scrollY > 40) return true;
        if (current && scrollY < 10) return false;
        return current;
      });
    };
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header className={`interior-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className={`interior-navbar-in ${scrolled ? "scrolled" : ""}`}>
        <Link to="/" aria-label="Home" className="interior-navbar-logo">
          <img src="/assets/logo-horizontal-transparent.png" alt="Askaran Binjraj" data-testid="nav-logo" />
        </Link>

        <nav className="interior-navbar-links" aria-label="Main navigation">
          <div className="interior-navbar-shop-menu" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
            <button type="button" aria-expanded={shopOpen} onClick={() => setShopOpen((open) => !open)} className="interior-navbar-menu-trigger">
              Shop <ChevronDown className={`h-3.5 w-3.5 transition-transform ${shopOpen ? "rotate-180" : ""}`} />
            </button>
            {shopOpen && (
              <div className="interior-navbar-dropdown">
                <section><h2>Shop by Category</h2><MenuLinks items={CATEGORIES} /></section>
                <section><h2>Curated Edits</h2><MenuLinks items={EDITS} /></section>
                {PROMOS.map((promo) => (
                  <a key={promo.title} href={promo.href} target={promo.href === CONTACT.shopUrl ? "_blank" : undefined} rel={promo.href === CONTACT.shopUrl ? "noopener noreferrer" : undefined} className="group relative h-52 overflow-hidden bg-brand-ink">
                    <img src={promo.image} alt="" className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-12 text-white">
                      <strong className="block font-serif text-sm">{promo.title}</strong><small className="mt-1 block text-[10px] uppercase tracking-widest text-brand-gold">{promo.action} →</small>
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
          
         <NavLink
           to="/collections"
           end
           onClick={navigateFromMenu}
           className={({ isActive }) =>
            `interior-navbar-link ${isActive ? "is-active" : ""}`
           }
         >
           Collections
         </NavLink>

         <NavLink
           to="/about"
           onClick={navigateFromMenu}
           className={({ isActive }) =>
            `interior-navbar-link ${isActive ? "is-active" : ""}`
           }
         >
           About Us
         </NavLink>

         <NavLink
           to="/careers"
           onClick={navigateFromMenu}
           className={({ isActive }) =>
            `interior-navbar-link ${isActive ? "is-active" : ""}`
           }
         >
           Careers
         </NavLink>

         <NavLink
           to="/cultures-events"
           onClick={navigateFromMenu}
           className={({ isActive }) =>
            `interior-navbar-link ${isActive ? "is-active" : ""}`
           }
         >
           Culture & Events
         </NavLink>

        <NavLink
           to="/blogs"
           onClick={navigateFromMenu}
           className={({ isActive }) =>
            `interior-navbar-link ${isActive ? "is-active" : ""}`
           }
         >
            Blogs
         </NavLink>

         <NavLink
           to="/contact"
           onClick={navigateFromMenu}
           className={({ isActive }) =>
             `interior-navbar-link ${isActive ? "is-active" : ""}`
           }
         >
            Contact
         </NavLink>

       </nav>

        <div className="interior-navbar-actions">
          <a href={CONTACT.shopUrl} target="_blank" rel="noopener noreferrer" className="interior-navbar-shop-button">
            Shop Online <ArrowUpRight className="h-3 w-3" />
          </a>
          <button type="button" className="interior-navbar-burger" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} data-testid="mobile-menu-toggle">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className={`interior-navbar-mobile-nav mobile-nav-drawer ${mobileOpen ? "open" : "closed"}`} aria-hidden={!mobileOpen}>
        <details className="border-b border-brand-border py-3"><summary className="cursor-pointer font-serif text-lg">Shop by Category</summary><div className="grid grid-cols-2 gap-x-4 py-3"><MenuLinks items={CATEGORIES} onNavigate={navigateFromMenu} /></div></details>
        <details className="border-b border-brand-border py-3"><summary className="cursor-pointer font-serif text-lg">Curated Edits</summary><div className="py-3"><MenuLinks items={EDITS} onNavigate={navigateFromMenu} /></div></details>
        
<div className="flex flex-col gap-5 py-5 font-serif text-xl">
  <NavLink
    to="/collections"
    end
    onClick={navigateFromMenu}
    className={({ isActive }) =>
      isActive ? "text-brand-red font-semibold" : "text-brand-ink"
    }
  >
    Collections
  </NavLink>

  <NavLink
    to="/about"
    onClick={navigateFromMenu}
    className={({ isActive }) =>
      isActive ? "text-brand-red font-semibold" : "text-brand-ink"
    }
  >
    About Us
  </NavLink>

  <NavLink
    to="/careers"
    onClick={navigateFromMenu}
    className={({ isActive }) =>
      isActive ? "text-brand-red font-semibold" : "text-brand-ink"
    }
  >
    Careers
  </NavLink>

  <NavLink
    to="/cultures-events"
    onClick={navigateFromMenu}
    className={({ isActive }) =>
      isActive ? "text-brand-red font-semibold" : "text-brand-ink"
    }
  >
    Culture & Events
  </NavLink>

  <NavLink
    to="/blogs"
    onClick={navigateFromMenu}
    className={({ isActive }) =>
      isActive ? "text-brand-red font-semibold" : "text-brand-ink"
    }
  >
    Blogs
  </NavLink>

  <NavLink
    to="/contact"
    onClick={navigateFromMenu}
    className={({ isActive }) =>
      isActive ? "text-brand-red font-semibold" : "text-brand-ink"
    }
  >
    Contact
  </NavLink>
</div>

        <a href={CONTACT.phoneMobileHref} className="text-xs uppercase tracking-widest text-brand-mid">Call {CONTACT.phoneMobile}</a>
      </div>
    </header>
  );
};
