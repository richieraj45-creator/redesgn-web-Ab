import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { CONTACT } from "../data/siteData";

export const Footer = () => (
  <footer className="border-t border-brand-border bg-brand-paper text-brand-ink" data-testid="site-footer">
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-12">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link to="/" aria-label="Askaran Binjraj home" className="inline-flex items-center rounded-lg border border-brand-border bg-white p-2.5 shadow-sm">
            <img src="/assets/logo-horizontal-transparent.png" alt="Askaran Binjraj" loading="lazy" decoding="async" className="h-10 w-auto" data-testid="footer-logo" />
          </Link>
          <p className="mt-5 max-w-sm font-serif text-lg italic leading-relaxed text-brand-mid">
            Thoughtful style, heritage and everyday finds for every generation.
          </p>
          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-maps-link"
            className="group mt-6 inline-flex items-center gap-2 border border-brand-borderMid px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:border-brand-red hover:bg-brand-red hover:text-white"
          >
            Find the store
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <div className="lg:col-span-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-muted">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-brand-mid">
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/collections" data-testid="footer-link-collections">Collections</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/about" data-testid="footer-link-about">About Us</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/careers" data-testid="footer-link-careers">Careers</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/cultures-events">Culture & Events</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/contact" data-testid="footer-link-contact">Contact</Link></li>
            <li>
              <a className="link-underline transition-colors hover:text-brand-red" href={CONTACT.shopUrl} target="_blank" rel="noopener noreferrer" data-testid="footer-link-shop">
                Online Store
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-muted">Stories</p>
          <ul className="mt-5 space-y-3 text-sm text-brand-mid">
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/blogs">Blogs & Stories</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/blogs/winter-ethnic-wear-guide-askaran-binjraj">Winter ethnic wear</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/blogs/why-askaran-binjraj-is-one-of-the-best-shopping-malls-in-assam">Shopping in Assam</Link></li>
          </ul>
        </div>
        <div className="sm:col-span-2 lg:col-span-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-muted">Find Us</p>
          <ul className="mt-5 space-y-4 text-sm text-brand-mid">
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
              <a href={`mailto:${CONTACT.email}`} className="link-underline hover:text-brand-red" data-testid="footer-email">{CONTACT.email}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
              <span>{CONTACT.hoursDaily}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-3 border-t border-brand-border pt-6 text-[10px] uppercase tracking-[0.18em] text-brand-muted sm:flex-row sm:items-center sm:justify-between">
        <p data-testid="footer-copyright">© {new Date().getFullYear()} {CONTACT.company}</p>
        <p>Fashion · Heritage · Everyday Living</p>
      </div>
    </div>
  </footer>
);
