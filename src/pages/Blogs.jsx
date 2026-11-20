import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Reveal } from "../components/Reveal";
import { BLOG_POSTS } from "../data/blogPosts";

export default function Blogs() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (slug && !post) return (
    <main className="mx-auto max-w-7xl px-5 py-24 text-brand-ink" data-testid="blog-not-found">
      <h1 className="font-serif text-4xl">Story not found</h1>
      <Link className="mt-5 inline-flex items-center gap-2 text-brand-red" to="/blogs">Back to all stories <ArrowRight size={16} /></Link>
    </main>
  );

  return (
    <main className="bg-brand-paper" data-testid={post ? "blog-post" : "blogs-page"}>
      <section className="border-b border-brand-border" id="latest">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16 lg:px-12">
          <Breadcrumbs items={post ? [{ label: "Stories", to: "/blogs" }, { label: post.title }] : [{ label: "Stories" }]} className="mb-7" />
          {post ? (
            <article className="mx-auto max-w-4xl">
              <p className="eyebrow">{post.category}</p>
              <h2 className="mt-4 font-serif text-3xl font-medium leading-tight sm:text-5xl">{post.title}</h2>
              <div className="mt-8 aspect-[16/8] overflow-hidden bg-brand-alt"><img src={post.image} alt="" className="h-full w-full object-cover" fetchPriority="high" /></div>
              <div className="mt-8 grid gap-8 lg:grid-cols-12">
                <div className="space-y-5 lg:col-span-8">{post.paragraphs.map((paragraph) => <p key={paragraph} className="text-base leading-relaxed text-brand-mid">{paragraph}</p>)}</div>
                <aside className="h-fit border-l-2 border-brand-red pl-5 lg:col-span-4">
                  <h2 className="font-serif text-xl">Keep exploring</h2>
                  <ul className="mt-4 space-y-3">{post.links.map((link) => <li key={link.to}><Link className="inline-flex items-center gap-2 text-sm text-brand-red hover:underline" to={link.to}>{link.label}<ArrowUpRight size={14} /></Link></li>)}</ul>
                </aside>
              </div>
              <nav className="mt-12 border-t border-brand-border pt-6" aria-label="More stories">
                <h2 className="font-serif text-xl">More stories</h2>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">{BLOG_POSTS.filter((item) => item.slug !== post.slug).map((item) => <Link key={item.slug} className="text-sm text-brand-red hover:underline" to={`/blogs/${item.slug}`}>{item.title}</Link>)}</div>
              </nav>
            </article>
          ) : (
            <>
              <div data-page-heading="true">
                <p className="eyebrow">Stories · Ideas · Inspiration</p>
                <h2 className="mt-4 max-w-3xl font-serif text-3xl font-medium leading-tight sm:text-5xl">The Askaran Binjraj journal</h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-mid">Discover stories about our family legacy, heritage, style and a day at the mall.</p>
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {BLOG_POSTS.map((item) => (
                  <Reveal key={item.slug}>
                    <article className="h-full overflow-hidden border border-brand-border bg-white/70">
                      <Link to={`/blogs/${item.slug}`} className="group block">
                        <div className="aspect-[16/10] overflow-hidden bg-brand-alt"><img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" /></div>
                        <div className="p-5 sm:p-6"><p className="text-[10px] uppercase tracking-[0.2em] text-brand-red">{item.category}</p><h3 className="mt-3 font-serif text-xl leading-snug text-brand-ink">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-brand-mid">{item.excerpt}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-ink">Read story <ArrowRight size={14} /></span></div>
                      </Link>
                    </article>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
