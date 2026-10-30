import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const CategoryCard = ({ category, className = "", tall = false }) => (
  <Link
    to={`/collections/${category.slug}`}
    data-testid={`category-card-${category.slug}`}
    className={`group relative block overflow-hidden border border-brand-border bg-brand-alt ${className}`}
  >
    <img
      src={category.image}
      alt={category.name}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/20 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">{category.tag}</p>
      <div className="mt-1.5 flex items-end justify-between gap-3">
        <h3 className="font-serif text-2xl md:text-3xl font-medium text-white leading-tight">
          {category.name}
        </h3>
        <span className="mb-1 flex h-9 w-9 flex-shrink-0 items-center justify-center border border-white/40 text-white transition-colors duration-300 group-hover:border-brand-red group-hover:bg-brand-red">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/70 opacity-0 translate-y-1 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
        View More
      </p>
    </div>
  </Link>
);
