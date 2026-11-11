import { Reveal } from "../components/Reveal";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { MALL_EXTERIOR, STORE_PHOTOS } from "../data/siteData";

const STORIES = [
  { title: "A place to gather", caption: "A familiar landmark in the heart of Dhekiajuli.", image: MALL_EXTERIOR, alt: "Shopping centre exterior in Dhekiajuli", width: 1536, height: 1024 },
  { ...STORE_PHOTOS[0], title: "A view across the mall", caption: "Explore the floors, displays and spaces inside." },
  { ...STORE_PHOTOS[9], title: "Everyday family essentials", caption: "A look at the products and displays inside the store." },
  { ...STORE_PHOTOS[4], title: "Style across generations", caption: "Thoughtful finds for everyday moments and special occasions." },
  ...STORE_PHOTOS.filter((_, index) => ![0, 4, 9].includes(index)),
];

export default function CultureEvents() {
  return (
    <main className="bg-brand-paper" data-testid="culture-events-page">
      <section className="group relative isolate overflow-hidden bg-brand-ink text-white">
        <img src="/assets/about/askaran-mall-exterior.webp" alt="" decoding="async" fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-12">
          <Reveal>
            <Breadcrumbs items={[{ label: "Culture & Events" }]} tone="light" className="mb-8" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/75">Life around the mall</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">People, Places &amp; Moments</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85">A look inside the spaces, traditions and everyday moments that bring our community together.</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-12">
        <Reveal>
          <p className="eyebrow">Stories from our community</p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">A little of everything, all in one place</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-mid">Explore the mall, discover the details and see the spaces that make every visit feel welcoming.</p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {STORIES.map((story, index) => (
            <Reveal key={story.title} delay={index * 0.04}>
              <article className="group overflow-hidden border border-white/70 bg-white/60 backdrop-blur-xl">
                <div className="aspect-[4/3] overflow-hidden bg-brand-alt">
                  <img src={story.image} alt={story.alt} loading="lazy" decoding="async" width={story.width} height={story.height} className="h-full w-full object-cover contrast-[1.05] saturate-[1.08] transition-transform duration-200 group-hover:scale-[1.04]" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-brand-ink">{story.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-mid">{story.caption}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-brand-border bg-brand-alt">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-12 md:items-center md:py-20 lg:px-12">
          <div className="md:col-span-7">
            <p className="eyebrow">Watch &amp; discover</p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">Video stories are on the way</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-mid">This space is ready for event films, behind-the-scenes moments and community stories. Videos can be added here when they are available.</p>
          </div>
          <div className="md:col-span-5">
            <div className="glass-panel flex aspect-video items-center justify-center border px-6 text-center">
              <span className="font-serif text-lg text-brand-mid">Video gallery coming soon</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
