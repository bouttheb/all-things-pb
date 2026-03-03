/* eslint-disable @next/next/no-img-element */
export default function AboutSection() {
  return (
    <section id="about" className="py-10 px-6 max-w-[1200px] mx-auto">
      <h2 className="section-heading">About Benjamin</h2>

      <div className="flex flex-col sm:flex-row gap-5 items-center p-7 bg-white rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        <img
          src="/images/about-photo.png"
          alt="Benjamin Robinson"
          className="w-[72px] h-[72px] rounded-full object-cover object-top shrink-0"
        />
        <div className="text-center sm:text-left">
          <h3
            className="text-[1.05rem] font-semibold mb-1.5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Benjamin Robinson
          </h3>
          <p className="text-[0.88rem] leading-[1.6] text-[var(--color-subtle)]">
            Benjamin Robinson is a pastor, recording artist, author, and content creator driven by
            faith, purpose, and creativity. As the pastor of{" "}
            <a
              href="https://www.lineage.us"
              target="_blank"
              rel="noopener"
              className="text-inherit font-semibold no-underline"
            >
              Lineage Church
            </a>
            , his mission is to reach people wherever they are &mdash; through sermons, songs, books,
            and content that speaks to the heart.
          </p>
        </div>
      </div>
    </section>
  );
}
