import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export function Breadcrumbs({ items = [], tone = "dark", className = "" }) {
  const colors = tone === "light"
    ? "text-white/70 hover:text-white"
    : "text-brand-muted hover:text-brand-red";

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${tone === "light" ? "text-white/65" : "text-brand-muted"}`}>
        <li className="inline-flex items-center gap-2">
          <Link to="/" aria-label="Home" className={`inline-flex min-h-12 min-w-12 items-center gap-1.5 transition-colors ${colors}`}>
            <Home className="h-3 w-3" aria-hidden="true" /> Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1 && !item.to;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
              <ChevronRight className="h-3 w-3 opacity-50" aria-hidden="true" />
              {item.to && !isCurrent ? (
                <Link to={item.to} data-testid={item.testId} className={`inline-flex min-h-12 min-w-12 items-center transition-colors ${colors}`}>{item.label}</Link>
              ) : (
                <span aria-current="page" className={tone === "light" ? "text-white" : "text-brand-ink"}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
