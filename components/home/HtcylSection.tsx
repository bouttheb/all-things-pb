"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

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
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="htcyl" className="bg-[var(--color-cream)] py-20 px-6 overflow-hidden">
      <div className="max-w-[720px] mx-auto">
        {/* ── Hook (always visible) ── */}
        <div className="text-center mb-8">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[#8A7A66] mb-3 block">
            A Free Video Series
          </span>
          <h2
            className="text-[clamp(2rem,4vw,2.8rem)] font-bold text-[var(--color-ink)] mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            How to Change Your Life
          </h2>
          <p className="text-[1.05rem] text-[#6B5E4F] font-light italic mb-6">
            If You&apos;re Tired of Starting Over, Read This
          </p>
          <div className="w-[50px] h-[2px] bg-[#C8B898] mb-8 mx-auto" />
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener"
            className="inline-block px-9 py-3 bg-[#c0392b] text-white text-[0.82rem] font-semibold tracking-[0.08em] uppercase no-underline transition-all hover:bg-[#a93226] mb-8"
          >
            &#9654; Watch the Free Series
          </a>
          <div className="text-left">
            <p className="text-[0.95rem] leading-[1.75] text-[#5C534A] font-light mb-4">
              You&apos;ve tried to change before. <strong>New Year&apos;s resolutions. Morning routines.
              Accountability partners. Journaling.</strong> And maybe some of it worked&mdash;for a while.
            </p>
            <p className="text-[0.95rem] leading-[1.75] text-[#5C534A] font-light">
              But eventually, old patterns crept back in. <strong>Not because you didn&apos;t want it enough.
              Because something deeper was never addressed.</strong>
            </p>
          </div>
        </div>

        {/* ── Expandable content ── */}
        <div className="relative">
          <div
            className="overflow-hidden transition-all duration-700 ease-in-out"
            style={{
              maxHeight: expanded ? "3000px" : "0px",
              opacity: expanded ? 1 : 0,
            }}
          >
            <div className="pt-8">
              <div className="text-left mb-16">
                <p className="text-[0.95rem] leading-[1.75] text-[#5C534A] font-light">
                  <em>How to Change Your Life</em> is a life-transforming process that walks you through the real
                  framework for lasting transformation&mdash;rooted in biblical wisdom, neuroscience, and
                  practical action.
                </p>
              </div>
              {/* Benefits */}
              <div className="mb-16">
                <h3
                  className="text-[clamp(1.4rem,3vw,1.8rem)] font-bold text-[var(--color-ink)] mb-5 leading-tight"
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
                      className="text-[0.95rem] leading-[1.75] text-[#5C534A] font-light pl-8 relative before:content-[''] before:absolute before:left-0 before:top-[0.55rem] before:w-2 before:h-2 before:bg-[#c0392b] before:rounded-full"
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
                    className="text-[clamp(1.4rem,3vw,1.8rem)] font-bold text-[var(--color-ink)] mb-5 leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    If You&apos;re Serious About Change, This Is Where the Work Happens
                  </h3>
                  <p className="text-[0.95rem] leading-[1.75] text-[#5C534A] font-light mb-4">
                    This companion workbook includes guided exercises, reflection prompts, and practical
                    frameworks from the video series. It&apos;s designed to move you from inspiration to implementation.
                  </p>
                  <p className="text-[0.95rem] leading-[1.75] text-[#5C534A] font-semibold">
                    Stop consuming. Start becoming.
                  </p>
                  <a
                    href="https://amzn.to/4kFbebc"
                    target="_blank"
                    rel="noopener"
                    className="inline-block px-9 py-3 bg-[var(--color-ink)] text-white text-[0.82rem] font-semibold tracking-[0.08em] uppercase no-underline transition-all hover:bg-[#333] mt-5"
                  >
                    Get the Companion Workbook
                  </a>
                </div>
              </div>

              {/* Closing */}
              <div className="text-center pt-8 border-t border-black/10">
                <h3
                  className="text-[clamp(1.6rem,3.5vw,2.2rem)] font-bold text-[var(--color-ink)] mb-4 leading-[1.25]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  You Can Keep Restarting. Or You Can Change.
                </h3>
                <p className="text-[0.95rem] leading-[1.75] text-[#5C534A] font-light mb-6">
                  This series is free. The workbook is available. The only thing missing is your decision.
                </p>
                <a
                  href={PLAYLIST_URL}
                  target="_blank"
                  rel="noopener"
                  className="inline-block px-9 py-3 bg-[#c0392b] text-white text-[0.82rem] font-semibold tracking-[0.08em] uppercase no-underline transition-all hover:bg-[#a93226]"
                >
                  &#9654; Start the Series Now
                </a>
              </div>
            </div>
          </div>

          {/* Fade overlay + reveal button (shown when collapsed) */}
          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-b from-transparent to-[var(--color-cream)] pointer-events-none" />
          )}
        </div>

        {/* Toggle button */}
        <div className="text-center mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="view-all-link cursor-pointer"
          >
            {expanded ? "Show Less" : "Keep Reading"}
          </button>
        </div>
      </div>
    </section>
  );
}
