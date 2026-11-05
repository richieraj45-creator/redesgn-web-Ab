import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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

const ScrollManager = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
};

const HomeRedirect = () => {
  useEffect(() => {
    window.location.reload();
  }, []);
  return null;
};

function App() {
  useEffect(() => {
    let lenis = null;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsDesktopSmoothScroll = window.matchMedia("(min-width: 768px)").matches;
    if (prefersReducedMotion || !supportsDesktopSmoothScroll) return undefined;
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
    <div className="App">
      <BrowserRouter>
        <ScrollManager />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<CategoryDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/cultures-events" element={<CultureEvents />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <WhatsAppFloat />
      </BrowserRouter>
      <Toaster position="bottom-right" toastOptions={{ style: { background: "#111111", color: "#FAFAF8", border: "1px solid #C8251E", borderRadius: 0 } }} />
    </div>
  );
}

export default App;
