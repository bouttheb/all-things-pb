import { BOOKS } from "@/lib/data/books";

export default function BooksSection() {
  return (
    <section id="books" className="site-section">
      <h2 className="section-heading">Books</h2>

      <div className="flex justify-center gap-5 mb-5 flex-wrap">
        {BOOKS.map((book) => (
          <a
            key={book.title}
            href={book.url}
            target="_blank"
            rel="noopener"
            className="w-[170px] rounded-md overflow-hidden transition-all duration-300 no-underline block hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
          >
            <div
              className="w-full aspect-[2/3] flex items-center justify-center text-[1.05rem] font-semibold text-white text-center px-5 leading-snug whitespace-pre-line"
              style={{
                fontFamily: "var(--font-heading)",
                background: book.gradient,
              }}
            >
              {book.title}
            </div>
          </a>
        ))}
      </div>

      <div className="text-center">
        <a
          href="https://amzn.to/4r8R4sE"
          target="_blank"
          rel="noopener"
          className="view-all-link"
        >
          Explore Books
        </a>
      </div>
    </section>
  );
}
