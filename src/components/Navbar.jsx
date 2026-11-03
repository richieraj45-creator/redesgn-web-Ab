import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { CONTACT } from "../data/siteData";

const CATEGORIES = [
  ["Women", "/collections/womens"], ["Men", "/collections/mens"], ["Kids", "/collections/girls"],
  ["Ethnic Wear", "/collections/traditional-wear"], ["Banarasi Sarees", "/collections/sarees"],
  ["Assam Silk", "/collections/sarees"], ["Travel Gear", "/collections/travel-gear"],
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
  <Link key={label} to={to} onClick={onNavigate} className="flex min-h-11 items-center py-1.5 text-sm text-brand-mid transition-colors hover:text-brand-red">
    {label}
  </Link>
));

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-white/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link to="/" aria-label="Askaran Binjraj home" className="shrink-0">
          <img src="/assets/logo-horizontal.png" alt="Askaran Binjraj" className="h-10 w-auto" data-testid="nav-logo" />
        </Link>

        <nav className="hidden h-full items-center gap-7 lg:flex" aria-label="Main navigation">
          <div className="flex h-full items-center" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
            <button type="button" aria-expanded={shopOpen} onClick={() => setShopOpen(true)} className="flex h-full items-center gap-1 text-xs font-bold uppercase tracking-[0.15em] text-brand-ink transition-colors hover:text-brand-red">
              Shop <ChevronDown className={`h-3.5 w-3.5 transition-transform ${shopOpen ? "rotate-180" : ""}`} />
            </button>
            {shopOpen && (
              <div className="absolute left-0 right-0 top-full grid grid-cols-4 gap-6 border border-brand-border bg-brand-paper p-7 text-left shadow-2xl">
                <section><h2 className="mb-3 border-b border-brand-borderMid pb-2 font-serif text-base">Shop by Category</h2><MenuLinks items={CATEGORIES} /></section>
                <section><h2 className="mb-3 border-b border-brand-borderMid pb-2 font-serif text-base">Curated Edits</h2><MenuLinks items={EDITS} /></section>
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
          <NavLink to="/collections" className="text-xs font-bold uppercase tracking-[0.15em] text-brand-ink hover:text-brand-red">Collections</NavLink>
          <NavLink to="/about" className="text-xs font-bold uppercase tracking-[0.15em] text-brand-ink hover:text-brand-red">About Us</NavLink>
          <NavLink to="/careers" className="text-xs font-bold uppercase tracking-[0.15em] text-brand-ink hover:text-brand-red">Careers</NavLink>
          <NavLink to="/contact" className="text-xs font-bold uppercase tracking-[0.15em] text-brand-ink hover:text-brand-red">Contact</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a href={CONTACT.shopUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 bg-brand-red px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-redDark sm:px-4 sm:text-xs">
            Shop Online <ArrowUpRight className="h-3 w-3" />
          </a>
          <button type="button" className="flex h-11 w-11 items-center justify-center border border-brand-border text-brand-ink lg:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} data-testid="mobile-menu-toggle">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className={`mobile-nav-drawer absolute left-0 top-full z-50 w-full overflow-y-auto border-t border-brand-border bg-white px-6 py-5 shadow-xl transition-transform duration-300 lg:hidden ${mobileOpen ? "visible translate-x-0" : "invisible pointer-events-none -translate-x-full"}`} aria-hidden={!mobileOpen}>
        <details className="border-b border-brand-border py-3"><summary className="cursor-pointer font-serif text-lg">Shop by Category</summary><div className="grid grid-cols-2 gap-x-4 py-3"><MenuLinks items={CATEGORIES} onNavigate={closeMobile} /></div></details>
        <details className="border-b border-brand-border py-3"><summary className="cursor-pointer font-serif text-lg">Curated Edits</summary><div className="py-3"><MenuLinks items={EDITS} onNavigate={closeMobile} /></div></details>
        <div className="flex flex-col gap-5 py-5 font-serif text-xl">
          <Link to="/collections" onClick={closeMobile}>Collections</Link><Link to="/about" onClick={closeMobile}>About Us</Link><Link to="/careers" onClick={closeMobile}>Careers</Link><Link to="/contact" onClick={closeMobile}>Contact</Link>
        </div>
        <a href={CONTACT.phoneMobileHref} className="text-xs uppercase tracking-widest text-brand-mid">Call {CONTACT.phoneMobile}</a>
      </div>
    </header>
  );
};
