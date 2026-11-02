/* Askaran Binjraj — Storefront (plain JS: splash, slider, reveals, nav) */
(function () {
  "use strict";

  /* ---------- Splash screen ---------- */
  document.body.classList.add("lock");
  var splash = document.getElementById("splash");
  if (splash) {
    window.setTimeout(function () {
      splash.classList.add("done");
      document.body.classList.remove("lock");
      window.setTimeout(function () {
        if (splash.parentNode) splash.parentNode.removeChild(splash);
      }, 600);
    }, 1250);
  } else {
    document.body.classList.remove("lock");
  }

  /* ---------- Header shadow ---------- */
  var header = document.getElementById("site-header");
  var headerLogo = header && header.querySelector(".sf-logo img");
  var logoLink = header && header.querySelector(".sf-logo");
  window.addEventListener("scroll", function () {
    if (header) {
      var compact = window.scrollY > 12;
      header.classList.toggle("scrolled", compact);
      if (headerLogo && logoLink) {
        var logoSrc = compact ? logoLink.dataset.logoCompact : logoLink.dataset.logoWide;
        if (logoSrc && headerLogo.getAttribute("src") !== logoSrc) headerLogo.setAttribute("src", logoSrc);
      }
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      header.style.setProperty("--scroll-progress", String(progress));
    }
  }, { passive: true });

  /* ---------- Mobile nav ---------- */
  var burger = document.getElementById("burger");
  var mobileNav = document.getElementById("mobile-nav");
  if (burger && mobileNav) {
    burger.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { mobileNav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); });
    });
  }

  /* ---------- Desktop mega menu ---------- */
  var shopMenu = document.getElementById("sf-shop-menu");
  var shopTrigger = shopMenu && shopMenu.querySelector(".sf-menu-trigger");
  if (shopMenu && shopTrigger) {
    document.addEventListener("click", function (event) {
      if (!shopMenu.contains(event.target)) shopTrigger.setAttribute("aria-expanded", "false");
    });
    shopTrigger.addEventListener("click", function () {
      shopTrigger.setAttribute("aria-expanded", shopTrigger.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") { shopTrigger.setAttribute("aria-expanded", "false"); shopTrigger.focus(); }
    });
  }

  /* ---------- Hero slider ---------- */
  var SLIDES = [
    {
      eyebrow: "New Season",
      title: "Dressed to <em>command attention.</em>",
      sub: "Explore high fashion, handcrafted ethnic weaves, and contemporary daily wear at Askaran Binjraj."
    },
    {
      eyebrow: "Heritage Collection",
      title: "Six generations of<br><em>artisan craft.</em>",
      sub: "Authentic Banarasi sarees sourced directly from Varanasi weavers across six generations."
    },
    {
      eyebrow: "Fine Jewellery",
      title: "Adorned in<br><em>pure elegance.</em>",
      sub: "Stunning jewellery styled for weddings, festive pujas, engagements and celebrations."
    },
    {
      eyebrow: "Ready-to-Wear",
      title: "Move through the world<br><em>unforgettably.</em>",
      sub: "Curated apparel, tailored suits, and authentic ethnic wear for men at Askaran Binjraj, Dhekiajuli."
    },
    {
      eyebrow: "Travel & Style",
      title: "Travel light,<br><em>arrive brilliantly.</em>",
      sub: "Luxury luggage and travel accessories on the 4th Floor — suitcases, duffle bags, rucksacks, laptop bags."
    },
    {
      eyebrow: "Beauty & Wellness",
      title: "Your best self,<br><em>every single day.</em>",
      sub: "Prestige cosmetics, skincare and daily beauty essentials from trusted brands in store."
    }
  ];

  var slides = Array.prototype.slice.call(document.querySelectorAll(".sf-slide"));
  var dotsWrap = document.getElementById("hero-dots");
  var counterEl = document.getElementById("hero-counter");
  var eyebrowEl = document.getElementById("hero-eyebrow-text");
  var titleEl = document.getElementById("hero-title");
  var subEl = document.getElementById("hero-sub");
  var textWrap = document.getElementById("hero-text");
  var current = 0;
  var timer = null;

  function pad(n) { return (n < 9 ? "0" : "") + (n + 1); }

  function render(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, idx) { s.classList.toggle("active", idx === current); });
    if (dotsWrap) {
      Array.prototype.forEach.call(dotsWrap.children, function (d, idx) {
        d.classList.toggle("active", idx === current);
        d.setAttribute("aria-current", idx === current ? "true" : "false");
      });
    }
    if (counterEl) counterEl.innerHTML = pad(current) + "<small>/ " + pad(slides.length - 1) + "</small>";
    if (textWrap) {
      textWrap.classList.add("switching");
      window.setTimeout(function () {
        eyebrowEl.textContent = SLIDES[current].eyebrow;
        titleEl.innerHTML = SLIDES[current].title;
        subEl.textContent = SLIDES[current].sub;
        textWrap.classList.remove("switching");
        textWrap.classList.remove("arriving");
        void textWrap.offsetWidth;
        textWrap.classList.add("arriving");
        window.setTimeout(function () { textWrap.classList.remove("arriving"); }, 600);
      }, 350);
    }
  }

  function startAuto() {
    window.clearInterval(timer);
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = window.setInterval(function () { render(current + 1); }, 6000);
  }

  if (slides.length) {
    if (dotsWrap) {
      slides.forEach(function (_, idx) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("data-testid", "hero-dot-" + idx);
        b.setAttribute("aria-label", "Go to slide " + (idx + 1));
        b.addEventListener("click", function () { render(idx); startAuto(); });
        dotsWrap.appendChild(b);
      });
    }
    var prev = document.getElementById("hero-prev");
    var next = document.getElementById("hero-next");
    if (prev) prev.addEventListener("click", function () { render(current - 1); startAuto(); });
    if (next) next.addEventListener("click", function () { render(current + 1); startAuto(); });
    var hero = document.getElementById("hero");
    if (hero) {
      var touchStart = null;
      hero.addEventListener("pointerdown", function (event) {
        if (event.pointerType === "touch") touchStart = { x: event.clientX, y: event.clientY };
      }, { passive: true });
      hero.addEventListener("pointerup", function (event) {
        if (!touchStart || event.pointerType !== "touch") return;
        var dx = event.clientX - touchStart.x;
        var dy = event.clientY - touchStart.y;
        touchStart = null;
        if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.25) {
          render(current + (dx < 0 ? 1 : -1));
          startAuto();
        }
      }, { passive: true });
      hero.addEventListener("pointercancel", function () { touchStart = null; }, { passive: true });
    }
    render(0);
    if (splash) {
      window.setTimeout(startAuto, 1250);
    } else {
      startAuto();
    }
  }

  /* ---------- Hero quick links scroll to sections ---------- */
  document.querySelectorAll("[data-scroll-to]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var el = document.getElementById(btn.getAttribute("data-scroll-to"));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------- Scroll reveals ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Newsletter ---------- */
  var form = document.getElementById("newsletter-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input");
      if (!input.value || input.value.indexOf("@") === -1) {
        input.focus();
        return;
      }
      var thanks = document.createElement("p");
      thanks.className = "news-thanks";
      thanks.setAttribute("data-testid", "newsletter-thanks");
      thanks.textContent = "Thank you — you're on the list.";
      form.parentNode.replaceChild(thanks, form);
    });
  }
})();
