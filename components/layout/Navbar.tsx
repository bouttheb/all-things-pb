"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrolled } from "@/lib/hooks/useScrolled";

const NAV_LINKS = [
  { label: "Music", href: "/#music" },
  { label: "Books", href: "/#books" },
  { label: "About", href: "/#about" },
  { label: "Feed", href: "/feed" },
];

interface NavbarProps {
  variant?: "transparent" | "solid";
}

export default function Navbar({ variant = "transparent" }: NavbarProps) {
  const scrolled = useScrolled(50);
  const [menuOpen, setMenuOpen] = useState(false);

  const showSolid = variant === "solid" || scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[1000] flex justify-between items-center px-6 md:px-8 py-4 transition-all duration-300 ${
          showSolid
            ? "bg-[rgba(10,10,10,0.95)] backdrop-blur-[10px] shadow-[0_1px_15px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="no-underline text-[1.15rem] text-white tracking-[0.02em] transition-opacity duration-300 hover:opacity-80"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          thepastor<span className="italic">B</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-7 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[0.8rem] tracking-[0.05em] text-white/70 hover:text-white transition-colors font-normal no-underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex md:hidden flex-col gap-[5px] cursor-pointer z-[1001] bg-transparent border-none p-1"
          aria-label="Toggle menu"
        >
          <span
            className={`w-[22px] h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`w-[22px] h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-[22px] h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] bg-[#0A0A0A] flex flex-col justify-center items-center gap-8">
          {/* Logo in mobile menu */}
          <div
            className="mb-4 text-[1.6rem] text-white tracking-[0.02em]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            thepastor<span className="italic">B</span>
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[1.1rem] text-white no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
