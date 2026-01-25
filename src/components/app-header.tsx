"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export default function AppHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: "#fafafa",
        borderBottom: "1px solid #312f2c20",
        boxShadow: "0 8px 24px rgba(49,47,44,0.08)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold"
          style={{ color: "#312f2c" }}
        >
          FairRoom
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink href="/communities" label="Communities" />
          <NavLink href="/how-it-works" label="How it works" />
          <NavLink href="/about" label="About" />

          <Link
            href="/app"
            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition hover:opacity-80"
            style={{
              backgroundColor: "#312f2c",
              color: "#fafafa",
            }}
          >
            Join for free
            <ArrowRight size={16} />
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          style={{ color: "#312f2c" }}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden"
          style={{
            backgroundColor: "#fafafa",
            borderTop: "1px solid #312f2c20",
          }}
        >
          <div className="flex flex-col gap-4 px-5 py-6">
            <MobileLink href="/communities" label="Communities" />
            <MobileLink href="/how-it-works" label="How it works" />
            <MobileLink href="/about" label="About" />

            <Link
              href="/app"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
              style={{
                backgroundColor: "#312f2c",
                color: "#fafafa",
              }}
            >
              Join for free
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium transition hover:opacity-70"
      style={{ color: "#312f2c" }}
    >
      {label}
    </Link>
  );
}

function MobileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-base font-medium"
      style={{ color: "#312f2c" }}
    >
      {label}
    </Link>
  );
}
