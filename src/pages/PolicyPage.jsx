import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Phone } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { CONTACT } from "../data/siteData";
import { POLICIES } from "../data/policies";

const POLICY_LINKS = [
  ["Exchange Policies", "/exchange-policy"],
  ["Shipping Policy", "/shipping-policy"],
  ["Terms and Conditions", "/terms-conditions"],
  ["Disclaimer", "/disclaimer"],
];

export default function PolicyPage() {
  const { pathname } = useLocation();
  const policy = POLICIES[pathname.replace(/\/$/, "")] || POLICIES["/terms-conditions"];

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${policy.title} | Askaran Binjraj`;
    return () => { document.title = previousTitle; };
  }, [policy]);

  return (
    <main className="bg-brand-paper" data-testid="policy-page">
      <header className="border-b border-brand-border bg-brand-alt">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16 lg:px-12">
          <Breadcrumbs items={[{ label: "Useful Links" }, { label: policy.title }]} className="mb-7" />
          <p className="eyebrow">Customer information</p>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">{policy.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-brand-mid">{policy.intro}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-12 lg:px-12">
        <article className="space-y-9 lg:col-span-8" data-testid={`policy-${pathname.replaceAll("/", "")}`}>
          {policy.highlight && <aside className="border-l-4 border-brand-red bg-white p-6 shadow-sm sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-red">{policy.highlight.title}</p><p className="mt-3 text-base leading-relaxed text-brand-ink">{policy.highlight.body}</p></aside>}
          {policy.sections.map((section) => <section key={section.heading} className="border-b border-brand-border pb-7"><h2 className="font-serif text-2xl sm:text-3xl">{section.heading}</h2>{section.body && <p className="mt-3 text-sm leading-7 text-brand-mid sm:text-base">{section.body}</p>}{section.items && <ul className="mt-4 grid gap-2 sm:grid-cols-2">{section.items.map((item) => <li key={item} className="border border-brand-border bg-white px-4 py-3 text-sm leading-relaxed text-brand-mid">{item}</li>)}</ul>}</section>)}
          <section className="rounded-sm bg-brand-ink p-6 text-white sm:p-8"><h2 className="font-serif text-2xl">Questions about this policy?</h2><p className="mt-3 text-sm leading-relaxed text-white/75">Our team can help with order, exchange and delivery questions.</p><div className="mt-5 flex flex-wrap gap-3"><a href={CONTACT.phoneMobileHref} className="inline-flex items-center gap-2 bg-brand-red px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white"><Phone className="h-3.5 w-3.5" />{CONTACT.phoneMobile}</a><Link to="/contact" className="inline-flex items-center gap-2 border border-white/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white">Contact us <ArrowUpRight className="h-3.5 w-3.5" /></Link></div></section>
        </article>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 border border-brand-border bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">Useful Links</p>
            <nav aria-label="Policies" className="mt-4 flex flex-col">
              {POLICY_LINKS.map(([label, to]) => <Link key={to} to={to} className="border-b border-brand-border py-3 text-sm text-brand-mid transition-colors hover:text-brand-red">{label}</Link>)}
              <Link to="/about" className="border-b border-brand-border py-3 text-sm text-brand-mid transition-colors hover:text-brand-red">Best Shopping Mall in Assam</Link>
            </nav>
          </div>
        </aside>
      </div>
    </main>
  );
}
