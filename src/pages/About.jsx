import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BadgeCheck, Gem, HeartHandshake, Layers3, MapPin, Sparkles, Star, Utensils } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import { CONTACT, MALL_EXTERIOR, STORE_PHOTOS } from "../data/siteData";

const STATS = [
  { value: "1880", label: "Family story begins in Dhekiajuli" },
  { value: "6", label: "Generations of family retail" },
  { value: "100+", label: "Brands and labels to explore" },
  { value: "1", label: "Destination for the family" },
];

const STORE_IMAGES = [
  { src: "/assets/about/askaran-mall-exterior.webp", alt: "Shopping centre exterior in Dhekiajuli", caption: "A familiar landmark in Dhekiajuli", width: 1536, height: 1024 },
  ...STORE_PHOTOS,
];

const CHATAR_PATAR_IMAGES = [
  { src: "/assets/about/chatar-patar-interior.webp", alt: "Vegetarian restaurant dining area and service counter", caption: "A vegetarian food break, inside the mall", width: 1536, height: 1024 },
];

const DEPARTMENTS = [
  { icon: Layers3, title: "Fashion for every day", body: "Explore clothing and footwear for women, men, and children, alongside pieces for celebrations and special occasions." },
  { icon: Sparkles, title: "Heritage and occasion", body: "Discover Banarasi sarees, Assam silk, handloom styles, and wedding wear in a setting shaped by generations of family retail." },
  { icon: HeartHandshake, title: "More under one roof", body: "Complete the visit with accessories, jewellery, travel gear, home furnishings, kitchen and household essentials, toys, and school needs." },
];

const VALUES = [
  { icon: Gem, title: "Quality", body: "Carefully chosen fabrics, dependable everyday wear and products selected for comfort and durability." },
  { icon: Sparkles, title: "Variety", body: "Traditional and contemporary fashion, occasionwear and lifestyle essentials for every generation." },
  { icon: HeartHandshake, title: "Trust", body: "A customer-first approach and personal service shaped by a family retail story across generations." },
];

const TESTIMONIALS = [
  { name: "Ranjit Das", note: "Long-time customer", body: "Ranjit has shopped here since the store was smaller and values that familiar, personal service as it has grown." },
  { name: "Jagat Kumar", note: "Customer", body: "Jagat appreciates the quality, fair prices and comfortable, durable menswear selection." },
  { name: "Komal Sharma", note: "Customer", body: "Komal highlights the thoughtful designs, responsive team and polished shopping experience." },
  { name: "Ankita Sharma", note: "Regular customer", body: "Ankita enjoys finding traditional and everyday styles together, with more variety than she expected locally." },
  { name: "Priya Baruah", note: "Customer", body: "Priya remembers finding a Bihu outfit for her daughter, with helpful sizing advice and quality that felt worth the price." },
];

const FEATURED_BRANDS = [
  "Daggerfly", "Shree", "Rangriti", "Zola", "Duke", "Moda Elementi", "Lemon Mint", "Tiny Girl", "Alfa", "Deal", "Biba", "Red20Flame", "Rockstar", "Spykar", "Killer", "USPA", "Flying Machine", "Vogartino", "Arrow", "Stori", "Crimsoune Club", "Peter England", "Levis", "Octave", "Jockey",
];

