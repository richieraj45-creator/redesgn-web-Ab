import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, MALL_EXTERIOR } from "../data/siteData";

const IMAGE = "/assets/";
const PAGE_COPY = {
  about: { eyebrow: "Our story · Dhekiajuli, Assam", title: "A family story since 1880.", subtitle: "A place for every generation.", images: [MALL_EXTERIOR], cta: "Discover our story", href: "/about#journey" },
  collections: { eyebrow: "Explore the mall", title: "Find something", subtitle: "for every generation.", images: [`${IMAGE}hero-womens.jpg`], cta: "Browse collections", href: "/collections" },
  careers: { eyebrow: "Careers · Grow with us", title: "Make your next move", subtitle: "with Askaran Binjraj.", images: [`${IMAGE}about/apparel-floor.webp`], cta: "Explore opportunities", href: "/careers#career-departments" },
  contact: { eyebrow: "Visit or get in touch", title: "We’re here", subtitle: "to help you plan your visit.", images: [`${IMAGE}about/mall-entrance-evening.webp`], cta: "Contact our team", href: "/contact#contact-details" },
  "cultures-events": { eyebrow: "Life around the mall", title: "People, Places,", subtitle: "Moments.", images: [`${IMAGE}about/chatar-patar-interior.webp`], cta: "Explore our stories", href: "/cultures-events#stories" },
  blogs: { eyebrow: "Stories · Ideas · Inspiration", title: "Stories from", subtitle: "Askaran Binjraj.", images: [`${IMAGE}saree-red.jpg`], cta: "Read the latest", href: "/blogs#latest" },
  faq: { eyebrow: "Help & information", title: "A little help", subtitle: "for a smooth visit.", images: [`${IMAGE}about/mall-interior-hd.webp`], cta: "Browse collections", href: "/collections" },
  "shipping-policy": { eyebrow: "Help & information", title: "Shipping", subtitle: "made clear.", images: [`${IMAGE}about/folded-apparel-display.webp`], cta: "Browse collections", href: "/collections" },
  "exchange-policy": { eyebrow: "Help & information", title: "Exchange", subtitle: "and support.", images: [`${IMAGE}about/jewellery-display.webp`], cta: "Contact our team", href: "/contact" },
  "best-shopping-mall-in-assam": { eyebrow: "A family destination in Dhekiajuli", title: "Shopping in Assam,", subtitle: "together under one roof.", images: [`${IMAGE}about/central-retail-floor.webp`], cta: "Read our story", href: "/about" },
};

export default function PageSlider() {
  const { pathname } = useLocation();
  const [desktop, setDesktop] = useState(false);
  const isCategory = pathname.startsWith("/collections/");
  const pageKey = isCategory ? "collections" : pathname === "/" ? "home" : pathname.split("/").filter(Boolean)[0];
  const category = isCategory ? CATEGORIES.find((item) => pathname.endsWith(`/${item.slug}`)) : null;
  const content = useMemo(() => category ? {
    eyebrow: category.studio,
    title: category.title,
    subtitle: "Explore the collection.",
    images: [category.heroImage || category.image],
    cta: "Explore the collection",
    href: "#collection-details",
  } : PAGE_COPY[pageKey] || null, [category, pageKey]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("has-page-slider", Boolean(desktop && content));
    return () => document.body.classList.remove("has-page-slider");
  }, [content, desktop]);

  if (!desktop || !content || !content.images?.[0]) return null;

  return (
    <section className="page-slider" aria-label={`${content.eyebrow} hero`}>
      <div className="page-slider-slide is-active">
        <img src={content.images[0]} alt="" fetchPriority="high" decoding="async" />
      </div>
      <div className="page-slider-shade" />
      <div className="page-slider-content">
        <p className="page-slider-eyebrow">{content.eyebrow}</p>
        <h1>{content.title}<br /><em>{content.subtitle}</em></h1>
        <Link to={content.href} className="page-slider-cta">{content.cta}<ArrowUpRight size={16} /></Link>
      </div>
    </section>
  );
}