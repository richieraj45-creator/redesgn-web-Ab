import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import { MALL_EXTERIOR, MALL_INTERIOR } from "../data/siteData";

const STATS = [
  { value: "1980", label: "Serving Since" },
  { value: "6th", label: "Generation Family Legacy" },
  { value: "100+", label: "Leading Brands" },
  { value: "7", label: "Days Open a Week" },
];

const SECTIONS = [
  {
    eyebrow: "Best Shopping Mall in Sonitpur & Assam",
    body: [
      "Askaran Binjraj has established itself as one of the best shopping malls in Sonitpur district and Assam. Located in Dhekiajuli, our mall serves customers from nearby towns and villages who seek quality products and a comfortable shopping environment.",
      "From stylish clothing for men, women, and kids to accessories and home essentials, we focus on offering variety that suits every age group and budget. Our commitment to quality products and customer satisfaction has made us a top shopping mall in Dhekiajuli, trusted by hundreds of local shoppers.",
    ],
  },
  {
    eyebrow: "Why We Are the Best Shopping Mall in Assam",
    body: [
      "Askaran Binjraj stands out as the Best Shopping Mall in Assam because of its wide range of shopping options, modern infrastructure, and customer-friendly environment. From top fashion brands to daily essentials, everything is available under one roof, making shopping easy and convenient for everyone.",
      "Our mall offers a clean, spacious, and comfortable atmosphere where families and individuals can enjoy a hassle-free experience. With a perfect mix of quality stores, great service, and a prime location, we continue to be the preferred choice for shoppers looking for the Best Shopping Mall in Assam.",
    ],
  },
  {
    eyebrow: "Shopping Experience at the Best Shopping Mall in Assam",
    body: [
      "Shopping at Askaran Binjraj, known as the Best Shopping Mall in Assam, offers a comfortable and enjoyable experience for every visitor. The mall is designed with spacious walkways, a clean environment, and well-organized stores that make browsing and shopping easy.",
      "Whether you are visiting with family or friends, you can explore a wide variety of fashion, lifestyle, and daily needs all in one place. With excellent facilities, helpful staff, and a relaxing atmosphere, we ensure that every visit to the Best Shopping Mall in Assam is convenient, satisfying, and memorable.",
    ],
  },
];

export default function About() {
  return (
    <main data-testid="about-page">
      <section className="border-b border-brand-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-16 pb-14 sm:px-6 md:pt-24 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow" data-testid="about-eyebrow">About the Mall</p>
              <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Askaran Binjraj — Top Shopping Mall in <span className="italic text-brand-red">Dhekiajuli, Assam</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-brand-mid">
                Known for quality, variety, and affordability, our mall brings together fashion, lifestyle, and household essentials under one roof. If you are looking for a trusted shopping mall in Dhekiajuli, Askaran Binjraj is your go-to destination for everyday shopping as well as special occasions.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="img-frame h-[300px] overflow-hidden lg:h-[380px]">
                <img src={MALL_INTERIOR} alt="Inside Askaran Binjraj shopping mall" className="h-full w-full object-cover" data-testid="about-image" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-alt">
        <Stagger className="mx-auto grid max-w-7xl grid-cols-2 gap-px border-x border-brand-border bg-brand-border lg:grid-cols-4" data-testid="about-stats">
          {STATS.map((s, i) => (
            <StaggerItem key={i} className="bg-brand-alt">
              <div className="px-6 py-10 text-center">
                <p className="font-serif text-4xl font-medium text-brand-red lg:text-5xl">{s.value}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-brand-muted">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-12">
        {SECTIONS.map((s, i) => (
          <Reveal key={i} className={`grid gap-8 border-brand-border py-12 lg:grid-cols-12 ${i > 0 ? "border-t" : ""}`}>
            <div className="lg:col-span-5">
              <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-4 font-serif text-2xl font-medium leading-snug tracking-tight sm:text-3xl">{s.eyebrow}</h2>
            </div>
            <div className="lg:col-span-7">
              {s.body.map((p, j) => (
                <p key={j} className="mb-5 text-base leading-relaxed text-brand-mid">{p}</p>
              ))}
            </div>
          </Reveal>
        ))}
        <Reveal className="border-t border-brand-border pt-12">
          <div className="img-frame h-[280px] overflow-hidden md:h-[380px]">
            <img src={MALL_EXTERIOR} alt="Askaran Binjraj shopping mall exterior in Dhekiajuli" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </Reveal>
      </section>

      <section className="border-t border-brand-border bg-brand-ink text-brand-paper">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-12">
          <Reveal>
            <p className="eyebrow-light">Women's · Men's · Kids · Home</p>
            <h2 className="mt-3 max-w-xl font-serif text-3xl font-medium tracking-tight text-white">
              A complete family shopping destination
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/collections" data-testid="about-cta-collections" className="group inline-flex items-center gap-2 bg-brand-red px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white transition-colors duration-300 hover:bg-brand-redDark">
              Browse Collections
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
