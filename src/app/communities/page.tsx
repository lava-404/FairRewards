"use client";

import { ArrowRight, ShieldCheck, Users, Crown, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CommunitiesPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-[60%] -right-48 w-[520px] h-[520px] bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      {/* HERO */}
      <section className="relative z-10 px-6 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-medium leading-snug tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
            Reputation-powered communities
          </h1>

          <p className="mt-6 text-base text-pretty sm:text-lg text-slate-300">
            FairScale unlocks private, high-signal communities using your
            on-chain reputation. No invites. No paywalls. Just earned access.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-slate-200 transition"
            >
              View your access
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/docs"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border-strong px-6 py-3 text-sm font-semibold text-white hover:border-slate-500 transition"
            >
              Learn how FairScore works
            </Link>
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section className="relative z-10 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title="Rooms, not groups"
            subtitle="Each room is gated by reputation — not money or clout."
          />

          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <RoomCard
              title="Explorer"
              description="Open discussions, learning, discovery."
              level="Bronze"
              accent="amber"
              image="/explorer.png"
            />
            <RoomCard
              title="Builder"
              description="Shipping, feedback, collaboration."
              level="Silver"
              accent="slate"
              image="/builder.png"
            />
            <RoomCard
              title="Trusted"
              description="High-signal conversations and early access."
              level="Gold"
              accent="yellow"
              image="/trusted.png"
            />
            <RoomCard
              title="Core"
              description="Governance, vision, long-term influence."
              level="Diamond"
              accent="cyan"
              image="/core.png"
            />
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="relative z-10 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title="Reputation earns real advantages"
            subtitle="FairScore directly affects what you unlock and earn."
          />

          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <PerkCard
              icon={Sparkles}
              title="Boosted allocations"
              description="Higher FairScore increases drops, rewards, and perks."
            />
            <PerkCard
              icon={ShieldCheck}
              title="Access-based privileges"
              description="Private rooms, gated tools, early product access."
            />
            <PerkCard
              icon={Crown}
              title="Governance influence"
              description="Top tiers help shape protocol decisions and rules."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-border-strong bg-card-background p-8 sm:p-12 backdrop-blur-sm text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Your reputation already exists
            </h2>

            <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-slate-400">
              FairScale simply measures it. Connect your wallet and see what
              access you’ve already earned.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-slate-200 transition"
              >
                Enter FairScale
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Components ---------- */

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl sm:text-3xl font-semibold text-white">
        {title}
      </h2>
      <p className="mt-2 text-slate-400 text-sm sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}

function RoomCard({
  title,
  description,
  level,
  accent,
  image,
}: {
  title: string;
  description: string;
  level: string;
  accent: "amber" | "slate" | "yellow" | "cyan";
  image: string;
}) {
  const ACCENT_GLOW: Record<typeof accent, string> = {
    amber: "bg-amber-400",
    slate: "bg-slate-400",
    yellow: "bg-yellow-400",
    cyan: "bg-cyan-400",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border-strong bg-card-background p-6 backdrop-blur-sm transition hover:border-slate-600">
      <div
        className={`absolute -top-16 -right-16 h-32 w-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition ${ACCENT_GLOW[accent]}`}
      />
      <img
        src={image}
        alt={`${title} room`}
        className="mb-4 h-48 w-full object-cover rounded-xl"
      />

      <p className="text-xs uppercase tracking-wide text-slate-400">
        {level} tier
      </p>

      <h3 className="mt-2 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-400">
        {description}
      </p>
    </div>
  );
}


function PerkCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border-strong bg-card-background p-6 backdrop-blur-sm">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
        <Icon size={20} className="text-slate-300" />
      </div>

      <h3 className="text-sm font-semibold text-white">
        {title}
      </h3>
      <p className="mt-1 text-sm text-slate-400">
        {description}
      </p>
    </div>
  );
}
