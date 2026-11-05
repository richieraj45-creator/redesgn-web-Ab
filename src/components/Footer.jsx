import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { CONTACT } from "../data/siteData";

export const Footer = () => (
  <footer className="bg-brand-ink text-brand-paper" data-testid="site-footer">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-16 md:py-20">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="footer-brand-glass inline-flex items-center rounded-xl border border-white/75 p-2.5 backdrop-blur-xl">
            <img src="/assets/logo-horizontal-transparent.png" alt="Askaran Binjraj" loading="lazy" decoding="async" className="h-11 w-auto" data-testid="footer-logo" />
          </span>
          <p className="mt-6 max-w-sm font-serif italic text-xl leading-relaxed text-white/70">
            Thoughtful style, heritage and everyday finds for every generation.
          </p>
          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-maps-link"
            className="group mt-8 inline-flex items-center gap-2 border border-white/30 px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:border-brand-red hover:bg-brand-red"
          >
            Find the store
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.28em] text-white/40">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li><Link className="link-underline transition-colors hover:text-brand-gold" to="/collections" data-testid="footer-link-collections">Collections</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-gold" to="/about" data-testid="footer-link-about">About Us</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-gold" to="/careers" data-testid="footer-link-careers">Careers</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-gold" to="/cultures-events">Culture & Events</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-gold" to="/contact" data-testid="footer-link-contact">Contact</Link></li>
            <li>
              <a className="link-underline transition-colors hover:text-brand-gold" href={CONTACT.shopUrl} target="_blank" rel="noopener noreferrer" data-testid="footer-link-shop">
                Online Store
              </a>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.28em] text-white/40">Departments</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li><Link className="link-underline transition-colors hover:text-brand-gold" to="/collections/infants">Infants</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-gold" to="/collections/furnishing-decor">Home Decor</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-gold" to="/collections/home-improvements">Home Improvements</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.28em] text-white/40">Find Us</p>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
              <span>Askaran Binjraj Shopping Mall<br />{CONTACT.addressLine1}<br />{CONTACT.addressLine2}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
              <span>{CONTACT.phoneMobile}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
              <a href={`mailto:${CONTACT.email}`} className="link-underline hover:text-white" data-testid="footer-email">{CONTACT.email}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
              <span>{CONTACT.hoursDaily}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.2em] text-white/40 md:flex-row md:items-center md:justify-between">
        <p data-testid="footer-copyright">© {new Date().getFullYear()} {CONTACT.company}</p>
        <p>Fashion · Heritage · Everyday Living</p>
      </div>
    </div>
  </footer>
);
