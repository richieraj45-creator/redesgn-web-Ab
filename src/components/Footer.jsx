import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { CONTACT } from "../data/siteData";

export const Footer = () => (
  <footer className="bg-brand-alt text-brand-ink" data-testid="site-footer">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-16 md:py-20">
      <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
        <div className="min-w-0 md:col-span-4">
          <span className="footer-brand-glass inline-flex items-center rounded-xl border border-brand-border bg-white/70 p-2.5">
            <img src="/assets/logo-horizontal-transparent.png" alt="Askaran Binjraj" loading="lazy" decoding="async" className="h-11 w-auto" data-testid="footer-logo" />
          </span>
          <p className="mt-6 max-w-sm font-serif italic text-xl leading-relaxed text-brand-mid">
            Thoughtful style, heritage and everyday finds for every generation.
          </p>
          <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" data-testid="footer-maps-link" className="group mt-8 inline-flex items-center gap-2 border border-brand-ink/25 px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:border-brand-red hover:bg-brand-red hover:text-white">
            Find the store
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <div className="min-w-0 md:col-span-2">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-brand-mid">
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/collections">Collections</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/about">About Us</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/careers">Careers</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/cultures-events">Culture & Events</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/blogs">Blogs & Stories</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/contact">Contact</Link></li>
            <li><a className="link-underline transition-colors hover:text-brand-red" href={CONTACT.shopUrl} target="_blank" rel="noopener noreferrer">Online Store</a></li>
          </ul>
        </div>
        <div className="min-w-0 md:col-span-2">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">Help & policies</p>
          <ul className="mt-5 space-y-3 text-sm text-brand-mid">
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/faq">FAQs</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/shipping-policy">Shipping policy</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/exchange-policy">Exchange policy</Link></li>
          </ul>
        </div>
        <div className="min-w-0 md:col-span-4">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">Find Us</p>
          <ul className="mt-5 space-y-4 text-sm text-brand-mid">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" /><span>Askaran Binjraj Shopping Mall<br />{CONTACT.addressLine1}<br />{CONTACT.addressLine2}</span></li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" /><span>{CONTACT.phoneMobile}</span></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" /><a href={`mailto:${CONTACT.email}`} className="link-underline hover:text-brand-red" data-testid="footer-email">{CONTACT.email}</a></li>
            <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" /><span>{CONTACT.hoursDaily}</span></li>
          </ul>
        </div>
      </div>
      <div className="mt-14 flex flex-col gap-3 border-t border-brand-ink/10 pt-8 text-xs uppercase tracking-[0.16em] text-brand-muted md:flex-row md:items-center md:justify-between">
        <p data-testid="footer-copyright">© {new Date().getFullYear()} {CONTACT.company}</p>
        <p>Fashion · Heritage · Everyday Living</p>
      </div>
    </div>
  </footer>
);