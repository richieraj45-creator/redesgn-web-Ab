
import { useEffect, useLayoutEffect } from "react";
import "@/App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
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
import PolicyPage from "@/pages/PolicyPage";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminResetPassword from "@/pages/admin/AdminResetPassword";

const BlogRoute = () => {
  const { pathname } = useLocation();
  const slug = pathname.split("/").filter(Boolean).pop();
  const post = getBlogPost(slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Askaran Binjraj`;
    }

    return () => {
      document.title = "Askaran Binjraj | Quality. Variety. Trust.";
    };
  }, [post]);

  return post ? <BlogPostPage post={post} /> : <Navigate to="/blogs" replace />;
};

const BlogsPage = () => {
  useEffect(() => {
    document.title = "Blogs & Stories | Askaran Binjraj";

    return () => {
      document.title = "Askaran Binjraj | Quality. Variety. Trust.";
    };
  }, []);

  return <Blogs />;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

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

      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Admin routes */}
        <Route
  path="/admin/reset-password"
  element={<AdminResetPassword />}
/>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* Existing public routes */}
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
  useEffect(() => {
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

    try {
      lenis = new Lenis({ lerp: 0.065, wheelMultiplier: 0.88 });

      const raf = (time) => {
        lenis.raf(time);
        lenis._id = requestAnimationFrame(raf);
      };

      lenis._id = requestAnimationFrame(raf);
    } catch (e) {
      lenis = null;
    }

    return () => {
      if (lenis) {
        cancelAnimationFrame(lenis._id);
        lenis.destroy();
      }
    };
  }, []);

  return (
    <BrowserRouter>
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
