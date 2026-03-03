/* eslint-disable @next/next/no-img-element */
import { FEATURED_BOOK, SPIRIT_OF_LIFE_SERIES } from "@/lib/data/books";

export default function BooksSection() {
  return (
    <section id="books" className="site-section">
      <h2 className="section-heading">Books</h2>

      {/* ── Featured: Shepherd of Souls ── */}
      <div className="max-w-[860px] mx-auto mb-14 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <a
          href={FEATURED_BOOK.url}
          target="_blank"
          rel="noopener"
          className="shrink-0 block transition-transform duration-300 hover:-translate-y-1"
        >
          <img
            src={FEATURED_BOOK.image}
            alt={FEATURED_BOOK.title}
            className="w-[180px] md:w-[210px] rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
          />
        </a>
        <div className="text-center md:text-left">
          <h3
            className="text-[1.6rem] md:text-[1.8rem] font-semibold text-[var(--color-ink)] mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {FEATURED_BOOK.title}
          </h3>
          <p className="text-[0.95rem] leading-[1.7] text-[var(--color-subtle)] font-light mb-5 max-w-[480px]">
            {FEATURED_BOOK.description}
          </p>
          <a
            href={FEATURED_BOOK.url}
            target="_blank"
            rel="noopener"
            className="view-all-link"
          >
            Get Your Copy
          </a>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="w-[60px] h-[1.5px] bg-[var(--color-border)] mx-auto mb-14" />

      {/* ── Series: Spirit of Life ── */}
      <div className="max-w-[860px] mx-auto text-center">
        <h3
          className="text-[1.4rem] md:text-[1.6rem] font-semibold text-[var(--color-ink)] mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {SPIRIT_OF_LIFE_SERIES.title}
        </h3>
        <p className="text-[0.9rem] leading-[1.75] text-[var(--color-subtle)] font-light mb-8 max-w-[600px] mx-auto">
          {SPIRIT_OF_LIFE_SERIES.description}
        </p>

        {/* 5-across volume grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 mb-6 max-w-[680px] mx-auto">
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
                className="w-full rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.12)] group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.18)] transition-shadow duration-300"
              />
              <span className="block mt-2 text-[0.7rem] tracking-[0.04em] text-[var(--color-muted)] font-medium">
                {vol.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
