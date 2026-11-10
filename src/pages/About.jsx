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

      <section className="relative isolate overflow-hidden bg-brand-ink text-brand-paper" data-testid="about-leadership">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_10%,rgba(200,37,30,.24),transparent_42%),radial-gradient(ellipse_at_10%_90%,rgba(212,175,55,.14),transparent_38%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-12 lg:items-center lg:px-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow-light">The people behind the name</p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">A family story, <span className="italic text-brand-gold">carried forward.</span></h2>
            <p className="mt-5 text-base leading-relaxed text-white/75">Rooted in the Bothra family’s retail story in Dhekiajuli, Askaran Binjraj has grown into a destination for fashion, lifestyle and household needs across Sonitpur.</p>
            <div className="mt-8 border-l border-brand-gold/70 pl-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Leadership through generations</p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-white/90">Chandan Mal (C. M.) Bothra continued the business after his father, Late K. C. Bothra, in the early 1980s. Vikram Bothra joined his father in 2013, beginning the next chapter of the family’s retail journey.</p>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/65">The business also supports local shop owners through its wholesale division.</p>
          </Reveal>

          <Stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            <StaggerItem>
              <article className="group overflow-hidden border border-white/15 bg-white/5 p-2 shadow-[0_22px_55px_rgba(0,0,0,.22)]">
                <div className="relative aspect-[4/5] overflow-hidden bg-brand-alt">
                  <img src="/assets/about/owners/chandan-mal-bothra.jpg" alt="Chandan Mal Bothra" className="h-full w-full object-cover object-center contrast-[1.04] saturate-[.9] transition-transform duration-700 group-hover:scale-[1.035]" loading="lazy" decoding="async" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                </div>
                <div className="px-4 pb-4 pt-4 sm:px-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Family leadership</p>
                  <h3 className="mt-1 font-serif text-2xl text-white">Chandan Mal Bothra</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/65">Carried the family retail business into a new era from the early 1980s.</p>
                </div>
              </article>
            </StaggerItem>
            <StaggerItem>
              <article className="group overflow-hidden border border-white/15 bg-white/5 p-2 shadow-[0_22px_55px_rgba(0,0,0,.22)]">
                <div className="relative aspect-[4/5] overflow-hidden bg-brand-alt">
                  <img src="/assets/about/owners/vikram-bothra.jpg" alt="Vikram Bothra" className="h-full w-full object-cover object-center contrast-[1.04] saturate-[.9] transition-transform duration-700 group-hover:scale-[1.035]" loading="lazy" decoding="async" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                </div>
                <div className="px-4 pb-4 pt-4 sm:px-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-gold">The next generation</p>
                  <h3 className="mt-1 font-serif text-2xl text-white">Vikram Bothra</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/65">Joined his father in 2013, continuing the family’s focus on quality and service.</p>
                </div>
              </article>
            </StaggerItem>
          </Stagger>

          <Reveal className="grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-2 lg:col-span-12">
            <article className="border border-white/10 bg-white/5 p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Our mission</p><p className="mt-3 text-sm leading-relaxed text-white/75">Bring quality, genuine fashion and a comfortable shopping experience to families across Assam, with honesty at the heart of every visit.</p></article>
            <article className="border border-white/10 bg-white/5 p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Our vision</p><p className="mt-3 text-sm leading-relaxed text-white/75">Set a high standard for retail in the Northeast, showing how heritage and modern style can belong together.</p></article>
          </Reveal>
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

      <section className="border-y border-brand-border bg-white" data-testid="about-testimonials">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
          <Reveal className="mb-10 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
            <p className="eyebrow">Customer stories</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">Good visits stay with you.</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-mid">Familiar service, thoughtful help and a wide choice are the details our customers remember.</p>
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

      <section className="border-y border-brand-border bg-brand-alt" data-testid="about-recognition">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow">Recognition &amp; heritage</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Proud moments, kept close.</h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-mid">Two meaningful records from the Askaran Binjraj story, presented in their original form.</p>
          </Reveal>
          <Stagger className="grid items-stretch gap-5 md:grid-cols-2">
            <StaggerItem>
              <article className="flex h-full flex-col border border-brand-border bg-white p-4 shadow-[0_14px_45px_rgba(31,25,18,0.07)] sm:p-5">
                <a href="/assets/about/owners/har-ghar-tiranga-appreciation.jpg" target="_blank" rel="noopener noreferrer" aria-label="View the full Har Ghar Tiranga certificate">
                  <img src="/assets/about/owners/har-ghar-tiranga-appreciation.jpg" alt="Certificate of Appreciation presented to Askaran Binjraj by the Ministry of Culture for the Har Ghar Tiranga initiative" className="aspect-[4/3] w-full border border-brand-border bg-white object-contain p-2" loading="lazy" decoding="async" />
                </a>
                <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-red">Ministry of Culture · Har Ghar Tiranga</p>
                  <h3 className="mt-2 font-serif text-2xl">A moment of national pride</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-mid">A Certificate of Appreciation for successfully pinning a flag as part of the Har Ghar Tiranga initiative.</p>
                  <a href="/assets/about/owners/har-ghar-tiranga-appreciation.jpg" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-red">View certificate <ArrowUpRight className="h-3.5 w-3.5" /></a>
                </div>
              </article>
            </StaggerItem>
            <StaggerItem>
              <article className="flex h-full flex-col border border-brand-border bg-white p-4 shadow-[0_14px_45px_rgba(31,25,18,0.07)] sm:p-5">
                <a href="/assets/about/owners/trademark-annex-class-25.jpg" target="_blank" rel="noopener noreferrer" aria-label="View the full Class 25 trademark certificate annex">
                  <img src="/assets/about/owners/trademark-annex-class-25.jpg" alt="Trademark certificate annex displaying the Askaran Binjraj mark and Class 25 goods" className="aspect-[4/3] w-full border border-brand-border bg-white object-contain p-2" loading="lazy" decoding="async" />
                </a>
                <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-red">Trademark certificate annex · Class 25</p>
                  <h3 className="mt-2 font-serif text-2xl">The mark behind the name</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-mid">The submitted certificate annex records the Askaran Binjraj logo and its registered Class 25 goods.</p>
                  <a href="/assets/about/owners/trademark-annex-class-25.jpg" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-red">View certificate annex <ArrowUpRight className="h-3.5 w-3.5" /></a>
                </div>
              </article>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12" data-testid="about-brands">
        <Reveal className="mx-auto mb-8 max-w-2xl text-center">
          <p className="eyebrow">Our popular brands</p>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">More than 100 labels to explore.</h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-mid">The previous About page highlighted a broad mix of fashion and lifestyle labels. Here are some of the names featured in that selection.</p>
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
    </main>
  );
}
