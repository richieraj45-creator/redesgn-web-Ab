import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { CONTACT } from "../data/siteData";

export const Footer = () => (
  <footer className="bg-brand-ink text-brand-paper" data-testid="site-footer">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-16 md:py-20">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="inline-block bg-white px-4 py-2"><img src="/assets/logo-horizontal.png" alt="Askaran Binjraj" className="h-11 w-auto" data-testid="footer-logo" /></span>
          <p className="mt-6 max-w-sm font-serif italic text-xl leading-relaxed text-white/70">
            Elegance, comfort, and style — timeless fashion crafted for every generation and occasion.
          </p>
          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-maps-link"
            className="group mt-8 inline-flex items-center gap-2 border border-white/30 px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:border-brand-red hover:bg-brand-red"
          >
            Visit Askaran Binjraj
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.28em] text-white/40">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li><Link className="link-underline hover:text-white" to="/collections" data-testid="footer-link-collections">Collections</Link></li>
            <li><Link className="link-underline hover:text-white" to="/about" data-testid="footer-link-about">About Mall</Link></li>
            <li><Link className="link-underline hover:text-white" to="/careers" data-testid="footer-link-careers">Careers</Link></li>
            <li><Link className="link-underline hover:text-white" to="/contact" data-testid="footer-link-contact">Contact</Link></li>
            <li>
              <a className="link-underline hover:text-white" href={CONTACT.shopUrl} target="_blank" rel="noopener noreferrer" data-testid="footer-link-shop">
                Online Store
              </a>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.28em] text-white/40">Find Us</p>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
              <span>Askaran Binjraj Shopping Mall<br />{CONTACT.addressLine1}<br />{CONTACT.addressLine2}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
              <span>{CONTACT.phoneLandline} · {CONTACT.phoneMobile}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
              <a href={`mailto:${CONTACT.email}`} className="link-underline hover:text-white" data-testid="footer-email">{CONTACT.email}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
              <span>{CONTACT.hoursWeek}<br />{CONTACT.hoursSun}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.2em] text-white/40 md:flex-row md:items-center md:justify-between">
        <p data-testid="footer-copyright">© {new Date().getFullYear()} {CONTACT.company}</p>
        <p>Top Shopping Mall in Dhekiajuli, Assam · NH 52</p>
      </div>
    </div>
  </footer>
);
