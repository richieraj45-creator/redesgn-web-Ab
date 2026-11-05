import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { CATEGORIES, CONTACT } from "../data/siteData";

const SHOP_COLLECTIONS = [
  [/saree/i, "sarees"], [/lehenga|bridal/i, "lehengas"], [/trouser|palazzo|pants|bottomwear/i, "trousers"],
  [/shirt|blouse|top|t-?shirt/i, "shirts"], [/footwear|shoe|sandal|sneaker|juttis/i, "footwear"],
  [/travel|luggage|rucksack|suitcase|duffle/i, "travel-gear"], [/frock|dress/i, "frocks"], [/suit|blazer/i, "suits"],
  [/ethnic|kurta|traditional|mekhala|dokhna/i, "ethnic-wear"], [/home furnishing|bedding|curtain|linen/i, "home-furnishings"],
  [/cosmetic|skincare|makeup|fragrance/i, "cosmetics"], [/toy|school|puzzle|game/i, "toys-school-items"],
  [/accessor|gift|handbag|purse|jewell?ery|watch|sunglass|wallet|bag/i, "accessories-gift-items"],
  [/indo.?western/i, "indo-western-wear"], [/kid/i, "kids-picks"],
];

const shopCollectionFor = (name) => {
  const match = SHOP_COLLECTIONS.find(([pattern]) => pattern.test(name));
  return match ? `${CONTACT.shopUrl}/collection/${match[1]}` : CONTACT.shopUrl;
};

export default function CategoryDetail() {
  const { slug } = useParams();
  const category = CATEGORIES.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!category) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-32 text-center" data-testid="category-not-found">
        <h1 className="font-serif text-4xl">Collection not found</h1>
            <Breadcrumbs items={[{ label: "Collections", to: "/collections" }, { label: "Collection not found" }]} className="mt-6" />
      </main>
    );
  }

  const statCols = category.stats?.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";

  return (
    <main data-testid={`category-page-${category.slug}`}>
      <section className="group relative flex h-auto min-h-[360px] items-end overflow-hidden bg-brand-ink py-12 sm:min-h-[400px] lg:h-[52vh] lg:min-h-[380px]">
        <img src={category.heroImage || category.image} alt={category.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/30 to-brand-ink/10" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-12">
          <Reveal>
            <Breadcrumbs items={[{ label: "Collections", to: "/collections", testId: "category-back-link" }, { label: category.name }]} tone="light" className="mb-7" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/60" data-testid="category-studio">{category.studio}</p>
            <h1 className="mt-2 max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="category-title">
              {category.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {category.tagline && (
              <Reveal>
                <p className="mb-7 font-serif italic text-xl leading-relaxed text-brand-ink sm:text-2xl" data-testid="category-tagline">
                  {category.tagline}
                </p>
              </Reveal>
            )}
            {category.intro.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="mb-5 text-base leading-relaxed text-brand-mid">{p}</p>
              </Reveal>
            ))}
          </div>
          {category.stats && (
            <div className="lg:col-span-5">
              <Stagger className={`grid gap-px border border-brand-border bg-brand-border ${category.stats.length === 4 ? "sm:grid-cols-2" : ""} lg:grid-cols-1`}>
                {category.stats.map((s, i) => (
                  <StaggerItem key={i} className="border border-white/70 bg-white/55 backdrop-blur-lg">
                    <div className="p-6" data-testid={`category-stat-${i}`}>
                      <p className="font-serif text-xl font-medium text-brand-red">{s.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-brand-muted">{s.label}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}
        </div>
      </section>

      {category.subs?.length > 0 && (
        <section className="border-t border-brand-border bg-brand-alt">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-12">
            <Reveal className="mb-10">
              <p className="eyebrow">Explore Our Collections</p>
              <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                In the {category.name} department
              </h2>
            </Reveal>
            <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.subs.map((sub, i) => (
                <StaggerItem key={i}>
                  <div className="group h-full border border-white/70 bg-white/60 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl" data-testid={`sub-card-${category.slug}-${i}`}>
                    <div className="aspect-[4/3] overflow-hidden bg-brand-alt">
                      <img src={sub.image} alt={sub.name} loading="lazy" className="h-full w-full bg-brand-alt object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                    </div>
                    <div className="p-6">
                      <p className="text-[10px] uppercase tracking-[0.26em] text-brand-muted">{sub.floor}</p>
                      <h3 className="mt-2 font-serif text-xl font-medium text-brand-ink">{sub.name}</h3>
                      {sub.note && <p className="mt-2 text-sm leading-relaxed text-brand-mid">{sub.note}</p>}
                      <a href={shopCollectionFor(sub.name)} target="_blank" rel="noopener noreferrer" data-testid={`sub-cta-${category.slug}-${i}`} className="group/link mt-4 inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-brand-red">
                        Explore
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <section className="border-t border-brand-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-12">
          <Reveal>
            <h2 className="font-serif text-2xl font-medium tracking-tight sm:text-3xl">Find the pieces that feel like you.</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-brand-mid">
              <MapPin className="h-4 w-4 text-brand-red" /> {CONTACT.addressFull}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/contact" data-testid="category-visit-cta" className="group inline-flex items-center gap-2 bg-brand-ink px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white transition-colors duration-300 hover:bg-brand-red">
              Plan Your Visit
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
