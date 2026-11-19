
import { useEffect, useLayoutEffect } from "react";
import "@/App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigationType,
  Navigate,
} from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

import Collections from "@/pages/Collections";
import CategoryDetail from "@/pages/CategoryDetail";
import About from "@/pages/About";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import CultureEvents from "@/pages/CultureEvents";
import Blogs, { BlogPostPage } from "@/pages/Blogs";
import { BLOG_POSTS, getBlogPost } from "@/data/blogPosts";
import { CATEGORIES } from "@/data/siteData";
import PolicyPage from "@/pages/PolicyPage";

// Admin components
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminResetPassword from "@/pages/admin/AdminResetPassword";

const BlogRoute = () => {
  const { pathname } = useLocation();
  const slug = pathname.split("/").filter(Boolean).pop();
  const post = getBlogPost(slug);

  return post ? <BlogPostPage post={post} /> : <Navigate to="/blogs" replace />;
};

const BlogsPage = () => <Blogs />;

const SITE_ORIGIN = "https://askaranbinjraj.com";

const setMetaContent = (attribute, name, content) => {
  let element = document.head.querySelector("meta[" + attribute + "=\"" + name + "\"]");
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const setCanonicalUrl = (url) => {
  let element = document.head.querySelector("link[rel=\"canonical\"]");
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", url);
};

const removeCanonicalUrl = () => {
  document.head.querySelector("link[rel=\"canonical\"]")?.remove();
};

const makeDescription = (value) => {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= 155) return clean;
  return clean.slice(0, 152).replace(/\s+\S*$/, "") + "...";
};

const getPageSEO = (pathname) => {
  const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  if (path === "/") {
    return { title: "Shopping Mall in Dhekiajuli, Assam | Askaran Binjraj", description: "Explore fashion, Assam silk, sarees, footwear, beauty, travel and home essentials at Askaran Binjraj in Dhekiajuli, Assam. Visit us or shop online." };
  }
  if (path === "/collections") {
    return { title: "Clothing, Travel & Home Collections | Askaran Binjraj", description: "Browse clothing, traditional wear, footwear, travel, home and family essentials at Askaran Binjraj in Dhekiajuli, Assam. Find your next favourite in store or online." };
  }
  if (path.startsWith("/collections/")) {
    const slug = path.slice("/collections/".length);
    const category = CATEGORIES.find((item) => item.slug === slug);
    if (!category) return null;
    const categoryName = category.slug === "womens" ? "Women’s Fashion" : category.slug === "mens" ? "Men’s Clothing" : category.name;
    const description = makeDescription((category.intro?.[0] || "Explore the " + categoryName + " collection.") + " Visit Askaran Binjraj in Dhekiajuli, Assam.");
    return { title: categoryName + " in Dhekiajuli, Assam | Askaran Binjraj", description };
  }
  if (path === "/about") {
    return { title: "Our Story | Askaran Binjraj, Dhekiajuli", description: "Discover Askaran Binjraj’s family retail story since 1880, six generations, and a shopping destination for fashion, heritage and everyday needs in Dhekiajuli, Assam." };
  }
  if (path === "/careers") {
    return { title: "Careers | Askaran Binjraj, Dhekiajuli", description: "Explore retail, digital, people, finance, inventory and buying career opportunities at Askaran Binjraj in Dhekiajuli, Assam." };
  }
  if (path === "/contact") {
    return { title: "Visit & Contact | Askaran Binjraj, Dhekiajuli", description: "Plan a visit to Askaran Binjraj Shopping Mall at NH-15, Ward No. 7, Dhekiajuli, Sonitpur, Assam. Open daily from 10:00 AM to 10:00 PM." };
  }
  if (path === "/cultures-events") {
    return { title: "Culture & Events | Askaran Binjraj, Assam", description: "Discover culture, celebrations and community events at Askaran Binjraj in Dhekiajuli, Assam." };
  }
  if (path === "/blogs") {
    return { title: "Style Guides & Stories | Askaran Binjraj", description: "Read style guides, heritage stories and family shopping inspiration from Askaran Binjraj in Dhekiajuli, Assam." };
  }
  if (path.startsWith("/blogs/")) {
    const post = getBlogPost(path.slice("/blogs/".length));
    return post ? { title: post.title + " | Askaran Binjraj", description: post.excerpt } : null;
  }
  const policies = {
    "/exchange-policy": { title: "Exchange Policy | Askaran Binjraj", description: "Review the exchange policy for products purchased at Askaran Binjraj Shopping Mall in Dhekiajuli, Assam." },
    "/shipping-policy": { title: "Shipping Policy | Askaran Binjraj", description: "Review the shipping policy and delivery information for Askaran Binjraj online orders." },
    "/terms-conditions": { title: "Terms & Conditions | Askaran Binjraj", description: "Read the terms and conditions for using the Askaran Binjraj website and online services." },
    "/disclaimer": { title: "Disclaimer | Askaran Binjraj", description: "Read the website and product information disclaimer for Askaran Binjraj." },
  };
  return policies[path] || null;
};

