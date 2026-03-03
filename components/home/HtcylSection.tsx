/* eslint-disable @next/next/no-img-element */

const PLAYLIST_URL =
  "https://youtube.com/playlist?list=PLB9--tMk57EH9QRxYiJ8xiPwDHtUn0RcZ";

interface HtcylVideo {
  id: string;
  title: string;
  thumbnail: string;
}

interface HtcylSectionProps {
  videos?: HtcylVideo[];
}

export default function HtcylSection({ videos = [] }: HtcylSectionProps) {
  return (
    <section id="htcyl" className="bg-[var(--color-cream)] py-20 px-6 overflow-hidden">
      <div className="max-w-[720px] mx-auto">
        {/* Hook */}
        <div className="text-center mb-16">
          <h2
            className="text-[clamp(2.2rem,5vw,3.2rem)] font-bold text-[var(--color-dark)] mb-8 leading-[1.15]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            If You&apos;re Tired of Starting Over, Read This
          </h2>
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2.5 px-10 py-4 bg-[#c0392b] text-white text-[1rem] font-semibold tracking-[0.03em] no-underline transition-all rounded-[4px] mb-8 shadow-[0_4px_14px_rgba(192,57,43,0.3)] hover:bg-[#a93226] hover:shadow-[0_6px_20px_rgba(192,57,43,0.4)]"
          >
            &#9654; Watch the Free Series
          </a>
          <div className="text-left">
            <p className="text-[1.3rem] leading-[1.65] text-[#1c1c1c] mb-5">
              You&apos;ve tried to change before. <strong>New Year&apos;s resolutions. Morning routines.
              Accountability partners. Journaling.</strong> And maybe some of it worked&mdash;for a while.
            </p>
            <p className="text-[1.3rem] leading-[1.65] text-[#1c1c1c] mb-5">
              But eventually, old patterns crept back in. <strong>Not because you didn&apos;t want it enough.
              Because something deeper was never addressed.</strong>
            </p>
            <p className="text-[1.3rem] leading-[1.65] text-[#1c1c1c]">
              <em>How to Change Your Life</em> is a free video series that walks you through the real
              framework for lasting transformation&mdash;rooted in biblical wisdom, neuroscience, and
              practical action.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h3
            className="text-[1.7rem] font-bold text-[var(--color-dark)] mb-5 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            In This Free Series, You&apos;ll Learn:
          </h3>
          <ul className="flex flex-col gap-4 list-none p-0 m-0">
            {[
              'Why "try harder" never works long-term',
              "The three questions that expose hidden resistance",
              "How to remove invisible stumbling blocks",
              "A framework that turns intention into lasting identity",
            ].map((item) => (
              <li
                key={item}
                className="text-[1.15rem] leading-[1.6] text-[#1c1c1c] pl-8 relative before:content-[''] before:absolute before:left-0 before:top-[0.55rem] before:w-2 before:h-2 before:bg-[#c0392b] before:rounded-full"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Video grid */}
        {videos.length > 0 && (
          <div className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative max-h-[380px] overflow-hidden">
              {videos.slice(0, 9).map((v) => (
                <a
                  key={v.id}
                  href={`https://youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noopener"
                  className="relative rounded-lg overflow-hidden group no-underline"
                >
                  <div className="relative aspect-video bg-[#1A1A1A]">
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex flex-col justify-end p-2">
                      <span className="text-[0.68rem] font-semibold text-white leading-snug line-clamp-2">
                        {v.title}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
              {/* Fade overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-b from-transparent to-[var(--color-cream)] pointer-events-none z-[1]" />
            </div>
            <div className="text-center mt-4">
              <a href={PLAYLIST_URL} target="_blank" rel="noopener" className="view-all-link">
                Watch All Episodes
              </a>
            </div>
          </div>
        )}

        {/* Workbook */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 items-center mb-16">
          <img
            src="https://www.lineage.us/wp-content/uploads/2026/02/HTCYL-Mockup.png"
            alt="How to Change Your Life Workbook"
            className="w-[200px] block mx-auto md:mx-0 drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
          />
          <div>
            <h3
              className="text-[1.7rem] font-bold text-[var(--color-dark)] mb-5 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              If You&apos;re Serious About Change, This Is Where the Work Happens
            </h3>
            <p className="text-[1.15rem] leading-[1.7] text-[#1c1c1c] mb-4">
              This companion workbook includes guided exercises, reflection prompts, and practical
              frameworks from the video series. It&apos;s designed to move you from inspiration to implementation.
            </p>
            <p className="text-[1.15rem] leading-[1.7] text-[#1c1c1c] font-bold">
              Stop consuming. Start becoming.
            </p>
            <a
              href="https://amzn.to/4kFbebc"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--color-dark)] text-white text-[0.88rem] font-semibold tracking-[0.05em] uppercase no-underline transition-all rounded-[3px] mt-5 shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:bg-[#333]"
            >
              Get the Companion Workbook
            </a>
          </div>
        </div>

        {/* Closing */}
        <div className="text-center pt-8 border-t border-black/10">
          <h3
            className="text-[clamp(1.6rem,3.5vw,2.2rem)] font-bold text-[var(--color-dark)] mb-5 leading-[1.25]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            You Can Keep Restarting. Or You Can Change.
          </h3>
          <p className="text-[1.15rem] leading-[1.7] text-[#1c1c1c] mb-4">
            This series is free. The workbook is available. The only thing missing is your decision.
          </p>
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2.5 px-10 py-4 bg-[#c0392b] text-white text-[1rem] font-semibold tracking-[0.03em] no-underline transition-all rounded-[4px] shadow-[0_4px_14px_rgba(192,57,43,0.3)] hover:bg-[#a93226]"
          >
            &#9654; Start the Series Now
          </a>
        </div>
      </div>
    </section>
  );
}
