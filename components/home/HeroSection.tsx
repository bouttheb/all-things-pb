/* eslint-disable @next/next/no-img-element */
export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-start text-center bg-[var(--color-ink)] overflow-hidden pb-10">
      {/* Hero photo with ellipse fade mask */}
      <div className="relative w-full max-w-[550px] mt-[30px] md:mt-[30px]">
        <img
          src="/images/hero-photo.png"
          alt="Benjamin Robinson"
          className="w-full block hero-photo-mask"
        />
      </div>

      {/* Overlapping text */}
      <div className="relative z-[2] -mt-20 pb-10">
        <h1
          className="text-[clamp(1.8rem,5vw,3rem)] font-bold text-white tracking-[0.1em] uppercase mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Benjamin Robinson
        </h1>
        <p className="text-[1rem] text-[var(--color-muted)] tracking-[0.04em] font-light mb-7">
          Words. Music. Wisdom.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="#sermons"
            className="hero-btn px-6 py-2 border-[1.5px] border-white/80 bg-transparent text-white text-[0.8rem] tracking-[0.07em] font-medium no-underline transition-all hover:bg-white hover:text-[var(--color-ink)]"
          >
            Sermons
          </a>
          <a
            href="#music"
            className="hero-btn px-6 py-2 border-[1.5px] border-white/80 bg-transparent text-white text-[0.8rem] tracking-[0.07em] font-medium no-underline transition-all hover:bg-white hover:text-[var(--color-ink)]"
          >
            Music
          </a>
        </div>
      </div>
    </section>
  );
}
