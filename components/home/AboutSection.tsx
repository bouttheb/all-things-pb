/* eslint-disable @next/next/no-img-element */
export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 overflow-hidden bg-[#151515]">
      <div className="max-w-[1200px] mx-auto">
        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[#C8B898] mb-3 block">
            About
          </span>
          <h2
            className="text-[clamp(2rem,4vw,2.8rem)] font-bold text-white mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Benjamin Robinson
          </h2>
          <p className="text-[1.05rem] text-[#A09080] font-light italic">
            Pastor. Teacher. Creative Leader.
          </p>
        </div>

        {/* ── Photo + Bio ── */}
        <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-12 items-center">
          <div className="flex justify-center">
            <img
              src="/images/benjamin-no-bg.png"
              alt="Benjamin Robinson"
              className="w-full max-w-[260px]"
            />
          </div>
          <div className="text-center md:text-left">
            <div className="w-[50px] h-[2px] bg-[#C8B898] mb-6 mx-auto md:mx-0" />
            <p className="text-[0.95rem] leading-[1.75] text-[#B8AFA6] font-light mb-4">
              Benjamin Robinson is a pastor, teacher, and creative leader committed to helping people
              discover who they are in Christ and live from that identity. As the founding pastor of{" "}
              <a
                href="https://www.lineage.us"
                target="_blank"
                rel="noopener"
                className="text-[#C8B898] font-semibold no-underline hover:text-white transition-colors"
              >
                Lineage Church
              </a>{" "}
              in El Cerrito, California, he builds communities where belonging and spiritual growth
              move together.
            </p>
            <p className="text-[0.95rem] leading-[1.75] text-[#B8AFA6] font-light mb-4">
              His work spans preaching, teaching, writing, and music production, all
              anchored in integrity and excellence. Through practical frameworks like TOFU Journaling, he
              equips people to cultivate devotion, clarity, and long-term transformation.
            </p>
            <p className="text-[0.95rem] leading-[1.75] text-[#B8AFA6] font-light">
              He is a husband, father, and builder at heart, passionate about forming lives that are
              rooted, resilient, and purposeful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
