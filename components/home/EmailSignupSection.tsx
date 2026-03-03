"use client";

import { useState, type FormEvent } from "react";

export default function EmailSignupSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Wire up to email service (Mailchimp, ConvertKit, etc.)
    alert("Email signup coming soon!");
  };

  return (
    <section className="bg-[var(--color-dark)] py-12 px-6 text-center">
      <h2
        className="text-[1.3rem] font-semibold text-white mb-1.5 tracking-[0.04em]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Email Signup
      </h2>
      <p className="text-[0.85rem] text-[var(--color-muted)] mb-5">
        Get the latest sermons, songs, and insights.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center gap-0 max-w-[380px] mx-auto"
      >
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-3.5 py-2.5 border border-white/20 border-r-0 bg-white/5 text-white text-[0.82rem] font-[inherit] outline-none placeholder:text-[var(--color-subtle)] focus:border-white/40"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-white text-[var(--color-ink)] border-none text-[0.76rem] font-semibold tracking-[0.05em] cursor-pointer hover:bg-[var(--color-warm)]"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
