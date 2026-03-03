export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] py-9 text-center">
      <p
        className="text-[0.85rem] font-semibold text-[var(--color-muted)] tracking-[0.08em] uppercase mb-4"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Benjamin Robinson
      </p>
      <p className="text-[0.7rem] text-[rgba(255,255,255,0.2)] tracking-[0.04em]">
        &copy; {new Date().getFullYear()} All rights reserved
      </p>
    </footer>
  );
}
