import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const CategoryCard = ({ category, className = "", tall = false }) => (
  <Link
    to={`/collections/${category.slug}`}
    data-testid={`category-card-${category.slug}`}
    className={`group relative block overflow-hidden rounded-2xl border border-white/70 bg-brand-alt shadow-[0_14px_34px_rgba(38,28,20,0.10)] transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(38,28,20,0.18)] ${className}`}
  >
    <img
      src={category.image}
      alt={category.name}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.05]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/15 to-transparent transition-opacity duration-200 group-hover:from-brand-ink/90" />
    <div className="collection-card-caption absolute inset-x-0 bottom-0 p-5 md:p-7">
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">{category.tag}</p>
      <div className="mt-1.5 flex items-end justify-between gap-3">
        <h3 className="font-serif text-2xl md:text-3xl font-medium text-white leading-tight">
          {category.name}
        </h3>
        <span className="mb-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/55 bg-white/10 text-white shadow-[0_2px_12px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-brand-ink group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/85 opacity-100 transition-opacity duration-300">
        View More
      </p>
    </div>
  </Link>
);
