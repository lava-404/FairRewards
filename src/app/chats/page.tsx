"use client";

import { ArrowLeft, ShieldCheck, Users, MessageCircle } from "lucide-react";
import Link from "next/link";
import { getTier } from "@/lib/fairscore";
import { ROOM_CONFIG } from "@/lib/rooms";
import { useRouter } from "next/navigation";

// demo score (replace later with API)
const mockScore = 750;

export default function RoomPage() {
  const tier = getTier(mockScore);

  // 🔑 derive room from stage
  const room = ROOM_CONFIG[tier.stage];

  if (!room) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        You don’t have access to this room yet.
      </div>
    );
  }

  /** ✅ LEVEL-BASED COLORS */
  const COLOR_STYLES: Record<
    "bronze" | "silver" | "gold" | "diamond",
    { badge: string; glow: string; soft: string; text: string }
  > = {
    bronze: {
      badge: "bg-amber-700/10 text-amber-500 border-amber-700/30",
      glow: "bg-amber-500",
      soft: "bg-amber-500/10",
      text: "text-amber-400",
    },
    silver: {
      badge: "bg-slate-400/10 text-slate-300 border-slate-400/30",
      glow: "bg-slate-400",
      soft: "bg-slate-400/10",
      text: "text-slate-300",
    },
    gold: {
      badge: "bg-yellow-400/10 text-yellow-300 border-yellow-400/30",
      glow: "bg-yellow-400",
      soft: "bg-yellow-400/10",
      text: "text-yellow-300",
    },
    diamond: {
      badge: "bg-cyan-400/10 text-cyan-300 border-cyan-400/30",
      glow: "bg-cyan-400",
      soft: "bg-cyan-400/10",
      text: "text-cyan-300",
    },
  };

  const colors = COLOR_STYLES[tier.color];

  const TIER_IMAGE_MAP: Record<
  "bronze" | "silver" | "gold" | "diamond",
  string
  > = {
    bronze: "/explorer.png",
    silver: "/builder.png",
    gold: "/trusted.png",
    diamond: "/core.png",
  };


  return (
    <main className="relative min-h-screen bg-background px-4 py-8 sm:px-6 sm:py-16">
      
      <div className="relative z-10 mx-auto max-w-6xl space-y-8">
      <img
        src={TIER_IMAGE_MAP[tier.level]}
        alt={`${tier.stage} room`}
        className="h-[50vh] w-full object-cover rounded-2xl"
      />

        {/* Header */}
        <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition"
            >
              <ArrowLeft size={14} />
              Back to Dashboard
            </Link>

            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {room.title}
            </h1>

            <p className="text-sm text-slate-400 max-w-xl">
              {room.description}
            </p>
          </div>

          {/* Tier Badge */}
          <div
            className={`inline-flex items-center gap-2.5 rounded-2xl px-5 py-2.5 text-sm font-semibold border backdrop-blur-sm ${colors.badge}`}
          >
            <ShieldCheck size={18} />
            {tier.level.toUpperCase()} • {tier.stage}
          </div>
        </section>

        {/* Room Stats */}
        <section className="relative overflow-hidden rounded-3xl border border-border-strong bg-card-background p-8 backdrop-blur-sm">
          <div
            className={`absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-30 ${colors.glow}`}
          />

          <div className="relative grid gap-8 sm:grid-cols-3">
            <RoomStat icon={Users} label="Active Members" value="45" />
            <RoomStat icon={MessageCircle} label="Messages Today" value="85" />
            <RoomStat
              icon={ShieldCheck}
              label="Access Level"
              value={tier.level.toUpperCase()}
            />
          </div>
        </section>

        {/* Actions */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {room.actions.map((action, i) => (
            <ActionCard
              key={i}
              {...action}
              colors={colors}
            />
          ))}
        </section>

        {/* Rules */}
        <section className="rounded-2xl border border-border-strong bg-card-background p-6 backdrop-blur-sm">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
            <ShieldCheck size={16} className={colors.text} />
            Room Guidelines
          </h3>

          <ul className="space-y-2 text-sm text-slate-400">
            {room.rules.map((rule, i) => (
              <li key={i}>• {rule}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

/* ---------- Components ---------- */

function RoomStat({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <div className="flex items-center gap-2">
        <Icon size={18} className="text-slate-300" />
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function ActionCard({
  icon: Icon,
  title,
  description,
  highlight,
  colors,
  href
}: {
  icon: any;
  title: string;
  description: string;
  highlight?: boolean;
  colors: { glow: string; soft: string };
  href?: string
}) {

  const router = useRouter();
  return (
    <div  onClick={() => href && router.push(href)} className="group relative overflow-hidden rounded-2xl border border-border-strong p-6 bg-card-background backdrop-blur-sm transition-all hover:scale-[1.02] cursor-pointer">
      <div
        className={`absolute -top-12 -right-12 h-40 w-40 blur-3xl opacity-0 group-hover:opacity-20 transition ${colors.glow}`}
      />

      <div
        className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${colors.soft}`}
      >
        <Icon size={20} className="text-slate-300" />
      </div>

      <p className="mb-1 text-sm font-semibold text-white">
        {title}
      </p>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
}
