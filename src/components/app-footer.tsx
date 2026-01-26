"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function Footer() {
  return (
    <footer className="relative w-full bg-white px-5 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl space-y-12 sm:space-y-14">
        {/* Top row */}
        <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-2 sm:space-y-3">
            <p className="text-lg font-medium text-black">
              FairRewards
            </p>
            <p className="max-w-sm text-sm text-gray-600 leading-relaxed">
              Reputation-powered rewards, rooms, and access.
              Built on trust — not hype.
            </p>
          </div>

          {/* Explore */}
          <div className="space-y-2 sm:space-y-3">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Explore
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-black transition"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/communities"
                  className="text-gray-700 hover:text-black transition"
                >
                  Communities
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-700 hover:text-black transition"
                >
                  Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-2 sm:space-y-3">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Connect
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { label: "X / Twitter", href: "https://x.com" },
                { label: "Discord", href: "https://discord.com" },
                { label: "GitHub", href: "https://github.com" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 whitespace-nowrap text-gray-700 hover:text-black transition"
                  >
                    {item.label}
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Big typography row */}
        <div className="relative overflow-hidden py-6 sm:py-8">
          <p
            className="
              select-none font-bold leading-none tracking-tighter
              text-black
              text-[18vw] sm:text-[14vw] md:text-[12vw]
              opacity-[0.08]
            "
          >
            fairrewards
          </p>
        </div>

        {/* Bottom row */}
        <div
          className="
            flex flex-col gap-3 sm:gap-4
            border-t border-gray-200 pt-5
            text-xs text-gray-500
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <p>© {new Date().getFullYear()} FairRewards</p>

          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-black transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-black transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
