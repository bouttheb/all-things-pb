/* eslint-disable @next/next/no-img-element */
import { FEATURED_BOOK, SPIRIT_OF_LIFE_SERIES } from "@/lib/data/books";

export default function BooksSection() {
  return (
    <section
      id="books"
      className="py-20 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #F0EDE8 0%, #E8E4DC 50%, #F0EDE8 100%)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* ── Section header (matches TOFU pattern) ── */}
        <div className="text-center mb-14">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[#8A7A66] mb-3 block">
            From the Author
          </span>
          <h2
            className="text-[clamp(2rem,4vw,2.8rem)] font-bold text-[var(--color-ink)] mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Books &amp; Devotionals
          </h2>
          <p className="text-[1.05rem] text-[#6B5E4F] font-light italic">
            For the inner life of the believer and the Christ-centered mission of the Church.
          </p>
        </div>

        {/* ── Featured: Shepherd of Souls ── */}
        <div className="max-w-[960px] mx-auto mb-20 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-center">
          <div className="flex justify-center">
            <a
              href={FEATURED_BOOK.url}
              target="_blank"
              rel="noopener"
              className="block transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={FEATURED_BOOK.image}
                alt={FEATURED_BOOK.title}
                className="w-full max-w-[320px] rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
              />
            </a>
          </div>
          <div className="text-center md:text-left">
            <h3
              className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-[var(--color-ink)] mb-1 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {FEATURED_BOOK.title}
            </h3>
            <p className="text-[0.95rem] text-[#8A7A66] font-light italic mb-5">
              {FEATURED_BOOK.subtitle}
            </p>
            <div className="w-[50px] h-[2px] bg-[#C8B898] mb-5 mx-auto md:mx-0" />
            {FEATURED_BOOK.description?.map((para, i) => (
              <p
                key={i}
                className="text-[0.95rem] leading-[1.75] text-[#5C534A] font-light mb-4"
              >
                {para}
              </p>
            ))}
            <a
              href={FEATURED_BOOK.url}
              target="_blank"
              rel="noopener"
              className="inline-block px-9 py-3 bg-[#1a2840] text-white text-[0.82rem] font-semibold tracking-[0.08em] uppercase no-underline transition-all hover:bg-[#2a3d5c] mt-2"
            >
              Get Your Copy
            </a>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="w-[60px] h-[2px] bg-[#C8B898] mx-auto mb-16" />

        {/* ── Series: Spirit of Life ── */}
        <div className="max-w-[900px] mx-auto text-center">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[#8A7A66] mb-3 block">
            A Five-Part Daily Devotional
          </span>
          <h3
            className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-[var(--color-ink)] mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {SPIRIT_OF_LIFE_SERIES.title}
          </h3>
          <p className="text-[0.95rem] leading-[1.75] text-[#5C534A] font-light mb-10 max-w-[600px] mx-auto">
            {SPIRIT_OF_LIFE_SERIES.description}
          </p>

          {/* 5-across volume grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-5 mb-6 max-w-[720px] mx-auto">
            {SPIRIT_OF_LIFE_SERIES.volumes.map((vol) => (
              <a
                key={vol.title}
                href={vol.url}
                target="_blank"
                rel="noopener"
                className="group block transition-transform duration-300 hover:-translate-y-1"
              >
                <img
                  src={vol.image}
                  alt={`Spirit of Life ${vol.title}`}
                  className="w-full rounded-sm shadow-[0_6px_20px_rgba(0,0,0,0.14)] group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-shadow duration-300"
                />
                <span className="block mt-2.5 text-[0.72rem] tracking-[0.05em] text-[#8A7A66] font-medium">
                  {vol.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
