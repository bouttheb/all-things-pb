export default function Header() {
  return (
    <header className="relative z-10 bg-[var(--color-ink)] text-white">
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-14 text-center">
        {/* Title — matches benjaminrobinson.com hero style */}
        <h1
          className="text-[clamp(1.8rem,5vw,3rem)] font-bold tracking-[0.1em] leading-[1.2] text-white uppercase animate-fade-in-up"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          All Things PB
        </h1>

        {/* Tagline */}
        <p
          className="mt-4 text-[1rem] text-[var(--color-muted)] font-light leading-relaxed max-w-md mx-auto animate-fade-in tracking-[0.04em]"
          style={{ animationDelay: "150ms", fontFamily: "var(--font-body)" }}
        >
          Resources for Growing in Christ &amp; Moving Forward in Life.
        </p>
      </div>
    </header>
  );
}
