export const Marquee = ({ children, fast = false, className = "", testId }) => (
  <div className={`overflow-hidden ${className}`} data-testid={testId}>
    <div className={`flex w-max whitespace-nowrap ${fast ? "animate-marquee-fast" : "animate-marquee"}`}>
      <div className="flex items-center">{children}</div>
      <div className="flex items-center" aria-hidden="true">{children}</div>
    </div>
  </div>
);

export const TickerItem = ({ text }) => (
  <span className="flex items-center">
    <span className="px-8 font-serif italic text-lg md:text-xl text-brand-mid">{text}</span>
    <span className="inline-block h-2 w-2 rotate-45 bg-brand-red" />
  </span>
);
