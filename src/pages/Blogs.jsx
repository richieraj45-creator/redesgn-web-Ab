import { Link } from "react-router-dom";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Reveal } from "../components/Reveal";
import { BLOG_POSTS } from "../data/blogPosts";

export default function Blogs() {
  return (
    <main className="bg-brand-paper" data-testid="blogs-page">
      <section className="relative isolate overflow-hidden bg-[#e9dfd2]">
        <img src="/assets/blogs/best-shopping-mall-assam.webp" alt="Askaran Binjraj in Dhekiajuli, Assam" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-25" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-paper via-brand-paper/90 to-brand-paper/45" />
        <div className="mx-auto flex min-h-[360px] max-w-7xl flex-col justify-center px-5 py-16 sm:px-8 md:min-h-[420px] lg:px-12">
          <Reveal className="max-w-3xl">
            <Breadcrumbs items={[{ label: "Blogs & Stories" }]} className="mb-7" />
            <p className="eyebrow">Stories · Ideas · Inspiration</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">Stories from <span className="italic text-brand-red">Askaran Binjraj.</span></h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-mid sm:text-lg">Explore seasonal style, family shopping and the people and place behind our Dhekiajuli store.</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12" aria-labelledby="latest-stories">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-brand-border pb-5 sm:mb-10">
          <div><p className="eyebrow">From the journal</p><h2 id="latest-stories" className="mt-2 font-serif text-3xl sm:text-4xl">The latest stories</h2></div>
          <span className="pb-1 text-xs uppercase tracking-[0.16em] text-brand-muted">{BLOG_POSTS.length} stories</span>
        </div>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, index) => (
            <Reveal key={post.slug} className="group flex flex-col overflow-hidden border border-brand-border bg-white shadow-[0_14px_45px_rgba(31,25,18,0.06)]" style={{ transitionDelay: `${index * 80}ms` }}>
              <Link to={`/blogs/${post.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-brand-alt" aria-label={`Read ${post.title}`}>
                <img src={post.image} alt={post.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </Link>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-red"><span>{post.category}</span><span className="text-brand-muted">{post.date}</span></div>
                <h2 className="mt-4 font-serif text-2xl leading-snug"><Link to={`/blogs/${post.slug}`} className="transition-colors hover:text-brand-red">{post.title}</Link></h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-mid">{post.excerpt}</p>
                <Link to={`/blogs/${post.slug}`} className="mt-6 inline-flex items-center gap-2 border-t border-brand-border pt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-ink transition-colors hover:text-brand-red">Read story <ArrowUpRight className="h-3.5 w-3.5" /></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

export function BlogPostPage({ post }) {
  return (
    <main className="bg-brand-paper" data-testid="blog-post-page">
      <header className="mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8 md:pb-14 lg:px-12">
        <Breadcrumbs items={[{ label: "Blogs & Stories", to: "/blogs" }, { label: post.title }]} className="mb-8" />
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">{post.category} · {post.date}</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">{post.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brand-mid sm:text-lg">{post.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-xs text-brand-muted"><Clock3 className="h-3.5 w-3.5" /> 4 min read</span>
        </div>
      </header>
      <figure className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12"><img src={post.image} alt={post.imageAlt} className="aspect-[16/8] max-h-[600px] w-full object-cover" fetchPriority="high" /></figure>
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8 md:py-16">
        <p className="font-serif text-xl leading-relaxed text-brand-ink sm:text-2xl">{post.intro}</p>
        <div className="mt-10 space-y-8">
          {post.sections.map((section) => <section key={section.heading}><h2 className="font-serif text-2xl sm:text-3xl">{section.heading}</h2><p className="mt-3 text-base leading-8 text-brand-mid">{section.body}</p></section>)}
        </div>
        <div className="mt-12 border-y border-brand-border py-8"><p className="font-serif text-xl italic leading-relaxed">{post.cta}</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">{post.links.map((link) => <Link key={link.to} to={link.to} className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.13em] text-brand-red hover:text-brand-redDark">{link.label}<ArrowUpRight className="h-3 w-3" /></Link>)}</div></div>
        <Link to="/blogs" className="mt-8 inline-block text-sm text-brand-mid underline underline-offset-4 hover:text-brand-red">← Back to all stories</Link>
      </article>
    </main>
  );
}
