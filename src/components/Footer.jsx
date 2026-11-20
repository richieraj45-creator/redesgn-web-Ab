
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { CONTACT } from "../data/siteData";

export const Footer = () => (
  <footer className="border-t border-brand-border bg-brand-paper text-brand-ink" data-testid="site-footer">
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-12">
      <div className="interior-footer-grid grid gap-10">
        <div>
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

          {/* Social Media Links - New addition only */}
          <div className="mt-5 flex items-center gap-3" data-testid="footer-social-links">
            <a
              href="https://www.facebook.com/askaranbinjrajdkj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Askaran Binjraj on Facebook"
              data-testid="footer-facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-borderMid text-brand-mid transition-colors duration-300 hover:border-brand-red hover:bg-brand-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              <Facebook className="h-4 w-4" />
            </a>

            <a
              href="https://www.instagram.com/askaranbinjraj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Askaran Binjraj on Instagram"
              data-testid="footer-instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-borderMid text-brand-mid transition-colors duration-300 hover:border-brand-red hover:bg-brand-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              <Instagram className="h-4 w-4" />
            </a>

            <a
              href="https://youtube.com/@askaranbinjraj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe to Askaran Binjraj on YouTube"
              data-testid="footer-youtube"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-borderMid text-brand-mid transition-colors duration-300 hover:border-brand-red hover:bg-brand-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
          {/* End of social media links */}

        </div>

        <div>
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

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-muted">Useful Links</p>
          <ul className="mt-5 space-y-3 text-sm text-brand-mid">
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/exchange-policy">Exchange Policies</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/shipping-policy">Shipping Policy</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/terms-conditions">Terms and Conditions</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/disclaimer">Disclaimer</Link></li>
            <li><Link className="link-underline transition-colors hover:text-brand-red" to="/about">Best Shopping Mall in Assam</Link></li>
          </ul>
        </div>

        <div>
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
