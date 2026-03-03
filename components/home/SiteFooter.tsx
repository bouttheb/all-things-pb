import { SOCIAL_LINKS } from "@/lib/data/social";

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--color-ink)] py-9 px-6 text-center">
      <p
        className="text-[0.85rem] font-semibold text-[var(--color-muted)] tracking-[0.08em] uppercase mb-4"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Benjamin Robinson
      </p>

      {/* Social icons */}
      <div className="flex justify-center gap-4 mb-5">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener"
            title={link.name}
            className="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-white/[0.08] text-white no-underline transition-colors hover:bg-white/[0.18]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d={link.icon} />
            </svg>
          </a>
        ))}
      </div>

      <p className="text-[0.7rem] text-white/20 tracking-[0.04em]">
        &copy; {new Date().getFullYear()} All rights reserved
      </p>
    </footer>
  );
}
