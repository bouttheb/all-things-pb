export default function Header() {
  return (
    <header className="relative z-10">
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-12">
        {/* Brass accent line */}
        <div
          className="w-10 h-[1px] bg-[var(--color-brass)] mb-8 animate-fade-in"
          style={{ opacity: 0.4 }}
        />

        {/* Title — ALL CAPS, Avenir Next */}
        <h1
          className="text-[clamp(2rem,6vw,3.25rem)] font-bold uppercase tracking-[0.08em] leading-[1.15] text-[var(--color-bone)] animate-fade-in-up"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          All Things PB
        </h1>

        {/* Tagline */}
        <p
          className="mt-5 text-[14px] text-[var(--color-muted)] font-light leading-relaxed max-w-sm animate-fade-in"
          style={{ animationDelay: "150ms" }}
        >
          Videos, podcasts, music &amp; more — all in one place.
        </p>

        {/* Bottom brass divider */}
        <div className="brass-line w-full mt-10" />
      </div>
    </header>
  );
}
