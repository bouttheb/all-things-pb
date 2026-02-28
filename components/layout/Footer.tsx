export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted)] font-medium"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          &copy; {new Date().getFullYear()} PB
        </p>
        <div className="w-6 h-[1px] bg-[var(--color-brass)]" style={{ opacity: 0.25 }} />
      </div>
    </footer>
  );
}
