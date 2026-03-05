"use client";

import { useState, type FormEvent } from "react";

export default function EmailSignupSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage("You're in! Thanks for subscribing.");
      setName("");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-[var(--color-cream)] py-12 px-6 text-center">
      <h2
        className="text-[1.3rem] font-semibold text-[var(--color-ink)] mb-1.5 tracking-[0.04em]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Email Signup
      </h2>
      <p className="text-[0.85rem] text-[#6B5E4F] mb-5">
        Get the latest sermons, songs, and insights.
      </p>

      {status === "success" ? (
        <p className="text-[0.88rem] text-[#3D7A3D] font-medium">{message}</p>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-3 max-w-[420px] mx-auto"
          >
            <div className="flex flex-col sm:flex-row w-full gap-0">
              <input
                type="text"
                placeholder="First name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === "loading"}
                className="w-full sm:w-[140px] px-3.5 py-2.5 border border-[var(--color-ink)]/20 sm:border-r-0 bg-white text-[var(--color-ink)] text-[0.82rem] font-[inherit] outline-none placeholder:text-[#8A7A66] focus:border-[var(--color-ink)]/40 disabled:opacity-50"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
                className="w-full sm:flex-1 px-3.5 py-2.5 border border-[var(--color-ink)]/20 border-t-0 sm:border-t sm:border-r-0 bg-white text-[var(--color-ink)] text-[0.82rem] font-[inherit] outline-none placeholder:text-[#8A7A66] focus:border-[var(--color-ink)]/40 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto px-5 py-2.5 bg-[var(--color-ink)] text-white border-none text-[0.76rem] font-semibold tracking-[0.05em] cursor-pointer hover:bg-[#333] disabled:opacity-50"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </div>
          </form>
          {status === "error" && (
            <p className="text-[0.82rem] text-[#c0392b] mt-3">{message}</p>
          )}
        </>
      )}
    </section>
  );
}