const PageSEO = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const isAdmin = path.startsWith("/admin");
    const page = isAdmin ? null : getPageSEO(path);

    if (!page) {
      setMetaContent("name", "robots", "noindex, nofollow");
      removeCanonicalUrl();
      return;
    }

    const canonicalUrl = SITE_ORIGIN + (path === "/" ? "/" : path);
    document.title = page.title;
    setMetaContent("name", "description", page.description);
    setMetaContent("name", "robots", "index, follow");
    setMetaContent("property", "og:type", "website");
    setMetaContent("property", "og:site_name", "Askaran Binjraj");
    setMetaContent("property", "og:title", page.title);
    setMetaContent("property", "og:description", page.description);
    setMetaContent("property", "og:url", canonicalUrl);
    setMetaContent("name", "twitter:card", "summary");
    setMetaContent("name", "twitter:title", page.title);
    setMetaContent("name", "twitter:description", page.description);
    setCanonicalUrl(canonicalUrl);
  }, [pathname]);

  return null;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === "POP") return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, navigationType]);

  return null;
};

// Initialize Lenis only on public website routes.
const LenisController = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      return undefined;
    }

    let lenis = null;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const supportsDesktopSmoothScroll = window.matchMedia(
      "(min-width: 768px)"
    ).matches;

    if (prefersReducedMotion || !supportsDesktopSmoothScroll) {
      return undefined;
    }

    let rafId;

    try {
      lenis = new Lenis({ lerp: 0.065, wheelMultiplier: 0.88 });

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    } catch (error) {
      lenis = null;
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      if (lenis) {
        lenis.destroy();
      }
    };
  }, [pathname]);

  return null;
};

// The root homepage is rendered by the static storefront template.
const HomeRedirect = () => {
  useEffect(() => {
    window.location.reload();
  }, []);

  return null;
};

function AppRoutes() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className={isAdminRoute ? "admin-route-root" : "App"}>
      <ScrollToTop />
      <PageSEO />

      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Admin routes */}
        <Route
          path="/admin/reset-password"
          element={<AdminResetPassword />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={<Navigate to="enquiries" replace />}
          />

          <Route
            path="enquiries"
            element={<AdminDashboard />}
          />
        </Route>

        {/* Existing public website routes */}
        <Route path="/" element={<HomeRedirect />} />

        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:slug" element={<CategoryDetail />} />

        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogRoute />} />

        {BLOG_POSTS.map((post) => (
          <Route
            key={post.legacySlug}
            path={`/${post.legacySlug}/`}
            element={<Navigate to={`/blogs/${post.slug}`} replace />}
          />
        ))}

        <Route path="/exchange-policy" element={<PolicyPage />} />
        <Route path="/shipping-policy" element={<PolicyPage />} />
        <Route path="/terms-conditions" element={<PolicyPage />} />
        <Route path="/disclaimer" element={<PolicyPage />} />

        <Route
          path="/best-shopping-mall-in-assam"
          element={<Navigate to="/about" replace />}
        />

        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/cultures-events" element={<CultureEvents />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppFloat />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LenisController />
      <AppRoutes />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#111111",
            color: "#FAFAF8",
            border: "1px solid #C8251E",
            borderRadius: 0,
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
