import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CATEGORIES } from "../data/siteData";
import { BLOG_POSTS } from "../data/blogPosts";

const DEFAULT = ["Askaran Binjraj | Shopping in Dhekiajuli, Assam", "Discover family fashion, heritage wear and everyday essentials at Askaran Binjraj in Dhekiajuli, Assam."];
const PAGES = {
  "/about": ["About Askaran Binjraj | Our Family Story Since 1880", "Discover the six-generation family story, shopping experience and dining at Askaran Binjraj in Dhekiajuli, Assam."],
  "/collections": ["Collections | Askaran Binjraj", "Explore fashion, sarees, occasion wear, footwear and everyday essentials for the family at Askaran Binjraj."],
  "/careers": ["Careers | Askaran Binjraj", "Explore career opportunities and grow with the Askaran Binjraj team in Dhekiajuli, Assam."],
  "/contact": ["Contact & Visit | Askaran Binjraj", "Get directions, opening information and contact details for Askaran Binjraj Shopping Mall in Dhekiajuli."],
  "/cultures-events": ["People, Places, Moments | Askaran Binjraj", "Explore the people, places and moments that make Askaran Binjraj a familiar destination in Dhekiajuli."],
  "/blogs": ["Stories & Style Journal | Askaran Binjraj", "Read stories about family shopping, heritage, style and life at Askaran Binjraj in Dhekiajuli, Assam."],
  "/faq": ["FAQs | Askaran Binjraj", "Find answers about visiting, shopping and dining at Askaran Binjraj in Dhekiajuli, Assam."],
  "/shipping-policy": ["Shipping Policy | Askaran Binjraj", "Review shipping destinations, delivery times and order delivery information for Askaran Binjraj."],
  "/exchange-policy": ["Exchange Policy | Askaran Binjraj", "Find exchange policy information and contact the Askaran Binjraj team for help."],
  "/best-shopping-mall-in-assam/": ["Best Shopping Mall in Assam | Askaran Binjraj", "Explore Askaran Binjraj, a family shopping destination in Dhekiajuli, Sonitpur, Assam."],
  "/best-shopping-mall-in-assam": ["Best Shopping Mall in Assam | Askaran Binjraj", "Explore Askaran Binjraj, a family shopping destination in Dhekiajuli, Sonitpur, Assam."],
};

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const cleanPath = pathname.replace(/\/$/, "") || "/";
    const category = cleanPath.startsWith("/collections/") ? CATEGORIES.find((item) => cleanPath.endsWith(`/${item.slug}`)) : null;
    const blog = cleanPath.startsWith("/blogs/") ? BLOG_POSTS.find((item) => cleanPath.endsWith(`/${item.slug}`)) : null;
    let [title, description] = PAGES[pathname] || PAGES[cleanPath] || DEFAULT;
    if (category) [title, description] = [`${category.name} Collection | Askaran Binjraj`, category.tagline || `Explore ${category.name.toLowerCase()} at Askaran Binjraj in Dhekiajuli, Assam.`];
    if (blog) [title, description] = [`${blog.title} | Askaran Binjraj`, blog.excerpt];
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = description;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    const canonicalPath = cleanPath === "/best-shopping-mall-in-assam" ? "/best-shopping-mall-in-assam/" : cleanPath;
    canonical.href = `https://askaranbinjraj.com${canonicalPath === "/" ? "/" : canonicalPath}`;
    let robots = document.querySelector('meta[name="robots"]');
    if (/\.vercel\.app$/i.test(window.location.hostname)) {
      if (!robots) { robots = document.createElement("meta"); robots.name = "robots"; document.head.appendChild(robots); }
      robots.content = "noindex,follow";
    } else if (robots?.content === "noindex,follow") {
      robots.remove();
    }
  }, [pathname]);
  return null;
}
