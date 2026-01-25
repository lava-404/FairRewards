"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import WalletConnectModal from "./wallet/WalletConnectModal";


export default function HeroSection() {
  const [open, setOpen] = useState(false);
  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center sm:py-24">
        {/* Headline */}
        <h1 className="text-balance text-4xl font-medium leading-snug tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
            Find Your Vibe.
          </span>
          <br />
          <span className="bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
            Meet People on Your Level.
          </span>
        </h1>


        {/* Subheadline */}
        <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-gray-00 sm:text-lg">
          FairRoom helps you connect with like-minded builders, learners, and
          creatives, using on-chain reputation to create safer, higher-quality
          communities.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {/* Primary CTA */}
          <button className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-gray-100 cursor-pointer" onClick={() => setOpen(true)}>
            Connect Wallet
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
          {open && <WalletConnectModal onClose={() => setOpen(false)} />}

          {/* Secondary CTA */}
          <button className="inline-flex items-center justify-center rounded-lg border border-gray-800 bg-black px-6 py-2.5 text-sm font-medium text-gray-300 transition hover:border-gray-700 hover:bg-gray-900 cursor-pointer">
            Enter FairRoom
          </button>
        </div>

        {/* CTA Helper Text */}
        <div className="mt-4 flex flex-col gap-1 text-xs text-gray-500 sm:flex-row sm:gap-3">
          <span>Connect wallet, find your people</span>
          <span className="hidden sm:inline">·</span>
          <span>See how rooms are matched by vibe & trust</span>
        </div>

        {/* Trust Microcopy */}
        <p className="mt-10 max-w-md text-center text-xs leading-relaxed text-gray-500">
          Powered by reputation, not followers.
          <br />
          No DMs. No spam. Just real connections.
        </p>
      </div>

      {/* Bottom Fade Grid Background */}
      {/* Bottom Fade Grid Background */}
      <div className="pointer-events-none absolute inset-x-100 bottom-0 z-0 h-[100vh]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right,rgb(21, 20, 20)1px, transparent 1px),
              linear-gradient(to bottom, rgb(21, 20, 20) 1px, transparent 1px)
            `,
            backgroundSize: "88px 88px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 50% at 50% 100%, #000 40%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 100%, #000 40%, transparent 80%)",
          }}
        />
      </div>
    </section>
  );
}