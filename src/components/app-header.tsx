"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

export default function AppHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleHowItWorksClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're already on the home page, just scroll
    if (pathname === "/") {
      const element = document.getElementById("how-it-works");
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Navigate to home page with hash
      router.push("/#how-it-works");
    }
    
    setOpen(false);
  };

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
          FairRewards
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink href="/communities" label="Communities" />
          <a
            href="#how-it-works"
            onClick={handleHowItWorksClick}
            className="text-sm font-medium transition hover:opacity-70 cursor-pointer"
            style={{ color: "#312f2c" }}
          >
            How it works
          </a>
          <NavLink href="/about" label="About" />

          <Link
            href="/dashboard"
            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition hover:opacity-80"
            style={{
              backgroundColor: "#312f2c",
              color: "#fafafa",
            }}
          >
            Dashboard
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
            <MobileLink href="/communities" label="Communities" onClick={() => setOpen(false)} />
            <a
              href="#how-it-works"
              onClick={handleHowItWorksClick}
              className="text-base font-medium cursor-pointer"
              style={{ color: "#312f2c" }}
            >
              How it works
            </a>
            <MobileLink href="/about" label="About" onClick={() => setOpen(false)} />
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

function MobileLink({ 
  href, 
  label, 
  onClick 
}: { 
  href: string; 
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-base font-medium"
      style={{ color: "#312f2c" }}
    >
      {label}
    </Link>
  );
}