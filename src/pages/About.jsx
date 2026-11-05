import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, HeartHandshake, Layers3, MapPin, Sparkles, Utensils } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import { MALL_EXTERIOR, STORE_PHOTOS } from "../data/siteData";

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

export default function About() {
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
              A family venture in Dhekiajuli has grown across six generations. The spirit of personal service lives on in a shopping destination bringing fashion, heritage and everyday needs together.
            </p>
            <Link to="/collections" className="mt-8 inline-flex items-center gap-2 bg-brand-red px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-redDark" data-testid="about-hero-cta">
              Explore the collections <ArrowUpRight className="h-4 w-4" />
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
          <p className="eyebrow">The journey</p>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            From a family venture to a <span className="italic text-brand-red">shared destination.</span>
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
                <div className="overflow-hidden bg-brand-alt" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
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
              Make room for a food break while you shop. Chatar Patar is a vegetarian quick-service restaurant in the mall, offering visitors a relaxed place to pause.
            </p>
            <p className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">
              <Utensils className="h-4 w-4" aria-hidden="true" /> Vegetarian dining · Dhekiajuli
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
            <a href="https://maps.app.goo.gl/oYK6b4wPu7BUnzGb8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-brand-ink px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-ink transition-colors hover:bg-brand-ink hover:text-white">
              Directions <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