export default function About() {
  const [activeLeader, setActiveLeader] = useState(null);
  const [trademarkPage, setTrademarkPage] = useState(0);

  useEffect(() => {
    if (!activeLeader) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveLeader(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeLeader]);
  return (
    <main data-testid="about-page" className="bg-brand-paper">
      <section className="group relative isolate overflow-hidden bg-brand-ink text-brand-paper">
        <img
          src={MALL_EXTERIOR}
          alt="Askaran Binjraj shopping destination in Dhekiajuli"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-ink via-brand-ink/80 to-brand-ink/35" />
        <div className="mx-auto flex min-h-[470px] max-w-7xl items-center px-5 py-20 sm:px-8 md:min-h-[560px] lg:px-12">
          <Reveal className="max-w-4xl">
            <Breadcrumbs items={[{ label: "About Us" }]} tone="light" className="mb-9" />
            <p className="eyebrow-light">Our story · Dhekiajuli, Assam</p>
            <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-7xl">
              A family story since 1880.<br />
              <span className="italic text-brand-gold">A place for every generation.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              A family venture in Dhekiajuli has grown across six generations. The spirit of personal service lives on in a shopping destination bringing Fashion, Heritage and Everyday Needs together.
            </p>
            <Link to="/collections" className="mt-8 inline-flex items-center gap-2 bg-brand-red px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-redDark" data-testid="about-hero-cta">
              Explore the Collections <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-alt" aria-label="Askaran Binjraj at a glance">
        <Stagger className="mx-auto grid max-w-7xl grid-cols-2 gap-px border-x border-brand-border bg-brand-border lg:grid-cols-4" data-testid="about-stats">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label} className="border border-white/70 bg-white/55 backdrop-blur-lg">
              <div className="px-5 py-8 text-center sm:px-7 sm:py-10">
                <p className="font-serif text-4xl font-medium text-brand-red lg:text-5xl">{stat.value}</p>
                <p className="mx-auto mt-2 max-w-[15rem] text-[10px] uppercase leading-relaxed tracking-[0.19em] text-brand-muted">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12 lg:px-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">The Journey</p>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            From a family venture to a <span className="italic text-brand-red">shared Destination.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 lg:col-span-7">
          <p className="text-base leading-relaxed text-brand-mid">
            The story begins in 1880 in Dhekiajuli. What has carried forward through six generations is a simple promise: thoughtful choice, quality and service that feels personal.
          </p>
          <p className="text-base leading-relaxed text-brand-mid">
            Today, explore fashion for the family, traditional and occasion wear, footwear, jewellery, travel, home, kitchen and school essentials—all together in one welcoming place.
          </p>
          <p className="flex items-start gap-3 border-l-2 border-brand-red pl-5 font-serif text-lg italic leading-relaxed text-brand-ink sm:text-xl">
            More to love. All under one roof.
          </p>
        </Reveal>
      </section>
            
     
      {/* Official Mission and Vision */}
      <section
        className="relative overflow-hidden border-y border-brand-border bg-brand-alt"
        data-testid="about-mission-vision"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="eyebrow">Our Purpose &amp; Direction</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-brand-ink sm:text-4xl lg:text-5xl">
              What Guides <span className="italic text-brand-red">Our Journey.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-mid sm:text-base">
              The principles that shape our commitment to customers, our people
              and the communities we serve.
            </p>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Mission Card */}
            <Reveal>
              <article className="relative flex h-full flex-col overflow-hidden border border-[#E5DAD2] !bg-[#F7F2ED] p-7 !text-[#171717] shadow-[0_18px_45px_rgba(0,0,0,0.06)] sm:p-10">
                <div className="mb-7 flex items-center justify-between gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-red">
                    Our Mission
                  </span>
                  <img
                    src="/assets/logo-horizontal-transparent.png"
                    alt="Askaran Binjraj"
                    className="h-9 w-auto max-w-[145px] shrink-0 object-contain"
                  />
                </div>

                <div className="mb-6 h-px w-16 bg-brand-red/60" />

                <p className="font-serif text-xl leading-relaxed !text-[#171717] sm:text-2xl">
                  Our Mission is to redefine the retail Shopping experience by
                  offering high-quality products with focus on variety and
                  affordability. We aim to become the preferred shopping
                  destination for all our customers' lifestyle needs, setting
                  new standards of excellence in retail industry by staying at
                  the forefront of trends and innovation. Our goal is to foster
                  a sense of belongingness and inclusivity by engaging &
                  supporting local talent and promoting local culture, making
                  our mall a place where everyone feels welcome and valued.
                </p>
              </article>
            </Reveal>

            {/* Vision Card */}
            <Reveal delay={0.1}>
              <article className="relative flex h-full flex-col overflow-hidden border border-[#E5DAD2] !bg-[#F7F2ED] p-7 !text-[#171717] shadow-[0_18px_45px_rgba(0,0,0,0.06)] sm:p-10">
                <div className="mb-7 flex items-center justify-between gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-red">
                    Our Vision
                  </span>
                  <img
                    src="/assets/logo-horizontal-transparent.png"
                    alt="Askaran Binjraj"
                    className="h-9 w-auto max-w-[145px] shrink-0 object-contain"
                  />
                </div>

                <div className="mb-6 h-px w-16 bg-brand-red/60" />

                <p className="font-serif text-xl leading-relaxed !text-[#171717] sm:text-2xl">
                  To empower our customers to live better lives by providing
                  exceptional fashion &amp; lifestyle products, outstanding
                  service, and memorable experiences. We strive to foster a
                  culture of inclusivity, innovation, and integrity within our
                  team, while also contributing positively to the communities
                  we serve. Our aim is to set new bench marks within the
                  industry, build lasting relationships, and make a meaningful
                  impact every day.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>


      <section className="relative isolate overflow-hidden bg-brand-ink text-brand-paper" data-testid="about-leadership">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_10%,rgba(200,37,30,.24),transparent_42%),radial-gradient(ellipse_at_10%_90%,rgba(212,175,55,.14),transparent_38%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-12 lg:items-center lg:px-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow-light">The people behind the name</p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">A family story, <span className="italic text-brand-gold">carried forward.</span></h2>
            <p className="mt-5 text-base leading-relaxed text-white/75">Rooted in the Bothra family’s retail story in Dhekiajuli, Askaran Binjraj has grown into a destination for fashion, lifestyle and household needs across Sonitpur.</p>
            <div className="mt-8 border-l border-brand-gold/70 pl-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Leadership through generations</p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-white/90">Chandan Mal Bothra continued the business after his father, Late K. C. Bothra, in the early 1980s. Vikram Bothra joined his father in 2014, beginning the next chapter of the family’s retail journey.</p>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/65">The business also supports local shop owners through its wholesale division.</p>
          </Reveal>

          <Stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            <StaggerItem>
              <article className="group overflow-hidden border border-white/15 bg-white/5 p-2 shadow-[0_22px_55px_rgba(0,0,0,.22)]">
                <button
                  type="button"
                  onClick={() => setActiveLeader("chandan")}
                  aria-label="Read Chandan Mal Bothra's biography"
                  className="relative block w-full aspect-[4/5] overflow-hidden border-0 bg-brand-alt p-0 text-left"
                >
                  <img src="/assets/about/owners/chandan-mal-bothra.jpg"
                       alt="Chandan Mal Bothra"
                       className="h-full w-full object-cover object-[center_28%] contrast-[1.10] brightness-[1.02] saturate-[1.02] scale-[1.07] transition-transform duration-700 group-hover:scale-[1.10]"
                       loading="lazy"
                       decoding="async"/>
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                </button>
                <div className="px-4 pb-4 pt-4 sm:px-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Chairman</p>
                  <h3 className="mt-1 font-serif text-2xl text-white">Chandan Mal Bothra</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/65">Carried the family retail business into a new era from the early 1980s.</p>
                  <button type="button" onClick={() => setActiveLeader("chandan")} className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold transition-colors hover:text-white">
                    Read More <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </article>
            </StaggerItem>
            <StaggerItem>
              <article className="group overflow-hidden border border-white/15 bg-white/5 p-2 shadow-[0_22px_55px_rgba(0,0,0,.22)]">
                <button
                   type="button"
                   onClick={() => setActiveLeader("vikram")}
                   aria-label="Read Vikram Bothra's biography"
                   className="relative block w-full aspect-[4/5] overflow-hidden border-0 bg-brand-alt p-0 text-left"
                >
                  <img src="/assets/about/owners/vikram-bothra.jpg" alt="Vikram Bothra"  className="h-full w-full object-cover object-[center_25%] contrast-[1.07] brightness-[1.02] saturate-[1.03] scale-[1.05] transition-transform duration-700 group-hover:scale-[1.09]"
                    loading="lazy"
                    decoding="async"/>
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                </button>
                <div className="px-4 pb-4 pt-4 sm:px-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Managing Director/CEO</p>
                  <h3 className="mt-1 font-serif text-2xl text-white">
                  <button
                    type="button"
                    onClick={() => setActiveLeader("vikram")}
                    className="text-left transition-colors duration-300 hover:text-brand-gold"
                  >
                   Vikram Bothra
                 </button>
               </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/65">Joined the Company in 2014, continuing the family’s focus on quality and service.</p>
                  <div className="mt-3 flex flex-col items-start gap-3">
                    <button type="button" onClick={() => setActiveLeader("vikram")} className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold transition-colors hover:text-white">
                      Read More <ArrowUpRight className="h-3 w-3" />
                    </button>
                    <a href="https://www.linkedin.com/in/vikrambothra/"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="Vikram Bothra on LinkedIn"
                       className="inline-flex items-center gap-2 text-xs font-medium text-brand-gold transition-colors duration-300 hover:text-white"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                        <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52zM7.35 18.34H4.67V9.72h2.68v8.62zM6.01 8.54a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zm12.33 9.8h-2.67v-4.2c0-1-.02-2.29-1.4-2.29-1.4 0-1.62 1.09-1.62 2.22v4.27H9.98V9.72h2.56v1.18h.04c.36-.68 1.23-1.4 2.53-1.4 2.7 0 3.23 1.77 3.23 4.08v4.76z"/>
                      </svg>
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </article>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12" data-testid="about-values">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow">What we stand for</p>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Quality. Variety. Trust.</h2>
          <p className="mt-4 text-base leading-relaxed text-brand-mid">The promise behind the name, from premium fabrics and distinctive styles to a customer-first experience and accessible choices.</p>
        </Reveal>
        <Stagger className="grid gap-4 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, body }) => <StaggerItem key={title}><article className="h-full border border-brand-border bg-white p-6 text-center sm:p-8"><Icon className="mx-auto h-6 w-6 text-brand-red" aria-hidden="true" /><h3 className="mt-4 font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-relaxed text-brand-mid">{body}</p></article></StaggerItem>)}
        </Stagger>
        <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-y border-brand-border py-5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-mid">
          {["Premium fabrics", "Unique styles", "Affordable fashion", "Customer-first service"].map((item) => <span key={item} className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-brand-red" />{item}</span>)}
        </Reveal>
      </section>

      <section className="border-y border-brand-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">A destination for every visit</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Many ways to find your thing.</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-mid">Come with a list, look for something special or simply take your time exploring together.</p>
          </Reveal>
          <Stagger className="grid gap-px border border-brand-border bg-brand-border md:grid-cols-3">
            {DEPARTMENTS.map(({ icon: Icon, title, body }, index) => (
              <StaggerItem key={title} className="border border-white/70 bg-white/55 backdrop-blur-lg">
                <article className="h-full p-6 sm:p-8" data-testid={`about-department-${index}`}>
                  <Icon className="h-6 w-6 text-brand-red" aria-hidden="true" />
                  <h3 className="mt-6 font-serif text-2xl font-medium text-brand-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-mid">{body}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24 lg:px-12" data-testid="about-store-gallery">
        <Reveal className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Inside the mall</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">A look around the store.</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-brand-mid">A few familiar details from the entrance to the displays and shopping floors.</p>
        </Reveal>
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STORE_IMAGES.map((image, index) => (
            <StaggerItem key={image.src} className="mx-auto w-full max-w-[300px] sm:max-w-none">
              <figure className="group overflow-hidden border border-white/70 bg-white/65 backdrop-blur-lg" data-testid={`about-gallery-image-${index}`}>
              <div className="aspect-[4/3] overflow-hidden bg-brand-alt">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover contrast-[1.04] saturate-[1.06] transition-transform duration-200 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-ink">{image.caption}</figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-y border-brand-border bg-brand-ink text-brand-paper" data-testid="about-chatar-patar">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-12 lg:items-center lg:px-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow-light">A tasty pause in your visit</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Chatar Patar <span className="italic text-brand-gold">by AB Foods.</span></h2>
            <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
              Added in 2017, Chatar Patar is a 100% vegetarian quick-service restaurant inside the mall. Make room for a food break, enjoy familiar flavours and take a relaxed pause during your visit.
            </p>
            <p className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">
              <Utensils className="h-4 w-4" aria-hidden="true" /> Vegetarian Dining · Dhekiajuli
            </p>
          </Reveal>
          <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
            {CHATAR_PATAR_IMAGES.map((image, index) => (
              <StaggerItem key={image.src} className={index === 0 ? "col-span-2" : ""}>
                <figure className="group overflow-hidden border border-white/15 bg-white/5" data-testid={`about-chatar-image-${index}`}>
                  <div className={index === 0 ? "aspect-[16/8] overflow-hidden" : "aspect-[4/3] overflow-hidden"}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="px-3 py-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/80 sm:px-4 sm:text-[10px]">{image.caption}</figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-y border-brand-border bg-white" data-testid="about-testimonials">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
          <Reveal className="mb-10 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
            <p className="eyebrow">Customer stories</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">Good visits stay with you.</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-mid">Familiar Service, Thoughtful Help and a Wide Choice are the details our Customers remember.</p>
            </div>
            <a href={CONTACT.mapsReviewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-brand-red pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-red">Share your experience <ArrowUpRight className="h-3.5 w-3.5" /></a>
          </Reveal>
          <Stagger className="grid gap-4 lg:grid-cols-12">
            <StaggerItem className="lg:col-span-5">
              <figure className="relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden !bg-brand-ink p-7 text-white sm:p-9">
                <span aria-hidden="true" className="pointer-events-none absolute -right-1 top-0 font-serif text-[12rem] leading-none text-white/[0.055]">“</span>
                <div className="relative">
                  <div className="flex gap-1 text-brand-gold" aria-label="Five star customer review">{[0, 1, 2, 3, 4].map((star) => <Star key={star} className="h-3.5 w-3.5 fill-current" />)}</div>
                  <blockquote className="mt-6 max-w-md font-serif text-2xl leading-relaxed sm:text-3xl">{TESTIMONIALS[0].body}</blockquote>
                </div>
                <figcaption className="relative mt-8 border-t border-white/20 pt-4"><span className="block text-xs font-bold uppercase tracking-[0.14em]">{TESTIMONIALS[0].name}</span><span className="mt-1 block text-[10px] uppercase tracking-[0.12em] text-white/55">{TESTIMONIALS[0].note}</span></figcaption>
              </figure>
            </StaggerItem>
            <StaggerItem className="lg:col-span-7">
              <div className="grid h-full gap-4 sm:grid-cols-2">
                {TESTIMONIALS.slice(1).map((review) => <figure key={review.name} className="flex h-full min-h-[180px] flex-col border border-brand-border bg-brand-paper p-5 sm:p-6"><div className="flex gap-1 text-brand-red" aria-hidden="true">{[0, 1, 2, 3, 4].map((star) => <Star key={star} className="h-3 w-3 fill-current" />)}</div><blockquote className="mt-4 flex-1 font-serif text-lg leading-relaxed text-brand-ink">{review.body}</blockquote><figcaption className="mt-5 border-t border-brand-border pt-3"><span className="block text-[10px] font-bold uppercase tracking-[0.14em]">{review.name}</span><span className="mt-1 block text-[9px] uppercase tracking-[0.12em] text-brand-muted">{review.note}</span></figcaption></figure>)}
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      
      <section
        className="border-y border-brand-border bg-brand-alt"
        data-testid="about-recognition"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow">Recognition &amp; heritage</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">
              Proud Moments, Kept Close.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-mid">
              Two meaningful records from the Askaran Binjraj story, presented
              in their original form.
            </p>
          </Reveal>

          <Stagger className="grid items-stretch gap-5 md:grid-cols-2">

            {/* Har Ghar Tiranga Certificate — unchanged */}
            <StaggerItem>
              <article className="flex h-full flex-col border border-brand-border bg-white p-4 shadow-[0_14px_45px_rgba(31,25,18,0.07)] sm:p-5">
                <a
                  href="/assets/about/owners/har-ghar-tiranga-appreciation.webp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View the full Har Ghar Tiranga certificate"
                >
                  <img
                    src="/assets/about/owners/har-ghar-tiranga-appreciation.webp"
                    alt="Certificate of Appreciation presented to Askaran Binjraj by the Ministry of Culture for the Har Ghar Tiranga initiative"
                    className="aspect-[4/3] w-full border border-brand-border bg-white object-contain p-2"
                    loading="lazy"
                    decoding="async"
                  />
                </a>

                <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-red">
                    Ministry of Culture · Har Ghar Tiranga
                  </p>

                  <h3 className="mt-2 font-serif text-2xl">
                    A moment of national pride
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-brand-mid">
                    A Certificate of Appreciation for successfully pinning a
                    flag as part of the Har Ghar Tiranga initiative.
                  </p>

                  <a
                    href="/assets/about/owners/har-ghar-tiranga-appreciation.webp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-red"
                  >
                    View certificate
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </StaggerItem>

            {/* Trademark Certificate — two-page navigation */}
            <StaggerItem>
              <article className="flex h-full flex-col border border-brand-border bg-white p-4 shadow-[0_14px_45px_rgba(31,25,18,0.07)] sm:p-5">

                <a
                  href={
                    trademarkPage === 0
                      ? "/assets/about/owners/trademark-certificate-page-1.webp"
                      : "/assets/about/owners/trademark-annex-class-25.webp"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open the full-size trademark document"
                  className="block"
                >
                  <img
                    src={
                      trademarkPage === 0
                        ? "/assets/about/owners/trademark-certificate-page-1.webp"
                        : "/assets/about/owners/trademark-annex-class-25.webp"
                    }
                    alt={
                      trademarkPage === 0
                        ? "Askaran Binjraj trademark registration certificate, page 1"
                        : "Askaran Binjraj trademark registration annexure showing the registered logo and Class 25 goods, page 2"
                    }
                    className="aspect-[4/3] w-full border border-brand-border bg-white object-contain p-2"
                    loading="lazy"
                    decoding="async"
                  />
                </a>

                {/* Certificate navigation */}
                <div className="mt-4 flex items-center justify-between gap-2 border-y border-brand-border py-3">
                  <button
                    type="button"
                    onClick={() => setTrademarkPage(0)}
                    disabled={trademarkPage === 0}
                    className="inline-flex items-center gap-1 px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-brand-red transition hover:bg-brand-alt disabled:cursor-not-allowed disabled:opacity-30 sm:px-3"
                  >
                    <span aria-hidden="true">←</span>
                    Previous
                  </button>

                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-mid"
                    aria-live="polite"
                  >
                    Page {trademarkPage + 1} of 2
                  </span>

                  <button
                    type="button"
                    onClick={() => setTrademarkPage(1)}
                    disabled={trademarkPage === 1}
                    className="inline-flex items-center gap-1 px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-brand-red transition hover:bg-brand-alt disabled:cursor-not-allowed disabled:opacity-30 sm:px-3"
                  >
                    Next
                    <span aria-hidden="true">→</span>
                  </button>
                </div>

                <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-red">
                    Trademark Registration · Class 25
                  </p>

                  <h3 className="mt-2 font-serif text-2xl">
                    The mark behind the name
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-brand-mid">
                    The official trademark registration certificate and its
                    annexure document the Askaran Binjraj logo and its
                    registered Class 25 goods.
                  </p>

                  <a
                    href={
                      trademarkPage === 0
                        ? "/assets/about/owners/trademark-certificate-page-1.webp"
                        : "/assets/about/owners/trademark-annex-class-25.webp"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-red"
                  >
                    View full certificate
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </StaggerItem>

          </Stagger>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12" data-testid="about-brands">
        <Reveal className="mx-auto mb-8 max-w-2xl text-center">
          <p className="eyebrow">Our Popular Brands</p>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">More than 100 Labels to Explore.</h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-mid">The previous About page highlighted a broad mix of Fashion and Lifestyle labels. Here are some of the names featured in that selection.</p>
        </Reveal>
        <Stagger className="flex flex-wrap justify-center gap-2.5">
          {FEATURED_BRANDS.map((brand) => <StaggerItem key={brand}><span className="inline-flex min-h-11 items-center border border-brand-border bg-white px-4 text-xs font-semibold tracking-wide text-brand-mid">{brand}</span></StaggerItem>)}
        </Stagger>
      </section>

      <section className="border-t border-brand-border bg-brand-alt">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-12 lg:items-center lg:px-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Come see us</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Find us in Dhekiajuli.</h2>
            <p className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-brand-mid">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
              NH-15, Ward No. 7, Dhekiajuli, Sonitpur, Assam - 784110
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-red px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-redDark">
              Plan your visit <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/blogs" className="inline-flex items-center gap-2 border border-brand-ink px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-ink transition-colors hover:bg-brand-ink hover:text-white">
              Read our stories <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://maps.app.goo.gl/oYK6b4wPu7BUnzGb8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-brand-ink px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-ink transition-colors hover:bg-brand-ink hover:text-white">
              Directions <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>
      
            {/* Shared leadership biography popup */}
      {activeLeader && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveLeader(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="leadership-bio-title"
            className="relative flex h-[90dvh] max-h-[900px] w-full max-w-3xl flex-col overflow-hidden border border-brand-gold/30 bg-brand-ink text-brand-paper shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveLeader(null)}
              aria-label="Close biography"
              className="absolute right-4 top-4 z-30 flex h-10 w-10 shrink-0 items-center justify-center border border-white/30 bg-brand-ink text-2xl text-white shadow-lg hover:bg-brand-red"
            >
              &times;
            </button>

            <div className="grid h-full min-h-0 flex-1 grid-rows-[240px_minmax(0,1fr)] overflow-hidden md:grid-cols-[0.85fr_1.15fr] md:grid-rows-1">
              <div className="relative h-[240px] shrink-0 bg-brand-alt md:h-full md:min-h-0">
                <img
                  src={
                    activeLeader === "vikram"
                      ? "/assets/about/owners/vikram-bothra.jpg"
                      : "/assets/about/owners/chandan-mal-bothra.jpg"
                  }
                  alt={
                    activeLeader === "vikram"
                      ? "Vikram Bothra, Managing Director and CEO"
                      : "Chandan Mal Bothra, Chairman"
                  }
                  className={
                    activeLeader === "vikram"
                      ? "absolute inset-0 h-full w-full object-cover object-[center_25%]"
                      : "absolute inset-0 h-full w-full object-cover object-[center_28%]"
                  }
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

               <div
                 className="h-full min-h-0 max-h-full overflow-y-scroll overscroll-y-contain p-6 pb-10 sm:p-9 md:p-10"
                 style={{
                   WebkitOverflowScrolling: "touch",
                   scrollbarWidth: "thin",
                 }}
               >
                <p className="pr-12 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
                  Leadership · Askaran Binjraj
                </p>

                <h2
                  id="leadership-bio-title"
                  className="mt-4 pr-12 font-serif text-3xl leading-tight sm:text-4xl"
                >
                  {activeLeader === "vikram"
                    ? "Vikram Bothra"
                    : "Chandan Mal Bothra"}
                </h2>

                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">
                  {activeLeader === "vikram"
                    ? "Managing Director / CEO"
                    : "Chairman"}
                </p>

                <div className="my-6 h-px w-16 bg-brand-gold/70" />

                {activeLeader === "vikram" ? (
                  <div className="space-y-4 text-sm leading-relaxed text-white/75">
                    <p>Vikram Bothra is a sixth-generation entrepreneur in the retailing and wholesale of fashion and lifestyle products from Assam, India. Based in Dhekiajuli, near Tezpur, he comes from a family that has been serving people with fashion and personal service since the 1880s.</p>
                    <p>An Economics graduate from the University of Calcutta and an MBA from Narsee Monjee Institute of Management Studies (NMIMS), Mumbai, he brings experience in shopping-centre development and mall management. He worked extensively with Knight Frank India Pvt. Ltd., closing retail real-estate transactions across India. He also gained experience in financial management, cash-flow management and loan management at Reliance Capital, Mumbai.</p>
                    <p>Vikram joined the family business in 2014. In 2016, he launched ASKARAN BINJRAJ, a 50,000-square-foot lifestyle departmental store serving the region. The destination brings apparel, footwear and lifestyle shopping together with a vegetarian quick-service restaurant and The House of Kids, a play and activity area for children aged 2 to 7.</p>
                    <p>The business employs approximately 200 local people and participates in social initiatives supporting the local community.</p>
                    <p>In 2023, he completed online Certificates of Specialisation from Harvard Business School in Strategy and Leadership & Management, comprising six courses: Data Science for Business, Negotiation Mastery, Organisational Leadership, Economics for Managers, Disruptive Strategy and Strategy Execution.</p>
                    <p>He is currently pursuing a Doctor of Business Administration (DBA) at Golden Gate University, San Francisco, USA, and serves as Chairman of the Northeast Chapter of the Retailers’ Association of India (RAI).</p>
                    <p>His work spans retail strategy, product assortment planning, catchment analysis, mall development, operational efficiency, emerging technologies, customer experience and organisational leadership, contributing to the economic landscape of Northeast India.</p>
                  </div>
                ) : (
                  <div className="space-y-4 text-sm leading-relaxed text-white/75">
                    <p>Chandan Mal Bothra represents the fifth generation of the Bothra family’s retail business. Born in 1959, he completed his B.Com (Honours) from Darrang College in 1978. After briefly pursuing Law, he left his studies to join his father’s shop, entering the business in 1980 and formally taking charge in 1981 at the age of 22.</p>
                    <p>At the time, the business was a small shop with around four to five employees and ranked near the bottom of local sales. He gradually transformed its direction, moving away from miscellaneous merchandise and focusing on textiles and readymade garments.</p>
                    <p>He personally travelled across India to understand customer preferences, suitable price ranges and sourcing opportunities. By studying what local customers needed and ensuring that the right products were available, he steadily grew the business and its customer base.</p>
                    <p>A defining part of his philosophy was to offer good-quality merchandise at reasonable prices, with a strict fixed-rate policy. Customers came to recognise the shop for transparent pricing, dependable quality, wide availability and service without bargaining.</p>
                    <p>Under his leadership, the business grew from a small team of four or five employees into a regional enterprise employing more than 300 people. The sixth generation joined the business in 2014, continuing the family’s retail journey.</p>
                    <p>Several local social organisations have recognised his contribution with letters of appreciation, known as <em>Abhinandan Patra</em>.</p>
                    <p>His journey reflects the values he consistently emphasised in his interview: customer trust, quality, reasonable pricing, product availability and steady progress.</p>
                  </div>
                )}

                {activeLeader === "vikram" && (
                  <a
                    href="https://www.linkedin.com/in/vikrambothra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex w-fit items-center gap-2 border border-brand-gold/50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-gold hover:bg-brand-gold hover:text-brand-ink"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    Connect on LinkedIn
                  </a>
                )}

                <p className="mt-6 text-[10px] uppercase tracking-[0.15em] text-white/40">
                  Askaran Binjraj · Est. 1880
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
